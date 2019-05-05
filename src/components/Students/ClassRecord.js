import React, { Component } from 'react'
import Topbar from '../Topbar';
import Demographic from './Demographic'

export class ClassRecord extends Component {
    state={
    }

    render() {
        return (
        <div style = {{width:"100%"}} className="content">
            <Topbar name="Class Record" showBack={true} backTo = {"/BOBO/studentProfile/main/"+this.props.match.params.id}></Topbar>
            <hr style = {{width: "360px", border:'none', backgroundColor:'darkgray', height:'2px'}}/>
            <Demographic />
            <hr style = {{width: "360px", border:'none', backgroundColor:'darkgray', height:'2px'}}/>
            <div>
                여기에 추가하세욤
            </div>
        </div>
        );
    }
}





export default ClassRecord