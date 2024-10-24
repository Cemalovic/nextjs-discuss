import { Divider } from '@nextui-org/react'
import TopicCreateForm from '@/components/topics/TopicCreateForm'
import TopicList from '@/components/topics/TopicList'
import PostList from '@/components/posts/PostList'
import { fetchTopPosts } from '@/db/queries/posts'

const Home = () => {
  return (
    <div className='grid grid-cols-[repeat(auto-fill,15rem)] gap-4 p-4'>
      <div className='col-span-3'>
        <h1 className='text-xl m-2'>Top Posts</h1>
        <PostList fetchData={fetchTopPosts} />
      </div>

      <div className='border shadow py-3 px-2'>
        <TopicCreateForm />
        <Divider className='my-2' />
        <h3 className='text-lg'>Topics</h3>
        <TopicList />
      </div>
    </div>
  )
}

export default Home
