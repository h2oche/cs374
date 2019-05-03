import React, { Component } from 'react'

export class NoticeBoard extends Component {
  state = {
    Boards : {
      "ClassA" : ["post1", "post2"],

    },
    BoardUserMap : {
      
    },
    CurrentUser : {
      id: 1,
      name: "안승민"
    }
  }

  render() {
    return (
      <div className="content">
        Notice Board
      </div>
    )
  }
}

export default NoticeBoard
