import React, { Component } from 'react'
import {Button, Textarea} from 'react-materialize';
import Topbar from "../Topbar";
import '../../css/ClassRecord.css';
import Popup from "reactjs-popup";
import {Link} from 'react-router-dom';
import { fire, getFireDB_arr, pushDB, upload_file} from '../../config/fire';
import {Redirect} from 'react-router';
import {Checkbox} from 'react-materialize'


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

const INITIAL_STATE = {
  InstructorID:'teacher101',
  StudentID: '',
  textname: '',
  textcontent:'',
  file:null,
  student:[],
  autocomplete_student:[],
  date:'',
  redirectTo: "",
  disabled: false,
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
  }
  

  
  handlenameChange = e =>
  {
    this.setState({textname : e.target.value});
    console.log(this.props.firebase)
    //this.props.firebase.user("note2").set({name:"note222"});
  }
  handlecontentChange = e =>
  {
    this.setState({textcontent : e.target.value});
  }
  handlefileChange(e) {
  this.setState({file:e.target.files});
  }
  doneonClick = () =>
  {
    console.log(this.state);
    var obj = {...this.state};
    obj.date = new Date().getTime();
    
    delete obj.autocomplete_student;
    delete obj.redirectTo;

    if(obj.file)
    {
      var x = document.getElementById("inputfile");
      console.log(x.files[0]);
      // var blob = new Blob(obj.file[0],{ type: "image/jpg" });
      upload_file('images/', x.files[0], x.files[0].name);
    }

    pushDB("Record", obj)
    .then(_res => {
      this.inputElementcontent.value= "";
      this.inputElementname.value="";
      this.setState({...this.state,/*StudentID: ,*/ redirect: true, redirectTo: "/BOBO/studentList/0" });
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

        <div className="row">
          <div className="col s12">
            Students:
            <div className="input-field inline">
              <input type="text"  ref={_input => this.inputElementname = _input} onChange={this.handlenameChange.bind(this)}/>
              <label>Write student's name</label>
            </div>
          </div>
        </div>
        <div className="buttons">
          <form action="#" >
              <div className="btn pinkbutton buttonleft" onClick={this.fileclick}>
                <input ref={_input => this.inputElementfile = _input}  id="inputfile" type="file" onChange={this.handlefileChange.bind(this)} multiple name="File"/>
                <label className="bigfont">File</label>
              </div>           <div className="btn pinkbutton" onClick={this.galleryclick}>
                <input ref={_input2 => this.inputElementgallery = _input2} type="file" accept="image/*;capture=camera"/>
                <label className="bigfont">Camera</label>
              </div>           <div className="btn pinkbutton" onClick={this.cameraclick}>
                <input ref={_input3 => this.inputElementcamera = _input3} type="file" accept="image/*"/>
                <label className="bigfont">Gallery</label>
              </div>
              
            </form>
          </div>
          <hr className="bottommargin" color="#d3d3d3"></hr>
          <div className="bottommargin">
            <Textarea placeholder="Write class records..
              #classs #amy"
              onChange={this.handlecontentChange}  ref={_input => this.inputElementcontent = _input} value={this.state.textcontent}/>
              <div className="row">
                <CancelPopup/>
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