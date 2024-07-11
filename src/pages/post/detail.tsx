import { Delete, EditOutlined } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import HandleGroup from 'components/HandleGroup';
import PostItem from 'components/PostItem';
import dayjs from 'dayjs';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deletePostApi, getDetailPostApi } from 'src/services/post.service';

const demoPosts = {
  id: '2',
  title: 'Post2',
  description: 'this is a post',
  content: 'this is a post content',
  createdAt: new Date(),
};

const PostDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: postData, isLoading } = useQuery({
    queryKey: ['post-detal', id],
    queryFn: async () => getDetailPostApi(id || ''),
    enabled: !!id,
  });

  const deletePostMutate = useMutation({
    mutationFn: deletePostApi,
    onSuccess: () => {
      navigate('/');
    },
  });
  return (
    <Box display="flex" justifyContent={'center'}>
      <Stack width={'100%'}>
        <Box display={'flex'} justifyContent={'space-between'} width={'100%'}>
          <Typography variant="h3" fontWeight={'bold'} mb={0}>
            {postData?.title}
          </Typography>
          <HandleGroup
            onDelete={() => {
              deletePostMutate.mutate(postData?.id || '');
            }}
            onEdit={() => {
              navigate('/edit/' + postData?.id);
            }}
          />
        </Box>
        <Typography variant="caption">
          {dayjs(postData?.createdAt).format('DD/MM/YYYY HH:mm')}
        </Typography>
        <Box
          component={'div'}
          mt={5}
          dangerouslySetInnerHTML={{ __html: postData?.content || '' }}
        />
      </Stack>
    </Box>
  );
};

export default PostDetail;
