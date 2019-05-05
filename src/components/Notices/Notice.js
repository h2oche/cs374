import React, { Component } from 'react'
import Topbar from '../Topbar';
import { Row, Col, Textarea, Card, Button } from 'react-materialize';
import "../../css/Notices/Notice.css";
import QuestionListItem from './QuestionListItem';

export class Notice extends Component {
  state = {
    id: 1,
    type: "homework",
    name: "DP5 due is extended!",
    content: `123123
    123123123123
    123123123
    1231234123123
    123
    123
    1
    1
    
    1
    1
    1
    1
    1
    1
    
    
    1
    2
    
    3
    3
    4
    5
    
    
    6
    
    7
    8
    8`,
    expireDate: new Date(),
    questionCnt: 5,
    important: Math.floor(Math.random() * 2) == 1,
    persistent: Math.floor(Math.random() * 2) == 1,
    questions: [],
  }

  componentDidMount() {
    var genRandomNum = (_max) => {
      return Math.floor(Math.random() * _max);
    }

    var questions = []; var id = 0;
    for(var i = 0 ; i < genRandomNum(10) + 3 ; i++) {
      questions.push({
        id: id++,
        userId: 1,
        userName: "Parent " + i,
        content: "question content " + i,
        answer: genRandomNum(3) == 1 ? "" : "answer " + i,
        createDate: new Date()
      });
    }

    this.setState({...this.state, questions});
  }

  formatDate = (_date) => {
    var day = _date.getDate();
    var monthIndex = _date.getMonth();
    var year = _date.getFullYear();
    return year + "/" + (monthIndex + 1) + "/" + day;
  }

  onNewQuestionChange = (e) => {
    this.setState({...this.state, newQuestionContent: e.target.value});
  }

  onNewQuestionBtnClick = (e) => {
    console.log(this.state.newQuestionContent);
  }

  renderQuestions = () => {
    return this.state.questions.map(_question => {
      return (<QuestionListItem data={_question}/>); 
    });
  }

  renderTypeBadge = () => {
    //this.props.pathname + "/notice/" + this.props.data.id
    return (<div className="notice-type"
                onClick={this.onTypeClick}>
              <span>
                {this.state.type[0].toUpperCase()}
              </span>
            </div>);
  }

  render() {
    return (
      <div className="content" id="notice-content">
        <Topbar name="Notice" showBack={true} backTo="/BOBO/"/>
        <Row id="notice-name-row">
          <Col s={12}>
            {this.renderTypeBadge()}
            <div style={{width:"90%", display:"inline-block"}}>
              <span className={this.state.important?"important" : "none"}></span>
              <span className="notice-name">{this.state.name}</span>
              {/* <span className="notice-list-item-questions"><span>{this.props.data.questionCnt}</span></span> */}
              <span className="notice-expire">Expires at {this.formatDate(this.state.expireDate)}</span>
            </div>
          </Col>
        </Row>
        <Row id="notice-content-row">
          <Col s={12}>
            <Card className="white"><p>{this.state.content}</p></Card>
          </Col>
          <Col s={12}>
            <div>Questions</div>
            {this.renderQuestions()}
          </Col>
          <Col s={12} id="new-question-row">
            <Card className="white" header={<div className="red accent-2 white-text add-question-header">Leave Question</div>}>
              <Textarea id="new-question-content" placeholder="What do you want to ask?" onChange={this.onNewQuestionChange}/>
              <Button className="red lighten-5 black-text" id="new-question-leave-btn" onClick={this.onNewQuestionBtnClick}>Leave</Button>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Notice
