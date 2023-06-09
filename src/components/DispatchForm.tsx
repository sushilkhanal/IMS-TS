import React from 'react'

function DispatchForm({
  dispatchQuantity,
  handleDispatchQuantityChange,
  dispatchItem,
  handleCloseDispatchModal
}) {
  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Dispatch Item</h5>
            <button
              type="button"
              className="close"
              onClick={handleCloseDispatchModal}
            >
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label>Quantity:</label>
                <input
                  type="text"
                  className="form-control"
                  name="quantity"
                  value={dispatchQuantity}
                  onChange={handleDispatchQuantityChange}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-success"
              onClick={dispatchItem}
            >
              Dispatch
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCloseDispatchModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DispatchForm
