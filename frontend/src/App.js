import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EventsPage, { loader as eventsLoader} from './pages/EventsPage';
import NewEventPage from './pages/NewEventPage';
import EditEventPage from './pages/EditEventPage';
import RootLayout from './pages/RootLayout';
import EventDetailPage, { loader as eventDetailLoader, action as deleteEventAction } from './pages/EventDetailPage';
import EventsRootLayout from './pages/EventsRoot.js';
import ErrorPage from './pages/ErrorPage.js';
import { action as manipulateEventAction } from './components/EventForm.js';
import NewsletterPage, { action as newsletterAction} from './pages/Newsletter.js';
import AuthenticationPage, { action as authAction } from './pages/Authentication.js';
import { action as logoutAction } from './pages/Logout.js';
import { checkAuthLoader, tokenLoader } from './utils/Auth.js';

const router = createBrowserRouter([
  { 
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    loader: tokenLoader,
    id: 'root',
    children: [
      {index: true, element: <HomePage />},
      {
        path: 'events', 
        element: <EventsRootLayout />, 
        children: [
          {
            index: true, 
            element: <EventsPage />,
            loader: eventsLoader
          },
          {
            path: ':eventId',
            loader: eventDetailLoader,
            id: 'event-detail',
            children: [
              {
                index: true, 
                element: <EventDetailPage />,
                action: deleteEventAction
              },
              {
                path: 'edit', 
                element: <EditEventPage />,
                action: manipulateEventAction,
                loader: checkAuthLoader
              }
            ]
          },
          {
            path: 'new', 
            element: <NewEventPage />,
            action: manipulateEventAction,
            loader: checkAuthLoader
          }
        ]
      },
      {
        path: 'auth',
        element: <AuthenticationPage />,
        action: authAction
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction
      },
      {
        path: 'logout',
        action: logoutAction
      }
    ]
  },
])

function App() {
  return <div>
    <RouterProvider router={router} />
  </div>;
}

export default App;
