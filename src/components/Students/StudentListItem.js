import React, { Component } from 'react';
import { CollectionItem } from 'react-materialize';
import { Row, Col } from 'react-materialize'
import {fire, download_picture,getPictureURL} from '../../config/fire'


import photo from './student_photo.jpeg'

export class StudentListItem extends Component {
  constructor(props){
    super(props);
    fire();
    this.state={
      url: "",
      mount:true,
      originurl: "",
    }

  }
  
  givesrc = (name) => {
    // console.log(name);
    getPictureURL(name, this);
    
    
    // var picurl = getPictureURL(this.props.data.name);
    // var img = document.getElementById('profile');
    // console.log(this.state.url)
    if(this.state.url)
      return download_picture(this.state.url,this);
    // return null;

  }
  componentWillUpdate = () => {
    

  }
  
  componentDidMount = () => {
    
    

  }
  shouldComponentUpdate() {
    return this.state.mount;
  }

  
  render() {
    this.givesrc(this.props.data.name);
    
    console.log(this.props.data.name, this.state);
    
    return (
      <CollectionItem className="student" href={"/BOBO/studentProfile/main/"+"instructor_id/"+this.props.data.id}>
        <Row className="studentChild" style={{ marginTop: '0px', marginBotton: '0px', height: '70px' }}>
          {/* profile image */}
          <Col s={3} style={{ alignItems: 'center' }}>
            {/* <img className="profileImage" id="profile" src={purl} alt="photo" width='70px' height='70px'></img> */}
            <img className="profileImage" src={ this.state.url===this.state.originurl ? photo : this.state.url} alt="photo" width='70px' height='70px'></img>
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
