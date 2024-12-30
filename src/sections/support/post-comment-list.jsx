import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';

import { PostCommentItem } from './post-comment-item';

// ----------------------------------------------------------------------

export function PostCommentList({ comments = [] }) {
  return (
    <>
      {comments.map((comment) => {
        const hasReply = !!comment.replyComment.length;

        return (
          <Box key={comment.id}>
            <PostCommentItem
              name={comment.name}
              message={comment.message}
              postedAt={comment.postedAt}
              avatarUrl={comment.avatarUrl}
            />
          </Box>
        );
      })}
    </>
  );
}