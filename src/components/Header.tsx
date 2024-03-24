'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from './navbar/page'

export const Header: React.FC = () => {
  const router = useRouter()
  const handleLogoClick = () => {
    router.push('/products')
  }
  return (
    <header className='bg-gray-800 p-6'>
      <div className='text-white flex justify-between h-auto items-center'>
        <h1
          className='text-xl font-bold cursor-pointer'
          onClick={handleLogoClick}
        >
          E-commerce Platform
        </h1>
        <Navbar />
      </div>
    </header>
  )
}
