'use client'

import React, { useContext, useEffect, useState } from 'react'
import SingleProduct from '@/components/products/singleProduct'
import { CartContext } from '@/contexts/CartContext'
import { defaultProductValues } from '../api/auth/constants/constants'
import { mockProducts } from '../api/auth/mocks/mocks'
import { filterOptionsData } from '../api/auth/mocks/mocks'
import Pagination from './pagination'

const ProductsPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [productSelectedId, setProductSelectedId] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedFilterOption, setSelectedFilterOption] = useState<string>('')
  const [priceFrom, setPriceFrom] = useState<string>('')
  const [priceTo, setPriceTo] = useState<string>('')
  const productsPerPage = 20
  const { addToCart } = useContext(CartContext)

  const filteredProducts = mockProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory ? product.category === selectedCategory : true) &&
      (priceFrom === '' || parseInt(product.price) >= parseInt(priceFrom)) &&
      (priceTo === '' || parseInt(product.price) <= parseInt(priceTo)),
  )

  const sortedProducts = (filterOption: string) => {
    let sorted = [...filteredProducts]
    if (filterOption === 'price-asc') {
      sorted.sort((a, b) => a.price - b.price)
    } else if (filterOption === 'price-desc') {
      sorted.sort((a, b) => b.price - a.price)
    } else if (filterOption === 'reset-filters') {
      setSelectedCategory('')
      setSearchQuery('')
      setSelectedFilterOption('')
      setPriceFrom('')
      setPriceTo('')
      setCurrentPage(1)
      sorted = [...mockProducts]
    } else if (filterOption === 'popularity') {
      sorted.sort((a, b) => {
        if (a.popularity === 'High' && b.popularity !== 'High') {
          return -1
        } else if (a.popularity !== 'High' && b.popularity === 'High') {
          return 1
        } else {
          return 0
        }
      })
    }
    return sorted
  }

  const currentSortedProducts = sortedProducts(selectedFilterOption)
  const totalFilteredProducts = currentSortedProducts.length
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = currentSortedProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const categories = [...new Set(mockProducts.map((product) => product.category))]

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategory, selectedFilterOption, priceFrom, priceTo])

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const handleProductClick = (productId: number) => {
    setProductSelectedId(productId)
  }

  const selectedProduct = mockProducts.find((product) => product.id === productSelectedId) || defaultProductValues

  return (
    <>
      {productSelectedId ? (
        <div className='flex flex-col items-center mx-auto'>
          <button
            onClick={() => setProductSelectedId(null)}
            className='px-32 py-1 mt-10 bg-red-500 text-white rounded-md'
          >
            X
          </button>
          <SingleProduct
            key={productSelectedId}
            product={selectedProduct}
            productSelected={true}
          />
        </div>
      ) : (
        <>
          <div className='flex justify-center mt-5'>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className='p-2 border border-gray-300 rounded-l-md min-w-12'
              style={{ width: '8%' }}
            >
              <option value=''>All Categories</option>
              {categories.map((category, index) => (
                <option
                  key={index}
                  value={category}
                >
                  {category}
                </option>
              ))}
            </select>
            <input
              type='text'
              placeholder='Search products...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='p-2 border border-gray-300 min-w-40'
              style={{ width: '30%' }}
            />
            <select
              value={selectedFilterOption}
              onChange={(e) => setSelectedFilterOption(e.target.value)}
              className='p-2 border border-gray-300 rounded-r-md min-w-12'
              style={{ width: '5%' }}
            >
              <option value=''>Filter</option>
              {filterOptionsData.map((option, index) => (
                <option
                  key={index}
                  value={option.value}
                >
                  {option.name}
                </option>
              ))}
            </select>
          </div>

          {selectedFilterOption === 'select-price-range' && (
            <div className='flex justify-center mt-3'>
              <input
                type='number'
                placeholder='Price From'
                value={priceFrom}
                onChange={(e) => setPriceFrom(e.target.value)}
                className='p-2 border border-gray-300 rounded-l-md'
              />
              <input
                type='number'
                placeholder='Price To'
                value={priceTo}
                onChange={(e) => setPriceTo(e.target.value)}
                className='p-2 border border-gray-300 rounded-r-md'
              />
            </div>
          )}

          {searchQuery && currentProducts.length === 0 && <div className='text-center mt-2 text-gray-600'>No products found.</div>}
          <div className='flex flex-wrap justify-center mx-auto lg:w-3/4 mt-5'>
            {currentProducts.map((product) => (
              <SingleProduct
                key={product.id}
                product={product}
                productSelected={false}
                onClick={() => handleProductClick(product.id)}
              />
            ))}
          </div>
          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={totalFilteredProducts}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </>
  )
}

export default ProductsPage
