import { useState, useEffect } from 'react'
import axios from 'axios'
import ItemList from './ItemList'
import AddItemForm from './AddItemForm'

function ItemTable() {
  const [items, setItems] = useState([])
  const [sortColumn, setSortColumn] = useState({
    column: null,
    order: 'normal'
  })

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:8080/items')
      setItems(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:8080/items/${itemId}`)
      fetchItems() // Refresh the item list after deletion
    } catch (error) {
      console.log(error)
    }
  }

  const handleSortColumn = (columnName) => {
    if (sortColumn.column === columnName) {
      setSortColumn((prevSortColumn) => ({
        column: prevSortColumn.column,
        order:
          prevSortColumn.order === 'ascending'
            ? 'descending'
            : prevSortColumn.order === 'descending'
            ? 'normal'
            : 'ascending'
      }))
    } else {
      setSortColumn({
        column: columnName,
        order: 'ascending'
      })
    }
  }

  const getSortIndicator = (columnName) => {
    if (sortColumn.column === columnName) {
      if (sortColumn.order === 'ascending') {
        return '↑'
      } else if (sortColumn.order === 'descending') {
        return '↓'
      }
    }
    return null
  }

  const sortedItems = items.sort((a: any, b: any) => {
    if (sortColumn.column === 'price') {
      const priceA = parseFloat(a.price)
      const priceB = parseFloat(b.price)
      if (sortColumn.order === 'ascending') {
        return priceA - priceB
      } else if (sortColumn.order === 'descending') {
        return priceB - priceA
      }
    } else if (sortColumn.column === 'quantity') {
      const quantityA = parseInt(a.quantity)
      const quantityB = parseInt(b.quantity)
      if (sortColumn.order === 'ascending') {
        return quantityA - quantityB
      } else if (sortColumn.order === 'descending') {
        return quantityB - quantityA
      }
    }
    return 0
  })

  return (
    <>
      <div className="">
        <AddItemForm fetchItems={fetchItems} />
        <div>
          <ItemList
            items={sortedItems}
            sortColumn={sortColumn}
            getSortIndicator={getSortIndicator}
            handleDeleteItem={handleDeleteItem}
            handleSortColumn={handleSortColumn}
            fetchItems={fetchItems}
          />
        </div>
      </div>
    </>
  )
}

export default ItemTable
