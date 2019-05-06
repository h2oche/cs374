import React, { Component } from 'react'
import {Button, Textarea} from 'react-materialize';
import Topbar from "../Topbar";
import '../../css/ClassRecord.css';
import Popup from "reactjs-popup";
import {Link} from 'react-router-dom';
import { fire, getFireDB_arr, pushDB, upload_file} from '../../config/fire';
import {Redirect} from 'react-router';



const PopupExample =  () => (
  <Popup trigger={<Button className="pinkcancelbutton buttonleft" >Cancel</Button>} position="top left">
    {close => (
      <div>
        <p>Are you sure to cancel?<br></br><br></br></p>

          <Button className="close pinkcancelbutton" onClick={close}>No</Button>
          <Link to="/BOBO">
            <Button className="close pinkcancelbutton" style={{float:"right"}} onClick={ClassRecord.doneonClick}>
              Yes
            </Button>
          </Link>
      </div>
    )}
  </Popup>
)



const INITIAL_STATE = {
  instructor:'Amy',
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
      this.setState({...this.state, redirect: true, redirectTo: "/BOBO/" });
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
                <input ref={_input3 => this.inputElementcamera = _input3} type="file" accept="image/*" capture="camera"/>
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