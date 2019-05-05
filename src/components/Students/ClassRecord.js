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
        Student: 'tommy',
        Instructor: 'teacher101',
        Date: '2019/05/03',
        Text: 'He made a origami pikachu today! #art',
        Hashtag: ['art']
      }, {
        Student: 'tommy',
        Instructor: 'teacher101',
        Date: '2019/05/03',
        Text: 'He made a origami pikachu today! #art',
        Hashtag: ['art']
      }, {
        Student: 'tommy',
        Instructor: 'teacher101',
        Date: '2019/05/03',
        Text: 'He made a origami pikachu today! #art',
        Hashtag: ['art']
      }, {
        Student: 'tommy',
        Instructor: 'teacher101',
        Date: '2019/05/03',
        Text: 'He made a origami pikachu today! #art',
        Hashtag: ['art']
      }, {
        Student: 'tommy',
        Instructor: 'teacher101',
        Date: '2019/05/03',
        Text: 'He made a origami pikachu today! #art',
        Hashtag: ['art']
      }, {
        Student: 'tommy',
        Instructor: 'teacher101',
        Date: '2019/05/03',
        Text: 'He made a origami pikachu today! #art',
        Hashtag: ['art']
      }
      ]
    }
  }


  renderRecordList = () => {
    var validRecords = this.state.Records.filter(_record => {
      return _record.Student === 'tommy'
    })
    console.log('valid:', validRecords)
    console.log(this.state.Records)
    //return <RecordListItem data={this.state.Records} />;
    return this.state.Records.map(_record => {
      return <RecordListItem data={_record} />
    });
  }

  render() {
    if (this.state.redirect)
      return <Redirect to={this.state.redirectTo} />

    return (
      <div style = {{ width: "100%" }} className="content">
        <Topbar name="Class Record" showBack={true} backTo={"/BOBO/studentProfile/main/" + this.props.match.params.id}></Topbar>

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