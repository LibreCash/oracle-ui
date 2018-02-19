import React, { Component } from 'react'
import PropTypes from "prop-types"
import { Button, Label, Grid, Row, Col, Table } from 'react-bootstrap'

class Notifications extends Component {
  componentWillUpdate() {
    var el = this.table()
    this.shouldTableScroll = el.clientHeight - (el.scrollHeight - el.scrollTop) == 0
  }

  componentDidUpdate() {
    if (this.shouldTableScroll)
      this.scrollToBottom()
  }

  scrollToBottom() {
    var el = this.table()
    el.scrollTop = el.scrollHeight
  }

  table() {
    return document.getElementById("tableNotifications")
  }

  render() {

    // notification.nodeId - masterNodeId
    var notifications = []
    this.props.notifications.forEach((notification) => {
      notifications.push(
        <tr>
          <td>{1}</td>
          <td>{notification.date}</td>
          <td>{notification.code}</td>
          <td>{JSON.stringify(notification.object)}</td>
        </tr>
      )
    })

    return (
      <Table id="tableNotifications" className="NotificationTable" striped bordered condensed hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Code</th>
            <th>Object</th>
          </tr>
        </thead>
        <tbody>
          {notifications}
        </tbody>
      </Table>
    )
  }
}

export default Notifications
