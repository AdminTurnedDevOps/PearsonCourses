# Introduction

While Node.js has built-in support for Base64 data, it does not come with the ability to encode / decode data in a stream.

This library contains a streaming Base64 encoder and a streaming Base64 decoder for use with Node.js. These classes are written using the Node.js [stream interfaces](http://nodejs.org/api/stream.html) and are well covered with unit tests.

# Usage

## Installation

To install base64-stream

    npm install base64-stream
    
## Examples
This example encodes an image and pipes it to stdout.

```javascript
var http = require('http');
var {Base64Encode} = require('base64-stream');

var img = 'http://farm3.staticflickr.com/2433/3973241798_86ddfa642b_o.jpg';
http.get(img, function(res) {
    if (res.statusCode === 200)
        res.pipe(new Base64Encode()).pipe(process.stdout);
});
```

This example takes in Base64 encoded data on stdin, decodes it, an pipes it to stdout.
```javascript
var {Base64Encode} = require('base64-stream');
process.stdin.pipe(new Base64Encode()).pipe(process.stdout);
```

## options:

`Base64Encode` can take an optional object `{lineLength: number, prefix: string}`  
The prefix is useful for prepending for example `data:image/png;base64,` to make a base64 URL.  
This example proxies an image url, and send the base64 string in response.

```
app.get('/i/*', function(req, res){ // using express for example
	fetch(req.params[0]) // using node-fetch
	.then(r=>r.body.pipe(new Base64Encode({prefix:`data:${r.headers.get('content-type')};base64,`})).pipe(res))
	.catch(console.error);
});
```

# Requirements

This module currently requires Node 6.0.0 or higher.

# Testing

To run the unit tests

    npm test

# License
MIT
