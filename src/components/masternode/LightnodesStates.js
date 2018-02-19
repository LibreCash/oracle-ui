import React, { Component } from 'react'
import PropTypes from "prop-types"
import { Button, Label, Grid, Row, Col, Table, Tabs, Tab } from 'react-bootstrap'

// LightnodesStates
//	- button expand exchanges
//  - ExchangesView if expanded
//
// LightnodeStatesTable
//	- name
//	- ip
//	- lastUpdate
//	- lastPrice
//	- error

class LightnodesStates extends Component {
	constructor () {
		super()
	}
	render () {
		var lightnodes = []
    for (let lightnode of this.props.lightnodes) {
//    	console.log(lightnode)
    	var eth = (lightnode.state && lightnode.state.eth) || {}
    	var state = lightnode.state || {}
    	lightnodes.push(
				<Row>
					<Col sm={2}>
						{lightnode.id}
					</Col>
					<Col sm={2}>
						{JSON.stringify(lightnode.connected)}
					</Col>
					<Col sm={2}>
						{eth.activeClient}
					</Col>
					<Col sm={2}>
						{lightnode.avarageRate}
					</Col>
					<Col sm={2}>
						{JSON.stringify(lightnode.error)}
					</Col>
					<Col sm={2}>
						{state.uptime}
					</Col>
				</Row>
    	)
    }
		return (
			<div>
				<Row>
					<Col sm={2}>
						ID
					</Col>
					<Col sm={2}>
						Connected
					</Col>
					<Col sm={2}>
						Ethereum
					</Col>
					<Col sm={2}>
						Avarage Rate
					</Col>
					<Col sm={2}>
						Error
					</Col>
					<Col sm={2}>
						Uptime
					</Col>
				</Row>
				{lightnodes}
			</div>
		)
	}

}

export default LightnodesStates
