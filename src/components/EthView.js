// EthView

import React, { Component } from 'react'
import PropTypes from "prop-types"

import { Panel, Button, Label, Grid, Row, Col, Table } from 'react-bootstrap'

import { renderObjectProps, renderObjectPropsRecursive } from '../utils'

// ETHEREUM
// CLIENTS
//  - client 
//      infura
//      web3
// STATUS
//  props
// EVENT
//  eth
//  details (expandable)
// CLIENT
//  Connected
//  Active
//  LastPrice
//  LastUpdate

class EthStatus extends Component {
  render() {
    var status = this.props.status;
    var fields = renderObjectProps(status);

    return (
      <div>
        {fields}
      </div>
    )
  }
}

class EthViewEvents extends Component {
  render() {
    var events = [];

    (this.props.events || []).forEach((event) => {
      var details = event.length > 1 ? event.slice(1) : []
      var code = details.length > 0 ? details[0] : ""

      var detailsProps = details.length > 1 ? details[1] : {}

      var fieldsDetails = renderObjectPropsRecursive(detailsProps)

      events.push(
        <Row>
          <Col sm={1}>
            {JSON.stringify(event[0])}
          </Col>
          <Col sm={2}>
            {JSON.stringify(code)}
          </Col>
          <Col sm={9}>
            {fieldsDetails}
          </Col>
        </Row>
      )
    })

    return (
      <div>
        <Row>
          <Col sm={1}>
            ETH
          </Col>
          <Col sm={2}>
            Code
          </Col>
          <Col sm={9}>
            Details
          </Col>
        </Row>
        {events}
      </div>
    )

  }
}

class EthViewClients extends Component {
  render() {

    var clients = []
    this.props.clients.forEach((client) => {
      clients.push(
        <tr>
          <td>{client.name}</td>
          <td>{JSON.stringify(client.connected)}</td>
          <td>{JSON.stringify(client.active)}</td>
          <td>{JSON.stringify(client.running)}</td>
          <td>{client.balance}</td>
          <td>{JSON.stringify(client.locked)}</td>
          <td>{client.lastError}</td>
          <td>{client.lastPrice}</td>
          <td>{client.lastUpdate}</td>
        </tr>
      )
    })

    return (
      <Table id="tableEthViewClients" className="EthViewClientsTable" striped bordered condensed hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Connected</th>
            <th>Active</th>
            <th>Running</th>
            <th>Balance</th>
            <th>Locked</th>
            <th>LastError</th>
            <th>LastPrice</th>
            <th>LastUpdate</th>
          </tr>
        </thead>
        <tbody>
          {clients}
        </tbody>
      </Table>
    )
  }
}

class EthView extends Component {
	
  render() {
    var eth = this.props.eth;

    return (
      <div className="EthView">
        <Panel>
          <h5>Ethereum Status</h5>
          <EthStatus status={(eth && eth.status) || []} />
        </Panel>
        <Panel>
            <h5>Ethereum Events</h5>
            <EthViewEvents events={eth ? eth.events : []} />
        </Panel>
        <Panel>
            <h5>Ethereum Clients</h5>
            <EthViewClients clients={eth ? eth.clients : []} />
        </Panel>
      </div>
    )
  }
}

EthView.contextTypes = {
  store: PropTypes.object.isRequired
}

export default EthView
