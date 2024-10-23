'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { Post } from '@prisma/client'
import { auth } from '@/auth'
import { db } from '@/db'
import paths from '@/paths'
import { z } from 'zod'
import { title } from 'process'
import { error } from 'console'

const createPostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
})

interface CreatePostFormState {
  errors: {
    title?: string[]
    content?: string[]
    _form?: string[]
  }
}

export async function createPost(
  slug: string,
  formState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> {
  const resault = createPostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
  })

  if (!resault.success) {
    return {
      errors: resault.error.flatten().fieldErrors,
    }
  }

  const session = await auth()

  if (!session || !session.user) {
    return {
      errors: {
        _form: ['You must be signed in to do this.'],
      },
    }
  }

  const topic = await db.topic.findFirst({
    where: { slug },
  })

  if (!topic) {
    return {
      errors: {
        _form: ['Cannot find topic'],
      },
    }
  }

  let post: Post

  try {
    post = await db.post.create({
      data: {
        title: resault.data.title,
        content: resault.data.content,
        userId: session.user.id,
        topicId: topic.id,
      },
    })
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      }
    } else {
      return {
        errors: {
          _form: ['Failed to create post'],
        },
      }
    }
  }

  //TODO: revalidate the TopicShow Page

  revalidatePath(paths.topicShow(slug))
  redirect(paths.postShow(slug, post.id))
}
