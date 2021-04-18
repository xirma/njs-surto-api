export interface Page {
    totalRecords: number;
    totalPages: number;
    previousPage: number;
    nextPage: number;
    pageSize: number; 
    data: any;
}