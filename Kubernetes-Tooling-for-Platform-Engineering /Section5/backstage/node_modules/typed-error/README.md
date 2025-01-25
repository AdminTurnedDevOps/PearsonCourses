This module allows you to easily extend the built-in Error type for typed error checking

For typescript:
```typescript
import { TypedError } from 'typed-error'

class MyError extends TypedError {}

try {
	throw new MyError()
} catch(e) {
	console.log(e instanceof MyError) // true
	console.log(e.name) // 'MyError'
	console.log(e.constructor.name) // 'MyError'
	console.log(e.stack) // <stack trace>

	if(e instanceof MyError) {
		console.log('Do custom handling')
	} else {
		console.log('Another type of error')
	}

	// Or
	switch(e.name) {
		case 'MyError':
			console.log('Do custom handling')
		break;
		default:
			console.log('Another type of error')
	}

	// Or
	switch(e.constructor.name) {
		case 'MyError':
			console.log('Do custom handling')
		break;
		default:
			console.log('Another type of error')
	}
}
```

And with bluebird:
```typescript
import { TypedError } from 'typed-error'
import * as Promise from 'bluebird'

class MyError extends TypedError {}

Promise.try(() => {
	throw new MyError()
})
.catch(MyError, (e) => {
	console.log('Do custom handling')
})
.catch(() => {
	console.log('Another type of error')
})

// Or
const MyErrorName = (e: Error) => e.name === 'MyError'
Promise.try(() => {
	throw new MyError()
})
.catch(MyErrorName, (e) => {
	console.log('Do custom handling')
})
.catch(() => {
	console.log('Another type of error')
})

// Or
const MyErrorConstructorName = (e: Error) => e.constructor.name === 'MyError'
Promise.try(() => {
	throw new MyError()
})
.catch(MyErrorConstructorName, (e) => {
	console.log('Do custom handling')
})
.catch(() => {
	console.log('Another type of error')
})
```

For coffeescript:
```coffeescript
{ TypedError } = require 'typed-error'

class MyError extends TypedError

try
	throw new MyError()
catch e
	console.log(e instanceof MyError) # true
	console.log(e.name) # 'MyError'
	console.log(e.constructor.name) # 'MyError'
	console.log(e.stack) # <stack trace>

	if e instanceof MyError
		console.log('Do custom handling')
	else
		console.log('Another type of error')

	# Or
	switch e.name
		when 'MyError'
			console.log('Do custom handling')
		else
			console.log('Another type of error')

	# Or
	switch e.constructor.name
		when 'MyError'
			console.log('Do custom handling')
		else
			console.log('Another type of error')
```

And with bluebird:
```coffeescript
Promise = require 'bluebird'
{ TypedError } = require 'typed-error'

class MyError extends TypedError

Promise.try ->
	throw new MyError()
.catch MyError, (e) ->
	console.log('Do custom handling')
.catch ->
	console.log('Another type of error')

# Or
MyErrorName = (e) -> e.name is 'MyError'
Promise.try ->
	throw new MyError()
.catch MyErrorName, (e) ->
	console.log('Do custom handling')
.catch ->
	console.log('Another type of error')

# Or
MyErrorConstructorName = (e) -> e.constructor.name is 'MyError'
Promise.try ->
	throw new MyError()
.catch MyErrorConstructorName, (e) ->
	console.log('Do custom handling')
.catch ->
	console.log('Another type of error')
```
