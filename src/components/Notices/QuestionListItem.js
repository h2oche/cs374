import React, { Component } from 'react'
import { Card, Button, Textarea } from 'react-materialize';

export class QuestionListItem extends Component {
  state = {
    showAnswerCard: false,
    showNewAnswer: false,
    newAnswer: "",
  }

  formatDate = (_date) => {
    _date = new Date(_date);
    var day = _date.getDate();
    var monthIndex = _date.getMonth();
    var year = _date.getFullYear();
    return year + "/" + (monthIndex + 1) + "/" + day;
  }

  onReplyBtnClick = (e) => {
    this.setState({...this.state, showAnswerCard: true});
  }

  onNewAnswerChange = (e) => {
    this.setState({...this.state, answerContent: e.target.value});
  }

  onNewAnswerBtnClick = (e) => {
    this.props.onAnswer({...this.props.data, answer: this.state.answerContent});
    this.setState({...this.state, showAnswerCard: false, showNewAnswer: true, newAnswer: this.state.answerContent});
  }

  renderQuestionHeader = () => {
    return (<div className="question-list-item-header grey lighten-2">
      <span className="name">{this.props.data.userName}</span>
      {this.props.data.answer === "" && this.state.newAnswer === "" && !this.state.showAnswerCard ?
      <Button flat waves="light" onClick={this.onReplyBtnClick}>
        <i className="material-icons">reply</i>
      </Button> : <span/>
      }
      <span className="date">{this.formatDate(this.props.data.createDate)}</span>
    </div>);
  }

  render() {
    return (
      <div className="question-list-item-container">
        <Card className="white" header={this.renderQuestionHeader()}>
          <p>{this.props.data.content}</p>
          
          {this.state.showAnswerCard ? 
            <div>
              <Textarea
                className="new-answer-content" placeholder="I think ..."
                onChange={this.onNewAnswerChange}/>
              <Button className="red lighten-5 black-text new-answer-btn" onClick={this.onNewAnswerBtnClick}>Answer</Button>
            </div> : <span/>
          }

        </Card>
        <Card className={"grey lighten-2 answer-container " + (this.props.data.answer === "" ? "none" : "")}>
          <div><span className="answer-content">{this.props.data.answer}</span></div>
        </Card>
        {this.state.showNewAnswer ?
          <Card className="grey lighten-2 answer-container">
            <div><span className="answer-content">{this.state.newAnswer}</span></div>
          </Card> : <span/>
        }
      </div>
    )
  }
}

export default QuestionListItem
