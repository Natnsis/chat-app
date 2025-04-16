import React from 'react'
import { currentUser } from '@clerk/nextjs/server'
import { ModeToggle } from './ModeToggle';
import { Button } from './ui/button';
import Link from 'next/link';
import { BellIcon, HomeIcon, UserIcon } from 'lucide-react';
import { SignInButton, UserButton } from '@clerk/nextjs';

async function DesktopNavbar() {
    const  user  = await currentUser();
    
  return (
    <div className='hidden md:flex items-center space-x-4 '>
      <ModeToggle/>
      <Button variant="ghost" className="flex items-center gap-2" asChild>
        <Link href="/">
          <HomeIcon/>
          <span className='hidden lg:inline'>Home</span>
        </Link>
      </Button>

      {user ? (
        <>
          <Button variant="ghost" className='flex items-center gap-2' asChild>
            <Link href="/notifications">
              <BellIcon className='w-4 h-4'/>
              <span className='hidden  lg:inline'>Notification</span>
            </Link>
          </Button>
          <Button variant="ghost" className='flex items-center gap-2' asChild>
            <Link href={`/profile/${
              user.username ?? user.emailAddresses[0].emailAddress.split('@')[0]
            }`}>
              <UserIcon className='w-4 h-4'/>
              <span className='hidden  lg:inline'>Profile</span>
            </Link>
          </Button>
          <UserButton/>
        </>
      ):(
          <SignInButton mode="modal">
            <Button variant="default">SignIn</Button>
          </SignInButton>
          
      )}
    </div>
  )
}

export default DesktopNavbar
