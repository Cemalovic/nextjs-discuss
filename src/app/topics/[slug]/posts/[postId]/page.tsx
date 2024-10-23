import { Suspense } from 'react'
import { Button, Link } from '@nextui-org/react'
import PostShow from '@/components/posts/PostShow'
import CommentList from '@/components/comments/CommentList'
import CommentCreateForm from '@/components/comments/CommentCreateForm'
import PostShowLoading from '@/components/posts/PostShowLoading'
import paths from '@/paths'

interface PostShowPageProps {
  params: {
    slug: string
    postId: string
  }
}

const PostShowPage = ({ params }: PostShowPageProps) => {
  const { slug, postId } = params

  return (
    <div className='space-y-3'>
      <Button
        href={paths.topicShow(slug)}
        as={Link}
        color='danger'
        showAnchorIcon
      >
        Back to {slug}
      </Button>

      <Suspense fallback={<PostShowLoading />}>
        <PostShow postId={postId} />
      </Suspense>

      <CommentCreateForm postId={postId} startOpen />

      <CommentList postId={postId} />
    </div>
  )
}

export default PostShowPage
