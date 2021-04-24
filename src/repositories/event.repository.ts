import { Page } from '~/models/page';
import { queryBuilder } from '../core/database';
import { Event } from '../models/event';
import PaginationRepository from './pagination.repository';

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

        public static async all (page?: number, limit?: number, filter?: any): Promise<Page> {
            const model = 'Event';
            const currentPage = await PaginationRepository.pagination(model, page, limit,  filter);

            if(!currentPage.data.length || currentPage.data.length <= 0) {
                throw new Error('No events');
            }

            return currentPage;
        }

        public static async active(): Promise<Event[]> {
            const allEvents = await this.all();
            const data = allEvents.data;
            const today = await new Date();
            const activeEvents = [];
        
            for(let i = 0; i < data.length; i++) {
                const reg_start = new Date (data[i]['registration_start']);
                const reg_end = new Date (data[i]['registration_end']);
                
                if (reg_start.getTime() <= today.getTime() && reg_end.getTime() >= today.getTime()) {
                    activeEvents.push(data[i]);
                }
            }

            if(activeEvents.length <= 0) {
                throw new Error('No active events');
            }
                     
            return activeEvents;

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
                                .where('event_id', '=', event_id)
                                .andWhere('project_id', '=', project_id)
                                .first();

            if(enrolled) {
                throw new Error('Already enrolled.');
            }
        }

        public static async enroll (project_id: string, event_id: string , table: string, bazar: string): Promise<any> {
            await queryBuilder
                        .insert({
                                project_id: project_id,
                                event_id: event_id,
                                table: table,
                                bazar:bazar
                            })
                        .into('Placeholder');
                        
            const selected = queryBuilder
                .select('table', 'bazar')
                .from('Placeholder')
                .where('project_id', '=', project_id)
                .andWhere('event_id', '=', event_id)
                .first();

            return selected;
        }


}