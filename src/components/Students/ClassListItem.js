import React, { Component } from 'react';
import { CollectionItem } from 'react-materialize';
import { Row, Col } from 'react-materialize'


export class ClassListItem extends Component {
  render() {
    return (
      <option value={this.props.data.id} onClick>
        {this.props.data.className}
      </option>
    )
  }
}

export default ClassListItem

