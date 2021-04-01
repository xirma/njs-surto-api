import { DateTime } from 'luxon';

export interface Event {
    name: string;
    location: string; 
    date: Date;
    registration_start: DateTime;
    registration_end: DateTime;
    number_tables: number;
    number_bazars: number;
    size_table: string;
    size_bazar: string;
    event_map: string;
    event_pdf: string;
}