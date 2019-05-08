import React, { Component } from 'react'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom'
import Popup from 'reactjs-popup'

import { Row, Col, Collection, CollectionItem, Button, Icon, Checkbox } from 'react-materialize';
import { fire, getFireDB, pushMultipleDB, pushDB, setDB, deleteDB, download_picture } from '../../config/fire';
import Topbar from '../Topbar';
import Demographic from './Demographic'
//import RecordListItem from './RecordListItem';

import '../../css/Students/StudentProfile.css'
import "../../css/Students/ClassRecord.css"
import '../../css/Common.css'

export class ClassRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Records: [{
        key: '-LeCY3zdkGo8afNw_RxG',
        StudentID: 'tommy',
        InstructorID: 'teacher101',
        Date: '2019/05/03',
        Text: 'He made a origami pikachu today!',
        Hashtag: ['art']
      }, {
        key: '1',
        StudentID: 'runxia',
        InstructorID: 'sam',
        Date: '2019/05/03',
        Text: 'He made a origami pikachu today!',
        Hashtag: ['art']
      }, {
        key: '2',
        StudentID: 'tommy11',
        InstructorID: 'sam',
        Date: '2019/05/08',
        Text: 'He made a origami pikachu today!',
        Hashtag: ['art', 'origami']
      }, {
        key: '3',
        StudentID: 'jinjin',
        InstructorID: 'teacher101',
        Date: '2019/05/09',
        Text: 'He made a origami pikachu today!',
        Hashtag: ['art', 'jin']
      }, {
        key: '4',
        StudentID: 'woo-woo',
        InstructorID: 'sam',
        Date: '2019/05/09',
        Text: 'He made a origami pikachu today!',
        Hashtag: ['art', 'pikachu']
      }, {
        key: '5',
        StudentID: 'tommy',
        InstructorID: 'teacher101',
        Date: '2019/05/10',
        Text: 'He made a origami pikachu today! \n He tried very hard, but he failed to complete it. TT ',
        Hashtag: ['pikapika', 'art']
      }, {
        key: '6',
        StudentID: 'tommy',
        InstructorID: 'Juho',
        Date: '2019/05/10',
        Text: 'He made a origami pikachu today! \n He tried very hard, but he failed to complete it. TT ',
        Hashtag: ['pikapika']
      }, {
        key: '7',
        StudentID: 'tommy',
        InstructorID: 'Juho',
        Date: '2019/05/12',
        Text: 'He made a origami pikachu today! \n He tried very hard, but he failed to complete it. TT ',
        Hashtag: ['pikapika', 'chu', 'art']
      }, {
        key: '8',
        StudentID: 'tommy',
        InstructorID: 'teacher101',
        Date: '2019/05/14',
        Text: 'He made a origami pikachu today! \n He tried very hard, but he failed to complete it. TT ',
        Hashtag: ['pikapika', 'origami']
      }
      ],
      loaded: false,
      Name: "Loading...",
      Class: "Loading...",
      Age: "Loading...",
      Tel: "Loading...",
      url: "",
      mount:true
    }
  }

  renderRecordList = () => {
    var validRecords = this.state.Records.filter(_record => {
      return _record.StudentID === 'tommy' //FIXME:
    })
    //console.log('valid:', validRecords)
    //console.log(this.state.Records)
    //return <RecordListItem data={this.state.Records} />;
    return validRecords.map(_record => {
      if (_record.InstructorID === 'teacher101') //FIXME: MyID
        return <MyRecordListItem data={_record} test={this.passSetState} />
      else
        return <RecordListItem data={_record} test={this.passSetState} />
    });
  }

  passSetState = () => {
    console.log("test A");
  }

  render() {
    if (this.state.redirect)
      return <Redirect to={this.state.redirectTo} />

    return (
      <div style={{ width: "100%" }} className="content class-record-content">
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
              href={"/BOBO/classRecord"} />}></Topbar>
        </div>

        <div className="class-record-container">
          <hr style={{ width: "360px", border: 'none', backgroundColor: 'darkgray', height: '2px' }} />
          <Demographic Name={this.state.Name} Age={this.state.Age} Tel={this.state.Tel} Class={this.state.Class} ImageURL={this.state.url}/>
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
    //console.log(this.props.data)
    this.props.test();
    return (
      <CollectionItem>
        <Row s={12}>
          <Col s={4} style={{ color: '#ad1457'/*pink darken-3*/ }}>{this.props.data.Date}</Col>
          <Col s={2}></Col>
          <Col s={6} className='who-wrote-col'>{"wrote by: " + this.props.data.InstructorID}</Col>
        </Row>
        <Row>
          <Col>
            {this.props.data.Text}
          </Col>
        </Row>
        {/* Hashtags */}
        <Row>
          <Col>
            <Hashtags data={this.props.data.Hashtag} />
          </Col>
        </Row>
      </CollectionItem>
    )
  }
}

