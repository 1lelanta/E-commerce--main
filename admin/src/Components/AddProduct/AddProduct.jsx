import React from 'react'
import './AddProduct'
import upload_area from '../../assets/upload_area.svg'


const AddProduct = () => {
  return (
    <div className='add-product'>
        <div className="addproduct-itemfield">
            <p>Product title</p>
            <input type="text" name='name' placeholder='Type here' />
        </div>
        <div>
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>price</p>
                    <input type="text" name='old_price' placeholder='type here' />

                </div>
                <div className="addproduct-itemfield">
                    <p>Offer Price</p>
                    <input type="text" name='new_price' placeholder='type here' />

                </div>
            </div>
            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select name="category" className='add-product-selector'>
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kid">Kid</option>

                </select>
            </div>
            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img src={upload_area}  className = 'addproduct-thumnail-img' alt="" />
                </label>
                <input type="file" name='image' id='file-input' hidden />
            </div>
            <button className='addproduct-btn'></button>
        </div>
    </div>
  )
}

export default AddProduct