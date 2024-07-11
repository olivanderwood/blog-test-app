import PageWraper from 'components/PageWraper';
import PostPage from 'pages/post';
import CreatePost from 'pages/post/create';
import PostDetail from 'pages/post/detail';
import EditPost from 'pages/post/edit';
import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
// import PostPage from 'pages/post';
export interface RouteItem {
  path: string;
  icon?: ReactNode;
  page?: ReactNode;
  children?: RouteItem[];
  hidden?: boolean;
}

const ROUTES: RouteItem[] = [
  {
    path: '/',
    page: <PostPage />,
    children: [
      {
        path: ':id',
        page: <PostDetail />,
      },
      {
        path: '/edit/:id',
        page: <EditPost />,
      },
      {
        path: '/create',
        page: <CreatePost />,
      },
    ],
  },
];

export default ROUTES;
