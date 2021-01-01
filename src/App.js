import React, { Component } from 'react';
import './App.css';
import hash from "./hash";
import Form from './components/Form';
import * as $ from "jquery";
import Player from "./Player";


/**
 * Spotify API Read
 */
export const authEndpoint = 'https://accounts.spotify.com/authorize';

// Replace with your app's client ID, redirect URI and desired scopes
const clientId = "df010c4f38ab4947aabe303af43358d1";
const redirectUri = "http://localhost:3000";
const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
];


// make this code more modular
// break the rectangles into a function or component
// try to add more components
class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      rectangles: [],
      // fix the colors later
      colors: ['red', 'orange', 'yellow', 'green', 'blue', 
      'indigo', 'violet', 'red', 'orange', 'yellow', 'green', 
      'blue', 'indigo', 'violet', 'indigo', 'violet'],
      token: null,
      item: {
      album: {
        images: [{ url: "" }]
      },
      name: "",
      artists: [{ name: "" }],
      duration_ms:0,
    },
      is_playing: "Paused",
      progress_ms: 0
    };
    this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
  }
// setup the array of rectangles
componentDidMount(){
  let _token = hash.access_token;
  if (_token) {
    // Set token
    this.setState({
      token: _token
    });
  }
    this.randomArray();
  }

getCurrentlyPlaying(token) {
  // Make a call using the token
  $.ajax({
    url: "https://api.spotify.com/v1/me/player",
    type: "GET",
    beforeSend: (xhr) => {
      xhr.setRequestHeader("Authorization", "Bearer " + token);
    },
    success: (data) => {
      this.setState({
        item: data.item,
        is_playing: data.is_playing,
        progress_ms: data.progress_ms,
      });
    }
  });
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
        <div className="App">
      <header className="App-header">
      {/* <img src={"spotify.png"} className="App-logo" alt="logo" /> */}
      {!this.state.token && (
        <a
          className="btn btn--loginApp-link"
          href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
        >
          Login to Spotify
        </a>
      )}
      {this.state.token && (
        <Player
        item={this.state.item}
        is_playing={this.state.is_playing}
        progress_ms={this.progress_ms}
      />
    )}
      </header>
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
