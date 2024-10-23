import type { Post, User, Topic } from '@prisma/client'
import Link from 'next/link'
import paths from '@/paths'
import type { PostWithData } from '@/db/queries/posts'

interface PostListProps {
  fetchData: () => Promise<PostWithData[]>
}

const PostList = async ({ fetchData }: PostListProps) => {
  const posts = await fetchData()

  const renderedPosts = posts.map((post) => {
    const { id, title, user, topic, _count } = post
    const { slug } = topic

    if (!slug) {
      throw new Error('Need a slug to link to a post')
    }

    return (
      <div key={id} className='border rounded p-2'>
        <Link href={paths.postShow(slug, id)}>
          <h3 className='text-lg font-bold'>{title}</h3>
          <div className='flex flex-row gap-8'>
            <p className='text-xs text-gray-400'>By {user.name}</p>
            <p className='text-xs text-gray-400'>{_count.comments} comments</p>
          </div>
        </Link>
      </div>
    )
  })

  return <div className='space-y-2'>{renderedPosts}</div>
}

export default PostList
