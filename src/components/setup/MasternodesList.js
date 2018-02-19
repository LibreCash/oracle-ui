// MasternodesList
//    - MasternodeListItem
//
// MasternodeListItem (internal)
//  - checkbox select
//  - label name
//  - label url
//  - input password
//  - button Connect
//

import React, { Component } from 'react'
import PropTypes from "prop-types"
import { Form, FormGroup, Button, Label, Grid, Row, Col, Table, Tabs, Tab } from 'react-bootstrap'

import { masternodesListUpdated } from '../../actions'

/*
class MasternodesListItem {
  render () {
    return (<div></div>
    )
  }
}*/

class MasternodesList extends Component {

  onChangeCheckbox (masternode) {
    masternode.selected = !masternode.selected
    
    const { dispatch } = this.context.store
    var masternodes = [...this.props.masternodes]
    dispatch( masternodesListUpdated( masternodes ))
  }

  onConnectClick (masternode) {
    let passwordRef = this.passwordRefs[masternode.id]
    let password = passwordRef.value
    passwordRef.value = ''
    this.props.onConnect(masternode, password)
  }

	render () {
		let masternodes = []

    let self = this

    this.passwordRefs = {}

    this.props.masternodes.forEach((masternode) => {
      masternodes.push(
        <tr>
          <td><input key={`checkbox${masternode.id}`} type='checkbox' checked={masternode.selected} onChange={(()=>this.onChangeCheckbox(masternode)).bind(this)} /></td>
          <td>{masternode.name}</td>
          <td>{masternode.url}</td>
          <td><input className='form-control' type='password' ref={ref => { self.passwordRefs[masternode.id] = ref }}/></td>
          <td>
            <Button className="MasternodeConnect-button" bsStyle='success' onClick={this.onConnectClick.bind(this, masternode)} >Connect</Button>
          </td>
        </tr>
      )
    })

    return (
      <Table id="tableMastenodesList" className="MastenodesListTable" striped bordered condensed hover>
        <thead>
          <tr>
            <th>Select</th>
            <th>Name</th>
            <th>URL</th>
            <th>Crypto Password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {masternodes}
        </tbody>
      </Table>
    )
  }
}

MasternodesList.contextTypes = {
  store: PropTypes.object.isRequired
}
export default MasternodesList
