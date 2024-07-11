import { Box, useMediaQuery } from '@mui/material';

const PageWraper = ({ children }: any) => {
  const lg = useMediaQuery('(max-width: 1200px)');
  const md = useMediaQuery('(max-width: 768px)');
  const sm = useMediaQuery('(max-width: 576px)');

  return (
    <Box sx={{ px: sm ? 1 : md ? 25 : lg ? 30 : 55, width: '100%' }}>
      {children}
    </Box>
  );
};
export default PageWraper;
