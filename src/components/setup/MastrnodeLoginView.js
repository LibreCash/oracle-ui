// MastrnodeLoginView
//	- button remove node
// 	- MasternodesList
//

import React, { Component } from 'react'
import PropTypes from "prop-types"
import { Panel, Button, Label, Grid, Row, Col, Table, Tabs, Tab } from 'react-bootstrap'

import MasternodesList from './MasternodesList'

import { masternodesListUpdated } from '../../actions'

class MastrnodeLoginView extends Component {
	isSelected () {
		let selected = this.props.ctx.masternodes.find((masternode) => masternode.selected)
		return !!selected
	}
	onSelectAll () {
		let masternodes = [...this.props.ctx.masternodes]

		var selected = this.isSelected()

    masternodes.forEach((masternode) => {
    	masternode.selected = !selected
		})

    const { dispatch } = this.context.store
    dispatch( masternodesListUpdated( masternodes ))
	}

	render () {

		var selected = this.isSelected()

		return (
			<div>
        <Panel>
        	<h2>Localstorage Masternodes</h2>
        	<Button className="MasternodeSelectAll-button pull-left" onClick={this.onSelectAll.bind(this)}>Select All</Button>
					<MasternodesList masternodes={this.props.ctx.masternodes} onConnect={this.props.onConnect} />
     			<Button className="MasternodeRemove-button pull-left" bsStyle='danger' disabled={!selected} onClick={(()=>this.props.onRemove(this)).bind(this)}>Remove</Button>
        </Panel>
			</div>
		)
	}
}

MastrnodeLoginView.contextTypes = {
  store: PropTypes.object.isRequired
}

export default MastrnodeLoginView
