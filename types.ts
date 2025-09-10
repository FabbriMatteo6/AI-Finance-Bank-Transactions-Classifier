
export interface Transaction {
    id: number;
    [key: string]: any;
}

export interface ColumnMapping {
    description: string;
    amount: string;
    date: string;
}

export interface Classification {
    Main_Category: string;
    Sub_Category: string;
    AI_Reasoning: string;
}

export type ClassificationResult = Transaction & Classification;

export enum AppState {
    FileUpload,
    ColumnMapping,
    ReadyToClassify,
    Classifying,
    ClassificationComplete
}
