// ActionsHistory

// ActionName
// 	LoginSuccess IP USERNAME DATE
//	LoginFail IP USERNAME DATE
//	Logout IP USERNAME DATE

import React, { Component } from 'react'
import PropTypes from "prop-types"
import { Button, Label, Grid, Row, Col, Table } from 'react-bootstrap'

class ActionsHistory extends Component {

  render() {
  	var actions = []
  	this.props.actions.forEach((action) => {
      actions.push(
        <tr>
          <td>{action.name}</td>
          <td>{action.ip}</td>
          <td>{action.user}</td>
          <td>{action.date}</td>
        </tr>
      )
    })
    return (
      <Table id="tableActions" className="ActionTable" striped bordered condensed hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>IP</th>
            <th>User</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {actions}
        </tbody>
      </Table>
    )
  }
}

export default ActionsHistory
//            <th>Id</th>
//          <td>{action.id}</td>
