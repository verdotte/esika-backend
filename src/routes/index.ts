import { IRoute } from '../interfaces/route.interface';
import { AuthRoute } from './authRoute';
import { AdminRoute } from './adminRoute';
import { UserRoute } from './userRoute';
import { PropertyRoute } from './propertyRoute';
import { DocsRoute } from './docsRoute';
import {
  authController,
  adminController,
  userController,
  propertyController,
} from '../controllers';

const authRoute = new AuthRoute(authController);
const adminRoute = new AdminRoute(adminController);
const userRoute = new UserRoute(userController);
const propertyRoute = new PropertyRoute(propertyController);
const docsRoute = new DocsRoute();

export const routes: IRoute[] = [
  authRoute,
  adminRoute,
  userRoute,
  propertyRoute,
  docsRoute
];
