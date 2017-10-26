# listr-multiline-renderer
> Same as `listr-multiline-renderer` but allows multiple lines Edit

Checkout the original [`listr-update-renderer`](https://github.com/SamVerschueren/listr-update-renderer) for more information.

## Install

```
$ npm install --save listr-multiline-renderer
```

## Usage

```js
const ListrMultilineRenderer = require('listr-multiline-renderer');
const Listr = require('listr');

const list = new Listr([/* tasks */], {
	renderer: ListrMultilineRenderer
});
```

## Options

### outputFormatter (optional)

Specifies how the task output is formatted.

```js
const list = new Listr(tasks, {
	renderer: ListrMultilineRenderer
	outputFormatter: (line, index) => `  # ${line}`
});
```

Default behavior is for the output to be indented, with an arrow on the first line:

```
 ⠙ Task 1
   → First line
     Second line
		 Third line
```
