import { Link } from 'lucide-react'
import React from 'react'

const Navbar = () => {
  return (
    <nav
    className='sticky top-0 w-full border-b bg-background/95 backdrop-blur supports[backdrop-filter]:bg-background/60 z-50'>
        <div className='max-w-7xl mx-auto px-4'>
            <div className='flex items-center justify-between h-16'>
                <div className='flex items-center'>
                    <Link href="/" className="text-xl font-bold text-white font-mono tracking-wider">
                        Socially
                    </Link>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar