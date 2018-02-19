// MasternodePropsEdit
//	- name
//	- ip
//	- secret
//	- encryption password
//  - button Add
//
// MastrnodeLoginView
//	- button remove node
// 	- MasternodesList
//
// MasternodesList
//		- MasternodeListItem
//
// MasternodeListItem (internal)
//  - checkbox select
//	- label name
//	- label ip
//	- input password
//	- button Connect
//
// MasternodeControl
// - button disconnect/logout
//
// Setup
// - localstorage
//
// Utils
// - LocalStorage
// - Crypto

import React, { Component } from 'react'
import PropTypes from "prop-types"
import { Alert, Button, Label, Grid, Row, Col, Table, Tabs, Tab } from 'react-bootstrap'

import Crypto from '../lib/Crypto'

import MasternodePropsEdit from './MasternodePropsEdit'
import MastrnodeLoginView from './MastrnodeLoginView'

import { masternodesListUpdated, startWebsocket } from '../../actions'

class LocalStorage {
	constructor () {
		this.keyMasternodes = 'librebank.masternodes'
	}
	getMasternodes () {
		let v = localStorage.getItem(this.keyMasternodes)
		return JSON.parse(v) || []
	}
	setMasternodes (masternodes) {
		localStorage.setItem(this.keyMasternodes, JSON.stringify(masternodes))
	}
}

class Setup extends Component {
	constructor () {
		super()
		this.storage = new LocalStorage
		this.crypto = new Crypto
//		this.crypto.test()
		this.state = {
			error: null,
		}
	}

	componentWillMount () {
		var masternodes = this.storage.getMasternodes()
		masternodes.forEach((masternode) => {
			masternode.selected = false
		})

		const { dispatch } = this.context.store
    dispatch( masternodesListUpdated( masternodes ))
	}

	onAddMasternode (edit) {
		var masternodes = [...this.props.ctx.masternodes]

		var password = edit.refNewNodePassword.value

		this.setState({
	  	...this.state,
	  	error: null
	  })

		if (password === '') {
		  this.setState({
		  	...this.state,
		  	error: {
		  		title: 'Crypto password is empty',
		  		message: `Unable to add masternode. Please set crypto password`
		  	}
		  })
			return
		}

		masternodes.push({
			id: `${Date.now().toString()}-${Math.random()}`, // todo: possible use as salt, review
			selected: false,
		  name: edit.refNewNodeName.value,
      url: edit.refNewNodeUrl.value,
      secret: this.crypto.encrypt(edit.refNewNodeSecret.value, password)
    })

    this.storage.setMasternodes(masternodes)

		const { dispatch } = this.context.store
    dispatch( masternodesListUpdated( masternodes ))
	}

	onRemoveMasternode () {
    var masternodes = []
    this.props.ctx.masternodes.forEach((masternode) => {
    	if (!masternode.selected)
    		masternodes.push(masternode)
    })

    this.storage.setMasternodes(masternodes)

    const { dispatch } = this.context.store
    dispatch( masternodesListUpdated( masternodes ))
	}

	onConnect (masternode, password) {
    let secret = this.crypto.decrypt(masternode.secret, password)
    if (!secret || secret === '') {
		  this.setState({
		  	...this.state,
		  	error: {
		  		masternodeId: masternode.id,
		  		title: 'Bad crypto password',
		  		message: `Unable to decrypt masternode ${masternode.id} ${new Date()}`
		  	}
		  })
  	}
  	else {
  		this.setState({
		  	...this.state,
		  	error: null
		  })

		  // connect
      const { dispatch } = this.context.store
	    dispatch( startWebsocket({
	    	url: masternode.url,
	    	secret 
	    }))
  	}
	}

	render () {
		return (
			<div className='container'>
				<MasternodePropsEdit ctx={this.props.ctx} onAdd={this.onAddMasternode.bind(this)} />
				{(this.state.error) ?
					(<Alert bsStyle="danger" disabled={false}>
	          <h4>{this.state.error.title}</h4>
	          <p>{this.state.error.message}</p>
	        </Alert>)
	        : ''
				}
				<MastrnodeLoginView ctx={this.props.ctx} 
					onRemove={this.onRemoveMasternode.bind(this)}
					onConnect={this.onConnect.bind(this)} />
			</div>
		)
	}
}

Setup.contextTypes = {
  store: PropTypes.object.isRequired
}

export default Setup
