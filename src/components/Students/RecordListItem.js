import React, { Component } from 'react';
import { CollectionItem } from 'react-materialize';
import { Row, Col } from 'react-materialize'

import "../../css/Students/ClassRecord.css"

export class RecordListItem extends Component {
  render() {
    console.log(this.props.data)
    return (
      <CollectionItem>
     hello
      </CollectionItem>
    )
  }
}

export default RecordListItem
