import React, { Component } from 'react';
import BoardListItem from "./BoardListItem";
import Topbar from "../Topbar";
import {Row, Col, Collection, Autocomplete, Button} from 'react-materialize';
import {Redirect} from 'react-router';

import "../../css/Notices/BoardList.css"

export class NoticeBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      }],
      validBoards: [],
      autocompleteData: {Test:null, Test2:null},
      redirect: false,
      redirectTo: -1,
    }
  }

  componentDidMount = () => {
    var validBoardIds = this.state.BoardUserMap.filter(_mapElem => {
      return _mapElem.userId === this.state.CurrentUser.id;
    }).map(_mapElem => {
      return _mapElem.boardId;
    });

    var validBoards = this.state.Boards.filter(_board => validBoardIds.indexOf(_board.id)>-1);
    var autocompleteData = validBoards.reduce( (_acc, _board) => {
      return {..._acc, [_board.name]:null};
    }, {});
    this.setState({...this.state, validBoards, autocompleteData, showAutocomplete:true});
  }

  onAutocomplete = (_boardName) => {
    var board = this.state.validBoards.find(_board => _board.name === _boardName);
    this.setState({...this.state, redirect: true, redirectTo: "/BOBO/board/" + board.id});
  }

  renderBoardList = () => {
    return this.state.validBoards.map(_board => {
      return <BoardListItem data={_board}/>
    });
  }

  render() {
    if(this.state.redirect)
      return <Redirect to={this.state.redirectTo}/>

    return (
      <div className="content">
        <Topbar
          name="Notice Boards"
          showOptional={true}
          optionalComponent={<Button
                              id="board-list-add-btn"
                              node="a"
                              floating small
                              className="red"
                              waves="light"
                              icon="add"
                              href={"/BOBO/addBoard"}/>}/>
        <Row id="board-list-search-row">
          <Col s={12}>
            {/* <TextInput id="notice-list-search" s={12} icon="search" placeholder="Search notice board name."/> */}
            {this.state.showAutocomplete ?
              <Autocomplete
                options={{data: this.state.autocompleteData, onAutocomplete:this.onAutocomplete}}
                placeholder="Search notice board name"
                icon="search" s={12}/> :
              <span></span>
            }
          </Col>
        </Row>
        <Row>
          <Col s={12}>
            <Collection>{this.renderBoardList()}</Collection>
          </Col>
        </Row>
      </div>
    )
  }
}

export default NoticeBoard