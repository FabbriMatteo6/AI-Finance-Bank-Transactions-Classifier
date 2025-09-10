import React from 'react';
import { ClassificationResult } from '../types.ts';

interface ResultsTableProps {
    data: ClassificationResult[];
    originalFileName: string;
    onReset: () => void;
}

const ResultsTable: React.FC<ResultsTableProps> = ({ data, originalFileName, onReset }) => {
    
    const downloadCSV = () => {
        if (data.length === 0) return;
        
        const headers = Object.keys(data[0]);
        const csvRows = [headers.join(',')];
        
        data.forEach(row => {
            const values = headers.map(header => {
                let value = row[header];
                if (value instanceof Date) {
                    // Format as YYYY-MM-DD for consistency in CSV
                    value = value.toISOString().split('T')[0]; 
                }
                const escaped = ('' + (value ?? '')).replace(/"/g, '""');
                return `"${escaped}"`;
            });
            csvRows.push(values.join(','));
        });
        
        const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        const outputFileName = originalFileName.replace(/(\.[\w\d_-]+)$/i, '_classified.csv');
        link.setAttribute('download', outputFileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const formatCellContent = (content: any): string => {
        if (content instanceof Date) {
            return content.toLocaleDateString(); // Formats date to user's locale
        }
        if (content === null || typeof content === 'undefined') {
            return '';
        }
        return String(content);
    };

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Classification Results</h2>
                <div className="flex gap-x-4">
                    <button
                        onClick={downloadCSV}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                           <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        Download CSV
                    </button>
                     <button
                        onClick={onReset}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7V9a1 1 0 01-2 0V3a1 1 0 011-1zm1.001 14a1 1 0 01-1-1V12.899a7.002 7.002 0 01-11.601-2.566 1 1 0 111.885-.666A5.002 5.002 0 0014.001 13V11a1 1 0 112 0v5a1 1 0 01-1 1h-1z" clipRule="evenodd" />
                        </svg>
                        Start Over
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto rounded-lg border">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {data.length > 0 && Object.keys(data[0]).filter(k => k !== 'id').map(key => (
                                <th key={key} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {key.replace(/_/g, ' ')}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.map((row) => (
                            <tr key={row.id} className="hover:bg-gray-50">
                                {Object.keys(row).filter(k => k !== 'id').map(key => (
                                    <td key={`${row.id}-${key}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {formatCellContent(row[key])}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ResultsTable;