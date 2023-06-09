import { useEffect, useState } from 'react'
import axios from 'axios'

import '../styles/item.css'

function Stock({ setShouldUpdateItems, setAlertCount }) {
  const [items, setItems] = useState<any>([])
  const [addQuantity, setAddQuantity] = useState(0)
  const [selectedItem, setSelectedItem] = useState<any>([])
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetchItems()
  }, [])

  useEffect(() => {
    setAlertCount(items.filter((item) => item.quantity < 1000).length)
  }, [items, setAlertCount])

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:8080/items')
      setItems(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleItemUpdated = () => {
    fetchItems()
    setShouldUpdateItems(true)
  }

  const handleAddQuantityChange = (event) => {
    setAddQuantity(Number(event.target.value))
  }

  const handleAddQuantitySubmit = async (event) => {
    event.preventDefault()
    try {
      const updatedItem = {
        ...selectedItem,
        quantity: selectedItem.quantity + addQuantity
      }
      await axios.put(
        `http://localhost:8080/items/${selectedItem.id}`,
        updatedItem
      )
      setAddQuantity(0)
      fetchItems()
      setShowModal(false)
    } catch (error) {
      console.log(error)
    }
  }

  const openModal = (item) => {
    setSelectedItem(item)
    setAddQuantity(0) // Reset the addQuantity when opening the modal
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const filteredItems = items.filter((item) => item.quantity < 1000)
  const alertCount = filteredItems.length

  return (
    <>
      <div className="image" style={{ paddingTop: '60px' }}>
        <h2>Stock</h2>
        {filteredItems.map((item) => (
          <div key={item.id} className="alert alert-danger mb-3">
            Only {item.quantity} of {item.name} are left. Order More Soon !!
            <button
              className="btn btn-primary ms-3"
              onClick={() => openModal(item)}
            >
              Order Now
            </button>
          </div>
        ))}
      </div>

      <div
        className={`modal fade ${showModal ? 'show' : ''}`}
        style={{ display: showModal ? 'block' : 'none' }}
        tabIndex={-1}
        role="dialog"
        aria-hidden={!showModal}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Quantity</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={closeModal}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleAddQuantitySubmit}>
                <div className="form-group">
                  <label>Quantity:</label>
                  <input
                    type="number"
                    className="form-control"
                    value={addQuantity}
                    onChange={handleAddQuantityChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Add Quantity
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Stock
