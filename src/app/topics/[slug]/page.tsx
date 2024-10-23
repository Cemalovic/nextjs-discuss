import PostList from '@/components/posts/PostList'
import PostCreateForm from '@/components/posts/PostCreateForm'
import { fetchPostsByTopicSlug } from '@/db/queries/posts'

interface TopicShowPageProps {
  params: {
    slug: string
  }
}

const TopicShowPage = ({ params: { slug } }: TopicShowPageProps) => {
  return (
    <div className='grid grid-cols-4 gap-4 p-4'>
      <div className='col-span-3'>
        <h1 className='text-2xl font-bold mb-2'>{slug}</h1>
        <PostList fetchData={() => fetchPostsByTopicSlug(slug)} />
      </div>

      <div>
        <PostCreateForm slug={slug} />
      </div>
    </div>
  )
}

export default TopicShowPage
