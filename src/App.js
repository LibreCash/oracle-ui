import React, { Component } from 'react'
import { connect } from 'react-redux'
import logo from './logo.svg'
//import './bootstrap.min.css'
//import './bootstrap4.min.css'
//import './bootstrap3.min.css'
import './bootstrap-3.3.7-dist/css/bootstrap.min.css'
import './bootstrap-3.3.7-dist/css/bootstrap-cyborg.min.css'
import './App.css'

import { Button } from 'react-bootstrap'

import Main from './components/Main'

import { startup, initConnection, nodeOp } from './actions'

//import Image from './630a.png'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { ctx: { masterId: 0 } }
  }
  componentDidMount() {
  }

  componentDidUpdate(prevProps) {
    const { ctx, dispatch } = this.props
    if (ctx.connected != prevProps.ctx.connected && ctx.connected) {
      dispatch( initConnection({}) )
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">LibreBank Oracles Admin</h1>
        </header>

        <Main ctx={ this.props.ctx }></Main>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { startupReducer } = state
  const ctx = startupReducer.ctx || { masterId: 0 }
  return { 
    ctx
  }
}

export default connect(mapStateToProps)(App)
