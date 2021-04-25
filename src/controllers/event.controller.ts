import { Request, Response } from 'express';
import EventRepository from '../repositories/event.repository';

class EventController { 
    public async activeEvents( req: Request, res: Response): Promise<Response> {
        
        try { 
            const events = await EventRepository.active();
 
            return res.json(events);
         } catch (Error) {
             return res.status(404).json({
                 message: 'Not Found',
                 code: 404,
                 error: Error.message
             });
         }
    }

    public async eventEnroll( req: Request, res: Response): Promise<Response> {
        try {
            const { project_id, table , bazar } = req.body;
            const { event_id } = req.params;
            //TODO
            // Verificar se project_id pertence ao usuário que está fazendo o pedido.
            // Criar array de TABLES e BAZARS baseado na tabela Event -> number_tables e number_bazars.
            // Filtrar array de TABLES e BAZARS com os números já inseridos na tabela Placeholder.
            // Retornar SSE com o array filtrado. 

            await EventRepository.alreadyEnrolled(project_id, event_id);

            const placeholder = await EventRepository.enroll(project_id, event_id, table, bazar);

            return res.json(placeholder);
        } catch(Error) {
            return res.status(403).json({
                message: 'Forbidden',
                code: 403,
                error: Error.message
            }); 
        }
    }

    // --------------------------------------------- //
    // -------------- ADMIN PATHS ------------------ //
    // --------------------------------------------- //

    public async allEvents( req: Request, res: Response): Promise<Response> {
        const { page, limit, filter } = req.query;
        const pageNumber = Number(page);
        const limitNumber = Number(limit);

        try { 
           const events = await EventRepository.all(pageNumber, limitNumber, filter);

           return res.json(events);
        } catch (Error) {
            return res.status(404).json({
                message: 'Not Found',
                code: 404,
                error: Error.message
            });
        }        
    }

    public async eventDetail( req: Request, res: Response): Promise<Response> {
        const { event_id } = req.params;
        const id = Number(event_id);

        try {
            const event = await EventRepository.detail(id);

            return res.json(event);
        } catch (Error) {
            return res.status(404).json({
                message: 'Not Found',
                code: 404,
                error: Error.message
            });
        }
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
    }
    
}

export default new EventController();