'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TOKEN_KEY = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dropbox = require('dropbox');

var _dropbox2 = _interopRequireDefault(_dropbox);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TOKEN_KEY = exports.TOKEN_KEY = 'luggageToken';

var SessionManager = function () {
  function SessionManager(_ref) {
    var apiKey = _ref.apiKey,
        _ref$redirectUrl = _ref.redirectUrl,
        redirectUrl = _ref$redirectUrl === undefined ? '/' : _ref$redirectUrl;

    _classCallCheck(this, SessionManager);

    this.apiKey = apiKey;
    this.redirectUrl = redirectUrl;
  }

  _createClass(SessionManager, [{
    key: 'getToken',
    value: function getToken() {
      return this.token || this.getTokenFromStorage() || this.getTokenFromUrl() || this.redirect();
    }
  }, {
    key: 'setToken',
    value: function setToken(token) {
      this.token = token;
      global.sessionStorage.setItem(TOKEN_KEY, token);
    }
  }, {
    key: 'getTokenFromStorage',
    value: function getTokenFromStorage() {
      return global.sessionStorage.getItem(TOKEN_KEY);
    }
  }, {
    key: 'getTokenFromUrl',
    value: function getTokenFromUrl() {
      var token = (0, _utils.parseQueryString)(global.location.hash).access_token;

      if (token) {
        this.setToken(token);
        this.removeHash();
      }

      return token;
    }
  }, {
    key: 'removeHash',
    value: function removeHash() {
      global.history.pushState('', global.document.title, global.location.pathname + global.location.search);
    }
  }, {
    key: 'redirect',
    value: function redirect() {
      var dbx = new _dropbox2.default({ clientId: this.apiKey });
      var authUrl = dbx.getAuthenticationUrl(this.authUrl);

      global.location = authUrl;
    }
  }, {
    key: 'authUrl',
    get: function get() {
      var _global$location = global.location,
          hostname = _global$location.hostname,
          port = _global$location.port,
          protocol = _global$location.protocol;


      return protocol + '//' + hostname + (port ? ':' + port : '') + this.redirectUrl;
    }
  }]);

  return SessionManager;
}();

