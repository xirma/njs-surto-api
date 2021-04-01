import { DateTime } from 'luxon';
import { queryBuilder } from '../core/database';
import { Event } from '../models/event';

export default class EventRepository {
    public static async create(name: string, location: string, date: Date, registration_start: Date, registration_end: Date, number_tables: number,
    number_bazars: number, size_table: string, size_bazar: string, event_map: string, event_pdf: string): Promise<number> {
       const [event_id] = await queryBuilder
            .insert({
                name: name,
                location: location,
                date: date,
                registration_start: registration_start,
                registration_end: registration_end,
                number_tables: number_tables,
                number_bazars: number_bazars,
                size_table: size_table,
                size_bazar: size_bazar,
                event_map: event_map,
                event_pdf: event_pdf
            }).into('Event');

        if(!event_id || event_id <= 0) {
            throw new Error('Error creating event');
        }

        return event_id;
    }
}