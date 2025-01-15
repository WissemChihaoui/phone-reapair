import React from 'react'
import { Box, Card, CardContent, CardHeader } from '@mui/material'
import { PostCommentItem } from './post-comment-item'

export default function CommentsSectionView({ comments = [] }) {
  return (
   <>
    <Card>
        <CardHeader title='Les Commentaires' />
        <CardContent>
        {comments.map((comment) => (
        <Box key={comment.id}>
        <PostCommentItem
          name={comment.name}
          message={comment.message}
          postedAt={comment.postedAt}
          avatarUrl={comment.avatarUrl}
        />
        </Box>
    ))}
        </CardContent>
    </Card>
   </>
  )
}
