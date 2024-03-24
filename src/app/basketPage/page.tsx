'use client'
import React, { useContext, useState } from 'react'
import Image from 'next/image'
import { CartContext } from '@/contexts/CartContext'

interface QuantityState {
  [itemId: number]: number
}

const BasketPage = () => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, quantities } = useContext(CartContext)

  const totalPrice = cartItems.reduce((total, item) => total + item.price * (quantities[item.id] || 0), 0)

  const handleRemoveItem = (itemId: number) => {
    removeFromCart(itemId)
  }

  const handleIncreaseQuantity = (itemId: number) => {
    increaseQuantity(itemId)
  }

  const handleDecreaseQuantity = (itemId: number) => {
    decreaseQuantity(itemId)
  }

  return (
    <div className='text-center mt-5'>
      <h2 className='text-2xl font-bold mb-4'>Total Price: ${totalPrice.toFixed(2)}</h2>
      {cartItems.map((item, index) => (
        <div
          key={index}
          className='flex items-center my-2 mr-2'
        >
          <div className='relative'>
            <Image
              src={item.image.url}
              alt={item.name}
              width={90}
              height={90}
              className='mr-2 ml-1'
            />
            <button
              onClick={() => handleRemoveItem(item.id)}
              className='absolute top-0 right-0 px-2 py-1 bg-red-500 text-white rounded-full'
            >
              X
            </button>
          </div>

          <div>
            <p>{item.name}</p>
            <p>${item.price.toFixed(2)}</p>
          </div>
          <div className='ml-auto flex items-center'>
            <button
              onClick={() => handleDecreaseQuantity(item.id)}
              className='m-2 bg-red-500 text-white px-3 py-1 rounded'
            >
              -
            </button>
            <p className='m-2 font-bold'>{quantities[item.id]}</p>
            <button
              onClick={() => handleIncreaseQuantity(item.id)}
              className='m-2 bg-green-500 text-white px-3 py-1 rounded'
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default BasketPage
