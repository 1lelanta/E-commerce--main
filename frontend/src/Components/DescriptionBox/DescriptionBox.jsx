import React from 'react'
import "./Description.css"

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">Description</div>
            <div className="descriptionbox-nav-box-fade">Reviews(122)</div>
        </div>
        <div className="descriptionbox-description">
            <p>Welcome to our e-commerce store, where shopping meets convenience and quality. 
            We offer a wide range of products, from the latest electronics and trendy fashion to home essentials and unique gifts — all carefully selected to meet your needs. 
            Our user-friendly platform ensures a smooth browsing and checkout experience, while secure payment options and fast delivery bring your orders right to your doorstep.
            With competitive prices, regular discounts, and exceptional customer service, we are committed to making your online shopping simple, enjoyable, and reliable.</p>
            <p></p>
        </div>
    </div>
  )
}

export default DescriptionBox