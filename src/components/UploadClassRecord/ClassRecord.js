import React, { Component } from 'react'
import {Button, Textarea, Icon} from 'react-materialize';
import Topbar from "../Topbar";
import '../../css/ClassRecord.css';
import Popup from "reactjs-popup";

const PopupExample =  () => (
  <Popup trigger={<Button>Cancel</Button>} position="top left">
    {close => (
      <div>
        Will you really cancel?
        <a className="close" onClick={close}>
          &times;
        </a>
      </div>
    )}
  </Popup>
)

export class ClassRecord extends Component {
  state={
    textname: '',
    textcontent:'',
    file:null,
    students:[
      "JinRyu","Woo","Seungmin","RyuSangjin","Yunha"
    ],
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
  this.setState({file:e.target.files[0]});
  }
  doneonClick()
  {
    if(this.state.file!=null)
    {
      alert('Student : ' + this.state.textname + '  Content : ' + this.state.textcontent
    + '  file_name :' + this.state.file.name + '  file_modified_date : '+ this.state.file.LastModifiedDate
   + ' file_size : ' + this.state.file.size);
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
        <div>
          Students :
         <textarea name="name" id="upload_studentsname"
           value = {this.state.textname} placeholder="Write students' name.."
           style={{width:400}} className="materialize-textarea"
           onChange={this.handlenameChange}/>
       </div><br></br>
        <form action="#">
          <div className="btn">
            <input type="file" onChange={this.handlefileChange.bind(this)}/>
          </div>
        </form>
        <hr color="#d3d3d3"></hr>
        <Textarea placeholder="Write class records..
          #classs #amy" style={{width: 600, height:200}}
          onChange={this.handlecontentChange} value={this.state.textcontent}/>

          <div className="row">
            <PopupExample/>

            <Button waves="light" onClick={this.doneonClick.bind(this)}
              className="buttonright">
              Done
            </Button>
          </div>
      </div>


    )
  }
}

export default ClassRecord
