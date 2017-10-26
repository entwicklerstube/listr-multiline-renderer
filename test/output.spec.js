const test = require('ava').test;
const stripAnsi = require('strip-ansi');
const render = require('../lib/render');

test('Single-line output', t => {
	const tasks = [
		{
			title: 'Task 1',
			subtasks: [],
			output: 'Hello',
			isEnabled: () => true,
			isCompleted: () => false,
			isPending: () => true,
			isSkipped: () => false,
			hasFailed: () => false
		}
	];
	const output = render(tasks, {});
	const lines = stripAnsi(output).split('\n');
	t.deepEqual(lines, [
		' ⠙ Task 1',
		'   → Hello'
	]);
});

test('Nested with output', t => {
	const tasks = [
		{
			title: 'Task 1',
			subtasks: [
				{
					title: 'Task 1A',
					subtasks: [],
					output: 'Hello',
					isEnabled: () => true,
					isCompleted: () => false,
					isPending: () => true,
					isSkipped: () => false,
					hasFailed: () => false
				}
			],
			isEnabled: () => true,
			isCompleted: () => false,
			isPending: () => true,
			isSkipped: () => false,
			hasFailed: () => false
		}
	];
	const output = render(tasks, {});
	const lines = stripAnsi(output).split('\n');
	t.deepEqual(lines, [
		' ❯ Task 1',
		'   ⠙ Task 1A',
		'     → Hello'
	]);
});
