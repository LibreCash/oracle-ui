// MasternodePropsEdit
//	- input:text name
//	- input:text url
//	- input:text secret
//	- input:text encryption password
//  - button Add

import React, { Component } from 'react'
import PropTypes from "prop-types"
import { Button, Label, Grid, Row, Col, Table, Panel, Form, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap'

//import { addMasternode } from '../actions'
//import Image from '../../563b.png'
import Image from '../../729a.png'
//import Image from '../../630a.png'

class MasternodePropsEdit extends Component {
	onAdd () {
		this.props.onAdd(this)

		this.refNewNodeName.value =
		this.refNewNodeUrl.value =
    this.refNewNodeSecret.value = 
    this.refNewNodePassword.value = ''
	}
	render () {
		return (
			<div>
        <Panel>
        <img src={Image}/>
        		<h2>Add new Masternode</h2>
            <Form horizontal>
              <FormGroup controlId="formHorizontalName">
              	<Col componentClass={ControlLabel} sm={2}>
              	  Name
              	</Col>
              	<Col sm={10}>
                	<FormControl id="formHorizontalName" inputRef={ref => {this.refNewNodeName = ref; }} />
	                <HelpBlock bsClass='pull-left'>Display name</HelpBlock>
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalWsUrl">
              	<Col componentClass={ControlLabel} sm={2}>
              	  URL
              	</Col>
              	<Col sm={10}>
                  <FormControl id="formHorizontalWsUrl" inputRef={ref => {this.refNewNodeUrl = ref; }} />
	                <HelpBlock bsClass='pull-left'>e.g. "http://localhost:27999"</HelpBlock>
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalSecret">
              	<Col componentClass={ControlLabel} sm={2}>
              	  Master Secret
              	</Col>
              	<Col sm={10}>
	                <FormControl id="formHorizontalSecret" type="password" inputRef={ref => {this.refNewNodeSecret = ref; }} />
	                <HelpBlock bsClass='pull-left'>Connection secret passphrase</HelpBlock>
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalPassword">
              	<Col componentClass={ControlLabel} sm={2}>
              	  Crypto Password
              	</Col>
              	<Col sm={10}>
	                <FormControl id="formHorizontalPassword" type="password" inputRef={ref => {this.refNewNodePassword = ref; }} />
	                <HelpBlock bsClass='pull-left'>Localstorage AES encryption password</HelpBlock>
                </Col>
              </FormGroup>

              <FormGroup>
	            	<Col smOffset={2} sm={10}>
		             	<Button className="NewMastrnode-button pull-left" bsStyle='success' onClick={this.onAdd.bind(this)}>Add</Button>
		            </Col>
              </FormGroup>
            </Form>
        </Panel>
			</div>
		)
	}
}

export default MasternodePropsEdit
