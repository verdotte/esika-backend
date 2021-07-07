import { IRoute } from '../interfaces/route.interface';
import { AuthRoute } from './authRoute';
import { AdminRoute } from './adminRoute';
import { UserRoute } from './userRoute';
import {
  authController,
  adminController,
  userController,
} from '../controllers';

const authRoute = new AuthRoute(authController);
const adminRoute = new AdminRoute(adminController);
const userRoute = new UserRoute(userController);

export const routes: IRoute[] = [authRoute, adminRoute, userRoute];
