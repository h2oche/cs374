import React, { Component } from 'react'
import {Row, Col, Autocomplete,Button, Textarea,Checkbox} from 'react-materialize';
import Topbar from "../Topbar";
import '../../css/ClassRecord.css';
import '../../css/Common.css';
import Popup from "reactjs-popup";
import {Link} from 'react-router-dom';
import { fire, getFireDB,getFireDB_arr, pushDB, upload_file} from '../../config/fire';
import {Redirect} from 'react-router';



const PopupExample =  () => (
  <CancelPopup trigger={<Button className="pinkcancelbutton buttonleft" >Cancel</Button>} position="top left">
    {close => (
      <div>
        <p>Are you sure to cancel?<br></br><br></br></p>

          <Button className="close pinkcancelbutton" onClick={close}>No</Button>
          <Link to="/studentList/tommy11">
            <Button className="close pinkcancelbutton" style={{float:"right"}} onClick={ClassRecord.doneonClick}>
              Yes
            </Button>
          </Link>
      </div>
    )}
  </CancelPopup>
)



const INITIAL_STATE = {
  InstructorID:'teacher101',
  StudentID: '',
  Studentname: '',
  Text:'',
  file:null,
  student:[],
  autocomplete_student:[],
  autocompleteData: {Test:null, Test2:null},
  Users:[],
  Date:'',
  redirectTo: "",
  disabled: false,
  Hashtag:[],

};

export class ClassRecord extends Component {
  constructor(props){
    super(props);
    fire();
    this.state={...INITIAL_STATE}
    this.setRef = ref => {
      this.file = ref;
    }
  }

  componentDidMount = () => {
    
    getFireDB_arr('User/',this,'autocomplete_student','type','parent');
    getFireDB()
    .then(res =>{
      let DB = res.val();
      var Users = [];
      for( var key in DB.User ) Users.push(DB.User[key]);
      var Parents = Users.filter(_mapElem => {
        return _mapElem.type == 'parent';
      }).map(_mapElem => {
        return _mapElem.name;
      });
      var autocompleteData = Parents.reduce( (_acc, _user) => {
        return {..._acc, [_user]:null};
      }, {});
      this.setState({...this.state, Users, autocompleteData, showAutocomplete:true});
    });
  }
  

  
  handlenameChange = e =>
  {
    this.setState({...this.state, Studentname : e.target.value});
  }
  handlecontentChange = e =>
  {
    this.setState({...this.state, Text : e.target.value});
  }
  handlefileChange(e) {
  this.setState({...this.state, file:e.target.files});
  }
  onAutocomplete = (_userName) => {
    console.log(this.state.Users);

    var parent = this.state.Users.find(_user => _user.name === _userName);

    this.setState({...this.state, StudentID:parent.id,Studentname:_userName});
    var select_parent = document.getElementById("studentname");
    select_parent.value = _userName;

  }
  doneonClick = () =>
  {
    //console.log(this.state);
    var obj = {...this.state};
    var rawdate = new Date();
    var rawmonth = rawdate.getMonth() + 1;
    var datestring = String(rawdate.getFullYear()) +"/"+ String(rawmonth)+"/" + String(rawdate.getDate()) ;
    
    obj.Date = datestring
    
    delete obj.autocomplete_student;
    delete obj.redirectTo;
    delete obj.Users;
    delete obj.showAutocomplete;
    delete obj.disabled;

    var regex = /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm;
    var match;
    
    obj.Hashtag = [];

    while ((match = regex.exec(obj.Text))) {
        // matches.push(match[1]);
        obj.Hashtag.push(match[1]);
    }

    // console.log(matches);

    if(obj.file)
    {
      var fromfile = document.getElementById("inputfile");
      var fromcamera = document.getElementById("inputcamera");
      var fromgallery = document.getElementById("inputgallery");

      console.log("123123"+fromfile.files);
      
      
      Array.prototype.forEach.call(fromfile.files, function(file) { 
        upload_file('images/',file,file.name);
       });
       Array.prototype.forEach.call(fromcamera.files, function(file) { 
        upload_file('images/',file,file.name);
       });
       Array.prototype.forEach.call(fromgallery.files, function(file) { 
        upload_file('images/',file,file.name);
       });

      
      //upload_file('images/', x.files[0], x.files[0].name);
      //upload_file('images/', x.files[0], x.files[0].name);
    }
    pushDB("Record", obj)
    .then(_res => {
      this.inputElementcontent.value= "";
      this.inputElementname.value="";
      this.setState({...this.state,/*StudentID: ,*/ redirect: true, redirectTo: "/studentList/tommy11" });
    });
  }

