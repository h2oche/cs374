import React, { Component } from 'react';
import {CollectionItem} from 'react-materialize';


export class StudentListItem extends Component {
  render() {
    return (
      <CollectionItem href="#">
        {this.props.data.name}
      </CollectionItem>
    )
  }
}

export default StudentListItem
