interface Document {
    id: number;
    name: string;
    content: string;
    key: string;
    iv: string;
}

interface FilterDocuments {
    findName: string;
}

interface ImportFile {
    password: string;
}

export type { Document, FilterDocuments, ImportFile };