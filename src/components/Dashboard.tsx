import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles/item.css'
import {
  Chart,
  CategoryScale,
  Title,
  Tooltip,
  ArcElement,
  BarElement
} from 'chart.js'
import { Pie, Bar } from 'react-chartjs-2'

import 'chart.js/auto'
import 'bootstrap/dist/css/bootstrap.min.css'

function Dashboard() {
  const [items, setItems] = useState<any>([])
  const [showChart, setShowChart] = useState(false)
  const [showDispatchChart, setShowDispatchChart] = useState(false)
  const [showSalesReport, setShowSalesReport] = useState(false)
  const [showSalesPerType, setShowSalesPerType] = useState(false)
  const [supplierName, setSupplierName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const [isSupplierAdded, setIsSupplierAdded] = useState(false)

  const handleSupplierFormSubmit = (e) => {
    e.preventDefault()

    // Clear the form inputs
    setSupplierName('')
    setPhoneNumber('')
    setAddress('')

    setIsSupplierAdded(true)
  }

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

  const calculateTotalSalesByType = (type) => {
    let total = 0
    for (const item of items) {
      if (item.type === type) {
        total += item.saleGenerated
      }
    }
    return total
  }

  const calculateTotalSalesPerType = () => {
    const types = [...new Set(items.map((item) => item.type))]
    const salesPerType = types.map((type) => {
      const totalSales = calculateTotalSalesByType(type)
      return {
        type,
        totalSales
      }
    })
    return salesPerType
  }

  const getChartData = () => {
    const labels = ['Bag', 'Shoes', 'Clothes']
    const data = labels.map((type) => calculateTotalSalesByType(type))
    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }
      ]
    }
  }

  useEffect(() => {
    Chart.register(CategoryScale, Title, Tooltip, ArcElement, BarElement)
  }, [])

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false
  }

  const handleCardClick = (cardName) => {
    switch (cardName) {
      case 'chart':
        setShowChart((prevShowChart) => !prevShowChart)
        setShowDispatchChart(false)
        setShowSalesReport(false)
        setShowSalesPerType(false)
        break
      case 'dispatchChart':
        setShowDispatchChart((prevShowDispatchChart) => !prevShowDispatchChart)
        setShowChart(false)
        setShowSalesReport(false)
        setShowSalesPerType(false)
        break
      case 'salesReport':
        setShowSalesReport((prevShowSalesReport) => !prevShowSalesReport)
        setShowChart(false)
        setShowDispatchChart(false)
        setShowSalesPerType(false)
        break
      case 'salesPerType':
        setShowSalesPerType((prevShowSalesPerType) => !prevShowSalesPerType)
        setShowChart(false)
        setShowDispatchChart(false)
        setShowSalesReport(false)
        break
      default:
        break
    }
  }

  const getDispatchChartData = () => {
    const labels = items.map((item: any) => item.name)
    const data = items.map((item: any) => item.dispatchQuantity)
    return {
      labels,
      datasets: [
        {
          label: 'Quantity to be Dispatched',
          data,
          backgroundColor: '#FF6384',
          hoverBackgroundColor: '#FF6384'
        }
      ]
    }
  }
  const getSalesReportChartData = () => {
    const labels = items.map((item: any) => item.name)
    const data = items.map((item: any) => item.saleGenerated)
    return {
      labels,
      datasets: [
        {
          label: 'Sales Generated',
          data,
          backgroundColor: '#36A2EB',
          hoverBackgroundColor: '#36A2EB'
        }
      ]
    }
  }

  return (
    <>
      <div className="row m-4">
        <div className="col-md-6">
          <div
            className={`bg-info card rounded-square ${
              showChart ? 'border-danger' : ''
            }`}
            onClick={() => handleCardClick('chart')}
          >
            <div className="card-body">
              <h5 className="card-title">Sales Chart per Type</h5>
              <p className="card-text">
                {showChart
                  ? 'Click to disable sales chart'
                  : 'Click to generate sales chart per type'}
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div
            className={`bg-info card rounded-square ${
              showDispatchChart ? 'border-danger' : ''
            }`}
            onClick={() => handleCardClick('dispatchChart')}
          >
            <div className="card-body">
              <h5 className="card-title">Dispatch Chart</h5>
              <p className="card-text">
                {showDispatchChart
                  ? 'Click to disable dispatch chart'
                  : 'Click to generate dispatch chart'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row m-4">
        <div className="col-md-6">
          <div
            className={`bg-success card rounded-square ${
              showSalesReport ? 'border-danger' : ''
            }`}
            onClick={() => handleCardClick('salesReport')}
          >
            <div className="card-body">
              <h5 className="card-title">Sales Report</h5>
              <p className="card-text">
                {showSalesReport
                  ? 'Click to disable sales report'
                  : 'Click to generate sales report'}
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div
            className={`bg-success card rounded-square ${
              showSalesPerType ? 'border-danger' : ''
            }`}
            onClick={() => handleCardClick('salesPerType')}
          >
            <div className="card-body">
              <h5 className="card-title">Sales per Type</h5>
              <p className="card-text">
                {showSalesPerType
                  ? 'Click to disable sales per type'
                  : 'Click to generate sales per type'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {showChart && (
        <div style={{ width: '400px', height: '400px' }}>
          <Pie data={getChartData()} options={chartOptions} />
        </div>
      )}

      {showDispatchChart && (
        <div style={{ width: '400px', height: '400px' }}>
          <Bar data={getDispatchChartData()} options={chartOptions} />
        </div>
      )}

      {showSalesReport && (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Sale Generated</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item: any) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.type}</td>
                <td>{'$' + item.saleGenerated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showSalesPerType && (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Type</th>
              <th>Total Sales</th>
            </tr>
          </thead>
          <tbody>
            {calculateTotalSalesPerType().map((salesType: any) => (
              <tr key={salesType.type}>
                <td>{salesType.type}</td>
                <td>{'$' + salesType.totalSales}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <h2 className="text-success">Add new Supplier</h2>
      <div className="row m-4">
        <div className="col-md-6 font-weight-bold text-dark">
          {/* Supplier form */}
          <form onSubmit={handleSupplierFormSubmit}>
            <div className="form-group">
              <label htmlFor="supplierName">Supplier Name</label>
              <input
                type="text"
                className="form-control"
                id="supplierName"
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add a Supplier
            </button>
          </form>
          {isSupplierAdded && (
            <div className="mt-3 alert alert-success">
              Supplier added successfully!
            </div>
          )}
        </div>

        <div className="col-md-6">
          <h2 className="text-success">Today Sales</h2>
          <div
            style={{
              width: '400px',
              height: '600x',
              position: 'relative',
              backgroundColor: 'white',
              marginRight: '20px'
            }}
          >
            <Bar data={getSalesReportChartData()} options={chartOptions} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
