import styles from './Board.module.scss';

export const Board = ({ board }) => {
	const xLine = board && Array.from({ length: board.length }, (_, k) => k);
	const yLine = board && [ ...xLine ].reverse();
	return (
		<div className={styles.boardWrapper} data-testid='board'>
			<div className={styles.y}>
				{yLine.map((i) => (
					<div key={i} className={styles.cell}>
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
								className={`${styles.cell} ${styles[g]}`}
								data-coordinates={`(${index}, ${ind === 0 && index === 0 ? 0 : yLine[ind]})`}
							/>
						))}
					</span>
				))}
				<div className={styles.x}>
					{xLine.map((i) => (
						<div key={i} className={styles.cell}>
							{i}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
