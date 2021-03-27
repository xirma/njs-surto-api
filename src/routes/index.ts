import { Router } from 'express';
import AdminController from '../controllers/admin.controller';
import ProjectController from '../controllers/project.controller';
import AuthController from '../controllers/auth.controller';

const router = Router();

//Auth
router.post('/api/auth/login', AuthController.login);
router.post('/api/auth/register', AuthController.signUp);
router.get('/api/auth/profile', AuthController.profile);
router.get('/api/auth/email/:user_id/activate', AuthController.activateUser);

//Users
router.get('/api/events', ProjectController.activeEvents);
router.get('/api/projects', ProjectController.userProjects);
router.post('/api/projects/create', ProjectController.createProject);
router.put('/api/projects/update', ProjectController.updateProject);
router.get('/api/project/:project_id/detail', ProjectController.projectDetail);
router.post('/api/events/inscription', ProjectController.eventInscription);

//Admin
router.get('/api/admin/projects', AdminController.allProjects);
router.get('/api/admin/:event_id/projects', AdminController.projectsByEvent);
router.get('/api/admin/:user_id/projects', AdminController.projectsByUser);
router.delete('/api/admin/projects/:project_id/delete', AdminController.deleteProject);
router.get('/api/admin/events', AdminController.allEvents);
router.get('/api/admin/events/:event_id/detail', AdminController.eventDetail);
router.post('/api/admin/events/create', AdminController.createEvent);
router.put('/api/admin/events/update', AdminController.updateEvent);
router.delete('/api/admin/events/:event_id/delete', AdminController.deleteProject);
router.get('/api/admin/users', AdminController.allUsers);
router.put('/api/admin/:user_id/update', AdminController.updateUser);
router.delete('/api/admin/:user_id/delete', AdminController.deleteUser);

export default router;