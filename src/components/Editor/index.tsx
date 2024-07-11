import { useMutation } from '@tanstack/react-query';
import { CSSProperties, useMemo, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './styles.css';
import { Box, Stack, Typography } from '@mui/material';

const quill_formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
];

const Editor = ({
  value,
  onChange,
  error,
  ...rest
}: {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  placeholder?: string;
  className?: string;
  style?: CSSProperties;
}) => {
  const quillRef = useRef<ReactQuill>(null);

  const imageHandler = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = async () => {
      var file: any = input && input.files ? input.files[0] : null;
      var formData = new FormData();
      formData.append('fileUpload', file);

      //  uploadImageMutate(formData)
      //
    };
  };

  function addImgMatcher(node: any, delta: any) {
    const Delta = Quill.import('delta');
    if (node?.src?.includes('data:image/')) {
      return new Delta().insert('');
    } else {
      return delta;
    }
  }

  const quill_modules = useMemo(
    () => ({
      toolbar: {
        container: [
          // [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          // ['link', 'image'],
          // ['clean'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      clipboard: {
        matchVisual: false,
        matchers: [['IMG', addImgMatcher]],
      },
    }),
    []
  );
  const valueCount = !!value ? value?.replace(/(<([^>]+)>)/gi, '') : '';
  return (
    <Stack>
      <ReactQuill
        onChange={onChange}
        ref={quillRef}
        modules={quill_modules}
        formats={quill_formats}
        value={value}
        {...rest}
      />
      <Box
        component={'div'}
        sx={{
          borderColor: '#ccc',
          py: 1,
          px: 2,
          borderTop: '1px solid #ccc',
          borderBottom: '1px solid #ccc',
          borderLeft: '1px solid #ccc',
          borderRight: '1px solid #ccc',
          borderRadius: '0 0 10px 10px',
        }}
        className="w-full py-2 px-5 border rounded-b-md border-t-0"
        style={{}}
      >
        <Typography variant="caption">{`${
          valueCount.length || 0
        } words`}</Typography>
      </Box>
    </Stack>
  );
};

export default Editor;
