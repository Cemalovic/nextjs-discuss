'use client'

import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from '@nextui-org/react'
import * as actions from '@/actions'
import { useFormState } from 'react-dom'
import FormButton from '../common/FormButton'

interface PostCreateFormProps {
  slug: string
}

const PostCreateForm = ({ slug }: PostCreateFormProps) => {
  const [formState, action] = useFormState(
    actions.createPost.bind(null, slug),
    {
      errors: {},
    }
  )

  return (
    <Popover placement='left' color='success'>
      <PopoverTrigger>
        <Button color='primary'>Create a Post</Button>
      </PopoverTrigger>

      <PopoverContent>
        <form action={action}>
          <div className='flex flex-col gap-4 p-4 w80'>
            <h3 className='text-lg'>Create a Post</h3>

            <Input
              name='title'
              label='Title'
              labelPlacement='outside'
              color='default'
              placeholder='Title'
              isInvalid={!!formState.errors.title}
              errorMessage={formState.errors.title?.join(', ')}
            />

            <Textarea
              name='content'
              label='Content'
              labelPlacement='outside'
              color='default'
              placeholder='Content'
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(', ')}
            />

            {formState.errors._form && (
              <div className='p-2 bg-red-200 border rounded-lg border-red-400'>
                {formState.errors._form.join(', ')}
              </div>
            )}

            <FormButton color='warning'>Create Post</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  )
}

export default PostCreateForm