exports.default = SessionManager;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TZXNzaW9uTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJUT0tFTl9LRVkiLCJTZXNzaW9uTWFuYWdlciIsImFwaUtleSIsInJlZGlyZWN0VXJsIiwidG9rZW4iLCJnZXRUb2tlbkZyb21TdG9yYWdlIiwiZ2V0VG9rZW5Gcm9tVXJsIiwicmVkaXJlY3QiLCJnbG9iYWwiLCJzZXNzaW9uU3RvcmFnZSIsInNldEl0ZW0iLCJnZXRJdGVtIiwibG9jYXRpb24iLCJoYXNoIiwiYWNjZXNzX3Rva2VuIiwic2V0VG9rZW4iLCJyZW1vdmVIYXNoIiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsImRvY3VtZW50IiwidGl0bGUiLCJwYXRobmFtZSIsInNlYXJjaCIsImRieCIsImNsaWVudElkIiwiYXV0aFVybCIsImdldEF1dGhlbnRpY2F0aW9uVXJsIiwiaG9zdG5hbWUiLCJwb3J0IiwicHJvdG9jb2wiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7OztBQUVPLElBQU1BLGdDQUFZLGNBQWxCOztJQUVEQyxjO0FBQ0osZ0NBQTBDO0FBQUEsUUFBNUJDLE1BQTRCLFFBQTVCQSxNQUE0QjtBQUFBLGdDQUFwQkMsV0FBb0I7QUFBQSxRQUFwQkEsV0FBb0Isb0NBQU4sR0FBTTs7QUFBQTs7QUFDeEMsU0FBS0QsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsU0FBS0MsV0FBTCxHQUFtQkEsV0FBbkI7QUFDRDs7OzsrQkFFVTtBQUNULGFBQU8sS0FBS0MsS0FBTCxJQUNGLEtBQUtDLG1CQUFMLEVBREUsSUFFRixLQUFLQyxlQUFMLEVBRkUsSUFHRixLQUFLQyxRQUFMLEVBSEw7QUFJRDs7OzZCQUVRSCxLLEVBQU87QUFDZCxXQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDQUksYUFBT0MsY0FBUCxDQUFzQkMsT0FBdEIsQ0FBOEJWLFNBQTlCLEVBQXlDSSxLQUF6QztBQUNEOzs7MENBRXFCO0FBQ3BCLGFBQU9JLE9BQU9DLGNBQVAsQ0FBc0JFLE9BQXRCLENBQThCWCxTQUE5QixDQUFQO0FBQ0Q7OztzQ0FFaUI7QUFDaEIsVUFBTUksUUFBUSw2QkFBaUJJLE9BQU9JLFFBQVAsQ0FBZ0JDLElBQWpDLEVBQXVDQyxZQUFyRDs7QUFFQSxVQUFJVixLQUFKLEVBQVc7QUFDVCxhQUFLVyxRQUFMLENBQWNYLEtBQWQ7QUFDQSxhQUFLWSxVQUFMO0FBQ0Q7O0FBRUQsYUFBT1osS0FBUDtBQUNEOzs7aUNBRVk7QUFDWEksYUFBT1MsT0FBUCxDQUFlQyxTQUFmLENBQXlCLEVBQXpCLEVBQTZCVixPQUFPVyxRQUFQLENBQWdCQyxLQUE3QyxFQUFvRFosT0FBT0ksUUFBUCxDQUFnQlMsUUFBaEIsR0FDaERiLE9BQU9JLFFBQVAsQ0FBZ0JVLE1BRHBCO0FBRUQ7OzsrQkFFVTtBQUNULFVBQU1DLE1BQU0sc0JBQVksRUFBRUMsVUFBVSxLQUFLdEIsTUFBakIsRUFBWixDQUFaO0FBQ0EsVUFBTXVCLFVBQVVGLElBQUlHLG9CQUFKLENBQXlCLEtBQUtELE9BQTlCLENBQWhCOztBQUVBakIsYUFBT0ksUUFBUCxHQUFrQmEsT0FBbEI7QUFDRDs7O3dCQUVhO0FBQUEsNkJBQ3lCakIsT0FBT0ksUUFEaEM7QUFBQSxVQUNKZSxRQURJLG9CQUNKQSxRQURJO0FBQUEsVUFDTUMsSUFETixvQkFDTUEsSUFETjtBQUFBLFVBQ1lDLFFBRFosb0JBQ1lBLFFBRFo7OztBQUdaLGFBQU9BLFdBQVcsSUFBWCxHQUNMRixRQURLLElBRUpDLE9BQU8sTUFBTUEsSUFBYixHQUFvQixFQUZoQixJQUdMLEtBQUt6QixXQUhQO0FBSUQ7Ozs7OztrQkFHWUYsYyIsImZpbGUiOiJTZXNzaW9uTWFuYWdlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEcm9wYm94IGZyb20gJ2Ryb3Bib3gnXG5pbXBvcnQgeyBwYXJzZVF1ZXJ5U3RyaW5nIH0gZnJvbSAnLi91dGlscydcblxuZXhwb3J0IGNvbnN0IFRPS0VOX0tFWSA9ICdsdWdnYWdlVG9rZW4nXG5cbmNsYXNzIFNlc3Npb25NYW5hZ2VyIHtcbiAgY29uc3RydWN0b3IoeyBhcGlLZXksIHJlZGlyZWN0VXJsID0gJy8nfSkge1xuICAgIHRoaXMuYXBpS2V5ID0gYXBpS2V5XG4gICAgdGhpcy5yZWRpcmVjdFVybCA9IHJlZGlyZWN0VXJsXG4gIH1cblxuICBnZXRUb2tlbigpIHtcbiAgICByZXR1cm4gdGhpcy50b2tlblxuICAgICAgfHwgdGhpcy5nZXRUb2tlbkZyb21TdG9yYWdlKClcbiAgICAgIHx8IHRoaXMuZ2V0VG9rZW5Gcm9tVXJsKClcbiAgICAgIHx8IHRoaXMucmVkaXJlY3QoKVxuICB9XG5cbiAgc2V0VG9rZW4odG9rZW4pIHtcbiAgICB0aGlzLnRva2VuID0gdG9rZW5cbiAgICBnbG9iYWwuc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShUT0tFTl9LRVksIHRva2VuKVxuICB9XG5cbiAgZ2V0VG9rZW5Gcm9tU3RvcmFnZSgpIHtcbiAgICByZXR1cm4gZ2xvYmFsLnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oVE9LRU5fS0VZKVxuICB9XG5cbiAgZ2V0VG9rZW5Gcm9tVXJsKCkge1xuICAgIGNvbnN0IHRva2VuID0gcGFyc2VRdWVyeVN0cmluZyhnbG9iYWwubG9jYXRpb24uaGFzaCkuYWNjZXNzX3Rva2VuXG5cbiAgICBpZiAodG9rZW4pIHtcbiAgICAgIHRoaXMuc2V0VG9rZW4odG9rZW4pXG4gICAgICB0aGlzLnJlbW92ZUhhc2goKVxuICAgIH1cblxuICAgIHJldHVybiB0b2tlblxuICB9XG5cbiAgcmVtb3ZlSGFzaCgpIHtcbiAgICBnbG9iYWwuaGlzdG9yeS5wdXNoU3RhdGUoJycsIGdsb2JhbC5kb2N1bWVudC50aXRsZSwgZ2xvYmFsLmxvY2F0aW9uLnBhdGhuYW1lXG4gICAgICArIGdsb2JhbC5sb2NhdGlvbi5zZWFyY2gpXG4gIH1cblxuICByZWRpcmVjdCgpIHtcbiAgICBjb25zdCBkYnggPSBuZXcgRHJvcGJveCh7IGNsaWVudElkOiB0aGlzLmFwaUtleSB9KVxuICAgIGNvbnN0IGF1dGhVcmwgPSBkYnguZ2V0QXV0aGVudGljYXRpb25VcmwodGhpcy5hdXRoVXJsKVxuXG4gICAgZ2xvYmFsLmxvY2F0aW9uID0gYXV0aFVybFxuICB9XG5cbiAgZ2V0IGF1dGhVcmwoKSB7XG4gICAgY29uc3QgeyBob3N0bmFtZSwgcG9ydCwgcHJvdG9jb2wgfSA9IGdsb2JhbC5sb2NhdGlvblxuXG4gICAgcmV0dXJuIHByb3RvY29sICsgJy8vJyArXG4gICAgICBob3N0bmFtZSArXG4gICAgICAocG9ydCA/ICc6JyArIHBvcnQgOiAnJykgK1xuICAgICAgdGhpcy5yZWRpcmVjdFVybFxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlc3Npb25NYW5hZ2VyXG4iXX0=