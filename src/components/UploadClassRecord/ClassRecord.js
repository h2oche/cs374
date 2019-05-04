import React, { Component } from 'react'
import {Button, Textarea} from 'react-materialize';
import Topbar from "../Topbar";
import '../../css/ClassRecord.css';
import Popup from "reactjs-popup";
import {Link} from 'react-router-dom';

const PopupExample =  () => (
  <Popup trigger={<Button>Cancel</Button>} position="top left">
    {close => (
      <div>
        <p>Are you sure to cancel?<br></br><br></br></p>

          <Button className="close" onClick={close}>No</Button>
          <Link to="/BOBO">
            <Button className="close" style={{float:"right"}} onClick={ClassRecord.doneonClick}>
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
  this.setState({file:e.target.files[0]});
  }
  doneonClick = () =>
  {
    console.log("E");
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
     <div >
        <form action="#">
          <div className="btn">
            <input type="file" onChange={this.handlefileChange.bind(this)}/>
            <input type="file" accept="image/*;capture=camera"/>
            <input type="file" accept="image/*" capture="camera"/>
          </div>
        </form>
      </div>
        <hr className="bottommargin" color="#d3d3d3"></hr>
        <div className="bottommargin">
          <Textarea placeholder="Write class records..
            #classs #amy" style={{height:200}}
            onChange={this.handlecontentChange} value={this.state.textcontent}/>

            <div className="row">
              <PopupExample/>

              <Button waves="light" onClick={this.doneonClick.bind(this)}
                className="buttonright">
                Done
              </Button>
            </div>
          </div>
      </div>


    )
  }
}

export default ClassRecord;
