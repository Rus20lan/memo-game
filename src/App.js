import { useEffect, useReducer } from 'react';
import './App.css';
import { actions } from './const';
import { BackButton } from './components/BackButton';
import SharePoints from './components/SharePoints';

const generateDesck = () => {
  const colors = [
    '#FF6347',
    '#4682B4',
    '#32CD32',
    '#FFD700',
    '#FF69B4',
    '#8A2BE2',
  ];
  const desk = [];
  // Каждому цвету добавляем две карточки
  for (let color of colors) {
    desk.push({ color, matched: false });
    desk.push({ color, matched: false });
  }
  // Перемешиваем колоду
  return desk.sort(() => Math.random() - 0.5);
};

const initialState = {
  desk: generateDesck(),
  flipped: [],
  matched: [],
  turns: 0,
  score: 0,
  pendingReset: false,
  gameOver: false,
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case actions.FLIP_CARD:
      // Переворачиваем карточку
      if (
        state.flipped.length < 2 &&
        !state.flipped.includes(action.index) &&
        !state.matched.includes(state.desk[action.index].color)
      ) {
        return { ...state, flipped: [...state.flipped, action.index] };
      }
      break;

    case actions.CHECK_MATCH:
      // Проверяем совпадение перевернутых карточек
      const [first, second] = state.flipped;
      if (state.desk[first].color === state.desk[second].color) {
        const newMatched = [...state.matched, state.desk[first].color];
        const isGameOver = newMatched.length === state.desk.length / 2;
        return {
          ...state,
          matched: newMatched,
          score: isGameOver ? state.score + 1 : state.score,
          flipped: [],
          pendingReset: false,
          gameOver: isGameOver,
        };
      } else {
        return { ...state, pendingReset: true };
      }
    case actions.RESET_FLIPPED:
      // Сбрасываем перевернутые карточки
      return { ...state, flipped: [], pendingReset: false };

    case actions.INCREMENT_TURN:
      // Увеличиваем счетчик попыток
      return { ...state, turns: state.turns + 1 };
    case actions.RESET_GAME:
      // Сбрасываем состояние игры
      return {
        ...initialState,
        desk: generateDesck(),
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    if (state.flipped.length === 2) {
      dispatch({ type: actions.CHECK_MATCH });
      dispatch({ type: actions.INCREMENT_TURN });
    }
  }, [state.flipped]);
  // Таймер для сброса перевернутых карточек
  useEffect(() => {
    if (state.pendingReset) {
      const timer = setTimeout(() => {
        dispatch({ type: actions.RESET_FLIPPED });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [state.pendingReset]);

  // Обработка клика на карточку
  const handleCardClick = (index) => {
    if (
      !state.gameOver &&
      state.flipped.length < 2 &&
      !state.flipped.includes(index)
    ) {
      dispatch({ type: actions.FLIP_CARD, index });
    }
  };

  const handlePlayAgain = () => {
    dispatch({ type: actions.RESET_GAME });
  };
  return (
    <div className="App">
      <BackButton />
      <h1>Memo Game</h1>
      <div className="info">
        <p>Очки: {state.score}</p>
        <p>Попытки: {state.turns}/15</p>
      </div>
      <div className="desk">
        {state.desk.map((card, index) => (
          <div
            key={index}
            className={`card ${
              state.flipped.includes(index) ||
              state.matched.includes(card.color)
                ? 'flipped show'
                : ''
            }`}
            style={{ '--card-color': card.color }}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
      {state.gameOver && (
        <>
          <div className="overlay" />
          <div className="game-over">
            <h2>Вы выиграли!</h2>
            <button onClick={handlePlayAgain}>Заново</button>
          </div>
        </>
      )}
      {!state.gameOver && state.turns >= 15 && (
        <>
          <div className="overlay" />
          <div className="game-over">
            <h2>Игра окончена!</h2>
            <button onClick={handlePlayAgain}>Заново</button>
          </div>
        </>
      )}
      <SharePoints />
    </div>
  );
}

export default App;
