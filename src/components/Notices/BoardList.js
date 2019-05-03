import React, { Component } from 'react';
import BoardListItem from "./BoardListItem";
import Topbar from "../Topbar";
import {Row, Col, Collection} from 'react-materialize';

export class NoticeBoard extends Component {
  state = {
    Boards : [ {
        id: 1,
        name: "Class A",
      },{
        id: 2,
        name: "Class B",
      },{
        id: 3,
        name: "Class C"
      },{
        id: 4,
        name: "Class D",
      },{
        id: 5,
        name: "Class E",
      },{
        id: 6,
        name: "Class F"
      }
    ],
    BoardUserMap : [{
      userId: 1,
      boardId: 1
    }, {
      userId: 1,
      boardId: 2
    }, {
      userId: 2,
      boardId: 1
    }, {
      userId: 1,
      boardId: 4
    }, {
      userId: 1
    }],
    CurrentUser : {
      id: 1,
      name: "안승민"
    },
    UnreadPosts : [{
      userId: 1,
      postId: 34,
      boardId: 1 
    }, {
      userId: 1,
      postId: 35,
      boardId: 2
    }, {
      userId: 1,
      postId: 36,
      boardId: 1
    }]
  }

  render() {
    return (
      <div className="content">
        <Topbar name="Notice Boards" showBack={true} backTo="/BOBO"/>
        <Row>
          <Col s={12}>Search</Col>
        </Row>
        <Row>

        </Row>
        <Row>
          <Col s={12}>
            <Collection>
              {this.state.Boards.map(_board => {
                return <BoardListItem name={_board.name}/>
              })}
            </Collection>
          </Col>
        </Row>
      </div>
    )
  }
}

export default NoticeBoard
