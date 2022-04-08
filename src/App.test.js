import { render, screen, fireEvent } from '@testing-library/react';
import { App } from './App';

const setup = () => {
	render(<App />);
	const inputElement = screen.getByPlaceholderText(/insert the coordinates/i);
	const button = screen.getByText(/Start delivery/i);
	return {
		inputElement,
		button
	};
};

test('It should render input for coordinates', () => {
	const { inputElement } = setup();
	expect(inputElement).toBeInTheDocument();
});

test('It should let to insert correct value and show board', async () => {
	const { inputElement, button } = setup();
	fireEvent.change(inputElement, { target: { value: '5x5 (0, 0)' } });
	fireEvent.click(button);

	expect(screen.getByRole('button')).toBeDisabled();
	expect(screen.getByTestId('board')).toBeInTheDocument();
});

test('It should let to insert correct value and show instructions', async () => {
	const { inputElement, button } = setup();
	fireEvent.change(inputElement, { target: { value: '5x5 (0, 0)' } });
	fireEvent.click(button);

	await screen.findByText(/Drop pizza/i);

	expect(screen.getByText(/New route/i)).toBeInTheDocument();
	expect(screen.getByText(/Drop pizza/i)).toBeInTheDocument();
});

test('It should show error if board size is incorrect', () => {
	const { inputElement, button } = setup();
	fireEvent.change(inputElement, { target: { value: '5+10' } });
	fireEvent.click(button);

	expect(screen.getByText(/can't count board size/i)).toBeInTheDocument();
});

test('It should show error if no coordinates were typed', () => {
	const { inputElement, button } = setup();
	fireEvent.change(inputElement, { target: { value: '' } });
	fireEvent.click(button);

	expect(screen.getByText(/please type coordinates/i)).toBeInTheDocument();
});

test('It should show error if some coordinates were missed', () => {
	const { inputElement, button } = setup();
	fireEvent.change(inputElement, { target: { value: '5x5 (0,' } });
	fireEvent.click(button);

	expect(screen.getByText(/Miss some values/i)).toBeInTheDocument();
});

test('It should show error if coordinates are out of the board', () => {
	const { inputElement, button } = setup();
	fireEvent.change(inputElement, { target: { value: '5x5 (0, 150)' } });
	fireEvent.click(button);

	expect(screen.getByText(/far from available delivery zone/i)).toBeInTheDocument();
});
