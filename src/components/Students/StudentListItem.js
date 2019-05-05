import React, { Component } from 'react';
import { CollectionItem } from 'react-materialize';
import { Row, Col } from 'react-materialize'


import photo from './student_photo.jpeg'

export class StudentListItem extends Component {
  render() {
    return (
      <CollectionItem className="student" href={"/BOBO/studentProfile/main/"+this.props.data.id}>
        <Row className="studentChild" style={{ marginTop: '0px', marginBotton: '0px', height: '70px' }}>
          {/* profile image */}
          <Col s={3} style={{ alignItems: 'center' }}>
            <img className="profileImage" src={photo} alt="photo" width='70px' height='70px'></img>
          </Col>
          {/* name and class */}
          <Col className="studentItem" s={9} >
            <div className="studentItemChild">
              <div className='studentName'>{this.props.data.name}</div>
              <br></br>
              {this.props.data.class}
            </div>
          </Col>
        </Row>
      </CollectionItem>
    )
  }
}

export default StudentListItem
