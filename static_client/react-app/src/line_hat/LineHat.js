import React, { Component } from 'react';
import '../css/linehat.css';
import axios from 'axios';
import * as Constants from '../Constants';

var lineList = [];
function addLine() {}; //defined here to prevent error

class LineHat extends Component {

	constructor () {
		super();
		this.state = {
	    line: ''
	  }
		this.handleChange = event => {
      this.setState({ line: event.target.value });
    }

  this.handleSubmit = event => {
    event.preventDefault();

    const line = {
      line: this.state.line
    };

    axios.post('http://' + Constants.URL + ':8080/api/lines', line, {
        'Content-Type': 'application/x-www-form-urlencoded'
      })
      .then(res => {
        console.log(res);
        console.log(res.message);
      })

      this.setState({ prompt: Math.floor(Math.random() * this.promptList.length) });
      this.refs.line.value = '';

  }
  this.handleClick = this.handleClick.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);


    //list of prompts for audience input
    this.promptList = ["A line from a movie",
      "What someone in your family always used to say",
      "Something personal about you",
      "What you say when people surprise you",
      "An old saying that no one uses anymore",
      "A secret someone you don't talk to anymore once told you",
      "A line from a song or poem",
      "Any sentence that starts and ends with the first letter of your first name",
      "In a complete sentence: Something one of the actors onstage reminds you of",
      "Just type anything!"];

	}

  componentDidMount() {
    this.setState({ prompt: Math.floor(Math.random() * this.promptList.length) });
  }

  	render() {
    	return (
        <div className="App">
				  <div className="header-spacer"></div>
          <header className="hat-header">
            <h1 className="App-title" id="hat">Lines from a Hat!</h1>
          </header>
        <div class ="row">
          <div class ="tile">
          <p id="demo">{this.promptList[this.state.prompt]}</p>
           <form onSubmit={this.handleSubmit}>
             <label for="audGetInput" id= "audPrompt">...</label>
             <input type="text" onChange={this.handleChange}  name="line" ref="line" placeholder="First thing that comes to mind? 3rd?"></input>

             <input type="submit" value="Submit" id="pen"></input>
           </form>

          </div>
         </div>
        </div>
    	);
  	}

  	handleClick () {
  		let config = {
		    headers: {
	    	  "Content-Type": "application/x-www-form-urlencoded"
    		}
      }
  		axios.get('http://' + Constants.URL + ':8080/api/lines', {}, config)
    		.then(response => this.setState({response: response }))


  	}

}

export default LineHat;