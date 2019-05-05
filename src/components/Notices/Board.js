import React, { Component } from 'react';
import Topbar from '../Topbar';
import {Button, Pagination, Row, Col, Collection} from 'react-materialize';
import NoticeListItem from './NoticeListItem';
import {Redirect} from 'react-router';
import "../../css/Notices/Board.css";

export class Board extends Component {
  state = {
    board: {
      name: "Class A"
    },
    Notices: [],
    validNotices: [],
    displayNotices: [],
    redirect: false,
    redirectTo: "",
  }

  getBoardId = () => {
    return this.props.match.params.id;
  }

  parseQuery = () => {
    var queryString = this.props.location.search;
    var query = {};
    var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
  }

  componentDidMount = () => {
    console.log(this.props);

    //fetch board data
    // var boardId = this.getBoardId();
    var query = this.parseQuery();
    var page = query.page ? query.page * 1 : 1;
    var notices = []; var types = ["homework", "schedule", "activity"];
    var id = 0;

    var genRandomDate = (start, end) => {
      return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

    var genRandomNum = (_max) => {
      return Math.floor(Math.random() * _max);
    }

    for(var i = 0 ; i < 30; i ++) {
      types.forEach(_type => {
        notices.push({
          id: id++,
          type: _type,
          name: _type + " " + id,
          questions: [],
          expireDate: genRandomDate(new Date(2014, 0, 1), new Date()),
          questionCnt: genRandomNum(10),
          important: genRandomNum(3) == 1,
          persistent: genRandomNum(5) == 1, 
        });
      });
    }

    var validNotices = JSON.parse(JSON.stringify(notices));

    var end = Math.min(page*10, validNotices.length);
    var displayNotices = validNotices.slice((page-1) * 10, end);
    console.log(displayNotices);
    console.log(validNotices);
    this.setState({...this.state,
      Notices: notices,
      validNotices,
      displayNotices,
      page,
      redirect: false});
  }

  onPageSelect = (e) => {
    var queryString = "?page="+e;
    var query = this.parseQuery();
    for(let [key, value] of Object.entries(query)) {
      if(key === "page") continue;
      queryString += "&" + encodeURIComponent(key) + "=" + encodeURIComponent(value);
    }

    this.props.history.push(this.props.location.pathname + queryString);
    var page = e;
    var end = Math.min(page*10, this.state.validNotices.length);
    var displayNotices = this.state.validNotices.slice((page-1) * 10, end);
    this.setState({...this.state, page: e, displayNotices});
  }

  renderNoticeItems = () => {
    return this.state.displayNotices.map(_notice => {
      return <NoticeListItem pathname={this.props.location.pathname} data={_notice}/>
    });
  }

  render() {
    return (
      <div className="content">
        <Topbar
          name={this.state.board.name}
          showBack={true}
          backTo="/BOBO/board"
          showOptional={true}
          optionalComponent={<Button
                              id="board-list-add-btn"
                              node="a"
                              floating small
                              className="red"
                              waves="light"
                              icon="add"
                              href={"/BOBO/board/" + this.getBoardId() + "/addNotice"}/>}/>
        
        <Row id="board-notice-list">
          <Collection>
            {this.renderNoticeItems()}
          </Collection>
        </Row>
        <div id="board-pagination-row">
          <Pagination
            activePage={this.state.page}
            maxButtons={6}
            items={Math.ceil(this.state.validNotices.length / 10)}
            onSelect={this.onPageSelect}/>
        </div>
      </div>
    )
  }
}

export default Board
