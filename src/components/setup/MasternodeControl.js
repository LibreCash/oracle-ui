import React, { Component } from 'react'
import PropTypes from "prop-types"
import { Button, Label, Grid, Row, Col, Table, Tabs, Tab } from 'react-bootstrap'


class MasternodeControl extends Component {
	render () {
		return (
			<div>
        <Button className="MasterNodeControl-button-logout pull-right" bsStyle="" disabled='false' onClick={()=>{}}>Logout</Button>
			</div>
		)
	}
}

export default MasternodeControl
