import React, { Component } from 'react';
import Topbar from '../Topbar';

export class Board extends Component {
  state = {
    board: {
      name: "Class A"
    }
  }

  getBoardId = () => {
    return this.props.match.params.id;
  }

  componentDidMount = () => {
    //fetch board data
  }

  render() {
    return (
      <div className="content">
        <Topbar name={this.state.board.name} backTo={"/BOBO/board"} showBack={true}/>
      </div>
    )
  }
}

export default Board
