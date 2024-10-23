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

const TopicCreateForm = () => {
  const [formState, action] = useFormState(actions.createTopic, {
    errors: {},
  })

  return (
    <Popover placement='left' color='warning'>
      <PopoverTrigger>
        <Button color='primary'>Create a Topic</Button>
      </PopoverTrigger>

      <PopoverContent>
        <form action={action}>
          <div className='flex flex-col gap-4 p-4 w80'>
            <h3 className='text-lg'>Create a Topic</h3>

            <Input
              name='name'
              label='Name'
              labelPlacement='outside'
              color='default'
              placeholder='Name'
              isInvalid={!!formState.errors.name}
              errorMessage={formState.errors.name?.join(', ')}
            />

            <Textarea
              name='description'
              label='Description'
              labelPlacement='outside'
              color='default'
              placeholder='Describe your topic'
              isInvalid={!!formState.errors.description}
              errorMessage={formState.errors.description?.join(', ')}
            />

            {formState.errors._form && (
              <div className='p-2 bg-red-200 border rounded-lg border-red-400'>
                {formState.errors._form.join(', ')}
              </div>
            )}

            <FormButton color='success'>Submit</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  )
}

export default TopicCreateForm
