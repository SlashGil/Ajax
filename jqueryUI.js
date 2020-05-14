/*
 * jQuery UI 1.8.23
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI
 */
(function(a, d) {
    a.ui = a.ui || {};
    if (a.ui.version) {
        return
    }
    a.extend(a.ui, {
        version: "1.8.23",
        keyCode: {
            ALT: 18,
            BACKSPACE: 8,
            CAPS_LOCK: 20,
            COMMA: 188,
            COMMAND: 91,
            COMMAND_LEFT: 91,
            COMMAND_RIGHT: 93,
            CONTROL: 17,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            INSERT: 45,
            LEFT: 37,
            MENU: 93,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SHIFT: 16,
            SPACE: 32,
            TAB: 9,
            UP: 38,
            WINDOWS: 91
        }
    });
    a.fn.extend({
        propAttr: a.fn.prop || a.fn.attr,
        _focus: a.fn.focus,
        focus: function(e, f) {
            return typeof e === "number" ? this.each(function() {
                var g = this;
                setTimeout(function() {
                    a(g).focus();
                    if (f) {
                        f.call(g)
                    }
                }, e)
            }) : this._focus.apply(this, arguments)
        },
        scrollParent: function() {
            var e;
            if ((a.browser.msie && (/(static|relative)/).test(this.css("position"))) || (/absolute/).test(this.css("position"))) {
                e = this.parents().filter(function() {
                    return (/(relative|absolute|fixed)/).test(a.curCSS(this, "position", 1)) && (/(auto|scroll)/).test(a.curCSS(this, "overflow", 1) + a.curCSS(this, "overflow-y", 1) + a.curCSS(this, "overflow-x", 1))
                }).eq(0)
            } else {
                e = this.parents().filter(function() {
                    return (/(auto|scroll)/).test(a.curCSS(this, "overflow", 1) + a.curCSS(this, "overflow-y", 1) + a.curCSS(this, "overflow-x", 1))
                }).eq(0)
            }
            return (/fixed/).test(this.css("position")) || !e.length ? a(document) : e
        },
        zIndex: function(h) {
            if (h !== d) {
                return this.css("zIndex", h)
            }
            if (this.length) {
                var f = a(this[0]),
                    e, g;
                while (f.length && f[0] !== document) {
                    e = f.css("position");
                    if (e === "absolute" || e === "relative" || e === "fixed") {
                        g = parseInt(f.css("zIndex"), 10);
                        if (!isNaN(g) && g !== 0) {
                            return g
                        }
                    }
                    f = f.parent()
                }
            }
            return 0
        },
        disableSelection: function() {
            return this.bind((a.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(e) {
                e.preventDefault()
            })
        },
        enableSelection: function() {
            return this.unbind(".ui-disableSelection")
        }
    });
    if (!a("<a>").outerWidth(1).jquery) {
        a.each(["Width", "Height"], function(g, e) {
            var f = e === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
                h = e.toLowerCase(),
                k = {
                    innerWidth: a.fn.innerWidth,
                    innerHeight: a.fn.innerHeight,
                    outerWidth: a.fn.outerWidth,
                    outerHeight: a.fn.outerHeight
                };

            function j(m, l, i, n) {
                a.each(f, function() {
                    l -= parseFloat(a.curCSS(m, "padding" + this, true)) || 0;
                    if (i) {
                        l -= parseFloat(a.curCSS(m, "border" + this + "Width", true)) || 0
                    }
                    if (n) {
                        l -= parseFloat(a.curCSS(m, "margin" + this, true)) || 0
                    }
                });
                return l
            }
            a.fn["inner" + e] = function(i) {
                if (i === d) {
                    return k["inner" + e].call(this)
                }
                return this.each(function() {
                    a(this).css(h, j(this, i) + "px")
                })
            };
            a.fn["outer" + e] = function(i, l) {
                if (typeof i !== "number") {
                    return k["outer" + e].call(this, i)
                }
                return this.each(function() {
                    a(this).css(h, j(this, i, true, l) + "px")
                })
            }
        })
    }

    function c(g, e) {
        var j = g.nodeName.toLowerCase();
        if ("area" === j) {
            var i = g.parentNode,
                h = i.name,
                f;
            if (!g.href || !h || i.nodeName.toLowerCase() !== "map") {
                return false
            }
            f = a("img[usemap=#" + h + "]")[0];
            return !!f && b(f)
        }
        return (/input|select|textarea|button|object/.test(j) ? !g.disabled : "a" == j ? g.href || e : e) && b(g)
    }

    function b(e) {
        return !a(e).parents().andSelf().filter(function() {
            return a.curCSS(this, "visibility") === "hidden" || a.expr.filters.hidden(this)
        }).length
    }
    a.extend(a.expr[":"], {
        data: a.expr.createPseudo ? a.expr.createPseudo(function(e) {
            return function(f) {
                return !!a.data(f, e)
            }
        }) : function(g, f, e) {
            return !!a.data(g, e[3])
        },
        focusable: function(e) {
            return c(e, !isNaN(a.attr(e, "tabindex")))
        },
        tabbable: function(g) {
            var e = a.attr(g, "tabindex"),
                f = isNaN(e);
            return (f || e >= 0) && c(g, !f)
        }
    });
    a(function() {
        var e = document.body,
            f = e.appendChild(f = document.createElement("div"));
        f.offsetHeight;
        a.extend(f.style, {
            minHeight: "100px",
            height: "auto",
            padding: 0,
            borderWidth: 0
        });
        a.support.minHeight = f.offsetHeight === 100;
        a.support.selectstart = "onselectstart" in f;
        e.removeChild(f).style.display = "none"
    });
    if (!a.curCSS) {
        a.curCSS = a.css
    }
    a.extend(a.ui, {
        plugin: {
            add: function(f, g, j) {
                var h = a.ui[f].prototype;
                for (var e in j) {
                    h.plugins[e] = h.plugins[e] || [];
                    h.plugins[e].push([g, j[e]])
                }
            },
            call: function(e, g, f) {
                var j = e.plugins[g];
                if (!j || !e.element[0].parentNode) {
                    return
                }
                for (var h = 0; h < j.length; h++) {
                    if (e.options[j[h][0]]) {
                        j[h][1].apply(e.element, f)
                    }
                }
            }
        },
        contains: function(f, e) {
            return document.compareDocumentPosition ? f.compareDocumentPosition(e) & 16 : f !== e && f.contains(e)
        },
        hasScroll: function(h, f) {
            if (a(h).css("overflow") === "hidden") {
                return false
            }
            var e = (f && f === "left") ? "scrollLeft" : "scrollTop",
                g = false;
            if (h[e] > 0) {
                return true
            }
            h[e] = 1;
            g = (h[e] > 0);
            h[e] = 0;
            return g
        },
        isOverAxis: function(f, e, g) {
            return (f > e) && (f < (e + g))
        },
        isOver: function(j, f, i, h, e, g) {
            return a.ui.isOverAxis(j, i, e) && a.ui.isOverAxis(f, h, g)
        }
    })
})(jQuery);
/*
 * jQuery UI Widget 1.8.23
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Widget
 */
(function(b, d) {
    if (b.cleanData) {
        var c = b.cleanData;
        b.cleanData = function(f) {
            for (var g = 0, h;
                (h = f[g]) != null; g++) {
                try {
                    b(h).triggerHandler("remove")
                } catch (j) {}
            }
            c(f)
        }
    } else {
        var a = b.fn.remove;
        b.fn.remove = function(e, f) {
            return this.each(function() {
                if (!f) {
                    if (!e || b.filter(e, [this]).length) {
                        b("*", this).add([this]).each(function() {
                            try {
                                b(this).triggerHandler("remove")
                            } catch (g) {}
                        })
                    }
                }
                return a.call(b(this), e, f)
            })
        }
    }
    b.widget = function(f, h, e) {
        var g = f.split(".")[0],
            j;
        f = f.split(".")[1];
        j = g + "-" + f;
        if (!e) {
            e = h;
            h = b.Widget
        }
        b.expr[":"][j] = function(k) {
            return !!b.data(k, f)
        };
        b[g] = b[g] || {};
        b[g][f] = function(k, l) {
            if (arguments.length) {
                this._createWidget(k, l)
            }
        };
        var i = new h();
        i.options = b.extend(true, {}, i.options);
        b[g][f].prototype = b.extend(true, i, {
            namespace: g,
            widgetName: f,
            widgetEventPrefix: b[g][f].prototype.widgetEventPrefix || f,
            widgetBaseClass: j
        }, e);
        b.widget.bridge(f, b[g][f])
    };
    b.widget.bridge = function(f, e) {
        b.fn[f] = function(i) {
            var g = typeof i === "string",
                h = Array.prototype.slice.call(arguments, 1),
                j = this;
            i = !g && h.length ? b.extend.apply(null, [true, i].concat(h)) : i;
            if (g && i.charAt(0) === "_") {
                return j
            }
            if (g) {
                this.each(function() {
                    var k = b.data(this, f),
                        l = k && b.isFunction(k[i]) ? k[i].apply(k, h) : k;
                    if (l !== k && l !== d) {
                        j = l;
                        return false
                    }
                })
            } else {
                this.each(function() {
                    var k = b.data(this, f);
                    if (k) {
                        k.option(i || {})._init()
                    } else {
                        b.data(this, f, new e(i, this))
                    }
                })
            }
            return j
        }
    };
    b.Widget = function(e, f) {
        if (arguments.length) {
            this._createWidget(e, f)
        }
    };
    b.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        options: {
            disabled: false
        },
        _createWidget: function(f, g) {
            b.data(g, this.widgetName, this);
            this.element = b(g);
            this.options = b.extend(true, {}, this.options, this._getCreateOptions(), f);
            var e = this;
            this.element.bind("remove." + this.widgetName, function() {
                e.destroy()
            });
            this._create();
            this._trigger("create");
            this._init()
        },
        _getCreateOptions: function() {
            return b.metadata && b.metadata.get(this.element[0])[this.widgetName]
        },
        _create: function() {},
        _init: function() {},
        destroy: function() {
            this.element.unbind("." + this.widgetName).removeData(this.widgetName);
            this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled ui-state-disabled")
        },
        widget: function() {
            return this.element
        },
        option: function(f, g) {
            var e = f;
            if (arguments.length === 0) {
                return b.extend({}, this.options)
            }
            if (typeof f === "string") {
                if (g === d) {
                    return this.options[f]
                }
                e = {};
                e[f] = g
            }
            this._setOptions(e);
            return this
        },
        _setOptions: function(f) {
            var e = this;
            b.each(f, function(g, h) {
                e._setOption(g, h)
            });
            return this
        },
        _setOption: function(e, f) {
            this.options[e] = f;
            if (e === "disabled") {
                this.widget()[f ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled ui-state-disabled").attr("aria-disabled", f)
            }
            return this
        },
        enable: function() {
            return this._setOption("disabled", false)
        },
        disable: function() {
            return this._setOption("disabled", true)
        },
        _trigger: function(e, f, g) {
            var j, i, h = this.options[e];
            g = g || {};
            f = b.Event(f);
            f.type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase();
            f.target = this.element[0];
            i = f.originalEvent;
            if (i) {
                for (j in i) {
                    if (!(j in f)) {
                        f[j] = i[j]
                    }
                }
            }
            this.element.trigger(f, g);
            return !(b.isFunction(h) && h.call(this.element[0], f, g) === false || f.isDefaultPrevented())
        }
    }
})(jQuery);
/*
 * jQuery UI Mouse 1.8.23
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Mouse
 *
 * Depends:
 *	jquery.ui.widget.js
 */
(function(b, c) {
    var a = false;
    b(document).mouseup(function(d) {
        a = false
    });
    b.widget("ui.mouse", {
        options: {
            cancel: ":input,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var d = this;
            this.element.bind("mousedown." + this.widgetName, function(e) {
                return d._mouseDown(e)
            }).bind("click." + this.widgetName, function(e) {
                if (true === b.data(e.target, d.widgetName + ".preventClickEvent")) {
                    b.removeData(e.target, d.widgetName + ".preventClickEvent");
                    e.stopImmediatePropagation();
                    return false
                }
            });
            this.started = false
        },
        _mouseDestroy: function() {
            this.element.unbind("." + this.widgetName);
            if (this._mouseMoveDelegate) {
                b(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
            }
        },
        _mouseDown: function(f) {
            if (a) {
                return
            }(this._mouseStarted && this._mouseUp(f));
            this._mouseDownEvent = f;
            var e = this,
                g = (f.which == 1),
                d = (typeof this.options.cancel == "string" && f.target.nodeName ? b(f.target).closest(this.options.cancel).length : false);
            if (!g || d || !this._mouseCapture(f)) {
                return true
            }
            this.mouseDelayMet = !this.options.delay;
            if (!this.mouseDelayMet) {
                this._mouseDelayTimer = setTimeout(function() {
                    e.mouseDelayMet = true
                }, this.options.delay)
            }
            if (this._mouseDistanceMet(f) && this._mouseDelayMet(f)) {
                this._mouseStarted = (this._mouseStart(f) !== false);
                if (!this._mouseStarted) {
                    f.preventDefault();
                    return true
                }
            }
            if (true === b.data(f.target, this.widgetName + ".preventClickEvent")) {
                b.removeData(f.target, this.widgetName + ".preventClickEvent")
            }
            this._mouseMoveDelegate = function(h) {
                return e._mouseMove(h)
            };
            this._mouseUpDelegate = function(h) {
                return e._mouseUp(h)
            };
            b(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate);
            f.preventDefault();
            a = true;
            return true
        },
        _mouseMove: function(d) {
            if (b.browser.msie && !(document.documentMode >= 9) && !d.button) {
                return this._mouseUp(d)
            }
            if (this._mouseStarted) {
                this._mouseDrag(d);
                return d.preventDefault()
            }
            if (this._mouseDistanceMet(d) && this._mouseDelayMet(d)) {
                this._mouseStarted = (this._mouseStart(this._mouseDownEvent, d) !== false);
                (this._mouseStarted ? this._mouseDrag(d) : this._mouseUp(d))
            }
            return !this._mouseStarted
        },
        _mouseUp: function(d) {
            b(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
            if (this._mouseStarted) {
                this._mouseStarted = false;
                if (d.target == this._mouseDownEvent.target) {
                    b.data(d.target, this.widgetName + ".preventClickEvent", true)
                }
                this._mouseStop(d)
            }
            return false
        },
        _mouseDistanceMet: function(d) {
            return (Math.max(Math.abs(this._mouseDownEvent.pageX - d.pageX), Math.abs(this._mouseDownEvent.pageY - d.pageY)) >= this.options.distance)
        },
        _mouseDelayMet: function(d) {
            return this.mouseDelayMet
        },
        _mouseStart: function(d) {},
        _mouseDrag: function(d) {},
        _mouseStop: function(d) {},
        _mouseCapture: function(d) {
            return true
        }
    })
})(jQuery);
/*
 * jQuery UI Position 1.8.23
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Position
 */
(function(g, h) {
    g.ui = g.ui || {};
    var d = /left|center|right/,
        e = /top|center|bottom/,
        a = "center",
        f = {},
        b = g.fn.position,
        c = g.fn.offset;
    g.fn.position = function(j) {
        if (!j || !j.of) {
            return b.apply(this, arguments)
        }
        j = g.extend({}, j);
        var n = g(j.of),
            m = n[0],
            p = (j.collision || "flip").split(" "),
            o = j.offset ? j.offset.split(" ") : [0, 0],
            l, i, k;
        if (m.nodeType === 9) {
            l = n.width();
            i = n.height();
            k = {
                top: 0,
                left: 0
            }
        } else {
            if (m.setTimeout) {
                l = n.width();
                i = n.height();
                k = {
                    top: n.scrollTop(),
                    left: n.scrollLeft()
                }
            } else {
                if (m.preventDefault) {
                    j.at = "left top";
                    l = i = 0;
                    k = {
                        top: j.of.pageY,
                        left: j.of.pageX
                    }
                } else {
                    l = n.outerWidth();
                    i = n.outerHeight();
                    k = n.offset()
                }
            }
        }
        g.each(["my", "at"], function() {
            var q = (j[this] || "").split(" ");
            if (q.length === 1) {
                q = d.test(q[0]) ? q.concat([a]) : e.test(q[0]) ? [a].concat(q) : [a, a]
            }
            q[0] = d.test(q[0]) ? q[0] : a;
            q[1] = e.test(q[1]) ? q[1] : a;
            j[this] = q
        });
        if (p.length === 1) {
            p[1] = p[0]
        }
        o[0] = parseInt(o[0], 10) || 0;
        if (o.length === 1) {
            o[1] = o[0]
        }
        o[1] = parseInt(o[1], 10) || 0;
        if (j.at[0] === "right") {
            k.left += l
        } else {
            if (j.at[0] === a) {
                k.left += l / 2
            }
        }
        if (j.at[1] === "bottom") {
            k.top += i
        } else {
            if (j.at[1] === a) {
                k.top += i / 2
            }
        }
        k.left += o[0];
        k.top += o[1];
        return this.each(function() {
            var t = g(this),
                v = t.outerWidth(),
                s = t.outerHeight(),
                u = parseInt(g.curCSS(this, "marginLeft", true)) || 0,
                r = parseInt(g.curCSS(this, "marginTop", true)) || 0,
                x = v + u + (parseInt(g.curCSS(this, "marginRight", true)) || 0),
                y = s + r + (parseInt(g.curCSS(this, "marginBottom", true)) || 0),
                w = g.extend({}, k),
                q;
            if (j.my[0] === "right") {
                w.left -= v
            } else {
                if (j.my[0] === a) {
                    w.left -= v / 2
                }
            }
            if (j.my[1] === "bottom") {
                w.top -= s
            } else {
                if (j.my[1] === a) {
                    w.top -= s / 2
                }
            }
            if (!f.fractions) {
                w.left = Math.round(w.left);
                w.top = Math.round(w.top)
            }
            q = {
                left: w.left - u,
                top: w.top - r
            };
            g.each(["left", "top"], function(A, z) {
                if (g.ui.position[p[A]]) {
                    g.ui.position[p[A]][z](w, {
                        targetWidth: l,
                        targetHeight: i,
                        elemWidth: v,
                        elemHeight: s,
                        collisionPosition: q,
                        collisionWidth: x,
                        collisionHeight: y,
                        offset: o,
                        my: j.my,
                        at: j.at
                    })
                }
            });
            if (g.fn.bgiframe) {
                t.bgiframe()
            }
            t.offset(g.extend(w, {
                using: j.using
            }))
        })
    };
    g.ui.position = {
        fit: {
            left: function(i, j) {
                var l = g(window),
                    k = j.collisionPosition.left + j.collisionWidth - l.width() - l.scrollLeft();
                i.left = k > 0 ? i.left - k : Math.max(i.left - j.collisionPosition.left, i.left)
            },
            top: function(i, j) {
                var l = g(window),
                    k = j.collisionPosition.top + j.collisionHeight - l.height() - l.scrollTop();
                i.top = k > 0 ? i.top - k : Math.max(i.top - j.collisionPosition.top, i.top)
            }
        },
        flip: {
            left: function(j, l) {
                if (l.at[0] === a) {
                    return
                }
                var n = g(window),
                    m = l.collisionPosition.left + l.collisionWidth - n.width() - n.scrollLeft(),
                    i = l.my[0] === "left" ? -l.elemWidth : l.my[0] === "right" ? l.elemWidth : 0,
                    k = l.at[0] === "left" ? l.targetWidth : -l.targetWidth,
                    o = -2 * l.offset[0];
                j.left += l.collisionPosition.left < 0 ? i + k + o : m > 0 ? i + k + o : 0
            },
            top: function(j, l) {
                if (l.at[1] === a) {
                    return
                }
                var n = g(window),
                    m = l.collisionPosition.top + l.collisionHeight - n.height() - n.scrollTop(),
                    i = l.my[1] === "top" ? -l.elemHeight : l.my[1] === "bottom" ? l.elemHeight : 0,
                    k = l.at[1] === "top" ? l.targetHeight : -l.targetHeight,
                    o = -2 * l.offset[1];
                j.top += l.collisionPosition.top < 0 ? i + k + o : m > 0 ? i + k + o : 0
            }
        }
    };
    if (!g.offset.setOffset) {
        g.offset.setOffset = function(m, j) {
            if (/static/.test(g.curCSS(m, "position"))) {
                m.style.position = "relative"
            }
            var l = g(m),
                o = l.offset(),
                i = parseInt(g.curCSS(m, "top", true), 10) || 0,
                n = parseInt(g.curCSS(m, "left", true), 10) || 0,
                k = {
                    top: (j.top - o.top) + i,
                    left: (j.left - o.left) + n
                };
            if ("using" in j) {
                j.using.call(m, k)
            } else {
                l.css(k)
            }
        };
        g.fn.offset = function(i) {
            var j = this[0];
            if (!j || !j.ownerDocument) {
                return null
            }
            if (i) {
                if (g.isFunction(i)) {
                    return this.each(function(k) {
                        g(this).offset(i.call(this, k, g(this).offset()))
                    })
                }
                return this.each(function() {
                    g.offset.setOffset(this, i)
                })
            }
            return c.call(this)
        }
    }
    if (!g.curCSS) {
        g.curCSS = g.css
    }(function() {
        var j = document.getElementsByTagName("body")[0],
            q = document.createElement("div"),
            n, p, k, o, m;
        n = document.createElement(j ? "div" : "body");
        k = {
            visibility: "hidden",
            width: 0,
            height: 0,
            border: 0,
            margin: 0,
            background: "none"
        };
        if (j) {
            g.extend(k, {
                position: "absolute",
                left: "-1000px",
                top: "-1000px"
            })
        }
        for (var l in k) {
            n.style[l] = k[l]
        }
        n.appendChild(q);
        p = j || document.documentElement;
        p.insertBefore(n, p.firstChild);
        q.style.cssText = "position: absolute; left: 10.7432222px; top: 10.432325px; height: 30px; width: 201px;";
        o = g(q).offset(function(i, r) {
            return r
        }).offset();
        n.innerHTML = "";
        p.removeChild(n);
        m = o.top + o.left + (j ? 2000 : 0);
        f.fractions = m > 21 && m < 22
    })()
}(jQuery));
/*
 * jQuery UI Draggable 1.8.23
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Draggables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function(a, b) {
    a.widget("ui.draggable", a.ui.mouse, {
        widgetEventPrefix: "drag",
        options: {
            addClasses: true,
            appendTo: "parent",
            axis: false,
            connectToSortable: false,
            containment: false,
            cursor: "auto",
            cursorAt: false,
            grid: false,
            handle: false,
            helper: "original",
            iframeFix: false,
            opacity: false,
            refreshPositions: false,
            revert: false,
            revertDuration: 500,
            scope: "default",
            scroll: true,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: false,
            snapMode: "both",
            snapTolerance: 20,
            stack: false,
            zIndex: false
        },
        _create: function() {
            if (this.options.helper == "original" && !(/^(?:r|a|f)/).test(this.element.css("position"))) {
                this.element[0].style.position = "relative"
            }(this.options.addClasses && this.element.addClass("ui-draggable"));
            (this.options.disabled && this.element.addClass("ui-draggable-disabled"));
            this._mouseInit()
        },
        destroy: function() {
            if (!this.element.data("draggable")) {
                return
            }
            this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");
            this._mouseDestroy();
            return this
        },
        _mouseCapture: function(c) {
            var d = this.options;
            if (this.helper || d.disabled || a(c.target).is(".ui-resizable-handle")) {
                return false
            }
            this.handle = this._getHandle(c);
            if (!this.handle) {
                return false
            }
            if (d.iframeFix) {
                a(d.iframeFix === true ? "iframe" : d.iframeFix).each(function() {
                    a('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({
                        width: this.offsetWidth + "px",
                        height: this.offsetHeight + "px",
                        position: "absolute",
                        opacity: "0.001",
                        zIndex: 1000
                    }).css(a(this).offset()).appendTo("body")
                })
            }
            return true
        },
        _mouseStart: function(c) {
            var d = this.options;
            this.helper = this._createHelper(c);
            this.helper.addClass("ui-draggable-dragging");
            this._cacheHelperProportions();
            if (a.ui.ddmanager) {
                a.ui.ddmanager.current = this
            }
            this._cacheMargins();
            this.cssPosition = this.helper.css("position");
            this.scrollParent = this.helper.scrollParent();
            this.offset = this.positionAbs = this.element.offset();
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            };
            a.extend(this.offset, {
                click: {
                    left: c.pageX - this.offset.left,
                    top: c.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            });
            this.originalPosition = this.position = this._generatePosition(c);
            this.originalPageX = c.pageX;
            this.originalPageY = c.pageY;
            (d.cursorAt && this._adjustOffsetFromHelper(d.cursorAt));
            if (d.containment) {
                this._setContainment()
            }
            if (this._trigger("start", c) === false) {
                this._clear();
                return false
            }
            this._cacheHelperProportions();
            if (a.ui.ddmanager && !d.dropBehaviour) {
                a.ui.ddmanager.prepareOffsets(this, c)
            }
            this._mouseDrag(c, true);
            if (a.ui.ddmanager) {
                a.ui.ddmanager.dragStart(this, c)
            }
            return true
        },
        _mouseDrag: function(c, e) {
            this.position = this._generatePosition(c);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!e) {
                var d = this._uiHash();
                if (this._trigger("drag", c, d) === false) {
                    this._mouseUp({});
                    return false
                }
                this.position = d.position
            }
            if (!this.options.axis || this.options.axis != "y") {
                this.helper[0].style.left = this.position.left + "px"
            }
            if (!this.options.axis || this.options.axis != "x") {
                this.helper[0].style.top = this.position.top + "px"
            }
            if (a.ui.ddmanager) {
                a.ui.ddmanager.drag(this, c)
            }
            return false
        },
        _mouseStop: function(e) {
            var g = false;
            if (a.ui.ddmanager && !this.options.dropBehaviour) {
                g = a.ui.ddmanager.drop(this, e)
            }
            if (this.dropped) {
                g = this.dropped;
                this.dropped = false
            }
            var d = this.element[0],
                f = false;
            while (d && (d = d.parentNode)) {
                if (d == document) {
                    f = true
                }
            }
            if (!f && this.options.helper === "original") {
                return false
            }
            if ((this.options.revert == "invalid" && !g) || (this.options.revert == "valid" && g) || this.options.revert === true || (a.isFunction(this.options.revert) && this.options.revert.call(this.element, g))) {
                var c = this;
                a(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                    if (c._trigger("stop", e) !== false) {
                        c._clear()
                    }
                })
            } else {
                if (this._trigger("stop", e) !== false) {
                    this._clear()
                }
            }
            return false
        },
        _mouseUp: function(c) {
            if (this.options.iframeFix === true) {
                a("div.ui-draggable-iframeFix").each(function() {
                    this.parentNode.removeChild(this)
                })
            }
            if (a.ui.ddmanager) {
                a.ui.ddmanager.dragStop(this, c)
            }
            return a.ui.mouse.prototype._mouseUp.call(this, c)
        },
        cancel: function() {
            if (this.helper.is(".ui-draggable-dragging")) {
                this._mouseUp({})
            } else {
                this._clear()
            }
            return this
        },
        _getHandle: function(c) {
            var d = !this.options.handle || !a(this.options.handle, this.element).length ? true : false;
            a(this.options.handle, this.element).find("*").andSelf().each(function() {
                if (this == c.target) {
                    d = true
                }
            });
            return d
        },
        _createHelper: function(d) {
            var e = this.options;
            var c = a.isFunction(e.helper) ? a(e.helper.apply(this.element[0], [d])) : (e.helper == "clone" ? this.element.clone().removeAttr("id") : this.element);
            if (!c.parents("body").length) {
                c.appendTo((e.appendTo == "parent" ? this.element[0].parentNode : e.appendTo))
            }
            if (c[0] != this.element[0] && !(/(fixed|absolute)/).test(c.css("position"))) {
                c.css("position", "absolute")
            }
            return c
        },
        _adjustOffsetFromHelper: function(c) {
            if (typeof c == "string") {
                c = c.split(" ")
            }
            if (a.isArray(c)) {
                c = {
                    left: +c[0],
                    top: +c[1] || 0
                }
            }
            if ("left" in c) {
                this.offset.click.left = c.left + this.margins.left
            }
            if ("right" in c) {
                this.offset.click.left = this.helperProportions.width - c.right + this.margins.left
            }
            if ("top" in c) {
                this.offset.click.top = c.top + this.margins.top
            }
            if ("bottom" in c) {
                this.offset.click.top = this.helperProportions.height - c.bottom + this.margins.top
            }
        },
        _getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var c = this.offsetParent.offset();
            if (this.cssPosition == "absolute" && this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) {
                c.left += this.scrollParent.scrollLeft();
                c.top += this.scrollParent.scrollTop()
            }
            if ((this.offsetParent[0] == document.body) || (this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && a.browser.msie)) {
                c = {
                    top: 0,
                    left: 0
                }
            }
            return {
                top: c.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: c.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if (this.cssPosition == "relative") {
                var c = this.element.position();
                return {
                    top: c.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: c.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            } else {
                return {
                    top: 0,
                    left: 0
                }
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: (parseInt(this.element.css("marginLeft"), 10) || 0),
                top: (parseInt(this.element.css("marginTop"), 10) || 0),
                right: (parseInt(this.element.css("marginRight"), 10) || 0),
                bottom: (parseInt(this.element.css("marginBottom"), 10) || 0)
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var g = this.options;
            if (g.containment == "parent") {
                g.containment = this.helper[0].parentNode
            }
            if (g.containment == "document" || g.containment == "window") {
                this.containment = [g.containment == "document" ? 0 : a(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, g.containment == "document" ? 0 : a(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, (g.containment == "document" ? 0 : a(window).scrollLeft()) + a(g.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (g.containment == "document" ? 0 : a(window).scrollTop()) + (a(g.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]
            }
            if (!(/^(document|window|parent)$/).test(g.containment) && g.containment.constructor != Array) {
                var h = a(g.containment);
                var e = h[0];
                if (!e) {
                    return
                }
                var f = h.offset();
                var d = (a(e).css("overflow") != "hidden");
                this.containment = [(parseInt(a(e).css("borderLeftWidth"), 10) || 0) + (parseInt(a(e).css("paddingLeft"), 10) || 0), (parseInt(a(e).css("borderTopWidth"), 10) || 0) + (parseInt(a(e).css("paddingTop"), 10) || 0), (d ? Math.max(e.scrollWidth, e.offsetWidth) : e.offsetWidth) - (parseInt(a(e).css("borderLeftWidth"), 10) || 0) - (parseInt(a(e).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (d ? Math.max(e.scrollHeight, e.offsetHeight) : e.offsetHeight) - (parseInt(a(e).css("borderTopWidth"), 10) || 0) - (parseInt(a(e).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom];
                this.relative_container = h
            } else {
                if (g.containment.constructor == Array) {
                    this.containment = g.containment
                }
            }
        },
        _convertPositionTo: function(g, i) {
            if (!i) {
                i = this.position
            }
            var e = g == "absolute" ? 1 : -1;
            var f = this.options,
                c = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                h = (/(html|body)/i).test(c[0].tagName);
            return {
                top: (i.top + this.offset.relative.top * e + this.offset.parent.top * e - (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : (h ? 0 : c.scrollTop())) * e)),
                left: (i.left + this.offset.relative.left * e + this.offset.parent.left * e - (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : h ? 0 : c.scrollLeft()) * e))
            }
        },
        _generatePosition: function(d) {
            var e = this.options,
                l = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                i = (/(html|body)/i).test(l[0].tagName);
            var h = d.pageX;
            var g = d.pageY;
            if (this.originalPosition) {
                var c;
                if (this.containment) {
                    if (this.relative_container) {
                        var k = this.relative_container.offset();
                        c = [this.containment[0] + k.left, this.containment[1] + k.top, this.containment[2] + k.left, this.containment[3] + k.top]
                    } else {
                        c = this.containment
                    }
                    if (d.pageX - this.offset.click.left < c[0]) {
                        h = c[0] + this.offset.click.left
                    }
                    if (d.pageY - this.offset.click.top < c[1]) {
                        g = c[1] + this.offset.click.top
                    }
                    if (d.pageX - this.offset.click.left > c[2]) {
                        h = c[2] + this.offset.click.left
                    }
                    if (d.pageY - this.offset.click.top > c[3]) {
                        g = c[3] + this.offset.click.top
                    }
                }
                if (e.grid) {
                    var j = e.grid[1] ? this.originalPageY + Math.round((g - this.originalPageY) / e.grid[1]) * e.grid[1] : this.originalPageY;
                    g = c ? (!(j - this.offset.click.top < c[1] || j - this.offset.click.top > c[3]) ? j : (!(j - this.offset.click.top < c[1]) ? j - e.grid[1] : j + e.grid[1])) : j;
                    var f = e.grid[0] ? this.originalPageX + Math.round((h - this.originalPageX) / e.grid[0]) * e.grid[0] : this.originalPageX;
                    h = c ? (!(f - this.offset.click.left < c[0] || f - this.offset.click.left > c[2]) ? f : (!(f - this.offset.click.left < c[0]) ? f - e.grid[0] : f + e.grid[0])) : f
                }
            }
            return {
                top: (g - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : (i ? 0 : l.scrollTop())))),
                left: (h - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : i ? 0 : l.scrollLeft())))
            }
        },
        _clear: function() {
            this.helper.removeClass("ui-draggable-dragging");
            if (this.helper[0] != this.element[0] && !this.cancelHelperRemoval) {
                this.helper.remove()
            }
            this.helper = null;
            this.cancelHelperRemoval = false
        },
        _trigger: function(c, d, e) {
            e = e || this._uiHash();
            a.ui.plugin.call(this, c, [d, e]);
            if (c == "drag") {
                this.positionAbs = this._convertPositionTo("absolute")
            }
            return a.Widget.prototype._trigger.call(this, c, d, e)
        },
        plugins: {},
        _uiHash: function(c) {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    });
    a.extend(a.ui.draggable, {
        version: "1.8.23"
    });
    a.ui.plugin.add("draggable", "connectToSortable", {
        start: function(d, f) {
            var e = a(this).data("draggable"),
                g = e.options,
                c = a.extend({}, f, {
                    item: e.element
                });
            e.sortables = [];
            a(g.connectToSortable).each(function() {
                var h = a.data(this, "sortable");
                if (h && !h.options.disabled) {
                    e.sortables.push({
                        instance: h,
                        shouldRevert: h.options.revert
                    });
                    h.refreshPositions();
                    h._trigger("activate", d, c)
                }
            })
        },
        stop: function(d, f) {
            var e = a(this).data("draggable"),
                c = a.extend({}, f, {
                    item: e.element
                });
            a.each(e.sortables, function() {
                if (this.instance.isOver) {
                    this.instance.isOver = 0;
                    e.cancelHelperRemoval = true;
                    this.instance.cancelHelperRemoval = false;
                    if (this.shouldRevert) {
                        this.instance.options.revert = true
                    }
                    this.instance._mouseStop(d);
                    this.instance.options.helper = this.instance.options._helper;
                    if (e.options.helper == "original") {
                        this.instance.currentItem.css({
                            top: "auto",
                            left: "auto"
                        })
                    }
                } else {
                    this.instance.cancelHelperRemoval = false;
                    this.instance._trigger("deactivate", d, c)
                }
            })
        },
        drag: function(d, g) {
            var f = a(this).data("draggable"),
                c = this;
            var e = function(j) {
                var p = this.offset.click.top,
                    n = this.offset.click.left;
                var h = this.positionAbs.top,
                    l = this.positionAbs.left;
                var k = j.height,
                    m = j.width;
                var q = j.top,
                    i = j.left;
                return a.ui.isOver(h + p, l + n, q, i, k, m)
            };
            a.each(f.sortables, function(h) {
                this.instance.positionAbs = f.positionAbs;
                this.instance.helperProportions = f.helperProportions;
                this.instance.offset.click = f.offset.click;
                if (this.instance._intersectsWith(this.instance.containerCache)) {
                    if (!this.instance.isOver) {
                        this.instance.isOver = 1;
                        this.instance.currentItem = a(c).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item", true);
                        this.instance.options._helper = this.instance.options.helper;
                        this.instance.options.helper = function() {
                            return g.helper[0]
                        };
                        d.target = this.instance.currentItem[0];
                        this.instance._mouseCapture(d, true);
                        this.instance._mouseStart(d, true, true);
                        this.instance.offset.click.top = f.offset.click.top;
                        this.instance.offset.click.left = f.offset.click.left;
                        this.instance.offset.parent.left -= f.offset.parent.left - this.instance.offset.parent.left;
                        this.instance.offset.parent.top -= f.offset.parent.top - this.instance.offset.parent.top;
                        f._trigger("toSortable", d);
                        f.dropped = this.instance.element;
                        f.currentItem = f.element;
                        this.instance.fromOutside = f
                    }
                    if (this.instance.currentItem) {
                        this.instance._mouseDrag(d)
                    }
                } else {
                    if (this.instance.isOver) {
                        this.instance.isOver = 0;
                        this.instance.cancelHelperRemoval = true;
                        this.instance.options.revert = false;
                        this.instance._trigger("out", d, this.instance._uiHash(this.instance));
                        this.instance._mouseStop(d, true);
                        this.instance.options.helper = this.instance.options._helper;
                        this.instance.currentItem.remove();
                        if (this.instance.placeholder) {
                            this.instance.placeholder.remove()
                        }
                        f._trigger("fromSortable", d);
                        f.dropped = false
                    }
                }
            })
        }
    });
    a.ui.plugin.add("draggable", "cursor", {
        start: function(d, e) {
            var c = a("body"),
                f = a(this).data("draggable").options;
            if (c.css("cursor")) {
                f._cursor = c.css("cursor")
            }
            c.css("cursor", f.cursor)
        },
        stop: function(c, d) {
            var e = a(this).data("draggable").options;
            if (e._cursor) {
                a("body").css("cursor", e._cursor)
            }
        }
    });
    a.ui.plugin.add("draggable", "opacity", {
        start: function(d, e) {
            var c = a(e.helper),
                f = a(this).data("draggable").options;
            if (c.css("opacity")) {
                f._opacity = c.css("opacity")
            }
            c.css("opacity", f.opacity)
        },
        stop: function(c, d) {
            var e = a(this).data("draggable").options;
            if (e._opacity) {
                a(d.helper).css("opacity", e._opacity)
            }
        }
    });
    a.ui.plugin.add("draggable", "scroll", {
        start: function(d, e) {
            var c = a(this).data("draggable");
            if (c.scrollParent[0] != document && c.scrollParent[0].tagName != "HTML") {
                c.overflowOffset = c.scrollParent.offset()
            }
        },
        drag: function(e, f) {
            var d = a(this).data("draggable"),
                g = d.options,
                c = false;
            if (d.scrollParent[0] != document && d.scrollParent[0].tagName != "HTML") {
                if (!g.axis || g.axis != "x") {
                    if ((d.overflowOffset.top + d.scrollParent[0].offsetHeight) - e.pageY < g.scrollSensitivity) {
                        d.scrollParent[0].scrollTop = c = d.scrollParent[0].scrollTop + g.scrollSpeed
                    } else {
                        if (e.pageY - d.overflowOffset.top < g.scrollSensitivity) {
                            d.scrollParent[0].scrollTop = c = d.scrollParent[0].scrollTop - g.scrollSpeed
                        }
                    }
                }
                if (!g.axis || g.axis != "y") {
                    if ((d.overflowOffset.left + d.scrollParent[0].offsetWidth) - e.pageX < g.scrollSensitivity) {
                        d.scrollParent[0].scrollLeft = c = d.scrollParent[0].scrollLeft + g.scrollSpeed
                    } else {
                        if (e.pageX - d.overflowOffset.left < g.scrollSensitivity) {
                            d.scrollParent[0].scrollLeft = c = d.scrollParent[0].scrollLeft - g.scrollSpeed
                        }
                    }
                }
            } else {
                if (!g.axis || g.axis != "x") {
                    if (e.pageY - a(document).scrollTop() < g.scrollSensitivity) {
                        c = a(document).scrollTop(a(document).scrollTop() - g.scrollSpeed)
                    } else {
                        if (a(window).height() - (e.pageY - a(document).scrollTop()) < g.scrollSensitivity) {
                            c = a(document).scrollTop(a(document).scrollTop() + g.scrollSpeed)
                        }
                    }
                }
                if (!g.axis || g.axis != "y") {
                    if (e.pageX - a(document).scrollLeft() < g.scrollSensitivity) {
                        c = a(document).scrollLeft(a(document).scrollLeft() - g.scrollSpeed)
                    } else {
                        if (a(window).width() - (e.pageX - a(document).scrollLeft()) < g.scrollSensitivity) {
                            c = a(document).scrollLeft(a(document).scrollLeft() + g.scrollSpeed)
                        }
                    }
                }
            }
            if (c !== false && a.ui.ddmanager && !g.dropBehaviour) {
                a.ui.ddmanager.prepareOffsets(d, e)
            }
        }
    });
    a.ui.plugin.add("draggable", "snap", {
        start: function(d, e) {
            var c = a(this).data("draggable"),
                f = c.options;
            c.snapElements = [];
            a(f.snap.constructor != String ? (f.snap.items || ":data(draggable)") : f.snap).each(function() {
                var h = a(this);
                var g = h.offset();
                if (this != c.element[0]) {
                    c.snapElements.push({
                        item: this,
                        width: h.outerWidth(),
                        height: h.outerHeight(),
                        top: g.top,
                        left: g.left
                    })
                }
            })
        },
        drag: function(u, p) {
            var g = a(this).data("draggable"),
                q = g.options;
            var y = q.snapTolerance;
            var x = p.offset.left,
                w = x + g.helperProportions.width,
                f = p.offset.top,
                e = f + g.helperProportions.height;
            for (var v = g.snapElements.length - 1; v >= 0; v--) {
                var s = g.snapElements[v].left,
                    n = s + g.snapElements[v].width,
                    m = g.snapElements[v].top,
                    A = m + g.snapElements[v].height;
                if (!((s - y < x && x < n + y && m - y < f && f < A + y) || (s - y < x && x < n + y && m - y < e && e < A + y) || (s - y < w && w < n + y && m - y < f && f < A + y) || (s - y < w && w < n + y && m - y < e && e < A + y))) {
                    if (g.snapElements[v].snapping) {
                        (g.options.snap.release && g.options.snap.release.call(g.element, u, a.extend(g._uiHash(), {
                            snapItem: g.snapElements[v].item
                        })))
                    }
                    g.snapElements[v].snapping = false;
                    continue
                }
                if (q.snapMode != "inner") {
                    var c = Math.abs(m - e) <= y;
                    var z = Math.abs(A - f) <= y;
                    var j = Math.abs(s - w) <= y;
                    var k = Math.abs(n - x) <= y;
                    if (c) {
                        p.position.top = g._convertPositionTo("relative", {
                            top: m - g.helperProportions.height,
                            left: 0
                        }).top - g.margins.top
                    }
                    if (z) {
                        p.position.top = g._convertPositionTo("relative", {
                            top: A,
                            left: 0
                        }).top - g.margins.top
                    }
                    if (j) {
                        p.position.left = g._convertPositionTo("relative", {
                            top: 0,
                            left: s - g.helperProportions.width
                        }).left - g.margins.left
                    }
                    if (k) {
                        p.position.left = g._convertPositionTo("relative", {
                            top: 0,
                            left: n
                        }).left - g.margins.left
                    }
                }
                var h = (c || z || j || k);
                if (q.snapMode != "outer") {
                    var c = Math.abs(m - f) <= y;
                    var z = Math.abs(A - e) <= y;
                    var j = Math.abs(s - x) <= y;
                    var k = Math.abs(n - w) <= y;
                    if (c) {
                        p.position.top = g._convertPositionTo("relative", {
                            top: m,
                            left: 0
                        }).top - g.margins.top
                    }
                    if (z) {
                        p.position.top = g._convertPositionTo("relative", {
                            top: A - g.helperProportions.height,
                            left: 0
                        }).top - g.margins.top
                    }
                    if (j) {
                        p.position.left = g._convertPositionTo("relative", {
                            top: 0,
                            left: s
                        }).left - g.margins.left
                    }
                    if (k) {
                        p.position.left = g._convertPositionTo("relative", {
                            top: 0,
                            left: n - g.helperProportions.width
                        }).left - g.margins.left
                    }
                }
                if (!g.snapElements[v].snapping && (c || z || j || k || h)) {
                    (g.options.snap.snap && g.options.snap.snap.call(g.element, u, a.extend(g._uiHash(), {
                        snapItem: g.snapElements[v].item
                    })))
                }
                g.snapElements[v].snapping = (c || z || j || k || h)
            }
        }
    });
    a.ui.plugin.add("draggable", "stack", {
        start: function(d, e) {
            var g = a(this).data("draggable").options;
            var f = a.makeArray(a(g.stack)).sort(function(i, h) {
                return (parseInt(a(i).css("zIndex"), 10) || 0) - (parseInt(a(h).css("zIndex"), 10) || 0)
            });
            if (!f.length) {
                return
            }
            var c = parseInt(f[0].style.zIndex) || 0;
            a(f).each(function(h) {
                this.style.zIndex = c + h
            });
            this[0].style.zIndex = c + f.length
        }
    });
    a.ui.plugin.add("draggable", "zIndex", {
        start: function(d, e) {
            var c = a(e.helper),
                f = a(this).data("draggable").options;
            if (c.css("zIndex")) {
                f._zIndex = c.css("zIndex")
            }
            c.css("zIndex", f.zIndex)
        },
        stop: function(c, d) {
            var e = a(this).data("draggable").options;
            if (e._zIndex) {
                a(d.helper).css("zIndex", e._zIndex)
            }
        }
    })
})(jQuery);
/*
 * jQuery UI Droppable 1.8.23
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Droppables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	jquery.ui.mouse.js
 *	jquery.ui.draggable.js
 */
(function(a, b) {
    a.widget("ui.droppable", {
        widgetEventPrefix: "drop",
        options: {
            accept: "*",
            activeClass: false,
            addClasses: true,
            greedy: false,
            hoverClass: false,
            scope: "default",
            tolerance: "intersect"
        },
        _create: function() {
            var d = this.options,
                c = d.accept;
            this.isover = 0;
            this.isout = 1;
            this.accept = a.isFunction(c) ? c : function(e) {
                return e.is(c)
            };
            this.proportions = {
                width: this.element[0].offsetWidth,
                height: this.element[0].offsetHeight
            };
            a.ui.ddmanager.droppables[d.scope] = a.ui.ddmanager.droppables[d.scope] || [];
            a.ui.ddmanager.droppables[d.scope].push(this);
            (d.addClasses && this.element.addClass("ui-droppable"))
        },
        destroy: function() {
            var c = a.ui.ddmanager.droppables[this.options.scope];
            for (var d = 0; d < c.length; d++) {
                if (c[d] == this) {
                    c.splice(d, 1)
                }
            }
            this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable");
            return this
        },
        _setOption: function(c, d) {
            if (c == "accept") {
                this.accept = a.isFunction(d) ? d : function(e) {
                    return e.is(d)
                }
            }
            a.Widget.prototype._setOption.apply(this, arguments)
        },
        _activate: function(d) {
            var c = a.ui.ddmanager.current;
            if (this.options.activeClass) {
                this.element.addClass(this.options.activeClass)
            }(c && this._trigger("activate", d, this.ui(c)))
        },
        _deactivate: function(d) {
            var c = a.ui.ddmanager.current;
            if (this.options.activeClass) {
                this.element.removeClass(this.options.activeClass)
            }(c && this._trigger("deactivate", d, this.ui(c)))
        },
        _over: function(d) {
            var c = a.ui.ddmanager.current;
            if (!c || (c.currentItem || c.element)[0] == this.element[0]) {
                return
            }
            if (this.accept.call(this.element[0], (c.currentItem || c.element))) {
                if (this.options.hoverClass) {
                    this.element.addClass(this.options.hoverClass)
                }
                this._trigger("over", d, this.ui(c))
            }
        },
        _out: function(d) {
            var c = a.ui.ddmanager.current;
            if (!c || (c.currentItem || c.element)[0] == this.element[0]) {
                return
            }
            if (this.accept.call(this.element[0], (c.currentItem || c.element))) {
                if (this.options.hoverClass) {
                    this.element.removeClass(this.options.hoverClass)
                }
                this._trigger("out", d, this.ui(c))
            }
        },
        _drop: function(d, e) {
            var c = e || a.ui.ddmanager.current;
            if (!c || (c.currentItem || c.element)[0] == this.element[0]) {
                return false
            }
            var f = false;
            this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function() {
                var g = a.data(this, "droppable");
                if (g.options.greedy && !g.options.disabled && g.options.scope == c.options.scope && g.accept.call(g.element[0], (c.currentItem || c.element)) && a.ui.intersect(c, a.extend(g, {
                        offset: g.element.offset()
                    }), g.options.tolerance)) {
                    f = true;
                    return false
                }
            });
            if (f) {
                return false
            }
            if (this.accept.call(this.element[0], (c.currentItem || c.element))) {
                if (this.options.activeClass) {
                    this.element.removeClass(this.options.activeClass)
                }
                if (this.options.hoverClass) {
                    this.element.removeClass(this.options.hoverClass)
                }
                this._trigger("drop", d, this.ui(c));
                return this.element
            }
            return false
        },
        ui: function(d) {
            return {
                draggable: (d.currentItem || d.element),
                helper: d.helper,
                position: d.position,
                offset: d.positionAbs
            }
        }
    });
    a.extend(a.ui.droppable, {
        version: "1.8.23"
    });
    a.ui.intersect = function(q, j, o) {
        if (!j.offset) {
            return false
        }
        var e = (q.positionAbs || q.position.absolute).left,
            d = e + q.helperProportions.width,
            n = (q.positionAbs || q.position.absolute).top,
            m = n + q.helperProportions.height;
        var g = j.offset.left,
            c = g + j.proportions.width,
            p = j.offset.top,
            k = p + j.proportions.height;
        switch (o) {
            case "fit":
                return (g <= e && d <= c && p <= n && m <= k);
                break;
            case "intersect":
                return (g < e + (q.helperProportions.width / 2) && d - (q.helperProportions.width / 2) < c && p < n + (q.helperProportions.height / 2) && m - (q.helperProportions.height / 2) < k);
                break;
            case "pointer":
                var h = ((q.positionAbs || q.position.absolute).left + (q.clickOffset || q.offset.click).left),
                    i = ((q.positionAbs || q.position.absolute).top + (q.clickOffset || q.offset.click).top),
                    f = a.ui.isOver(i, h, p, g, j.proportions.height, j.proportions.width);
                return f;
                break;
            case "touch":
                return ((n >= p && n <= k) || (m >= p && m <= k) || (n < p && m > k)) && ((e >= g && e <= c) || (d >= g && d <= c) || (e < g && d > c));
                break;
            default:
                return false;
                break
        }
    };
    a.ui.ddmanager = {
        current: null,
        droppables: {
            "default": []
        },
        prepareOffsets: function(f, h) {
            var c = a.ui.ddmanager.droppables[f.options.scope] || [];
            var g = h ? h.type : null;
            var k = (f.currentItem || f.element).find(":data(droppable)").andSelf();
            droppablesLoop: for (var e = 0; e < c.length; e++) {
                if (c[e].options.disabled || (f && !c[e].accept.call(c[e].element[0], (f.currentItem || f.element)))) {
                    continue
                }
                for (var d = 0; d < k.length; d++) {
                    if (k[d] == c[e].element[0]) {
                        c[e].proportions.height = 0;
                        continue droppablesLoop
                    }
                }
                c[e].visible = c[e].element.css("display") != "none";
                if (!c[e].visible) {
                    continue
                }
                if (g == "mousedown") {
                    c[e]._activate.call(c[e], h)
                }
                c[e].offset = c[e].element.offset();
                c[e].proportions = {
                    width: c[e].element[0].offsetWidth,
                    height: c[e].element[0].offsetHeight
                }
            }
        },
        drop: function(c, d) {
            var e = false;
            a.each(a.ui.ddmanager.droppables[c.options.scope] || [], function() {
                if (!this.options) {
                    return
                }
                if (!this.options.disabled && this.visible && a.ui.intersect(c, this, this.options.tolerance)) {
                    e = this._drop.call(this, d) || e
                }
                if (!this.options.disabled && this.visible && this.accept.call(this.element[0], (c.currentItem || c.element))) {
                    this.isout = 1;
                    this.isover = 0;
                    this._deactivate.call(this, d)
                }
            });
            return e
        },
        dragStart: function(c, d) {
            c.element.parents(":not(body,html)").bind("scroll.droppable", function() {
                if (!c.options.refreshPositions) {
                    a.ui.ddmanager.prepareOffsets(c, d)
                }
            })
        },
        drag: function(c, d) {
            if (c.options.refreshPositions) {
                a.ui.ddmanager.prepareOffsets(c, d)
            }
            a.each(a.ui.ddmanager.droppables[c.options.scope] || [], function() {
                if (this.options.disabled || this.greedyChild || !this.visible) {
                    return
                }
                var f = a.ui.intersect(c, this, this.options.tolerance);
                var h = !f && this.isover == 1 ? "isout" : (f && this.isover == 0 ? "isover" : null);
                if (!h) {
                    return
                }
                var g;
                if (this.options.greedy) {
                    var e = this.element.parents(":data(droppable):eq(0)");
                    if (e.length) {
                        g = a.data(e[0], "droppable");
                        g.greedyChild = (h == "isover" ? 1 : 0)
                    }
                }
                if (g && h == "isover") {
                    g.isover = 0;
                    g.isout = 1;
                    g._out.call(g, d)
                }
                this[h] = 1;
                this[h == "isout" ? "isover" : "isout"] = 0;
                this[h == "isover" ? "_over" : "_out"].call(this, d);
                if (g && h == "isout") {
                    g.isout = 0;
                    g.isover = 1;
                    g._over.call(g, d)
                }
            })
        },
        dragStop: function(c, d) {
            c.element.parents(":not(body,html)").unbind("scroll.droppable");
            if (!c.options.refreshPositions) {
                a.ui.ddmanager.prepareOffsets(c, d)
            }
        }
    }
})(jQuery);
/*
 * jQuery UI Resizable 1.8.23
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Resizables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function(c, d) {
    c.widget("ui.resizable", c.ui.mouse, {
        widgetEventPrefix: "resize",
        options: {
            alsoResize: false,
            animate: false,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: false,
            autoHide: false,
            containment: false,
            ghost: false,
            grid: false,
            handles: "e,s,se",
            helper: false,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 1000
        },
        _create: function() {
            var f = this,
                k = this.options;
            this.element.addClass("ui-resizable");
            c.extend(this, {
                _aspectRatio: !!(k.aspectRatio),
                aspectRatio: k.aspectRatio,
                originalElement: this.element,
                _proportionallyResizeElements: [],
                _helper: k.helper || k.ghost || k.animate ? k.helper || "ui-resizable-helper" : null
            });
            if (this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)) {
                this.element.wrap(c('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({
                    position: this.element.css("position"),
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight(),
                    top: this.element.css("top"),
                    left: this.element.css("left")
                }));
                this.element = this.element.parent().data("resizable", this.element.data("resizable"));
                this.elementIsWrapper = true;
                this.element.css({
                    marginLeft: this.originalElement.css("marginLeft"),
                    marginTop: this.originalElement.css("marginTop"),
                    marginRight: this.originalElement.css("marginRight"),
                    marginBottom: this.originalElement.css("marginBottom")
                });
                this.originalElement.css({
                    marginLeft: 0,
                    marginTop: 0,
                    marginRight: 0,
                    marginBottom: 0
                });
                this.originalResizeStyle = this.originalElement.css("resize");
                this.originalElement.css("resize", "none");
                this._proportionallyResizeElements.push(this.originalElement.css({
                    position: "static",
                    zoom: 1,
                    display: "block"
                }));
                this.originalElement.css({
                    margin: this.originalElement.css("margin")
                });
                this._proportionallyResize()
            }
            this.handles = k.handles || (!c(".ui-resizable-handle", this.element).length ? "e,s,se" : {
                n: ".ui-resizable-n",
                e: ".ui-resizable-e",
                s: ".ui-resizable-s",
                w: ".ui-resizable-w",
                se: ".ui-resizable-se",
                sw: ".ui-resizable-sw",
                ne: ".ui-resizable-ne",
                nw: ".ui-resizable-nw"
            });
            if (this.handles.constructor == String) {
                if (this.handles == "all") {
                    this.handles = "n,e,s,w,se,sw,ne,nw"
                }
                var l = this.handles.split(",");
                this.handles = {};
                for (var g = 0; g < l.length; g++) {
                    var j = c.trim(l[g]),
                        e = "ui-resizable-" + j;
                    var h = c('<div class="ui-resizable-handle ' + e + '"></div>');
                    h.css({
                        zIndex: k.zIndex
                    });
                    if ("se" == j) {
                        h.addClass("ui-icon ui-icon-gripsmall-diagonal-se")
                    }
                    this.handles[j] = ".ui-resizable-" + j;
                    this.element.append(h)
                }
            }
            this._renderAxis = function(q) {
                q = q || this.element;
                for (var n in this.handles) {
                    if (this.handles[n].constructor == String) {
                        this.handles[n] = c(this.handles[n], this.element).show()
                    }
                    if (this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {
                        var o = c(this.handles[n], this.element),
                            p = 0;
                        p = /sw|ne|nw|se|n|s/.test(n) ? o.outerHeight() : o.outerWidth();
                        var m = ["padding", /ne|nw|n/.test(n) ? "Top" : /se|sw|s/.test(n) ? "Bottom" : /^e$/.test(n) ? "Right" : "Left"].join("");
                        q.css(m, p);
                        this._proportionallyResize()
                    }
                    if (!c(this.handles[n]).length) {
                        continue
                    }
                }
            };
            this._renderAxis(this.element);
            this._handles = c(".ui-resizable-handle", this.element).disableSelection();
            this._handles.mouseover(function() {
                if (!f.resizing) {
                    if (this.className) {
                        var i = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)
                    }
                    f.axis = i && i[1] ? i[1] : "se"
                }
            });
            if (k.autoHide) {
                this._handles.hide();
                c(this.element).addClass("ui-resizable-autohide").hover(function() {
                    if (k.disabled) {
                        return
                    }
                    c(this).removeClass("ui-resizable-autohide");
                    f._handles.show()
                }, function() {
                    if (k.disabled) {
                        return
                    }
                    if (!f.resizing) {
                        c(this).addClass("ui-resizable-autohide");
                        f._handles.hide()
                    }
                })
            }
            this._mouseInit()
        },
        destroy: function() {
            this._mouseDestroy();
            var e = function(g) {
                c(g).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
            };
            if (this.elementIsWrapper) {
                e(this.element);
                var f = this.element;
                f.after(this.originalElement.css({
                    position: f.css("position"),
                    width: f.outerWidth(),
                    height: f.outerHeight(),
                    top: f.css("top"),
                    left: f.css("left")
                })).remove()
            }
            this.originalElement.css("resize", this.originalResizeStyle);
            e(this.originalElement);
            return this
        },
        _mouseCapture: function(f) {
            var g = false;
            for (var e in this.handles) {
                if (c(this.handles[e])[0] == f.target) {
                    g = true
                }
            }
            return !this.options.disabled && g
        },
        _mouseStart: function(g) {
            var j = this.options,
                f = this.element.position(),
                e = this.element;
            this.resizing = true;
            this.documentScroll = {
                top: c(document).scrollTop(),
                left: c(document).scrollLeft()
            };
            if (e.is(".ui-draggable") || (/absolute/).test(e.css("position"))) {
                e.css({
                    position: "absolute",
                    top: f.top,
                    left: f.left
                })
            }
            this._renderProxy();
            var k = b(this.helper.css("left")),
                h = b(this.helper.css("top"));
            if (j.containment) {
                k += c(j.containment).scrollLeft() || 0;
                h += c(j.containment).scrollTop() || 0
            }
            this.offset = this.helper.offset();
            this.position = {
                left: k,
                top: h
            };
            this.size = this._helper ? {
                width: e.outerWidth(),
                height: e.outerHeight()
            } : {
                width: e.width(),
                height: e.height()
            };
            this.originalSize = this._helper ? {
                width: e.outerWidth(),
                height: e.outerHeight()
            } : {
                width: e.width(),
                height: e.height()
            };
            this.originalPosition = {
                left: k,
                top: h
            };
            this.sizeDiff = {
                width: e.outerWidth() - e.width(),
                height: e.outerHeight() - e.height()
            };
            this.originalMousePosition = {
                left: g.pageX,
                top: g.pageY
            };
            this.aspectRatio = (typeof j.aspectRatio == "number") ? j.aspectRatio : ((this.originalSize.width / this.originalSize.height) || 1);
            var i = c(".ui-resizable-" + this.axis).css("cursor");
            c("body").css("cursor", i == "auto" ? this.axis + "-resize" : i);
            e.addClass("ui-resizable-resizing");
            this._propagate("start", g);
            return true
        },
        _mouseDrag: function(e) {
            var h = this.helper,
                g = this.options,
                m = {},
                q = this,
                j = this.originalMousePosition,
                n = this.axis;
            var r = (e.pageX - j.left) || 0,
                p = (e.pageY - j.top) || 0;
            var i = this._change[n];
            if (!i) {
                return false
            }
            var l = i.apply(this, [e, r, p]),
                k = c.browser.msie && c.browser.version < 7,
                f = this.sizeDiff;
            this._updateVirtualBoundaries(e.shiftKey);
            if (this._aspectRatio || e.shiftKey) {
                l = this._updateRatio(l, e)
            }
            l = this._respectSize(l, e);
            this._propagate("resize", e);
            h.css({
                top: this.position.top + "px",
                left: this.position.left + "px",
                width: this.size.width + "px",
                height: this.size.height + "px"
            });
            if (!this._helper && this._proportionallyResizeElements.length) {
                this._proportionallyResize()
            }
            this._updateCache(l);
            this._trigger("resize", e, this.ui());
            return false
        },
        _mouseStop: function(h) {
            this.resizing = false;
            var i = this.options,
                m = this;
            if (this._helper) {
                var g = this._proportionallyResizeElements,
                    e = g.length && (/textarea/i).test(g[0].nodeName),
                    f = e && c.ui.hasScroll(g[0], "left") ? 0 : m.sizeDiff.height,
                    k = e ? 0 : m.sizeDiff.width;
                var n = {
                        width: (m.helper.width() - k),
                        height: (m.helper.height() - f)
                    },
                    j = (parseInt(m.element.css("left"), 10) + (m.position.left - m.originalPosition.left)) || null,
                    l = (parseInt(m.element.css("top"), 10) + (m.position.top - m.originalPosition.top)) || null;
                if (!i.animate) {
                    this.element.css(c.extend(n, {
                        top: l,
                        left: j
                    }))
                }
                m.helper.height(m.size.height);
                m.helper.width(m.size.width);
                if (this._helper && !i.animate) {
                    this._proportionallyResize()
                }
            }
            c("body").css("cursor", "auto");
            this.element.removeClass("ui-resizable-resizing");
            this._propagate("stop", h);
            if (this._helper) {
                this.helper.remove()
            }
            return false
        },
        _updateVirtualBoundaries: function(g) {
            var j = this.options,
                i, h, f, k, e;
            e = {
                minWidth: a(j.minWidth) ? j.minWidth : 0,
                maxWidth: a(j.maxWidth) ? j.maxWidth : Infinity,
                minHeight: a(j.minHeight) ? j.minHeight : 0,
                maxHeight: a(j.maxHeight) ? j.maxHeight : Infinity
            };
            if (this._aspectRatio || g) {
                i = e.minHeight * this.aspectRatio;
                f = e.minWidth / this.aspectRatio;
                h = e.maxHeight * this.aspectRatio;
                k = e.maxWidth / this.aspectRatio;
                if (i > e.minWidth) {
                    e.minWidth = i
                }
                if (f > e.minHeight) {
                    e.minHeight = f
                }
                if (h < e.maxWidth) {
                    e.maxWidth = h
                }
                if (k < e.maxHeight) {
                    e.maxHeight = k
                }
            }
            this._vBoundaries = e
        },
        _updateCache: function(e) {
            var f = this.options;
            this.offset = this.helper.offset();
            if (a(e.left)) {
                this.position.left = e.left
            }
            if (a(e.top)) {
                this.position.top = e.top
            }
            if (a(e.height)) {
                this.size.height = e.height
            }
            if (a(e.width)) {
                this.size.width = e.width
            }
        },
        _updateRatio: function(h, g) {
            var i = this.options,
                j = this.position,
                f = this.size,
                e = this.axis;
            if (a(h.height)) {
                h.width = (h.height * this.aspectRatio)
            } else {
                if (a(h.width)) {
                    h.height = (h.width / this.aspectRatio)
                }
            }
            if (e == "sw") {
                h.left = j.left + (f.width - h.width);
                h.top = null
            }
            if (e == "nw") {
                h.top = j.top + (f.height - h.height);
                h.left = j.left + (f.width - h.width)
            }
            return h
        },
        _respectSize: function(l, g) {
            var j = this.helper,
                i = this._vBoundaries,
                r = this._aspectRatio || g.shiftKey,
                q = this.axis,
                t = a(l.width) && i.maxWidth && (i.maxWidth < l.width),
                m = a(l.height) && i.maxHeight && (i.maxHeight < l.height),
                h = a(l.width) && i.minWidth && (i.minWidth > l.width),
                s = a(l.height) && i.minHeight && (i.minHeight > l.height);
            if (h) {
                l.width = i.minWidth
            }
            if (s) {
                l.height = i.minHeight
            }
            if (t) {
                l.width = i.maxWidth
            }
            if (m) {
                l.height = i.maxHeight
            }
            var f = this.originalPosition.left + this.originalSize.width,
                p = this.position.top + this.size.height;
            var k = /sw|nw|w/.test(q),
                e = /nw|ne|n/.test(q);
            if (h && k) {
                l.left = f - i.minWidth
            }
            if (t && k) {
                l.left = f - i.maxWidth
            }
            if (s && e) {
                l.top = p - i.minHeight
            }
            if (m && e) {
                l.top = p - i.maxHeight
            }
            var n = !l.width && !l.height;
            if (n && !l.left && l.top) {
                l.top = null
            } else {
                if (n && !l.top && l.left) {
                    l.left = null
                }
            }
            return l
        },
        _proportionallyResize: function() {
            var k = this.options;
            if (!this._proportionallyResizeElements.length) {
                return
            }
            var g = this.helper || this.element;
            for (var f = 0; f < this._proportionallyResizeElements.length; f++) {
                var h = this._proportionallyResizeElements[f];
                if (!this.borderDif) {
                    var e = [h.css("borderTopWidth"), h.css("borderRightWidth"), h.css("borderBottomWidth"), h.css("borderLeftWidth")],
                        j = [h.css("paddingTop"), h.css("paddingRight"), h.css("paddingBottom"), h.css("paddingLeft")];
                    this.borderDif = c.map(e, function(l, n) {
                        var m = parseInt(l, 10) || 0,
                            o = parseInt(j[n], 10) || 0;
                        return m + o
                    })
                }
                if (c.browser.msie && !(!(c(g).is(":hidden") || c(g).parents(":hidden").length))) {
                    continue
                }
                h.css({
                    height: (g.height() - this.borderDif[0] - this.borderDif[2]) || 0,
                    width: (g.width() - this.borderDif[1] - this.borderDif[3]) || 0
                })
            }
        },
        _renderProxy: function() {
            var f = this.element,
                i = this.options;
            this.elementOffset = f.offset();
            if (this._helper) {
                this.helper = this.helper || c('<div style="overflow:hidden;"></div>');
                var e = c.browser.msie && c.browser.version < 7,
                    g = (e ? 1 : 0),
                    h = (e ? 2 : -1);
                this.helper.addClass(this._helper).css({
                    width: this.element.outerWidth() + h,
                    height: this.element.outerHeight() + h,
                    position: "absolute",
                    left: this.elementOffset.left - g + "px",
                    top: this.elementOffset.top - g + "px",
                    zIndex: ++i.zIndex
                });
                this.helper.appendTo("body").disableSelection()
            } else {
                this.helper = this.element
            }
        },
        _change: {
            e: function(g, f, e) {
                return {
                    width: this.originalSize.width + f
                }
            },
            w: function(h, f, e) {
                var j = this.options,
                    g = this.originalSize,
                    i = this.originalPosition;
                return {
                    left: i.left + f,
                    width: g.width - f
                }
            },
            n: function(h, f, e) {
                var j = this.options,
                    g = this.originalSize,
                    i = this.originalPosition;
                return {
                    top: i.top + e,
                    height: g.height - e
                }
            },
            s: function(g, f, e) {
                return {
                    height: this.originalSize.height + e
                }
            },
            se: function(g, f, e) {
                return c.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [g, f, e]))
            },
            sw: function(g, f, e) {
                return c.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [g, f, e]))
            },
            ne: function(g, f, e) {
                return c.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [g, f, e]))
            },
            nw: function(g, f, e) {
                return c.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [g, f, e]))
            }
        },
        _propagate: function(f, e) {
            c.ui.plugin.call(this, f, [e, this.ui()]);
            (f != "resize" && this._trigger(f, e, this.ui()))
        },
        plugins: {},
        ui: function() {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition
            }
        }
    });
    c.extend(c.ui.resizable, {
        version: "1.8.23"
    });
    c.ui.plugin.add("resizable", "alsoResize", {
        start: function(f, g) {
            var e = c(this).data("resizable"),
                i = e.options;
            var h = function(j) {
                c(j).each(function() {
                    var k = c(this);
                    k.data("resizable-alsoresize", {
                        width: parseInt(k.width(), 10),
                        height: parseInt(k.height(), 10),
                        left: parseInt(k.css("left"), 10),
                        top: parseInt(k.css("top"), 10)
                    })
                })
            };
            if (typeof(i.alsoResize) == "object" && !i.alsoResize.parentNode) {
                if (i.alsoResize.length) {
                    i.alsoResize = i.alsoResize[0];
                    h(i.alsoResize)
                } else {
                    c.each(i.alsoResize, function(j) {
                        h(j)
                    })
                }
            } else {
                h(i.alsoResize)
            }
        },
        resize: function(g, i) {
            var f = c(this).data("resizable"),
                j = f.options,
                h = f.originalSize,
                l = f.originalPosition;
            var k = {
                    height: (f.size.height - h.height) || 0,
                    width: (f.size.width - h.width) || 0,
                    top: (f.position.top - l.top) || 0,
                    left: (f.position.left - l.left) || 0
                },
                e = function(m, n) {
                    c(m).each(function() {
                        var q = c(this),
                            r = c(this).data("resizable-alsoresize"),
                            p = {},
                            o = n && n.length ? n : q.parents(i.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                        c.each(o, function(s, u) {
                            var t = (r[u] || 0) + (k[u] || 0);
                            if (t && t >= 0) {
                                p[u] = t || null
                            }
                        });
                        q.css(p)
                    })
                };
            if (typeof(j.alsoResize) == "object" && !j.alsoResize.nodeType) {
                c.each(j.alsoResize, function(m, n) {
                    e(m, n)
                })
            } else {
                e(j.alsoResize)
            }
        },
        stop: function(e, f) {
            c(this).removeData("resizable-alsoresize")
        }
    });
    c.ui.plugin.add("resizable", "animate", {
        stop: function(i, n) {
            var p = c(this).data("resizable"),
                j = p.options;
            var h = p._proportionallyResizeElements,
                e = h.length && (/textarea/i).test(h[0].nodeName),
                f = e && c.ui.hasScroll(h[0], "left") ? 0 : p.sizeDiff.height,
                l = e ? 0 : p.sizeDiff.width;
            var g = {
                    width: (p.size.width - l),
                    height: (p.size.height - f)
                },
                k = (parseInt(p.element.css("left"), 10) + (p.position.left - p.originalPosition.left)) || null,
                m = (parseInt(p.element.css("top"), 10) + (p.position.top - p.originalPosition.top)) || null;
            p.element.animate(c.extend(g, m && k ? {
                top: m,
                left: k
            } : {}), {
                duration: j.animateDuration,
                easing: j.animateEasing,
                step: function() {
                    var o = {
                        width: parseInt(p.element.css("width"), 10),
                        height: parseInt(p.element.css("height"), 10),
                        top: parseInt(p.element.css("top"), 10),
                        left: parseInt(p.element.css("left"), 10)
                    };
                    if (h && h.length) {
                        c(h[0]).css({
                            width: o.width,
                            height: o.height
                        })
                    }
                    p._updateCache(o);
                    p._propagate("resize", i)
                }
            })
        }
    });
    c.ui.plugin.add("resizable", "containment", {
        start: function(f, r) {
            var t = c(this).data("resizable"),
                j = t.options,
                l = t.element;
            var g = j.containment,
                k = (g instanceof c) ? g.get(0) : (/parent/.test(g)) ? l.parent().get(0) : g;
            if (!k) {
                return
            }
            t.containerElement = c(k);
            if (/document/.test(g) || g == document) {
                t.containerOffset = {
                    left: 0,
                    top: 0
                };
                t.containerPosition = {
                    left: 0,
                    top: 0
                };
                t.parentData = {
                    element: c(document),
                    left: 0,
                    top: 0,
                    width: c(document).width(),
                    height: c(document).height() || document.body.parentNode.scrollHeight
                }
            } else {
                var n = c(k),
                    i = [];
                c(["Top", "Right", "Left", "Bottom"]).each(function(p, o) {
                    i[p] = b(n.css("padding" + o))
                });
                t.containerOffset = n.offset();
                t.containerPosition = n.position();
                t.containerSize = {
                    height: (n.innerHeight() - i[3]),
                    width: (n.innerWidth() - i[1])
                };
                var q = t.containerOffset,
                    e = t.containerSize.height,
                    m = t.containerSize.width,
                    h = (c.ui.hasScroll(k, "left") ? k.scrollWidth : m),
                    s = (c.ui.hasScroll(k) ? k.scrollHeight : e);
                t.parentData = {
                    element: k,
                    left: q.left,
                    top: q.top,
                    width: h,
                    height: s
                }
            }
        },
        resize: function(g, q) {
            var t = c(this).data("resizable"),
                i = t.options,
                f = t.containerSize,
                p = t.containerOffset,
                m = t.size,
                n = t.position,
                r = t._aspectRatio || g.shiftKey,
                e = {
                    top: 0,
                    left: 0
                },
                h = t.containerElement;
            if (h[0] != document && (/static/).test(h.css("position"))) {
                e = p
            }
            if (n.left < (t._helper ? p.left : 0)) {
                t.size.width = t.size.width + (t._helper ? (t.position.left - p.left) : (t.position.left - e.left));
                if (r) {
                    t.size.height = t.size.width / t.aspectRatio
                }
                t.position.left = i.helper ? p.left : 0
            }
            if (n.top < (t._helper ? p.top : 0)) {
                t.size.height = t.size.height + (t._helper ? (t.position.top - p.top) : t.position.top);
                if (r) {
                    t.size.width = t.size.height * t.aspectRatio
                }
                t.position.top = t._helper ? p.top : 0
            }
            t.offset.left = t.parentData.left + t.position.left;
            t.offset.top = t.parentData.top + t.position.top;
            var l = Math.abs((t._helper ? t.offset.left - e.left : (t.offset.left - e.left)) + t.sizeDiff.width),
                s = Math.abs((t._helper ? t.offset.top - e.top : (t.offset.top - p.top)) + t.sizeDiff.height);
            var k = t.containerElement.get(0) == t.element.parent().get(0),
                j = /relative|absolute/.test(t.containerElement.css("position"));
            if (k && j) {
                l -= t.parentData.left
            }
            if (l + t.size.width >= t.parentData.width) {
                t.size.width = t.parentData.width - l;
                if (r) {
                    t.size.height = t.size.width / t.aspectRatio
                }
            }
            if (s + t.size.height >= t.parentData.height) {
                t.size.height = t.parentData.height - s;
                if (r) {
                    t.size.width = t.size.height * t.aspectRatio
                }
            }
        },
        stop: function(f, n) {
            var q = c(this).data("resizable"),
                g = q.options,
                l = q.position,
                m = q.containerOffset,
                e = q.containerPosition,
                i = q.containerElement;
            var j = c(q.helper),
                r = j.offset(),
                p = j.outerWidth() - q.sizeDiff.width,
                k = j.outerHeight() - q.sizeDiff.height;
            if (q._helper && !g.animate && (/relative/).test(i.css("position"))) {
                c(this).css({
                    left: r.left - e.left - m.left,
                    width: p,
                    height: k
                })
            }
            if (q._helper && !g.animate && (/static/).test(i.css("position"))) {
                c(this).css({
                    left: r.left - e.left - m.left,
                    width: p,
                    height: k
                })
            }
        }
    });
    c.ui.plugin.add("resizable", "ghost", {
        start: function(g, h) {
            var e = c(this).data("resizable"),
                i = e.options,
                f = e.size;
            e.ghost = e.originalElement.clone();
            e.ghost.css({
                opacity: 0.25,
                display: "block",
                position: "relative",
                height: f.height,
                width: f.width,
                margin: 0,
                left: 0,
                top: 0
            }).addClass("ui-resizable-ghost").addClass(typeof i.ghost == "string" ? i.ghost : "");
            e.ghost.appendTo(e.helper)
        },
        resize: function(f, g) {
            var e = c(this).data("resizable"),
                h = e.options;
            if (e.ghost) {
                e.ghost.css({
                    position: "relative",
                    height: e.size.height,
                    width: e.size.width
                })
            }
        },
        stop: function(f, g) {
            var e = c(this).data("resizable"),
                h = e.options;
            if (e.ghost && e.helper) {
                e.helper.get(0).removeChild(e.ghost.get(0))
            }
        }
    });
    c.ui.plugin.add("resizable", "grid", {
        resize: function(e, m) {
            var p = c(this).data("resizable"),
                h = p.options,
                k = p.size,
                i = p.originalSize,
                j = p.originalPosition,
                n = p.axis,
                l = h._aspectRatio || e.shiftKey;
            h.grid = typeof h.grid == "number" ? [h.grid, h.grid] : h.grid;
            var g = Math.round((k.width - i.width) / (h.grid[0] || 1)) * (h.grid[0] || 1),
                f = Math.round((k.height - i.height) / (h.grid[1] || 1)) * (h.grid[1] || 1);
            if (/^(se|s|e)$/.test(n)) {
                p.size.width = i.width + g;
                p.size.height = i.height + f
            } else {
                if (/^(ne)$/.test(n)) {
                    p.size.width = i.width + g;
                    p.size.height = i.height + f;
                    p.position.top = j.top - f
                } else {
                    if (/^(sw)$/.test(n)) {
                        p.size.width = i.width + g;
                        p.size.height = i.height + f;
                        p.position.left = j.left - g
                    } else {
                        p.size.width = i.width + g;
                        p.size.height = i.height + f;
                        p.position.top = j.top - f;
                        p.position.left = j.left - g
                    }
                }
            }
        }
    });
    var b = function(e) {
        return parseInt(e, 10) || 0
    };
    var a = function(e) {
        return !isNaN(parseInt(e, 10))
    }
})(jQuery);
/*
 * jQuery UI Selectable 1.8.23
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Selectables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function(a, b) {
    a.widget("ui.selectable", a.ui.mouse, {
        options: {
            appendTo: "body",
            autoRefresh: true,
            distance: 0,
            filter: "*",
            tolerance: "touch"
        },
        _create: function() {
            var c = this;
            this.element.addClass("ui-selectable");
            this.dragged = false;
            var d;
            this.refresh = function() {
                d = a(c.options.filter, c.element[0]);
                d.addClass("ui-selectee");
                d.each(function() {
                    var e = a(this);
                    var f = e.offset();
                    a.data(this, "selectable-item", {
                        element: this,
                        $element: e,
                        left: f.left,
                        top: f.top,
                        right: f.left + e.outerWidth(),
                        bottom: f.top + e.outerHeight(),
                        startselected: false,
                        selected: e.hasClass("ui-selected"),
                        selecting: e.hasClass("ui-selecting"),
                        unselecting: e.hasClass("ui-unselecting")
                    })
                })
            };
            this.refresh();
            this.selectees = d.addClass("ui-selectee");
            this._mouseInit();
            this.helper = a("<div class='ui-selectable-helper'></div>")
        },
        destroy: function() {
            this.selectees.removeClass("ui-selectee").removeData("selectable-item");
            this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable");
            this._mouseDestroy();
            return this
        },
        _mouseStart: function(e) {
            var c = this;
            this.opos = [e.pageX, e.pageY];
            if (this.options.disabled) {
                return
            }
            var d = this.options;
            this.selectees = a(d.filter, this.element[0]);
            this._trigger("start", e);
            a(d.appendTo).append(this.helper);
            this.helper.css({
                left: e.clientX,
                top: e.clientY,
                width: 0,
                height: 0
            });
            if (d.autoRefresh) {
                this.refresh()
            }
            this.selectees.filter(".ui-selected").each(function() {
                var f = a.data(this, "selectable-item");
                f.startselected = true;
                if (!e.metaKey && !e.ctrlKey) {
                    f.$element.removeClass("ui-selected");
                    f.selected = false;
                    f.$element.addClass("ui-unselecting");
                    f.unselecting = true;
                    c._trigger("unselecting", e, {
                        unselecting: f.element
                    })
                }
            });
            a(e.target).parents().andSelf().each(function() {
                var g = a.data(this, "selectable-item");
                if (g) {
                    var f = (!e.metaKey && !e.ctrlKey) || !g.$element.hasClass("ui-selected");
                    g.$element.removeClass(f ? "ui-unselecting" : "ui-selected").addClass(f ? "ui-selecting" : "ui-unselecting");
                    g.unselecting = !f;
                    g.selecting = f;
                    g.selected = f;
                    if (f) {
                        c._trigger("selecting", e, {
                            selecting: g.element
                        })
                    } else {
                        c._trigger("unselecting", e, {
                            unselecting: g.element
                        })
                    }
                    return false
                }
            })
        },
        _mouseDrag: function(j) {
            var d = this;
            this.dragged = true;
            if (this.options.disabled) {
                return
            }
            var f = this.options;
            var e = this.opos[0],
                i = this.opos[1],
                c = j.pageX,
                h = j.pageY;
            if (e > c) {
                var g = c;
                c = e;
                e = g
            }
            if (i > h) {
                var g = h;
                h = i;
                i = g
            }
            this.helper.css({
                left: e,
                top: i,
                width: c - e,
                height: h - i
            });
            this.selectees.each(function() {
                var k = a.data(this, "selectable-item");
                if (!k || k.element == d.element[0]) {
                    return
                }
                var l = false;
                if (f.tolerance == "touch") {
                    l = (!(k.left > c || k.right < e || k.top > h || k.bottom < i))
                } else {
                    if (f.tolerance == "fit") {
                        l = (k.left > e && k.right < c && k.top > i && k.bottom < h)
                    }
                }
                if (l) {
                    if (k.selected) {
                        k.$element.removeClass("ui-selected");
                        k.selected = false
                    }
                    if (k.unselecting) {
                        k.$element.removeClass("ui-unselecting");
                        k.unselecting = false
                    }
                    if (!k.selecting) {
                        k.$element.addClass("ui-selecting");
                        k.selecting = true;
                        d._trigger("selecting", j, {
                            selecting: k.element
                        })
                    }
                } else {
                    if (k.selecting) {
                        if ((j.metaKey || j.ctrlKey) && k.startselected) {
                            k.$element.removeClass("ui-selecting");
                            k.selecting = false;
                            k.$element.addClass("ui-selected");
                            k.selected = true
                        } else {
                            k.$element.removeClass("ui-selecting");
                            k.selecting = false;
                            if (k.startselected) {
                                k.$element.addClass("ui-unselecting");
                                k.unselecting = true
                            }
                            d._trigger("unselecting", j, {
                                unselecting: k.element
                            })
                        }
                    }
                    if (k.selected) {
                        if (!j.metaKey && !j.ctrlKey && !k.startselected) {
                            k.$element.removeClass("ui-selected");
                            k.selected = false;
                            k.$element.addClass("ui-unselecting");
                            k.unselecting = true;
                            d._trigger("unselecting", j, {
                                unselecting: k.element
                            })
                        }
                    }
                }
            });
            return false
        },
        _mouseStop: function(e) {
            var c = this;
            this.dragged = false;
            var d = this.options;
            a(".ui-unselecting", this.element[0]).each(function() {
                var f = a.data(this, "selectable-item");
                f.$element.removeClass("ui-unselecting");
                f.unselecting = false;
                f.startselected = false;
                c._trigger("unselected", e, {
                    unselected: f.element
                })
            });
            a(".ui-selecting", this.element[0]).each(function() {
                var f = a.data(this, "selectable-item");
                f.$element.removeClass("ui-selecting").addClass("ui-selected");
                f.selecting = false;
                f.selected = true;
                f.startselected = true;
                c._trigger("selected", e, {
                    selected: f.element
                })
            });
            this._trigger("stop", e);
            this.helper.remove();
            return false
        }
    });
    a.extend(a.ui.selectable, {
        version: "1.8.23"
    })
})(jQuery);
/*
 * jQuery UI Sortable 1.8.23
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Sortables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function(a, b) {
    a.widget("ui.sortable", a.ui.mouse, {
        widgetEventPrefix: "sort",
        ready: false,
        options: {
            appendTo: "parent",
            axis: false,
            connectWith: false,
            containment: false,
            cursor: "auto",
            cursorAt: false,
            dropOnEmpty: true,
            forcePlaceholderSize: false,
            forceHelperSize: false,
            grid: false,
            handle: false,
            helper: "original",
            items: "> *",
            opacity: false,
            placeholder: false,
            revert: false,
            scroll: true,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1000
        },
        _create: function() {
            var c = this.options;
            this.containerCache = {};
            this.element.addClass("ui-sortable");
            this.refresh();
            this.floating = this.items.length ? c.axis === "x" || (/left|right/).test(this.items[0].item.css("float")) || (/inline|table-cell/).test(this.items[0].item.css("display")) : false;
            this.offset = this.element.offset();
            this._mouseInit();
            this.ready = true
        },
        destroy: function() {
            a.Widget.prototype.destroy.call(this);
            this.element.removeClass("ui-sortable ui-sortable-disabled");
            this._mouseDestroy();
            for (var c = this.items.length - 1; c >= 0; c--) {
                this.items[c].item.removeData(this.widgetName + "-item")
            }
            return this
        },
        _setOption: function(c, d) {
            if (c === "disabled") {
                this.options[c] = d;
                this.widget()[d ? "addClass" : "removeClass"]("ui-sortable-disabled")
            } else {
                a.Widget.prototype._setOption.apply(this, arguments)
            }
        },
        _mouseCapture: function(g, h) {
            var f = this;
            if (this.reverting) {
                return false
            }
            if (this.options.disabled || this.options.type == "static") {
                return false
            }
            this._refreshItems(g);
            var e = null,
                d = this,
                c = a(g.target).parents().each(function() {
                    if (a.data(this, f.widgetName + "-item") == d) {
                        e = a(this);
                        return false
                    }
                });
            if (a.data(g.target, f.widgetName + "-item") == d) {
                e = a(g.target)
            }
            if (!e) {
                return false
            }
            if (this.options.handle && !h) {
                var i = false;
                a(this.options.handle, e).find("*").andSelf().each(function() {
                    if (this == g.target) {
                        i = true
                    }
                });
                if (!i) {
                    return false
                }
            }
            this.currentItem = e;
            this._removeCurrentsFromItems();
            return true
        },
        _mouseStart: function(f, g, c) {
            var h = this.options,
                d = this;
            this.currentContainer = this;
            this.refreshPositions();
            this.helper = this._createHelper(f);
            this._cacheHelperProportions();
            this._cacheMargins();
            this.scrollParent = this.helper.scrollParent();
            this.offset = this.currentItem.offset();
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            };
            a.extend(this.offset, {
                click: {
                    left: f.pageX - this.offset.left,
                    top: f.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            });
            this.helper.css("position", "absolute");
            this.cssPosition = this.helper.css("position");
            this.originalPosition = this._generatePosition(f);
            this.originalPageX = f.pageX;
            this.originalPageY = f.pageY;
            (h.cursorAt && this._adjustOffsetFromHelper(h.cursorAt));
            this.domPosition = {
                prev: this.currentItem.prev()[0],
                parent: this.currentItem.parent()[0]
            };
            if (this.helper[0] != this.currentItem[0]) {
                this.currentItem.hide()
            }
            this._createPlaceholder();
            if (h.containment) {
                this._setContainment()
            }
            if (h.cursor) {
                if (a("body").css("cursor")) {
                    this._storedCursor = a("body").css("cursor")
                }
                a("body").css("cursor", h.cursor)
            }
            if (h.opacity) {
                if (this.helper.css("opacity")) {
                    this._storedOpacity = this.helper.css("opacity")
                }
                this.helper.css("opacity", h.opacity)
            }
            if (h.zIndex) {
                if (this.helper.css("zIndex")) {
                    this._storedZIndex = this.helper.css("zIndex")
                }
                this.helper.css("zIndex", h.zIndex)
            }
            if (this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML") {
                this.overflowOffset = this.scrollParent.offset()
            }
            this._trigger("start", f, this._uiHash());
            if (!this._preserveHelperProportions) {
                this._cacheHelperProportions()
            }
            if (!c) {
                for (var e = this.containers.length - 1; e >= 0; e--) {
                    this.containers[e]._trigger("activate", f, d._uiHash(this))
                }
            }
            if (a.ui.ddmanager) {
                a.ui.ddmanager.current = this
            }
            if (a.ui.ddmanager && !h.dropBehaviour) {
                a.ui.ddmanager.prepareOffsets(this, f)
            }
            this.dragging = true;
            this.helper.addClass("ui-sortable-helper");
            this._mouseDrag(f);
            return true
        },
        _mouseDrag: function(g) {
            this.position = this._generatePosition(g);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.lastPositionAbs) {
                this.lastPositionAbs = this.positionAbs
            }
            if (this.options.scroll) {
                var h = this.options,
                    c = false;
                if (this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML") {
                    if ((this.overflowOffset.top + this.scrollParent[0].offsetHeight) - g.pageY < h.scrollSensitivity) {
                        this.scrollParent[0].scrollTop = c = this.scrollParent[0].scrollTop + h.scrollSpeed
                    } else {
                        if (g.pageY - this.overflowOffset.top < h.scrollSensitivity) {
                            this.scrollParent[0].scrollTop = c = this.scrollParent[0].scrollTop - h.scrollSpeed
                        }
                    }
                    if ((this.overflowOffset.left + this.scrollParent[0].offsetWidth) - g.pageX < h.scrollSensitivity) {
                        this.scrollParent[0].scrollLeft = c = this.scrollParent[0].scrollLeft + h.scrollSpeed
                    } else {
                        if (g.pageX - this.overflowOffset.left < h.scrollSensitivity) {
                            this.scrollParent[0].scrollLeft = c = this.scrollParent[0].scrollLeft - h.scrollSpeed
                        }
                    }
                } else {
                    if (g.pageY - a(document).scrollTop() < h.scrollSensitivity) {
                        c = a(document).scrollTop(a(document).scrollTop() - h.scrollSpeed)
                    } else {
                        if (a(window).height() - (g.pageY - a(document).scrollTop()) < h.scrollSensitivity) {
                            c = a(document).scrollTop(a(document).scrollTop() + h.scrollSpeed)
                        }
                    }
                    if (g.pageX - a(document).scrollLeft() < h.scrollSensitivity) {
                        c = a(document).scrollLeft(a(document).scrollLeft() - h.scrollSpeed)
                    } else {
                        if (a(window).width() - (g.pageX - a(document).scrollLeft()) < h.scrollSensitivity) {
                            c = a(document).scrollLeft(a(document).scrollLeft() + h.scrollSpeed)
                        }
                    }
                }
                if (c !== false && a.ui.ddmanager && !h.dropBehaviour) {
                    a.ui.ddmanager.prepareOffsets(this, g)
                }
            }
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.options.axis || this.options.axis != "y") {
                this.helper[0].style.left = this.position.left + "px"
            }
            if (!this.options.axis || this.options.axis != "x") {
                this.helper[0].style.top = this.position.top + "px"
            }
            for (var e = this.items.length - 1; e >= 0; e--) {
                var f = this.items[e],
                    d = f.item[0],
                    j = this._intersectsWithPointer(f);
                if (!j) {
                    continue
                }
                if (d != this.currentItem[0] && this.placeholder[j == 1 ? "next" : "prev"]()[0] != d && !a.ui.contains(this.placeholder[0], d) && (this.options.type == "semi-dynamic" ? !a.ui.contains(this.element[0], d) : true)) {
                    this.direction = j == 1 ? "down" : "up";
                    if (this.options.tolerance == "pointer" || this._intersectsWithSides(f)) {
                        this._rearrange(g, f)
                    } else {
                        break
                    }
                    this._trigger("change", g, this._uiHash());
                    break
                }
            }
            this._contactContainers(g);
            if (a.ui.ddmanager) {
                a.ui.ddmanager.drag(this, g)
            }
            this._trigger("sort", g, this._uiHash());
            this.lastPositionAbs = this.positionAbs;
            return false
        },
        _mouseStop: function(d, e) {
            if (!d) {
                return
            }
            if (a.ui.ddmanager && !this.options.dropBehaviour) {
                a.ui.ddmanager.drop(this, d)
            }
            if (this.options.revert) {
                var c = this;
                var f = c.placeholder.offset();
                c.reverting = true;
                a(this.helper).animate({
                    left: f.left - this.offset.parent.left - c.margins.left + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft),
                    top: f.top - this.offset.parent.top - c.margins.top + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollTop)
                }, parseInt(this.options.revert, 10) || 500, function() {
                    c._clear(d)
                })
            } else {
                this._clear(d, e)
            }
            return false
        },
        cancel: function() {
            var c = this;
            if (this.dragging) {
                this._mouseUp({
                    target: null
                });
                if (this.options.helper == "original") {
                    this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
                } else {
                    this.currentItem.show()
                }
                for (var d = this.containers.length - 1; d >= 0; d--) {
                    this.containers[d]._trigger("deactivate", null, c._uiHash(this));
                    if (this.containers[d].containerCache.over) {
                        this.containers[d]._trigger("out", null, c._uiHash(this));
                        this.containers[d].containerCache.over = 0
                    }
                }
            }
            if (this.placeholder) {
                if (this.placeholder[0].parentNode) {
                    this.placeholder[0].parentNode.removeChild(this.placeholder[0])
                }
                if (this.options.helper != "original" && this.helper && this.helper[0].parentNode) {
                    this.helper.remove()
                }
                a.extend(this, {
                    helper: null,
                    dragging: false,
                    reverting: false,
                    _noFinalSort: null
                });
                if (this.domPosition.prev) {
                    a(this.domPosition.prev).after(this.currentItem)
                } else {
                    a(this.domPosition.parent).prepend(this.currentItem)
                }
            }
            return this
        },
        serialize: function(e) {
            var c = this._getItemsAsjQuery(e && e.connected);
            var d = [];
            e = e || {};
            a(c).each(function() {
                var f = (a(e.item || this).attr(e.attribute || "id") || "").match(e.expression || (/(.+)[-=_](.+)/));
                if (f) {
                    d.push((e.key || f[1] + "[]") + "=" + (e.key && e.expression ? f[1] : f[2]))
                }
            });
            if (!d.length && e.key) {
                d.push(e.key + "=")
            }
            return d.join("&")
        },
        toArray: function(e) {
            var c = this._getItemsAsjQuery(e && e.connected);
            var d = [];
            e = e || {};
            c.each(function() {
                d.push(a(e.item || this).attr(e.attribute || "id") || "")
            });
            return d
        },
        _intersectsWith: function(m) {
            var e = this.positionAbs.left,
                d = e + this.helperProportions.width,
                k = this.positionAbs.top,
                j = k + this.helperProportions.height;
            var f = m.left,
                c = f + m.width,
                n = m.top,
                i = n + m.height;
            var o = this.offset.click.top,
                h = this.offset.click.left;
            var g = (k + o) > n && (k + o) < i && (e + h) > f && (e + h) < c;
            if (this.options.tolerance == "pointer" || this.options.forcePointerForContainers || (this.options.tolerance != "pointer" && this.helperProportions[this.floating ? "width" : "height"] > m[this.floating ? "width" : "height"])) {
                return g
            } else {
                return (f < e + (this.helperProportions.width / 2) && d - (this.helperProportions.width / 2) < c && n < k + (this.helperProportions.height / 2) && j - (this.helperProportions.height / 2) < i)
            }
        },
        _intersectsWithPointer: function(e) {
            var f = (this.options.axis === "x") || a.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, e.top, e.height),
                d = (this.options.axis === "y") || a.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, e.left, e.width),
                h = f && d,
                c = this._getDragVerticalDirection(),
                g = this._getDragHorizontalDirection();
            if (!h) {
                return false
            }
            return this.floating ? (((g && g == "right") || c == "down") ? 2 : 1) : (c && (c == "down" ? 2 : 1))
        },
        _intersectsWithSides: function(f) {
            var d = a.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, f.top + (f.height / 2), f.height),
                e = a.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, f.left + (f.width / 2), f.width),
                c = this._getDragVerticalDirection(),
                g = this._getDragHorizontalDirection();
            if (this.floating && g) {
                return ((g == "right" && e) || (g == "left" && !e))
            } else {
                return c && ((c == "down" && d) || (c == "up" && !d))
            }
        },
        _getDragVerticalDirection: function() {
            var c = this.positionAbs.top - this.lastPositionAbs.top;
            return c != 0 && (c > 0 ? "down" : "up")
        },
        _getDragHorizontalDirection: function() {
            var c = this.positionAbs.left - this.lastPositionAbs.left;
            return c != 0 && (c > 0 ? "right" : "left")
        },
        refresh: function(c) {
            this._refreshItems(c);
            this.refreshPositions();
            return this
        },
        _connectWith: function() {
            var c = this.options;
            return c.connectWith.constructor == String ? [c.connectWith] : c.connectWith
        },
        _getItemsAsjQuery: function(c) {
            var m = this;
            var h = [];
            var f = [];
            var k = this._connectWith();
            if (k && c) {
                for (var e = k.length - 1; e >= 0; e--) {
                    var l = a(k[e]);
                    for (var d = l.length - 1; d >= 0; d--) {
                        var g = a.data(l[d], this.widgetName);
                        if (g && g != this && !g.options.disabled) {
                            f.push([a.isFunction(g.options.items) ? g.options.items.call(g.element) : a(g.options.items, g.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), g])
                        }
                    }
                }
            }
            f.push([a.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                options: this.options,
                item: this.currentItem
            }) : a(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);
            for (var e = f.length - 1; e >= 0; e--) {
                f[e][0].each(function() {
                    h.push(this)
                })
            }
            return a(h)
        },
        _removeCurrentsFromItems: function() {
            var e = this.currentItem.find(":data(" + this.widgetName + "-item)");
            for (var d = 0; d < this.items.length; d++) {
                for (var c = 0; c < e.length; c++) {
                    if (e[c] == this.items[d].item[0]) {
                        this.items.splice(d, 1)
                    }
                }
            }
        },
        _refreshItems: function(c) {
            this.items = [];
            this.containers = [this];
            var k = this.items;
            var q = this;
            var g = [
                [a.isFunction(this.options.items) ? this.options.items.call(this.element[0], c, {
                    item: this.currentItem
                }) : a(this.options.items, this.element), this]
            ];
            var m = this._connectWith();
            if (m && this.ready) {
                for (var f = m.length - 1; f >= 0; f--) {
                    var n = a(m[f]);
                    for (var e = n.length - 1; e >= 0; e--) {
                        var h = a.data(n[e], this.widgetName);
                        if (h && h != this && !h.options.disabled) {
                            g.push([a.isFunction(h.options.items) ? h.options.items.call(h.element[0], c, {
                                item: this.currentItem
                            }) : a(h.options.items, h.element), h]);
                            this.containers.push(h)
                        }
                    }
                }
            }
            for (var f = g.length - 1; f >= 0; f--) {
                var l = g[f][1];
                var d = g[f][0];
                for (var e = 0, o = d.length; e < o; e++) {
                    var p = a(d[e]);
                    p.data(this.widgetName + "-item", l);
                    k.push({
                        item: p,
                        instance: l,
                        width: 0,
                        height: 0,
                        left: 0,
                        top: 0
                    })
                }
            }
        },
        refreshPositions: function(c) {
            if (this.offsetParent && this.helper) {
                this.offset.parent = this._getParentOffset()
            }
            for (var e = this.items.length - 1; e >= 0; e--) {
                var f = this.items[e];
                if (f.instance != this.currentContainer && this.currentContainer && f.item[0] != this.currentItem[0]) {
                    continue
                }
                var d = this.options.toleranceElement ? a(this.options.toleranceElement, f.item) : f.item;
                if (!c) {
                    f.width = d.outerWidth();
                    f.height = d.outerHeight()
                }
                var g = d.offset();
                f.left = g.left;
                f.top = g.top
            }
            if (this.options.custom && this.options.custom.refreshContainers) {
                this.options.custom.refreshContainers.call(this)
            } else {
                for (var e = this.containers.length - 1; e >= 0; e--) {
                    var g = this.containers[e].element.offset();
                    this.containers[e].containerCache.left = g.left;
                    this.containers[e].containerCache.top = g.top;
                    this.containers[e].containerCache.width = this.containers[e].element.outerWidth();
                    this.containers[e].containerCache.height = this.containers[e].element.outerHeight()
                }
            }
            return this
        },
        _createPlaceholder: function(e) {
            var c = e || this,
                f = c.options;
            if (!f.placeholder || f.placeholder.constructor == String) {
                var d = f.placeholder;
                f.placeholder = {
                    element: function() {
                        var g = a(document.createElement(c.currentItem[0].nodeName)).addClass(d || c.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
                        if (!d) {
                            g.style.visibility = "hidden"
                        }
                        return g
                    },
                    update: function(g, h) {
                        if (d && !f.forcePlaceholderSize) {
                            return
                        }
                        if (!h.height()) {
                            h.height(c.currentItem.innerHeight() - parseInt(c.currentItem.css("paddingTop") || 0, 10) - parseInt(c.currentItem.css("paddingBottom") || 0, 10))
                        }
                        if (!h.width()) {
                            h.width(c.currentItem.innerWidth() - parseInt(c.currentItem.css("paddingLeft") || 0, 10) - parseInt(c.currentItem.css("paddingRight") || 0, 10))
                        }
                    }
                }
            }
            c.placeholder = a(f.placeholder.element.call(c.element, c.currentItem));
            c.currentItem.after(c.placeholder);
            f.placeholder.update(c, c.placeholder)
        },
        _contactContainers: function(c) {
            var e = null,
                l = null;
            for (var g = this.containers.length - 1; g >= 0; g--) {
                if (a.ui.contains(this.currentItem[0], this.containers[g].element[0])) {
                    continue
                }
                if (this._intersectsWith(this.containers[g].containerCache)) {
                    if (e && a.ui.contains(this.containers[g].element[0], e.element[0])) {
                        continue
                    }
                    e = this.containers[g];
                    l = g
                } else {
                    if (this.containers[g].containerCache.over) {
                        this.containers[g]._trigger("out", c, this._uiHash(this));
                        this.containers[g].containerCache.over = 0
                    }
                }
            }
            if (!e) {
                return
            }
            if (this.containers.length === 1) {
                this.containers[l]._trigger("over", c, this._uiHash(this));
                this.containers[l].containerCache.over = 1
            } else {
                if (this.currentContainer != this.containers[l]) {
                    var k = 10000;
                    var h = null;
                    var d = this.positionAbs[this.containers[l].floating ? "left" : "top"];
                    for (var f = this.items.length - 1; f >= 0; f--) {
                        if (!a.ui.contains(this.containers[l].element[0], this.items[f].item[0])) {
                            continue
                        }
                        var m = this.containers[l].floating ? this.items[f].item.offset().left : this.items[f].item.offset().top;
                        if (Math.abs(m - d) < k) {
                            k = Math.abs(m - d);
                            h = this.items[f];
                            this.direction = (m - d > 0) ? "down" : "up"
                        }
                    }
                    if (!h && !this.options.dropOnEmpty) {
                        return
                    }
                    this.currentContainer = this.containers[l];
                    h ? this._rearrange(c, h, null, true) : this._rearrange(c, null, this.containers[l].element, true);
                    this._trigger("change", c, this._uiHash());
                    this.containers[l]._trigger("change", c, this._uiHash(this));
                    this.options.placeholder.update(this.currentContainer, this.placeholder);
                    this.containers[l]._trigger("over", c, this._uiHash(this));
                    this.containers[l].containerCache.over = 1
                }
            }
        },
        _createHelper: function(d) {
            var e = this.options;
            var c = a.isFunction(e.helper) ? a(e.helper.apply(this.element[0], [d, this.currentItem])) : (e.helper == "clone" ? this.currentItem.clone() : this.currentItem);
            if (!c.parents("body").length) {
                a(e.appendTo != "parent" ? e.appendTo : this.currentItem[0].parentNode)[0].appendChild(c[0])
            }
            if (c[0] == this.currentItem[0]) {
                this._storedCSS = {
                    width: this.currentItem[0].style.width,
                    height: this.currentItem[0].style.height,
                    position: this.currentItem.css("position"),
                    top: this.currentItem.css("top"),
                    left: this.currentItem.css("left")
                }
            }
            if (c[0].style.width == "" || e.forceHelperSize) {
                c.width(this.currentItem.width())
            }
            if (c[0].style.height == "" || e.forceHelperSize) {
                c.height(this.currentItem.height())
            }
            return c
        },
        _adjustOffsetFromHelper: function(c) {
            if (typeof c == "string") {
                c = c.split(" ")
            }
            if (a.isArray(c)) {
                c = {
                    left: +c[0],
                    top: +c[1] || 0
                }
            }
            if ("left" in c) {
                this.offset.click.left = c.left + this.margins.left
            }
            if ("right" in c) {
                this.offset.click.left = this.helperProportions.width - c.right + this.margins.left
            }
            if ("top" in c) {
                this.offset.click.top = c.top + this.margins.top
            }
            if ("bottom" in c) {
                this.offset.click.top = this.helperProportions.height - c.bottom + this.margins.top
            }
        },
        _getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var c = this.offsetParent.offset();
            if (this.cssPosition == "absolute" && this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) {
                c.left += this.scrollParent.scrollLeft();
                c.top += this.scrollParent.scrollTop()
            }
            if ((this.offsetParent[0] == document.body) || (this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && a.browser.msie)) {
                c = {
                    top: 0,
                    left: 0
                }
            }
            return {
                top: c.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: c.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if (this.cssPosition == "relative") {
                var c = this.currentItem.position();
                return {
                    top: c.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: c.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            } else {
                return {
                    top: 0,
                    left: 0
                }
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: (parseInt(this.currentItem.css("marginLeft"), 10) || 0),
                top: (parseInt(this.currentItem.css("marginTop"), 10) || 0)
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var f = this.options;
            if (f.containment == "parent") {
                f.containment = this.helper[0].parentNode
            }
            if (f.containment == "document" || f.containment == "window") {
                this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, a(f.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (a(f.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]
            }
            if (!(/^(document|window|parent)$/).test(f.containment)) {
                var d = a(f.containment)[0];
                var e = a(f.containment).offset();
                var c = (a(d).css("overflow") != "hidden");
                this.containment = [e.left + (parseInt(a(d).css("borderLeftWidth"), 10) || 0) + (parseInt(a(d).css("paddingLeft"), 10) || 0) - this.margins.left, e.top + (parseInt(a(d).css("borderTopWidth"), 10) || 0) + (parseInt(a(d).css("paddingTop"), 10) || 0) - this.margins.top, e.left + (c ? Math.max(d.scrollWidth, d.offsetWidth) : d.offsetWidth) - (parseInt(a(d).css("borderLeftWidth"), 10) || 0) - (parseInt(a(d).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, e.top + (c ? Math.max(d.scrollHeight, d.offsetHeight) : d.offsetHeight) - (parseInt(a(d).css("borderTopWidth"), 10) || 0) - (parseInt(a(d).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
            }
        },
        _convertPositionTo: function(g, i) {
            if (!i) {
                i = this.position
            }
            var e = g == "absolute" ? 1 : -1;
            var f = this.options,
                c = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                h = (/(html|body)/i).test(c[0].tagName);
            return {
                top: (i.top + this.offset.relative.top * e + this.offset.parent.top * e - (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : (h ? 0 : c.scrollTop())) * e)),
                left: (i.left + this.offset.relative.left * e + this.offset.parent.left * e - (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : h ? 0 : c.scrollLeft()) * e))
            }
        },
        _generatePosition: function(f) {
            var i = this.options,
                c = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                j = (/(html|body)/i).test(c[0].tagName);
            if (this.cssPosition == "relative" && !(this.scrollParent[0] != document && this.scrollParent[0] != this.offsetParent[0])) {
                this.offset.relative = this._getRelativeOffset()
            }
            var e = f.pageX;
            var d = f.pageY;
            if (this.originalPosition) {
                if (this.containment) {
                    if (f.pageX - this.offset.click.left < this.containment[0]) {
                        e = this.containment[0] + this.offset.click.left
                    }
                    if (f.pageY - this.offset.click.top < this.containment[1]) {
                        d = this.containment[1] + this.offset.click.top
                    }
                    if (f.pageX - this.offset.click.left > this.containment[2]) {
                        e = this.containment[2] + this.offset.click.left
                    }
                    if (f.pageY - this.offset.click.top > this.containment[3]) {
                        d = this.containment[3] + this.offset.click.top
                    }
                }
                if (i.grid) {
                    var h = this.originalPageY + Math.round((d - this.originalPageY) / i.grid[1]) * i.grid[1];
                    d = this.containment ? (!(h - this.offset.click.top < this.containment[1] || h - this.offset.click.top > this.containment[3]) ? h : (!(h - this.offset.click.top < this.containment[1]) ? h - i.grid[1] : h + i.grid[1])) : h;
                    var g = this.originalPageX + Math.round((e - this.originalPageX) / i.grid[0]) * i.grid[0];
                    e = this.containment ? (!(g - this.offset.click.left < this.containment[0] || g - this.offset.click.left > this.containment[2]) ? g : (!(g - this.offset.click.left < this.containment[0]) ? g - i.grid[0] : g + i.grid[0])) : g
                }
            }
            return {
                top: (d - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : (j ? 0 : c.scrollTop())))),
                left: (e - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : j ? 0 : c.scrollLeft())))
            }
        },
        _rearrange: function(h, g, d, f) {
            d ? d[0].appendChild(this.placeholder[0]) : g.item[0].parentNode.insertBefore(this.placeholder[0], (this.direction == "down" ? g.item[0] : g.item[0].nextSibling));
            this.counter = this.counter ? ++this.counter : 1;
            var e = this,
                c = this.counter;
            window.setTimeout(function() {
                if (c == e.counter) {
                    e.refreshPositions(!f)
                }
            }, 0)
        },
        _clear: function(e, f) {
            this.reverting = false;
            var g = [],
                c = this;
            if (!this._noFinalSort && this.currentItem.parent().length) {
                this.placeholder.before(this.currentItem)
            }
            this._noFinalSort = null;
            if (this.helper[0] == this.currentItem[0]) {
                for (var d in this._storedCSS) {
                    if (this._storedCSS[d] == "auto" || this._storedCSS[d] == "static") {
                        this._storedCSS[d] = ""
                    }
                }
                this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
            } else {
                this.currentItem.show()
            }
            if (this.fromOutside && !f) {
                g.push(function(h) {
                    this._trigger("receive", h, this._uiHash(this.fromOutside))
                })
            }
            if ((this.fromOutside || this.domPosition.prev != this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent != this.currentItem.parent()[0]) && !f) {
                g.push(function(h) {
                    this._trigger("update", h, this._uiHash())
                })
            }
            if (!a.ui.contains(this.element[0], this.currentItem[0])) {
                if (!f) {
                    g.push(function(h) {
                        this._trigger("remove", h, this._uiHash())
                    })
                }
                for (var d = this.containers.length - 1; d >= 0; d--) {
                    if (a.ui.contains(this.containers[d].element[0], this.currentItem[0]) && !f) {
                        g.push((function(h) {
                            return function(i) {
                                h._trigger("receive", i, this._uiHash(this))
                            }
                        }).call(this, this.containers[d]));
                        g.push((function(h) {
                            return function(i) {
                                h._trigger("update", i, this._uiHash(this))
                            }
                        }).call(this, this.containers[d]))
                    }
                }
            }
            for (var d = this.containers.length - 1; d >= 0; d--) {
                if (!f) {
                    g.push((function(h) {
                        return function(i) {
                            h._trigger("deactivate", i, this._uiHash(this))
                        }
                    }).call(this, this.containers[d]))
                }
                if (this.containers[d].containerCache.over) {
                    g.push((function(h) {
                        return function(i) {
                            h._trigger("out", i, this._uiHash(this))
                        }
                    }).call(this, this.containers[d]));
                    this.containers[d].containerCache.over = 0
                }
            }
            if (this._storedCursor) {
                a("body").css("cursor", this._storedCursor)
            }
            if (this._storedOpacity) {
                this.helper.css("opacity", this._storedOpacity)
            }
            if (this._storedZIndex) {
                this.helper.css("zIndex", this._storedZIndex == "auto" ? "" : this._storedZIndex)
            }
            this.dragging = false;
            if (this.cancelHelperRemoval) {
                if (!f) {
                    this._trigger("beforeStop", e, this._uiHash());
                    for (var d = 0; d < g.length; d++) {
                        g[d].call(this, e)
                    }
                    this._trigger("stop", e, this._uiHash())
                }
                this.fromOutside = false;
                return false
            }
            if (!f) {
                this._trigger("beforeStop", e, this._uiHash())
            }
            this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
            if (this.helper[0] != this.currentItem[0]) {
                this.helper.remove()
            }
            this.helper = null;
            if (!f) {
                for (var d = 0; d < g.length; d++) {
                    g[d].call(this, e)
                }
                this._trigger("stop", e, this._uiHash())
            }
            this.fromOutside = false;
            return true
        },
        _trigger: function() {
            if (a.Widget.prototype._trigger.apply(this, arguments) === false) {
                this.cancel()
            }
        },
        _uiHash: function(d) {
            var c = d || this;
            return {
                helper: c.helper,
                placeholder: c.placeholder || a([]),
                position: c.position,
                originalPosition: c.originalPosition,
                offset: c.positionAbs,
                item: c.currentItem,
                sender: d ? d.element : null
            }
        }
    });
    a.extend(a.ui.sortable, {
        version: "1.8.23"
    })
})(jQuery);
/*
 * jQuery UI Slider 1.8.23
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Slider
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function(b, c) {
    var a = 5;
    b.widget("ui.slider", b.ui.mouse, {
        widgetEventPrefix: "slide",
        options: {
            animate: false,
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: false,
            step: 1,
            value: 0,
            values: null
        },
        _create: function() {
            var e = this,
                k = this.options,
                j = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
                h = "<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",
                d = (k.values && k.values.length) || 1,
                g = [];
            this._keySliding = false;
            this._mouseSliding = false;
            this._animateOff = true;
            this._handleIndex = null;
            this._detectOrientation();
            this._mouseInit();
            this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all" + (k.disabled ? " ui-slider-disabled ui-disabled" : ""));
            this.range = b([]);
            if (k.range) {
                if (k.range === true) {
                    if (!k.values) {
                        k.values = [this._valueMin(), this._valueMin()]
                    }
                    if (k.values.length && k.values.length !== 2) {
                        k.values = [k.values[0], k.values[0]]
                    }
                }
                this.range = b("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header" + ((k.range === "min" || k.range === "max") ? " ui-slider-range-" + k.range : ""))
            }
            for (var f = j.length; f < d; f += 1) {
                g.push(h)
            }
            this.handles = j.add(b(g.join("")).appendTo(e.element));
            this.handle = this.handles.eq(0);
            this.handles.add(this.range).filter("a").click(function(i) {
                i.preventDefault()
            }).hover(function() {
                if (!k.disabled) {
                    b(this).addClass("ui-state-hover")
                }
            }, function() {
                b(this).removeClass("ui-state-hover")
            }).focus(function() {
                if (!k.disabled) {
                    b(".ui-slider .ui-state-focus").removeClass("ui-state-focus");
                    b(this).addClass("ui-state-focus")
                } else {
                    b(this).blur()
                }
            }).blur(function() {
                b(this).removeClass("ui-state-focus")
            });
            this.handles.each(function(l) {
                b(this).data("index.ui-slider-handle", l)
            });
            this.handles.keydown(function(o) {
                var l = b(this).data("index.ui-slider-handle"),
                    p, m, i, n;
                if (e.options.disabled) {
                    return
                }
                switch (o.keyCode) {
                    case b.ui.keyCode.HOME:
                    case b.ui.keyCode.END:
                    case b.ui.keyCode.PAGE_UP:
                    case b.ui.keyCode.PAGE_DOWN:
                    case b.ui.keyCode.UP:
                    case b.ui.keyCode.RIGHT:
                    case b.ui.keyCode.DOWN:
                    case b.ui.keyCode.LEFT:
                        o.preventDefault();
                        if (!e._keySliding) {
                            e._keySliding = true;
                            b(this).addClass("ui-state-active");
                            p = e._start(o, l);
                            if (p === false) {
                                return
                            }
                        }
                        break
                }
                n = e.options.step;
                if (e.options.values && e.options.values.length) {
                    m = i = e.values(l)
                } else {
                    m = i = e.value()
                }
                switch (o.keyCode) {
                    case b.ui.keyCode.HOME:
                        i = e._valueMin();
                        break;
                    case b.ui.keyCode.END:
                        i = e._valueMax();
                        break;
                    case b.ui.keyCode.PAGE_UP:
                        i = e._trimAlignValue(m + ((e._valueMax() - e._valueMin()) / a));
                        break;
                    case b.ui.keyCode.PAGE_DOWN:
                        i = e._trimAlignValue(m - ((e._valueMax() - e._valueMin()) / a));
                        break;
                    case b.ui.keyCode.UP:
                    case b.ui.keyCode.RIGHT:
                        if (m === e._valueMax()) {
                            return
                        }
                        i = e._trimAlignValue(m + n);
                        break;
                    case b.ui.keyCode.DOWN:
                    case b.ui.keyCode.LEFT:
                        if (m === e._valueMin()) {
                            return
                        }
                        i = e._trimAlignValue(m - n);
                        break
                }
                e._slide(o, l, i)
            }).keyup(function(l) {
                var i = b(this).data("index.ui-slider-handle");
                if (e._keySliding) {
                    e._keySliding = false;
                    e._stop(l, i);
                    e._change(l, i);
                    b(this).removeClass("ui-state-active")
                }
            });
            this._refreshValue();
            this._animateOff = false
        },
        destroy: function() {
            this.handles.remove();
            this.range.remove();
            this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider");
            this._mouseDestroy();
            return this
        },
        _mouseCapture: function(f) {
            var g = this.options,
                j, l, e, h, n, k, m, i, d;
            if (g.disabled) {
                return false
            }
            this.elementSize = {
                width: this.element.outerWidth(),
                height: this.element.outerHeight()
            };
            this.elementOffset = this.element.offset();
            j = {
                x: f.pageX,
                y: f.pageY
            };
            l = this._normValueFromMouse(j);
            e = this._valueMax() - this._valueMin() + 1;
            n = this;
            this.handles.each(function(o) {
                var p = Math.abs(l - n.values(o));
                if (e > p) {
                    e = p;
                    h = b(this);
                    k = o
                }
            });
            if (g.range === true && this.values(1) === g.min) {
                k += 1;
                h = b(this.handles[k])
            }
            m = this._start(f, k);
            if (m === false) {
                return false
            }
            this._mouseSliding = true;
            n._handleIndex = k;
            h.addClass("ui-state-active").focus();
            i = h.offset();
            d = !b(f.target).parents().andSelf().is(".ui-slider-handle");
            this._clickOffset = d ? {
                left: 0,
                top: 0
            } : {
                left: f.pageX - i.left - (h.width() / 2),
                top: f.pageY - i.top - (h.height() / 2) - (parseInt(h.css("borderTopWidth"), 10) || 0) - (parseInt(h.css("borderBottomWidth"), 10) || 0) + (parseInt(h.css("marginTop"), 10) || 0)
            };
            if (!this.handles.hasClass("ui-state-hover")) {
                this._slide(f, k, l)
            }
            this._animateOff = true;
            return true
        },
        _mouseStart: function(d) {
            return true
        },
        _mouseDrag: function(f) {
            var d = {
                    x: f.pageX,
                    y: f.pageY
                },
                e = this._normValueFromMouse(d);
            this._slide(f, this._handleIndex, e);
            return false
        },
        _mouseStop: function(d) {
            this.handles.removeClass("ui-state-active");
            this._mouseSliding = false;
            this._stop(d, this._handleIndex);
            this._change(d, this._handleIndex);
            this._handleIndex = null;
            this._clickOffset = null;
            this._animateOff = false;
            return false
        },
        _detectOrientation: function() {
            this.orientation = (this.options.orientation === "vertical") ? "vertical" : "horizontal"
        },
        _normValueFromMouse: function(e) {
            var d, h, g, f, i;
            if (this.orientation === "horizontal") {
                d = this.elementSize.width;
                h = e.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)
            } else {
                d = this.elementSize.height;
                h = e.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)
            }
            g = (h / d);
            if (g > 1) {
                g = 1
            }
            if (g < 0) {
                g = 0
            }
            if (this.orientation === "vertical") {
                g = 1 - g
            }
            f = this._valueMax() - this._valueMin();
            i = this._valueMin() + g * f;
            return this._trimAlignValue(i)
        },
        _start: function(f, e) {
            var d = {
                handle: this.handles[e],
                value: this.value()
            };
            if (this.options.values && this.options.values.length) {
                d.value = this.values(e);
                d.values = this.values()
            }
            return this._trigger("start", f, d)
        },
        _slide: function(h, g, f) {
            var d, e, i;
            if (this.options.values && this.options.values.length) {
                d = this.values(g ? 0 : 1);
                if ((this.options.values.length === 2 && this.options.range === true) && ((g === 0 && f > d) || (g === 1 && f < d))) {
                    f = d
                }
                if (f !== this.values(g)) {
                    e = this.values();
                    e[g] = f;
                    i = this._trigger("slide", h, {
                        handle: this.handles[g],
                        value: f,
                        values: e
                    });
                    d = this.values(g ? 0 : 1);
                    if (i !== false) {
                        this.values(g, f, true)
                    }
                }
            } else {
                if (f !== this.value()) {
                    i = this._trigger("slide", h, {
                        handle: this.handles[g],
                        value: f
                    });
                    if (i !== false) {
                        this.value(f)
                    }
                }
            }
        },
        _stop: function(f, e) {
            var d = {
                handle: this.handles[e],
                value: this.value()
            };
            if (this.options.values && this.options.values.length) {
                d.value = this.values(e);
                d.values = this.values()
            }
            this._trigger("stop", f, d)
        },
        _change: function(f, e) {
            if (!this._keySliding && !this._mouseSliding) {
                var d = {
                    handle: this.handles[e],
                    value: this.value()
                };
                if (this.options.values && this.options.values.length) {
                    d.value = this.values(e);
                    d.values = this.values()
                }
                this._trigger("change", f, d)
            }
        },
        value: function(d) {
            if (arguments.length) {
                this.options.value = this._trimAlignValue(d);
                this._refreshValue();
                this._change(null, 0);
                return
            }
            return this._value()
        },
        values: function(e, h) {
            var g, d, f;
            if (arguments.length > 1) {
                this.options.values[e] = this._trimAlignValue(h);
                this._refreshValue();
                this._change(null, e);
                return
            }
            if (arguments.length) {
                if (b.isArray(arguments[0])) {
                    g = this.options.values;
                    d = arguments[0];
                    for (f = 0; f < g.length; f += 1) {
                        g[f] = this._trimAlignValue(d[f]);
                        this._change(null, f)
                    }
                    this._refreshValue()
                } else {
                    if (this.options.values && this.options.values.length) {
                        return this._values(e)
                    } else {
                        return this.value()
                    }
                }
            } else {
                return this._values()
            }
        },
        _setOption: function(e, f) {
            var d, g = 0;
            if (b.isArray(this.options.values)) {
                g = this.options.values.length
            }
            b.Widget.prototype._setOption.apply(this, arguments);
            switch (e) {
                case "disabled":
                    if (f) {
                        this.handles.filter(".ui-state-focus").blur();
                        this.handles.removeClass("ui-state-hover");
                        this.handles.propAttr("disabled", true);
                        this.element.addClass("ui-disabled")
                    } else {
                        this.handles.propAttr("disabled", false);
                        this.element.removeClass("ui-disabled")
                    }
                    break;
                case "orientation":
                    this._detectOrientation();
                    this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation);
                    this._refreshValue();
                    break;
                case "value":
                    this._animateOff = true;
                    this._refreshValue();
                    this._change(null, 0);
                    this._animateOff = false;
                    break;
                case "values":
                    this._animateOff = true;
                    this._refreshValue();
                    for (d = 0; d < g; d += 1) {
                        this._change(null, d)
                    }
                    this._animateOff = false;
                    break
            }
        },
        _value: function() {
            var d = this.options.value;
            d = this._trimAlignValue(d);
            return d
        },
        _values: function(d) {
            var g, f, e;
            if (arguments.length) {
                g = this.options.values[d];
                g = this._trimAlignValue(g);
                return g
            } else {
                f = this.options.values.slice();
                for (e = 0; e < f.length; e += 1) {
                    f[e] = this._trimAlignValue(f[e])
                }
                return f
            }
        },
        _trimAlignValue: function(g) {
            if (g <= this._valueMin()) {
                return this._valueMin()
            }
            if (g >= this._valueMax()) {
                return this._valueMax()
            }
            var d = (this.options.step > 0) ? this.options.step : 1,
                f = (g - this._valueMin()) % d,
                e = g - f;
            if (Math.abs(f) * 2 >= d) {
                e += (f > 0) ? d : (-d)
            }
            return parseFloat(e.toFixed(5))
        },
        _valueMin: function() {
            return this.options.min
        },
        _valueMax: function() {
            return this.options.max
        },
        _refreshValue: function() {
            var g = this.options.range,
                f = this.options,
                m = this,
                e = (!this._animateOff) ? f.animate : false,
                h, d = {},
                i, k, j, l;
            if (this.options.values && this.options.values.length) {
                this.handles.each(function(o, n) {
                    h = (m.values(o) - m._valueMin()) / (m._valueMax() - m._valueMin()) * 100;
                    d[m.orientation === "horizontal" ? "left" : "bottom"] = h + "%";
                    b(this).stop(1, 1)[e ? "animate" : "css"](d, f.animate);
                    if (m.options.range === true) {
                        if (m.orientation === "horizontal") {
                            if (o === 0) {
                                m.range.stop(1, 1)[e ? "animate" : "css"]({
                                    left: h + "%"
                                }, f.animate)
                            }
                            if (o === 1) {
                                m.range[e ? "animate" : "css"]({
                                    width: (h - i) + "%"
                                }, {
                                    queue: false,
                                    duration: f.animate
                                })
                            }
                        } else {
                            if (o === 0) {
                                m.range.stop(1, 1)[e ? "animate" : "css"]({
                                    bottom: (h) + "%"
                                }, f.animate)
                            }
                            if (o === 1) {
                                m.range[e ? "animate" : "css"]({
                                    height: (h - i) + "%"
                                }, {
                                    queue: false,
                                    duration: f.animate
                                })
                            }
                        }
                    }
                    i = h
                })
            } else {
                k = this.value();
                j = this._valueMin();
                l = this._valueMax();
                h = (l !== j) ? (k - j) / (l - j) * 100 : 0;
                d[m.orientation === "horizontal" ? "left" : "bottom"] = h + "%";
                this.handle.stop(1, 1)[e ? "animate" : "css"](d, f.animate);
                if (g === "min" && this.orientation === "horizontal") {
                    this.range.stop(1, 1)[e ? "animate" : "css"]({
                        width: h + "%"
                    }, f.animate)
                }
                if (g === "max" && this.orientation === "horizontal") {
                    this.range[e ? "animate" : "css"]({
                        width: (100 - h) + "%"
                    }, {
                        queue: false,
                        duration: f.animate
                    })
                }
                if (g === "min" && this.orientation === "vertical") {
                    this.range.stop(1, 1)[e ? "animate" : "css"]({
                        height: h + "%"
                    }, f.animate)
                }
                if (g === "max" && this.orientation === "vertical") {
                    this.range[e ? "animate" : "css"]({
                        height: (100 - h) + "%"
                    }, {
                        queue: false,
                        duration: f.animate
                    })
                }
            }
        }
    });
    b.extend(b.ui.slider, {
        version: "1.8.23"
    })
}(jQuery));
/*
 * jQuery UI Datepicker 1.8.23
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Datepicker
 *
 * Depends:
 *	jquery.ui.core.js
 */
(function($, undefined) {
    $.extend($.ui, {
        datepicker: {
            version: "1.8.23"
        }
    });
    var PROP_NAME = "datepicker";
    var dpuuid = new Date().getTime();
    var instActive;

    function Datepicker() {
        this.debug = false;
        this._curInst = null;
        this._keyEvent = false;
        this._disabledInputs = [];
        this._datepickerShowing = false;
        this._inDialog = false;
        this._mainDivId = "ui-datepicker-div";
        this._inlineClass = "ui-datepicker-inline";
        this._appendClass = "ui-datepicker-append";
        this._triggerClass = "ui-datepicker-trigger ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only";
        this._dialogClass = "ui-datepicker-dialog";
        this._disableClass = "ui-datepicker-disabled";
        this._unselectableClass = "ui-datepicker-unselectable";
        this._currentClass = "ui-datepicker-current-day";
        this._dayOverClass = "ui-datepicker-days-cell-over";
        this.regional = [];
        this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            weekHeader: "Wk",
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ""
        };
        this._defaults = {
            showOn: "focus",
            showAnim: "fadeIn",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: false,
            hideIfNoPrevNext: false,
            navigationAsDateFormat: false,
            gotoCurrent: false,
            changeMonth: false,
            changeYear: false,
            yearRange: "c-10:c+10",
            showOtherMonths: false,
            selectOtherMonths: false,
            showWeek: false,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "fast",
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: true,
            showButtonPanel: false,
            autoSize: false,
            disabled: false
        };
        $.extend(this._defaults, this.regional[""]);
        this.dpDiv = bindHover($('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))
    }
    $.extend(Datepicker.prototype, {
        markerClassName: "hasDatepicker",
        maxRows: 4,
        log: function() {
            if (this.debug) {
                console.log.apply("", arguments)
            }
        },
        _widgetDatepicker: function() {
            return this.dpDiv
        },
        setDefaults: function(settings) {
            extendRemove(this._defaults, settings || {});
            return this
        },
        _attachDatepicker: function(target, settings) {
            var inlineSettings = null;
            for (var attrName in this._defaults) {
                var attrValue = target.getAttribute("date:" + attrName);
                if (attrValue) {
                    inlineSettings = inlineSettings || {};
                    try {
                        inlineSettings[attrName] = eval(attrValue)
                    } catch (err) {
                        inlineSettings[attrName] = attrValue
                    }
                }
            }
            var nodeName = target.nodeName.toLowerCase();
            var inline = (nodeName == "div" || nodeName == "span");
            if (!target.id) {
                this.uuid += 1;
                target.id = "dp" + this.uuid
            }
            var inst = this._newInst($(target), inline);
            inst.settings = $.extend({}, settings || {}, inlineSettings || {});
            if (nodeName == "input") {
                this._connectDatepicker(target, inst)
            } else {
                if (inline) {
                    this._inlineDatepicker(target, inst)
                }
            }
        },
        _newInst: function(target, inline) {
            var id = target[0].id.replace(/([^A-Za-z0-9_-])/g, "\\\\$1");
            return {
                id: id,
                input: target,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: inline,
                dpDiv: (!inline ? this.dpDiv : bindHover($('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')))
            }
        },
        _connectDatepicker: function(target, inst) {
            var input = $(target);
            inst.append = $([]);
            inst.trigger = $([]);
            if (input.hasClass(this.markerClassName)) {
                return
            }
            this._attachments(input, inst);
            input.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker", function(event, key, value) {
                inst.settings[key] = value
            }).bind("getData.datepicker", function(event, key) {
                return this._get(inst, key)
            });
            this._autoSize(inst);
            $.data(target, PROP_NAME, inst);
            if (inst.settings.disabled) {
                this._disableDatepicker(target)
            }
        },
        _attachments: function(input, inst) {
            var appendText = this._get(inst, "appendText");
            var isRTL = this._get(inst, "isRTL");
            if (inst.append) {
                inst.append.remove()
            }
            if (appendText) {
                inst.append = $('<span class="' + this._appendClass + '">' + appendText + "</span>");
                input[isRTL ? "before" : "after"](inst.append)
            }
            input.unbind("focus", this._showDatepicker);
            if (inst.trigger) {
                inst.trigger.remove()
            }
            var showOn = this._get(inst, "showOn");
            if (showOn == "focus" || showOn == "both") {
                input.focus(this._showDatepicker)
            }
            if (showOn == "button" || showOn == "both") {
                var buttonText = this._get(inst, "buttonText");
                var buttonImage = this._get(inst, "buttonImage");
                inst.trigger = $(this._get(inst, "buttonImageOnly") ? $("<img/>").addClass(this._triggerClass).attr({
                    src: buttonImage,
                    alt: buttonText,
                    title: buttonText
                }) : $('<button type="button"></button>').addClass(this._triggerClass).html('<span class="ui-button-icon-left ui-icon ui-icon-calendar"></span><span class="ui-button-text">ui-button</span>'));
                input[isRTL ? "before" : "after"](inst.trigger);
                inst.trigger.click(function() {
                    if ($.datepicker._datepickerShowing && $.datepicker._lastInput == input[0]) {
                        $.datepicker._hideDatepicker()
                    } else {
                        if ($.datepicker._datepickerShowing && $.datepicker._lastInput != input[0]) {
                            $.datepicker._hideDatepicker();
                            $.datepicker._showDatepicker(input[0])
                        } else {
                            $.datepicker._showDatepicker(input[0])
                        }
                    }
                    return false
                })
            }
        },
        _autoSize: function(inst) {
            if (this._get(inst, "autoSize") && !inst.inline) {
                var date = new Date(2009, 12 - 1, 20);
                var dateFormat = this._get(inst, "dateFormat");
                if (dateFormat.match(/[DM]/)) {
                    var findMax = function(names) {
                        var max = 0;
                        var maxI = 0;
                        for (var i = 0; i < names.length; i++) {
                            if (names[i].length > max) {
                                max = names[i].length;
                                maxI = i
                            }
                        }
                        return maxI
                    };
                    date.setMonth(findMax(this._get(inst, (dateFormat.match(/MM/) ? "monthNames" : "monthNamesShort"))));
                    date.setDate(findMax(this._get(inst, (dateFormat.match(/DD/) ? "dayNames" : "dayNamesShort"))) + 20 - date.getDay())
                }
                inst.input.attr("size", this._formatDate(inst, date).length)
            }
        },
        _inlineDatepicker: function(target, inst) {
            var divSpan = $(target);
            if (divSpan.hasClass(this.markerClassName)) {
                return
            }
            divSpan.addClass(this.markerClassName).append(inst.dpDiv).bind("setData.datepicker", function(event, key, value) {
                inst.settings[key] = value
            }).bind("getData.datepicker", function(event, key) {
                return this._get(inst, key)
            });
            $.data(target, PROP_NAME, inst);
            this._setDate(inst, this._getDefaultDate(inst), true);
            this._updateDatepicker(inst);
            this._updateAlternate(inst);
            if (inst.settings.disabled) {
                this._disableDatepicker(target)
            }
            inst.dpDiv.css("display", "block")
        },
        _dialogDatepicker: function(input, date, onSelect, settings, pos) {
            var inst = this._dialogInst;
            if (!inst) {
                this.uuid += 1;
                var id = "dp" + this.uuid;
                this._dialogInput = $('<input type="text" id="' + id + '" style="position: absolute; top: -100px; width: 0px;"/>');
                this._dialogInput.keydown(this._doKeyDown);
                $("body").append(this._dialogInput);
                inst = this._dialogInst = this._newInst(this._dialogInput, false);
                inst.settings = {};
                $.data(this._dialogInput[0], PROP_NAME, inst)
            }
            extendRemove(inst.settings, settings || {});
            date = (date && date.constructor == Date ? this._formatDate(inst, date) : date);
            this._dialogInput.val(date);
            this._pos = (pos ? (pos.length ? pos : [pos.pageX, pos.pageY]) : null);
            if (!this._pos) {
                var browserWidth = document.documentElement.clientWidth;
                var browserHeight = document.documentElement.clientHeight;
                var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
                var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
                this._pos = [(browserWidth / 2) - 100 + scrollX, (browserHeight / 2) - 150 + scrollY]
            }
            this._dialogInput.css("left", (this._pos[0] + 20) + "px").css("top", this._pos[1] + "px");
            inst.settings.onSelect = onSelect;
            this._inDialog = true;
            this.dpDiv.addClass(this._dialogClass);
            this._showDatepicker(this._dialogInput[0]);
            if ($.blockUI) {
                $.blockUI(this.dpDiv)
            }
            $.data(this._dialogInput[0], PROP_NAME, inst);
            return this
        },
        _destroyDatepicker: function(target) {
            var $target = $(target);
            var inst = $.data(target, PROP_NAME);
            if (!$target.hasClass(this.markerClassName)) {
                return
            }
            var nodeName = target.nodeName.toLowerCase();
            $.removeData(target, PROP_NAME);
            if (nodeName == "input") {
                inst.append.remove();
                inst.trigger.remove();
                $target.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)
            } else {
                if (nodeName == "div" || nodeName == "span") {
                    $target.removeClass(this.markerClassName).empty()
                }
            }
        },
        _enableDatepicker: function(target) {
            var $target = $(target);
            var inst = $.data(target, PROP_NAME);
            if (!$target.hasClass(this.markerClassName)) {
                return
            }
            var nodeName = target.nodeName.toLowerCase();
            if (nodeName == "input") {
                target.disabled = false;
                inst.trigger.filter("button").each(function() {
                    this.disabled = false
                }).end().filter("img").css({
                    opacity: "1.0",
                    cursor: ""
                })
            } else {
                if (nodeName == "div" || nodeName == "span") {
                    var inline = $target.children("." + this._inlineClass);
                    inline.children().removeClass("ui-state-disabled");
                    inline.find("select.ui-datepicker-month, select.ui-datepicker-year").removeAttr("disabled")
                }
            }
            this._disabledInputs = $.map(this._disabledInputs, function(value) {
                return (value == target ? null : value)
            })
        },
        _disableDatepicker: function(target) {
            var $target = $(target);
            var inst = $.data(target, PROP_NAME);
            if (!$target.hasClass(this.markerClassName)) {
                return
            }
            var nodeName = target.nodeName.toLowerCase();
            if (nodeName == "input") {
                target.disabled = true;
                inst.trigger.filter("button").each(function() {
                    this.disabled = true
                }).end().filter("img").css({
                    opacity: "0.5",
                    cursor: "default"
                })
            } else {
                if (nodeName == "div" || nodeName == "span") {
                    var inline = $target.children("." + this._inlineClass);
                    inline.children().addClass("ui-state-disabled");
                    inline.find("select.ui-datepicker-month, select.ui-datepicker-year").attr("disabled", "disabled")
                }
            }
            this._disabledInputs = $.map(this._disabledInputs, function(value) {
                return (value == target ? null : value)
            });
            this._disabledInputs[this._disabledInputs.length] = target
        },
        _isDisabledDatepicker: function(target) {
            if (!target) {
                return false
            }
            for (var i = 0; i < this._disabledInputs.length; i++) {
                if (this._disabledInputs[i] == target) {
                    return true
                }
            }
            return false
        },
        _getInst: function(target) {
            try {
                return $.data(target, PROP_NAME)
            } catch (err) {
                throw "Missing instance data for this datepicker"
            }
        },
        _optionDatepicker: function(target, name, value) {
            var inst = this._getInst(target);
            if (arguments.length == 2 && typeof name == "string") {
                return (name == "defaults" ? $.extend({}, $.datepicker._defaults) : (inst ? (name == "all" ? $.extend({}, inst.settings) : this._get(inst, name)) : null))
            }
            var settings = name || {};
            if (typeof name == "string") {
                settings = {};
                settings[name] = value
            }
            if (inst) {
                if (this._curInst == inst) {
                    this._hideDatepicker()
                }
                var date = this._getDateDatepicker(target, true);
                var minDate = this._getMinMaxDate(inst, "min");
                var maxDate = this._getMinMaxDate(inst, "max");
                extendRemove(inst.settings, settings);
                if (minDate !== null && settings.dateFormat !== undefined && settings.minDate === undefined) {
                    inst.settings.minDate = this._formatDate(inst, minDate)
                }
                if (maxDate !== null && settings.dateFormat !== undefined && settings.maxDate === undefined) {
                    inst.settings.maxDate = this._formatDate(inst, maxDate)
                }
                this._attachments($(target), inst);
                this._autoSize(inst);
                this._setDate(inst, date);
                this._updateAlternate(inst);
                this._updateDatepicker(inst)
            }
        },
        _changeDatepicker: function(target, name, value) {
            this._optionDatepicker(target, name, value)
        },
        _refreshDatepicker: function(target) {
            var inst = this._getInst(target);
            if (inst) {
                this._updateDatepicker(inst)
            }
        },
        _setDateDatepicker: function(target, date) {
            var inst = this._getInst(target);
            if (inst) {
                this._setDate(inst, date);
                this._updateDatepicker(inst);
                this._updateAlternate(inst)
            }
        },
        _getDateDatepicker: function(target, noDefault) {
            var inst = this._getInst(target);
            if (inst && !inst.inline) {
                this._setDateFromField(inst, noDefault)
            }
            return (inst ? this._getDate(inst) : null)
        },
        _doKeyDown: function(event) {
            var inst = $.datepicker._getInst(event.target);
            var handled = true;
            var isRTL = inst.dpDiv.is(".ui-datepicker-rtl");
            inst._keyEvent = true;
            if ($.datepicker._datepickerShowing) {
                switch (event.keyCode) {
                    case 9:
                        $.datepicker._hideDatepicker();
                        handled = false;
                        break;
                    case 13:
                        var sel = $("td." + $.datepicker._dayOverClass + ":not(." + $.datepicker._currentClass + ")", inst.dpDiv);
                        if (sel[0]) {
                            $.datepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0])
                        }
                        var onSelect = $.datepicker._get(inst, "onSelect");
                        if (onSelect) {
                            var dateStr = $.datepicker._formatDate(inst);
                            onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst])
                        } else {
                            $.datepicker._hideDatepicker()
                        }
                        return false;
                        break;
                    case 27:
                        $.datepicker._hideDatepicker();
                        break;
                    case 33:
                        $.datepicker._adjustDate(event.target, (event.ctrlKey ? -$.datepicker._get(inst, "stepBigMonths") : -$.datepicker._get(inst, "stepMonths")), "M");
                        break;
                    case 34:
                        $.datepicker._adjustDate(event.target, (event.ctrlKey ? +$.datepicker._get(inst, "stepBigMonths") : +$.datepicker._get(inst, "stepMonths")), "M");
                        break;
                    case 35:
                        if (event.ctrlKey || event.metaKey) {
                            $.datepicker._clearDate(event.target)
                        }
                        handled = event.ctrlKey || event.metaKey;
                        break;
                    case 36:
                        if (event.ctrlKey || event.metaKey) {
                            $.datepicker._gotoToday(event.target)
                        }
                        handled = event.ctrlKey || event.metaKey;
                        break;
                    case 37:
                        if (event.ctrlKey || event.metaKey) {
                            $.datepicker._adjustDate(event.target, (isRTL ? +1 : -1), "D")
                        }
                        handled = event.ctrlKey || event.metaKey;
                        if (event.originalEvent.altKey) {
                            $.datepicker._adjustDate(event.target, (event.ctrlKey ? -$.datepicker._get(inst, "stepBigMonths") : -$.datepicker._get(inst, "stepMonths")), "M")
                        }
                        break;
                    case 38:
                        if (event.ctrlKey || event.metaKey) {
                            $.datepicker._adjustDate(event.target, -7, "D")
                        }
                        handled = event.ctrlKey || event.metaKey;
                        break;
                    case 39:
                        if (event.ctrlKey || event.metaKey) {
                            $.datepicker._adjustDate(event.target, (isRTL ? -1 : +1), "D")
                        }
                        handled = event.ctrlKey || event.metaKey;
                        if (event.originalEvent.altKey) {
                            $.datepicker._adjustDate(event.target, (event.ctrlKey ? +$.datepicker._get(inst, "stepBigMonths") : +$.datepicker._get(inst, "stepMonths")), "M")
                        }
                        break;
                    case 40:
                        if (event.ctrlKey || event.metaKey) {
                            $.datepicker._adjustDate(event.target, +7, "D")
                        }
                        handled = event.ctrlKey || event.metaKey;
                        break;
                    default:
                        handled = false
                }
            } else {
                if (event.keyCode == 36 && event.ctrlKey) {
                    $.datepicker._showDatepicker(this)
                } else {
                    handled = false
                }
            }
            if (handled) {
                event.preventDefault();
                event.stopPropagation()
            }
        },
        _doKeyPress: function(event) {
            var inst = $.datepicker._getInst(event.target);
            if ($.datepicker._get(inst, "constrainInput")) {
                var chars = $.datepicker._possibleChars($.datepicker._get(inst, "dateFormat"));
                var chr = String.fromCharCode(event.charCode == undefined ? event.keyCode : event.charCode);
                return event.ctrlKey || event.metaKey || (chr < " " || !chars || chars.indexOf(chr) > -1)
            }
        },
        _doKeyUp: function(event) {
            var inst = $.datepicker._getInst(event.target);
            if (inst.input.val() != inst.lastVal) {
                try {
                    var date = $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"), (inst.input ? inst.input.val() : null), $.datepicker._getFormatConfig(inst));
                    if (date) {
                        $.datepicker._setDateFromField(inst);
                        $.datepicker._updateAlternate(inst);
                        $.datepicker._updateDatepicker(inst)
                    }
                } catch (err) {
                    $.datepicker.log(err)
                }
            }
            return true
        },
        _showDatepicker: function(input) {
            input = input.target || input;
            if (input.nodeName.toLowerCase() != "input") {
                input = $("input", input.parentNode)[0]
            }
            if ($.datepicker._isDisabledDatepicker(input) || $.datepicker._lastInput == input) {
                return
            }
            var inst = $.datepicker._getInst(input);
            if ($.datepicker._curInst && $.datepicker._curInst != inst) {
                $.datepicker._curInst.dpDiv.stop(true, true);
                if (inst && $.datepicker._datepickerShowing) {
                    $.datepicker._hideDatepicker($.datepicker._curInst.input[0])
                }
            }
            var beforeShow = $.datepicker._get(inst, "beforeShow");
            var beforeShowSettings = beforeShow ? beforeShow.apply(input, [input, inst]) : {};
            if (beforeShowSettings === false) {
                return
            }
            extendRemove(inst.settings, beforeShowSettings);
            inst.lastVal = null;
            $.datepicker._lastInput = input;
            $.datepicker._setDateFromField(inst);
            if ($.datepicker._inDialog) {
                input.value = ""
            }
            if (!$.datepicker._pos) {
                $.datepicker._pos = $.datepicker._findPos(input);
                $.datepicker._pos[1] += input.offsetHeight
            }
            var isFixed = false;
            $(input).parents().each(function() {
                isFixed |= $(this).css("position") == "fixed";
                return !isFixed
            });
            if (isFixed && $.browser.opera) {
                $.datepicker._pos[0] -= document.documentElement.scrollLeft;
                $.datepicker._pos[1] -= document.documentElement.scrollTop
            }
            var offset = {
                left: $.datepicker._pos[0],
                top: $.datepicker._pos[1]
            };
            $.datepicker._pos = null;
            inst.dpDiv.empty();
            inst.dpDiv.css({
                position: "absolute",
                display: "block",
                top: "-1000px"
            });
            $.datepicker._updateDatepicker(inst);
            offset = $.datepicker._checkOffset(inst, offset, isFixed);
            inst.dpDiv.css({
                position: ($.datepicker._inDialog && $.blockUI ? "static" : (isFixed ? "fixed" : "absolute")),
                display: "none",
                left: offset.left + "px",
                top: offset.top + "px"
            });
            if (!inst.inline) {
                var showAnim = $.datepicker._get(inst, "showAnim");
                var duration = $.datepicker._get(inst, "duration");
                var postProcess = function() {
                    var cover = inst.dpDiv.find("iframe.ui-datepicker-cover");
                    if (!!cover.length) {
                        var borders = $.datepicker._getBorders(inst.dpDiv);
                        cover.css({
                            left: -borders[0],
                            top: -borders[1],
                            width: inst.dpDiv.outerWidth(),
                            height: inst.dpDiv.outerHeight()
                        })
                    }
                };
                inst.dpDiv.zIndex($(input).zIndex() + 1);
                $.datepicker._datepickerShowing = true;
                if ($.effects && $.effects[showAnim]) {
                    inst.dpDiv.show(showAnim, $.datepicker._get(inst, "showOptions"), duration, postProcess)
                } else {
                    inst.dpDiv[showAnim || "show"]((showAnim ? duration : null), postProcess)
                }
                if (!showAnim || !duration) {
                    postProcess()
                }
                if (inst.input.is(":visible") && !inst.input.is(":disabled")) {
                    inst.input.focus()
                }
                $.datepicker._curInst = inst
            }
        },
        _updateDatepicker: function(inst) {
            var self = this;
            self.maxRows = 4;
            var borders = $.datepicker._getBorders(inst.dpDiv);
            instActive = inst;
            inst.dpDiv.empty().append(this._generateHTML(inst));
            this._attachHandlers(inst);
            var cover = inst.dpDiv.find("iframe.ui-datepicker-cover");
            if (!!cover.length) {
                cover.css({
                    left: -borders[0],
                    top: -borders[1],
                    width: inst.dpDiv.outerWidth(),
                    height: inst.dpDiv.outerHeight()
                })
            }
            inst.dpDiv.find("." + this._dayOverClass + " a").mouseover();
            var numMonths = this._getNumberOfMonths(inst);
            var cols = numMonths[1];
            var width = 17;
            inst.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");
            if (cols > 1) {
                inst.dpDiv.addClass("ui-datepicker-multi-" + cols).css("width", (width * cols) + "em")
            }
            inst.dpDiv[(numMonths[0] != 1 || numMonths[1] != 1 ? "add" : "remove") + "Class"]("ui-datepicker-multi");
            inst.dpDiv[(this._get(inst, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl");
            if (inst == $.datepicker._curInst && $.datepicker._datepickerShowing && inst.input && inst.input.is(":visible") && !inst.input.is(":disabled") && inst.input[0] != document.activeElement) {
                inst.input.focus()
            }
            if (inst.yearshtml) {
                var origyearshtml = inst.yearshtml;
                setTimeout(function() {
                    if (origyearshtml === inst.yearshtml && inst.yearshtml) {
                        inst.dpDiv.find("select.ui-datepicker-year:first").replaceWith(inst.yearshtml)
                    }
                    origyearshtml = inst.yearshtml = null
                }, 0)
            }
        },
        _getBorders: function(elem) {
            var convert = function(value) {
                return {
                    thin: 1,
                    medium: 2,
                    thick: 3
                }[value] || value
            };
            return [parseFloat(convert(elem.css("border-left-width"))), parseFloat(convert(elem.css("border-top-width")))]
        },
        _checkOffset: function(inst, offset, isFixed) {
            var dpWidth = inst.dpDiv.outerWidth();
            var dpHeight = inst.dpDiv.outerHeight();
            var inputWidth = inst.input ? inst.input.outerWidth() : 0;
            var inputHeight = inst.input ? inst.input.outerHeight() : 0;
            var viewWidth = document.documentElement.clientWidth + (isFixed ? 0 : $(document).scrollLeft());
            var viewHeight = document.documentElement.clientHeight + (isFixed ? 0 : $(document).scrollTop());
            offset.left -= (this._get(inst, "isRTL") ? (dpWidth - inputWidth) : 0);
            offset.left -= (isFixed && offset.left == inst.input.offset().left) ? $(document).scrollLeft() : 0;
            offset.top -= (isFixed && offset.top == (inst.input.offset().top + inputHeight)) ? $(document).scrollTop() : 0;
            offset.left -= Math.min(offset.left, (offset.left + dpWidth > viewWidth && viewWidth > dpWidth) ? Math.abs(offset.left + dpWidth - viewWidth) : 0);
            offset.top -= Math.min(offset.top, (offset.top + dpHeight > viewHeight && viewHeight > dpHeight) ? Math.abs(dpHeight + inputHeight) : 0);
            return offset
        },
        _findPos: function(obj) {
            var inst = this._getInst(obj);
            var isRTL = this._get(inst, "isRTL");
            while (obj && (obj.type == "hidden" || obj.nodeType != 1 || $.expr.filters.hidden(obj))) {
                obj = obj[isRTL ? "previousSibling" : "nextSibling"]
            }
            var position = $(obj).offset();
            return [position.left, position.top]
        },
        _hideDatepicker: function(input) {
            var inst = this._curInst;
            if (!inst || (input && inst != $.data(input, PROP_NAME))) {
                return
            }
            if (this._datepickerShowing) {
                var showAnim = this._get(inst, "showAnim");
                var duration = this._get(inst, "duration");
                var postProcess = function() {
                    $.datepicker._tidyDialog(inst)
                };
                if ($.effects && $.effects[showAnim]) {
                    inst.dpDiv.hide(showAnim, $.datepicker._get(inst, "showOptions"), duration, postProcess)
                } else {
                    inst.dpDiv[(showAnim == "slideDown" ? "slideUp" : (showAnim == "fadeIn" ? "fadeOut" : "hide"))]((showAnim ? duration : null), postProcess)
                }
                if (!showAnim) {
                    postProcess()
                }
                this._datepickerShowing = false;
                var onClose = this._get(inst, "onClose");
                if (onClose) {
                    onClose.apply((inst.input ? inst.input[0] : null), [(inst.input ? inst.input.val() : ""), inst])
                }
                this._lastInput = null;
                if (this._inDialog) {
                    this._dialogInput.css({
                        position: "absolute",
                        left: "0",
                        top: "-100px"
                    });
                    if ($.blockUI) {
                        $.unblockUI();
                        $("body").append(this.dpDiv)
                    }
                }
                this._inDialog = false
            }
        },
        _tidyDialog: function(inst) {
            inst.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
        },
        _checkExternalClick: function(event) {
            if (!$.datepicker._curInst) {
                return
            }
            var $target = $(event.target),
                inst = $.datepicker._getInst($target[0]);
            if ((($target[0].id != $.datepicker._mainDivId && $target.parents("#" + $.datepicker._mainDivId).length == 0 && !$target.hasClass($.datepicker.markerClassName) && !$target.closest("." + $.datepicker._triggerClass).length && $.datepicker._datepickerShowing && !($.datepicker._inDialog && $.blockUI))) || ($target.hasClass($.datepicker.markerClassName) && $.datepicker._curInst != inst)) {
                $.datepicker._hideDatepicker()
            }
        },
        _adjustDate: function(id, offset, period) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            if (this._isDisabledDatepicker(target[0])) {
                return
            }
            this._adjustInstDate(inst, offset + (period == "M" ? this._get(inst, "showCurrentAtPos") : 0), period);
            this._updateDatepicker(inst)
        },
        _gotoToday: function(id) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            if (this._get(inst, "gotoCurrent") && inst.currentDay) {
                inst.selectedDay = inst.currentDay;
                inst.drawMonth = inst.selectedMonth = inst.currentMonth;
                inst.drawYear = inst.selectedYear = inst.currentYear
            } else {
                var date = new Date();
                inst.selectedDay = date.getDate();
                inst.drawMonth = inst.selectedMonth = date.getMonth();
                inst.drawYear = inst.selectedYear = date.getFullYear()
            }
            this._notifyChange(inst);
            this._adjustDate(target)
        },
        _selectMonthYear: function(id, select, period) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            inst["selected" + (period == "M" ? "Month" : "Year")] = inst["draw" + (period == "M" ? "Month" : "Year")] = parseInt(select.options[select.selectedIndex].value, 10);
            this._notifyChange(inst);
            this._adjustDate(target)
        },
        _selectDay: function(id, month, year, td) {
            var target = $(id);
            if ($(td).hasClass(this._unselectableClass) || this._isDisabledDatepicker(target[0])) {
                return
            }
            var inst = this._getInst(target[0]);
            inst.selectedDay = inst.currentDay = $("a", td).html();
            inst.selectedMonth = inst.currentMonth = month;
            inst.selectedYear = inst.currentYear = year;
            this._selectDate(id, this._formatDate(inst, inst.currentDay, inst.currentMonth, inst.currentYear))
        },
        _clearDate: function(id) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            this._selectDate(target, "")
        },
        _selectDate: function(id, dateStr) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            dateStr = (dateStr != null ? dateStr : this._formatDate(inst));
            if (inst.input) {
                inst.input.val(dateStr)
            }
            this._updateAlternate(inst);
            var onSelect = this._get(inst, "onSelect");
            if (onSelect) {
                onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst])
            } else {
                if (inst.input) {
                    inst.input.trigger("change")
                }
            }
            if (inst.inline) {
                this._updateDatepicker(inst)
            } else {
                this._hideDatepicker();
                this._lastInput = inst.input[0];
                if (typeof(inst.input[0]) != "object") {
                    inst.input.focus()
                }
                this._lastInput = null
            }
        },
        _updateAlternate: function(inst) {
            var altField = this._get(inst, "altField");
            if (altField) {
                var altFormat = this._get(inst, "altFormat") || this._get(inst, "dateFormat");
                var date = this._getDate(inst);
                var dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst));
                $(altField).each(function() {
                    $(this).val(dateStr)
                })
            }
        },
        noWeekends: function(date) {
            var day = date.getDay();
            return [(day > 0 && day < 6), ""]
        },
        iso8601Week: function(date) {
            var checkDate = new Date(date.getTime());
            checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
            var time = checkDate.getTime();
            checkDate.setMonth(0);
            checkDate.setDate(1);
            return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1
        },
        parseDate: function(format, value, settings) {
            if (format == null || value == null) {
                throw "Invalid arguments"
            }
            value = (typeof value == "object" ? value.toString() : value + "");
            if (value == "") {
                return null
            }
            var shortYearCutoff = (settings ? settings.shortYearCutoff : null) || this._defaults.shortYearCutoff;
            shortYearCutoff = (typeof shortYearCutoff != "string" ? shortYearCutoff : new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10));
            var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
            var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
            var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
            var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;
            var year = -1;
            var month = -1;
            var day = -1;
            var doy = -1;
            var literal = false;
            var lookAhead = function(match) {
                var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
                if (matches) {
                    iFormat++
                }
                return matches
            };
            var getNumber = function(match) {
                var isDoubled = lookAhead(match);
                var size = (match == "@" ? 14 : (match == "!" ? 20 : (match == "y" && isDoubled ? 4 : (match == "o" ? 3 : 2))));
                var digits = new RegExp("^\\d{1," + size + "}");
                var num = value.substring(iValue).match(digits);
                if (!num) {
                    throw "Missing number at position " + iValue
                }
                iValue += num[0].length;
                return parseInt(num[0], 10)
            };
            var getName = function(match, shortNames, longNames) {
                var names = $.map(lookAhead(match) ? longNames : shortNames, function(v, k) {
                    return [
                        [k, v]
                    ]
                }).sort(function(a, b) {
                    return -(a[1].length - b[1].length)
                });
                var index = -1;
                $.each(names, function(i, pair) {
                    var name = pair[1];
                    if (value.substr(iValue, name.length).toLowerCase() == name.toLowerCase()) {
                        index = pair[0];
                        iValue += name.length;
                        return false
                    }
                });
                if (index != -1) {
                    return index + 1
                } else {
                    throw "Unknown name at position " + iValue
                }
            };
            var checkLiteral = function() {
                if (value.charAt(iValue) != format.charAt(iFormat)) {
                    throw "Unexpected literal at position " + iValue
                }
                iValue++
            };
            var iValue = 0;
            for (var iFormat = 0; iFormat < format.length; iFormat++) {
                if (literal) {
                    if (format.charAt(iFormat) == "'" && !lookAhead("'")) {
                        literal = false
                    } else {
                        checkLiteral()
                    }
                } else {
                    switch (format.charAt(iFormat)) {
                        case "d":
                            day = getNumber("d");
                            break;
                        case "D":
                            getName("D", dayNamesShort, dayNames);
                            break;
                        case "o":
                            doy = getNumber("o");
                            break;
                        case "m":
                            month = getNumber("m");
                            break;
                        case "M":
                            month = getName("M", monthNamesShort, monthNames);
                            break;
                        case "y":
                            year = getNumber("y");
                            break;
                        case "@":
                            var date = new Date(getNumber("@"));
                            year = date.getFullYear();
                            month = date.getMonth() + 1;
                            day = date.getDate();
                            break;
                        case "!":
                            var date = new Date((getNumber("!") - this._ticksTo1970) / 10000);
                            year = date.getFullYear();
                            month = date.getMonth() + 1;
                            day = date.getDate();
                            break;
                        case "'":
                            if (lookAhead("'")) {
                                checkLiteral()
                            } else {
                                literal = true
                            }
                            break;
                        default:
                            checkLiteral()
                    }
                }
            }
            if (iValue < value.length) {
                throw "Extra/unparsed characters found in date: " + value.substring(iValue)
            }
            if (year == -1) {
                year = new Date().getFullYear()
            } else {
                if (year < 100) {
                    year += new Date().getFullYear() - new Date().getFullYear() % 100 + (year <= shortYearCutoff ? 0 : -100)
                }
            }
            if (doy > -1) {
                month = 1;
                day = doy;
                do {
                    var dim = this._getDaysInMonth(year, month - 1);
                    if (day <= dim) {
                        break
                    }
                    month++;
                    day -= dim
                } while (true)
            }
            var date = this._daylightSavingAdjust(new Date(year, month - 1, day));
            if (date.getFullYear() != year || date.getMonth() + 1 != month || date.getDate() != day) {
                throw "Invalid date"
            }
            return date
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) + Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000),
        formatDate: function(format, date, settings) {
            if (!date) {
                return ""
            }
            var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
            var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
            var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
            var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;
            var lookAhead = function(match) {
                var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
                if (matches) {
                    iFormat++
                }
                return matches
            };
            var formatNumber = function(match, value, len) {
                var num = "" + value;
                if (lookAhead(match)) {
                    while (num.length < len) {
                        num = "0" + num
                    }
                }
                return num
            };
            var formatName = function(match, value, shortNames, longNames) {
                return (lookAhead(match) ? longNames[value] : shortNames[value])
            };
            var output = "";
            var literal = false;
            if (date) {
                for (var iFormat = 0; iFormat < format.length; iFormat++) {
                    if (literal) {
                        if (format.charAt(iFormat) == "'" && !lookAhead("'")) {
                            literal = false
                        } else {
                            output += format.charAt(iFormat)
                        }
                    } else {
                        switch (format.charAt(iFormat)) {
                            case "d":
                                output += formatNumber("d", date.getDate(), 2);
                                break;
                            case "D":
                                output += formatName("D", date.getDay(), dayNamesShort, dayNames);
                                break;
                            case "o":
                                output += formatNumber("o", Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000), 3);
                                break;
                            case "m":
                                output += formatNumber("m", date.getMonth() + 1, 2);
                                break;
                            case "M":
                                output += formatName("M", date.getMonth(), monthNamesShort, monthNames);
                                break;
                            case "y":
                                output += (lookAhead("y") ? date.getFullYear() : (date.getYear() % 100 < 10 ? "0" : "") + date.getYear() % 100);
                                break;
                            case "@":
                                output += date.getTime();
                                break;
                            case "!":
                                output += date.getTime() * 10000 + this._ticksTo1970;
                                break;
                            case "'":
                                if (lookAhead("'")) {
                                    output += "'"
                                } else {
                                    literal = true
                                }
                                break;
                            default:
                                output += format.charAt(iFormat)
                        }
                    }
                }
            }
            return output
        },
        _possibleChars: function(format) {
            var chars = "";
            var literal = false;
            var lookAhead = function(match) {
                var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
                if (matches) {
                    iFormat++
                }
                return matches
            };
            for (var iFormat = 0; iFormat < format.length; iFormat++) {
                if (literal) {
                    if (format.charAt(iFormat) == "'" && !lookAhead("'")) {
                        literal = false
                    } else {
                        chars += format.charAt(iFormat)
                    }
                } else {
                    switch (format.charAt(iFormat)) {
                        case "d":
                        case "m":
                        case "y":
                        case "@":
                            chars += "0123456789";
                            break;
                        case "D":
                        case "M":
                            return null;
                        case "'":
                            if (lookAhead("'")) {
                                chars += "'"
                            } else {
                                literal = true
                            }
                            break;
                        default:
                            chars += format.charAt(iFormat)
                    }
                }
            }
            return chars
        },
        _get: function(inst, name) {
            return inst.settings[name] !== undefined ? inst.settings[name] : this._defaults[name]
        },
        _setDateFromField: function(inst, noDefault) {
            if (inst.input.val() == inst.lastVal) {
                return
            }
            var dateFormat = this._get(inst, "dateFormat");
            var dates = inst.lastVal = inst.input ? inst.input.val() : null;
            var date, defaultDate;
            date = defaultDate = this._getDefaultDate(inst);
            var settings = this._getFormatConfig(inst);
            try {
                date = this.parseDate(dateFormat, dates, settings) || defaultDate
            } catch (event) {
                this.log(event);
                dates = (noDefault ? "" : dates)
            }
            inst.selectedDay = date.getDate();
            inst.drawMonth = inst.selectedMonth = date.getMonth();
            inst.drawYear = inst.selectedYear = date.getFullYear();
            inst.currentDay = (dates ? date.getDate() : 0);
            inst.currentMonth = (dates ? date.getMonth() : 0);
            inst.currentYear = (dates ? date.getFullYear() : 0);
            this._adjustInstDate(inst)
        },
        _getDefaultDate: function(inst) {
            return this._restrictMinMax(inst, this._determineDate(inst, this._get(inst, "defaultDate"), new Date()))
        },
        _determineDate: function(inst, date, defaultDate) {
            var offsetNumeric = function(offset) {
                var date = new Date();
                date.setDate(date.getDate() + offset);
                return date
            };
            var offsetString = function(offset) {
                try {
                    return $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"), offset, $.datepicker._getFormatConfig(inst))
                } catch (e) {}
                var date = (offset.toLowerCase().match(/^c/) ? $.datepicker._getDate(inst) : null) || new Date();
                var year = date.getFullYear();
                var month = date.getMonth();
                var day = date.getDate();
                var pattern = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g;
                var matches = pattern.exec(offset);
                while (matches) {
                    switch (matches[2] || "d") {
                        case "d":
                        case "D":
                            day += parseInt(matches[1], 10);
                            break;
                        case "w":
                        case "W":
                            day += parseInt(matches[1], 10) * 7;
                            break;
                        case "m":
                        case "M":
                            month += parseInt(matches[1], 10);
                            day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
                            break;
                        case "y":
                        case "Y":
                            year += parseInt(matches[1], 10);
                            day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
                            break
                    }
                    matches = pattern.exec(offset)
                }
                return new Date(year, month, day)
            };
            var newDate = (date == null || date === "" ? defaultDate : (typeof date == "string" ? offsetString(date) : (typeof date == "number" ? (isNaN(date) ? defaultDate : offsetNumeric(date)) : new Date(date.getTime()))));
            newDate = (newDate && newDate.toString() == "Invalid Date" ? defaultDate : newDate);
            if (newDate) {
                newDate.setHours(0);
                newDate.setMinutes(0);
                newDate.setSeconds(0);
                newDate.setMilliseconds(0)
            }
            return this._daylightSavingAdjust(newDate)
        },
        _daylightSavingAdjust: function(date) {
            if (!date) {
                return null
            }
            date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
            return date
        },
        _setDate: function(inst, date, noChange) {
            var clear = !date;
            var origMonth = inst.selectedMonth;
            var origYear = inst.selectedYear;
            var newDate = this._restrictMinMax(inst, this._determineDate(inst, date, new Date()));
            inst.selectedDay = inst.currentDay = newDate.getDate();
            inst.drawMonth = inst.selectedMonth = inst.currentMonth = newDate.getMonth();
            inst.drawYear = inst.selectedYear = inst.currentYear = newDate.getFullYear();
            if ((origMonth != inst.selectedMonth || origYear != inst.selectedYear) && !noChange) {
                this._notifyChange(inst)
            }
            this._adjustInstDate(inst);
            if (inst.input) {
                inst.input.val(clear ? "" : this._formatDate(inst))
            }
        },
        _getDate: function(inst) {
            var startDate = (!inst.currentYear || (inst.input && inst.input.val() == "") ? null : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
            return startDate
        },
        _attachHandlers: function(inst) {
            var stepMonths = this._get(inst, "stepMonths");
            var id = "#" + inst.id.replace(/\\\\/g, "\\");
            inst.dpDiv.find("[data-handler]").map(function() {
                var handler = {
                    prev: function() {
                        window["DP_jQuery_" + dpuuid].datepicker._adjustDate(id, -stepMonths, "M")
                    },
                    next: function() {
                        window["DP_jQuery_" + dpuuid].datepicker._adjustDate(id, +stepMonths, "M")
                    },
                    hide: function() {
                        window["DP_jQuery_" + dpuuid].datepicker._hideDatepicker()
                    },
                    today: function() {
                        window["DP_jQuery_" + dpuuid].datepicker._gotoToday(id)
                    },
                    selectDay: function() {
                        window["DP_jQuery_" + dpuuid].datepicker._selectDay(id, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this);
                        return false
                    },
                    selectMonth: function() {
                        window["DP_jQuery_" + dpuuid].datepicker._selectMonthYear(id, this, "M");
                        return false
                    },
                    selectYear: function() {
                        window["DP_jQuery_" + dpuuid].datepicker._selectMonthYear(id, this, "Y");
                        return false
                    }
                };
                $(this).bind(this.getAttribute("data-event"), handler[this.getAttribute("data-handler")])
            })
        },
        _generateHTML: function(inst) {
            var today = new Date();
            today = this._daylightSavingAdjust(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
            var isRTL = this._get(inst, "isRTL");
            var showButtonPanel = this._get(inst, "showButtonPanel");
            var hideIfNoPrevNext = this._get(inst, "hideIfNoPrevNext");
            var navigationAsDateFormat = this._get(inst, "navigationAsDateFormat");
            var numMonths = this._getNumberOfMonths(inst);
            var showCurrentAtPos = this._get(inst, "showCurrentAtPos");
            var stepMonths = this._get(inst, "stepMonths");
            var isMultiMonth = (numMonths[0] != 1 || numMonths[1] != 1);
            var currentDate = this._daylightSavingAdjust((!inst.currentDay ? new Date(9999, 9, 9) : new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
            var minDate = this._getMinMaxDate(inst, "min");
            var maxDate = this._getMinMaxDate(inst, "max");
            var drawMonth = inst.drawMonth - showCurrentAtPos;
            var drawYear = inst.drawYear;
            if (drawMonth < 0) {
                drawMonth += 12;
                drawYear--
            }
            if (maxDate) {
                var maxDraw = this._daylightSavingAdjust(new Date(maxDate.getFullYear(), maxDate.getMonth() - (numMonths[0] * numMonths[1]) + 1, maxDate.getDate()));
                maxDraw = (minDate && maxDraw < minDate ? minDate : maxDraw);
                while (this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1)) > maxDraw) {
                    drawMonth--;
                    if (drawMonth < 0) {
                        drawMonth = 11;
                        drawYear--
                    }
                }
            }
            inst.drawMonth = drawMonth;
            inst.drawYear = drawYear;
            var prevText = this._get(inst, "prevText");
            prevText = (!navigationAsDateFormat ? prevText : this.formatDate(prevText, this._daylightSavingAdjust(new Date(drawYear, drawMonth - stepMonths, 1)), this._getFormatConfig(inst)));
            var prev = (this._canAdjustMonth(inst, -1, drawYear, drawMonth) ? '<a class="ui-datepicker-prev ui-corner-all" data-handler="prev" data-event="click" title="' + prevText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "e" : "w") + '">' + prevText + "</span></a>" : (hideIfNoPrevNext ? "" : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + prevText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "e" : "w") + '">' + prevText + "</span></a>"));
            var nextText = this._get(inst, "nextText");
            nextText = (!navigationAsDateFormat ? nextText : this.formatDate(nextText, this._daylightSavingAdjust(new Date(drawYear, drawMonth + stepMonths, 1)), this._getFormatConfig(inst)));
            var next = (this._canAdjustMonth(inst, +1, drawYear, drawMonth) ? '<a class="ui-datepicker-next ui-corner-all" data-handler="next" data-event="click" title="' + nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "w" : "e") + '">' + nextText + "</span></a>" : (hideIfNoPrevNext ? "" : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "w" : "e") + '">' + nextText + "</span></a>"));
            var currentText = this._get(inst, "currentText");
            var gotoDate = (this._get(inst, "gotoCurrent") && inst.currentDay ? currentDate : today);
            currentText = (!navigationAsDateFormat ? currentText : this.formatDate(currentText, gotoDate, this._getFormatConfig(inst)));
            var controls = (!inst.inline ? '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" data-handler="hide" data-event="click">' + this._get(inst, "closeText") + "</button>" : "");
            var buttonPanel = (showButtonPanel) ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (isRTL ? controls : "") + (this._isInRange(inst, gotoDate) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" data-handler="today" data-event="click">' + currentText + "</button>" : "") + (isRTL ? "" : controls) + "</div>" : "";
            var firstDay = parseInt(this._get(inst, "firstDay"), 10);
            firstDay = (isNaN(firstDay) ? 0 : firstDay);
            var showWeek = this._get(inst, "showWeek");
            var dayNames = this._get(inst, "dayNames");
            var dayNamesShort = this._get(inst, "dayNamesShort");
            var dayNamesMin = this._get(inst, "dayNamesMin");
            var monthNames = this._get(inst, "monthNames");
            var monthNamesShort = this._get(inst, "monthNamesShort");
            var beforeShowDay = this._get(inst, "beforeShowDay");
            var showOtherMonths = this._get(inst, "showOtherMonths");
            var selectOtherMonths = this._get(inst, "selectOtherMonths");
            var calculateWeek = this._get(inst, "calculateWeek") || this.iso8601Week;
            var defaultDate = this._getDefaultDate(inst);
            var html = "";
            for (var row = 0; row < numMonths[0]; row++) {
                var group = "";
                this.maxRows = 4;
                for (var col = 0; col < numMonths[1]; col++) {
                    var selectedDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, inst.selectedDay));
                    var cornerClass = " ui-corner-all";
                    var calender = "";
                    if (isMultiMonth) {
                        calender += '<div class="ui-datepicker-group';
                        if (numMonths[1] > 1) {
                            switch (col) {
                                case 0:
                                    calender += " ui-datepicker-group-first";
                                    cornerClass = " ui-corner-" + (isRTL ? "right" : "left");
                                    break;
                                case numMonths[1] - 1:
                                    calender += " ui-datepicker-group-last";
                                    cornerClass = " ui-corner-" + (isRTL ? "left" : "right");
                                    break;
                                default:
                                    calender += " ui-datepicker-group-middle";
                                    cornerClass = "";
                                    break
                            }
                        }
                        calender += '">'
                    }
                    calender += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + cornerClass + '">' + (/all|left/.test(cornerClass) && row == 0 ? (isRTL ? next : prev) : "") + (/all|right/.test(cornerClass) && row == 0 ? (isRTL ? prev : next) : "") + this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate, row > 0 || col > 0, monthNames, monthNamesShort) + '</div><table class="ui-datepicker-calendar"><thead><tr>';
                    var thead = (showWeek ? '<th class="ui-datepicker-week-col">' + this._get(inst, "weekHeader") + "</th>" : "");
                    for (var dow = 0; dow < 7; dow++) {
                        var day = (dow + firstDay) % 7;
                        thead += "<th" + ((dow + firstDay + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : "") + '><span title="' + dayNames[day] + '">' + dayNamesMin[day] + "</span></th>"
                    }
                    calender += thead + "</tr></thead><tbody>";
                    var daysInMonth = this._getDaysInMonth(drawYear, drawMonth);
                    if (drawYear == inst.selectedYear && drawMonth == inst.selectedMonth) {
                        inst.selectedDay = Math.min(inst.selectedDay, daysInMonth)
                    }
                    var leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7;
                    var curRows = Math.ceil((leadDays + daysInMonth) / 7);
                    var numRows = (isMultiMonth ? this.maxRows > curRows ? this.maxRows : curRows : curRows);
                    this.maxRows = numRows;
                    var printDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1 - leadDays));
                    for (var dRow = 0; dRow < numRows; dRow++) {
                        calender += "<tr>";
                        var tbody = (!showWeek ? "" : '<td class="ui-datepicker-week-col">' + this._get(inst, "calculateWeek")(printDate) + "</td>");
                        for (var dow = 0; dow < 7; dow++) {
                            var daySettings = (beforeShowDay ? beforeShowDay.apply((inst.input ? inst.input[0] : null), [printDate]) : [true, ""]);
                            var otherMonth = (printDate.getMonth() != drawMonth);
                            var unselectable = (otherMonth && !selectOtherMonths) || !daySettings[0] || (minDate && printDate < minDate) || (maxDate && printDate > maxDate);
                            tbody += '<td class="' + ((dow + firstDay + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (otherMonth ? " ui-datepicker-other-month" : "") + ((printDate.getTime() == selectedDate.getTime() && drawMonth == inst.selectedMonth && inst._keyEvent) || (defaultDate.getTime() == printDate.getTime() && defaultDate.getTime() == selectedDate.getTime()) ? " " + this._dayOverClass : "") + (unselectable ? " " + this._unselectableClass + " ui-state-disabled" : "") + (otherMonth && !showOtherMonths ? "" : " " + daySettings[1] + (printDate.getTime() == currentDate.getTime() ? " " + this._currentClass : "") + (printDate.getTime() == today.getTime() ? " ui-datepicker-today" : "")) + '"' + ((!otherMonth || showOtherMonths) && daySettings[2] ? ' title="' + daySettings[2] + '"' : "") + (unselectable ? "" : ' data-handler="selectDay" data-event="click" data-month="' + printDate.getMonth() + '" data-year="' + printDate.getFullYear() + '"') + ">" + (otherMonth && !showOtherMonths ? "&#xa0;" : (unselectable ? '<span class="ui-state-default">' + printDate.getDate() + "</span>" : '<a class="ui-state-default' + (printDate.getTime() == today.getTime() ? " ui-state-highlight" : "") + (printDate.getTime() == currentDate.getTime() ? " ui-state-active" : "") + (otherMonth ? " ui-priority-secondary" : "") + '" href="#">' + printDate.getDate() + "</a>")) + "</td>";
                            printDate.setDate(printDate.getDate() + 1);
                            printDate = this._daylightSavingAdjust(printDate)
                        }
                        calender += tbody + "</tr>"
                    }
                    drawMonth++;
                    if (drawMonth > 11) {
                        drawMonth = 0;
                        drawYear++
                    }
                    calender += "</tbody></table>" + (isMultiMonth ? "</div>" + ((numMonths[0] > 0 && col == numMonths[1] - 1) ? '<div class="ui-datepicker-row-break"></div>' : "") : "");
                    group += calender
                }
                html += group
            }
            html += buttonPanel + ($.browser.msie && parseInt($.browser.version, 10) < 7 && !inst.inline ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : "");
            inst._keyEvent = false;
            return html
        },
        _generateMonthYearHeader: function(inst, drawMonth, drawYear, minDate, maxDate, secondary, monthNames, monthNamesShort) {
            var changeMonth = this._get(inst, "changeMonth");
            var changeYear = this._get(inst, "changeYear");
            var showMonthAfterYear = this._get(inst, "showMonthAfterYear");
            var html = '<div class="ui-datepicker-title">';
            var monthHtml = "";
            if (secondary || !changeMonth) {
                monthHtml += '<span class="ui-datepicker-month">' + monthNames[drawMonth] + "</span>"
            } else {
                var inMinYear = (minDate && minDate.getFullYear() == drawYear);
                var inMaxYear = (maxDate && maxDate.getFullYear() == drawYear);
                monthHtml += '<select class="ui-datepicker-month" data-handler="selectMonth" data-event="change">';
                for (var month = 0; month < 12; month++) {
                    if ((!inMinYear || month >= minDate.getMonth()) && (!inMaxYear || month <= maxDate.getMonth())) {
                        monthHtml += '<option value="' + month + '"' + (month == drawMonth ? ' selected="selected"' : "") + ">" + monthNamesShort[month] + "</option>"
                    }
                }
                monthHtml += "</select>"
            }
            if (!showMonthAfterYear) {
                html += monthHtml + (secondary || !(changeMonth && changeYear) ? "&#xa0;" : "")
            }
            if (!inst.yearshtml) {
                inst.yearshtml = "";
                if (secondary || !changeYear) {
                    html += '<span class="ui-datepicker-year">' + drawYear + "</span>"
                } else {
                    var years = this._get(inst, "yearRange").split(":");
                    var thisYear = new Date().getFullYear();
                    var determineYear = function(value) {
                        var year = (value.match(/c[+-].*/) ? drawYear + parseInt(value.substring(1), 10) : (value.match(/[+-].*/) ? thisYear + parseInt(value, 10) : parseInt(value, 10)));
                        return (isNaN(year) ? thisYear : year)
                    };
                    var year = determineYear(years[0]);
                    var endYear = Math.max(year, determineYear(years[1] || ""));
                    year = (minDate ? Math.max(year, minDate.getFullYear()) : year);
                    endYear = (maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear);
                    inst.yearshtml += '<select class="ui-datepicker-year" data-handler="selectYear" data-event="change">';
                    for (; year <= endYear; year++) {
                        inst.yearshtml += '<option value="' + year + '"' + (year == drawYear ? ' selected="selected"' : "") + ">" + year + "</option>"
                    }
                    inst.yearshtml += "</select>";
                    html += inst.yearshtml;
                    inst.yearshtml = null
                }
            }
            html += this._get(inst, "yearSuffix");
            if (showMonthAfterYear) {
                html += (secondary || !(changeMonth && changeYear) ? "&#xa0;" : "") + monthHtml
            }
            html += "</div>";
            return html
        },
        _adjustInstDate: function(inst, offset, period) {
            var year = inst.drawYear + (period == "Y" ? offset : 0);
            var month = inst.drawMonth + (period == "M" ? offset : 0);
            var day = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) + (period == "D" ? offset : 0);
            var date = this._restrictMinMax(inst, this._daylightSavingAdjust(new Date(year, month, day)));
            inst.selectedDay = date.getDate();
            inst.drawMonth = inst.selectedMonth = date.getMonth();
            inst.drawYear = inst.selectedYear = date.getFullYear();
            if (period == "M" || period == "Y") {
                this._notifyChange(inst)
            }
        },
        _restrictMinMax: function(inst, date) {
            var minDate = this._getMinMaxDate(inst, "min");
            var maxDate = this._getMinMaxDate(inst, "max");
            var newDate = (minDate && date < minDate ? minDate : date);
            newDate = (maxDate && newDate > maxDate ? maxDate : newDate);
            return newDate
        },
        _notifyChange: function(inst) {
            var onChange = this._get(inst, "onChangeMonthYear");
            if (onChange) {
                onChange.apply((inst.input ? inst.input[0] : null), [inst.selectedYear, inst.selectedMonth + 1, inst])
            }
        },
        _getNumberOfMonths: function(inst) {
            var numMonths = this._get(inst, "numberOfMonths");
            return (numMonths == null ? [1, 1] : (typeof numMonths == "number" ? [1, numMonths] : numMonths))
        },
        _getMinMaxDate: function(inst, minMax) {
            return this._determineDate(inst, this._get(inst, minMax + "Date"), null)
        },
        _getDaysInMonth: function(year, month) {
            return 32 - this._daylightSavingAdjust(new Date(year, month, 32)).getDate()
        },
        _getFirstDayOfMonth: function(year, month) {
            return new Date(year, month, 1).getDay()
        },
        _canAdjustMonth: function(inst, offset, curYear, curMonth) {
            var numMonths = this._getNumberOfMonths(inst);
            var date = this._daylightSavingAdjust(new Date(curYear, curMonth + (offset < 0 ? offset : numMonths[0] * numMonths[1]), 1));
            if (offset < 0) {
                date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth()))
            }
            return this._isInRange(inst, date)
        },
        _isInRange: function(inst, date) {
            var minDate = this._getMinMaxDate(inst, "min");
            var maxDate = this._getMinMaxDate(inst, "max");
            return ((!minDate || date.getTime() >= minDate.getTime()) && (!maxDate || date.getTime() <= maxDate.getTime()))
        },
        _getFormatConfig: function(inst) {
            var shortYearCutoff = this._get(inst, "shortYearCutoff");
            shortYearCutoff = (typeof shortYearCutoff != "string" ? shortYearCutoff : new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10));
            return {
                shortYearCutoff: shortYearCutoff,
                dayNamesShort: this._get(inst, "dayNamesShort"),
                dayNames: this._get(inst, "dayNames"),
                monthNamesShort: this._get(inst, "monthNamesShort"),
                monthNames: this._get(inst, "monthNames")
            }
        },
        _formatDate: function(inst, day, month, year) {
            if (!day) {
                inst.currentDay = inst.selectedDay;
                inst.currentMonth = inst.selectedMonth;
                inst.currentYear = inst.selectedYear
            }
            var date = (day ? (typeof day == "object" ? day : this._daylightSavingAdjust(new Date(year, month, day))) : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
            return this.formatDate(this._get(inst, "dateFormat"), date, this._getFormatConfig(inst))
        }
    });

    function bindHover(dpDiv) {
        var selector = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
        return dpDiv.bind("mouseout", function(event) {
            var elem = $(event.target).closest(selector);
            if (!elem.length) {
                return
            }
            elem.removeClass("ui-state-hover ui-datepicker-prev-hover ui-datepicker-next-hover")
        }).bind("mouseover", function(event) {
            var elem = $(event.target).closest(selector);
            if ($.datepicker._isDisabledDatepicker(instActive.inline ? dpDiv.parent()[0] : instActive.input[0]) || !elem.length) {
                return
            }
            elem.parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");
            elem.addClass("ui-state-hover");
            if (elem.hasClass("ui-datepicker-prev")) {
                elem.addClass("ui-datepicker-prev-hover")
            }
            if (elem.hasClass("ui-datepicker-next")) {
                elem.addClass("ui-datepicker-next-hover")
            }
        })
    }

    function extendRemove(target, props) {
        $.extend(target, props);
        for (var name in props) {
            if (props[name] == null || props[name] == undefined) {
                target[name] = props[name]
            }
        }
        return target
    }

    function isArray(a) {
        return (a && (($.browser.safari && typeof a == "object" && a.length) || (a.constructor && a.constructor.toString().match(/\Array\(\)/))))
    }
    $.fn.datepicker = function(options) {
        if (!this.length) {
            return this
        }
        if (!$.datepicker.initialized) {
            $(document).mousedown($.datepicker._checkExternalClick).find("body").append($.datepicker.dpDiv);
            $.datepicker.initialized = true
        }
        var otherArgs = Array.prototype.slice.call(arguments, 1);
        if (typeof options == "string" && (options == "isDisabled" || options == "getDate" || options == "widget")) {
            return $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this[0]].concat(otherArgs))
        }
        if (options == "option" && arguments.length == 2 && typeof arguments[1] == "string") {
            return $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this[0]].concat(otherArgs))
        }
        return this.each(function() {
            typeof options == "string" ? $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this].concat(otherArgs)) : $.datepicker._attachDatepicker(this, options)
        })
    };
    $.datepicker = new Datepicker();
    $.datepicker.initialized = false;
    $.datepicker.uuid = new Date().getTime();
    $.datepicker.version = "1.8.23";
    window["DP_jQuery_" + dpuuid] = $
})(jQuery);
/*
 * jQuery UI Progressbar 1.8.23
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Progressbar
 *
 * Depends:
 *   jquery.ui.core.js
 *   jquery.ui.widget.js
 */
