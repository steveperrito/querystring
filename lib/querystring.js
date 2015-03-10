var querystring = {
  parse: function (string) {
    var parsed = {};
    string = (string !== undefined) ? string : window.location.search;

    if (typeof string === "string" && string.length > 0) {
      if (string[0] === '?') {
        string = string.substring(1);
      }

      string = string.split('&');

      for (var i = 0, length = string.length; i < length; i++) {
        var element = string[i],
          eqPos = element.indexOf('='),
          keyValue, elValue;

        if (eqPos >= 0) {
          keyValue = element.substr(0, eqPos);
          elValue = element.substr(eqPos + 1);
        }
        else {
          keyValue = element;
          elValue = '';
        }

        elValue = decodeURIComponent(elValue);

        if (parsed[keyValue] === undefined) {
          parsed[keyValue] = elValue;
        }
        else if (parsed[keyValue] instanceof Array) {
          parsed[keyValue].push(elValue);
        }
        else {
          parsed[keyValue] = [parsed[keyValue], elValue];
        }
      }
    }

    return parsed;
  },
  stringify: function (obj, url) {
    var string = [];
    url = (url !== undefined) ? url + '?' : '';

    if (!!obj && obj.constructor === Object) {
      for (var prop in obj) {
        if (obj[prop] instanceof Array) {
          for (var i = 0, length = obj[prop].length; i < length; i++) {
            string.push([encodeURIComponent(prop), encodeURIComponent(obj[prop][i])].join('='));
          }
        }
        else {
          string.push([encodeURIComponent(prop), encodeURIComponent(obj[prop])].join('='));
        }
      }
    }

    return url + string.join('&');
  },
  add: function (obj, url, bool) {
    var currentQuery = this.parse(),
      returnVal;
    url = (url !== undefined) ? url + '?' : '';
    bool = (bool !== undefined) ? bool : true;

    if (arguments.length === 2) {
      if (url == 'true?' || url == 'false?') {
        bool = (url.slice(0, -1) === 'true');
      }
    }

    if (!!obj && obj.constructor === Object) {
      for (var key in obj) {
        if (currentQuery[key]) {
          if (currentQuery[key].constructor === Array) {
            currentQuery[key].push(obj[key]);
          } else {
            currentQuery[key] = [currentQuery[key], obj[key]];
          }
        } else {
          currentQuery[key] = obj[key];
        }
      }
    }
    else if (arguments.length >= 2) {
      url = url.slice(0, -1);

      if (currentQuery[obj]) {
        if (currentQuery[obj].constructor === Array) {
          currentQuery[obj].push(url);
        } else {
          currentQuery[obj] = [currentQuery[obj], url];
        }
      } else {
        currentQuery[obj] = url;
      }
      url = (bool.constructor === Boolean) ? '': bool + '?';
    }

    returnVal = bool ? url + this.stringify(currentQuery) : currentQuery;

    return returnVal;
  },
  remove: function (ary, url, bool) {
    var currentQuery = this.parse(),
      returnVal = {};
    url = (url !== undefined) ? url + '?' : '';
    bool = (bool !== undefined) ? bool : true;

    if (arguments.length === 2) {
      if (url == 'true?' || url == 'false?') {
        bool = (url.slice(0, -1) === 'true');
        url = '';
      }
    }

    if (ary.constructor === Array) {
      for (var key in currentQuery) {
        if (ary.indexOf(key) === -1) {
          returnVal[key] = currentQuery[key];
        }
      }
    } else {
      for (var key2 in currentQuery) {
        if (key2 !== ary) {
          returnVal[key2] = currentQuery[key2];
        }
      }
    }

    returnVal = bool ? url + this.stringify(returnVal) : returnVal;

    return returnVal;
  },
  replace: function (obj, url, bool) {
    var currentQuery = this.parse(),
      returnVal;
    url = (url !== undefined) ? url + '?' : '';
    bool = (bool !== undefined) ? bool : true;

    if (arguments.length === 2) {
      if (url == 'true?' || url == 'false?') {
        bool = (url.slice(0, -1) === 'true');
        url = '';
      }
    }

    if (obj.constructor === Object) {
      for (var key in currentQuery) {
        if (obj[key]) {
          currentQuery[key] = obj[key];
        }
      }
    } else if (arguments.length >= 2 && bool.constructor === Boolean) {
      for (var key2 in currentQuery) {
        if (key2 == obj) {
          currentQuery[key2] = url.slice(0, -1);
        }
      }
      url = '';
    } else {
      for (var key3 in currentQuery) {
        if (key3 == obj) {
          currentQuery[key3] = url.slice(0, -1);
        }
      }
      url = bool + '?';
    }

    returnVal = bool ? url + this.stringify(currentQuery) : currentQuery;

    return returnVal;

  }
};