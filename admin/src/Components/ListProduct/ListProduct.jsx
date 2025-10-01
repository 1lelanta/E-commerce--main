import React from 'react'
import './ListProduct'

export const ListProduct = () => {
  return (
    <div className='list-product'>
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
    </div>
  )
}


export default ListProduct;