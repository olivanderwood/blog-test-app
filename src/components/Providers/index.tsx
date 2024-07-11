import { ThemeProvider } from '@mui/material';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { PropsWithChildren, ReactElement } from 'react';

const queryCache = new QueryCache();
const queryClient = new QueryClient({
  queryCache: queryCache,
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
    mutations: {
      // onError: (err: any) => {
      //   if (err?.error) {
      //   }
      // },
    },
  },
});

const Providers = ({ children }: PropsWithChildren): ReactElement => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default Providers;
