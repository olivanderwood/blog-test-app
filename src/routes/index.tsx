import { ReactNode } from 'react';
import { Outlet, createBrowserRouter } from 'react-router-dom';
import ROUTES, { RouteItem } from './routes';
import PageWraper from 'components/PageWraper';
interface RouterItem {
  path: string;
  element: ReactNode;
  children?: RouterItem[];
}

const routerItems: RouterItem[] = [];

const setRouterItems = (menuItems: RouteItem[]) => {
  menuItems.forEach((el) => {
    const { path, page, children } = el;

    if (page) {
      routerItems.push({
        path,
        element: page,
      });
    }

    if (children) {
      setRouterItems(children);
    }
  });
};

setRouterItems(ROUTES);

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PageWraper>
        <Outlet />
      </PageWraper>
    ),
    children: [...routerItems],
  },
]);

export default router;
