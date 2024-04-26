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
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    doNewDeck();
  }, []);

  const doNewDeck = () => {
    let newDeck : string[] = [];
    for (let i = 2; i <= 10; i++) {
      for (let type of cardType) {
        newDeck.push(i + type);
      }
    }
    for (let high of highCard) {
      for (let type of cardType) {
        newDeck.push(high + type);
      }
    }
    newDeck = shuffle(newDeck);
    setDeck(newDeck);
  };

  // Función para barajar el mazo
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

  // Resto de las funciones...

  return (
    <div className="game">
      <h2>Blackjack con React</h2>
      <div className="scoreboard">
        <p>Puntos del Jugador: {playerPoints}</p>
        <p>Puntos de la Computadora: {computerPoints}</p>
      </div>
      <div className="card-table">
        <div className="player-cards">
          {/* Renderiza las cartas del jugador aquí */}
        </div>
        <div className="computer-cards">
          {/* Renderiza las cartas de la computadora aquí */}
        </div>
      </div>
      <div className="controls">
        <button onClick={/* Función para obtener una carta */}>Pedir Carta</button>
        <button onClick={/* Función para detenerse */}>Detenerse</button>
        <button onClick={/* Función para nuevo juego */}>Nuevo Juego</button>
      </div>
    </div>
  );
};

export default App