(function(a, b) {
    a.widget("ui.progressbar", {
        options: {
            value: 0,
            max: 100
        },
        min: 0,
        _create: function() {
            this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({
                role: "progressbar",
                "aria-valuemin": this.min,
                "aria-valuemax": this.options.max,
                "aria-valuenow": this._value()
            });
            this.valueDiv = a("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element);
            this.oldValue = this._value();
            this._refreshValue()
        },
        destroy: function() {
            this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow");
            this.valueDiv.remove();
            a.Widget.prototype.destroy.apply(this, arguments)
        },
        value: function(c) {
            if (c === b) {
                return this._value()
            }
            this._setOption("value", c);
            return this
        },
        _setOption: function(c, d) {
            if (c === "value") {
                this.options.value = d;
                this._refreshValue();
                if (this._value() === this.options.max) {
                    this._trigger("complete")
                }
            }
            a.Widget.prototype._setOption.apply(this, arguments)
        },
        _value: function() {
            var c = this.options.value;
            if (typeof c !== "number") {
                c = 0
            }
            return Math.min(this.options.max, Math.max(this.min, c))
        },
        _percentage: function() {
            return 100 * this._value() / this.options.max
        },
        _refreshValue: function() {
            var d = this.value();
            var c = this._percentage();
            if (this.oldValue !== d) {
                this.oldValue = d;
                this._trigger("change")
            }
            this.valueDiv.toggle(d > this.min).toggleClass("ui-corner-right", d === this.options.max).width(c.toFixed(0) + "%");
            this.element.attr("aria-valuenow", d)
        }
    });
    a.extend(a.ui.progressbar, {
        version: "1.8.23"
    })
})(jQuery);
/*
 * jQuery UI Effects 1.8.23
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/
 */
jQuery.effects || (function(h, e) {
    h.effects = {};
    h.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "borderColor", "color", "outlineColor"], function(o, n) {
        h.fx.step[n] = function(p) {
            if (!p.colorInit) {
                p.start = m(p.elem, n);
                p.end = k(p.end);
                p.colorInit = true
            }
            p.elem.style[n] = "rgb(" + Math.max(Math.min(parseInt((p.pos * (p.end[0] - p.start[0])) + p.start[0], 10), 255), 0) + "," + Math.max(Math.min(parseInt((p.pos * (p.end[1] - p.start[1])) + p.start[1], 10), 255), 0) + "," + Math.max(Math.min(parseInt((p.pos * (p.end[2] - p.start[2])) + p.start[2], 10), 255), 0) + ")"
        }
    });

    function k(o) {
        var n;
        if (o && o.constructor == Array && o.length == 3) {
            return o
        }
        if (n = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(o)) {
            return [parseInt(n[1], 10), parseInt(n[2], 10), parseInt(n[3], 10)]
        }
        if (n = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(o)) {
            return [parseFloat(n[1]) * 2.55, parseFloat(n[2]) * 2.55, parseFloat(n[3]) * 2.55]
        }
        if (n = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(o)) {
            return [parseInt(n[1], 16), parseInt(n[2], 16), parseInt(n[3], 16)]
        }
        if (n = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(o)) {
            return [parseInt(n[1] + n[1], 16), parseInt(n[2] + n[2], 16), parseInt(n[3] + n[3], 16)]
        }
        if (n = /rgba\(0, 0, 0, 0\)/.exec(o)) {
            return a.transparent
        }
        return a[h.trim(o).toLowerCase()]
    }

    function m(p, n) {
        var o;
        do {
            o = (h.curCSS || h.css)(p, n);
            if (o != "" && o != "transparent" || h.nodeName(p, "body")) {
                break
            }
            n = "backgroundColor"
        } while (p = p.parentNode);
        return k(o)
    }
    var a = {
        aqua: [0, 255, 255],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        black: [0, 0, 0],
        blue: [0, 0, 255],
        brown: [165, 42, 42],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgrey: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkviolet: [148, 0, 211],
        fuchsia: [255, 0, 255],
        gold: [255, 215, 0],
        green: [0, 128, 0],
        indigo: [75, 0, 130],
        khaki: [240, 230, 140],
        lightblue: [173, 216, 230],
        lightcyan: [224, 255, 255],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        navy: [0, 0, 128],
        olive: [128, 128, 0],
        orange: [255, 165, 0],
        pink: [255, 192, 203],
        purple: [128, 0, 128],
        violet: [128, 0, 128],
        red: [255, 0, 0],
        silver: [192, 192, 192],
        white: [255, 255, 255],
        yellow: [255, 255, 0],
        transparent: [255, 255, 255]
    };
    var f = ["add", "remove", "toggle"],
        c = {
            border: 1,
            borderBottom: 1,
            borderColor: 1,
            borderLeft: 1,
            borderRight: 1,
            borderTop: 1,
            borderWidth: 1,
            margin: 1,
            padding: 1
        };

    function g() {
        var q = document.defaultView ? document.defaultView.getComputedStyle(this, null) : this.currentStyle,
            r = {},
            o, p;
        if (q && q.length && q[0] && q[q[0]]) {
            var n = q.length;
            while (n--) {
                o = q[n];
                if (typeof q[o] == "string") {
                    p = o.replace(/\-(\w)/g, function(s, t) {
                        return t.toUpperCase()
                    });
                    r[p] = q[o]
                }
            }
        } else {
            for (o in q) {
                if (typeof q[o] === "string") {
                    r[o] = q[o]
                }
            }
        }
        return r
    }

    function b(o) {
        var n, p;
        for (n in o) {
            p = o[n];
            if (p == null || h.isFunction(p) || n in c || (/scrollbar/).test(n) || (!(/color/i).test(n) && isNaN(parseFloat(p)))) {
                delete o[n]
            }
        }
        return o
    }

    function i(n, p) {
        var q = {
                _: 0
            },
            o;
        for (o in p) {
            if (n[o] != p[o]) {
                q[o] = p[o]
            }
        }
        return q
    }
    h.effects.animateClass = function(n, o, q, p) {
        if (h.isFunction(q)) {
            p = q;
            q = null
        }
        return this.queue(function() {
            var u = h(this),
                r = u.attr("style") || " ",
                v = b(g.call(this)),
                t, s = u.attr("class") || "";
            h.each(f, function(w, x) {
                if (n[x]) {
                    u[x + "Class"](n[x])
                }
            });
            t = b(g.call(this));
            u.attr("class", s);
            u.animate(i(v, t), {
                queue: false,
                duration: o,
                easing: q,
                complete: function() {
                    h.each(f, function(w, x) {
                        if (n[x]) {
                            u[x + "Class"](n[x])
                        }
                    });
                    if (typeof u.attr("style") == "object") {
                        u.attr("style").cssText = "";
                        u.attr("style").cssText = r
                    } else {
                        u.attr("style", r)
                    }
                    if (p) {
                        p.apply(this, arguments)
                    }
                    h.dequeue(this)
                }
            })
        })
    };
    h.fn.extend({
        _addClass: h.fn.addClass,
        addClass: function(o, n, q, p) {
            return n ? h.effects.animateClass.apply(this, [{
                add: o
            }, n, q, p]) : this._addClass(o)
        },
        _removeClass: h.fn.removeClass,
        removeClass: function(o, n, q, p) {
            return n ? h.effects.animateClass.apply(this, [{
                remove: o
            }, n, q, p]) : this._removeClass(o)
        },
        _toggleClass: h.fn.toggleClass,
        toggleClass: function(p, o, n, r, q) {
            if (typeof o == "boolean" || o === e) {
                if (!n) {
                    return this._toggleClass(p, o)
                } else {
                    return h.effects.animateClass.apply(this, [(o ? {
                        add: p
                    } : {
                        remove: p
                    }), n, r, q])
                }
            } else {
                return h.effects.animateClass.apply(this, [{
                    toggle: p
                }, o, n, r])
            }
        },
        switchClass: function(n, p, o, r, q) {
            return h.effects.animateClass.apply(this, [{
                add: p,
                remove: n
            }, o, r, q])
        }
    });
    h.extend(h.effects, {
        version: "1.8.23",
        save: function(o, p) {
            for (var n = 0; n < p.length; n++) {
                if (p[n] !== null) {
                    o.data("ec.storage." + p[n], o[0].style[p[n]])
                }
            }
        },
        restore: function(o, p) {
            for (var n = 0; n < p.length; n++) {
                if (p[n] !== null) {
                    o.css(p[n], o.data("ec.storage." + p[n]))
                }
            }
        },
        setMode: function(n, o) {
            if (o == "toggle") {
                o = n.is(":hidden") ? "show" : "hide"
            }
            return o
        },
        getBaseline: function(o, p) {
            var q, n;
            switch (o[0]) {
                case "top":
                    q = 0;
                    break;
                case "middle":
                    q = 0.5;
                    break;
                case "bottom":
                    q = 1;
                    break;
                default:
                    q = o[0] / p.height
            }
            switch (o[1]) {
                case "left":
                    n = 0;
                    break;
                case "center":
                    n = 0.5;
                    break;
                case "right":
                    n = 1;
                    break;
                default:
                    n = o[1] / p.width
            }
            return {
                x: n,
                y: q
            }
        },
        createWrapper: function(n) {
            if (n.parent().is(".ui-effects-wrapper")) {
                return n.parent()
            }
            var o = {
                    width: n.outerWidth(true),
                    height: n.outerHeight(true),
                    "float": n.css("float")
                },
                r = h("<div></div>").addClass("ui-effects-wrapper").css({
                    fontSize: "100%",
                    background: "transparent",
                    border: "none",
                    margin: 0,
                    padding: 0
                }),
                q = document.activeElement;
            try {
                q.id
            } catch (p) {
                q = document.body
            }
            n.wrap(r);
            if (n[0] === q || h.contains(n[0], q)) {
                h(q).focus()
            }
            r = n.parent();
            if (n.css("position") == "static") {
                r.css({
                    position: "relative"
                });
                n.css({
                    position: "relative"
                })
            } else {
                h.extend(o, {
                    position: n.css("position"),
                    zIndex: n.css("z-index")
                });
                h.each(["top", "left", "bottom", "right"], function(s, t) {
                    o[t] = n.css(t);
                    if (isNaN(parseInt(o[t], 10))) {
                        o[t] = "auto"
                    }
                });
                n.css({
                    position: "relative",
                    top: 0,
                    left: 0,
                    right: "auto",
                    bottom: "auto"
                })
            }
            return r.css(o).show()
        },
        removeWrapper: function(n) {
            var o, p = document.activeElement;
            if (n.parent().is(".ui-effects-wrapper")) {
                o = n.parent().replaceWith(n);
                if (n[0] === p || h.contains(n[0], p)) {
                    h(p).focus()
                }
                return o
            }
            return n
        },
        setTransition: function(o, q, n, p) {
            p = p || {};
            h.each(q, function(s, r) {
                var t = o.cssUnit(r);
                if (t[0] > 0) {
                    p[r] = t[0] * n + t[1]
                }
            });
            return p
        }
    });

    function d(o, n, p, q) {
        if (typeof o == "object") {
            q = n;
            p = null;
            n = o;
            o = n.effect
        }
        if (h.isFunction(n)) {
            q = n;
            p = null;
            n = {}
        }
        if (typeof n == "number" || h.fx.speeds[n]) {
            q = p;
            p = n;
            n = {}
        }
        if (h.isFunction(p)) {
            q = p;
            p = null
        }
        n = n || {};
        p = p || n.duration;
        p = h.fx.off ? 0 : typeof p == "number" ? p : p in h.fx.speeds ? h.fx.speeds[p] : h.fx.speeds._default;
        q = q || n.complete;
        return [o, n, p, q]
    }

    function l(n) {
        if (!n || typeof n === "number" || h.fx.speeds[n]) {
            return true
        }
        if (typeof n === "string" && !h.effects[n]) {
            return true
        }
        return false
    }
    h.fn.extend({
        effect: function(q, p, s, u) {
            var o = d.apply(this, arguments),
                r = {
                    options: o[1],
                    duration: o[2],
                    callback: o[3]
                },
                t = r.options.mode,
                n = h.effects[q];
            if (h.fx.off || !n) {
                if (t) {
                    return this[t](r.duration, r.callback)
                } else {
                    return this.each(function() {
                        if (r.callback) {
                            r.callback.call(this)
                        }
                    })
                }
            }
            return n.call(this, r)
        },
        _show: h.fn.show,
        show: function(o) {
            if (l(o)) {
                return this._show.apply(this, arguments)
            } else {
                var n = d.apply(this, arguments);
                n[1].mode = "show";
                return this.effect.apply(this, n)
            }
        },
        _hide: h.fn.hide,
        hide: function(o) {
            if (l(o)) {
                return this._hide.apply(this, arguments)
            } else {
                var n = d.apply(this, arguments);
                n[1].mode = "hide";
                return this.effect.apply(this, n)
            }
        },
        __toggle: h.fn.toggle,
        toggle: function(o) {
            if (l(o) || typeof o === "boolean" || h.isFunction(o)) {
                return this.__toggle.apply(this, arguments)
            } else {
                var n = d.apply(this, arguments);
                n[1].mode = "toggle";
                return this.effect.apply(this, n)
            }
        },
        cssUnit: function(n) {
            var o = this.css(n),
                p = [];
            h.each(["em", "px", "%", "pt"], function(q, r) {
                if (o.indexOf(r) > 0) {
                    p = [parseFloat(o), r]
                }
            });
            return p
        }
    });
    var j = {};
    h.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(o, n) {
        j[n] = function(q) {
            return Math.pow(q, o + 2)
        }
    });
    h.extend(j, {
        Sine: function(n) {
            return 1 - Math.cos(n * Math.PI / 2)
        },
        Circ: function(n) {
            return 1 - Math.sqrt(1 - n * n)
        },
        Elastic: function(n) {
            return n === 0 || n === 1 ? n : -Math.pow(2, 8 * (n - 1)) * Math.sin(((n - 1) * 80 - 7.5) * Math.PI / 15)
        },
        Back: function(n) {
            return n * n * (3 * n - 2)
        },
        Bounce: function(q) {
            var n, o = 4;
            while (q < ((n = Math.pow(2, --o)) - 1) / 11) {}
            return 1 / Math.pow(4, 3 - o) - 7.5625 * Math.pow((n * 3 - 2) / 22 - q, 2)
        }
    });
    h.each(j, function(o, n) {
        h.easing["easeIn" + o] = n;
        h.easing["easeOut" + o] = function(q) {
            return 1 - n(1 - q)
        };
        h.easing["easeInOut" + o] = function(q) {
            return q < 0.5 ? n(q * 2) / 2 : n(q * -2 + 2) / -2 + 1
        }
    })
})(jQuery);
/*
 * jQuery UI Effects Blind 1.8.23
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Blind
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(a, b) {
    a.effects.blind = function(c) {
        return this.queue(function() {
            var e = a(this),
                d = ["position", "top", "bottom", "left", "right"];
            var i = a.effects.setMode(e, c.options.mode || "hide");
            var h = c.options.direction || "vertical";
            a.effects.save(e, d);
            e.show();
            var k = a.effects.createWrapper(e).css({
                overflow: "hidden"
            });
            var f = (h == "vertical") ? "height" : "width";
            var j = (h == "vertical") ? k.height() : k.width();
            if (i == "show") {
                k.css(f, 0)
            }
            var g = {};
            g[f] = i == "show" ? j : 0;
            k.animate(g, c.duration, c.options.easing, function() {
                if (i == "hide") {
                    e.hide()
                }
                a.effects.restore(e, d);
                a.effects.removeWrapper(e);
                if (c.callback) {
                    c.callback.apply(e[0], arguments)
                }
                e.dequeue()
            })
        })
    }
})(jQuery);
/*
 * jQuery UI Effects Bounce 1.8.23
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Bounce
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(a, b) {
    a.effects.bounce = function(c) {
        return this.queue(function() {
            var f = a(this),
                m = ["position", "top", "bottom", "left", "right"];
            var l = a.effects.setMode(f, c.options.mode || "effect");
            var o = c.options.direction || "up";
            var d = c.options.distance || 20;
            var e = c.options.times || 5;
            var h = c.duration || 250;
            if (/show|hide/.test(l)) {
                m.push("opacity")
            }
            a.effects.save(f, m);
            f.show();
            a.effects.createWrapper(f);
            var g = (o == "up" || o == "down") ? "top" : "left";
            var q = (o == "up" || o == "left") ? "pos" : "neg";
            var d = c.options.distance || (g == "top" ? f.outerHeight(true) / 3 : f.outerWidth(true) / 3);
            if (l == "show") {
                f.css("opacity", 0).css(g, q == "pos" ? -d : d)
            }
            if (l == "hide") {
                d = d / (e * 2)
            }
            if (l != "hide") {
                e--
            }
            if (l == "show") {
                var j = {
                    opacity: 1
                };
                j[g] = (q == "pos" ? "+=" : "-=") + d;
                f.animate(j, h / 2, c.options.easing);
                d = d / 2;
                e--
            }
            for (var k = 0; k < e; k++) {
                var p = {},
                    n = {};
                p[g] = (q == "pos" ? "-=" : "+=") + d;
                n[g] = (q == "pos" ? "+=" : "-=") + d;
                f.animate(p, h / 2, c.options.easing).animate(n, h / 2, c.options.easing);
                d = (l == "hide") ? d * 2 : d / 2
            }
            if (l == "hide") {
                var j = {
                    opacity: 0
                };
                j[g] = (q == "pos" ? "-=" : "+=") + d;
                f.animate(j, h / 2, c.options.easing, function() {
                    f.hide();
                    a.effects.restore(f, m);
                    a.effects.removeWrapper(f);
                    if (c.callback) {
                        c.callback.apply(this, arguments)
                    }
                })
            } else {
                var p = {},
                    n = {};
                p[g] = (q == "pos" ? "-=" : "+=") + d;
                n[g] = (q == "pos" ? "+=" : "-=") + d;
                f.animate(p, h / 2, c.options.easing).animate(n, h / 2, c.options.easing, function() {
                    a.effects.restore(f, m);
                    a.effects.removeWrapper(f);
                    if (c.callback) {
                        c.callback.apply(this, arguments)
                    }
                })
            }
            f.queue("fx", function() {
                f.dequeue()
            });
            f.dequeue()
        })
    }
})(jQuery);
/*
 * jQuery UI Effects Clip 1.8.23
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Clip
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(a, b) {
    a.effects.clip = function(c) {
        return this.queue(function() {
            var g = a(this),
                k = ["position", "top", "bottom", "left", "right", "height", "width"];
            var j = a.effects.setMode(g, c.options.mode || "hide");
            var l = c.options.direction || "vertical";
            a.effects.save(g, k);
            g.show();
            var d = a.effects.createWrapper(g).css({
                overflow: "hidden"
            });
            var f = g[0].tagName == "IMG" ? d : g;
            var h = {
                size: (l == "vertical") ? "height" : "width",
                position: (l == "vertical") ? "top" : "left"
            };
            var e = (l == "vertical") ? f.height() : f.width();
            if (j == "show") {
                f.css(h.size, 0);
                f.css(h.position, e / 2)
            }
            var i = {};
            i[h.size] = j == "show" ? e : 0;
            i[h.position] = j == "show" ? 0 : e / 2;
            f.animate(i, {
                queue: false,
                duration: c.duration,
                easing: c.options.easing,
                complete: function() {
                    if (j == "hide") {
                        g.hide()
                    }
                    a.effects.restore(g, k);
                    a.effects.removeWrapper(g);
                    if (c.callback) {
                        c.callback.apply(g[0], arguments)
                    }
                    g.dequeue()
                }
            })
        })
    }
})(jQuery);
/*
 * jQuery UI Effects Drop 1.8.23
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Drop
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(a, b) {
    a.effects.drop = function(c) {
        return this.queue(function() {
            var f = a(this),
                e = ["position", "top", "bottom", "left", "right", "opacity"];
            var j = a.effects.setMode(f, c.options.mode || "hide");
            var i = c.options.direction || "left";
            a.effects.save(f, e);
            f.show();
            a.effects.createWrapper(f);
            var g = (i == "up" || i == "down") ? "top" : "left";
            var d = (i == "up" || i == "left") ? "pos" : "neg";
            var k = c.options.distance || (g == "top" ? f.outerHeight(true) / 2 : f.outerWidth(true) / 2);
            if (j == "show") {
                f.css("opacity", 0).css(g, d == "pos" ? -k : k)
            }
            var h = {
                opacity: j == "show" ? 1 : 0
            };
            h[g] = (j == "show" ? (d == "pos" ? "+=" : "-=") : (d == "pos" ? "-=" : "+=")) + k;
            f.animate(h, {
                queue: false,
                duration: c.duration,
                easing: c.options.easing,
                complete: function() {
                    if (j == "hide") {
                        f.hide()
                    }
                    a.effects.restore(f, e);
                    a.effects.removeWrapper(f);
                    if (c.callback) {
                        c.callback.apply(this, arguments)
                    }
                    f.dequeue()
                }
            })
        })
    }
})(jQuery);
/*
 * jQuery UI Effects Explode 1.8.23
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Explode
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(a, b) {
    a.effects.explode = function(c) {
        return this.queue(function() {
            var l = c.options.pieces ? Math.round(Math.sqrt(c.options.pieces)) : 3;
            var f = c.options.pieces ? Math.round(Math.sqrt(c.options.pieces)) : 3;
            c.options.mode = c.options.mode == "toggle" ? (a(this).is(":visible") ? "hide" : "show") : c.options.mode;
            var k = a(this).show().css("visibility", "hidden");
            var m = k.offset();
            m.top -= parseInt(k.css("marginTop"), 10) || 0;
            m.left -= parseInt(k.css("marginLeft"), 10) || 0;
            var h = k.outerWidth(true);
            var d = k.outerHeight(true);
            for (var g = 0; g < l; g++) {
                for (var e = 0; e < f; e++) {
                    k.clone().appendTo("body").wrap("<div></div>").css({
                        position: "absolute",
                        visibility: "visible",
                        left: -e * (h / f),
                        top: -g * (d / l)
                    }).parent().addClass("ui-effects-explode").css({
                        position: "absolute",
                        overflow: "hidden",
                        width: h / f,
                        height: d / l,
                        left: m.left + e * (h / f) + (c.options.mode == "show" ? (e - Math.floor(f / 2)) * (h / f) : 0),
                        top: m.top + g * (d / l) + (c.options.mode == "show" ? (g - Math.floor(l / 2)) * (d / l) : 0),
                        opacity: c.options.mode == "show" ? 0 : 1
                    }).animate({
                        left: m.left + e * (h / f) + (c.options.mode == "show" ? 0 : (e - Math.floor(f / 2)) * (h / f)),
                        top: m.top + g * (d / l) + (c.options.mode == "show" ? 0 : (g - Math.floor(l / 2)) * (d / l)),
                        opacity: c.options.mode == "show" ? 1 : 0
                    }, c.duration || 500)
                }
            }
            setTimeout(function() {
                c.options.mode == "show" ? k.css({
                    visibility: "visible"
                }) : k.css({
                    visibility: "visible"
                }).hide();
                if (c.callback) {
                    c.callback.apply(k[0])
                }
                k.dequeue();
                a("div.ui-effects-explode").remove()
            }, c.duration || 500)
        })
    }
})(jQuery);
/*
 * jQuery UI Effects Fade 1.8.23
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Fade
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(a, b) {
    a.effects.fade = function(c) {
        return this.queue(function() {
            var d = a(this),
                e = a.effects.setMode(d, c.options.mode || "hide");
            d.animate({
                opacity: e
            }, {
                queue: false,
                duration: c.duration,
                easing: c.options.easing,
                complete: function() {
                    (c.callback && c.callback.apply(this, arguments));
                    d.dequeue()
                }
            })
        })
    }
})(jQuery);
/*
 * jQuery UI Effects Fold 1.8.23
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Fold
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(a, b) {
    a.effects.fold = function(c) {
        return this.queue(function() {
            var f = a(this),
                l = ["position", "top", "bottom", "left", "right"];
            var i = a.effects.setMode(f, c.options.mode || "hide");
            var p = c.options.size || 15;
            var o = !(!c.options.horizFirst);
            var h = c.duration ? c.duration / 2 : a.fx.speeds._default / 2;
            a.effects.save(f, l);
            f.show();
            var e = a.effects.createWrapper(f).css({
                overflow: "hidden"
            });
            var j = ((i == "show") != o);
            var g = j ? ["width", "height"] : ["height", "width"];
            var d = j ? [e.width(), e.height()] : [e.height(), e.width()];
            var k = /([0-9]+)%/.exec(p);
            if (k) {
                p = parseInt(k[1], 10) / 100 * d[i == "hide" ? 0 : 1]
            }
            if (i == "show") {
                e.css(o ? {
                    height: 0,
                    width: p
                } : {
                    height: p,
                    width: 0
                })
            }
            var n = {},
                m = {};
            n[g[0]] = i == "show" ? d[0] : p;
            m[g[1]] = i == "show" ? d[1] : 0;
            e.animate(n, h, c.options.easing).animate(m, h, c.options.easing, function() {
                if (i == "hide") {
                    f.hide()
                }
                a.effects.restore(f, l);
                a.effects.removeWrapper(f);
                if (c.callback) {
                    c.callback.apply(f[0], arguments)
                }
                f.dequeue()
            })
        })
    }
})(jQuery);
/*
 * jQuery UI Effects Highlight 1.8.23
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Highlight
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(a, b) {
    a.effects.highlight = function(c) {
        return this.queue(function() {
            var e = a(this),
                d = ["backgroundImage", "backgroundColor", "opacity"],
                g = a.effects.setMode(e, c.options.mode || "show"),
                f = {
                    backgroundColor: e.css("backgroundColor")
                };
            if (g == "hide") {
                f.opacity = 0
            }
            a.effects.save(e, d);
            e.show().css({
                backgroundImage: "none",
                backgroundColor: c.options.color || "#ffff99"
            }).animate(f, {
                queue: false,
                duration: c.duration,
                easing: c.options.easing,
                complete: function() {
                    (g == "hide" && e.hide());
                    a.effects.restore(e, d);
                    (g == "show" && !a.support.opacity && this.style.removeAttribute("filter"));
                    (c.callback && c.callback.apply(this, arguments));
                    e.dequeue()
                }
            })
        })
    }
})(jQuery);
/*
 * jQuery UI Effects Pulsate 1.8.23
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Pulsate
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(a, b) {
    a.effects.pulsate = function(c) {
        return this.queue(function() {
            var g = a(this),
                k = a.effects.setMode(g, c.options.mode || "show"),
                j = ((c.options.times || 5) * 2) - 1,
                h = c.duration ? c.duration / 2 : a.fx.speeds._default / 2,
                d = g.is(":visible"),
                e = 0;
            if (!d) {
                g.css("opacity", 0).show();
                e = 1
            }
            if ((k == "hide" && d) || (k == "show" && !d)) {
                j--
            }
            for (var f = 0; f < j; f++) {
                g.animate({
                    opacity: e
                }, h, c.options.easing);
                e = (e + 1) % 2
            }
            g.animate({
                opacity: e
            }, h, c.options.easing, function() {
                if (e == 0) {
                    g.hide()
                }(c.callback && c.callback.apply(this, arguments))
            });
            g.queue("fx", function() {
                g.dequeue()
            }).dequeue()
        })
    }
})(jQuery);
/*
 * jQuery UI Effects Scale 1.8.23
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Scale
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(a, b) {
    a.effects.puff = function(c) {
        return this.queue(function() {
            var g = a(this),
                h = a.effects.setMode(g, c.options.mode || "hide"),
                f = parseInt(c.options.percent, 10) || 150,
                e = f / 100,
                d = {
                    height: g.height(),
                    width: g.width()
                };
            a.extend(c.options, {
                fade: true,
                mode: h,
                percent: h == "hide" ? f : 100,
                from: h == "hide" ? d : {
                    height: d.height * e,
                    width: d.width * e
                }
            });
            g.effect("scale", c.options, c.duration, c.callback);
            g.dequeue()
        })
    };
    a.effects.scale = function(c) {
        return this.queue(function() {
            var h = a(this);
            var e = a.extend(true, {}, c.options);
            var k = a.effects.setMode(h, c.options.mode || "effect");
            var i = parseInt(c.options.percent, 10) || (parseInt(c.options.percent, 10) == 0 ? 0 : (k == "hide" ? 0 : 100));
            var j = c.options.direction || "both";
            var d = c.options.origin;
            if (k != "effect") {
                e.origin = d || ["middle", "center"];
                e.restore = true
            }
            var g = {
                height: h.height(),
                width: h.width()
            };
            h.from = c.options.from || (k == "show" ? {
                height: 0,
                width: 0
            } : g);
            var f = {
                y: j != "horizontal" ? (i / 100) : 1,
                x: j != "vertical" ? (i / 100) : 1
            };
            h.to = {
                height: g.height * f.y,
                width: g.width * f.x
            };
            if (c.options.fade) {
                if (k == "show") {
                    h.from.opacity = 0;
                    h.to.opacity = 1
                }
                if (k == "hide") {
                    h.from.opacity = 1;
                    h.to.opacity = 0
                }
            }
            e.from = h.from;
            e.to = h.to;
            e.mode = k;
            h.effect("size", e, c.duration, c.callback);
            h.dequeue()
        })
    };
    a.effects.size = function(c) {
        return this.queue(function() {
            var d = a(this),
                o = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"];
            var n = ["position", "top", "bottom", "left", "right", "overflow", "opacity"];
            var k = ["width", "height", "overflow"];
            var q = ["fontSize"];
            var l = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"];
            var g = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"];
            var h = a.effects.setMode(d, c.options.mode || "effect");
            var j = c.options.restore || false;
            var f = c.options.scale || "both";
            var p = c.options.origin;
            var e = {
                height: d.height(),
                width: d.width()
            };
            d.from = c.options.from || e;
            d.to = c.options.to || e;
            if (p) {
                var i = a.effects.getBaseline(p, e);
                d.from.top = (e.height - d.from.height) * i.y;
                d.from.left = (e.width - d.from.width) * i.x;
                d.to.top = (e.height - d.to.height) * i.y;
                d.to.left = (e.width - d.to.width) * i.x
            }
            var m = {
                from: {
                    y: d.from.height / e.height,
                    x: d.from.width / e.width
                },
                to: {
                    y: d.to.height / e.height,
                    x: d.to.width / e.width
                }
            };
            if (f == "box" || f == "both") {
                if (m.from.y != m.to.y) {
                    o = o.concat(l);
                    d.from = a.effects.setTransition(d, l, m.from.y, d.from);
                    d.to = a.effects.setTransition(d, l, m.to.y, d.to)
                }
                if (m.from.x != m.to.x) {
                    o = o.concat(g);
                    d.from = a.effects.setTransition(d, g, m.from.x, d.from);
                    d.to = a.effects.setTransition(d, g, m.to.x, d.to)
                }
            }
            if (f == "content" || f == "both") {
                if (m.from.y != m.to.y) {
                    o = o.concat(q);
                    d.from = a.effects.setTransition(d, q, m.from.y, d.from);
                    d.to = a.effects.setTransition(d, q, m.to.y, d.to)
                }
            }
            a.effects.save(d, j ? o : n);
            d.show();
            a.effects.createWrapper(d);
            d.css("overflow", "hidden").css(d.from);
            if (f == "content" || f == "both") {
                l = l.concat(["marginTop", "marginBottom"]).concat(q);
                g = g.concat(["marginLeft", "marginRight"]);
                k = o.concat(l).concat(g);
                d.find("*[width]").each(function() {
                    var s = a(this);
                    if (j) {
                        a.effects.save(s, k)
                    }
                    var r = {
                        height: s.height(),
                        width: s.width()
                    };
                    s.from = {
                        height: r.height * m.from.y,
                        width: r.width * m.from.x
                    };
                    s.to = {
                        height: r.height * m.to.y,
                        width: r.width * m.to.x
                    };
                    if (m.from.y != m.to.y) {
                        s.from = a.effects.setTransition(s, l, m.from.y, s.from);
                        s.to = a.effects.setTransition(s, l, m.to.y, s.to)
                    }
                    if (m.from.x != m.to.x) {
                        s.from = a.effects.setTransition(s, g, m.from.x, s.from);
                        s.to = a.effects.setTransition(s, g, m.to.x, s.to)
                    }
                    s.css(s.from);
                    s.animate(s.to, c.duration, c.options.easing, function() {
                        if (j) {
                            a.effects.restore(s, k)
                        }
                    })
                })
            }
            d.animate(d.to, {
                queue: false,
                duration: c.duration,
                easing: c.options.easing,
                complete: function() {
                    if (d.to.opacity === 0) {
                        d.css("opacity", d.from.opacity)
                    }
                    if (h == "hide") {
                        d.hide()
                    }
                    a.effects.restore(d, j ? o : n);
                    a.effects.removeWrapper(d);
                    if (c.callback) {
                        c.callback.apply(this, arguments)
                    }
                    d.dequeue()
                }
            })
        })
    }
})(jQuery);
/*
 * jQuery UI Effects Shake 1.8.23
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Shake
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(a, b) {
    a.effects.shake = function(c) {
        return this.queue(function() {
            var f = a(this),
                m = ["position", "top", "bottom", "left", "right"];
            var l = a.effects.setMode(f, c.options.mode || "effect");
            var o = c.options.direction || "left";
            var d = c.options.distance || 20;
            var e = c.options.times || 3;
            var h = c.duration || c.options.duration || 140;
            a.effects.save(f, m);
            f.show();
            a.effects.createWrapper(f);
            var g = (o == "up" || o == "down") ? "top" : "left";
            var q = (o == "up" || o == "left") ? "pos" : "neg";
            var j = {},
                p = {},
                n = {};
            j[g] = (q == "pos" ? "-=" : "+=") + d;
            p[g] = (q == "pos" ? "+=" : "-=") + d * 2;
            n[g] = (q == "pos" ? "-=" : "+=") + d * 2;
            f.animate(j, h, c.options.easing);
            for (var k = 1; k < e; k++) {
                f.animate(p, h, c.options.easing).animate(n, h, c.options.easing)
            }
            f.animate(p, h, c.options.easing).animate(j, h / 2, c.options.easing, function() {
                a.effects.restore(f, m);
                a.effects.removeWrapper(f);
                if (c.callback) {
                    c.callback.apply(this, arguments)
                }
            });
            f.queue("fx", function() {
                f.dequeue()
            });
            f.dequeue()
        })
    }
})(jQuery);
/*
 * jQuery UI Effects Slide 1.8.23
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Slide
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(a, b) {
    a.effects.slide = function(c) {
        return this.queue(function() {
            var f = a(this),
                e = ["position", "top", "bottom", "left", "right"];
            var j = a.effects.setMode(f, c.options.mode || "show");
            var i = c.options.direction || "left";
            a.effects.save(f, e);
            f.show();
            a.effects.createWrapper(f).css({
                overflow: "hidden"
            });
            var g = (i == "up" || i == "down") ? "top" : "left";
            var d = (i == "up" || i == "left") ? "pos" : "neg";
            var k = c.options.distance || (g == "top" ? f.outerHeight(true) : f.outerWidth(true));
            if (j == "show") {
                f.css(g, d == "pos" ? (isNaN(k) ? "-" + k : -k) : k)
            }
            var h = {};
            h[g] = (j == "show" ? (d == "pos" ? "+=" : "-=") : (d == "pos" ? "-=" : "+=")) + k;
            f.animate(h, {
                queue: false,
                duration: c.duration,
                easing: c.options.easing,
                complete: function() {
                    if (j == "hide") {
                        f.hide()
                    }
                    a.effects.restore(f, e);
                    a.effects.removeWrapper(f);
                    if (c.callback) {
                        c.callback.apply(this, arguments)
                    }
                    f.dequeue()
                }
            })
        })
    }
})(jQuery);
/*
 * jQuery UI Effects Transfer 1.8.23
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Transfer
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(a, b) {
    a.effects.transfer = function(c) {
        return this.queue(function() {
            var g = a(this),
                i = a(c.options.to),
                f = i.offset(),
                h = {
                    top: f.top,
                    left: f.left,
                    height: i.innerHeight(),
                    width: i.innerWidth()
                },
                e = g.offset(),
                d = a('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(c.options.className).css({
                    top: e.top,
                    left: e.left,
                    height: g.innerHeight(),
                    width: g.innerWidth(),
                    position: "absolute"
                }).animate(h, c.duration, c.options.easing, function() {
                    d.remove();
                    (c.callback && c.callback.apply(g[0], arguments));
                    g.dequeue()
                })
        })
    }
})(jQuery);
(function($) {
    $.ui.timepicker = $.ui.timepicker || {};
    if ($.ui.timepicker.version) {
        return
    }
    $.extend($.ui, {
        timepicker: {
            version: "1.1.1"
        }
    });

    function Timepicker() {
        this.regional = [];
        this.regional[""] = {
            currentText: "Now",
            closeText: "Done",
            amNames: ["AM", "A"],
            pmNames: ["PM", "P"],
            timeFormat: "HH:mm",
            timeSuffix: "",
            timeOnlyTitle: "Choose Time",
            timeText: "Time",
            hourText: "Hour",
            minuteText: "Minute",
            secondText: "Second",
            millisecText: "Millisecond",
            timezoneText: "Time Zone",
            isRTL: false
        };
        this._defaults = {
            showButtonPanel: true,
            timeOnly: false,
            showHour: true,
            showMinute: true,
            showSecond: false,
            showMillisec: false,
            showTimezone: false,
            showTime: true,
            stepHour: 1,
            stepMinute: 1,
            stepSecond: 1,
            stepMillisec: 1,
            hour: 0,
            minute: 0,
            second: 0,
            millisec: 0,
            timezone: null,
            useLocalTimezone: false,
            defaultTimezone: "+0000",
            hourMin: 0,
            minuteMin: 0,
            secondMin: 0,
            millisecMin: 0,
            hourMax: 23,
            minuteMax: 59,
            secondMax: 59,
            millisecMax: 999,
            minDateTime: null,
            maxDateTime: null,
            onSelect: null,
            hourGrid: 0,
            minuteGrid: 0,
            secondGrid: 0,
            millisecGrid: 0,
            alwaysSetTime: true,
            separator: " ",
            altFieldTimeOnly: true,
            altTimeFormat: null,
            altSeparator: null,
            altTimeSuffix: null,
            pickerTimeFormat: null,
            pickerTimeSuffix: null,
            showTimepicker: true,
            timezoneIso8601: false,
            timezoneList: null,
            addSliderAccess: false,
            sliderAccessArgs: null,
            controlType: "slider",
            defaultValue: null,
            parse: "strict"
        };
        $.extend(this._defaults, this.regional[""])
    }
    $.extend(Timepicker.prototype, {
        $input: null,
        $altInput: null,
        $timeObj: null,
        inst: null,
        hour_slider: null,
        minute_slider: null,
        second_slider: null,
        millisec_slider: null,
        timezone_select: null,
        hour: 0,
        minute: 0,
        second: 0,
        millisec: 0,
        timezone: null,
        defaultTimezone: "+0000",
        hourMinOriginal: null,
        minuteMinOriginal: null,
        secondMinOriginal: null,
        millisecMinOriginal: null,
        hourMaxOriginal: null,
        minuteMaxOriginal: null,
        secondMaxOriginal: null,
        millisecMaxOriginal: null,
        ampm: "",
        formattedDate: "",
        formattedTime: "",
        formattedDateTime: "",
        timezoneList: null,
        units: ["hour", "minute", "second", "millisec"],
        control: null,
        setDefaults: function(settings) {
            extendRemove(this._defaults, settings || {});
            return this
        },
        _newInst: function($input, o) {
            var tp_inst = new Timepicker(),
                inlineSettings = {},
                fns = {},
                overrides, i;
            for (var attrName in this._defaults) {
                if (this._defaults.hasOwnProperty(attrName)) {
                    var attrValue = $input.attr("time:" + attrName);
                    if (attrValue) {
                        try {
                            inlineSettings[attrName] = eval(attrValue)
                        } catch (err) {
                            inlineSettings[attrName] = attrValue
                        }
                    }
                }
            }
            overrides = {
                beforeShow: function(input, dp_inst) {
                    if ($.isFunction(tp_inst._defaults.evnts.beforeShow)) {
                        return tp_inst._defaults.evnts.beforeShow.call($input[0], input, dp_inst, tp_inst)
                    }
                },
                onChangeMonthYear: function(year, month, dp_inst) {
                    tp_inst._updateDateTime(dp_inst);
                    if ($.isFunction(tp_inst._defaults.evnts.onChangeMonthYear)) {
                        tp_inst._defaults.evnts.onChangeMonthYear.call($input[0], year, month, dp_inst, tp_inst)
                    }
                },
                onClose: function(dateText, dp_inst) {
                    if (tp_inst.timeDefined === true && $input.val() !== "") {
                        tp_inst._updateDateTime(dp_inst)
                    }
                    if ($.isFunction(tp_inst._defaults.evnts.onClose)) {
                        tp_inst._defaults.evnts.onClose.call($input[0], dateText, dp_inst, tp_inst)
                    }
                }
            };
            for (i in overrides) {
                if (overrides.hasOwnProperty(i)) {
                    fns[i] = o[i] || null
                }
            }
            tp_inst._defaults = $.extend({}, this._defaults, inlineSettings, o, overrides, {
                evnts: fns,
                timepicker: tp_inst
            });
            tp_inst.amNames = $.map(tp_inst._defaults.amNames, function(val) {
                return val.toUpperCase()
            });
            tp_inst.pmNames = $.map(tp_inst._defaults.pmNames, function(val) {
                return val.toUpperCase()
            });
            if (typeof(tp_inst._defaults.controlType) === "string") {
                if ($.fn[tp_inst._defaults.controlType] === undefined) {
                    tp_inst._defaults.controlType = "select"
                }
                tp_inst.control = tp_inst._controls[tp_inst._defaults.controlType]
            } else {
                tp_inst.control = tp_inst._defaults.controlType
            }
            if (tp_inst._defaults.timezoneList === null) {
                var timezoneList = ["-1200", "-1100", "-1000", "-0930", "-0900", "-0800", "-0700", "-0600", "-0500", "-0430", "-0400", "-0330", "-0300", "-0200", "-0100", "+0000", "+0100", "+0200", "+0300", "+0330", "+0400", "+0430", "+0500", "+0530", "+0545", "+0600", "+0630", "+0700", "+0800", "+0845", "+0900", "+0930", "+1000", "+1030", "+1100", "+1130", "+1200", "+1245", "+1300", "+1400"];
                if (tp_inst._defaults.timezoneIso8601) {
                    timezoneList = $.map(timezoneList, function(val) {
                        return val == "+0000" ? "Z" : (val.substring(0, 3) + ":" + val.substring(3))
                    })
                }
                tp_inst._defaults.timezoneList = timezoneList
            }
            tp_inst.timezone = tp_inst._defaults.timezone;
            tp_inst.hour = tp_inst._defaults.hour;
            tp_inst.minute = tp_inst._defaults.minute;
            tp_inst.second = tp_inst._defaults.second;
            tp_inst.millisec = tp_inst._defaults.millisec;
            tp_inst.ampm = "";
            tp_inst.$input = $input;
            if (o.altField) {
                tp_inst.$altInput = $(o.altField).css({
                    cursor: "pointer"
                }).focus(function() {
                    $input.trigger("focus")
                })
            }
            if (tp_inst._defaults.minDate === 0 || tp_inst._defaults.minDateTime === 0) {
                tp_inst._defaults.minDate = new Date()
            }
            if (tp_inst._defaults.maxDate === 0 || tp_inst._defaults.maxDateTime === 0) {
                tp_inst._defaults.maxDate = new Date()
            }
            if (tp_inst._defaults.minDate !== undefined && tp_inst._defaults.minDate instanceof Date) {
                tp_inst._defaults.minDateTime = new Date(tp_inst._defaults.minDate.getTime())
            }
            if (tp_inst._defaults.minDateTime !== undefined && tp_inst._defaults.minDateTime instanceof Date) {
                tp_inst._defaults.minDate = new Date(tp_inst._defaults.minDateTime.getTime())
            }
            if (tp_inst._defaults.maxDate !== undefined && tp_inst._defaults.maxDate instanceof Date) {
                tp_inst._defaults.maxDateTime = new Date(tp_inst._defaults.maxDate.getTime())
            }
            if (tp_inst._defaults.maxDateTime !== undefined && tp_inst._defaults.maxDateTime instanceof Date) {
                tp_inst._defaults.maxDate = new Date(tp_inst._defaults.maxDateTime.getTime())
            }
            tp_inst.$input.bind("focus", function() {
                tp_inst._onFocus()
            });
            return tp_inst
        },
        _addTimePicker: function(dp_inst) {
            var currDT = (this.$altInput && this._defaults.altFieldTimeOnly) ? this.$input.val() + " " + this.$altInput.val() : this.$input.val();
            this.timeDefined = this._parseTime(currDT);
            this._limitMinMaxDateTime(dp_inst, false);
            this._injectTimePicker()
        },
        _parseTime: function(timeString, withDate) {
            if (!this.inst) {
                this.inst = $.datepicker._getInst(this.$input[0])
            }
            if (withDate || !this._defaults.timeOnly) {
                var dp_dateFormat = $.datepicker._get(this.inst, "dateFormat");
                try {
                    var parseRes = parseDateTimeInternal(dp_dateFormat, this._defaults.timeFormat, timeString, $.datepicker._getFormatConfig(this.inst), this._defaults);
                    if (!parseRes.timeObj) {
                        return false
                    }
                    $.extend(this, parseRes.timeObj)
                } catch (err) {
                    $.datepicker.log("Error parsing the date/time string: " + err + "\ndate/time string = " + timeString + "\ntimeFormat = " + this._defaults.timeFormat + "\ndateFormat = " + dp_dateFormat);
                    return false
                }
                return true
            } else {
                var timeObj = $.datepicker.parseTime(this._defaults.timeFormat, timeString, this._defaults);
                if (!timeObj) {
                    return false
                }
                $.extend(this, timeObj);
                return true
            }
        },
        _injectTimePicker: function() {
            var $dp = this.inst.dpDiv,
                o = this.inst.settings,
                tp_inst = this,
                litem = "",
                uitem = "",
                max = {},
                gridSize = {},
                size = null;
            if ($dp.find("div.ui-timepicker-div").length === 0 && o.showTimepicker) {
                var noDisplay = ' style="display:none;"',
                    html = '<div class="ui-timepicker-div' + (o.isRTL ? " ui-timepicker-rtl" : "") + '"><dl><dt class="ui_tpicker_time_label"' + ((o.showTime) ? "" : noDisplay) + ">" + o.timeText + '</dt><dd class="ui_tpicker_time"' + ((o.showTime) ? "" : noDisplay) + "></dd>";
                for (var i = 0, l = this.units.length; i < l; i++) {
                    litem = this.units[i];
                    uitem = litem.substr(0, 1).toUpperCase() + litem.substr(1);
                    max[litem] = parseInt((o[litem + "Max"] - ((o[litem + "Max"] - o[litem + "Min"]) % o["step" + uitem])), 10);
                    gridSize[litem] = 0;
                    html += '<dt class="ui_tpicker_' + litem + '_label"' + ((o["show" + uitem]) ? "" : noDisplay) + ">" + o[litem + "Text"] + '</dt><dd class="ui_tpicker_' + litem + '"><div class="ui_tpicker_' + litem + '_slider"' + ((o["show" + uitem]) ? "" : noDisplay) + "></div>";
                    if (o["show" + uitem] && o[litem + "Grid"] > 0) {
                        html += '<div style="padding-left: 1px"><table class="ui-tpicker-grid-label"><tr>';
                        if (litem == "hour") {
                            for (var h = o[litem + "Min"]; h <= max[litem]; h += parseInt(o[litem + "Grid"], 10)) {
                                gridSize[litem]++;
                                var tmph = $.datepicker.formatTime(useAmpm(o.pickerTimeFormat || o.timeFormat) ? "hht" : "HH", {
                                    hour: h
                                }, o);
                                html += '<td data-for="' + litem + '">' + tmph + "</td>"
                            }
                        } else {
                            for (var m = o[litem + "Min"]; m <= max[litem]; m += parseInt(o[litem + "Grid"], 10)) {
                                gridSize[litem]++;
                                html += '<td data-for="' + litem + '">' + ((m < 10) ? "0" : "") + m + "</td>"
                            }
                        }
                        html += "</tr></table></div>"
                    }
                    html += "</dd>"
                }
                html += '<dt class="ui_tpicker_timezone_label"' + ((o.showTimezone) ? "" : noDisplay) + ">" + o.timezoneText + "</dt>";
                html += '<dd class="ui_tpicker_timezone" ' + ((o.showTimezone) ? "" : noDisplay) + "></dd>";
                html += "</dl></div>";
                var $tp = $(html);
                if (o.timeOnly === true) {
                    $tp.prepend('<div class="ui-widget-header ui-helper-clearfix ui-corner-all"><div class="ui-datepicker-title">' + o.timeOnlyTitle + "</div></div>");
                    $dp.find(".ui-datepicker-header, .ui-datepicker-calendar").hide()
                }
                for (var i = 0, l = tp_inst.units.length; i < l; i++) {
                    litem = tp_inst.units[i];
                    uitem = litem.substr(0, 1).toUpperCase() + litem.substr(1);
                    tp_inst[litem + "_slider"] = tp_inst.control.create(tp_inst, $tp.find(".ui_tpicker_" + litem + "_slider"), litem, tp_inst[litem], o[litem + "Min"], max[litem], o["step" + uitem]);
                    if (o["show" + uitem] && o[litem + "Grid"] > 0) {
                        size = 100 * gridSize[litem] * o[litem + "Grid"] / (max[litem] - o[litem + "Min"]);
                        $tp.find(".ui_tpicker_" + litem + " table").css({
                            width: size + "%",
                            marginLeft: o.isRTL ? "0" : ((size / (-2 * gridSize[litem])) + "%"),
                            marginRight: o.isRTL ? ((size / (-2 * gridSize[litem])) + "%") : "0",
                            borderCollapse: "collapse"
                        }).find("td").click(function(e) {
                            var $t = $(this),
                                h = $t.html(),
                                n = parseInt(h.replace(/[^0-9]/g), 10),
                                ap = h.replace(/[^apm]/ig),
                                f = $t.data("for");
                            if (f == "hour") {
                                if (ap.indexOf("p") !== -1 && n < 12) {
                                    n += 12
                                } else {
                                    if (ap.indexOf("a") !== -1 && n === 12) {
                                        n = 0
                                    }
                                }
                            }
                            tp_inst.control.value(tp_inst, tp_inst[f + "_slider"], litem, n);
                            tp_inst._onTimeChange();
                            tp_inst._onSelectHandler()
                        }).css({
                            cursor: "pointer",
                            width: (100 / gridSize[litem]) + "%",
                            textAlign: "center",
                            overflow: "hidden"
                        })
                    }
                }
                this.timezone_select = $tp.find(".ui_tpicker_timezone").append("<select></select>").find("select");
                $.fn.append.apply(this.timezone_select, $.map(o.timezoneList, function(val, idx) {
                    return $("<option />").val(typeof val == "object" ? val.value : val).text(typeof val == "object" ? val.label : val)
                }));
                if (typeof(this.timezone) != "undefined" && this.timezone !== null && this.timezone !== "") {
                    var local_date = new Date(this.inst.selectedYear, this.inst.selectedMonth, this.inst.selectedDay, 12);
                    var local_timezone = $.timepicker.timeZoneOffsetString(local_date);
                    if (local_timezone == this.timezone) {
                        selectLocalTimeZone(tp_inst)
                    } else {
                        this.timezone_select.val(this.timezone)
                    }
                } else {
                    if (typeof(this.hour) != "undefined" && this.hour !== null && this.hour !== "") {
                        this.timezone_select.val(o.defaultTimezone)
                    } else {
                        selectLocalTimeZone(tp_inst)
                    }
                }
                this.timezone_select.change(function() {
                    tp_inst._defaults.useLocalTimezone = false;
                    tp_inst._onTimeChange()
                });
                var $buttonPanel = $dp.find(".ui-datepicker-buttonpane");
                if ($buttonPanel.length) {
                    $buttonPanel.before($tp)
                } else {
                    $dp.append($tp)
                }
                this.$timeObj = $tp.find(".ui_tpicker_time");
                if (this.inst !== null) {
                    var timeDefined = this.timeDefined;
                    this._onTimeChange();
                    this.timeDefined = timeDefined
                }
                if (this._defaults.addSliderAccess) {
                    var sliderAccessArgs = this._defaults.sliderAccessArgs,
                        rtl = this._defaults.isRTL;
                    sliderAccessArgs.isRTL = rtl;
                    setTimeout(function() {
                        if ($tp.find(".ui-slider-access").length === 0) {
                            $tp.find(".ui-slider:visible").sliderAccess(sliderAccessArgs);
                            var sliderAccessWidth = $tp.find(".ui-slider-access:eq(0)").outerWidth(true);
                            if (sliderAccessWidth) {
                                $tp.find("table:visible").each(function() {
                                    var $g = $(this),
                                        oldWidth = $g.outerWidth(),
                                        oldMarginLeft = $g.css(rtl ? "marginRight" : "marginLeft").toString().replace("%", ""),
                                        newWidth = oldWidth - sliderAccessWidth,
                                        newMarginLeft = ((oldMarginLeft * newWidth) / oldWidth) + "%",
                                        css = {
                                            width: newWidth,
                                            marginRight: 0,
                                            marginLeft: 0
                                        };
                                    css[rtl ? "marginRight" : "marginLeft"] = newMarginLeft;
                                    $g.css(css)
                                })
                            }
                        }
                    }, 10)
                }
            }
        },
        _limitMinMaxDateTime: function(dp_inst, adjustSliders) {
            var o = this._defaults,
                dp_date = new Date(dp_inst.selectedYear, dp_inst.selectedMonth, dp_inst.selectedDay);
            if (!this._defaults.showTimepicker) {
                return
            }
            if ($.datepicker._get(dp_inst, "minDateTime") !== null && $.datepicker._get(dp_inst, "minDateTime") !== undefined && dp_date) {
                var minDateTime = $.datepicker._get(dp_inst, "minDateTime"),
                    minDateTimeDate = new Date(minDateTime.getFullYear(), minDateTime.getMonth(), minDateTime.getDate(), 0, 0, 0, 0);
                if (this.hourMinOriginal === null || this.minuteMinOriginal === null || this.secondMinOriginal === null || this.millisecMinOriginal === null) {
                    this.hourMinOriginal = o.hourMin;
                    this.minuteMinOriginal = o.minuteMin;
                    this.secondMinOriginal = o.secondMin;
                    this.millisecMinOriginal = o.millisecMin
                }
                if (dp_inst.settings.timeOnly || minDateTimeDate.getTime() == dp_date.getTime()) {
                    this._defaults.hourMin = minDateTime.getHours();
                    if (this.hour <= this._defaults.hourMin) {
                        this.hour = this._defaults.hourMin;
                        this._defaults.minuteMin = minDateTime.getMinutes();
                        if (this.minute <= this._defaults.minuteMin) {
                            this.minute = this._defaults.minuteMin;
                            this._defaults.secondMin = minDateTime.getSeconds();
                            if (this.second <= this._defaults.secondMin) {
                                this.second = this._defaults.secondMin;
                                this._defaults.millisecMin = minDateTime.getMilliseconds()
                            } else {
                                if (this.millisec < this._defaults.millisecMin) {
                                    this.millisec = this._defaults.millisecMin
                                }
                                this._defaults.millisecMin = this.millisecMinOriginal
                            }
                        } else {
                            this._defaults.secondMin = this.secondMinOriginal;
                            this._defaults.millisecMin = this.millisecMinOriginal
                        }
                    } else {
                        this._defaults.minuteMin = this.minuteMinOriginal;
                        this._defaults.secondMin = this.secondMinOriginal;
                        this._defaults.millisecMin = this.millisecMinOriginal
                    }
                } else {
                    this._defaults.hourMin = this.hourMinOriginal;
                    this._defaults.minuteMin = this.minuteMinOriginal;
                    this._defaults.secondMin = this.secondMinOriginal;
                    this._defaults.millisecMin = this.millisecMinOriginal
                }
            }
            if ($.datepicker._get(dp_inst, "maxDateTime") !== null && $.datepicker._get(dp_inst, "maxDateTime") !== undefined && dp_date) {
                var maxDateTime = $.datepicker._get(dp_inst, "maxDateTime"),
                    maxDateTimeDate = new Date(maxDateTime.getFullYear(), maxDateTime.getMonth(), maxDateTime.getDate(), 0, 0, 0, 0);
                if (this.hourMaxOriginal === null || this.minuteMaxOriginal === null || this.secondMaxOriginal === null) {
                    this.hourMaxOriginal = o.hourMax;
                    this.minuteMaxOriginal = o.minuteMax;
                    this.secondMaxOriginal = o.secondMax;
                    this.millisecMaxOriginal = o.millisecMax
                }
                if (dp_inst.settings.timeOnly || maxDateTimeDate.getTime() == dp_date.getTime()) {
                    this._defaults.hourMax = maxDateTime.getHours();
                    if (this.hour >= this._defaults.hourMax) {
                        this.hour = this._defaults.hourMax;
                        this._defaults.minuteMax = maxDateTime.getMinutes();
                        if (this.minute >= this._defaults.minuteMax) {
                            this.minute = this._defaults.minuteMax;
                            this._defaults.secondMax = maxDateTime.getSeconds()
                        } else {
                            if (this.second >= this._defaults.secondMax) {
                                this.second = this._defaults.secondMax;
                                this._defaults.millisecMax = maxDateTime.getMilliseconds()
                            } else {
                                if (this.millisec > this._defaults.millisecMax) {
                                    this.millisec = this._defaults.millisecMax
                                }
                                this._defaults.millisecMax = this.millisecMaxOriginal
                            }
                        }
                    } else {
                        this._defaults.minuteMax = this.minuteMaxOriginal;
                        this._defaults.secondMax = this.secondMaxOriginal;
                        this._defaults.millisecMax = this.millisecMaxOriginal
                    }
                } else {
                    this._defaults.hourMax = this.hourMaxOriginal;
                    this._defaults.minuteMax = this.minuteMaxOriginal;
                    this._defaults.secondMax = this.secondMaxOriginal;
                    this._defaults.millisecMax = this.millisecMaxOriginal
                }
            }
            if (adjustSliders !== undefined && adjustSliders === true) {
                var hourMax = parseInt((this._defaults.hourMax - ((this._defaults.hourMax - this._defaults.hourMin) % this._defaults.stepHour)), 10),
                    minMax = parseInt((this._defaults.minuteMax - ((this._defaults.minuteMax - this._defaults.minuteMin) % this._defaults.stepMinute)), 10),
                    secMax = parseInt((this._defaults.secondMax - ((this._defaults.secondMax - this._defaults.secondMin) % this._defaults.stepSecond)), 10),
                    millisecMax = parseInt((this._defaults.millisecMax - ((this._defaults.millisecMax - this._defaults.millisecMin) % this._defaults.stepMillisec)), 10);
                if (this.hour_slider) {
                    this.control.options(this, this.hour_slider, "hour", {
                        min: this._defaults.hourMin,
                        max: hourMax
                    });
                    this.control.value(this, this.hour_slider, "hour", this.hour)
                }
                if (this.minute_slider) {
                    this.control.options(this, this.minute_slider, "minute", {
                        min: this._defaults.minuteMin,
                        max: minMax
                    });
                    this.control.value(this, this.minute_slider, "minute", this.minute)
                }
                if (this.second_slider) {
                    this.control.options(this, this.second_slider, "second", {
                        min: this._defaults.secondMin,
                        max: secMax
                    });
                    this.control.value(this, this.second_slider, "second", this.second)
                }
                if (this.millisec_slider) {
                    this.control.options(this, this.millisec_slider, "millisec", {
                        min: this._defaults.millisecMin,
                        max: millisecMax
                    });
                    this.control.value(this, this.millisec_slider, "millisec", this.millisec)
                }
            }
        },
        _onTimeChange: function() {
            var hour = (this.hour_slider) ? this.control.value(this, this.hour_slider, "hour") : false,
                minute = (this.minute_slider) ? this.control.value(this, this.minute_slider, "minute") : false,
                second = (this.second_slider) ? this.control.value(this, this.second_slider, "second") : false,
                millisec = (this.millisec_slider) ? this.control.value(this, this.millisec_slider, "millisec") : false,
                timezone = (this.timezone_select) ? this.timezone_select.val() : false,
                o = this._defaults,
                pickerTimeFormat = o.pickerTimeFormat || o.timeFormat,
                pickerTimeSuffix = o.pickerTimeSuffix || o.timeSuffix;
            if (typeof(hour) == "object") {
                hour = false
            }
            if (typeof(minute) == "object") {
                minute = false
            }
            if (typeof(second) == "object") {
                second = false
            }
            if (typeof(millisec) == "object") {
                millisec = false
            }
            if (typeof(timezone) == "object") {
                timezone = false
            }
            if (hour !== false) {
                hour = parseInt(hour, 10)
            }
            if (minute !== false) {
                minute = parseInt(minute, 10)
            }
            if (second !== false) {
                second = parseInt(second, 10)
            }
            if (millisec !== false) {
                millisec = parseInt(millisec, 10)
            }
            var ampm = o[hour < 12 ? "amNames" : "pmNames"][0];
            var hasChanged = (hour != this.hour || minute != this.minute || second != this.second || millisec != this.millisec || (this.ampm.length > 0 && (hour < 12) != ($.inArray(this.ampm.toUpperCase(), this.amNames) !== -1)) || ((this.timezone === null && timezone != this.defaultTimezone) || (this.timezone !== null && timezone != this.timezone)));
            if (hasChanged) {
                if (hour !== false) {
                    this.hour = hour
                }
                if (minute !== false) {
                    this.minute = minute
                }
                if (second !== false) {
                    this.second = second
                }
                if (millisec !== false) {
                    this.millisec = millisec
                }
                if (timezone !== false) {
                    this.timezone = timezone
                }
                if (!this.inst) {
                    this.inst = $.datepicker._getInst(this.$input[0])
                }
                this._limitMinMaxDateTime(this.inst, true)
            }
            if (useAmpm(o.timeFormat)) {
                this.ampm = ampm
            }
            this.formattedTime = $.datepicker.formatTime(o.timeFormat, this, o);
            if (this.$timeObj) {
                if (pickerTimeFormat === o.timeFormat) {
                    this.$timeObj.text(this.formattedTime + pickerTimeSuffix)
                } else {
                    this.$timeObj.text($.datepicker.formatTime(pickerTimeFormat, this, o) + pickerTimeSuffix)
                }
            }
            this.timeDefined = true;
            if (hasChanged) {
                this._updateDateTime()
            }
        },
        _onSelectHandler: function() {
            var onSelect = this._defaults.onSelect || this.inst.settings.onSelect;
            var inputEl = this.$input ? this.$input[0] : null;
            if (onSelect && inputEl) {
                onSelect.apply(inputEl, [this.formattedDateTime, this])
            }
        },
        _updateDateTime: function(dp_inst) {
            dp_inst = this.inst || dp_inst;
            var dt = $.datepicker._daylightSavingAdjust(new Date(dp_inst.selectedYear, dp_inst.selectedMonth, dp_inst.selectedDay)),
                dateFmt = $.datepicker._get(dp_inst, "dateFormat"),
                formatCfg = $.datepicker._getFormatConfig(dp_inst),
                timeAvailable = dt !== null && this.timeDefined;
            this.formattedDate = $.datepicker.formatDate(dateFmt, (dt === null ? new Date() : dt), formatCfg);
            var formattedDateTime = this.formattedDate;
            if (this._defaults.timeOnly === true) {
                formattedDateTime = this.formattedTime
            } else {
                if (this._defaults.timeOnly !== true && (this._defaults.alwaysSetTime || timeAvailable)) {
                    formattedDateTime += this._defaults.separator + this.formattedTime + this._defaults.timeSuffix
                }
            }
            this.formattedDateTime = formattedDateTime;
            if (!this._defaults.showTimepicker) {
                this.$input.val(this.formattedDate)
            } else {
                if (this.$altInput && this._defaults.altFieldTimeOnly === true) {
                    this.$altInput.val(this.formattedTime);
                    this.$input.val(this.formattedDate)
                } else {
                    if (this.$altInput) {
                        this.$input.val(formattedDateTime);
                        var altFormattedDateTime = "",
                            altSeparator = this._defaults.altSeparator ? this._defaults.altSeparator : this._defaults.separator,
                            altTimeSuffix = this._defaults.altTimeSuffix ? this._defaults.altTimeSuffix : this._defaults.timeSuffix;
                        if (this._defaults.altFormat) {
                            altFormattedDateTime = $.datepicker.formatDate(this._defaults.altFormat, (dt === null ? new Date() : dt), formatCfg)
                        } else {
                            altFormattedDateTime = this.formattedDate
                        }
                        if (altFormattedDateTime) {
                            altFormattedDateTime += altSeparator
                        }
                        if (this._defaults.altTimeFormat) {
                            altFormattedDateTime += $.datepicker.formatTime(this._defaults.altTimeFormat, this, this._defaults) + altTimeSuffix
                        } else {
                            altFormattedDateTime += this.formattedTime + altTimeSuffix
                        }
                        this.$altInput.val(altFormattedDateTime)
                    } else {
                        this.$input.val(formattedDateTime)
                    }
                }
            }
            this.$input.trigger("change")
        },
        _onFocus: function() {
            if (!this.$input.val() && this._defaults.defaultValue) {
                this.$input.val(this._defaults.defaultValue);
                var inst = $.datepicker._getInst(this.$input.get(0)),
                    tp_inst = $.datepicker._get(inst, "timepicker");
                if (tp_inst) {
                    if (tp_inst._defaults.timeOnly && (inst.input.val() != inst.lastVal)) {
                        try {
                            $.datepicker._updateDatepicker(inst)
                        } catch (err) {
                            $.datepicker.log(err)
                        }
                    }
                }
            }
        },
        _controls: {
            slider: {
                create: function(tp_inst, obj, unit, val, min, max, step) {
                    var rtl = tp_inst._defaults.isRTL;
                    return obj.prop("slide", null).slider({
                        orientation: "horizontal",
                        value: rtl ? val * -1 : val,
                        min: rtl ? max * -1 : min,
                        max: rtl ? min * -1 : max,
                        step: step,
                        slide: function(event, ui) {
                            tp_inst.control.value(tp_inst, $(this), unit, rtl ? ui.value * -1 : ui.value);
                            tp_inst._onTimeChange()
                        },
                        stop: function(event, ui) {
                            tp_inst._onSelectHandler()
                        }
                    })
                },
                options: function(tp_inst, obj, unit, opts, val) {
                    if (tp_inst._defaults.isRTL) {
                        if (typeof(opts) == "string") {
                            if (opts == "min" || opts == "max") {
                                if (val !== undefined) {
                                    return obj.slider(opts, val * -1)
                                }
                                return Math.abs(obj.slider(opts))
                            }
                            return obj.slider(opts)
                        }
                        var min = opts.min,
                            max = opts.max;
                        opts.min = opts.max = null;
                        if (min !== undefined) {
                            opts.max = min * -1
                        }
                        if (max !== undefined) {
                            opts.min = max * -1
                        }
                        return obj.slider(opts)
                    }
                    if (typeof(opts) == "string" && val !== undefined) {
                        return obj.slider(opts, val)
                    }
                    return obj.slider(opts)
                },
                value: function(tp_inst, obj, unit, val) {
                    if (tp_inst._defaults.isRTL) {
                        if (val !== undefined) {
                            return obj.slider("value", val * -1)
                        }
                        return Math.abs(obj.slider("value"))
                    }
                    if (val !== undefined) {
                        return obj.slider("value", val)
                    }
                    return obj.slider("value")
                }
            },
            select: {
                create: function(tp_inst, obj, unit, val, min, max, step) {
                    var sel = '<select class="ui-timepicker-select" data-unit="' + unit + '" data-min="' + min + '" data-max="' + max + '" data-step="' + step + '">',
                        ul = tp_inst._defaults.timeFormat.indexOf("t") !== -1 ? "toLowerCase" : "toUpperCase",
                        m = 0;
                    for (var i = min; i <= max; i += step) {
                        sel += '<option value="' + i + '"' + (i == val ? " selected" : "") + ">";
                        if (unit == "hour" && useAmpm(tp_inst._defaults.pickerTimeFormat || tp_inst._defaults.timeFormat)) {
                            sel += $.datepicker.formatTime("hh TT", {
                                hour: i
                            }, tp_inst._defaults)
                        } else {
                            if (unit == "millisec" || i >= 10) {
                                sel += i
                            } else {
                                sel += "0" + i.toString()
                            }
                        }
                        sel += "</option>"
                    }
                    sel += "</select>";
                    obj.children("select").remove();
                    $(sel).appendTo(obj).change(function(e) {
                        tp_inst._onTimeChange();
                        tp_inst._onSelectHandler()
                    });
                    return obj
                },
                options: function(tp_inst, obj, unit, opts, val) {
                    var o = {},
                        $t = obj.children("select");
                    if (typeof(opts) == "string") {
                        if (val === undefined) {
                            return $t.data(opts)
                        }
                        o[opts] = val
                    } else {
                        o = opts
                    }
                    return tp_inst.control.create(tp_inst, obj, $t.data("unit"), $t.val(), o.min || $t.data("min"), o.max || $t.data("max"), o.step || $t.data("step"))
                },
                value: function(tp_inst, obj, unit, val) {
                    var $t = obj.children("select");
                    if (val !== undefined) {
                        return $t.val(val)
                    }
                    return $t.val()
                }
            }
        }
    });
    $.fn.extend({
        timepicker: function(o) {
            o = o || {};
            var tmp_args = Array.prototype.slice.call(arguments);
            if (typeof o == "object") {
                tmp_args[0] = $.extend(o, {
                    timeOnly: true
                })
            }
            return $(this).each(function() {
                $.fn.datetimepicker.apply($(this), tmp_args)
            })
        },
        datetimepicker: function(o) {
            o = o || {};
            var tmp_args = arguments;
            if (typeof(o) == "string") {
                if (o == "getDate") {
                    return $.fn.datepicker.apply($(this[0]), tmp_args)
                } else {
                    return this.each(function() {
                        var $t = $(this);
                        $t.datepicker.apply($t, tmp_args)
                    })
                }
            } else {
                return this.each(function() {
                    var $t = $(this);
                    $t.datepicker($.timepicker._newInst($t, o)._defaults)
                })
            }
        }
    });
    $.datepicker.parseDateTime = function(dateFormat, timeFormat, dateTimeString, dateSettings, timeSettings) {
        var parseRes = parseDateTimeInternal(dateFormat, timeFormat, dateTimeString, dateSettings, timeSettings);
        if (parseRes.timeObj) {
            var t = parseRes.timeObj;
            parseRes.date.setHours(t.hour, t.minute, t.second, t.millisec)
        }
        return parseRes.date
    };
    $.datepicker.parseTime = function(timeFormat, timeString, options) {
        var o = extendRemove(extendRemove({}, $.timepicker._defaults), options || {});
        var strictParse = function(f, s, o) {
            var getPatternAmpm = function(amNames, pmNames) {
                var markers = [];
                if (amNames) {
                    $.merge(markers, amNames)
                }
                if (pmNames) {
                    $.merge(markers, pmNames)
                }
                markers = $.map(markers, function(val) {
                    return val.replace(/[.*+?|()\[\]{}\\]/g, "\\$&")
                });
                return "(" + markers.join("|") + ")?"
            };
            var getFormatPositions = function(timeFormat) {
                var finds = timeFormat.toLowerCase().match(/(h{1,2}|m{1,2}|s{1,2}|l{1}|t{1,2}|z|'.*?')/g),
                    orders = {
                        h: -1,
                        m: -1,
                        s: -1,
                        l: -1,
                        t: -1,
                        z: -1
                    };
                if (finds) {
                    for (var i = 0; i < finds.length; i++) {
                        if (orders[finds[i].toString().charAt(0)] == -1) {
                            orders[finds[i].toString().charAt(0)] = i + 1
                        }
                    }
                }
                return orders
            };
            var regstr = "^" + f.toString().replace(/([hH]{1,2}|mm?|ss?|[tT]{1,2}|[lz]|'.*?')/g, function(match) {
                    switch (match.charAt(0).toLowerCase()) {
                        case "h":
                            return "(\\d?\\d)";
                        case "m":
                            return "(\\d?\\d)";
                        case "s":
                            return "(\\d?\\d)";
                        case "l":
                            return "(\\d?\\d?\\d)";
                        case "z":
                            return "(z|[-+]\\d\\d:?\\d\\d|\\S+)?";
                        case "t":
                            return getPatternAmpm(o.amNames, o.pmNames);
                        default:
                            return "(" + match.replace(/\'/g, "").replace(/(\.|\$|\^|\\|\/|\(|\)|\[|\]|\?|\+|\*)/g, function(m) {
                                return "\\" + m
                            }) + ")?"
                    }
                }).replace(/\s/g, "\\s?") + o.timeSuffix + "$",
                order = getFormatPositions(f),
                ampm = "",
                treg;
            treg = s.match(new RegExp(regstr, "i"));
            var resTime = {
                hour: 0,
                minute: 0,
                second: 0,
                millisec: 0
            };
            if (treg) {
                if (order.t !== -1) {
                    if (treg[order.t] === undefined || treg[order.t].length === 0) {
                        ampm = "";
                        resTime.ampm = ""
                    } else {
                        ampm = $.inArray(treg[order.t].toUpperCase(), o.amNames) !== -1 ? "AM" : "PM";
                        resTime.ampm = o[ampm == "AM" ? "amNames" : "pmNames"][0]
                    }
                }
                if (order.h !== -1) {
                    if (ampm == "AM" && treg[order.h] == "12") {
                        resTime.hour = 0
                    } else {
                        if (ampm == "PM" && treg[order.h] != "12") {
                            resTime.hour = parseInt(treg[order.h], 10) + 12
                        } else {
                            resTime.hour = Number(treg[order.h])
                        }
                    }
                }
                if (order.m !== -1) {
                    resTime.minute = Number(treg[order.m])
                }
                if (order.s !== -1) {
                    resTime.second = Number(treg[order.s])
                }
                if (order.l !== -1) {
                    resTime.millisec = Number(treg[order.l])
                }
                if (order.z !== -1 && treg[order.z] !== undefined) {
                    var tz = treg[order.z].toUpperCase();
                    switch (tz.length) {
                        case 1:
                            tz = o.timezoneIso8601 ? "Z" : "+0000";
                            break;
                        case 5:
                            if (o.timezoneIso8601) {
                                tz = tz.substring(1) == "0000" ? "Z" : tz.substring(0, 3) + ":" + tz.substring(3)
                            }
                            break;
                        case 6:
                            if (!o.timezoneIso8601) {
                                tz = tz == "Z" || tz.substring(1) == "00:00" ? "+0000" : tz.replace(/:/, "")
                            } else {
                                if (tz.substring(1) == "00:00") {
                                    tz = "Z"
                                }
                            }
                            break
                    }
                    resTime.timezone = tz
                }
                return resTime
            }
            return false
        };
        var looseParse = function(f, s, o) {
            try {
                var d = new Date("2012-01-01 " + s);
                return {
                    hour: d.getHours(),
                    minutes: d.getMinutes(),
                    seconds: d.getSeconds(),
                    millisec: d.getMilliseconds(),
                    timezone: $.timepicker.timeZoneOffsetString(d)
                }
            } catch (err) {
                try {
                    return strictParse(f, s, o)
                } catch (err2) {
                    $.datepicker.log("Unable to parse \ntimeString: " + s + "\ntimeFormat: " + f)
                }
            }
            return false
        };
        if (typeof o.parse === "function") {
            return o.parse(timeFormat, timeString, o)
        }
        if (o.parse === "loose") {
            return looseParse(timeFormat, timeString, o)
        }
        return strictParse(timeFormat, timeString, o)
    };
    $.datepicker.formatTime = function(format, time, options) {
        options = options || {};
        options = $.extend({}, $.timepicker._defaults, options);
        time = $.extend({
            hour: 0,
            minute: 0,
            second: 0,
            millisec: 0,
            timezone: "+0000"
        }, time);
        var tmptime = format,
            ampmName = options.amNames[0],
            hour = parseInt(time.hour, 10);
        if (hour > 11) {
            ampmName = options.pmNames[0]
        }
        tmptime = tmptime.replace(/(?:HH?|hh?|mm?|ss?|[tT]{1,2}|[lz]|('.*?'|".*?"))/g, function(match) {
            switch (match) {
                case "HH":
                    return ("0" + hour).slice(-2);
                case "H":
                    return hour;
                case "hh":
                    return ("0" + convert24to12(hour)).slice(-2);
                case "h":
                    return convert24to12(hour);
                case "mm":
                    return ("0" + time.minute).slice(-2);
                case "m":
                    return time.minute;
                case "ss":
                    return ("0" + time.second).slice(-2);
                case "s":
                    return time.second;
                case "l":
                    return ("00" + time.millisec).slice(-3);
                case "z":
                    return time.timezone === null ? options.defaultTimezone : time.timezone;
                case "T":
                    return ampmName.charAt(0).toUpperCase();
                case "TT":
                    return ampmName.toUpperCase();
                case "t":
                    return ampmName.charAt(0).toLowerCase();
                case "tt":
                    return ampmName.toLowerCase();
                default:
                    return match.replace(/\'/g, "") || "'"
            }
        });
        tmptime = $.trim(tmptime);
        return tmptime
    };
    $.datepicker._base_selectDate = $.datepicker._selectDate;
    $.datepicker._selectDate = function(id, dateStr) {
        var inst = this._getInst($(id)[0]),
            tp_inst = this._get(inst, "timepicker");
        if (tp_inst) {
            tp_inst._limitMinMaxDateTime(inst, true);
            inst.inline = inst.stay_open = true;
            this._base_selectDate(id, dateStr);
            inst.inline = inst.stay_open = false;
            this._notifyChange(inst);
            this._updateDatepicker(inst)
        } else {
            this._base_selectDate(id, dateStr)
        }
    };
    $.datepicker._base_updateDatepicker = $.datepicker._updateDatepicker;
    $.datepicker._updateDatepicker = function(inst) {
        var input = inst.input[0];
        if ($.datepicker._curInst && $.datepicker._curInst != inst && $.datepicker._datepickerShowing && $.datepicker._lastInput != input) {
            return
        }
        if (typeof(inst.stay_open) !== "boolean" || inst.stay_open === false) {
            this._base_updateDatepicker(inst);
            var tp_inst = this._get(inst, "timepicker");
            if (tp_inst) {
                tp_inst._addTimePicker(inst);
                if (tp_inst._defaults.useLocalTimezone) {
                    var date = new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay, 12);
                    selectLocalTimeZone(tp_inst, date);
                    tp_inst._onTimeChange()
                }
            }
        }
    };
    $.datepicker._base_doKeyPress = $.datepicker._doKeyPress;
    $.datepicker._doKeyPress = function(event) {
        var inst = $.datepicker._getInst(event.target),
            tp_inst = $.datepicker._get(inst, "timepicker");
        if (tp_inst) {
            if ($.datepicker._get(inst, "constrainInput")) {
                var ampm = useAmpm(tp_inst._defaults.timeFormat),
                    dateChars = $.datepicker._possibleChars($.datepicker._get(inst, "dateFormat")),
                    datetimeChars = tp_inst._defaults.timeFormat.toString().replace(/[hms]/g, "").replace(/TT/g, ampm ? "APM" : "").replace(/Tt/g, ampm ? "AaPpMm" : "").replace(/tT/g, ampm ? "AaPpMm" : "").replace(/T/g, ampm ? "AP" : "").replace(/tt/g, ampm ? "apm" : "").replace(/t/g, ampm ? "ap" : "") + " " + tp_inst._defaults.separator + tp_inst._defaults.timeSuffix + (tp_inst._defaults.showTimezone ? tp_inst._defaults.timezoneList.join("") : "") + (tp_inst._defaults.amNames.join("")) + (tp_inst._defaults.pmNames.join("")) + dateChars,
                    chr = String.fromCharCode(event.charCode === undefined ? event.keyCode : event.charCode);
                return event.ctrlKey || (chr < " " || !dateChars || datetimeChars.indexOf(chr) > -1)
            }
        }
        return $.datepicker._base_doKeyPress(event)
    };
    $.datepicker._base_updateAlternate = $.datepicker._updateAlternate;
    $.datepicker._updateAlternate = function(inst) {
        var tp_inst = this._get(inst, "timepicker");
        if (tp_inst) {
            var altField = tp_inst._defaults.altField;
            if (altField) {
                var altFormat = tp_inst._defaults.altFormat || tp_inst._defaults.dateFormat,
                    date = this._getDate(inst),
                    formatCfg = $.datepicker._getFormatConfig(inst),
                    altFormattedDateTime = "",
                    altSeparator = tp_inst._defaults.altSeparator ? tp_inst._defaults.altSeparator : tp_inst._defaults.separator,
                    altTimeSuffix = tp_inst._defaults.altTimeSuffix ? tp_inst._defaults.altTimeSuffix : tp_inst._defaults.timeSuffix,
                    altTimeFormat = tp_inst._defaults.altTimeFormat !== null ? tp_inst._defaults.altTimeFormat : tp_inst._defaults.timeFormat;
                altFormattedDateTime += $.datepicker.formatTime(altTimeFormat, tp_inst, tp_inst._defaults) + altTimeSuffix;
                if (!tp_inst._defaults.timeOnly && !tp_inst._defaults.altFieldTimeOnly) {
                    if (tp_inst._defaults.altFormat) {
                        altFormattedDateTime = $.datepicker.formatDate(tp_inst._defaults.altFormat, (date === null ? new Date() : date), formatCfg) + altSeparator + altFormattedDateTime
                    } else {
                        altFormattedDateTime = tp_inst.formattedDate + altSeparator + altFormattedDateTime
                    }
                }
                $(altField).val(altFormattedDateTime)
            }
        } else {
            $.datepicker._base_updateAlternate(inst)
        }
    };
    $.datepicker._base_doKeyUp = $.datepicker._doKeyUp;
    $.datepicker._doKeyUp = function(event) {
        var inst = $.datepicker._getInst(event.target),
            tp_inst = $.datepicker._get(inst, "timepicker");
        if (tp_inst) {
            if (tp_inst._defaults.timeOnly && (inst.input.val() != inst.lastVal)) {
                try {
                    $.datepicker._updateDatepicker(inst)
                } catch (err) {
                    $.datepicker.log(err)
                }
            }
        }
        return $.datepicker._base_doKeyUp(event)
    };
    $.datepicker._base_gotoToday = $.datepicker._gotoToday;
    $.datepicker._gotoToday = function(id) {
        var inst = this._getInst($(id)[0]),
            $dp = inst.dpDiv;
        this._base_gotoToday(id);
        var tp_inst = this._get(inst, "timepicker");
        selectLocalTimeZone(tp_inst);
        var now = new Date();
        this._setTime(inst, now);
        $(".ui-datepicker-today", $dp).click()
    };
    $.datepicker._disableTimepickerDatepicker = function(target) {
        var inst = this._getInst(target);
        if (!inst) {
            return
        }
        var tp_inst = this._get(inst, "timepicker");
        $(target).datepicker("getDate");
        if (tp_inst) {
            tp_inst._defaults.showTimepicker = false;
            tp_inst._updateDateTime(inst)
        }
    };
    $.datepicker._enableTimepickerDatepicker = function(target) {
        var inst = this._getInst(target);
        if (!inst) {
            return
        }
        var tp_inst = this._get(inst, "timepicker");
        $(target).datepicker("getDate");
        if (tp_inst) {
            tp_inst._defaults.showTimepicker = true;
            tp_inst._addTimePicker(inst);
            tp_inst._updateDateTime(inst)
        }
    };
    $.datepicker._setTime = function(inst, date) {
        var tp_inst = this._get(inst, "timepicker");
        if (tp_inst) {
            var defaults = tp_inst._defaults;
            tp_inst.hour = date ? date.getHours() : defaults.hour;
            tp_inst.minute = date ? date.getMinutes() : defaults.minute;
            tp_inst.second = date ? date.getSeconds() : defaults.second;
            tp_inst.millisec = date ? date.getMilliseconds() : defaults.millisec;
            tp_inst._limitMinMaxDateTime(inst, true);
            tp_inst._onTimeChange();
            tp_inst._updateDateTime(inst)
        }
    };
    $.datepicker._setTimeDatepicker = function(target, date, withDate) {
        var inst = this._getInst(target);
        if (!inst) {
            return
        }
        var tp_inst = this._get(inst, "timepicker");
        if (tp_inst) {
            this._setDateFromField(inst);
            var tp_date;
            if (date) {
                if (typeof date == "string") {
                    tp_inst._parseTime(date, withDate);
                    tp_date = new Date();
                    tp_date.setHours(tp_inst.hour, tp_inst.minute, tp_inst.second, tp_inst.millisec)
                } else {
                    tp_date = new Date(date.getTime())
                }
                if (tp_date.toString() == "Invalid Date") {
                    tp_date = undefined
                }
                this._setTime(inst, tp_date)
            }
        }
    };
    $.datepicker._base_setDateDatepicker = $.datepicker._setDateDatepicker;
    $.datepicker._setDateDatepicker = function(target, date) {
        var inst = this._getInst(target);
        if (!inst) {
            return
        }
        var tp_date = (date instanceof Date) ? new Date(date.getTime()) : date;
        this._updateDatepicker(inst);
        this._base_setDateDatepicker.apply(this, arguments);
        this._setTimeDatepicker(target, tp_date, true)
    };
    $.datepicker._base_getDateDatepicker = $.datepicker._getDateDatepicker;
    $.datepicker._getDateDatepicker = function(target, noDefault) {
        var inst = this._getInst(target);
        if (!inst) {
            return
        }
        var tp_inst = this._get(inst, "timepicker");
        if (tp_inst) {
            if (inst.lastVal === undefined) {
                this._setDateFromField(inst, noDefault)
            }
            var date = this._getDate(inst);
            if (date && tp_inst._parseTime($(target).val(), tp_inst.timeOnly)) {
                date.setHours(tp_inst.hour, tp_inst.minute, tp_inst.second, tp_inst.millisec)
            }
            return date
        }
        return this._base_getDateDatepicker(target, noDefault)
    };
    $.datepicker._base_parseDate = $.datepicker.parseDate;
    $.datepicker.parseDate = function(format, value, settings) {
        var date;
        try {
            date = this._base_parseDate(format, value, settings)
        } catch (err) {
            date = this._base_parseDate(format, value.substring(0, value.length - (err.length - err.indexOf(":") - 2)), settings);
            $.datepicker.log("Error parsing the date string: " + err + "\ndate string = " + value + "\ndate format = " + format)
        }
        return date
    };
    $.datepicker._base_formatDate = $.datepicker._formatDate;
    $.datepicker._formatDate = function(inst, day, month, year) {
        var tp_inst = this._get(inst, "timepicker");
        if (tp_inst) {
            tp_inst._updateDateTime(inst);
            return tp_inst.$input.val()
        }
        return this._base_formatDate(inst)
    };
    $.datepicker._base_optionDatepicker = $.datepicker._optionDatepicker;
    $.datepicker._optionDatepicker = function(target, name, value) {
        var inst = this._getInst(target),
            name_clone;
        if (!inst) {
            return null
        }
        var tp_inst = this._get(inst, "timepicker");
        if (tp_inst) {
            var min = null,
                max = null,
                onselect = null,
                overrides = tp_inst._defaults.evnts,
                fns = {},
                prop;
            if (typeof name == "string") {
                if (name === "minDate" || name === "minDateTime") {
                    min = value
                } else {
                    if (name === "maxDate" || name === "maxDateTime") {
                        max = value
                    } else {
                        if (name === "onSelect") {
                            onselect = value
                        } else {
                            if (overrides.hasOwnProperty(name)) {
                                if (typeof(value) === "undefined") {
                                    return overrides[name]
                                }
                                fns[name] = value;
                                name_clone = {}
                            }
                        }
                    }
                }
            } else {
                if (typeof name == "object") {
                    if (name.minDate) {
                        min = name.minDate
                    } else {
                        if (name.minDateTime) {
                            min = name.minDateTime
                        } else {
                            if (name.maxDate) {
                                max = name.maxDate
                            } else {
                                if (name.maxDateTime) {
                                    max = name.maxDateTime
                                }
                            }
                        }
                    }
                    for (prop in overrides) {
                        if (overrides.hasOwnProperty(prop) && name[prop]) {
                            fns[prop] = name[prop]
                        }
                    }
                }
            }
            for (prop in fns) {
                if (fns.hasOwnProperty(prop)) {
                    overrides[prop] = fns[prop];
                    if (!name_clone) {
                        name_clone = $.extend({}, name)
                    }
                    delete name_clone[prop]
                }
            }
            if (name_clone && isEmptyObject(name_clone)) {
                return
            }
            if (min) {
                if (min === 0) {
                    min = new Date()
                } else {
                    min = new Date(min)
                }
                tp_inst._defaults.minDate = min;
                tp_inst._defaults.minDateTime = min
            } else {
                if (max) {
                    if (max === 0) {
                        max = new Date()
                    } else {
                        max = new Date(max)
                    }
                    tp_inst._defaults.maxDate = max;
                    tp_inst._defaults.maxDateTime = max
                } else {
                    if (onselect) {
                        tp_inst._defaults.onSelect = onselect
                    }
                }
            }
        }
        if (value === undefined) {
            return this._base_optionDatepicker.call($.datepicker, target, name)
        }
        return this._base_optionDatepicker.call($.datepicker, target, name_clone || name, value)
    };
    var isEmptyObject = function(obj) {
        var prop;
        for (prop in obj) {
            if (obj.hasOwnProperty(obj)) {
                return false
            }
        }
        return true
    };
    var extendRemove = function(target, props) {
        $.extend(target, props);
        for (var name in props) {
            if (props[name] === null || props[name] === undefined) {
                target[name] = props[name]
            }
        }
        return target
    };
    var useAmpm = function(timeFormat) {
        return (timeFormat.indexOf("t") !== -1 && timeFormat.indexOf("h") !== -1)
    };
    var convert24to12 = function(hour) {
        if (hour > 12) {
            hour = hour - 12
        }
        if (hour == 0) {
            hour = 12
        }
        return String(hour)
    };
    var splitDateTime = function(dateFormat, dateTimeString, dateSettings, timeSettings) {
        try {
            var separator = timeSettings && timeSettings.separator ? timeSettings.separator : $.timepicker._defaults.separator,
                format = timeSettings && timeSettings.timeFormat ? timeSettings.timeFormat : $.timepicker._defaults.timeFormat,
                timeParts = format.split(separator),
                timePartsLen = timeParts.length,
                allParts = dateTimeString.split(separator),
                allPartsLen = allParts.length;
            if (allPartsLen > 1) {
                return [allParts.splice(0, allPartsLen - timePartsLen).join(separator), allParts.splice(0, timePartsLen).join(separator)]
            }
        } catch (err) {
            $.datepicker.log("Could not split the date from the time. Please check the following datetimepicker options\nthrown error: " + err + "\ndateTimeString" + dateTimeString + "\ndateFormat = " + dateFormat + "\nseparator = " + timeSettings.separator + "\ntimeFormat = " + timeSettings.timeFormat);
            if (err.indexOf(":") >= 0) {
                var dateStringLength = dateTimeString.length - (err.length - err.indexOf(":") - 2),
                    timeString = dateTimeString.substring(dateStringLength);
                return [$.trim(dateTimeString.substring(0, dateStringLength)), $.trim(dateTimeString.substring(dateStringLength))]
            } else {
                throw err
            }
        }
        return [dateTimeString, ""]
    };
    var parseDateTimeInternal = function(dateFormat, timeFormat, dateTimeString, dateSettings, timeSettings) {
        var date;
        var splitRes = splitDateTime(dateFormat, dateTimeString, dateSettings, timeSettings);
        date = $.datepicker._base_parseDate(dateFormat, splitRes[0], dateSettings);
        if (splitRes[1] !== "") {
            var timeString = splitRes[1],
                parsedTime = $.datepicker.parseTime(timeFormat, timeString, timeSettings);
            if (parsedTime === null) {
                throw "Wrong time format"
            }
            return {
                date: date,
                timeObj: parsedTime
            }
        } else {
            return {
                date: date
            }
        }
    };
    var selectLocalTimeZone = function(tp_inst, date) {
        if (tp_inst && tp_inst.timezone_select) {
            tp_inst._defaults.useLocalTimezone = true;
            var now = typeof date !== "undefined" ? date : new Date();
            var tzoffset = $.timepicker.timeZoneOffsetString(now);
            if (tp_inst._defaults.timezoneIso8601) {
                tzoffset = tzoffset.substring(0, 3) + ":" + tzoffset.substring(3)
            }
            tp_inst.timezone_select.val(tzoffset)
        }
    };
    $.timepicker = new Timepicker();
    $.timepicker.timeZoneOffsetString = function(date) {
        var off = date.getTimezoneOffset() * -1,
            minutes = off % 60,
            hours = (off - minutes) / 60;
        return (off >= 0 ? "+" : "-") + ("0" + (hours * 101).toString()).substr(-2) + ("0" + (minutes * 101).toString()).substr(-2)
    };
    $.timepicker.timeRange = function(startTime, endTime, options) {
        return $.timepicker.handleRange("timepicker", startTime, endTime, options)
    };
    $.timepicker.dateTimeRange = function(startTime, endTime, options) {
        $.timepicker.dateRange(startTime, endTime, options, "datetimepicker")
    };
    $.timepicker.dateRange = function(startTime, endTime, options, method) {
        method = method || "datepicker";
        $.timepicker.handleRange(method, startTime, endTime, options)
    };
    $.timepicker.handleRange = function(method, startTime, endTime, options) {
        $.fn[method].call(startTime, $.extend({
            onClose: function(dateText, inst) {
                checkDates(this, endTime, dateText)
            },
            onSelect: function(selectedDateTime) {
                selected(this, endTime, "minDate")
            }
        }, options, options.start));
        $.fn[method].call(endTime, $.extend({
            onClose: function(dateText, inst) {
                checkDates(this, startTime, dateText)
            },
            onSelect: function(selectedDateTime) {
                selected(this, startTime, "maxDate")
            }
        }, options, options.end));
        if (method != "timepicker" && options.reformat) {
            $([startTime, endTime]).each(function() {
                var format = $(this)[method].call($(this), "option", "dateFormat"),
                    date = new Date($(this).val());
                if ($(this).val() && date) {
                    $(this).val($.datepicker.formatDate(format, date))
                }
            })
        }
        checkDates(startTime, endTime, startTime.val());

        function checkDates(changed, other, dateText) {
            if (other.val() && (new Date(startTime.val()) > new Date(endTime.val()))) {
                other.val(dateText)
            }
        }
        selected(startTime, endTime, "minDate");
        selected(endTime, startTime, "maxDate");

        function selected(changed, other, option) {
            if (!$(changed).val()) {
                return
            }
            var date = $(changed)[method].call($(changed), "getDate");
            if (date.getTime) {
                $(other)[method].call($(other), "option", option, date)
            }
        }
        return $([startTime.get(0), endTime.get(0)])
    };
    $.timepicker.version = "1.1.1"
})(jQuery);
jQuery.cookie = function(d, e, b) {
    if (arguments.length > 1 && (e === null || typeof e !== "object")) {
        b = jQuery.extend({}, b);
        if (e === null) {
            b.expires = -1
        }
        if (typeof b.expires === "number") {
            var g = b.expires,
                c = b.expires = new Date();
            c.setDate(c.getDate() + g)
        }
        return (document.cookie = [encodeURIComponent(d), "=", b.raw ? String(e) : encodeURIComponent(String(e)), b.expires ? "; expires=" + b.expires.toUTCString() : "", b.path ? "; path=" + b.path : "", b.domain ? "; domain=" + b.domain : "", b.secure ? "; secure" : ""].join(""))
    }
    b = e || {};
    var a, f = b.raw ? function(h) {
        return h
    } : decodeURIComponent;
    return (a = new RegExp("(?:^|; )" + encodeURIComponent(d) + "=([^;]*)").exec(document.cookie)) ? f(a[1]) : null
};
/* Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 * 
 * Requires: 1.2.2+
 */
