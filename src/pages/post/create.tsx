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
import { useMutation } from '@tanstack/react-query';
import Editor from 'components/Editor';
import PostItem from 'components/PostItem';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createPostApi } from 'src/services/post.service';
import { v4 as uuidv4 } from 'uuid';
const CreatePost = () => {
  const navigate = useNavigate();
  const defaultValues: any = {
    title: '',
    content: '',
  };

  const createPostMutate = useMutation({
    mutationFn: createPostApi,
    onSuccess: () => {
      navigate('/');
    },
  });
  const formOptions = {
    defaultValues,
  };
  const { control, getValues, setValue, reset, register, watch } =
    useForm<any>(formOptions);
  const titleWatch = watch('title');
  const contentWatch = watch('content');
  const descriptionWatch = watch('description');
  const rawContent = contentWatch?.replace(/(<([^>]+)>)/gi, '');
  const onSubmit = () => {
    const value = getValues();
    createPostMutate.mutate({ id: uuidv4(), ...value, createdAt: new Date() });
  };

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
export default CreatePost;
