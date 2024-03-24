import React, { MouseEvent, useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { CartContext } from '@/contexts/CartContext'

interface SingleProductProps {
  product: {
    id: number
    name: string
    price: number
    image: { url: string }
    description: { html: string }
    fullDescription: { html: string }
  }
  onClick?: () => void
  productSelected?: boolean
}

const SingleProduct: React.FC<SingleProductProps> = ({ product, onClick, productSelected }) => {
  const [zoomable, setZoomable] = useState(false)
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 })
  const [position, setPosition] = useState({ x: 100, y: 100, mouseX: 0, mouseY: 0 })
  const { addToCart } = useContext(CartContext)

  const handleCartButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    addToCart(product)
  }

  const MAGNIFIER_SIZE = 150
  const ZOOM_LEVEL = 2.5

  const handleMouseEnter = (e: MouseEvent) => {
    let element = e.currentTarget
    let { width, height } = element.getBoundingClientRect()
    setImageSize({ width, height })
    setZoomable(true)
    updatePosition(e)
  }

  const handleMouseLeave = (e: MouseEvent) => {
    setZoomable(false)
  }

  const handleMouseMove = (e: MouseEvent) => {
    updatePosition(e)
  }

  const updatePosition = (e: MouseEvent) => {
    const { left, top } = e.currentTarget.getBoundingClientRect()
    let x = e.clientX - left
    let y = e.clientY - top
    setPosition({
      x: -x * ZOOM_LEVEL + MAGNIFIER_SIZE / 2,
      y: -y * ZOOM_LEVEL + MAGNIFIER_SIZE / 2,
      mouseX: x - MAGNIFIER_SIZE / 2,
      mouseY: y - MAGNIFIER_SIZE / 2,
    })
  }

  const hoverClassName = productSelected ? '' : 'hover:scale-110'
  const marginClassName = productSelected ? '' : 'my-7'

  return (
    <>
      <div
        className={`${marginClassName} px-4 mx-2 my-4 items-center`}
        onClick={onClick}
      >
        <div
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          className={`${marginClassName}`}
          style={{ width: 244, height: 370, position: 'relative' }}
        >
          <Image
            src={product.image.url}
            layout='fill'
            alt=''
            className={`${hoverClassName} object-cover w-full transition duration-500 ease-in-out`}
          />
          {productSelected && (
            <div
              style={{
                backgroundPosition: `${position.x}px ${position.y}px`,
                backgroundImage: `url(${product.image.url})`,
                backgroundSize: `${imageSize.width * ZOOM_LEVEL}px ${imageSize.height * ZOOM_LEVEL}px`,
                backgroundRepeat: 'no-repeat',
                display: zoomable ? 'block' : 'none',
                top: `${position.mouseY}px`,
                left: `${position.mouseX}px`,
                width: `${MAGNIFIER_SIZE}px`,
                height: `${MAGNIFIER_SIZE}px`,
              }}
              className={`z-50 border-4 rounded-full pointer-events-none absolute border-gray-500`}
            />
          )}
        </div>
        <div className='flex-basis-1/2'>
          <h3>{product.name}</h3>
          <p className='text-2xl'>${product.price}</p>
          {!productSelected && (
            <div
              dangerouslySetInnerHTML={{
                __html: product.description.html,
              }}
            ></div>
          )}
          <button
            onClick={handleCartButton}
            className='bg-green-500 text-white inline-block px-5 py-3 my-2 rounded-md cursor-pointer transition duration-00 ease-in-out hover:bg-green-700'
          >
            Add to cart 🛒
          </button>
        </div>
      </div>
      {productSelected && (
        <div
          dangerouslySetInnerHTML={{
            __html: product.fullDescription.html,
          }}
        ></div>
      )}
    </>
  )
}
export default SingleProduct
