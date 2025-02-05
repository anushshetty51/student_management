import { RootRoute, createRoute, createRouter } from '@tanstack/react-router';
import RootLayout from '../layouts/RootLayout';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import StudentsPage from '../pages/StudentsPage';
import StatsPage from '../pages/StatsPage';
import CreateStudentPage from '../pages/CreateStudentPage';
import StudentDetailsPage from '../pages/StudentDetailsPage';

// Root layout
const rootRoute = new RootRoute({ component: RootLayout });

// Define routes
const routes = [
  createRoute({ getParentRoute: () => rootRoute, path: '/', component: LoginPage }),
  createRoute({ getParentRoute: () => rootRoute, path: '/signup', component: SignupPage }),
  createRoute({ getParentRoute: () => rootRoute, path: '/students', component: StudentsPage }),
  createRoute({ getParentRoute: () => rootRoute, path: '/stats', component: StatsPage }),
  createRoute({ getParentRoute: () => rootRoute, path: '/students/create', component: CreateStudentPage }),
  createRoute({ getParentRoute: () => rootRoute, path: '/students/$id', component: StudentDetailsPage }),
];

export const router = createRouter({ routeTree: rootRoute.addChildren(routes) });
