import { EditOutlined } from '@mui/icons-material';
import {
  Box,
  IconButton,
  TextField,
  Stack,
  Typography,
  ButtonGroup,
  Button,
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Editor from 'components/Editor';
import PostItem from 'components/PostItem';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getDetailPostApi,
  updateDetailPostApi,
} from 'src/services/post.service';

const demoPosts = {
  id: '2',
  title: 'Post2',
  description: 'this is a post',
  content: 'this is a post content',
  createdAt: new Date(),
};

const EditPost = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const defaultValues: any = {
    title: '',
    content: '',
    description: '',
  };
  const { data: postData, isLoading } = useQuery({
    queryKey: ['post-detal', id],
    queryFn: async () => getDetailPostApi(id || ''),
    enabled: !!id,
  });

  const updatePostMutate = useMutation({
    mutationFn: updateDetailPostApi,
    onSuccess: () => {
      navigate('/');
      queryClient.refetchQueries({ queryKey: ['posts', 'post-detaill'] });
    },
  });

  const formOptions = {
    defaultValues,
  };
  const { control, getValues, reset, register, watch } =
    useForm<any>(formOptions);
  const titleWatch = watch('title');
  const contentWatch = watch('content');
  const descriptionWatch = watch('description');
  const rawContent = contentWatch?.replace(/(<([^>]+)>)/gi, '');
  const onSubmit = () => {
    const value = getValues();
    updatePostMutate.mutate({ id: id, ...value });
  };
  useEffect(() => {
    if (!!postData) {
      reset({
        title: postData.title,
        description: postData.description,
        content: postData.content,
      });
    }
  }, [postData]);
  return (
    <Box display="flex" justifyContent={'center'}>
      <Stack gap={3} width={'100%'} py={5}>
        <TextField {...register('title')} sx={{ py: 2 }} />
        <TextField {...register('description')} sx={{ py: 2 }} />
        <Controller
          name={'content'}
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <Box>
                <Editor
                  value={value}
                  onChange={onChange}
                  style={{
                    height: '400px',
                  }}
                />
              </Box>
            );
          }}
        />
        <Box display="flex" gap={2} justifyContent="flex-end">
          <Button
            sx={{ border: '1px solid' }}
            onClick={() => {
              navigate(-1);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={!titleWatch || !rawContent || !descriptionWatch}
            onClick={onSubmit}
          >
            Submit
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default EditPost;
