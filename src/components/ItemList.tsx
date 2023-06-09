import { useState } from 'react'
import axios from 'axios'
import EditItemForm from './EditItemForm'
import DispatchForm from './DispatchForm'

function ItemList(props) {
  const {
    items,
    sortColumn,
    getSortIndicator,
    handleDeleteItem,
    handleSortColumn,
    fetchItems
  } = props

  const [editItemId, setEditItemId] = useState(null)
  const [editItemData, setEditItemData] = useState({
    id: '',
    name: '',
    price: '',
    type: '',
    quantity: ''
  })
  const [dispatchItemId, setDispatchItemId] = useState(null)
  const [dispatchQuantity, setDispatchQuantity] = useState('')
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDispatchModal, setShowDispatchModal] = useState(false)

  const handleEditItem = (itemId) => {
    const itemToEdit = items.find((item) => item.id === itemId)
    setEditItemId(itemId)
    setEditItemData(itemToEdit)
    setShowEditModal(true)
  }

  const handleEditItemChange = (e) => {
    const { name, value } = e.target
    setEditItemData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const saveEditItem = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/items/${editItemId}`,
        editItemData
      )
      console.log('Item updated:', response.data)
      setEditItemId(null)
      setEditItemData({
        id: '',
        name: '',
        price: '',
        type: '',
        quantity: ''
      })
      fetchItems() // Refresh the item list after update
      setShowEditModal(false) // Hide the edit modal
    } catch (error) {
      console.log(error)
    }
  }

  const cancelEditItem = () => {
    setEditItemId(null)
    setEditItemData({
      id: '',
      name: '',
      price: '',
      type: '',
      quantity: ''
    })
    setShowEditModal(false) // Hide the edit modal
  }

  const dispatchItem = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/items/${dispatchItemId}/dispatch`,
        { dispatchQuantity }
      )
      console.log('Item dispatched:', response.data)
      setDispatchItemId(null)
      setDispatchQuantity('')
      fetchItems() // Refresh the item list after dispatch
      handleCloseDispatchModal()
    } catch (error: any) {
      console.log('Dispatch error:', error)
      console.log('Response data:', error.response.data)
      console.log('Response status:', error.response.status)
      console.log('Response headers:', error.response.headers)
    }
  }

  const handleDispatchItem = (itemId) => {
    setDispatchItemId(itemId)
    setDispatchQuantity('')
    setShowDispatchModal(true)
  }

  const handleDispatchQuantityChange = (e) => {
    setDispatchQuantity(e.target.value)
  }

  const handleCloseDispatchModal = () => {
    setShowDispatchModal(false)
  }

  const handleCloseEditModal = () => {
    setShowEditModal(false)
  }

  return (
    <>
      <div className="">
        <div>
          <h3>Inventory Table</h3>
          <table className="table table-striped item-table">
            <thead>
              <tr>
                <th className="bg-dark text-light">ID</th>
                <th className="bg-dark text-light">Name</th>
                <th className="bg-dark text-light">Type</th>
                <th
                  onClick={() => handleSortColumn('price')}
                  className={`${
                    sortColumn.column === 'price' ? sortColumn.order : ''
                  } bg-dark text-light`}
                >
                  Price {getSortIndicator('price')}
                </th>
                <th
                  onClick={() => handleSortColumn('quantity')}
                  className={`${
                    sortColumn.column === 'quantity' ? sortColumn.order : ''
                  } bg-dark text-light`}
                >
                  Quantity {getSortIndicator('quantity')}
                </th>
                <th className="bg-dark text-light">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger mr-4"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      Delete
                    </button>
                    {editItemId !== item.id && (
                      <button
                        type="button"
                        className="btn btn-primary mr-4"
                        onClick={() => handleEditItem(item.id)}
                      >
                        Edit
                      </button>
                    )}
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => handleDispatchItem(item.id)}
                    >
                      Dispatch
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showEditModal && (
        <EditItemForm
          editItemData={editItemData}
          handleEditItemChange={handleEditItemChange}
          saveEditItem={saveEditItem}
          cancelEditItem={cancelEditItem}
          handleCloseEditModal={handleCloseEditModal}
        />
      )}

      {showDispatchModal && (
        <DispatchForm
          dispatchQuantity={dispatchQuantity}
          handleDispatchQuantityChange={handleDispatchQuantityChange}
          dispatchItem={dispatchItem}
          handleCloseDispatchModal={handleCloseDispatchModal}
        />
      )}

      <h3>Dispatch Table</h3>
      <table className="table additional-table">
        <thead>
          <tr className="bg-dark">
            <th className="bg-dark text-light">ID</th>
            <th className="bg-dark text-light">Name</th>
            <th className="bg-dark text-light">Order Number</th>
            <th className="bg-dark text-light">Dispatch Quantity</th>
            <th className="bg-dark text-light">Sale Generated</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.orderNumber}</td>
              <td>{item.dispatchQuantity}</td>
              <td>{item.saleGenerated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default ItemList
