import React, { Component } from 'react'
import { Redirect } from 'react-router';
import {Link} from 'react-router-dom'
import { Row, Col, Collection, Autocomplete, Button, Dropdown, Select, Divider } from 'react-materialize';

import Topbar from '../Topbar';
import Demographic from './Demographic'
import RecordListItem from './RecordListItem';

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
        Text: 'He made a origami pikachu today! #art',
        Hashtag: ['art']
      }, {
        StudentID: 'runxia',
        Instructor: 'sam',
        Date: '2019/05/03',
        Text: 'He made a origami pikachu today! #art',
        Hashtag: ['art']
      }, {
        StudentID: 'tommy11',
        Instructor: 'sam',
        Date: '2019/05/08',
        Text: 'He made a origami pikachu today! #art',
        Hashtag: ['art', 'origami']
      }, {
        StudentID: 'jinjin',
        Instructor: 'teacher101',
        Date: '2019/05/09',
        Text: 'He made a origami pikachu today! #art',
        Hashtag: ['art', 'jin']
      }, {
        StudentID: 'woo-woo',
        Instructor: 'sam',
        Date: '2019/05/09',
        Text: 'He made a origami pikachu today! #art',
        Hashtag: ['art', 'pikachu']
      }, {
        StudentID: 'tommy',
        Instructor: 'teacher101',
        Date: '2019/05/10',
        Text: 'He made a origami pikachu today! \n He tried very hard, but he failed to complete it. TT #art',
        Hashtag: ['pikapika']
      }, {
        StudentID: 'tommy',
        Instructor: 'Juho',
        Date: '2019/05/10',
        Text: 'He made a origami pikachu today! \n He tried very hard, but he failed to complete it. TT #art',
        Hashtag: ['pikapika']
      }, {
        StudentID: 'tommy',
        Instructor: 'Juho',
        Date: '2019/05/12',
        Text: 'He made a origami pikachu today! \n He tried very hard, but he failed to complete it. TT #art',
        Hashtag: ['pikapika']
      }, {
        StudentID: 'tommy',
        Instructor: 'teacher101',
        Date: '2019/05/14',
        Text: 'He made a origami pikachu today! \n He tried very hard, but he failed to complete it. TT #art',
        Hashtag: ['pikapika']
      }
      ]
    }
  }

  renderRecordList = () => {
    var validRecords = this.state.Records.filter(_record => {
      return _record.StudentID === 'tommy'
    })
    console.log('valid:', validRecords)
    console.log(this.state.Records)
    //return <RecordListItem data={this.state.Records} />;
    return validRecords.map(_record => {
      return <RecordListItem data={_record} />
    });
  }

  render() {
    if (this.state.redirect)
      return <Redirect to={this.state.redirectTo} />

    return (
      <div style = {{ width: "100%" }} className="content">
        <Topbar 
          name="Class Record" 
          showBack={true} 
          backTo={"/BOBO/studentProfile/main/" + this.props.match.params.id}
          showOptional={true}
          optionalComponent={<Button
                              id="board-list-add-btn"
                              node="a"
                              floating small
                              className="red"
                              waves="light"
                              icon="add"
                              href={"/BOBO/classRecord"}/>}></Topbar>

        <div id="record-all">
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


export default ClassRecord