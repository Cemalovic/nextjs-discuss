'use client'

import {
  Avatar,
  Button,
  Link,
  NavbarItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  User,
} from '@nextui-org/react'
import * as actions from '@/actions'
import { useSession } from 'next-auth/react'

const HeaderAuth = () => {
  const session = useSession()

  let authContent: React.ReactNode

  if (session.status === 'loading') {
    authContent = (
      <Spinner color='success' label='Loading user...' labelColor='success' />
    )
  } else if (session.data?.user) {
    authContent = (
      <Popover placement='left'>
        <PopoverTrigger>
          <User
            as='button'
            name='Milos Cemalovic'
            description='Software Developer'
            className='transition-transform'
            avatarProps={{
              src: session.data.user.image || '',
            }}
          />
        </PopoverTrigger>

        <PopoverContent>
          <div className='p-4'>
            <form action={actions.signOut}>
              <div className='flex gap-3'>
                <Avatar
                  isBordered
                  radius='full'
                  size='md'
                  src='https://naturally-dance-org.netlify.app/img/naturally-dance-plesna-skola-beogradska-disko-zurka-beograd.jpg'
                />
                <div className='flex flex-col items-start justify-center mb-6'>
                  <h4 className='text-small font-semibold leading-none text-default-600'>
                    Present you
                  </h4>
                  <Link
                    href='https://naturally-dance-org.netlify.app/'
                    target='_blank'
                    className='text-small tracking-tight text-default-500'
                  >
                    @bgdiskozurka
                  </Link>
                </div>
              </div>
              <Button type='submit' color='secondary'>
                Sign Out
              </Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    )
  } else {
    authContent = (
      <>
        <NavbarItem>
          <form action={actions.signIn}>
            <Button type='submit' color='primary' variant='bordered'>
              Sign In
            </Button>
          </form>
        </NavbarItem>

        <NavbarItem>
          <form action={actions.signIn}>
            <Button type='submit' color='warning' variant='flat'>
              Sign Up
            </Button>
          </form>
        </NavbarItem>
      </>
    )
  }

  return authContent
}

export default HeaderAuth
