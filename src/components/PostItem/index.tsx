import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  ClickAwayListenerProps,
  Typography,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import HandleGroup from 'components/HandleGroup';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { deletePostApi } from 'src/services/post.service';

type Props = {
  id: string;
  title: string;
  content: string;
  description: string;
  createdAt: string | Date;
  onClick: Function;
};

const PostItem = ({ title, id, onClick, description, createdAt }: Props) => {
  const navigate = useNavigate();
  const deletePostMutate = useMutation({
    mutationFn: deletePostApi,
    onSuccess: () => {
      navigate('/');
    },
  });

  return (
    <Card
      onClick={() => {
        onClick(id);
      }}
      sx={{
        width: '100%',
      }}
    >
      <CardActionArea>
        <CardContent>
          <Box display="flex" justifyContent="space-between">
            <Typography gutterBottom variant="h5" component="div" mb={0}>
              {title || ''}
            </Typography>
            <HandleGroup
              onDelete={() => {
                deletePostMutate.mutate(id || '');
              }}
              onEdit={() => {
                navigate('/edit/' + id);
              }}
            />
          </Box>
          <Typography variant="caption" component="div" color="text.secondary">
            {createdAt ? dayjs(createdAt).format('DD/MM/YYYY HH:mm') : ''}
          </Typography>
          <Typography variant="body1" mt={1}>
            {description || ''}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PostItem;
