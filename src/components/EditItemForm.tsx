import React from 'react'

function EditItemForm({
  editItemData,
  handleEditItemChange,
  saveEditItem,
  cancelEditItem,
  handleCloseEditModal
}) {
  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Item</h5>
            <button type="button" className="close" onClick={cancelEditItem}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label>ID:</label>
                <input
                  type="text"
                  className="form-control"
                  name="id"
                  value={editItemData.id}
                  onChange={handleEditItemChange}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={editItemData.name}
                  onChange={handleEditItemChange}
                />
              </div>
              <div className="form-group">
                <label>Price:</label>
                <input
                  type="text"
                  className="form-control"
                  name="price"
                  value={editItemData.price}
                  onChange={handleEditItemChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="type">Type:</label>
                <select
                  className="form-control"
                  name="type"
                  value={editItemData.type}
                  onChange={handleEditItemChange}
                >
                  <option value="">Select Type</option>
                  <option value="Bag">Bag</option>
                  <option value="Shoes">Shoes</option>
                  <option value="Clothes">Clothes</option>
                </select>
              </div>
              <div className="form-group">
                <label>Quantity:</label>
                <input
                  type="text"
                  className="form-control"
                  name="quantity"
                  value={editItemData.quantity}
                  onChange={handleEditItemChange}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={saveEditItem}
            >
              Save
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={cancelEditItem}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditItemForm
