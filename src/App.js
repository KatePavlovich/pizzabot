import { useEffect, useState } from 'react';
import { Board } from './components/Board';
import { getBoardSize } from './utils/getBoardSize';
import { getCoordinates } from './utils/getCoordinates';
import { transformCoordinatesToSteps } from './utils/transformCoordinatesToSteps';
import { getBoard } from './utils/getBoard';
import { checkCoordinates, checkCoordinateValues } from './utils/checkCoordinates';

import styles from './App.module.scss';

export const App = () => {
  const [ command, setCommand ] = useState('');
  const [ board, setBoard ] = useState(null);
  const [ steps, setSteps ] = useState([]);
  const [ coordinates, setCoordinates ] = useState(null);
  const [ countSteps, setCountSteps ] = useState(0);
  const [ error, setError ] = useState('');

  const handleChange = (e) => {
    if (error) setError('');
    setCommand(e.target.value);
  };

  const isErrorInCoordinates = (coordinates, boardSize) => {
    if (!coordinates) {
      setError('Please check coordinates');
      return true;
    }
    if (checkCoordinates(coordinates)) {
      setError('Please check coordinates. Miss some values');
      return true;
    }
    if (checkCoordinateValues(coordinates, boardSize)) {
      setError('Seems like some coordinates are far from available delivery zone');
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!command) return setError('please type coordinates');
    const boardSize = getBoardSize(command);
    if (!boardSize || boardSize.length !== 2) return setError("yyps, can't count board size. Please check coordinates");
    setBoard(getBoard(boardSize));
    const coordinates = getCoordinates(command);
    if (isErrorInCoordinates(coordinates, boardSize)) return;
    const { instruction, coordinatesWithDirection } = transformCoordinatesToSteps(coordinates, boardSize);
    setSteps(instruction);
    setCoordinates(coordinatesWithDirection);
  };

  useEffect(
    () => {
      if (!coordinates || !coordinates.length || !board) return;
      setTimeout(() => {
        const y = coordinates[0][0] === 0 && coordinates[0][1] === 0 ? board.length - 1 : coordinates[0][0];
        const x = coordinates[0][1];
        board[y][x] = board[y][x] === 'D' ? 'D' : coordinates[0][3] || coordinates[0][2];
        setBoard(board);
        setCountSteps((prev) => prev + 1);
        if (coordinates.length > 0) setCoordinates(coordinates.slice(1));
      }, 500);
    },
    [ board, coordinates, steps ]
  );

  const handleReset = () => {
    setCommand('');
    setBoard(null);
    setSteps([]);
    setCoordinates(null);
    setCountSteps(0);
  };

  return (
    <div className={styles.content}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Coordinates for pizzabot:
          <input
            className={styles.input}
            value={command}
            onChange={handleChange}
            placeholder='insert the coordinates'
          />
        </label>
        <button type='submit' disabled={!!steps.length} className={styles.button} data-testid='submitButton'>
          Start delivery
        </button>
      </form>
      <p>example: 5x5 (0, 0) (1, 3) (4, 4) (4, 2) (4, 2) (0, 1) (3, 2) (2, 3) (4, 1)</p>
      {!!steps.length && <p>Answer: {steps.map((step) => step[0])}</p>}
      <button type='button' onClick={handleReset} disabled={board && coordinates && coordinates.length}>
        New route
      </button>
      <div className={styles.error}>{error}</div>
      <div className={styles.grid}>
        {board && !error && coordinates && <Board board={board} />}
        {!!steps.length && (
          <div className={styles.steps}>{steps.map((step, i) => <div key={i}>{i < countSteps ? step : ''}</div>)}</div>
        )}
      </div>
    </div>
  );
};
