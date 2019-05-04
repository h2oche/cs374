import React, { Component } from 'react'
import Topbar from '../Topbar';
import {Row, Col} from 'react-materialize';
import '../../css/Students/StudentProfile.css'
import {Redirect} from 'react-router';
import Demographic from './Demographic'

export class InstructorsNote extends Component {
    state={
        Comments:
            [
                {
                    Instructor: 'amy11',
                    Student: 'jinjin',
                    Content: 'He is smart',
                    Date: '2019/05/03'
                },
                {
                    Instructor: 'momo33',
                    Student: 'yujin',
                    Content: 'He is smart',
                    Date: '2019/05/03'
                },
                {
                    Instructor: 'ake1',
                    Student: 'sarah',
                    Content: 'He is smart',
                    Date: '2019/05/03'
                },
                {
                    Instructor: 'tommy11',
                    Student: 'jinjin',
                    Content: 'He is smart',
                    Date: '2019/05/03'
                }
            ]
    }

    render() {
        if(this.state.redirect)
            return (<Redirect to={this.state.target}></Redirect>);
        return (
        <div style = {{width:"100%"}} className="content">
            <Topbar name="Profile" showBack={true} backTo = {"/BOBO/studentProfile/main/"+this.props.match.params.id}></Topbar>
            <hr style = {{width: "360px", border:'none', backgroundColor:'darkgray', height:'2px'}}/>
            <Demographic />
            <hr style = {{width: "360px", border:'none', backgroundColor:'darkgray', height:'2px'}}/>
            <div>
                {/*this.renderCommentList()*/}
            </div>
        </div>
        );
    }
}





export default InstructorsNote