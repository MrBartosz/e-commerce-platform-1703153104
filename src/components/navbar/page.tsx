'use client'
import React, { useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn, signOut, useSession } from 'next-auth/react'
import Swal from 'sweetalert2'
import { CartContext } from '@/contexts/CartContext'
import 'sweetalert2/dist/sweetalert2.min.css'
const Navbar = () => {
  const { cartItems } = useContext(CartContext)
  const totalItems = cartItems.length
  const { data: session } = useSession()
  const router = useRouter()

  const handleSignOut = async () => {
    showSuccessNotification('Logout Successful !')
    setTimeout(async () => {
      await signOut()
    }, 600)
  }

  const handleSignIn = async () => {
    await signIn()
  }

  const showSuccessNotification = (message: string) => {
    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500,
    })
  }
  const handleBasketClick = () => {
    router.push('/basketPage')
  }

  const handleNameClick = () => {
    router.push('/dashboard')
  }

  return (
    <>
      {session ? (
        <div className='flex items-center gap-4'>
          <p
            onClick={handleNameClick}
            className='cursor-pointer'
          >
            Welcome {session?.user?.name}
          </p>
          <div
            className='relative'
            onClick={handleBasketClick}
          >
            <span
              role='img'
              aria-label='cart'
              className='text-2xl cursor-pointer'
            >
              🛒
            </span>
            {totalItems > 0 && (
              <span className='absolute bottom-0 right-0 bg-red-500 text-white text-xs cursor-pointer rounded-full w-5 h-5 flex items-center justify-center'>
                {totalItems}
              </span>
            )}
          </div>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <button onClick={handleSignIn}>Sign In</button>
      )}
    </>
  )
}

export default Navbar
