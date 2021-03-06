import React, { Component } from 'react';
import './linehat.css';
import axios from 'axios'


var lineList = [];
function addLine() {}; //defined here to prevent error

class LineHat extends Component {


	constructor () {
		super();
		this.state = {
	    	response: {}
	  	}
		this.handleClick = this.handleClick.bind(this)


    //list of prompts for audience input
      this.promptList = ["A line from a movie",
      "What did someone in your family always used to say",
      "Something personal about you",
      "What you say when people surprise you",
      "An old saying that no one uses anymore",
      "A secret someone you don't talk to anymore once told you",
      "A line from a song or poem",
      "Any sentence that starts and ends with the first letter of your first name",
      "In a complete sentence: Something one of the actors onstage reminds you of",
      "Just type anything!"];

    //chooses a random number from 0-9 (redo with better random and array.length)
      var d = new Date();
      var n = d.getTime();
      var s = n.toString();
      this.lc = s.substr(s.length - 1);
      console.log(this.lc);
      //replaces default text with a prompt
      //document.getElementById('audPrompt').innerHTML = promptList[lc];

    function addLine() {var newLineList = document.getElementById("audGetInput").value; /*sets var to be added to array*/
           lineList.push(newLineList);  /*add new item to array*/
           document.getElementById("demo").innerHTML = newLineList; /* test array update by displaying in p element */
    };
//    this.promptList = this.promptList.bind(this)
//    this.lc = this.lc.bind(this)

	}
  	render() {
    	return (
        <div className="App">
          <header className="hat-header">
            <h1 className="App-title">Lines from a Hat!</h1>
          </header>
        <div class ="row">
          <div class ="linehat">
           <form action="/sendInfoToBackend.magik" onsubmit="return false">
             <label for="audGetInput" id= "audPrompt">...</label>
             <input type="text" id="audGetInput" name="audGet" placeholder="First thing that comes to mind? 3rd?"></input>

             <input type="submit" value="Submit" onClick={addLine()}></input>
           </form>
           <p id="demo">{this.promptList[this.lc]}</p>
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
  		axios.get('http://ec2-54-237-240-235.compute-1.amazonaws.com:8080/api/lines', {}, config)
    		.then(response => this.setState({response: response }))


  	}

}

export default LineHat;
