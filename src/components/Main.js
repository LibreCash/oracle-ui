import React, { Component } from 'react';

import MasterNode from './MasterNode';

import { Button } from 'react-bootstrap';

import Setup from './setup/Setup';


class Main extends Component {
  componentWillReceiveProps(nextProps) {

  }
  render() {
    var ctx = this.props.ctx;
    return (
      <div className="Main">
        {(()=>{
          if (this.props.ctx.secret) {
            return <MasterNode ctx={ this.props.ctx }></MasterNode>
          }
          else
            return <Setup ctx={ this.props.ctx} />
        })()}
      </div>
    );
  }
}

export default Main;
