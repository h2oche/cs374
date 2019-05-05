import React, { Component } from 'react';
import {CollectionItem} from 'react-materialize';

export class NoticeListItem extends Component {
  renderTypeBadge = () => {
    //this.props.pathname + "/notice/" + this.props.data.id
    return <div className="notice-list-item">{this.props.data.type[0].toUpperCase()}</div>;
  }

  render() {
    return (
      <CollectionItem>
        {this.renderTypeBadge()}
        {this.props.data.name}
      </CollectionItem>
    )
  }
}

export default NoticeListItem