(function(d) {
    var b = ["DOMMouseScroll", "mousewheel"];
    if (d.event.fixHooks) {
        for (var a = b.length; a;) {
            d.event.fixHooks[b[--a]] = d.event.mouseHooks
        }
    }
    d.event.special.mousewheel = {
        setup: function() {
            if (this.addEventListener) {
                for (var e = b.length; e;) {
                    this.addEventListener(b[--e], c, false)
                }
            } else {
                this.onmousewheel = c
            }
        },
        teardown: function() {
            if (this.removeEventListener) {
                for (var e = b.length; e;) {
                    this.removeEventListener(b[--e], c, false)
                }
            } else {
                this.onmousewheel = null
            }
        }
    };
    d.fn.extend({
        mousewheel: function(e) {
            return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
        },
        unmousewheel: function(e) {
            return this.unbind("mousewheel", e)
        }
    });

    function c(j) {
        var h = j || window.event,
            g = [].slice.call(arguments, 1),
            k = 0,
            i = true,
            f = 0,
            e = 0;
        j = d.event.fix(h);
        j.type = "mousewheel";
        if (h.wheelDelta) {
            k = h.wheelDelta / 120
        }
        if (h.detail) {
            k = -h.detail / 3
        }
        e = k;
        if (h.axis !== undefined && h.axis === h.HORIZONTAL_AXIS) {
            e = 0;
            f = -1 * k
        }
        if (h.wheelDeltaY !== undefined) {
            e = h.wheelDeltaY / 120
        }
        if (h.wheelDeltaX !== undefined) {
            f = -1 * h.wheelDeltaX / 120
        }
        g.unshift(j, k, f, e);
        return (d.event.dispatch || d.event.handle).apply(this, g)
    }
})(jQuery);
(function(c) {
    var a = (c.browser.msie ? "paste" : "input") + ".mask";
    var b = (window.orientation != undefined);
    c.mask = {
        definitions: {
            "9": "[0-9]",
            a: "[A-Za-z]",
            "*": "[A-Za-z0-9]"
        },
        dataName: "rawMaskFn"
    };
    c.fn.extend({
        caret: function(f, d) {
            if (this.length == 0) {
                return
            }
            if (typeof f == "number") {
                d = (typeof d == "number") ? d : f;
                return this.each(function() {
                    if (this.setSelectionRange) {
                        this.setSelectionRange(f, d)
                    } else {
                        if (this.createTextRange) {
                            var g = this.createTextRange();
                            g.collapse(true);
                            g.moveEnd("character", d);
                            g.moveStart("character", f);
                            g.select()
                        }
                    }
                })
            } else {
                if (this[0].setSelectionRange) {
                    f = this[0].selectionStart;
                    d = this[0].selectionEnd
                } else {
                    if (document.selection && document.selection.createRange) {
                        var e = document.selection.createRange();
                        f = 0 - e.duplicate().moveStart("character", -100000);
                        d = f + e.text.length
                    }
                }
                return {
                    begin: f,
                    end: d
                }
            }
        },
        unmask: function() {
            return this.trigger("unmask")
        },
        mask: function(f, j) {
            if (!f && this.length > 0) {
                var g = c(this[0]);
                return g.data(c.mask.dataName)()
            }
            j = c.extend({
                placeholder: "_",
                completed: null
            }, j);
            var e = c.mask.definitions;
            var i = [];
            var k = f.length;
            var h = null;
            var d = f.length;
            c.each(f.split(""), function(l, m) {
                if (m == "?") {
                    d--;
                    k = l
                } else {
                    if (e[m]) {
                        i.push(new RegExp(e[m]));
                        if (h == null) {
                            h = i.length - 1
                        }
                    } else {
                        i.push(null)
                    }
                }
            });
            return this.trigger("unmask").each(function() {
                var u = c(this);
                var p = c.map(f.split(""), function(y, x) {
                    if (y != "?") {
                        return e[y] ? j.placeholder : y
                    }
                });
                var w = u.val();

                function t(x) {
                    while (++x <= d && !i[x]) {}
                    return x
                }

                function q(x) {
                    while (--x >= 0 && !i[x]) {}
                    return x
                }

                function o(A, x) {
                    if (A < 0) {
                        return
                    }
                    for (var z = A, y = t(x); z < d; z++) {
                        if (i[z]) {
                            if (y < d && i[z].test(p[y])) {
                                p[z] = p[y];
                                p[y] = j.placeholder
                            } else {
                                break
                            }
                            y = t(y)
                        }
                    }
                    s();
                    u.caret(Math.max(h, A))
                }

                function l(B) {
                    for (var z = B, A = j.placeholder; z < d; z++) {
                        if (i[z]) {
                            var x = t(z);
                            var y = p[z];
                            p[z] = A;
                            if (x < d && i[x].test(y)) {
                                A = y
                            } else {
                                break
                            }
                        }
                    }
                }

                function r(A) {
                    var y = A.which;
                    if (y == 8 || y == 46 || (b && y == 127)) {
                        var B = u.caret(),
                            z = B.begin,
                            x = B.end;
                        if (x - z == 0) {
                            z = y != 46 ? q(z) : (x = t(z - 1));
                            x = y == 46 ? t(x) : x
                        }
                        m(z, x);
                        o(z, x - 1);
                        return false
                    } else {
                        if (y == 27) {
                            u.val(w);
                            u.caret(0, n());
                            return false
                        }
                    }
                }

                function v(A) {
                    var x = A.which,
                        C = u.caret();
                    if (A.ctrlKey || A.altKey || A.metaKey || x < 32) {
                        return true
                    } else {
                        if (x) {
                            if (C.end - C.begin != 0) {
                                m(C.begin, C.end);
                                o(C.begin, C.end - 1)
                            }
                            var z = t(C.begin - 1);
                            if (z < d) {
                                var B = String.fromCharCode(x);
                                if (i[z].test(B)) {
                                    l(z);
                                    p[z] = B;
                                    s();
                                    var y = t(z);
                                    u.caret(y);
                                    if (j.completed && y >= d) {
                                        j.completed.call(u)
                                    }
                                }
                            }
                            return false
                        }
                    }
                }

                function m(z, x) {
                    for (var y = z; y < x && y < d; y++) {
                        if (i[y]) {
                            p[y] = j.placeholder
                        }
                    }
                }

                function s() {
                    return u.val(p.join("")).val()
                }

                function n(y) {
                    var C = u.val();
                    var B = -1;
                    for (var x = 0, A = 0; x < d; x++) {
                        if (i[x]) {
                            p[x] = j.placeholder;
                            while (A++ < C.length) {
                                var z = C.charAt(A - 1);
                                if (i[x].test(z)) {
                                    p[x] = z;
                                    B = x;
                                    break
                                }
                            }
                            if (A > C.length) {
                                break
                            }
                        } else {
                            if (p[x] == C.charAt(A) && x != k) {
                                A++;
                                B = x
                            }
                        }
                    }
                    if (!y && B + 1 < k) {
                        u.val("");
                        m(0, d)
                    } else {
                        if (y || B + 1 >= k) {
                            s();
                            if (!y) {
                                u.val(u.val().substring(0, B + 1))
                            }
                        }
                    }
                    return (k ? x : h)
                }
                u.data(c.mask.dataName, function() {
                    return c.map(p, function(y, x) {
                        return i[x] && y != j.placeholder ? y : null
                    }).join("")
                });
                if (!u.attr("readonly")) {
                    u.one("unmask", function() {
                        u.unbind(".mask").removeData(c.mask.dataName)
                    }).bind("focus.mask", function() {
                        w = u.val();
                        var y = n();
                        s();
                        var x = function() {
                            if (y == f.length) {
                                u.caret(0, y)
                            } else {
                                u.caret(y)
                            }
                        };
                        (c.browser.msie ? x : function() {
                            setTimeout(x, 0)
                        })()
                    }).bind("blur.mask", function() {
                        n();
                        if (u.val() != w) {
                            u.change()
                        }
                    }).bind("keydown.mask", r).bind("keypress.mask", v).bind(a, function() {
                        setTimeout(function() {
                            u.caret(n(true))
                        }, 0)
                    })
                }
                n()
            })
        }
    })
})(jQuery);
(function(c) {
    var l = "undefined";
    var d, g, q, f, b;
    var n, i, m, p;

    function j(s, v) {
        var u = typeof s[v];
        return u === "function" || (!!(u == "object" && s[v])) || u == "unknown"
    }

    function k(s, t) {
        return typeof(s[t]) != l
    }

    function e(s, t) {
        return !!(typeof(s[t]) == "object" && s[t])
    }

    function h(s) {
        if (window.console && window.console.log) {
            window.console.log("TextInputs module for Rangy not supported in your browser. Reason: " + s)
        }
    }

    function o(t, u, s) {
        if (u < 0) {
            u += t.value.length
        }
        if (typeof s == l) {
            s = u
        }
        if (s < 0) {
            s += t.value.length
        }
        return {
            start: u,
            end: s
        }
    }

    function a(t, u, s) {
        return {
            start: u,
            end: s,
            length: s - u,
            text: t.value.slice(u, s)
        }
    }

    function r() {
        return e(document, "body") ? document.body : document.getElementsByTagName("body")[0]
    }
    c(document).ready(function() {
        var t = document.createElement("textarea");
        r().appendChild(t);
        if (k(t, "selectionStart") && k(t, "selectionEnd")) {
            d = function(w) {
                var x = w.selectionStart,
                    v = w.selectionEnd;
                return a(w, x, v)
            };
            g = function(x, v, w) {
                var y = o(x, v, w);
                x.selectionStart = y.start;
                x.selectionEnd = y.end
            };
            p = function(w, v) {
                if (v) {
                    w.selectionEnd = w.selectionStart
                } else {
                    w.selectionStart = w.selectionEnd
                }
            }
        } else {
            if (j(t, "createTextRange") && e(document, "selection") && j(document.selection, "createRange")) {
                d = function(z) {
                    var C = 0,
                        x = 0,
                        B, w, v, A;
                    var y = document.selection.createRange();
                    if (y && y.parentElement() == z) {
                        v = z.value.length;
                        B = z.value.replace(/\r\n/g, "\n");
                        w = z.createTextRange();
                        w.moveToBookmark(y.getBookmark());
                        A = z.createTextRange();
                        A.collapse(false);
                        if (w.compareEndPoints("StartToEnd", A) > -1) {
                            C = x = v
                        } else {
                            C = -w.moveStart("character", -v);
                            C += B.slice(0, C).split("\n").length - 1;
                            if (w.compareEndPoints("EndToEnd", A) > -1) {
                                x = v
                            } else {
                                x = -w.moveEnd("character", -v);
                                x += B.slice(0, x).split("\n").length - 1
                            }
                        }
                    }
                    return a(z, C, x)
                };
                var u = function(v, w) {
                    return w - (v.value.slice(0, w).split("\r\n").length - 1)
                };
                g = function(z, v, y) {
                    var A = o(z, v, y);
                    var x = z.createTextRange();
                    var w = u(z, A.start);
                    x.collapse(true);
                    if (A.start == A.end) {
                        x.move("character", w)
                    } else {
                        x.moveEnd("character", u(z, A.end));
                        x.moveStart("character", w)
                    }
                    x.select()
                };
                p = function(x, w) {
                    var v = document.selection.createRange();
                    v.collapse(w);
                    v.select()
                }
            } else {
                r().removeChild(t);
                h("No means of finding text input caret position");
                return
            }
        }
        r().removeChild(t);
        f = function(w, z, v, x) {
            var y;
            if (z != v) {
                y = w.value;
                w.value = y.slice(0, z) + y.slice(v)
            }
            if (x) {
                g(w, z, z)
            }
        };
        q = function(v) {
            var w = d(v);
            f(v, w.start, w.end, true)
        };
        m = function(v) {
            var w = d(v),
                x;
            if (w.start != w.end) {
                x = v.value;
                v.value = x.slice(0, w.start) + x.slice(w.end)
            }
            g(v, w.start, w.start);
            return w.text
        };
        b = function(w, z, v, x) {
            var y = w.value,
                A;
            w.value = y.slice(0, v) + z + y.slice(v);
            if (x) {
                A = v + z.length;
                g(w, A, A)
            }
        };
        n = function(v, y) {
            var w = d(v),
                x = v.value;
            v.value = x.slice(0, w.start) + y + x.slice(w.end);
            var z = w.start + y.length;
            g(v, z, z)
        };
        i = function(v, y, B) {
            var x = d(v),
                A = v.value;
            v.value = A.slice(0, x.start) + y + x.text + B + A.slice(x.end);
            var z = x.start + y.length;
            var w = z + x.length;
            g(v, z, w)
        };

        function s(v, w) {
            return function() {
                var z = this.jquery ? this[0] : this;
                var A = z.nodeName.toLowerCase();
                if (z.nodeType == 1 && (A == "textarea" || (A == "input" && z.type == "text"))) {
                    var y = [z].concat(Array.prototype.slice.call(arguments));
                    var x = v.apply(this, y);
                    if (!w) {
                        return x
                    }
                }
                if (w) {
                    return this
                }
            }
        }
        c.fn.extend({
            getSelection: s(d, false),
            setSelection: s(g, true),
            collapseSelection: s(p, true),
            deleteSelectedText: s(q, true),
            deleteText: s(f, true),
            extractSelectedText: s(m, false),
            insertText: s(b, true),
            replaceSelectedText: s(n, true),
            surroundSelectedText: s(i, true)
        })
    })
})(jQuery);
$(function() {
    var a = {
        primaryStyles: ["fontFamily", "fontSize", "fontWeight", "fontVariant", "fontStyle", "paddingLeft", "paddingTop", "paddingBottom", "paddingRight", "marginLeft", "marginTop", "marginBottom", "marginRight", "borderLeftColor", "borderTopColor", "borderBottomColor", "borderRightColor", "borderLeftStyle", "borderTopStyle", "borderBottomStyle", "borderRightStyle", "borderLeftWidth", "borderTopWidth", "borderBottomWidth", "borderRightWidth", "line-height", "outline"],
        specificStyle: {
            "word-wrap": "break-word",
            "overflow-x": "hidden",
            "overflow-y": "auto"
        },
        simulator: $('<div id="textarea_simulator"/>').css({
            position: "absolute",
            top: 0,
            left: 0,
            visibility: "hidden"
        }).appendTo(document.body),
        toHtml: function(b) {
            return b.replace(/\n/g, "<br>").split(" ").join('<span style="white-space:prev-wrap">&nbsp;</span>')
        },
        getCaretPosition: function() {
            var c = a,
                n = this,
                g = n[0],
                d = n.offset();
            if ($.browser.msie) {
                g.focus();
                var h = document.selection.createRange();
                $("#hskeywords").val(g.scrollTop);
                return {
                    left: h.boundingLeft - d.left,
                    top: parseInt(h.boundingTop) - d.top + g.scrollTop + document.documentElement.scrollTop + parseInt(n.getComputedStyle("fontSize"))
                }
            }
            c.simulator.empty();
            $.each(c.primaryStyles, function(p, q) {
                n.cloneStyle(c.simulator, q)
            });
            c.simulator.css($.extend({
                width: n.width(),
                height: n.height()
            }, c.specificStyle));
            var l = n.val(),
                e = n.getCursorPosition();
            var f = l.substring(0, e),
                m = l.substring(e);
            var j = $('<span class="before"/>').html(c.toHtml(f)),
                o = $('<span class="focus"/>'),
                b = $('<span class="after"/>').html(c.toHtml(m));
            c.simulator.append(j).append(o).append(b);
            var i = o.offset(),
                k = c.simulator.offset();
            return {
                top: i.top - k.top - g.scrollTop + ($.browser.mozilla ? 0 : parseInt(n.getComputedStyle("fontSize"))),
                left: o[0].offsetLeft - c.simulator[0].offsetLeft - g.scrollLeft
            }
        }
    };
    $.fn.extend({
        getComputedStyle: function(c) {
            if (this.length == 0) {
                return
            }
            var d = this[0];
            var b = this.css(c);
            b = b || ($.browser.msie ? d.currentStyle[c] : document.defaultView.getComputedStyle(d, null)[c]);
            return b
        },
        cloneStyle: function(c, b) {
            var d = this.getComputedStyle(b);
            if (!!d) {
                $(c).css(b, d)
            }
        },
        cloneAllStyle: function(e, d) {
            var c = this[0];
            for (var b in c.style) {
                var f = c.style[b];
                typeof f == "string" || typeof f == "number" ? this.cloneStyle(e, b) : NaN
            }
        },
        getCursorPosition: function() {
            var e = this[0],
                b = 0;
            if ("selectionStart" in e) {
                b = e.selectionStart
            } else {
                if ("selection" in document) {
                    var c = document.selection.createRange();
                    if (parseInt($.browser.version) > 6) {
                        e.focus();
                        var g = document.selection.createRange().text.length;
                        c.moveStart("character", -e.value.length);
                        b = c.text.length - g
                    } else {
                        var h = document.body.createTextRange();
                        h.moveToElementText(e);
                        for (; h.compareEndPoints("StartToStart", c) < 0; b++) {
                            h.moveStart("character", 1)
                        }
                        for (var d = 0; d <= b; d++) {
                            if (e.value.charAt(d) == "\n") {
                                b++
                            }
                        }
                        var f = e.value.split("\n").length - 1;
                        b -= f;
                        return b
                    }
                }
            }
            return b
        },
        getCaretPosition: a.getCaretPosition
    })
});