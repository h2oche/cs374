import React, { Component } from 'react';
import { CollectionItem } from 'react-materialize';
import { Row, Col } from 'react-materialize'


export class ClassListItem extends Component {
  render() {
    return (
        <CollectionItem>
          <Row style={{ marginTop: '0px', marginBotton: '0px', height: '15px' }}>
            <Col s={12}>
              {this.props.data.className}
            </Col>
          </Row>
        </CollectionItem>
    )
  }
}

export default ClassListItem

