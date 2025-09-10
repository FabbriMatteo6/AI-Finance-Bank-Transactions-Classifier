import React, { useState, useEffect } from 'react';
import { ColumnMapping } from '../types.ts';

interface ColumnMapperProps {
    headers: string[];
    fileName: string;
    onMappingComplete: (mapping: ColumnMapping) => void;
    onStartClassification: () => void;
    isReady: boolean;
}

const ColumnMapper: React.FC<ColumnMapperProps> = ({ headers, fileName, onMappingComplete, onStartClassification, isReady }) => {
    const [mapping, setMapping] = useState<ColumnMapping>({
        description: '',
        amount: '',
        date: '',
    });

    useEffect(() => {
        const allMapped = mapping.description && mapping.amount && mapping.date;
        if (allMapped) {
            onMappingComplete(mapping);
        }
    }, [mapping, onMappingComplete]);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, field: keyof ColumnMapping) => {
        setMapping(prev => ({ ...prev, [field]: e.target.value }));
    };

    const renderSelect = (field: keyof ColumnMapping, label: string) => (
        <div>
            <label htmlFor={field} className="block text-sm font-medium text-gray-700">{label}</label>
            <select
                id={field}
                name={field}
                value={mapping[field]}
                onChange={(e) => handleSelectChange(e, field)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
                <option value="">Select a column...</option>
                {headers.map(header => (
                    <option key={header} value={header}>{header}</option>
                ))}
            </select>
        </div>
    );

    return (
        <div>
            <div className="p-4 mb-6 bg-gray-50 rounded-lg border">
                <h3 className="text-lg font-semibold text-gray-800">File Loaded: <span className="font-normal">{fileName}</span></h3>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Map Your Columns</h2>
            <p className="text-gray-600 mb-6">Match the required fields to the columns from your uploaded file. This helps the AI understand your data correctly.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {renderSelect('description', 'Transaction Description')}
                {renderSelect('amount', 'Transaction Amount')}
                {renderSelect('date', 'Transaction Date')}
            </div>

            <div className="mt-8 text-right">
                <button
                    onClick={onStartClassification}
                    disabled={!isReady}
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M11.957 2.02c.16-.487.79-.487.95 0l1.193 3.665a1 1 0 00.95.69h3.864c.523 0 .736.66.32 1.012l-3.125 2.274a1 1 0 00-.364 1.118l1.193 3.665c.16.487-.417.925-.838.583l-3.125-2.274a1 1 0 00-1.175 0l-3.125 2.274c-.42.342-1-.096-.838-.583l1.193-3.665a1 1 0 00-.364-1.118L2.64 7.387c-.416-.352-.203-1.012.32-1.012h3.864a1 1 0 00.95-.69L9.006 2.02c.153-.487.79-.487.95 0l1.194 3.665a1 1 0 00.95.69h3.864c.523 0 .736.66.32 1.012l-3.125 2.274a1 1 0 00-.364 1.118l1.193 3.665c.16.487-.417.925-.838.583l-3.125-2.274a1 1 0 00-1.175 0l-3.125 2.274c-.42.342-.999-.096-.838-.583l1.193-3.665a1 1 0 00-.364-1.118L.64 7.387c-.416-.352-.203-1.012.32-1.012h3.864a1 1 0 00.95-.69L7.006 2.02z" clipRule="evenodd" />
                    </svg>
                    Start Classification
                </button>
            </div>
        </div>
    );
};

export default ColumnMapper;