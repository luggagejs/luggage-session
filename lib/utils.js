'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint no-undefined: 0 */

var parseQueryString = exports.parseQueryString = function parseQueryString(queryString) {
  var ret = Object.create(null);

  if (typeof queryString !== 'string') {
    return ret;
  }

  var str = queryString.trim().replace(/^(\?|#|&)/, '');

  if (!str) {
    return ret;
  }

  str.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    // Firefox (pre 40) decodes `%3D` to `=`
    // https://github.com/sindresorhus/query-string/pull/37
    var key = decodeURIComponent(parts.shift());
    var val = parts.length > 0 ? parts.join('=') : undefined;

    // missing `=` should be `null`:
    // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
    var value = val === undefined ? null : decodeURIComponent(val);

    if (ret[key] === undefined) {
      ret[key] = value;
    } else if (Array.isArray(ret[key])) {
      ret[key].push(value);
    } else {
      ret[key] = [ret[key], value];
    }
  });

  return ret;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlscy5qcyJdLCJuYW1lcyI6WyJwYXJzZVF1ZXJ5U3RyaW5nIiwicmV0IiwiT2JqZWN0IiwiY3JlYXRlIiwicXVlcnlTdHJpbmciLCJzdHIiLCJ0cmltIiwicmVwbGFjZSIsInNwbGl0IiwiZm9yRWFjaCIsInBhcnRzIiwicGFyYW0iLCJrZXkiLCJkZWNvZGVVUklDb21wb25lbnQiLCJzaGlmdCIsInZhbCIsImxlbmd0aCIsImpvaW4iLCJ1bmRlZmluZWQiLCJ2YWx1ZSIsIkFycmF5IiwiaXNBcnJheSIsInB1c2giXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7O0FBRU8sSUFBTUEsOENBQW1CLFNBQW5CQSxnQkFBbUIsY0FBZTtBQUM3QyxNQUFNQyxNQUFNQyxPQUFPQyxNQUFQLENBQWMsSUFBZCxDQUFaOztBQUVBLE1BQUksT0FBT0MsV0FBUCxLQUF1QixRQUEzQixFQUFxQztBQUNuQyxXQUFPSCxHQUFQO0FBQ0Q7O0FBRUQsTUFBTUksTUFBTUQsWUFBWUUsSUFBWixHQUFtQkMsT0FBbkIsQ0FBMkIsV0FBM0IsRUFBd0MsRUFBeEMsQ0FBWjs7QUFFQSxNQUFJLENBQUNGLEdBQUwsRUFBVTtBQUNSLFdBQU9KLEdBQVA7QUFDRDs7QUFFREksTUFBSUcsS0FBSixDQUFVLEdBQVYsRUFBZUMsT0FBZixDQUF1QixpQkFBUztBQUM5QixRQUFNQyxRQUFRQyxNQUFNSixPQUFOLENBQWMsS0FBZCxFQUFxQixHQUFyQixFQUEwQkMsS0FBMUIsQ0FBZ0MsR0FBaEMsQ0FBZDtBQUNBO0FBQ0E7QUFDQSxRQUFNSSxNQUFNQyxtQkFBbUJILE1BQU1JLEtBQU4sRUFBbkIsQ0FBWjtBQUNBLFFBQU1DLE1BQU1MLE1BQU1NLE1BQU4sR0FBZSxDQUFmLEdBQW1CTixNQUFNTyxJQUFOLENBQVcsR0FBWCxDQUFuQixHQUFxQ0MsU0FBakQ7O0FBRUE7QUFDQTtBQUNBLFFBQU1DLFFBQVFKLFFBQVFHLFNBQVIsR0FBb0IsSUFBcEIsR0FBMkJMLG1CQUFtQkUsR0FBbkIsQ0FBekM7O0FBRUEsUUFBSWQsSUFBSVcsR0FBSixNQUFhTSxTQUFqQixFQUE0QjtBQUMxQmpCLFVBQUlXLEdBQUosSUFBV08sS0FBWDtBQUNELEtBRkQsTUFFTyxJQUFJQyxNQUFNQyxPQUFOLENBQWNwQixJQUFJVyxHQUFKLENBQWQsQ0FBSixFQUE2QjtBQUNsQ1gsVUFBSVcsR0FBSixFQUFTVSxJQUFULENBQWNILEtBQWQ7QUFDRCxLQUZNLE1BRUE7QUFDTGxCLFVBQUlXLEdBQUosSUFBVyxDQUFDWCxJQUFJVyxHQUFKLENBQUQsRUFBV08sS0FBWCxDQUFYO0FBQ0Q7QUFDRixHQWxCRDs7QUFvQkEsU0FBT2xCLEdBQVA7QUFDRCxDQWxDTSIsImZpbGUiOiJ1dGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludCBuby11bmRlZmluZWQ6IDAgKi9cblxuZXhwb3J0IGNvbnN0IHBhcnNlUXVlcnlTdHJpbmcgPSBxdWVyeVN0cmluZyA9PiB7XG4gIGNvbnN0IHJldCA9IE9iamVjdC5jcmVhdGUobnVsbClcblxuICBpZiAodHlwZW9mIHF1ZXJ5U3RyaW5nICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiByZXRcbiAgfVxuXG4gIGNvbnN0IHN0ciA9IHF1ZXJ5U3RyaW5nLnRyaW0oKS5yZXBsYWNlKC9eKFxcP3wjfCYpLywgJycpXG5cbiAgaWYgKCFzdHIpIHtcbiAgICByZXR1cm4gcmV0XG4gIH1cblxuICBzdHIuc3BsaXQoJyYnKS5mb3JFYWNoKHBhcmFtID0+IHtcbiAgICBjb25zdCBwYXJ0cyA9IHBhcmFtLnJlcGxhY2UoL1xcKy9nLCAnICcpLnNwbGl0KCc9JylcbiAgICAvLyBGaXJlZm94IChwcmUgNDApIGRlY29kZXMgYCUzRGAgdG8gYD1gXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3NpbmRyZXNvcmh1cy9xdWVyeS1zdHJpbmcvcHVsbC8zN1xuICAgIGNvbnN0IGtleSA9IGRlY29kZVVSSUNvbXBvbmVudChwYXJ0cy5zaGlmdCgpKVxuICAgIGNvbnN0IHZhbCA9IHBhcnRzLmxlbmd0aCA+IDAgPyBwYXJ0cy5qb2luKCc9JykgOiB1bmRlZmluZWRcblxuICAgIC8vIG1pc3NpbmcgYD1gIHNob3VsZCBiZSBgbnVsbGA6XG4gICAgLy8gaHR0cDovL3czLm9yZy9UUi8yMDEyL1dELXVybC0yMDEyMDUyNC8jY29sbGVjdC11cmwtcGFyYW1ldGVyc1xuICAgIGNvbnN0IHZhbHVlID0gdmFsID09PSB1bmRlZmluZWQgPyBudWxsIDogZGVjb2RlVVJJQ29tcG9uZW50KHZhbClcblxuICAgIGlmIChyZXRba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXRba2V5XSA9IHZhbHVlXG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHJldFtrZXldKSkge1xuICAgICAgcmV0W2tleV0ucHVzaCh2YWx1ZSlcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0W2tleV0gPSBbcmV0W2tleV0sIHZhbHVlXVxuICAgIH1cbiAgfSlcblxuICByZXR1cm4gcmV0XG59XG4iXX0=