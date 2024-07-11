import Providers from 'components/Providers';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import router from './routes';
import Loading from 'components/Loading';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Providers>
    <Loading />
    <RouterProvider router={router} />
  </Providers>
);
