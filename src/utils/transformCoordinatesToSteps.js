export const transformCoordinatesToSteps = (coordinates, boardSize) => {
	let start = [ 0, 0 ];
	let instruction = [];
	let y = boardSize[1] - 1;
	let x = 0;
	let coordinatesWithDirection = [];
	coordinates.forEach(([ coordinateX, coordinateY ]) => {
		if (Number(coordinateX) > start[0]) {
			const amount = coordinateX - start[0];
			let step = 0;
			while (step < amount) {
				instruction.push('E:  Move east');
				x = x + 1;
				coordinatesWithDirection.push([ y, x, 'E' ]);
				step++;
			}
		}
		if (Number(coordinateX) < start[0]) {
			const amount = start[0] - coordinateX;
			let step = 0;
			while (step < amount) {
				instruction.push('W:   Move west');
				x = x - 1;
				coordinatesWithDirection.push([ y, x, 'W' ]);
				step++;
			}
		}
		if (Number(coordinateY) > start[1]) {
			const amount = coordinateY - start[1];
			let step = 0;
			while (step < amount) {
				instruction.push('N:  Move north');
				y = y - 1;
				coordinatesWithDirection.push([ y, x, 'N' ]);
				step++;
			}
		}
		if (Number(coordinateY) < start[1]) {
			const amount = start[1] - coordinateY;
			let step = 0;
			while (step < amount) {
				instruction.push('S:   Move south');
				y = y + 1;
				coordinatesWithDirection.push([ y, x, 'S' ]);
				step++;
			}
		}
		instruction.push('D:    Drop pizza');
		start = [ Number(coordinateX), Number(coordinateY) ];
		if (coordinateX === '0' && coordinateY === '0') return coordinatesWithDirection.push([ 0, 0, 'D' ]);
		if (!!coordinatesWithDirection.length)
			coordinatesWithDirection.push([ ...coordinatesWithDirection.at(-1), 'D' ]);
	});
	return { instruction, coordinatesWithDirection };
};
