## stream-crossref-to-retraction

This is a tiny module that converts CrossRef metadata to the format used in OpenRetractions.

## install

```bash
npm install --save stream-crossref-to-retraction
```

## usage

```js
var getretraction = require('stream-crossref-to-retraction')

// .convert is a function that converts a single object
var retraction_object = getretraction.convert(raw_crossref_object)

// .stream is a through stream that converts an input stream
var retractions = getretraction.stream()

retractions.pipe(crossrefStream)

retractions.on('data', function (data) {
  // data is now an OpenRetractions format object
})
```

## license

To the extent possible by law, we transfer any rights we have in the this code to the public domain. Specifically, we do so using the [CC0 1.0 Universal Public Domain Dedication](https://creativecommons.org/publicdomain/zero/1.0/).

You can do whatever you want with this code. No need to credit us, link to us, include any license, or anything else. But if you want to do those things, you're free to do that too.
