const test = require('ava').test;
const stripAnsi = require('strip-ansi');
const render = require('../lib/render');

test('Default multi-line output', t => {
	const tasks = [
		{
			title: 'Task 1',
			subtasks: [],
			output: 'Hello\nWorld',
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
		'   → Hello',
		'     World'
	]);
});

test('Custom formatter for multi-line output', t => {
	const tasks = [
		{
			title: 'Task 1',
			subtasks: [],
			output: 'Hello\nWorld',
			isEnabled: () => true,
			isCompleted: () => false,
			isPending: () => true,
			isSkipped: () => false,
			hasFailed: () => false
		}
	];
	const output = render(tasks, {
		outputFormatter: line => ` | ${line}`
	});
	const lines = stripAnsi(output).split('\n');
	t.deepEqual(lines, [
		' ⠙ Task 1',
		'    | Hello',
		'    | World'
	]);
});

test('Custom formatter to remove any indentation', t => {
	const tasks = [
		{
			title: 'Task 1',
			subtasks: [],
			output: 'Hello\nWorld',
			isEnabled: () => true,
			isCompleted: () => false,
			isPending: () => true,
			isSkipped: () => false,
			hasFailed: () => false
		}
	];
	const output = render(tasks, {
		outputFormatter: line => line
	});
	const lines = stripAnsi(output).split('\n');
	t.deepEqual(lines, [
		' ⠙ Task 1',
		'   Hello',
		'   World'
	]);
});

test('Custom formatter based on the line index', t => {
	const tasks = [
		{
			title: 'Task 1',
			subtasks: [],
			output: 'Hello\nWorld',
			isEnabled: () => true,
			isCompleted: () => false,
			isPending: () => true,
			isSkipped: () => false,
			hasFailed: () => false
		}
	];
	const output = render(tasks, {
		outputFormatter: (line, index) => index ? `  ${line}` : `> ${line}`
	});
	const lines = stripAnsi(output).split('\n');
	t.deepEqual(lines, [
		' ⠙ Task 1',
		'   > Hello',
		'     World'
	]);
});

test('Custom formatter for nested tasks', t => {
	const tasks = [
		{
			title: 'Task 1',
			subtasks: [
				{
					title: 'Task 1A',
					subtasks: [],
					output: 'Hello\nWorld',
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
	const output = render(tasks, {
		outputFormatter: line => `# ${line}`
	});
	const lines = stripAnsi(output).split('\n');
	t.deepEqual(lines, [
		' ❯ Task 1',
		'   ⠙ Task 1A',
		'     # Hello',
		'     # World'
	]);
});
