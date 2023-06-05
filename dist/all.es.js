import { refractor as e } from 'refractor/lib/all.js'
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
    return r.set(o, i || r.get(e)), l(o, t.prototype)
  }
  function n(e, t) {
    var n = r.get(t)
    return Object.keys(n).reduce(function (r, t) {
      return (r[t] = e[n[t]]), r
    }, Object.create(null))
  }
  return (
    s(t, RegExp),
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
        var s = this
        return e[Symbol.replace].call(this, t, function () {
          var e = arguments
          return (
            'object' != typeof e[e.length - 1] && (e = [].slice.call(e)).push(n(e, s)),
            i.apply(this, e)
          )
        })
      }
      return e[Symbol.replace].call(this, t, i)
    }),
    o.apply(this, arguments)
  )
}
function s(e, r) {
  if ('function' != typeof r && null !== r)
    throw new TypeError('Super expression must either be null or a function')
  ;(e.prototype = Object.create(r && r.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    r && l(e, r)
}
function l(e, r) {
  return (
    (l =
      Object.setPrototypeOf ||
      function (e, r) {
        return (e.__proto__ = r), e
      }),
    l(e, r)
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
var p = (function (e) {
  return function (s) {
    return (
      void 0 === s && (s = {}),
      function (e) {
        r(e, 'element', l)
      }
    )
    function l(r, l, a) {
      var p, c
      if (a && 'pre' === a.tagName && 'code' === r.tagName) {
        var f =
          (null == r || null == (p = r.data) ? void 0 : p.meta) ||
          (null == r || null == (c = r.properties) ? void 0 : c.metastring) ||
          ''
        r.properties.className
          ? 'boolean' == typeof r.properties.className
            ? (r.properties.className = [])
            : Array.isArray(r.properties.className) ||
              (r.properties.className = [r.properties.className])
          : (r.properties.className = []),
          r.properties.className.push('code-highlight')
        var m = (function (e) {
          return (e
            .split(',')
            .map(function (e) {
              return e.trim()
            })
            .join()
            .match(/title={(.+?)}/) || [])[1]
        })(f)
        m &&
          (a.properties || (a.properties = {}),
          a.properties.className
            ? 'boolean' == typeof a.properties.className
              ? (a.properties.className = [])
              : Array.isArray(a.properties.className) ||
                (a.properties.className = [a.properties.className])
            : (a.properties.className = []),
          a.properties.className.push('code-block-title'),
          (a.properties.title = m))
        var h,
          d,
          v = (function (e) {
            for (var r, t = u(e.properties.className); !(r = t()).done; ) {
              var n = r.value
              if ('language-' === n.slice(0, 9)) return n.slice(9).toLowerCase()
            }
            return null
          })(r)
        if (v)
          try {
            var g
            ;(g = null != v && v.includes('diff-') ? v.split('-')[1] : v),
              (h = e.highlight(t(r), g)),
              (a.properties.className = (a.properties.className || []).concat('language-' + g))
          } catch (e) {
            if (!s.ignoreMissing || !/Unknown language/.test(e.message)) throw e
            h = r
          }
        else h = r
        ;(h.children = ((d = 1),
        function e(r) {
          return r.reduce(function (r, t) {
            if ('text' === t.type) {
              var n = t.value,
                i = (n.match(/\n/g) || '').length
              if (0 === i)
                (t.position = { start: { line: d, column: 1 }, end: { line: d, column: 1 } }),
                  r.push(t)
              else
                for (var o, s = n.split('\n'), l = u(s.entries()); !(o = l()).done; ) {
                  var a = o.value,
                    p = a[0],
                    c = a[1]
                  r.push({
                    type: 'text',
                    value: p === s.length - 1 ? c : c + '\n',
                    position: {
                      start: { line: d + p, column: 1 },
                      end: { line: d + p, column: 1 },
                    },
                  })
                }
              return (d += i), r
            }
            if (Object.prototype.hasOwnProperty.call(t, 'children')) {
              var f = d
              return (
                (t.children = e(t.children)),
                r.push(t),
                (t.position = { start: { line: f, column: 1 }, end: { line: d, column: 1 } }),
                r
              )
            }
            return r.push(t), r
          }, [])
        })(h.children)),
          (h.position =
            h.children.length > 0
              ? {
                  start: { line: h.children[0].position.start.line, column: 0 },
                  end: { line: h.children[h.children.length - 1].position.end.line, column: 0 },
                }
              : { start: { line: 0, column: 0 }, end: { line: 0, column: 0 } })
        for (
          var y,
            b = (function (e) {
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
            N = (function (e) {
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
            w = (function (e) {
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
            x = (function (e) {
              var r = /*#__PURE__*/ o(/showLineNumbers=([0-9]+)/i, { lines: 1 })
              if (r.test(e)) {
                var t = r.exec(e)
                return Number(t.groups.lines)
              }
              return 1
            })(f),
            j = (function (e) {
              for (var r = new Array(e), t = 0; t < e; t++)
                r[t] = {
                  type: 'element',
                  tagName: 'span',
                  properties: { className: [] },
                  children: [],
                }
              return r
            })(h.position.end.line),
            A = ['showlinenumbers=false', 'showlinenumbers="false"', 'showlinenumbers={false}'],
            S = function () {
              var e = y.value,
                r = e[0],
                i = e[1]
              i.properties.className = ['code-line']
              var o = n(h, function (e) {
                return e.position.start.line <= r + 1 && e.position.end.line >= r + 1
              })
              ;(i.children = o.children),
                i.children.unshift({
                  type: 'element',
                  tagName: 'span',
                  properties: { className: 'line-suffix' },
                  children: [],
                }),
                (!f.toLowerCase().includes('showLineNumbers'.toLowerCase()) &&
                  !s.showLineNumbers) ||
                  A.some(function (e) {
                    return f.toLowerCase().includes(e)
                  }) ||
                  ((i.properties.line = [(r + x).toString()]),
                  i.properties.className.push('line-number')),
                b(r) && i.properties.className.push('highlight-line'),
                ('diff' === v || (null != v && v.includes('diff-'))) && '-' === t(i).substring(0, 1)
                  ? i.properties.className.push('deleted')
                  : ('diff' === v || (null != v && v.includes('diff-'))) &&
                    '+' === t(i).substring(0, 1) &&
                    i.properties.className.push('inserted'),
                N(r) &&
                  (i.properties.className.push('inserted'),
                  i.children[0].children.push({ type: 'text', value: '+' })),
                w(r) &&
                  (i.properties.className.push('deleted'),
                  i.children[0].children.push({ type: 'text', value: '-' }))
            },
            O = u(j.entries());
          !(y = O()).done;

        )
          S()
        j.length > 0 && '' === t(j[j.length - 1]).trim() && j.pop(), (r.children = j)
      }
    }
  }
})(e)
export { p as default }
//# sourceMappingURL=all.es.js.map
