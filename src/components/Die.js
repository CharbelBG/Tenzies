import React from 'react';
import ReactDom from 'react-dom';

export default function Die(props){
    const styles = {
        backgroundColor: props.held ? '#59E391' : 'white'
    }
    return(
        <div className="die" style={styles} onClick = {props.holdDice}>
            {props.value} 
        </div>
    )
}