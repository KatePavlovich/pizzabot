export const checkCoordinates = (coordinates) => {
	return !coordinates.every((coordinate) => coordinate.length === 2 && !!coordinate[0] && !!coordinate[1]);
};

export const checkCoordinateValues = (coordinates, boardSize) => {
	return !coordinates.every(([ y, x ]) => Number(y) < boardSize[1] && Number(x) < boardSize[0]);
};