  fileclick = () => {
    this.inputElementfile.click();      
  }
  galleryclick = () => {
    this.inputElementgallery.click();
  }
  cameraclick = () => {
    this.inputElementcamera.click();
  }

  
  render() {
    if(this.state.redirect)
    return <Redirect to={this.state.redirectTo}/>

    return (
        <div className="content">
          <Topbar name="Upload Class Record" showBack={false} backTo="/BOBO"/>    

          <Row id="parent-search-row">
          <Col s={12}>
            {/* <TextInput id="notice-list-search" s={12} icon="search" placeholder="Search notice board name."/> */}
            {this.state.showAutocomplete ?
              <Autocomplete id="studentname"
              ref={_input => this.inputElementname = _input}
                options={{data: this.state.autocompleteData, onAutocomplete:this.onAutocomplete}}
                placeholder="Search student name"
                icon="search" s={12}/> :
              <span></span>
            }
          </Col>
        </Row>
        <div className="buttons">
          <form action="#" >
              <div className="btn pinkbutton buttonleft" onClick={this.fileclick}>
                <input ref={_input => this.inputElementfile = _input}  id="inputfile" type="file" onChange={this.handlefileChange.bind(this)} multiple name="File"/>
                <label className="bigfont">File</label>
              </div>           <div className="btn pinkbutton" onClick={this.galleryclick}>
                <input ref={_input2 => this.inputElementgallery = _input2} type="file" accept="image/*" id="inputcamera" capture="camera"/>
                <label className="bigfont">Camera</label>
              </div>           <div className="btn pinkbutton" onClick={this.cameraclick}>
                <input ref={_input3 => this.inputElementcamera = _input3} type="file" accept="image/*" id="inputgallery"/>
                <label className="bigfont">Gallery</label>
              </div>
              
            </form>
          </div>
          
          <div className="bottommargin">
            <Textarea placeholder="Write class records..
              #classs #amy"
              onChange={this.handlecontentChange}  ref={_input => this.inputElementcontent = _input} value={this.state.Text}/>
              <div className="row">
                <PopupExample/>
                <Button waves="light" onClick={this.doneonClick.bind(this)}
                  className="buttonright pinkcancelbutton">
                  Done
                </Button>
              </div>
            </div>
        </div>
    )
  }
}
export default ClassRecord;

class CancelPopup extends Component {
  state={
    checked:false,
    open:false
  }

  check =(event)=> {
    this.setState({checked: !this.state.checked});
  }


  closing = () => {
    this.setState({checked: false})
  }

  /*<Icon className="menu-icon" medium='true'>delete_forever</Icon>*/
  render() {
    return (
      <Popup contentStyle={{width: '40%'}} trigger={<Button className="pinkcancelbutton buttonleft" >Cancel</Button>}
                position="top left" onClose={this.closing}>
        { close => (
          <div className="NoteDeleteContainer">
              <br/>
                <Checkbox className = "NoteDeleteCheckbox" onChange={this.check} label="" value=""/>
              <span className="NoteDeleteWarningText"> Are you sure to cancel?</span>
              <br/>
              <br/>
                <button className="close pinkcancelbutton" onClick={close}>
                    No
                </button>
              {this.state.checked? (
                <button className="close pinkcancelbutton" style={{float:"right"}} onClick={this.deleteNote}>
                    Yes
                </button>
              ) : null}
          </div>)
        }
      </Popup>
    )
  }
}