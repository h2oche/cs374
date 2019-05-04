import React, { Component } from 'react'
import {Button, Textarea} from 'react-materialize';
import Topbar from "../Topbar";
import '../../css/ClassRecord.css';
import Popup from "reactjs-popup";
import {Link} from 'react-router-dom';
import {Row, Col} from 'react-materialize'

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
export class ClassRecord extends Component {
  state={
    textname: '',
    textcontent:'',
    file:null,
  }
  handlenameChange = e =>
  {
    this.setState({textname : e.target.value});
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

    if(this.state.file!=null)
    {
      let filenames="";
      for(var i=0;i<this.state.file.length;i++)
      {
        filenames += "File_name : " + this.state.file[i].name + " File_modified : "
        + this.state.file[i].name + "\n";
      }
      alert('Student : ' + this.state.textname + '  Content : ' + this.state.textcontent
        + '  files :' + filenames);

    }
    else
    {
      alert('Student : ' + this.state.textname + '  Content : ' + this.state.textcontent);
    }
  }
  render() {
    return (
      <div className="content">
        <Topbar name="Upload Class Record" showBack={true} backTo="/BOBO"/>
       <div className="row">
        <div className="col s12">
          Students:
          <div className="input-field inline">
            <input type="text"/>
            <label>Write student's name</label>
          </div>
        </div>
      </div>
       <div className="buttons">
         <form action="#" >
            <div className="btn pinkbutton buttonleft">
              <input type="file" id="File" onChange={this.handlefileChange.bind(this)} multiple/>
              <label htmlFor="File" className="bigfont">File</label>
            </div>           <div className="btn pinkbutton">
              <input type="file" id="Camera" accept="image/*" capture="camera"/>
              <label htmlFor="Camera" className="bigfont">Camera</label>
            </div>           <div className="btn pinkbutton">
              <input type="file" id="Gallery" accept="image/*;capture=camera"/>
              <label htmlFor="Gallery" className="bigfont">Gallery</label>
            </div>
          </form>
        </div>
        <hr className="bottommargin" color="#d3d3d3"></hr>
        <div className="bottommargin">
          <Textarea placeholder="Write class records..
            #classs #amy"
            onChange={this.handlecontentChange} value={this.state.textcontent}/>
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
