// ExchangesView

// Exchange
// 	NAME SYMBOL RATE ON/OFF

import React, { Component } from 'react'
import PropTypes from "prop-types"
import { Button, Label, Grid, Row, Col, Table } from 'react-bootstrap'

/*
{isLoggedIn ? (
        <LogoutButton onClick={this.handleLogoutClick} />
      ) : (
        <LoginButton onClick={this.handleLoginClick} />
      )}
*/

class ExchangesView extends Component {

  render() {
  	var exchanges = []
  	this.props.exchanges.forEach((exchange) => {
      exchanges.push(
        <tr>
          <td>{exchange.name}</td>
          <td>{exchange.symbol}</td>
          <td>{exchange.lastest}</td>
          <td>
						<Button className="NewNode-button-shutdown pull-right" bsStyle={exchange.enabled ? "danger" : "success"} onClick={this.props.onExchangeToggle.bind(this.props.owner, exchange)}>{exchange.enabled ? "Off" : "On"}</Button>
		      </td>
        </tr>
      )
    })
    return (
      <Table id="tableExchanges" className="ExchangeTable" striped bordered condensed hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Rate</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {exchanges}
        </tbody>
      </Table>
    )
  }
}

export default ExchangesView
//						<Button className="NewNode-button-shutdown pull-right" bsStyle={exchange.enabled ? "danger" : "success"} onClick={this.handleExchangeToggle.bind(this, exchange)}>{exchange.enabled ? "Off" : "On"}</Button>
