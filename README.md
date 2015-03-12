#querystring

Simple querystring lib with no dependencies.

##Installation

###Bower

`bower install querystring`

###Manual Download

- [Development]()
- [Production]()

##Usage

###Parse

```javascript
//url http://localhost/?foo=bar&cow=moo
querystring.parse(); //no argument passed in assumes window.location.search
// returns { foo: 'bar', cow: 'moo' }
```

```javascript
querystring.parse('foo=bar&baz=qux&baz=quux&corge');
// returns { foo: 'bar', baz: ['qux', 'quux'], corge: '' }
```

###Stringify
```javascript
querystring.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' });
// returns 'foo=bar&baz=qux&baz=quux&corge='
```

```javascript
querystring.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' }, 'http://www.google.com');
// returns 'http://www.google.com?foo=bar&baz=qux&baz=quux&corge='
```

###Add
```javascript
//assuming window.location.search has jack=jack
querystring.add({ foo: 'bar', baz: ['qux', 'quux'], corge: '' });
// returns '?jack=jack&foo=bar&baz=qux&baz=quux&corge='
```

```javascript
//assuming window.location.search has jack=jack
querystring.add({ foo: 'bar', baz: ['qux', 'quux'], corge: '' }, 'http://www.google.com');
// returns 'http://www.google.com?jack=jack&foo=bar&baz=qux&baz=quux&corge='
```

```javascript
//assuming window.location.search has jack=jack
querystring.add('foo', 'bar');
// returns 'jack=jack&foo=bar'
```

```javascript
//assuming window.location.search has jack=jack
querystring.add('foo', 'bar', false); //passing false returns an object instead of a string
// returns '{jack:jack, foo:bar}'
```

###Remove
```javascript
//assuming window.location.search has jack=jack
querystring.remove('jack');
// returns ''
```

```javascript
//assuming window.location.search has jack=jack&bob=bob
querystring.remove('jack', 'http://www.google.com');
// returns 'http://www.google.com?bob=bob'
```

```javascript
//assuming window.location.search has jack=jack&bob=bob
querystring.remove(['jack', 'bob'], 'http://www.google.com');
// returns 'http://www.google.com?'
```

```javascript
//assuming window.location.search has jack=jack&bob=bob&jane=jane
querystring.remove(['jack', 'bob'], false); //passing false returns an object instead of a string
// returns {jane: 'jane'}
```

###Replace
```javascript
//assuming window.location.search has jack=jack
querystring.replace('jack', 'dunno');
// returns 'jack=dunno'
```

```javascript
//assuming window.location.search has jack=jack
querystring.replace('jack', 'dunno', 'http://www.google.com');
// returns 'http://www.google.com?jack=dunno'
```

```javascript
//assuming window.location.search has jack=jack
querystring.replace('jack', 'dunno', false); //passing false returns an object instead of a string
// returns {jack : 'dunno'}
```

```javascript
//assuming window.location.search has jack=jack&bob=bob
querystring.replace({jack : 'dunno', bob : 'thatGuy'}, 'http://www.google.com');
// returns 'http://www.google.com?jack=dunno&bob=thatGuy'
```

##Development

###Requirements

- node and npm
- bower `npm install -g bower`
- grunt `npm install -g grunt-cli`

###Setup

- `npm install`
- `bower install`

###Run

`grunt dev`

or for just running tests on file changes:

`grunt ci`

###Tests

`grunt mocha`
