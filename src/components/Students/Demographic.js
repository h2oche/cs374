import React, { Component } from 'react'
import {Row, Col} from 'react-materialize';
import '../../css/Students/Demographic.css'

export class Demographic extends Component {
    state = {
        Name: "Tommy",
        Class: "B",
        Age: 3,
        Tel: "010-6859-4898"
    }
    render() {
        return (
            <div className="DemographicContainer">
                <Row className="DemographicRow" style={{paddingTop: '15px', paddingBottom: '15px'}}>
                    <Col className="DemographicCol" s={5}>
                        <div className="ProfileImage" alt="logo"></div>
                    </Col>
                    <Col className="DemographicCol" s={7}>
                        <div className="ProfileTextWrapper">
                            <div className="ProfileText">
                                <span> Name: {this.state.Name}</span>
                                <br/>
                                <span>Class: {this.state.Class}</span>
                                <br/>
                                <span>Age: {this.state.Age}</span>
                                <br/>
                                <span>Tel: {this.state.Tel}</span>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Demographic;