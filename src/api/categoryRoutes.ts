import { Router } from 'express';
import { categoryController } from './controllers';
import validateUser from './middlewares/validateUser';

export default function categoryRoutes(router: Router) {
  router.get('/categories', validateUser(), categoryController.find);
}
