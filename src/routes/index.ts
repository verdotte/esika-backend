import { IRoute } from '../interfaces/route.interface';
import { AuthRoute } from './authRoute';
import { AdminRoute } from './adminRoute';
import { authController, adminController } from '../controllers';

const authRoute = new AuthRoute(authController);
const adminRoute = new AdminRoute(adminController);

export const routes: IRoute[] = [authRoute, adminRoute];
