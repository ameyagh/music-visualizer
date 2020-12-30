import React, { Component } from 'react';
import './App.css';
import Form from './components/Form';


class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      rectangles: [],
      // fix the colors later
      colors: ['red', 'orange', 'yellow', 'green', 'blue', 
      'indigo', 'violet', 'red', 'orange', 'yellow', 'green', 
      'blue', 'indigo', 'violet', 'indigo', 'violet']
    };
  }

  // setup the array of rectangles
  componentDidMount(){
    this.randomArray();
  }

  randomArray(){
    const rectangles = []
    // change the number of bars if needed
    for(let i = 0; i < 16; i++){
      const val = getRandomNum(100, 500);
      rectangles.push(Math.floor(val));
    }

    this.setState({rectangles: rectangles});
  }

  updateOneBar(i){
    // create a copy of the array
    const rect = this.state.rectangles.slice();
    rect[i] = Math.floor(getRandomNum(100, 500));

    this.setState({rectangles: rect});
  }

  render(){
    const array = this.state.rectangles;
    const colors = this.state.colors;
    const button = 'Generate Array';

    return (
      <div>
        <div className="bar-parent">
          {array.map((value, index) => {
            const styles = {
              height: `${value}px` ,
              backgroundColor: `${colors[index]}`,
            }
            return <div className="bar" key={index} style={ styles }></div>
            })
          }
        
        </div>
        <div className="parent">
          <Form
          onClick={() => this.updateOneBar(Math.floor(getRandomNum(0, array.length - 1)))}
          value={button}
          />
        </div>
        
      </div>
      
      
    )
  }
}

// get a value between the specified values
// add a Math.floor here
function getRandomNum(min, max){
  return Math.random() * (max - min) + min;
}

export default App;
