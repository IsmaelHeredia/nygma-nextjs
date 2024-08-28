export interface RootState {
    themes: {
        mode: string;
    },
    auth: {
        token: string;
        username: string;
        isLoading: boolean;
        contents: any;
        error: any;
    },
    account: {
        isLoadingProfile: boolean;
        isLoadingUpdateAccount: boolean;
        contents: any;
        error: any;
    },
    documents: {
        documents: [];
        isLoadingDocuments: boolean;
        isLoadingCreateDocument: boolean;
        isLoadingUpdateDocument: boolean;
        isLoadingDeleteDocument: boolean;
        isLoadingGenerateDocument: boolean;
        name: string;
        content: string;
        key: string;
    },
    filters: {
        document_name: string;
    }
}