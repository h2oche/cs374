import React, { Component } from 'react'
import Topbar from '../Topbar';
import { Row, Col, Textarea, Card, Button } from 'react-materialize';
import "../../css/Notices/Notice.css";
import QuestionListItem from './QuestionListItem';
import { fire, getFireDB, pushMultipleDB, pushDB, setDB} from '../../config/fire';

export class Notice extends Component {
  state = {
    type: "homework",
    name: "",
    content: "",
    expireDate: new Date(),
    important: Math.floor(Math.random() * 2) == 1,
    persistent: Math.floor(Math.random() * 2) == 1,
    questions: [],
    CurrentUser: {
      id: 1,
      name: "Nawoo Kim"
    }
  }

  constructor(props) {
    super(props);
    fire();
  }

  getNoticeId = () => {
    return this.props.match.params.id * 1;
  }

  componentDidMount() {
    getFireDB()
    .then(_res => {
      let DB = _res.val();
      var noticeId = this.getNoticeId();
      var noticeObj = {};
      for(var key in DB.Notice) {
        if(DB.Notice[key].id === noticeId) {
          noticeObj = DB.Notice[key];
        }
      }

      var questions = [];
      var nextQuestionId = 0;
      for(var key in DB.Question) {
        var questionObj = DB.Question[key];
        if(questionObj.id > nextQuestionId)
          nextQuestionId = questionObj.id;
        if(questionObj.noticeId === noticeId)
          questions.push({...questionObj, key});
      }
      nextQuestionId++;
      this.nextQuestionId = nextQuestionId;
      this.setState({...noticeObj, questions});
    });
  }

  formatDate = (_date) => {
    _date = new Date(_date);
    var day = _date.getDate();
    var monthIndex = _date.getMonth();
    var year = _date.getFullYear();
    return year + "/" + (monthIndex + 1) + "/" + day;
  }

  onNewQuestionChange = (e) => {
    this.setState({...this.state, newQuestionContent: e.target.value});
  }

  onAnswerBtnClick = (_questionObj) => {
    console.log(_questionObj);
    var obj = {..._questionObj};
    delete obj.key;
    setDB("Question/" + _questionObj.key, obj);
  }

  onNewQuestionBtnClick = (e) => {
    console.log(this.state.newQuestionContent);
    var questionObj = {
      content: this.state.newQuestionContent,
      userId: this.state.CurrentUser.id,
      userName: this.state.CurrentUser.name,
      noticeId: this.getNoticeId(),
      id: this.nextQuestionId++,
      createDate: new Date().getTime(),
      answer: "",
    };

    var questions = this.state.questions;
    questions.push(questionObj);
    this.setState({...this.state, questions, newQuestionContent: ""});
    pushDB("Question", questionObj);
  }

  renderQuestions = () => {
    if(this.state.questions.length > 0) {
      return this.state.questions.map(_question => {
        return (<QuestionListItem data={_question} onAnswer={this.onAnswerBtnClick}/>); 
      });
    }
    else {
      return (<Col s={12} className="notice-no-question">No Question on This Notice.</Col>)
    }
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
        <Topbar name="Notice" showBack={true} backTo={"/BOBO/#" + this.props.location.pathname.slice(0, this.props.location.pathname.indexOf("/notice"))}/>
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
          <Col s={12} className="notice-label">
            <div><span className="material-icons">notifications</span>Contents</div>
          </Col>
          <Col s={12}>
            <Card className="white"><p>{this.state.content}</p></Card>
          </Col>
          <Col s={12} className="notice-label">
            <div><span className="material-icons">question_answer</span>Questions</div>
          </Col>
          <Col s={12}>
            {this.renderQuestions()}
          </Col>
          <Col s={12} id="new-question-row">
            <Card className="white" header={<div className="white-text add-question-header">Leave Question</div>}>
              <Textarea
                id="new-question-content"
                placeholder="What do you want to ask?"
                onChange={this.onNewQuestionChange}
                value={this.state.newQuestionContent}/>
              <Button className="CommonButton" id="new-question-leave-btn" onClick={this.onNewQuestionBtnClick}>Leave</Button>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Notice
