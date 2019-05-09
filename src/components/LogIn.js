import React, { Component } from 'react'

export class LogIn extends Component {

    render() {
        return (
        <div style = {{width:"100%"}} className="content studentProfileContent">
            <hr style = {{width: "100%", border:'none', backgroundColor:'darkgray', height:'2px'}}/>
            <div className="ProfileImage" alt="logo" style={{backgroundImage: 'url('+this.props.ImageURL+')'}}></div>
            <hr style = {{width: "100%", border:'none', backgroundColor:'darkgray', height:'2px'}}/>
        </div>
        );
    }
}


export default LogIn