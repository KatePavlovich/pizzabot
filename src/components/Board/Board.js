import cn from 'classnames';
import styles from './Board.module.scss';

export const Board = ({ board }) => {
  const xLine = board && Array.from({ length: board.length }, (_, k) => k);
  const yLine = board && [ ...xLine ].reverse();
  return (
    <div className={styles.boardWrapper} data-testid='board'>
      <div className={styles.yLine} style={{ maxHeight: `calc(50px*${yLine.length + 1})` }}>
        {yLine.map((i) => (
          <div key={i} className={cn(styles.cell, styles.yCoordinates)}>
            {i}
          </div>
        ))}
      </div>
      <div className={styles.board}>
        {board.map((i, ind) => (
          <span key={i[0] + ind} className={styles.row}>
            {i.map((g, index) => (
              <div
                key={g + index}
                className={cn(styles.cell, styles[g])}
                data-coordinates={`(${index}, ${ind === 0 && index === 0 ? 0 : yLine[ind]})`}
              />
            ))}
          </span>
        ))}
        <div className={styles.xLine}>
          {xLine.map((i) => (
            <div key={i} className={cn(styles.cell, styles.xCoordinates)}>
              {i}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
