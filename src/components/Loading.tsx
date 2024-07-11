import { Backdrop, CircularProgress } from '@mui/material';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';

const Loading = () => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  return (
    <Backdrop
      sx={{ color: '#28BBFF', zIndex: 9999 }}
      open={Boolean(isMutating) || Boolean(isFetching)}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading;
