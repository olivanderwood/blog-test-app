import { AddOutlined, PlusOneOutlined } from '@mui/icons-material';
import { Box, IconButton, Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import PostItem from 'components/PostItem';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getListPostApi } from 'src/services/post.service';
import { IPost } from './type';

const demoPosts = [
  {
    id: '1',
    title: 'Post1',
    description: 'this is a post',
    content: 'this is a post content',
    createdAt: new Date(),
  },
  {
    id: '2',
    title: 'Post2',
    description: 'this is a post',
    content: 'this is a post content',
    createdAt: new Date(),
  },
];

const PostPage = () => {
  const navigate = useNavigate();
  const { data: postData, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => getListPostApi(),
  });

  return (
    <Box display="flex" justifyContent={'center'}>
      <Stack gap={3} width={'100%'}>
        <Box display={'flex'} width={'100%'} justifyContent={'flex-end'}>
          <IconButton
            onClick={() => {
              navigate('/create');
            }}
          >
            <AddOutlined />
          </IconButton>
        </Box>
        {postData &&
          postData?.map((post: IPost) => {
            return (
              <PostItem
                key={post.id}
                onClick={(id: any) => {
                  navigate(`/${id}`);
                }}
                {...post}
              />
            );
          })}
      </Stack>
    </Box>
  );
};

export default PostPage;
