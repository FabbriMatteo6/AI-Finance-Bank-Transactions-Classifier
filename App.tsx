import React, { useState, useCallback, useEffect } from 'react';
import { Transaction, ColumnMapping, AppState, ClassificationResult } from './types.ts';
import { BATCH_SIZE } from './constants.ts';
import { classifyTransactionBatch } from './services/geminiService.ts';
import FileUpload from './components/FileUpload.tsx';
import ColumnMapper from './components/ColumnMapper.tsx';
import ResultsTable from './components/ResultsTable.tsx';
import Loader from './components/Loader.tsx';

// XLSX is loaded from a CDN in index.html, declare it for TypeScript
declare var XLSX: any;

const App: React.FC = () => {
    const [appState, setAppState] = useState<AppState>(AppState.FileUpload);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [headers, setHeaders] = useState<string[]>([]);
    const [columnMap, setColumnMap] = useState<ColumnMapping>({ description: '', amount: '', date: '' });
    const [classifiedTransactions, setClassifiedTransactions] = useState<ClassificationResult[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string>('');
    const [progress, setProgress] = useState<{ current: number, total: number }>({ current: 0, total: 0 });
    const [apiKeyError, setApiKeyError] = useState<string | null>(null);

    useEffect(() => {
        // Check if API key is set
        if (!import.meta.env.VITE_API_KEY || import.meta.env.VITE_API_KEY === 'PASTE_YOUR_SECRET_KEY_HERE') {
            setApiKeyError('API key not set. Please add your Google Gemini API key to the .env file.');
        }
    }, []);

    const handleFileProcessed = useCallback((data: any[][], file: File) => {
        if (data.length < 2) {
            setError("The uploaded file seems to be empty or has no data rows.");
            return;
        }
        const fileHeaders = data[0].map(header => String(header).trim());
        const fileTransactions = data.slice(1).map((row, index) => {
            const transaction: Transaction = { id: index };
            fileHeaders.forEach((header, i) => {
                let value = row[i];
                // Timezone adjustment for dates parsed from Excel.
                // sheetjs parses dates as UTC. If a user is in a timezone west of UTC,
                // a date like '2023-10-26' becomes '2023-10-26T00:00:00.000Z', which
                // translates to '2023-10-25' in their local time. This correction fixes it.
                if (value instanceof Date) {
                    value = new Date(value.getTime() + value.getTimezoneOffset() * 60 * 1000);
                }
                transaction[header] = value;
            });
            return transaction;
        });

        setHeaders(fileHeaders);
        setTransactions(fileTransactions);
        setFileName(file.name);
        setError(null);
        setAppState(AppState.ColumnMapping);
    }, []);

    const handleMappingComplete = useCallback((mapping: ColumnMapping) => {
        setColumnMap(mapping);
        setAppState(AppState.ReadyToClassify);
    }, []);
    
    const startClassification = async () => {
        setAppState(AppState.Classifying);
        setError(null);
        setProgress({ current: 0, total: transactions.length });

        const results: ClassificationResult[] = [];
        const totalBatches = Math.ceil(transactions.length / BATCH_SIZE);
        let batchErrorCount = 0;

        for (let i = 0; i < totalBatches; i++) {
            const start = i * BATCH_SIZE;
            const end = start + BATCH_SIZE;
            const batch = transactions.slice(start, end);

            try {
                const transactionsToClassify = batch.map(t => {
                    const dateValue = t[columnMap.date];
                    // Format date as YYYY-MM-DD for consistency
                    const dateString = dateValue instanceof Date 
                        ? dateValue.toISOString().split('T')[0] 
                        : String(dateValue || '');

                    return {
                        date: dateString,
                        description: String(t[columnMap.description] || ''),
                        amount: String(t[columnMap.amount] || '')
                    };
                });

                const classifications = await classifyTransactionBatch(transactionsToClassify);
                
                if (classifications.length !== batch.length) {
                    throw new Error(`AI returned ${classifications.length} classifications for ${batch.length} transactions.`);
                }

                const classifiedBatch = batch.map((original, index) => ({
                    ...original,
                    ...classifications[index]
                }));
                results.push(...classifiedBatch);

            } catch (err: any) {
                console.error(`Error processing batch ${i + 1}:`, err);
                batchErrorCount++;
                const failedBatch = batch.map(original => ({
                    ...original,
                    Main_Category: 'Other',
                    Sub_Category: 'Needs Review',
                    AI_Reasoning: `Classification failed for this batch. Error: ${err.message}`
                }));
                results.push(...failedBatch);
            }
            
            setProgress({ current: Math.min(end, transactions.length), total: transactions.length });
        }
        
        setClassifiedTransactions(results);
        setAppState(AppState.ClassificationComplete);
        
        if (batchErrorCount > 0) {
            setError(`${batchErrorCount} batch(es) failed to classify and have been marked for review. You can still download the partial results or start over.`);
        }
    };

    const handleReset = () => {
        setAppState(AppState.FileUpload);
        setTransactions([]);
        setHeaders([]);
        setColumnMap({ description: '', amount: '', date: '' });
        setClassifiedTransactions([]);
        setError(null);
        setFileName('');
        setProgress({ current: 0, total: 0 });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-7xl mx-auto">
                <header className="text-center mb-8">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">AI Transaction Classifier</h1>
                    <p className="mt-2 text-lg text-gray-600">Upload your Excel file to automatically categorize financial transactions.</p>
                </header>

                <main className="bg-white rounded-xl shadow-lg p-6 sm:p-8 w-full">
                    {apiKeyError && (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded" role="alert">
                            <p className="font-bold">Configuration Error</p>
                            <p>{apiKeyError}</p>
                            <p className="mt-2 text-sm">Please set your Google Gemini API key in the <code className="bg-gray-100 px-1 rounded">.env</code> file to use this application.</p>
                        </div>
                    )}

                    {error && (
                        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded" role="alert">
                            <p className="font-bold">Notice</p>
                            <p>{error}</p>
                        </div>
                    )}

                    {appState === AppState.FileUpload && <FileUpload onFileProcessed={handleFileProcessed} onError={setError} />}
                    
                    {(appState === AppState.ColumnMapping || appState === AppState.ReadyToClassify) && (
                         <ColumnMapper 
                            headers={headers} 
                            fileName={fileName}
                            onMappingComplete={handleMappingComplete}
                            onStartClassification={startClassification}
                            isReady={appState === AppState.ReadyToClassify}
                         />
                    )}

                    {appState === AppState.Classifying && (
                        <div className="text-center py-10">
                            <Loader />
                            <h2 className="text-2xl font-semibold text-gray-700 mt-4">Classifying Transactions...</h2>
                            <p className="text-gray-500 mt-2">Processing {progress.current} of {progress.total} transactions.</p>
                             <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(progress.current / progress.total) * 100}%` }}></div>
                            </div>
                        </div>
                    )}
                    
                    {appState === AppState.ClassificationComplete && (
                        <ResultsTable 
                            data={classifiedTransactions}
                            originalFileName={fileName}
                            onReset={handleReset}
                        />
                    )}
                </main>

                <footer className="text-center mt-8 text-gray-500 text-sm">
                    <p>Powered by Google Gemini & React</p>
                </footer>
            </div>
        </div>
    );
};

export default App;