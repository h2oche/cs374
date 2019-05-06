import React, { Component } from 'react'
import { Redirect } from 'react-router';
import {Link} from 'react-router-dom'
import { Row, Col, Collection, CollectionItem, Autocomplete, Button, Dropdown, Select, Divider } from 'react-materialize';

import Topbar from '../Topbar';
import Demographic from './Demographic'
//import RecordListItem from './RecordListItem';

import '../../css/Students/StudentProfile.css'
import "../../css/Students/ClassRecord.css"

export class ClassRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Records: [{
        StudentID: 'tommy',
        Instructor: 'teacher101',
        Date: '2019/05/03',
        Text: 'He made a origami pikachu today!',
        Hashtag: ['art']
      }, {
        StudentID: 'runxia',
        Instructor: 'sam',
        Date: '2019/05/03',
        Text: 'He made a origami pikachu today!',
        Hashtag: ['art']
      }, {
        StudentID: 'tommy11',
        Instructor: 'sam',
        Date: '2019/05/08',
        Text: 'He made a origami pikachu today!',
        Hashtag: ['art', 'origami']
      }, {
        StudentID: 'jinjin',
        Instructor: 'teacher101',
        Date: '2019/05/09',
        Text: 'He made a origami pikachu today!',
        Hashtag: ['art', 'jin']
      }, {
        StudentID: 'woo-woo',
        Instructor: 'sam',
        Date: '2019/05/09',
        Text: 'He made a origami pikachu today!',
        Hashtag: ['art', 'pikachu']
      }, {
        StudentID: 'tommy',
        Instructor: 'teacher101',
        Date: '2019/05/10',
        Text: 'He made a origami pikachu today! \n He tried very hard, but he failed to complete it. TT ',
        Hashtag: ['pikapika', 'art']
      }, {
        StudentID: 'tommy',
        Instructor: 'Juho',
        Date: '2019/05/10',
        Text: 'He made a origami pikachu today! \n He tried very hard, but he failed to complete it. TT ',
        Hashtag: ['pikapika']
      }, {
        StudentID: 'tommy',
        Instructor: 'Juho',
        Date: '2019/05/12',
        Text: 'He made a origami pikachu today! \n He tried very hard, but he failed to complete it. TT ',
        Hashtag: ['pikapika', 'chu', 'art']
      }, {
        StudentID: 'tommy',
        Instructor: 'teacher101',
        Date: '2019/05/14',
        Text: 'He made a origami pikachu today! \n He tried very hard, but he failed to complete it. TT ',
        Hashtag: ['pikapika', 'origami']
      }
      ]
    }
  }

  renderRecordList = () => {
    var validRecords = this.state.Records.filter(_record => {
      return _record.StudentID === 'tommy' //FIXME:
    })
    console.log('valid:', validRecords)
    console.log(this.state.Records)
    //return <RecordListItem data={this.state.Records} />;
    return validRecords.map(_record => {
      return <RecordListItem data={_record} test={this.passSetState}/>
    });
  }

  passSetState = () => {
    console.log("test A");
  }

  render() {
    if (this.state.redirect)
      return <Redirect to={this.state.redirectTo} />

    return (
      <div style = {{ width: "100%" }} className="content class-record-content">
      <div>
        <Topbar 
          name="Class Record" 
          showBack={true} 
          backTo={"/BOBO/studentProfile/main/" + this.props.match.params.id}
          showOptional={true}
          optionalComponent={<Button
                              id="board-list-add-btn"
                              node="a"
                              floating small
                              waves="light"
                              icon="add"
                              href={"/BOBO/classRecord"}/>}></Topbar>
      </div>

        <div className="class-record-container">
          <hr style={{ width: "360px", border: 'none', backgroundColor: 'darkgray', height: '2px' }} />
          <Demographic />
          <hr style={{ width: "360px", border: 'none', backgroundColor: 'darkgray', height: '2px' }} />

          <Row id="show-record-list-row">
            <Col s={12}>
              <Collection>
                {this.renderRecordList()}
              </Collection>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}


class RecordListItem extends Component {
  render() {
    console.log(this.props.data)
    this.props.test();
    return (
      <CollectionItem>
        <Row s={12}>
          <Col s={4} style={{ color:'#ad1457'/*pink darken-3*/}}>{this.props.data.Date}</Col>
          <Col s={2}></Col>
          <Col s={6} className='who-wrote-col'>{"wrote by: " +  this.props.data.Instructor}</Col>
        </Row>
        <Row>
          <Col>
            {this.props.data.Text}
          </Col>
        </Row>
        {/* Hashtags */}
        <Row>
          <Col>
            <Hashtag data={this.props.data.Hashtag} />
          </Col>
        </Row>
      </CollectionItem>
    )
  }
}

class Hashtag extends Component {
  render() {
    console.log('hashtag!', this.props.data)
    return (
      this.props.data.map(_elem => {
        return <Hash data={_elem} />
      })
    );
  }
}

class Hash extends Component {
  onHashtagSelection = e => {
    console.log('select !!!')
  }

  render() {
    return (
      <span id='hash-span' onClick={this.onHashtagSelection()}>{'#' + this.props.data + ' '}</span>
    );
  }
}

export default ClassRecord