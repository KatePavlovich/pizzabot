export const getBoardSize = (str) => {
	const firstCoord = [ ...str ].findIndex((i) => i === '(');
	return [ ...str ].slice(0, firstCoord).join('').trim().split('x');
};
