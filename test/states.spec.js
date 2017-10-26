const test = require('ava').test;
const stripAnsi = require('strip-ansi');
const render = require('../lib/render');

test('In progress', t => {
	const tasks = [
		{
			title: 'Task 1',
			subtasks: [],
			isEnabled: () => true,
			isPending: () => true,
			isCompleted: () => false,
			isSkipped: () => false,
			hasFailed: () => false
		}
	];
	const output = render(tasks, {});
	const lines = stripAnsi(output).split('\n');
	t.deepEqual(lines, [
		' ⠙ Task 1'
	]);
});

test('Completed successfully', t => {
	const tasks = [
		{
			title: 'Task 1',
			subtasks: [],
			isEnabled: () => true,
			isPending: () => false,
			isCompleted: () => true,
			isSkipped: () => false,
			hasFailed: () => false
		}
	];
	const output = render(tasks, {});
	const lines = stripAnsi(output).split('\n');
	t.deepEqual(lines, [
		' ✔ Task 1'
	]);
});

test('Failed', t => {
	const tasks = [
		{
			title: 'Task 1',
			subtasks: [],
			isEnabled: () => true,
			isPending: () => false,
			isCompleted: () => false,
			isSkipped: () => false,
			hasFailed: () => true
		}
	];
	const output = render(tasks, {});
	const lines = stripAnsi(output).split('\n');
	t.deepEqual(lines, [
		' ✖ Task 1'
	]);
});

test('Skipped', t => {
	const tasks = [
		{
			title: 'Task 1',
			subtasks: [],
			isEnabled: () => true,
			isCompleted: () => false,
			isPending: () => false,
			isSkipped: () => true,
			hasFailed: () => false
		}
	];
	const output = render(tasks, {});
	const lines = stripAnsi(output).split('\n');
	t.deepEqual(lines, [
		' ↓ Task 1 [skipped]'
	]);
});
