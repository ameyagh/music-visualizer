import React, { Component } from 'react'
import './Form.css';

class Form extends Component{
    // no need for a constructor

    render(){
        return (
            <button className="button" onClick={this.props.onClick}>{this.props.value}</button>
        )
    }


}

export default Form;