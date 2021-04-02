import { Request, Response } from 'express';
import EventRepository from '../repositories/event.repository';

class EventController { 
    public async activeEvents( req: Request, res: Response): Promise<Response> {
        return res.json();
    }

    public async eventInscription( req: Request, res: Response): Promise<Response> {
        return res.json();
    }

    // --------------------------------------------- //
    // -------------- ADMIN PATHS ------------------ //
    // --------------------------------------------- //

    public async allEvents( req: Request, res: Response): Promise<Response> {
        return res.json();
    }

    public async eventDetail( req: Request, res: Response): Promise<Response> {
        return res.json();
    }

    public async createEvent( req: Request, res: Response): Promise<Response> {
        try {
            const { name, location, date, registration_start, registration_end, number_tables, 
                    number_bazars, size_table, size_bazar,event_map, event_pdf } = req.body;

            const event_date = new Date(date);
            const rg_start = new Date(registration_start);
            const rg_end = new Date(registration_end);
            
            const event = await EventRepository.create( name, location, event_date, rg_start, rg_end, number_tables, 
                                                        number_bazars, size_table, size_bazar,event_map, event_pdf);

            return res.json(event);
        } catch (Error) {
            return res.status(400).json({
                message: 'Bad Request',
                code: 400,
                error: Error.message
            });
        }
    }

    public async updateEvent( req: Request, res: Response): Promise<Response> {
        const{ event_id }= req.params;
        const id = Number(event_id);

        try {
            const {name, location, date, registration_start, registration_end, number_tables,
                     number_bazars, size_table, size_bazar, event_map, event_pdf} = req.body;    

            const update = await EventRepository.update(id, name, location, date, registration_start, registration_end, number_tables,
                number_bazars, size_table, size_bazar, event_map, event_pdf);    
                
            return res.json(update);

        } catch (Error) {
            return res.status(404).json({
                message: 'Not Found',
                code: 404,
                error: Error.message
            });
        }
    }

    public async deleteEvent( req: Request, res: Response): Promise<Response> {
        const{ event_id }= req.params;
        const id = Number(event_id);

        try {
            await EventRepository.delete(id);

            return res.json('Event deleted');
        } catch (Error) {
            return res.status(404).json({
                message: 'Not Found',
                code: 404,
                error: Error.message
            });
        }

        return res.json();
    }
    
}

export default new EventController();