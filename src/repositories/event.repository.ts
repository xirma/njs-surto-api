
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

    public static async update(id: number, name: string, location: string, date: Date, registration_start: Date, registration_end: Date, number_tables: number,
        number_bazars: number, size_table: string, size_bazar: string, event_map: string, event_pdf: string): Promise<number> {
            const eventId = await queryBuilder
                .update({
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
                }).where('id', '=', id)
                  .into('Event');

            if (!eventId || eventId <= 0) {
                    throw new Error('Error updating event');
            }

            return eventId;

        }

        public static async delete(id: number): Promise<void> {
            
            const del = await queryBuilder
                    .select()
                    .from('Event')
                    .where('id', '=', id)
                    .delete();

            if (!del || del <= 0 ) {
                throw new Error('Not found');
            }
        }

        public static async all (filter: string): Promise<Event[]> {

            if(filter) {
                const filteredEvents = await this.filter(filter);

            if (filteredEvents.length <= 0 ) {
                throw new Error('No filtered events');
            }

            return filteredEvents;
            }

            const events = await queryBuilder
                    .select()
                    .from('Event');

            if(events.length <= 0) {
                throw new Error('No events');
            }

            return events;
        }

        public static async filter(filter: string): Promise<Event[]> {
            return queryBuilder
                .select()
                .from('Event')
                .where('name', 'like', `%${filter}%`)
                .orWhere('location', 'like', `%${filter}%`);
        }

        public static async detail (event_id: number): Promise<Event> {
            const event = await queryBuilder
                        .select()
                        .from('Event')
                        .where('id', '=', event_id)
                        .first();
            if (!event) {
                throw new Error('Not found');
            }

            return event;
        }

        public static async alreadyEnrolled (project_id: string, event_id: string ): Promise<void> {
            const enrolled = await queryBuilder
                                .select()
                                .from('Placeholder')
                                .where('Event_id', '=', event_id)
                                .andWhere('Project_id', '=', project_id)
                                .first();

            if(enrolled) {
                throw new Error('Already enrolled.');
            }
        }

        public static async enroll (project_id: string, event_id: string , table: string, bazar: string): Promise<any> {
            await queryBuilder
                        .insert({
                                Project_id: project_id,
                                Event_id: event_id,
                                table: table,
                                bazar:bazar
                            })
                        .into('Placeholder');
                        
            const selected = queryBuilder
                .select('table', 'bazar')
                .from('Placeholder')
                .where('Project_id', '=', project_id)
                .andWhere('Event_id', '=', event_id)
                .first();

            return selected;
        }


}