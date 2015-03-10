suite('querystring', function() {
  suite('#parse()', function(){
    test('should return an empty object when no value is present',function(){
      assert.deepEqual(querystring.parse(''),{});
    });
    test('should return an empty object when value passed is other than String',function(){
      assert.deepEqual(querystring.parse([1,2,3]),{});
    });
    test('should return a parsed object when a query string is passed',function(){
      assert.deepEqual(querystring.parse('foo=bar&baz=qux&baz=quux&corge'),{ foo: 'bar', baz: ['qux', 'quux'], corge: '' });
    });
    test('should return a parsed object using the window.location.search if no argument is passed',function(){
      assert.deepEqual(querystring.parse(),querystring.parse(window.location.search));
    });
    test('should decode properly encoded url parameters',function(){
      assert.deepEqual(querystring.parse('name=Antonio%20Laguna'),{name: 'Antonio Laguna'});
    });
  });
  suite('#stringify()', function(){
    test('should return an empty String when no value is present',function(){
      assert.equal(querystring.stringify(),'');
    });
    test('should return an empty object when value passed is other than Object',function(){
      assert.equal(querystring.stringify([1,2,3]),'');
    });
    test('should return a stringified object when an object is passed',function(){
      assert.equal(querystring.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' }),'foo=bar&baz=qux&baz=quux&corge=');
    });
    test('should return url + a stringified object when an object and url string are passed',function(){
      assert.equal(querystring.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' }, document.URL.split('?')[0]), document.URL.split('?')[0] + '?foo=bar&baz=qux&baz=quux&corge=');
    });
  });
  suite('#add()', function(){
    test('should return current querystring if no value is present', function(){
      assert.equal(querystring.add(), querystring.stringify(querystring.parse()));
    });
    test('should return current querystring if only one string is passed', function(){
      assert.equal(querystring.add('jack'), querystring.stringify(querystring.parse()));
    });
    test('should return stringified object if object is passed', function(){
      assert.equal(querystring.add({jack : 'jack', bob : 'bob'}), querystring.stringify(mergeObjs(querystring.parse(), {jack : 'jack', bob : 'bob'})));
    });
    test('should return desired url + ? + stringified object if both object and url are provided', function(){
      assert.equal(querystring.add({jack : 'jack', bob : 'bob'}, document.URL.split('?')[0]), document.URL.split('?')[0] + '?' + querystring.stringify(mergeObjs(querystring.parse(), {jack : 'jack', bob : 'bob'})));
    });
    test('pass just two params to get firstParam=secondParam', function(){
      assert.equal(querystring.add('jack', 'bob'), querystring.stringify(mergeObjs(querystring.parse(), {jack : 'bob'})));
    });
    test ('pass false to return object instead of string', function(){
      assert.deepEqual(querystring.add('jack', 'bob', false), mergeObjs(querystring.parse(), {jack : 'bob'}));
    });
    test ('pass false as second param to return obj', function(){
      assert.deepEqual(querystring.add({jack : 'bob'}, false), mergeObjs(querystring.parse(), {jack : 'bob'}));
    });
  });
  suite('#remove()', function(){
    test('should return stringified query minus the one string that is passed', function(){
      assert.equal(querystring.remove('jack'), querystring.stringify(rmvObjKey(querystring.parse(), 'jack')));
    });
    test('should return stringified query minus values of the passed Array', function(){
      assert.equal(querystring.remove(['jack', 'bob']), querystring.stringify(rmvObjKey(querystring.parse(), ['jack', 'bob'])));
    });
    test('should return stringified query minus values of the passed Array and append to passed url', function(){
      assert.equal(querystring.remove(['jack', 'bob'], 'http://www.google.com'), 'http://www.google.com?' + querystring.stringify(rmvObjKey(querystring.parse(), ['jack', 'bob'])));
    });
    test('should return obj of querystring\'s keys and values minus values of the passed Array', function(){
      assert.deepEqual(querystring.remove(['jack', 'bob'], false), rmvObjKey(querystring.parse(), ['jack', 'bob']));
    });
  });
  suite('#replace()', function(){
    test('if key in passed obj is present in querystring, should replace querysting\'s key\'s value & return string', function(){
      assert.equal(querystring.replace({jack : 'john'}), querystring.stringify(replaceObjKey(querystring.parse(), {jack : 'john'})));
    });
    test('should return object by passing false (boolean) as second param', function(){
      assert.deepEqual(querystring.replace({jack : 'john'}, false), replaceObjKey(querystring.parse(), {jack : 'john'}));
    });
    test('if first passed argument is equal to key in querystring, replace its value with second passed parameter (string)', function(){
      assert.equal(querystring.replace('jack', 'john'), querystring.stringify(replaceWithStr(querystring.parse(), 'jack', 'john')));
    });
    test('should return object by passing false (boolean) as third param', function(){
      assert.deepEqual(querystring.replace('jack', 'john', false), replaceWithStr(querystring.parse(), 'jack', 'john'));
    });
  });
});

function mergeObjs(obj1, obj2) {
  var merged = {};

  for (var key in obj1) {
    if (merged[key]) {
      if (merged[key].constructor === Array) {
        merged[key].push(obj1[key]);
      } else {
        merged[key] = [merged[key], obj1[key]];
      }
    } else {
      merged[key] = obj1[key];
    }
  }

  for (var key2 in obj2) {
    if (merged[key2]) {
      if (merged[key2].constructor === Array) {
        merged[key2].push(obj2[key2]);
      } else {
        merged[key2] = [merged[key2], obj2[key2]];
      }
    } else {
      merged[key2] = obj2[key2];
    }
  }
  return merged;
}

function rmvObjKey(obj, str){
  var returnVal = {};

  if (str.constructor === Array) {
    for (var key in obj) {
      if (str.indexOf(key) === -1) {
        returnVal[key] = obj[key];
      }
    }
  } else {
    for (var key2 in obj) {
      if (key2 !== str) {
        returnVal[key2] = obj[key2];
      }
    }
  }

  return returnVal;
}

function replaceObjKey(oldObj, newObj) {
  for (var key in newObj) {
    if(oldObj[key]) {
      oldObj[key] = newObj[key];
    }
  }
  return oldObj;
}

function replaceWithStr(obj, str1, str2) {
  for (var key in obj) {
    if (key === str1) {
      obj[key] = str2;
    }
  }
  return obj;
}