import React, { useState } from 'react'
import axios from 'axios'

function AddItemForm({ fetchItems }) {
  const [newItem, setNewItem] = useState({
    id: '',
    name: '',
    price: '',
    type: '',
    quantity: ''
  })

  const [errors, setErrors] = useState<any>()
  const [showModal, setShowModal] = useState(false)

  const handleNewItemChange = (e) => {
    const { name, value } = e.target
    setNewItem((prevItem) => ({
      ...prevItem,
      [name]: value
    }))
  }

  const validateForm = () => {
    let isValid = true
    const newErrors: any = {}

    if (!newItem.id.trim()) {
      newErrors.id = 'ID is required'
      isValid = false
    }

    if (!newItem.name.trim()) {
      newErrors.name = 'Name is required'
      isValid = false
    }

    if (!newItem.price.trim()) {
      newErrors.price = 'Price is required'
      isValid = false
    } else if (newItem.price) {
      newErrors.price = 'Price must be a number'
      isValid = false
    }

    if (!newItem.type.trim()) {
      newErrors.type = 'Type is required'
      isValid = false
    }

    if (!newItem.quantity.trim()) {
      newErrors.quantity = 'Quantity is required'
      isValid = false
    } else if (newItem.quantity) {
      newErrors.quantity = 'Quantity must be a number'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleAddItem = async () => {
    if (validateForm()) {
      try {
        await axios.post('http://localhost:8080/item', newItem)
        fetchItems() // Refresh the item list after adding a new item
        setNewItem({
          id: '',
          name: '',
          price: '',
          type: '',
          quantity: ''
        })
        setErrors({})
        setShowModal(false)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <>
      <div className="mt-3">
        <button
          type="button"
          className="btn btn-success"
          onClick={() => setShowModal(true)}
        >
          Add New Item
        </button>
      </div>

      {/* Bootstrap Modal */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: 'block' }}
          tabIndex={-1}
          role="dialog"
        >
          {/* <div className */}
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Item</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="id" className="form-label">
                      ID:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="id"
                      name="id"
                      value={newItem.id}
                      onChange={handleNewItemChange}
                    />
                    {errors?.id && (
                      <div className="text-danger">{errors.id}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={newItem.name}
                      onChange={handleNewItemChange}
                    />
                    {errors.name && (
                      <div className="text-danger">{errors.name}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                      Price:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="price"
                      name="price"
                      value={newItem.price}
                      onChange={handleNewItemChange}
                    />
                    {errors.price && (
                      <div className="text-danger">{errors.price}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="type" className="form-label">
                      Type:
                    </label>
                    <select
                      className="form-control"
                      id="type"
                      name="type"
                      value={newItem.type}
                      onChange={handleNewItemChange}
                    >
                      <option value="">Select Type</option>
                      <option value="Bag">Bag</option>
                      <option value="Shoes">Shoes</option>
                      <option value="Clothes">Clothes</option>
                    </select>
                    {errors.type && (
                      <div className="text-danger">{errors.type}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="quantity" className="form-label">
                      Quantity:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="quantity"
                      name="quantity"
                      value={newItem.quantity}
                      onChange={handleNewItemChange}
                    />
                    {errors.quantity && (
                      <div className="text-danger">{errors.quantity}</div>
                    )}
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddItem}
                >
                  Add
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AddItemForm
