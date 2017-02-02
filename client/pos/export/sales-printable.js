import React from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Sales } from '../../../collections/sales'

const getAllSales = () => {
  return this.props.sales.map( sale => {
    return (
      <tbody>
      <tr key={sale._id}>
        <td>{sale.owner}</td>
        <td>{sale.total}</td>
        <td>{sale.ct}</td>
        <td>{sale.ch}</td>
        <td>{sale.items}</td>
        <td>{sale.createAt}</td>
      </tr>
      </tbody>
    )
  })
}

const SALES_PRINTABLE = () => {
  return (
    <div>
    <table>
      <tr>
        <th>Name</th>
        <th>Total</th>
        <th>Tendered</th>
        <th>Change</th>
        <th>Items</th>
        <th>TimeStamp</th>
      </tr>

        {getAllSales}

    </table>

    </div>
  )
}

SALES_PRINTABLE.propTypes = {
  sales: React.PropTypes.array
}

export default createContainer(()=>{
  return {
    sales: Sales.find().fetch()
  }
}, SALES_PRINTABLE )
