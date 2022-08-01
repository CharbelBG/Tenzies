import React, {useState, useEffect} from 'react';
import ReactDom from 'react-dom';
import Die from './Die';
import {nanoid} from 'nanoid';
import Confetti from 'react-confetti';
export default function App(){
    const [dice,setDice] = useState(allNewDice());
    const [tenzies, setTenzies] = useState(false);

    useEffect(()=>{
       let allHeld =  dice.every(die => die.isHeld)
       let firstValue = dice[0].randomNumber;
       const allSameValue = dice.every(die => die.randomNumber === firstValue);
       if(allHeld && allSameValue){
        setTenzies(true);
            console.log('You Won!');
       }
    },[dice]);


    function generateNewDie(){
        return {
            randomNumber:Math.ceil(Math.random() * 6 ),
                isHeld:false,
                id:nanoid(),
        }
    }

    function allNewDice(){
        const newDice = [];
        for(let i =0; i<10; i++){
            newDice.push(generateNewDie());
        }
        return newDice;
    }

   function holdDice(id){
    setDice(oldDice => oldDice.map(die => {
        return die.id === id ? {...die, isHeld : !die.isHeld} : die
    }))
   }

    const diceElements = dice.map(die =><Die value={die.randomNumber} key = {die.id} held = {die.isHeld} holdDice ={()=> holdDice(die.id)} />)
    
    
    function rollDiceElements(){
        if(!tenzies){

            setDice(oldDice => oldDice.map(die =>{
                return die.isHeld ?
                die :
                generateNewDie()
            }));
        } else {
            setTenzies(false);
            setDice(allNewDice());
        }
    }
  
    return(
        <main>
            {tenzies && <Confetti />}
            <h1>
                Tenzies
            </h1>
            <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
            </p>
            <div className="dieContainer">
               {diceElements}
            </div>
            <button onClick={rollDiceElements}>{tenzies ? "new game" : "Roll"}</button>
        </main>
    )
}