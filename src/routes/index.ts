import { Router } from 'express';
import UserController from '../controllers/user.controller';
import ProjectController from '../controllers/project.controller';
import AuthController from '../controllers/auth.controller';
import EventController from '../controllers/event.controller';

const router = Router();

//Auth
router.post('/api/auth/login', AuthController.login);
router.post('/api/auth/register', AuthController.signUp);
router.get('/api/auth/profile', AuthController.profile);
router.get('/api/auth/email/:user_id/activate', AuthController.activateUser);

//Users
router.get('/api/projects', ProjectController.userProjects);
router.post('/api/projects/create', ProjectController.createProject);
router.put('/api/projects/update', ProjectController.updateProject);
router.get('/api/project/:project_id/detail', ProjectController.projectDetail);
router.get('/api/events', EventController.activeEvents);
router.post('/api/events/inscription', EventController.eventInscription);

//Admin
router.get('/api/admin/projects', ProjectController.allProjects);
router.get('/api/admin/:event_id/projects', ProjectController.projectsByEvent);
router.get('/api/admin/projects/:user_id', ProjectController.projectsByUser);
router.delete('/api/admin/projects/:project_id/delete', ProjectController.deleteProject);
router.post('/api/admin/events/create', EventController.createEvent);
router.get('/api/admin/events', EventController.allEvents);
router.get('/api/admin/events/:event_id/detail', EventController.eventDetail);
router.put('/api/admin/events/update', EventController.updateEvent);
router.delete('/api/admin/events/:event_id/delete', EventController.deleteEvent);
router.get('/api/admin/users', UserController.allUsers);
router.put('/api/admin/:user_id/update', UserController.updateUser);
router.delete('/api/admin/:user_id/delete', UserController.deleteUser);

export default router;