
import React, { useCallback, useState } from 'react';

// XLSX is loaded from a CDN, declare it for TypeScript
declare var XLSX: any;

interface FileUploadProps {
    onFileProcessed: (data: any[][], file: File) => void;
    onError: (message: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileProcessed, onError }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleFile = useCallback((file: File) => {
        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
            try {
                const data = new Uint8Array(e.target?.result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: 'array', cellDates: true });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                
                if (json.length === 0) {
                    onError("The selected file is empty or could not be read.");
                    return;
                }
                
                onFileProcessed(json, file);
            } catch (err) {
                console.error("Error processing file:", err);
                onError("Failed to process the file. Please ensure it's a valid Excel (.xlsx, .xls) or CSV file.");
            }
        };
        reader.onerror = () => {
             onError("Failed to read the file.");
        }
        reader.readAsArrayBuffer(file);
    }, [onFileProcessed, onError]);

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFile(e.dataTransfer.files[0]);
        }
    };
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    };

    return (
        <div 
            className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors duration-200 ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-input')?.click()}
        >
            <input 
                type="file"
                id="file-input"
                className="hidden"
                accept=".xlsx, .xls, .csv"
                onChange={handleFileChange}
            />
             <div className="flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-gray-700 font-semibold">
                    <span className="text-blue-600">Click to upload</span> or drag and drop
                </p>
                <p className="text-sm text-gray-500 mt-1">Excel (.xlsx, .xls) or CSV files</p>
            </div>
        </div>
    );
};

export default FileUpload;
