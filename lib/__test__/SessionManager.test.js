'use strict';

var _SessionManager = require('../SessionManager');

var _SessionManager2 = _interopRequireDefault(_SessionManager);

var _testUtils = require('./testUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('SessionManager', function () {
  var session = void 0;

  beforeEach(function () {
    session = new _SessionManager2.default({
      apiKey: 'someApiKey',
      redirectUrl: '/app'
    });
  });

  afterEach(function () {
    // Cleanup sessionStorage
    global.sessionStorage.removeItem(_SessionManager.TOKEN_KEY);
  });

  describe('constructor', function () {
    it('sets instance variables', function () {
      expect(session.apiKey).toEqual('someApiKey');
      expect(session.redirectUrl).toEqual('/app');
    });

    it('has defaults for redirectUrl', function () {
      session = new _SessionManager2.default({ apiKey: 'someApiKey' });
      expect(session.redirectUrl).toEqual('/');
    });
  });

  describe('getToken', function () {
    it('gets token from instance variable', function () {
      session.token = 'someToken';
      expect(session.getToken()).toEqual('someToken');
    });

    it('gets token from storage', function () {
      var getTokenFromStorage = jest.fn();
      getTokenFromStorage.mockReturnValue('someTokenFromStorage');
      session.getTokenFromStorage = getTokenFromStorage;

      expect(session.getToken()).toEqual('someTokenFromStorage');
    });

    it('gets token form url', function () {
      var getTokenFromUrl = jest.fn();
      getTokenFromUrl.mockReturnValue('someTokenFromUrl');
      session.getTokenFromUrl = getTokenFromUrl;

      expect(session.getToken()).toEqual('someTokenFromUrl');
    });

    it('redirects if there is no token', function () {
      session.redirect = jest.fn();
      session.getToken();

      expect(session.redirect).toBeCalled();
    });
  });

  describe('setToken', function () {
    it('sets instance variable', function () {
      session.setToken('someToken');
      expect(session.token).toEqual('someToken');
    });

    it('saves token to sessionStorage', function () {
      session.setToken('someToken');
      expect(global.sessionStorage.getItem(_SessionManager.TOKEN_KEY)).toEqual('someToken');
    });
  });

  describe('getTokenFromStorage', function () {
    it('gets token from session storage', function () {
      global.sessionStorage.setItem(_SessionManager.TOKEN_KEY, 'someToken');
      expect(session.getTokenFromStorage()).toEqual('someToken');
    });

    it('returns null if session storage is empty', function () {
      expect(session.getTokenFromStorage()).toEqual(null);
    });
  });

  describe('getTokenFromUrl', function () {
    it('returns access_token url param', function () {
      global.location.hash = 'access_token=tokenFromUrl';
      session.removeHash = jest.fn();

      expect(session.getTokenFromUrl()).toEqual('tokenFromUrl');
      expect(session.removeHash).toBeCalled();
    });
  });

  describe('redirect', function () {
    it('gets authentication url from dropbox', function () {
      session.redirect();
      expect(global.location.href).toBeDefined();
    });
  });

  describe('authUrl', function () {
    it('returns current location absolute url', function () {
      (0, _testUtils.setURL)('http://github.com');
      expect(session.authUrl).toEqual('http://github.com/app');
    });

    it('strips search params', function () {
      (0, _testUtils.setURL)('http://github.com#test?foo=bar');
      expect(session.authUrl).toEqual('http://github.com/app');
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9fX3Rlc3RfXy9TZXNzaW9uTWFuYWdlci50ZXN0LmpzIl0sIm5hbWVzIjpbImRlc2NyaWJlIiwic2Vzc2lvbiIsImJlZm9yZUVhY2giLCJhcGlLZXkiLCJyZWRpcmVjdFVybCIsImFmdGVyRWFjaCIsImdsb2JhbCIsInNlc3Npb25TdG9yYWdlIiwicmVtb3ZlSXRlbSIsIml0IiwiZXhwZWN0IiwidG9FcXVhbCIsInRva2VuIiwiZ2V0VG9rZW4iLCJnZXRUb2tlbkZyb21TdG9yYWdlIiwiamVzdCIsImZuIiwibW9ja1JldHVyblZhbHVlIiwiZ2V0VG9rZW5Gcm9tVXJsIiwicmVkaXJlY3QiLCJ0b0JlQ2FsbGVkIiwic2V0VG9rZW4iLCJnZXRJdGVtIiwic2V0SXRlbSIsImxvY2F0aW9uIiwiaGFzaCIsInJlbW92ZUhhc2giLCJocmVmIiwidG9CZURlZmluZWQiLCJhdXRoVXJsIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7Ozs7QUFFQUEsU0FBUyxnQkFBVCxFQUEyQixZQUFNO0FBQy9CLE1BQUlDLGdCQUFKOztBQUVBQyxhQUFXLFlBQU07QUFDZkQsY0FBVSw2QkFBbUI7QUFDM0JFLGNBQVEsWUFEbUI7QUFFM0JDLG1CQUFhO0FBRmMsS0FBbkIsQ0FBVjtBQUlELEdBTEQ7O0FBT0FDLFlBQVUsWUFBTTtBQUNkO0FBQ0FDLFdBQU9DLGNBQVAsQ0FBc0JDLFVBQXRCO0FBQ0QsR0FIRDs7QUFLQVIsV0FBUyxhQUFULEVBQXdCLFlBQU07QUFDNUJTLE9BQUcseUJBQUgsRUFBOEIsWUFBTTtBQUNsQ0MsYUFBT1QsUUFBUUUsTUFBZixFQUF1QlEsT0FBdkIsQ0FBK0IsWUFBL0I7QUFDQUQsYUFBT1QsUUFBUUcsV0FBZixFQUE0Qk8sT0FBNUIsQ0FBb0MsTUFBcEM7QUFDRCxLQUhEOztBQUtBRixPQUFHLDhCQUFILEVBQW1DLFlBQU07QUFDdkNSLGdCQUFVLDZCQUFtQixFQUFFRSxRQUFRLFlBQVYsRUFBbkIsQ0FBVjtBQUNBTyxhQUFPVCxR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QUFPVCxRQUFRNEIsT0FBZixFQUF3QmxCLE9BQXhCLENBQWdDLHVCQUFoQztBQUNELEtBSEQ7O0FBS0FGLE9BQUcsc0JBQUgsRUFBMkIsWUFBTTtBQUMvQiw2QkFBTyxnQ0FBUDtBQUNBQyxhQUFPVCxRQUFRNEIsT0FBZixFQUF3QmxCLE9BQXhCLENBQWdDLHVCQUFoQztBQUNELEtBSEQ7QUFJRCxHQVZEO0FBV0QsQ0E1R0QiLCJmaWxlIjoiU2Vzc2lvbk1hbmFnZXIudGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTZXNzaW9uTWFuYWdlciwgeyBUT0tFTl9LRVkgfSBmcm9tICcuLi9TZXNzaW9uTWFuYWdlcidcbmltcG9ydCB7IHNldFVSTCB9IGZyb20gJy4vdGVzdFV0aWxzJ1xuXG5kZXNjcmliZSgnU2Vzc2lvbk1hbmFnZXInLCAoKSA9PiB7XG4gIGxldCBzZXNzaW9uXG5cbiAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgc2Vzc2lvbiA9IG5ldyBTZXNzaW9uTWFuYWdlcih7XG4gICAgICBhcGlLZXk6ICdzb21lQXBpS2V5JyxcbiAgICAgIHJlZGlyZWN0VXJsOiAnL2FwcCdcbiAgICB9KVxuICB9KVxuXG4gIGFmdGVyRWFjaCgoKSA9PiB7XG4gICAgLy8gQ2xlYW51cCBzZXNzaW9uU3RvcmFnZVxuICAgIGdsb2JhbC5zZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKFRPS0VOX0tFWSlcbiAgfSlcblxuICBkZXNjcmliZSgnY29uc3RydWN0b3InLCAoKSA9PiB7XG4gICAgaXQoJ3NldHMgaW5zdGFuY2UgdmFyaWFibGVzJywgKCkgPT4ge1xuICAgICAgZXhwZWN0KHNlc3Npb24uYXBpS2V5KS50b0VxdWFsKCdzb21lQXBpS2V5JylcbiAgICAgIGV4cGVjdChzZXNzaW9uLnJlZGlyZWN0VXJsKS50b0VxdWFsKCcvYXBwJylcbiAgICB9KVxuXG4gICAgaXQoJ2hhcyBkZWZhdWx0cyBmb3IgcmVkaXJlY3RVcmwnLCAoKSA9PiB7XG4gICAgICBzZXNzaW9uID0gbmV3IFNlc3Npb25NYW5hZ2VyKHsgYXBpS2V5OiAnc29tZUFwaUtleSd9KVxuICAgICAgZXhwZWN0KHNlc3Npb24ucmVkaXJlY3RVcmwpLnRvRXF1YWwoJy8nKVxuICAgIH0pXG4gIH0pXG5cbiAgZGVzY3JpYmUoJ2dldFRva2VuJywgKCkgPT4ge1xuICAgIGl0KCdnZXRzIHRva2VuIGZyb20gaW5zdGFuY2UgdmFyaWFibGUnLCAoKSA9PiB7XG4gICAgICBzZXNzaW9uLnRva2VuID0gJ3NvbWVUb2tlbidcbiAgICAgIGV4cGVjdChzZXNzaW9uLmdldFRva2VuKCkpLnRvRXF1YWwoJ3NvbWVUb2tlbicpXG4gICAgfSlcblxuICAgIGl0KCdnZXRzIHRva2VuIGZyb20gc3RvcmFnZScsICgpID0+IHtcbiAgICAgIGNvbnN0IGdldFRva2VuRnJvbVN0b3JhZ2UgPSBqZXN0LmZuKClcbiAgICAgIGdldFRva2VuRnJvbVN0b3JhZ2UubW9ja1JldHVyblZhbHVlKCdzb21lVG9rZW5Gcm9tU3RvcmFnZScpXG4gICAgICBzZXNzaW9uLmdldFRva2VuRnJvbVN0b3JhZ2UgPSBnZXRUb2tlbkZyb21TdG9yYWdlXG5cbiAgICAgIGV4cGVjdChzZXNzaW9uLmdldFRva2VuKCkpLnRvRXF1YWwoJ3NvbWVUb2tlbkZyb21TdG9yYWdlJylcbiAgICB9KVxuXG4gICAgaXQoJ2dldHMgdG9rZW4gZm9ybSB1cmwnLCAoKSA9PiB7XG4gICAgICBjb25zdCBnZXRUb2tlbkZyb21VcmwgPSBqZXN0LmZuKClcbiAgICAgIGdldFRva2VuRnJvbVVybC5tb2NrUmV0dXJuVmFsdWUoJ3NvbWVUb2tlbkZyb21VcmwnKVxuICAgICAgc2Vzc2lvbi5nZXRUb2tlbkZyb21VcmwgPSBnZXRUb2tlbkZyb21VcmxcblxuICAgICAgZXhwZWN0KHNlc3Npb24uZ2V0VG9rZW4oKSkudG9FcXVhbCgnc29tZVRva2VuRnJvbVVybCcpXG4gICAgfSlcblxuICAgIGl0KCdyZWRpcmVjdHMgaWYgdGhlcmUgaXMgbm8gdG9rZW4nLCAoKSA9PiB7XG4gICAgICBzZXNzaW9uLnJlZGlyZWN0ID0gamVzdC5mbigpXG4gICAgICBzZXNzaW9uLmdldFRva2VuKClcblxuICAgICAgZXhwZWN0KHNlc3Npb24ucmVkaXJlY3QpLnRvQmVDYWxsZWQoKVxuICAgIH0pXG4gIH0pXG5cbiAgZGVzY3JpYmUoJ3NldFRva2VuJywgKCkgPT4ge1xuICAgIGl0KCdzZXRzIGluc3RhbmNlIHZhcmlhYmxlJywgKCkgPT4ge1xuICAgICAgc2Vzc2lvbi5zZXRUb2tlbignc29tZVRva2VuJylcbiAgICAgIGV4cGVjdChzZXNzaW9uLnRva2VuKS50b0VxdWFsKCdzb21lVG9rZW4nKVxuICAgIH0pXG5cbiAgICBpdCgnc2F2ZXMgdG9rZW4gdG8gc2Vzc2lvblN0b3JhZ2UnLCAoKSA9PiB7XG4gICAgICBzZXNzaW9uLnNldFRva2VuKCdzb21lVG9rZW4nKVxuICAgICAgZXhwZWN0KGdsb2JhbC5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFRPS0VOX0tFWSkpLnRvRXF1YWwoJ3NvbWVUb2tlbicpXG4gICAgfSlcbiAgfSlcblxuICBkZXNjcmliZSgnZ2V0VG9rZW5Gcm9tU3RvcmFnZScsICgpID0+IHtcbiAgICBpdCgnZ2V0cyB0b2tlbiBmcm9tIHNlc3Npb24gc3RvcmFnZScsICgpID0+IHtcbiAgICAgIGdsb2JhbC5zZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFRPS0VOX0tFWSwgJ3NvbWVUb2tlbicpXG4gICAgICBleHBlY3Qoc2Vzc2lvbi5nZXRUb2tlbkZyb21TdG9yYWdlKCkpLnRvRXF1YWwoJ3NvbWVUb2tlbicpXG4gICAgfSlcblxuICAgIGl0KCdyZXR1cm5zIG51bGwgaWYgc2Vzc2lvbiBzdG9yYWdlIGlzIGVtcHR5JywgKCkgPT4ge1xuICAgICAgZXhwZWN0KHNlc3Npb24uZ2V0VG9rZW5Gcm9tU3RvcmFnZSgpKS50b0VxdWFsKG51bGwpXG4gICAgfSlcbiAgfSlcblxuICBkZXNjcmliZSgnZ2V0VG9rZW5Gcm9tVXJsJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIGFjY2Vzc190b2tlbiB1cmwgcGFyYW0nLCAoKSA9PiB7XG4gICAgICBnbG9iYWwubG9jYXRpb24uaGFzaCA9ICdhY2Nlc3NfdG9rZW49dG9rZW5Gcm9tVXJsJ1xuICAgICAgc2Vzc2lvbi5yZW1vdmVIYXNoID0gamVzdC5mbigpXG5cbiAgICAgIGV4cGVjdChzZXNzaW9uLmdldFRva2VuRnJvbVVybCgpKS50b0VxdWFsKCd0b2tlbkZyb21VcmwnKVxuICAgICAgZXhwZWN0KHNlc3Npb24ucmVtb3ZlSGFzaCkudG9CZUNhbGxlZCgpXG4gICAgfSlcbiAgfSlcblxuICBkZXNjcmliZSgncmVkaXJlY3QnLCAoKSA9PiB7XG4gICAgaXQoJ2dldHMgYXV0aGVudGljYXRpb24gdXJsIGZyb20gZHJvcGJveCcsICgpID0+IHtcbiAgICAgIHNlc3Npb24ucmVkaXJlY3QoKVxuICAgICAgZXhwZWN0KGdsb2JhbC5sb2NhdGlvbi5ocmVmKS50b0JlRGVmaW5lZCgpXG4gICAgfSlcbiAgfSlcblxuICBkZXNjcmliZSgnYXV0aFVybCcsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyBjdXJyZW50IGxvY2F0aW9uIGFic29sdXRlIHVybCcsICgpID0+IHtcbiAgICAgIHNldFVSTCgnaHR0cDovL2dpdGh1Yi5jb20nKVxuICAgICAgZXhwZWN0KHNlc3Npb24uYXV0aFVybCkudG9FcXVhbCgnaHR0cDovL2dpdGh1Yi5jb20vYXBwJylcbiAgICB9KVxuXG4gICAgaXQoJ3N0cmlwcyBzZWFyY2ggcGFyYW1zJywgKCkgPT4ge1xuICAgICAgc2V0VVJMKCdodHRwOi8vZ2l0aHViLmNvbSN0ZXN0P2Zvbz1iYXInKVxuICAgICAgZXhwZWN0KHNlc3Npb24uYXV0aFVybCkudG9FcXVhbCgnaHR0cDovL2dpdGh1Yi5jb20vYXBwJylcbiAgICB9KVxuICB9KVxufSlcbiJdfQ==