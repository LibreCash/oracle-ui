// PricesView

// Price
// 	DATE PRICE DELTA_PERCENT

import React, { Component } from 'react'
import PropTypes from "prop-types"
import { Button, Label, Grid, Row, Col, Table } from 'react-bootstrap'

class PricesView extends Component {

  render() {
  	var prices = []
  	this.props.prices.forEach((price) => {
      prices.push(
        <tr>
          <td>{price.date}</td>
          <td>{price.price}</td>
          <td>{price.deltaPercent} %</td>
        </tr>
      )
    })
    return (
      <Table id="tablePrices" className="PriceTable" striped bordered condensed hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Price</th>
            <th>Delta</th>
          </tr>
        </thead>
        <tbody>
          {prices}
        </tbody>
      </Table>
    )
  }
}

export default PricesView