class MyRecordListItem extends Component {
  render() {
    //console.log(this.props.data)
    //this.props.test();
    return (
      <CollectionItem>
        <Row s={12}>
          <Col s={4} style={{ color: '#ad1457'/*pink darken-3*/ }}>{this.props.data.Date}</Col>
          <Col s={2}></Col>
          <Col s={6} className='who-wrote-col'>{"wrote by: " + this.props.data.InstructorID}</Col>
        </Row>
        <Row>
          <Col>
            {this.props.data.Text}
          </Col>
        </Row>
        {/* Hashtags and edit/delete buttons */}
        <Row s={12}>
          <Col s={8}>
            <Hashtags data={this.props.data.Hashtag} />
          </Col>
          {/* edit/delete buttons */}
          <Col s={4}><div align='right'>
            <Link to={"/BOBO/studentProfile/editClassRecord/" + this.props.data.key}>
              <Icon className="edit-record-icon" small='true'>edit</Icon>
            </Link>
            {/* <Icon small='true'>delete</Icon> */}
            <DeleteRecordPopup data={this.props.data}></DeleteRecordPopup>
          </div></Col>
        </Row>
      </CollectionItem>
    )
  }
}


class Hashtags extends Component {
  render() {
    console.log('hashtag!', this.props.data)
    return (
      this.props.data.map(_elem => {
        return <Hashtag data={_elem} />
      })
    );
  }
}

class Hashtag extends Component {
  onHashtagSelection = e => {
    console.log('select !!!')
    //window.location.reload();
  }

  render() {
    return (
      <span id='hash-span' onClick={this.onHashtagSelection()}>{'#' + this.props.data + ' '}</span>
    );
  }
}




class DeleteRecordPopup extends Component {
  state = {
    checked: false,
    open: false
  }

  check = (event) => {
    this.setState({ checked: !this.state.checked });
  }

  deleteRecord = () => {
    deleteDB('/Record/' + this.props.data.key);
    window.location.reload();
  }

  closing = () => {
    this.setState({ checked: false })
  }

  /*<Icon className="menu-icon" medium='true'>delete_forever</Icon>*/
  render() {
    return (
      <Popup contentStyle={{ width: '60%' }} trigger={<div style={{ display: "inline-block" }}><Icon className="InstructorNoteIcon" small='true'>delete_forever</Icon></div>}
        position="top right" onClose={this.closing}>
        {close => (
          <div className="RecordDeleteContainer">
            <span className="RecordDeleteTitle">
              Delete Record
              </span>
            <br />
            <Checkbox className="RecordDeleteCheckbox" onChange={this.check} label="" value="" />
            <span className="RecordDeleteWarningText">I hereby understand that I </span>
            <span className="RecordDeleteWarningTextImportant">cannot recover</span>
            <span className="RecordDeleteWarningText"> the deleted record.</span>
            <br />
            <br />
            <button className="close pink-cancel-button" onClick={close}>
              No
                </button>
            {this.state.checked ? (
              <button className="close pink-cancel-button" style={{ float: "right" }} onClick={this.deleteRecord}>
                Yes
                </button>
            ) : null}
          </div>)
        }
      </Popup>
    )
  }
}


export default ClassRecord