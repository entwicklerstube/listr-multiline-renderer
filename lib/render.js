'use strict';
const chalk = require('chalk');
const figures = require('figures');
const indentString = require('indent-string');
const cliTruncate = require('cli-truncate');
const utils = require('./utils');

const defaultLineFormatter = (line, index) => {
	const prefix = (index === 0) ? figures.arrowRight : ' ';
	return `${prefix} ${line}`;
};

const taskOutput = (task, options, level) => {
	const formatter = options.outputFormatter || defaultLineFormatter;
	return task.output.split('\n').filter(Boolean).map((line, index) => {
		const indented = indentString(formatter(line, index), level, '  ');
		return `   ${chalk.gray(cliTruncate(indented, process.stdout.columns - 3))}`;
	});
};

const render = (tasks, options, level) => {
	level = level || 0;
	let output = [];

	for (const task of tasks) {
		if (task.isEnabled()) {
			const skipped = task.isSkipped() ? ` ${chalk.dim('[skipped]')}` : '';
			// Render current task title
			output.push(indentString(` ${utils.getSymbol(task, options)} ${task.title}${skipped}`, level, '  '));
			// And its output
			if ((task.isPending() || task.isSkipped() || task.hasFailed()) && utils.isDefined(task.output)) {
				const data = task.output;
				if (typeof data === 'string') {
					const lines = taskOutput(task, options, level);
					Array.prototype.push.apply(output, lines);
				}
			}
			// And the subtasks, recursively
			if ((task.isPending() || task.hasFailed() || options.collapse === false) && (task.hasFailed() || options.showSubtasks !== false) && task.subtasks.length > 0) {
				output = output.concat(render(task.subtasks, options, level + 1));
			}
		}
	}

	return output.join('\n');
};

module.exports = render;
