import { useState, useEffect } from 'react'
import './App.css'

const cardType = ['C', 'D', 'H', 'S'];
const highCard = ['A', 'J', 'Q', 'K'];

function App() {

  const [deck, setDeck] = useState<string[]>([]);
  const [playerDeck, setPlayerDeck] = useState<string[]>([]);
  const [computerDeck, setComputerDeck] = useState<string[]>([]);
  const [playerPoints, setPlayerPoints] = useState(0);
  const [computerPoints, setComputerPoints] = useState(0);

  useEffect(() => {
      doNewDeck();
  }, []);

  const doNewDeck = () => {
      let newDeck = [];
      for(let i = 2; i <= 10; i++) {
          for(let type of cardType) {
              newDeck.push(i + type);
          }
      }
      for(let high of highCard) {
          for(let type of cardType) {
              newDeck.push(high + type);
          }
      }
      newDeck = shuffle(newDeck);
      setDeck(newDeck);
  }

  const getCardFromDeck = () => {
      if(deck.length === 0) {
          return 'NoCard';
      } else {
          let newDeck = [...deck];
          const card = newDeck.pop();
          setDeck(newDeck);
          return card;
      }
  }

  const shuffle = (array : string[]) => {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      // Selecciona un elemento sin mezclar...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // Y lo intercambia con el elemento actual
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    };

    return array;
  };

  // @ts-ignore
  const getCardValue = (card) => {
      const value = card.substring(0, card.length - 1);
      return isNaN(value) ? (value === 'A' ? 11 : 10) : value * 1;
  }
  // @ts-ignore
  const updateScore = (participantScore, card) => {
      return participantScore + getCardValue(card);
  }
  // @ts-ignore
  const giveCard = (participantArray, card) => {
      return [...participantArray, card];
  }
  // @ts-ignore
  const computerDoTurn = (minPoints) => {
      do {
          const card = getCardFromDeck();
          setComputerPoints(updateScore(computerPoints, card));
          setComputerDeck(giveCard(computerDeck, card));
      } while ((computerPoints < minPoints) && (minPoints <= 21));
  }

  const getWinner = () => {
      let playersScoreArr = [{ "entity": "player", "score": playerPoints }, { "entity": "computer", "score": computerPoints }];
      playersScoreArr = playersScoreArr.sort();
      return playersScoreArr[1].score === playersScoreArr[0].score ? 'draw' : playersScoreArr[1].score <= 21 ? playersScoreArr[1].entity : playersScoreArr[0].entity;
  }

  const handleGetCardClick = () => {
      const card = getCardFromDeck();
      setPlayerPoints(updateScore(playerPoints, card));
      setPlayerDeck(giveCard(playerDeck, card));
      if (playerPoints > 21 || playerPoints === 21) {
          computerDoTurn(playerPoints);
      }
  }

  const handleStopClick = () => {
      computerDoTurn(playerPoints);
  }

  const handleNewGameClick = () => {
      doNewDeck();
      setPlayerPoints(0);
      setComputerPoints(0);
      setPlayerDeck([]);
      setComputerDeck([]);
  }

  return (
      <div>
          <button onClick={handleNewGameClick}>New Game</button>
          <button onClick={handleGetCardClick}>Get Card</button>
          <button onClick={handleStopClick}>Stop</button>
          <div>Player Score: {playerPoints}</div>
          <div>Computer Score: {computerPoints}</div>
          <div>Player Cards: {playerDeck.map((card, index) => <img key={index} src={`./assets/deck/${card}.png`} className="card" alt="card" />)}</div>
          <div>Computer Cards: {computerDeck.map((card, index) => <img key={index} src={`./assets/deck/${card}.png`} className="card" alt="card" />)}</div>
      </div>
  );
};

export default App
