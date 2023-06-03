import { refractor as e } from 'refractor/lib/common.js'
import { visit as r } from 'unist-util-visit'
import { toString as t } from 'hast-util-to-string'
import { filter as n } from 'unist-util-filter'
import i from 'parse-numeric-range'
function o() {
  o = function (e, r) {
    return new t(e, void 0, r)
  }
  var e = RegExp.prototype,
    r = new WeakMap()
  function t(e, n, i) {
    var o = new RegExp(e, n)
    return r.set(o, i || r.get(e)), s(o, t.prototype)
  }
  function n(e, t) {
    var n = r.get(t)
    return Object.keys(n).reduce(function (r, t) {
      return (r[t] = e[n[t]]), r
    }, Object.create(null))
  }
  return (
    l(t, RegExp),
    (t.prototype.exec = function (r) {
      var t = e.exec.call(this, r)
      return t && (t.groups = n(t, this)), t
    }),
    (t.prototype[Symbol.replace] = function (t, i) {
      if ('string' == typeof i) {
        var o = r.get(this)
        return e[Symbol.replace].call(
          this,
          t,
          i.replace(/\$<([^>]+)>/g, function (e, r) {
            return '$' + o[r]
          })
        )
      }
      if ('function' == typeof i) {
        var l = this
        return e[Symbol.replace].call(this, t, function () {
          var e = arguments
          return (
            'object' != typeof e[e.length - 1] && (e = [].slice.call(e)).push(n(e, l)),
            i.apply(this, e)
          )
        })
      }
      return e[Symbol.replace].call(this, t, i)
    }),
    o.apply(this, arguments)
  )
}
function l(e, r) {
  if ('function' != typeof r && null !== r)
    throw new TypeError('Super expression must either be null or a function')
  ;(e.prototype = Object.create(r && r.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    r && s(e, r)
}
function s(e, r) {
  return (
    (s =
      Object.setPrototypeOf ||
      function (e, r) {
        return (e.__proto__ = r), e
      }),
    s(e, r)
  )
}
function a(e, r) {
  ;(null == r || r > e.length) && (r = e.length)
  for (var t = 0, n = new Array(r); t < r; t++) n[t] = e[t]
  return n
}
function u(e, r) {
  var t = ('undefined' != typeof Symbol && e[Symbol.iterator]) || e['@@iterator']
  if (t) return (t = t.call(e)).next.bind(t)
  if (
    Array.isArray(e) ||
    (t = (function (e, r) {
      if (e) {
        if ('string' == typeof e) return a(e, r)
        var t = Object.prototype.toString.call(e).slice(8, -1)
        return (
          'Object' === t && e.constructor && (t = e.constructor.name),
          'Map' === t || 'Set' === t
            ? Array.from(e)
            : 'Arguments' === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
            ? a(e, r)
            : void 0
        )
      }
    })(e)) ||
    (r && e && 'number' == typeof e.length)
  ) {
    t && (e = t)
    var n = 0
    return function () {
      return n >= e.length ? { done: !0 } : { done: !1, value: e[n++] }
    }
  }
  throw new TypeError(
    'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
  )
}
var c = (function (e) {
  return function (l) {
    return (
      void 0 === l && (l = {}),
      function (e) {
        r(e, 'element', s)
      }
    )
    function s(r, s, a) {
      var c, p
      if (a && 'pre' === a.tagName && 'code' === r.tagName) {
        var f =
          (null == r || null == (c = r.data) ? void 0 : c.meta) ||
          (null == r || null == (p = r.properties) ? void 0 : p.metastring) ||
          ''
        r.properties.className
          ? 'boolean' == typeof r.properties.className
            ? (r.properties.className = [])
            : Array.isArray(r.properties.className) ||
              (r.properties.className = [r.properties.className])
          : (r.properties.className = []),
          r.properties.className.push('code-highlight')
        var m,
          h,
          d = (function (e) {
            for (var r, t = u(e.properties.className); !(r = t()).done; ) {
              var n = r.value
              if ('language-' === n.slice(0, 9)) return n.slice(9).toLowerCase()
            }
            return null
          })(r)
        if (d)
          try {
            var v
            ;(v = null != d && d.includes('diff-') ? d.split('-')[1] : d),
              (m = e.highlight(t(r), v)),
              (a.properties.className = (a.properties.className || []).concat('language-' + v))
          } catch (e) {
            if (!l.ignoreMissing || !/Unknown language/.test(e.message)) throw e
            m = r
          }
        else m = r
        ;(m.children = ((h = 1),
        function e(r) {
          return r.reduce(function (r, t) {
            if ('text' === t.type) {
              var n = t.value,
                i = (n.match(/\n/g) || '').length
              if (0 === i)
                (t.position = { start: { line: h, column: 1 }, end: { line: h, column: 1 } }),
                  r.push(t)
              else
                for (var o, l = n.split('\n'), s = u(l.entries()); !(o = s()).done; ) {
                  var a = o.value,
                    c = a[0],
                    p = a[1]
                  r.push({
                    type: 'text',
                    value: c === l.length - 1 ? p : p + '\n',
                    position: {
                      start: { line: h + c, column: 1 },
                      end: { line: h + c, column: 1 },
                    },
                  })
                }
              return (h += i), r
            }
            if (Object.prototype.hasOwnProperty.call(t, 'children')) {
              var f = h
              return (
                (t.children = e(t.children)),
                r.push(t),
                (t.position = { start: { line: f, column: 1 }, end: { line: h, column: 1 } }),
                r
              )
            }
            return r.push(t), r
          }, [])
        })(m.children)),
          (m.position =
            m.children.length > 0
              ? {
                  start: { line: m.children[0].position.start.line, column: 0 },
                  end: { line: m.children[m.children.length - 1].position.end.line, column: 0 },
                }
              : { start: { line: 0, column: 0 }, end: { line: 0, column: 0 } })
        for (
          var g,
            y = (function (e) {
              var r = /\*{([\d,-]+)}/,
                t = e
                  .split(',')
                  .map(function (e) {
                    return e.trim()
                  })
                  .join()
              if (r.test(t)) {
                var n = r.exec(t)[1],
                  o = i(n)
                return function (e) {
                  return o.includes(e + 1)
                }
              }
              return function () {
                return !1
              }
            })(f),
            b = (function (e) {
              var r = /-{([\d,-]+)}/,
                t = e
                  .split(',')
                  .map(function (e) {
                    return e.trim()
                  })
                  .join()
              if (r.test(t)) {
                var n = r.exec(t)[1],
                  o = i(n)
                return function (e) {
                  return o.includes(e + 1)
                }
              }
              return function () {
                return !1
              }
            })(f),
            N = (function (e) {
              var r = /\+{([\d,-]+)}/,
                t = e
                  .split(',')
                  .map(function (e) {
                    return e.trim()
                  })
                  .join()
              if (r.test(t)) {
                var n = r.exec(t)[1],
                  o = i(n)
                return function (e) {
                  return o.includes(e + 1)
                }
              }
              return function () {
                return !1
              }
            })(f),
            w = (function (e) {
              var r = /*#__PURE__*/ o(/showLineNumbers=([0-9]+)/i, { lines: 1 })
              if (r.test(e)) {
                var t = r.exec(e)
                return Number(t.groups.lines)
              }
              return 1
            })(f),
            x = (function (e) {
              for (var r = new Array(e), t = 0; t < e; t++)
                r[t] = {
                  type: 'element',
                  tagName: 'span',
                  properties: { className: [] },
                  children: [],
                }
              return r
            })(m.position.end.line),
            j = ['showlinenumbers=false', 'showlinenumbers="false"', 'showlinenumbers={false}'],
            S = function () {
              var e = g.value,
                r = e[0],
                t = e[1]
              t.properties.className = ['code-line']
              var i = n(m, function (e) {
                return e.position.start.line <= r + 1 && e.position.end.line >= r + 1
              })
              ;(t.children = i.children),
                t.children.unshift({
                  type: 'element',
                  tagName: 'span',
                  properties: { className: 'line-suffix' },
                  children: [],
                }),
                (!f.toLowerCase().includes('showLineNumbers'.toLowerCase()) &&
                  !l.showLineNumbers) ||
                  j.some(function (e) {
                    return f.toLowerCase().includes(e)
                  }) ||
                  ((t.properties.line = [(r + w).toString()]),
                  t.properties.className.push('line-number')),
                y(r) && t.properties.className.push('highlight-line'),
                b(r) &&
                  (t.properties.className.push('inserted'),
                  t.children[0].children.push({ type: 'text', value: '+' })),
                N(r) &&
                  (t.properties.className.push('deleted'),
                  t.children[0].children.push({ type: 'text', value: '-' }))
            },
            O = u(x.entries());
          !(g = O()).done;

        )
          S()
        x.length > 0 && '' === t(x[x.length - 1]).trim() && x.pop(), (r.children = x)
      }
    }
  }
})(e)
export { c as default }
//# sourceMappingURL=common.es.js.map
