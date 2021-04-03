!function(t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.Plutchik = e() : t.Plutchik = e()
}(window, function() {
    return function(t) {
        var e = {};
        function r(n) {
            if (e[n])
                return e[n].exports;
            var i = e[n] = {
                i: n,
                l: !1,
                exports: {}
            };
            return t[n].call(i.exports, i, i.exports, r),
            i.l = !0,
            i.exports
        }
        return r.m = t,
        r.c = e,
        r.d = function(t, e, n) {
            r.o(t, e) || Object.defineProperty(t, e, {
                enumerable: !0,
                get: n
            })
        }
        ,
        r.r = function(t) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                value: "Module"
            }),
            Object.defineProperty(t, "__esModule", {
                value: !0
            })
        }
        ,
        r.t = function(t, e) {
            if (1 & e && (t = r(t)),
            8 & e)
                return t;
            if (4 & e && "object" == typeof t && t && t.__esModule)
                return t;
            var n = Object.create(null);
            if (r.r(n),
            Object.defineProperty(n, "default", {
                enumerable: !0,
                value: t
            }),
            2 & e && "string" != typeof t)
                for (var i in t)
                    r.d(n, i, function(e) {
                        return t[e]
                    }
                    .bind(null, i));
            return n
        }
        ,
        r.n = function(t) {
            var e = t && t.__esModule ? function() {
                return t.default
            }
            : function() {
                return t
            }
            ;
            return r.d(e, "a", e),
            e
        }
        ,
        r.o = function(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }
        ,
        r.p = "",
        r(r.s = 22)
    }([function(t, e, r) {
        "use strict";
        var n = r(13)
          , i = r(14)
          , s = r(3)
          , o = r(8)
          , c = r(4)
          , u = r(15)
          , a = function() {
            function t(t) {
                this.closed = !1,
                this._parent = null,
                this._parents = null,
                this._subscriptions = null,
                t && (this._unsubscribe = t)
            }
            var e;
            return t.prototype.unsubscribe = function() {
                var t, e = !1;
                if (!this.closed) {
                    var r = this._parent
                      , a = this._parents
                      , l = this._unsubscribe
                      , p = this._subscriptions;
                    this.closed = !0,
                    this._parent = null,
                    this._parents = null,
                    this._subscriptions = null;
                    for (var b = -1, f = a ? a.length : 0; r; )
                        r.remove(this),
                        r = ++b < f && a[b] || null;
                    if (s.isFunction(l))
                        o.tryCatch(l).call(this) === c.errorObject && (e = !0,
                        t = t || (c.errorObject.e instanceof u.UnsubscriptionError ? h(c.errorObject.e.errors) : [c.errorObject.e]));
                    if (n.isArray(p))
                        for (b = -1,
                        f = p.length; ++b < f; ) {
                            var d = p[b];
                            if (i.isObject(d))
                                if (o.tryCatch(d.unsubscribe).call(d) === c.errorObject) {
                                    e = !0,
                                    t = t || [];
                                    var y = c.errorObject.e;
                                    y instanceof u.UnsubscriptionError ? t = t.concat(h(y.errors)) : t.push(y)
                                }
                        }
                    if (e)
                        throw new u.UnsubscriptionError(t)
                }
            }
            ,
            t.prototype.add = function(e) {
                if (!e || e === t.EMPTY)
                    return t.EMPTY;
                if (e === this)
                    return this;
                var r = e;
                switch (typeof e) {
                case "function":
                    r = new t(e);
                case "object":
                    if (r.closed || "function" != typeof r.unsubscribe)
                        return r;
                    if (this.closed)
                        return r.unsubscribe(),
                        r;
                    if ("function" != typeof r._addParent) {
                        var n = r;
                        (r = new t)._subscriptions = [n]
                    }
                    break;
                default:
                    throw new Error("unrecognized teardown " + e + " added to Subscription.")
                }
                return (this._subscriptions || (this._subscriptions = [])).push(r),
                r._addParent(this),
                r
            }
            ,
            t.prototype.remove = function(t) {
                var e = this._subscriptions;
                if (e) {
                    var r = e.indexOf(t);
                    -1 !== r && e.splice(r, 1)
                }
            }
            ,
            t.prototype._addParent = function(t) {
                var e = this._parent
                  , r = this._parents;
                e && e !== t ? r ? -1 === r.indexOf(t) && r.push(t) : this._parents = [t] : this._parent = t
            }
            ,
            t.EMPTY = ((e = new t).closed = !0,
            e),
            t
        }();
        function h(t) {
            return t.reduce(function(t, e) {
                return t.concat(e instanceof u.UnsubscriptionError ? e.errors : e)
            }, [])
        }
        e.Subscription = a
    }
    , function(t, e, r) {
        "use strict";
        var n = this && this.__extends || function(t, e) {
            for (var r in e)
                e.hasOwnProperty(r) && (t[r] = e[r]);
            function n() {
                this.constructor = t
            }
            t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
            new n)
        }
          , i = r(6)
          , s = r(7)
          , o = r(0)
          , c = r(19)
          , u = r(20)
          , a = r(5)
          , h = function(t) {
            function e(e) {
                t.call(this, e),
                this.destination = e
            }
            return n(e, t),
            e
        }(s.Subscriber);
        e.SubjectSubscriber = h;
        var l = function(t) {
            function e() {
                t.call(this),
                this.observers = [],
                this.closed = !1,
                this.isStopped = !1,
                this.hasError = !1,
                this.thrownError = null
            }
            return n(e, t),
            e.prototype[a.rxSubscriber] = function() {
                return new h(this)
            }
            ,
            e.prototype.lift = function(t) {
                var e = new p(this,this);
                return e.operator = t,
                e
            }
            ,
            e.prototype.next = function(t) {
                if (this.closed)
                    throw new c.ObjectUnsubscribedError;
                if (!this.isStopped)
                    for (var e = this.observers, r = e.length, n = e.slice(), i = 0; i < r; i++)
                        n[i].next(t)
            }
            ,
            e.prototype.error = function(t) {
                if (this.closed)
                    throw new c.ObjectUnsubscribedError;
                this.hasError = !0,
                this.thrownError = t,
                this.isStopped = !0;
                for (var e = this.observers, r = e.length, n = e.slice(), i = 0; i < r; i++)
                    n[i].error(t);
                this.observers.length = 0
            }
            ,
            e.prototype.complete = function() {
                if (this.closed)
                    throw new c.ObjectUnsubscribedError;
                this.isStopped = !0;
                for (var t = this.observers, e = t.length, r = t.slice(), n = 0; n < e; n++)
                    r[n].complete();
                this.observers.length = 0
            }
            ,
            e.prototype.unsubscribe = function() {
                this.isStopped = !0,
                this.closed = !0,
                this.observers = null
            }
            ,
            e.prototype._trySubscribe = function(e) {
                if (this.closed)
                    throw new c.ObjectUnsubscribedError;
                return t.prototype._trySubscribe.call(this, e)
            }
            ,
            e.prototype._subscribe = function(t) {
                if (this.closed)
                    throw new c.ObjectUnsubscribedError;
                return this.hasError ? (t.error(this.thrownError),
                o.Subscription.EMPTY) : this.isStopped ? (t.complete(),
                o.Subscription.EMPTY) : (this.observers.push(t),
                new u.SubjectSubscription(this,t))
            }
            ,
            e.prototype.asObservable = function() {
                var t = new i.Observable;
                return t.source = this,
                t
            }
            ,
            e.create = function(t, e) {
                return new p(t,e)
            }
            ,
            e
        }(i.Observable);
        e.Subject = l;
        var p = function(t) {
            function e(e, r) {
                t.call(this),
                this.destination = e,
                this.source = r
            }
            return n(e, t),
            e.prototype.next = function(t) {
                var e = this.destination;
                e && e.next && e.next(t)
            }
            ,
            e.prototype.error = function(t) {
                var e = this.destination;
                e && e.error && this.destination.error(t)
            }
            ,
            e.prototype.complete = function() {
                var t = this.destination;
                t && t.complete && this.destination.complete()
            }
            ,
            e.prototype._subscribe = function(t) {
                return this.source ? this.source.subscribe(t) : o.Subscription.EMPTY
            }
            ,
            e
        }(l);
        e.AnonymousSubject = p
    }
    , function(t, e, r) {
        "use strict";
        (function(t) {
            var r = "undefined" != typeof window && window
              , n = "undefined" != typeof self && "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope && self
              , i = r || void 0 !== t && t || n;
            e.root = i,
            function() {
                if (!i)
                    throw new Error("RxJS could not find any global context (window, self, global)")
            }()
        }
        ).call(this, r(11))
    }
    , function(t, e, r) {
        "use strict";
        e.isFunction = function(t) {
            return "function" == typeof t
        }
    }
    , function(t, e, r) {
        "use strict";
        e.errorObject = {
            e: {}
        }
    }
    , function(t, e, r) {
        "use strict";
        var n = r(2).root.Symbol;
        e.rxSubscriber = "function" == typeof n && "function" == typeof n.for ? n.for("rxSubscriber") : "@@rxSubscriber",
        e.$$rxSubscriber = e.rxSubscriber
    }
    , function(t, e, r) {
        "use strict";
        var n = r(2)
          , i = r(12)
          , s = r(16)
          , o = r(17)
          , c = function() {
            function t(t) {
                this._isScalar = !1,
                t && (this._subscribe = t)
            }
            return t.prototype.lift = function(e) {
                var r = new t;
                return r.source = this,
                r.operator = e,
                r
            }
            ,
            t.prototype.subscribe = function(t, e, r) {
                var n = this.operator
                  , s = i.toSubscriber(t, e, r);
                if (n ? n.call(s, this.source) : s.add(this.source || !s.syncErrorThrowable ? this._subscribe(s) : this._trySubscribe(s)),
                s.syncErrorThrowable && (s.syncErrorThrowable = !1,
                s.syncErrorThrown))
                    throw s.syncErrorValue;
                return s
            }
            ,
            t.prototype._trySubscribe = function(t) {
                try {
                    return this._subscribe(t)
                } catch (e) {
                    t.syncErrorThrown = !0,
                    t.syncErrorValue = e,
                    t.error(e)
                }
            }
            ,
            t.prototype.forEach = function(t, e) {
                var r = this;
                if (e || (n.root.Rx && n.root.Rx.config && n.root.Rx.config.Promise ? e = n.root.Rx.config.Promise : n.root.Promise && (e = n.root.Promise)),
                !e)
                    throw new Error("no Promise impl found");
                return new e(function(e, n) {
                    var i;
                    i = r.subscribe(function(e) {
                        if (i)
                            try {
                                t(e)
                            } catch (t) {
                                n(t),
                                i.unsubscribe()
                            }
                        else
                            t(e)
                    }, n, e)
                }
                )
            }
            ,
            t.prototype._subscribe = function(t) {
                return this.source.subscribe(t)
            }
            ,
            t.prototype[s.observable] = function() {
                return this
            }
            ,
            t.prototype.pipe = function() {
                for (var t = [], e = 0; e < arguments.length; e++)
                    t[e - 0] = arguments[e];
                return 0 === t.length ? this : o.pipeFromArray(t)(this)
            }
            ,
            t.prototype.toPromise = function(t) {
                var e = this;
                if (t || (n.root.Rx && n.root.Rx.config && n.root.Rx.config.Promise ? t = n.root.Rx.config.Promise : n.root.Promise && (t = n.root.Promise)),
                !t)
                    throw new Error("no Promise impl found");
                return new t(function(t, r) {
                    var n;
                    e.subscribe(function(t) {
                        return n = t
                    }, function(t) {
                        return r(t)
                    }, function() {
                        return t(n)
                    })
                }
                )
            }
            ,
            t.create = function(e) {
                return new t(e)
            }
            ,
            t
        }();
        e.Observable = c
    }
    , function(t, e, r) {
        "use strict";
        var n = this && this.__extends || function(t, e) {
            for (var r in e)
                e.hasOwnProperty(r) && (t[r] = e[r]);
            function n() {
                this.constructor = t
            }
            t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
            new n)
        }
          , i = r(3)
          , s = r(0)
          , o = r(9)
          , c = r(5)
          , u = function(t) {
            function e(e, r, n) {
                switch (t.call(this),
                this.syncErrorValue = null,
                this.syncErrorThrown = !1,
                this.syncErrorThrowable = !1,
                this.isStopped = !1,
                arguments.length) {
                case 0:
                    this.destination = o.empty;
                    break;
                case 1:
                    if (!e) {
                        this.destination = o.empty;
                        break
                    }
                    if ("object" == typeof e) {
                        if (h(e)) {
                            var i = e[c.rxSubscriber]();
                            this.syncErrorThrowable = i.syncErrorThrowable,
                            this.destination = i,
                            i.add(this)
                        } else
                            this.syncErrorThrowable = !0,
                            this.destination = new a(this,e);
                        break
                    }
                default:
                    this.syncErrorThrowable = !0,
                    this.destination = new a(this,e,r,n)
                }
            }
            return n(e, t),
            e.prototype[c.rxSubscriber] = function() {
                return this
            }
            ,
            e.create = function(t, r, n) {
                var i = new e(t,r,n);
                return i.syncErrorThrowable = !1,
                i
            }
            ,
            e.prototype.next = function(t) {
                this.isStopped || this._next(t)
            }
            ,
            e.prototype.error = function(t) {
                this.isStopped || (this.isStopped = !0,
                this._error(t))
            }
            ,
            e.prototype.complete = function() {
                this.isStopped || (this.isStopped = !0,
                this._complete())
            }
            ,
            e.prototype.unsubscribe = function() {
                this.closed || (this.isStopped = !0,
                t.prototype.unsubscribe.call(this))
            }
            ,
            e.prototype._next = function(t) {
                this.destination.next(t)
            }
            ,
            e.prototype._error = function(t) {
                this.destination.error(t),
                this.unsubscribe()
            }
            ,
            e.prototype._complete = function() {
                this.destination.complete(),
                this.unsubscribe()
            }
            ,
            e.prototype._unsubscribeAndRecycle = function() {
                var t = this._parent
                  , e = this._parents;
                return this._parent = null,
                this._parents = null,
                this.unsubscribe(),
                this.closed = !1,
                this.isStopped = !1,
                this._parent = t,
                this._parents = e,
                this
            }
            ,
            e
        }(s.Subscription);
        e.Subscriber = u;
        var a = function(t) {
            function e(e, r, n, s) {
                var c;
                t.call(this),
                this._parentSubscriber = e;
                var u = this;
                i.isFunction(r) ? c = r : r && (c = r.next,
                n = r.error,
                s = r.complete,
                r !== o.empty && (u = Object.create(r),
                i.isFunction(u.unsubscribe) && this.add(u.unsubscribe.bind(u)),
                u.unsubscribe = this.unsubscribe.bind(this))),
                this._context = u,
                this._next = c,
                this._error = n,
                this._complete = s
            }
            return n(e, t),
            e.prototype.next = function(t) {
                if (!this.isStopped && this._next) {
                    var e = this._parentSubscriber;
                    e.syncErrorThrowable ? this.__tryOrSetError(e, this._next, t) && this.unsubscribe() : this.__tryOrUnsub(this._next, t)
                }
            }
            ,
            e.prototype.error = function(t) {
                if (!this.isStopped) {
                    var e = this._parentSubscriber;
                    if (this._error)
                        e.syncErrorThrowable ? (this.__tryOrSetError(e, this._error, t),
                        this.unsubscribe()) : (this.__tryOrUnsub(this._error, t),
                        this.unsubscribe());
                    else {
                        if (!e.syncErrorThrowable)
                            throw this.unsubscribe(),
                            t;
                        e.syncErrorValue = t,
                        e.syncErrorThrown = !0,
                        this.unsubscribe()
                    }
                }
            }
            ,
            e.prototype.complete = function() {
                var t = this;
                if (!this.isStopped) {
                    var e = this._parentSubscriber;
                    if (this._complete) {
                        var r = function() {
                            return t._complete.call(t._context)
                        };
                        e.syncErrorThrowable ? (this.__tryOrSetError(e, r),
                        this.unsubscribe()) : (this.__tryOrUnsub(r),
                        this.unsubscribe())
                    } else
                        this.unsubscribe()
                }
            }
            ,
            e.prototype.__tryOrUnsub = function(t, e) {
                try {
                    t.call(this._context, e)
                } catch (t) {
                    throw this.unsubscribe(),
                    t
                }
            }
            ,
            e.prototype.__tryOrSetError = function(t, e, r) {
                try {
                    e.call(this._context, r)
                } catch (e) {
                    return t.syncErrorValue = e,
                    t.syncErrorThrown = !0,
                    !0
                }
                return !1
            }
            ,
            e.prototype._unsubscribe = function() {
                var t = this._parentSubscriber;
                this._context = null,
                this._parentSubscriber = null,
                t.unsubscribe()
            }
            ,
            e
        }(u);
        function h(t) {
            return t instanceof u || "syncErrorThrowable"in t && t[c.rxSubscriber]
        }
    }
    , function(t, e, r) {
        "use strict";
        var n, i = r(4);
        function s() {
            try {
                return n.apply(this, arguments)
            } catch (t) {
                return i.errorObject.e = t,
                i.errorObject
            }
        }
        e.tryCatch = function(t) {
            return n = t,
            s
        }
    }
    , function(t, e, r) {
        "use strict";
        e.empty = {
            closed: !0,
            next: function(t) {},
            error: function(t) {
                throw t
            },
            complete: function() {}
        }
    }
    , function(t, e, r) {
        "use strict";
        var n = r(21);
        e.fromEvent = n.FromEventObservable.create
    }
    , function(t, e) {
        var r;
        r = function() {
            return this
        }();
        try {
            r = r || new Function("return this")()
        } catch (t) {
            "object" == typeof window && (r = window)
        }
        t.exports = r
    }
    , function(t, e, r) {
        "use strict";
        var n = r(7)
          , i = r(5)
          , s = r(9);
        e.toSubscriber = function(t, e, r) {
            if (t) {
                if (t instanceof n.Subscriber)
                    return t;
                if (t[i.rxSubscriber])
                    return t[i.rxSubscriber]()
            }
            return t || e || r ? new n.Subscriber(t,e,r) : new n.Subscriber(s.empty)
        }
    }
    , function(t, e, r) {
        "use strict";
        e.isArray = Array.isArray || function(t) {
            return t && "number" == typeof t.length
        }
    }
    , function(t, e, r) {
        "use strict";
        e.isObject = function(t) {
            return null != t && "object" == typeof t
        }
    }
    , function(t, e, r) {
        "use strict";
        var n = this && this.__extends || function(t, e) {
            for (var r in e)
                e.hasOwnProperty(r) && (t[r] = e[r]);
            function n() {
                this.constructor = t
            }
            t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
            new n)
        }
          , i = function(t) {
            function e(e) {
                t.call(this),
                this.errors = e;
                var r = Error.call(this, e ? e.length + " errors occurred during unsubscription:\n  " + e.map(function(t, e) {
                    return e + 1 + ") " + t.toString()
                }).join("\n  ") : "");
                this.name = r.name = "UnsubscriptionError",
                this.stack = r.stack,
                this.message = r.message
            }
            return n(e, t),
            e
        }(Error);
        e.UnsubscriptionError = i
    }
    , function(t, e, r) {
        "use strict";
        var n = r(2);
        function i(t) {
            var e, r = t.Symbol;
            return "function" == typeof r ? r.observable ? e = r.observable : (e = r("observable"),
            r.observable = e) : e = "@@observable",
            e
        }
        e.getSymbolObservable = i,
        e.observable = i(n.root),
        e.$$observable = e.observable
    }
    , function(t, e, r) {
        "use strict";
        var n = r(18);
        function i(t) {
            return t ? 1 === t.length ? t[0] : function(e) {
                return t.reduce(function(t, e) {
                    return e(t)
                }, e)
            }
            : n.noop
        }
        e.pipe = function() {
            for (var t = [], e = 0; e < arguments.length; e++)
                t[e - 0] = arguments[e];
            return i(t)
        }
        ,
        e.pipeFromArray = i
    }
    , function(t, e, r) {
        "use strict";
        e.noop = function() {}
    }
    , function(t, e, r) {
        "use strict";
        var n = this && this.__extends || function(t, e) {
            for (var r in e)
                e.hasOwnProperty(r) && (t[r] = e[r]);
            function n() {
                this.constructor = t
            }
            t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
            new n)
        }
          , i = function(t) {
            function e() {
                var e = t.call(this, "object unsubscribed");
                this.name = e.name = "ObjectUnsubscribedError",
                this.stack = e.stack,
                this.message = e.message
            }
            return n(e, t),
            e
        }(Error);
        e.ObjectUnsubscribedError = i
    }
    , function(t, e, r) {
        "use strict";
        var n = this && this.__extends || function(t, e) {
            for (var r in e)
                e.hasOwnProperty(r) && (t[r] = e[r]);
            function n() {
                this.constructor = t
            }
            t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
            new n)
        }
          , i = function(t) {
            function e(e, r) {
                t.call(this),
                this.subject = e,
                this.subscriber = r,
                this.closed = !1
            }
            return n(e, t),
            e.prototype.unsubscribe = function() {
                if (!this.closed) {
                    this.closed = !0;
                    var t = this.subject
                      , e = t.observers;
                    if (this.subject = null,
                    e && 0 !== e.length && !t.isStopped && !t.closed) {
                        var r = e.indexOf(this.subscriber);
                        -1 !== r && e.splice(r, 1)
                    }
                }
            }
            ,
            e
        }(r(0).Subscription);
        e.SubjectSubscription = i
    }
    , function(t, e, r) {
        "use strict";
        var n = this && this.__extends || function(t, e) {
            for (var r in e)
                e.hasOwnProperty(r) && (t[r] = e[r]);
            function n() {
                this.constructor = t
            }
            t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
            new n)
        }
          , i = r(6)
          , s = r(8)
          , o = r(3)
          , c = r(4)
          , u = r(0)
          , a = Object.prototype.toString;
        var h = function(t) {
            function e(e, r, n, i) {
                t.call(this),
                this.sourceObj = e,
                this.eventName = r,
                this.selector = n,
                this.options = i
            }
            return n(e, t),
            e.create = function(t, r, n, i) {
                return o.isFunction(n) && (i = n,
                n = void 0),
                new e(t,r,i,n)
            }
            ,
            e.setupSubscription = function(t, r, n, i, s) {
                var o;
                if (function(t) {
                    return !!t && "[object NodeList]" === a.call(t)
                }(t) || function(t) {
                    return !!t && "[object HTMLCollection]" === a.call(t)
                }(t))
                    for (var c = 0, h = t.length; c < h; c++)
                        e.setupSubscription(t[c], r, n, i, s);
                else if (function(t) {
                    return !!t && "function" == typeof t.addEventListener && "function" == typeof t.removeEventListener
                }(t)) {
                    var l = t;
                    t.addEventListener(r, n, s),
                    o = function() {
                        return l.removeEventListener(r, n, s)
                    }
                } else if (function(t) {
                    return !!t && "function" == typeof t.on && "function" == typeof t.off
                }(t)) {
                    var p = t;
                    t.on(r, n),
                    o = function() {
                        return p.off(r, n)
                    }
                } else {
                    if (!function(t) {
                        return !!t && "function" == typeof t.addListener && "function" == typeof t.removeListener
                    }(t))
                        throw new TypeError("Invalid event target");
                    var b = t;
                    t.addListener(r, n),
                    o = function() {
                        return b.removeListener(r, n)
                    }
                }
                i.add(new u.Subscription(o))
            }
            ,
            e.prototype._subscribe = function(t) {
                var r = this.sourceObj
                  , n = this.eventName
                  , i = this.options
                  , o = this.selector
                  , u = o ? function() {
                    for (var e = [], r = 0; r < arguments.length; r++)
                        e[r - 0] = arguments[r];
                    var n = s.tryCatch(o).apply(void 0, e);
                    n === c.errorObject ? t.error(c.errorObject.e) : t.next(n)
                }
                : function(e) {
                    return t.next(e)
                }
                ;
                e.setupSubscription(r, n, u, t, i)
            }
            ,
            e
        }(i.Observable);
        e.FromEventObservable = h
    }
    , function(t, e, r) {
        "use strict";
        r.r(e);
        var n = {
            en: [["ecstasy", "admiration", "terror", "amazement", "grief", "loathing", "rage", "vigilance"], ["joy", "trust", "fear", "surprise", "sadness", "disgust", "anger", "anticipation"], ["serenity", "acceptance", "apprehension", "distraction", "pensiveness", "boredom", "annoyance", "interest"], ["love", "submission", "awe", "disapproval", "remorse", "contempt", "aggressiveness", "optimistm"]],
            pl: [["ekstaza", "podziw", "przerażenie", "zdumienie", "rozpacz", "wstręt", "furia", "czujność"], ["radość", "ufność", "strach", "zaskoczenie", "smutek", "odraza", "gniew", "niecierpliwość"], ["pogoda ducha", "akceptacja", "niepokój", "rozproszenie uwagi", "zaduma", "nuda", "irytacja", "zainteresowanie"], ["miłość", "poddanie", "respekt", "dezaprobata", "skrucha", "pogarda", "agresywność", "optymizm"]]
        };
        class i {
            constructor(t) {
                this.element = "drawer",
                this.lang = "en",
                this.isMobile = !1,
                this.labels = [],
                this.checkedElements = [],
                this.maxElements = 32,
                Object.keys(t).forEach(e=>{
                    this[e] = t[e]
                }
                )
            }
            getLabels() {
                return this.labels.length ? this.labels : n[this.lang].length ? n[this.lang] : n.en
            }
        }
        class s {
            constructor(t, e) {
                this.toString = (()=>`${this.x} ${this.y} `),
                this.x = t,
                this.y = e
            }
        }
        class o {
            constructor(t, e, r) {
                this.toString = (()=>`${this.r} ${this.r} `),
                this.r = t,
                this.labels = e,
                this.id = r
            }
            getId() {
                return this.id
            }
        }
        var c = r(1)
          , u = r(10);
        class a {
            static createElement(t, e) {
                let r = document.createElementNS("http://www.w3.org/2000/svg", t);
                for (let t in e)
                    r.setAttribute(t, e[t]);
                return r
            }
            static createPath(t, e, r, n) {
                return n.indexOf(t) >= 0 ? `M ${e} L ${r}` : `M ${r} L ${e}`
            }
            static getPosition(t, e, r=0) {
                r || (r = 0);
                let n = e / 4;
                return (90 / n * (t - n - .45) - r) * Math.PI / 180
            }
        }
        class h {
            constructor(t, e) {
                this.id = "p-" + (t.line.getId() + "-" + t.i).toString(),
                this.txt = t.line.labels[t.i],
                this.path = t.path,
                this.textPath = t.textPath,
                this.drawer = e,
                this.changeObserver = new c.Subject
            }
            draw() {
                this.element = a.createElement("a", {
                    href: "javascript:;",
                    value: this.id,
                    id: this.txt,
                });
                let t = a.createElement("path", {
                    d: this.path,
                });
                this.element.appendChild(t);
                let e = a.createElement("text")
                  , r = a.createElement("textPath");
                r.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#" + this.id),
                r.setAttribute("id", "text_"+this.txt);
                r.setAttribute("startOffset", "50%");
                let n = document.createTextNode(this.txt);
                return r.appendChild(n),
                e.appendChild(r),
                this.element.appendChild(e),
                this.element
            }
            getDef() {
                return a.createElement("path", {
                    id: this.id,
                    d: this.textPath
                })
            }
            bindEvents() {
                /*Object(u.fromEvent)(this.element, "click").subscribe(()=>{
                    this.isActive ? this.disable() : this.drawer.ifCanChange() && this.enable(),
                    this.changeObserver.next(this)
                }
                )*/
            }
            enable() {
                if (!this.isActive) {
                    this.isActive = !0;
                    let t = this.element.getAttribute("class");
                    t ? t += " " + h.activeClass : t = h.activeClass,
                    this.element.setAttribute("class", t)
                }
            }
            disable() {
                if (this.isActive) {
                    this.isActive = !1;
                    let t = this.element.getAttribute("class");
                    t && (t = (t = t.replace(h.activeClass, "")).replace(" ", "")),
                    this.element.setAttribute("class", t)
                }
            }
        }
        h.activeClass = "active";
        class l {
            constructor(t) {
                this.config = t,
                this.changeObserver = new c.Subject,
                this.elements = [],
                this.centerPoint = new s(250,250);
                let e = document.querySelector(this.config.element);
                e.setAttribute("class", "plutchik-instance"),
                this.svg = a.createElement("svg", {
                    class: "plutchik",
                    xmlns: "http://www.w3.org/2000/svg",
                    "xmlns:xlink": "http://www.w3.org/1999/xlink",
                    version: "1.1",
                    viewBox: "250 250 700 700" //"0 0 500 500"
                }),
                this.defs = a.createElement("defs"),
                this.svg.appendChild(this.defs),
                e.appendChild(this.svg)
            }
            render(t) {
                t.forEach(t=>{
                    this.defs.appendChild(t.getDef()),
                    this.svg.appendChild(t.draw()),
                    this.config.checkedElements.indexOf(t.txt) >= 0 && t.enable()
                }
                )
            }
            createCoords(t, e, r) {
                let n = new Array;
                for (let i = 1; i <= e; i++) {
                    let o = a.getPosition(i, e, r);
                    n.push(new s(this.centerPoint.x + Math.cos(o) * t,this.centerPoint.y + Math.sin(o) * t))
                }
                return n
            }
            getLines(t) {
                let e = this.config.getLabels()
                  , r = new Array;
                return t.forEach((t,n)=>{
                    r.push(new o(t,e[n],n))
                }
                ),
                r
            }
            runDefault() {
                let t = this.getLines([80, 144, 250, 250])
                  , e = [0, 1, 2, 3]
                  , r = this.createCoords(t[0].r, 8)
                  , n = this.createCoords(t[0].r, 8, 22.5)
                  , i = this.createCoords(t[1].r, 16)
                  , o = this.createCoords(t[1].r, 16, 11.5)
                  , c = this.createCoords(t[3].r, 16, 12);
                for (let u = 0; u < 8; u++) {
                    let h = 0 === u ? 7 : u - 1
                      , l = new Array
                      , p = new s(450,450);
                    l.push(this.createElement({
                        i: u,
                        line: t[0],
                        path: `M ${this.centerPoint}\n           L ${r[h]}\n           A ${t[0]} 0 0,1 ${r[u]}`,
                        textPath: a.createPath(u, this.centerPoint, n[u], e)
                    })),
                    l.push(this.createElement({
                        i: u,
                        line: t[1],
                        path: `M ${r[u]}\n           A ${p} 0 0,0 ${i[2 * u]}\n           A ${t[1]} 0 0,0 ${i[2 * h + 1]}\n           A ${p} 1 0,0 ${r[h]}\n           A ${t[0]} 1 0,1 ${r[u]}`,
                        textPath: a.createPath(u, n[u], o[2 * u], e)
                    })),
                    h = 0 === u ? 15 : 2 * u - 1,
                    l.push(this.createElement({
                        i: u,
                        line: t[2],
                        path: `M ${i[2 * u]}\n           A ${p} 0 0,0 ${c[2 * u]}\n           A ${p} 0 0,0 ${i[h]}\n           A ${t[1]} 1 0,1 ${i[2 * u]}`,
                        textPath: a.createPath(u, o[2 * u], c[2 * u], e)
                    })),
                    h = 7 === u ? 0 : 2 * u + 2,
                    l.push(this.createElement({
                        i: u,
                        line: t[3],
                        path: `M ${c[2 * u]}\n           A ${this.centerPoint} 0 0,1 ${c[h]}\n           A ${p} 1 0,0 ${r[u]}\n           A ${p} 0 0,0 ${c[2 * u]}`,
                        textPath: a.createPath(u, r[u], c[2 * u + 1], e)
                    })),
                    this.render(l)
                }
            }
            runMobile() {
                let t = this.getLines([50, 110, 175, 250])
                  , e = [0, 1, 2, 3, 4, 5, 6, 7, 8]
                  , r = this.createCoords(t[0].r, 8)
                  , n = this.createCoords((t[0].r + t[1].r) / 2, 8)
                  , i = this.createCoords(t[1].r, 8)
                  , s = this.createCoords((t[1].r + t[2].r) / 2, 8)
                  , o = this.createCoords(t[2].r, 8)
                  , c = this.createCoords((t[2].r + t[3].r) / 2, 8)
                  , u = this.createCoords((t[2].r + t[3].r) / 2 + 10, 8, 26)
                  , h = this.createCoords((t[2].r + t[3].r) / 2 + 10, 8, 20)
                  , l = this.createCoords(t[3].r, 8, 23);
                for (let p = 0; p < 8; p++) {
                    let b = 0 === p ? 7 : p - 1
                      , f = new Array;
                    f.push(this.createElement({
                        i: p,
                        line: t[0],
                        path: `M ${i[b]}\n            A ${t[0]} 1 0,1 ${i[p]}\n            L ${r[p]}\n            A ${t[0]} 1 0,0  ${r[b]}\n            L ${i[b]}`,
                        textPath: a.createPath(p, n[b], n[p], e)
                    })),
                    f.push(this.createElement({
                        i: p,
                        line: t[1],
                        path: `M ${o[b]}\n               A ${t[2]} 1 0,1 ${o[p]}\n               L ${i[p]}\n               A ${t[1]} 1 0,0 ${i[b]}\n               L ${o[b]}`,
                        textPath: a.createPath(p, s[b], s[p], e)
                    })),
                    f.push(this.createElement({
                        i: p,
                        line: t[2],
                        path: `M ${o[b]}\n            A ${t[3]} 0 0,1 ${o[p]}\n            A ${t[3]} 1 0,0 ${l[p]}\n            A ${t[3]} 1 0,0 ${o[b]}`,
                        textPath: a.createPath(p, c[b], c[p], e)
                    })),
                    b = 7 === p ? 0 : p + 1,
                    f.push(this.createElement({
                        i: p,
                        line: t[3],
                        path: `M ${l[p]}\n            A ${t[3]} 0 0,1 ${l[b]}\n            A ${t[3]} 1 0,0 ${o[p]}\n            A ${t[3]} 1 0,0 ${l[p]}`,
                        textPath: a.createPath(p, h[p], u[b], e)
                    })),
                    this.render(f)
                }
            }
            createElement(t) {
                let e = new h(t,this);
                return e.changeObserver.subscribe(()=>{
                    this.changeObserver.next(this.getData())
                }
                ),
                this.elements.push(e),
                e
            }
            getData() {
                let t = {};
                return this.elements.forEach(e=>{
                    t[e.txt] = e.isActive
                }
                ),
                {
                    data: t,
                    element: this.svg
                }
            }
            ifCanChange() {
                return this.elements.filter(t=>t.isActive).length < this.config.maxElements
            }
            run() {
                this.config.isMobile ? this.runMobile() : this.runDefault()
            }
            elementClick() {
                return this.changeObserver
            }
        }
        e.default = function(t) {
            let e = new i(t)
              , r = new l(e);
            return r.run(),
            r
        }
    }
    ])
});


// Creazione delle diadi
var dataset = [
    { count: 10 },
    { count: 10 },
    { count: 10 },
    { count: 10 },
    { count: 10 },
    { count: 10 },
    { count: 10 },
    { count: 10 }
];

var primary_dyads = ["love", "submission", "awe", "disapproval", "remorse", "contempt", "aggressiveness", "optimistm"];
var secondary_dyads = ["guilt", "curiosity", "despair", "unbelief", "envy", "cynicism", "pride", "hope"];
var tertiary_dyads = ["delight", "sentimentality", "shame", "outrage", "pessimism", "morbidness", "dominance", "anxiety"];


var width = 200;
    height = Math.min(width, 200)
    margin = 20;

var radius3 = Math.min(width, height) / 2 - 50;
var radius2 = radius3 - 7;

var color = d3.scaleOrdinal()
              .domain(dataset)
              .range(["rgb(255, 202, 5)", "rgb(138, 198, 80)", "rgb(0, 165, 81)", "rgb(0, 153, 205)", "rgb(41, 131, 197)", "rgb(137, 115, 179)", "rgb(240, 91, 97)", "rgb(246, 146, 61)"]);

var svg = d3.select('#model')
            .append('svg')
            .attr("preserveAspectRatio", "xMidYMid meet")
            .attr("viewBox", [-width / 2, -height / 2, 100, 100])


var svg3 = svg.append('g')
              .attr("class", "dyads");

var svg2 = svg.append('g')
              .attr("class", "dyads");

var arc3 = d3.arc()
             .innerRadius(0)
             .outerRadius(radius3);

var arc2 = d3.arc()
             .innerRadius(0)
             .outerRadius(radius2);

var pie = d3.pie()
            .value(function(d) { return d.count; })
            .sort(null);

// Diadi secondarie
var path2 = svg2.selectAll('path')
                .data(pie(dataset))
                .enter()
                .append('path')
                .attr("id", function(d,i) { return secondary_dyads[i]; })
                .attr("class", "not-active")
                .attr('d', arc2)
                .each(function(d,i) {
                    var firstArcSection = /(^.+?)L/;
                    var newArc = firstArcSection.exec( d3.select(this).attr("d") )[1];
                    newArc = newArc.replace(/,/g , " ");

                    svg2.append("path")
                        .attr("class", "hiddenDonutArcs")
                        .attr("id", "donutArc2_"+i)
                        .attr("d", newArc)
                        .style("fill", "none");
                });

svg2.selectAll(".donutText")
    .data(dataset)
    .enter().append("text")
    .attr("class", "secondary_text")
    .attr("dy", 5)
    .append("textPath")
    .attr("startOffset","50%")
    .style("text-anchor","middle")
    .attr("xlink:href",function(d,i){return "#donutArc2_"+i;})
    .attr("id", function(d,i){return "text_"+secondary_dyads[i];})
    .attr("class", "text_not-active")
    .text(function(d,i){return secondary_dyads[i];})
    .style("cursor", "pointer");


// Diadi terziarie
var path3 = svg3.selectAll('path')
                .data(pie(dataset))
                .enter()
                .append('path')
                .attr('d', arc3)
                .attr("id", function(d,i) { return tertiary_dyads[i]; })
                .attr("class", "not-active")
                .attr('opacity', 0.8)
                .each(function(d,i) {
                    var firstArcSection = /(^.+?)L/;
                    var newArc = firstArcSection.exec( d3.select(this).attr("d") )[1];
                    newArc = newArc.replace(/,/g , " ");

                    svg3.append("path")
                        .attr("class", "hiddenDonutArcs")
                        .attr("id", "donutArc3_"+i)
                        .attr("d", newArc)
                        .style("fill", "none");
                });

svg3.selectAll(".donutText")
    .data(dataset)
    .enter().append("text")
    .attr("class", "tertiary_text")
    .attr("dy", 5)
    .append("textPath")
    .attr("startOffset","50%")
    .style("text-anchor","middle")
    .attr("xlink:href",function(d,i){return "#donutArc3_"+i;})
    .attr("id", function(d,i){return "text_"+tertiary_dyads[i];})
    .attr("class", "text_not-active")
    .text(function(d,i){return tertiary_dyads[i];})
    .style("cursor", "pointer");

// Ruota di Plutchik
var svgPl = svg.append('g')
               .attr("id", "pl")

Plutchik.default({
    element: '#model svg #pl'
});


var width = d3.select("#model").style("width").slice(0, -2);
var height = d3.select("#model").style("height").slice(0, -2);

var flag = false;

var primary_dyads = ["love", "submission", "awe", "disapproval", "remorse", "contempt", "aggressiveness", "optimistm"];
var secondary_dyads = ["guilt", "curiosity", "despair", "unbelief", "envy", "cynicism", "pride", "hope"];
var tertiary_dyads = ["delight", "sentimentality", "shame", "outrage", "pessimism", "morbidness", "dominance", "anxiety"];

var emotions_0 = ["ecstasy", "admiration", "terror", "amazement", "grief", "loathing", "rage", "vigilance"];
var emotions_1 = ["joy", "trust", "fear", "surprise", "sadness", "disgust", "anger", "anticipation"];
var emotions_2 = ["serenity", "acceptance", "apprehension", "distraction", "pensiveness", "boredom", "annoyance", "interest"];

var emotions_p = [];
var emotions_s = [];
var emotions_t = [];

for(i = 0; i < 8; i++){

    emotions_p.push({
        emotion1: emotions_1[i],
        emotion2: emotions_1[(i+1)%8],
        result: primary_dyads[i]
    });

    emotions_p.push({
        emotion1: emotions_1[(i+1)%8],
        emotion2: emotions_1[i],
        result: primary_dyads[i]
    });

    emotions_s.push({
        emotion1: emotions_1[i],
        emotion2: emotions_1[(i+2)%8],
        result: secondary_dyads[i]
    });

    emotions_s.push({
        emotion1: emotions_1[(i+2)%8],
        emotion2: emotions_1[i],
        result: secondary_dyads[i]
    });

    emotions_t.push({
        emotion1: emotions_1[i],
        emotion2: emotions_1[(i+3)%8],
        result: tertiary_dyads[i]
    });

    emotions_t.push({
        emotion1: emotions_1[(i+3)%8],
        emotion2: emotions_1[i],
        result: tertiary_dyads[i]
    });
}

var neighbors_p = [];
var neighbors_s = [];
var neighbors_t = [];

// vicini a distanza 1,2,3 per ogni emozione
for(i = 0; i < 8; i++){
    if(i == 0){ y = 8; }else{ y = i; }

    neighbors_p.push({
        emotion: emotions_1[i],
        n_1_1: emotions_1[(i+1)%8],
        n_1_2: emotions_1[(y-1)%8]
    });

    if(i == 0 || i == 1){ k = (8 - (Math.abs(i-2)))+2; }else{ k = i; }

    neighbors_s.push({
        emotion: emotions_1[i],
        n_2_1: emotions_1[(i+2)%8],
        n_2_2: emotions_1[(k-2)%8]
    });

    if(i == 0 || i == 1 || i == 2){ j = (8 - (Math.abs(i-3)))+3; }else{ j = i; }

    neighbors_t.push({
        emotion: emotions_1[i],
        n_3_1: emotions_1[(i+3)%8],
        n_3_2: emotions_1[(j-3)%8]
    });

}

// Elementi della ruota con classe not-active
var i = 0; var j = 0; var k = 0; var w = 0;
d3.select(".plutchik")
  .selectAll("a")
  .attr("class", "not-active")
  .selectAll("textPath")
  .attr("class", "text_not-active");

// Per gli elementi "a" della ruota
var name; var value; var selected;
d3.select(".plutchik")
  .selectAll("a")
  .on("click", function(){
    name = d3.select(this).attr("id");  // nome emozione
    value = d3.select(this).attr("value");  // p-n-n

    // se è stato selezionato un "a"
    if(d3.select(this).attr("class") === "not-active"){
        d3.select(this).attr("class", "active").select("textPath").attr("class", "text_active");
        selected = true;
    }else{
        d3.select(this).attr("class", "not-active").select("textPath").attr("class", "text_not-active")
        selected = false;
    }
    selectionWheelEmotion(name, value, selected);
  });


function selectionWheelEmotion(name, value, selected){

    degree = value.substr(2,1);
    pos = Number(value.substr(4,1));

    if(degree == 0){
        var em_degree_1 = emotions_1[pos];
        var em_degree_2 = emotions_2[pos];
        d3.select('#'+em_degree_1).attr("class", "not-active").select("textPath").attr("class", "text_not-active");
        d3.select('#'+em_degree_2).attr("class", "not-active").select("textPath").attr("class", "text_not-active");
        selectionWheelEmotion(d3.select("#"+em_degree_1).attr("id"), d3.select("#"+em_degree_1).attr("value"), false);
    }else if(degree == 1){
        if(selected == true) {
            var em_degree_0 = emotions_0[pos];
            var em_degree_2 = emotions_2[pos];
            d3.select('#' + em_degree_0).attr("class", "not-active").select("textPath").attr("class", "text_not-active");
            d3.select('#' + em_degree_2).attr("class", "not-active").select("textPath").attr("class", "text_not-active");
        }
    }else if(degree == 2){
        var em_degree_0 = emotions_0[pos];
        var em_degree_1 = emotions_1[pos];
        d3.select('#'+em_degree_0).attr("class", "not-active").select("textPath").attr("class", "text_not-active");
        d3.select('#'+em_degree_1).attr("class", "not-active").select("textPath").attr("class", "text_not-active");
        selectionWheelEmotion(d3.select("#"+em_degree_1).attr("id"), d3.select("#"+em_degree_1).attr("value"), false);
    }

    // se diade primaria prendo i suoi vicini a distanza 1. Es. love = joy + trust
    if(degree == 3){
        for(var i = 0; i < emotions_p.length; i++){
            if(emotions_p[i].result == name){
                basicEm1 = emotions_p[i].emotion1;
                basicEm2 = emotions_p[i].emotion2;
            }
        }
        value1 = d3.select("#"+basicEm1).attr("value");
        value2 = d3.select("#"+basicEm2).attr("value");

        //em1 = value1.substr(2,1);
        //em2 = value2.substr(2,1);
        pos1 = Number(value1.substr(4,1));
        pos2 = Number(value2.substr(4,1));

        var em_0_1 = emotions_0[pos1];
        var em_0_2 = emotions_0[pos2];
        var em_2_1 = emotions_2[pos1];
        var em_2_2 = emotions_2[pos2];
        d3.select('#'+em_0_1).attr("class", "not-active").select("textPath").attr("class", "text_not-active");
        d3.select('#'+em_2_1).attr("class", "not-active").select("textPath").attr("class", "text_not-active");
        d3.select('#'+em_0_2).attr("class", "not-active").select("textPath").attr("class", "text_not-active");
        d3.select('#'+em_2_2).attr("class", "not-active").select("textPath").attr("class", "text_not-active");

        selectionDyad(basicEm1, basicEm2, selected)
    }


    // nomi emozioni a distanza 1 2 3 Es. joy
    var n_1_1 = neighbors_p[pos].n_1_1; //trust
    var n_1_2 = neighbors_p[pos].n_1_2; //anticipation

    var n_2_1 = neighbors_s[pos].n_2_1; //fear
    var n_2_2 = neighbors_s[pos].n_2_2; //anger

    var n_3_1 = neighbors_t[pos].n_3_1; //surprise
    var n_3_2 = neighbors_t[pos].n_3_2; //disgust

    var res;
    var res1;
    var res2;

    if(degree == 1){    // se emozioni principali (joy, fear..)
        // guardo se i vicini sono active o not-active
        var em_1_1 = d3.select("#"+n_1_1).attr("class");
        var em_1_2 = d3.select("#"+n_1_2).attr("class");

        var em_2_1 = d3.select("#"+n_2_1).attr("class");
        var em_2_2 = d3.select("#"+n_2_2).attr("class");

        var em_3_1 = d3.select("#"+n_3_1).attr("class");
        var em_3_2 = d3.select("#"+n_3_2).attr("class");

        // se tutte e due sono selezionate a distanza 1 allora ci saranno due risultati
        if(em_1_1 == "active" && em_1_2 == "active"){
            for(var i = 0; i < emotions_p.length; i++){
                if(emotions_p[i].emotion1 == name && emotions_p[i].emotion2 == n_1_1){
                    res1 = emotions_p[i].result;
                }
            }

            for(var i = 0; i < emotions_p.length; i++){
                if(emotions_p[i].emotion1 == name && emotions_p[i].emotion2 == n_1_2){
                    res2 = emotions_p[i].result;
                }
            }
            if(selected == true){
                show(res1, res2);
            }else{
                hide(res1, res2);
            }
            //se solo una è selezionata avrò un solo risultato
        }else if(em_1_1 == "active" && em_1_2 == "not-active"){
            for(var i = 0; i < emotions_p.length; i++){
                if(emotions_p[i].emotion1 == name && emotions_p[i].emotion2 == n_1_1){
                    res = emotions_p[i].result;
                }
            }
            if(selected == true){
                show(res, null);
            }else{
                hide(res, null);
            }
            //se solo una è selezionata avrò un solo risultato
        }else if(em_1_2 == "active" && em_1_1 == "not-active"){
            for(var i = 0; i < emotions_p.length; i++){
                if(emotions_p[i].emotion1 == name && emotions_p[i].emotion2 == n_1_2){
                    res = emotions_p[i].result;
                }
            }
            if(selected == true){
                show(res, null);
            }else{
                hide(res, null);
            }
        }

        // se tutte e due sono selezionate a distanza 2 allora ci saranno due risultati
        if(em_2_1 == "active" && em_2_2 == "active"){
            for(var i = 0; i < emotions_s.length; i++){
                if(emotions_s[i].emotion1 == name && emotions_s[i].emotion2 == n_2_1){
                    res1 = emotions_s[i].result;
                }
            }
            for(var i = 0; i < emotions_s.length; i++){
                if(emotions_s[i].emotion1 == name && emotions_s[i].emotion2 == n_2_2){
                    res2 = emotions_s[i].result;
                }
            }

            if(selected == true){ show(res1, res2); }else{ hide(res1, res2);}
            //se solo una è selezionata avrò un solo risultato
        }else if(em_2_1 == "active" && em_2_2 == "not-active"){
            for(var i = 0; i < emotions_s.length; i++){
                if(emotions_s[i].emotion1 == name && emotions_s[i].emotion2 == n_2_1){
                    res = emotions_s[i].result;
                }
            }

            if(selected == true){ show(res, null); }else{ hide(res, null); }
            //se solo una è selezionata avrò un solo risultato
        }else if(em_2_2 == "active" && em_2_1 == "not-active"){
            for(var i = 0; i < emotions_s.length; i++){
                if(emotions_s[i].emotion1 == name && emotions_s[i].emotion2 == n_2_2){
                    res = emotions_s[i].result;
                }
            }

            if(selected == true){ show(res, null); }else{ hide(res, null); }
        }

        // se tutte e due sono selezionate a distanza 3 allora ci saranno due risultati
        if(em_3_1 == "active" && em_3_2 == "active"){
            for(var i = 0; i < emotions_t.length; i++){
                if(emotions_t[i].emotion1 == name && emotions_t[i].emotion2 == n_3_1){
                    res1 = emotions_t[i].result;
                }
            }
            for(var i = 0; i < emotions_t.length; i++){
                if(emotions_t[i].emotion1 == name && emotions_t[i].emotion2 == n_3_2){
                    res2 = emotions_t[i].result;
                }
            }

            if(selected == true){ show(res1, res2); }else{ hide(res1, res2); }
        }else if(em_3_1 == "active" && em_3_2 == "not-active"){
            for(var i = 0; i < emotions_t.length; i++){
                if(emotions_t[i].emotion1 == name && emotions_t[i].emotion2 == n_3_1){
                    res = emotions_t[i].result;
                }
            }

            if(selected == true){ show(res, null); }else{ hide(res, null); }
        }else if(em_3_2 == "active" && em_3_1 == "not-active"){
            for(var i = 0; i < emotions_t.length; i++){
                if(emotions_t[i].emotion1 == name && emotions_t[i].emotion2 == n_3_2){
                    res = emotions_t[i].result;
                }
            }

            if(selected == true){ show(res, null); }else{ hide(res, null); }
        }

    }

}

function show(res1, res2) {

    if (res1 != undefined || res2 != undefined){
        if (res2 == null) {

            if (flag == true) {
                var tooltip = d3.select("body").append("div").attr("class", "toolTip").attr("id", "tooltip_" + res1);

                tooltip.style("visibility", "visible")
                    .style("left", (width / 2) - 60 + "px")
                    .style("top", (height / 2) - 55 + "px")
                    .style("display", "inline-block")
                    .html("Vuoi selezionare <br><span>" + (res1) + "</span>?<br><button type=\"button\" id=\"tooltip-btn-si\" class=\"btn btn-outline-secondary\">Si</button><button type=\"button\" id=\"tooltip-btn-no\" class=\"btn btn-outline-secondary\">No</button>");

                d3.select("#tooltip_" + res1)
                    .select("#tooltip-btn-si")
                    .on("click", function () {
                        for (var i = 0; i < 8; i++) {
                            if (res1 == primary_dyads[i]) {
                                d3.select("svg.plutchik").select("#" + res1).attr("class", "active").select("textPath").attr("class", "text_active");
                            } else if (res1 == secondary_dyads[i] || res1 == tertiary_dyads[i]) {
                                d3.select("#" + res1).attr("class", "active");
                                d3.select("#text_" + res1).attr("class", "text_active");
                            }
                        }
                        tooltip.remove();
                    });

                d3.select("#tooltip_" + res1)
                    .select("#tooltip-btn-no")
                    .on("click", function () {
                        tooltip.remove();
                    });
            } else {

                for (var i = 0; i < 8; i++) {
                    if (res1 == primary_dyads[i]) {
                        d3.select("svg.plutchik").select("#" + res1).attr("class", "active").select("textPath").attr("class", "text_active");
                    } else if (res1 == secondary_dyads[i] || res1 == tertiary_dyads[i]) {
                        d3.select("#" + res1).attr("class", "active");
                        d3.select("#text_" + res1).attr("class", "text_active");
                    }
                }
            }

        } else {

            if (flag == true) {
                var tooltip1 = d3.select("body").append("div").attr("class", "toolTip").attr("id", "tooltip_" + res1);

                tooltip1.style("visibility", "visible")
                    .style("left", (width / 2) - 60 + "px")
                    .style("top", (height / 2) - 55 + "px")
                    .style("display", "inline-block")
                    .html("Vuoi selezionare <br><span>" + (res1) + "</span>?<br><button type=\"button\" id=\"tooltip-btn-si\" class=\"btn btn-outline-secondary\">Si</button><button type=\"button\" id=\"tooltip-btn-no\" class=\"btn btn-outline-secondary\">No</button>");

                var tooltip2 = d3.select("body").append("div").attr("class", "toolTip").attr("id", "tooltip_" + res2);

                tooltip2.style("visibility", "visible")
                    .style("left", (width / 2) - 60 + "px")
                    .style("top", (height / 2) - 55 + "px")
                    .style("display", "inline-block")
                    .html("Vuoi selezionare <br><span>" + (res2) + "</span>?<br><button type=\"button\" id=\"tooltip-btn-si\" class=\"btn btn-outline-secondary\">Si</button><button type=\"button\" id=\"tooltip-btn-no\" class=\"btn btn-outline-secondary\">No</button>");

                d3.select("#tooltip_" + res1)
                    .select("#tooltip-btn-si")
                    .on("click", function () {
                        for (var i = 0; i < 8; i++) {
                            if (res1 == primary_dyads[i]) {
                                d3.select("svg.plutchik").select("#" + res1).attr("class", "active").select("textPath").attr("class", "text_active");
                            } else if (res1 == secondary_dyads[i] || res1 == tertiary_dyads[i]) {
                                d3.select("#" + res1).attr("class", "active");
                                d3.select("#text_" + res1).attr("class", "text_active");
                            }
                        }

                        tooltip1.remove();
                    });

                d3.select("#tooltip_" + res1)
                    .select("#tooltip-btn-no")
                    .on("click", function () {
                        tooltip1.remove();
                    });

                d3.select("#tooltip_" + res2)
                    .select("#tooltip-btn-si")
                    .on("click", function () {
                        for (var i = 0; i < 8; i++) {
                            if (res2 == primary_dyads[i]) {
                                d3.select("svg.plutchik").select("#" + res2).attr("class", "active").select("textPath").attr("class", "text_active");
                            } else if (res2 == secondary_dyads[i] || res2 == tertiary_dyads[i]) {
                                d3.select("#" + res2).attr("class", "active");
                                d3.select("#text_" + res2).attr("class", "text_active");
                            }
                        }

                        tooltip2.remove();
                    });

                d3.select("#tooltip_" + res2)
                    .select("#tooltip-btn-no")
                    .on("click", function () {
                        tooltip2.remove();
                    });

            } else {
                for (var i = 0; i < 8; i++) {
                    if (res1 == primary_dyads[i]) {
                        d3.select("svg.plutchik").select("#" + res1).attr("class", "active").select("textPath").attr("class", "text_active");
                    } else if (res2 == primary_dyads[i]) {
                        d3.select("svg.plutchik").select("#" + res2).attr("class", "active").select("textPath").attr("class", "text_active");
                    } else if (res1 == secondary_dyads[i] || res2 == secondary_dyads[i] || res1 == tertiary_dyads[i] || res2 == tertiary_dyads[i]) {
                        d3.select("#" + res1).attr("class", "active");
                        d3.select("#text_" + res1).attr("class", "text_active");
                        d3.select("#" + res2).attr("class", "active");
                        d3.select("#text_" + res2).attr("class", "text_active");
                    }
                }
            }
        }
    }
}

function hide(res1, res2){

    if(res2 == null){
        for(var i = 0; i < 8; i++){
            if(res1 == primary_dyads[i]){
                d3.select("svg.plutchik").select("#"+res1).attr("class", "not-active").select("textPath").attr("class", "text_not-active")
            }else if(res1 == secondary_dyads[i] || res1 == tertiary_dyads[i]){
                d3.select("#"+res1).attr("class", "not-active");
                d3.select("#text_"+res1).attr("class", "text_not-active");
            }
        }
    }else{
        for(var i = 0; i < 8; i++){
            if(res1 == primary_dyads[i]){
                d3.select("svg.plutchik").select("#"+res1).attr("class", "not-active").select("textPath").attr("class", "text_not-active");
            }else if(res2 == primary_dyads[i]){
                d3.select("svg.plutchik").select("#"+res2).attr("class", "not-active").select("textPath").attr("class", "text_not-active");
            }else if(res1 == secondary_dyads[i] || res2 == secondary_dyads[i] || res1 == tertiary_dyads[i] || res2 == tertiary_dyads[i]){
                d3.select("#"+res1).attr("class", "not-active");
                d3.select("#text_"+res1).attr("class", "text_not-active");

                d3.select("#"+res2).attr("class", "not-active");
                d3.select("#text_"+res2).attr("class", "text_not-active");
            }
        }
    }

}

// caso in cui si seleziona la diade secondaria e devo selezionare le emozioni principali
d3.selectAll(".secondary_text")
    .selectAll("textPath")
    .on("click", function(){
        var name = d3.select(this).attr("id");
        var length = name.length;
        var s_dyad = name.substr(5, length); //text_

        // controllo se è già stato selezionato oppure no
        if(d3.select("#"+s_dyad).attr("class") == "active"){
            selected = false;
            d3.select("#"+s_dyad).attr("class", "not-active");
            d3.select("#text_"+s_dyad).attr("class", "text_not-active");
        }else{
            selected = true;
            d3.select("#"+s_dyad).attr("class", "active");
            d3.select("#text_"+s_dyad).attr("class", "text_active");
        }

        var basicEm1;
        var basicEm2;

        // prendo le emozioni che generano la diade sec
        for(var i = 0; i < emotions_s.length; i++){
            if(emotions_s[i].result == s_dyad){
                basicEm1 = emotions_s[i].emotion1;
                basicEm2 = emotions_s[i].emotion2;
            }
        }

        value1 = d3.select("#"+basicEm1).attr("value");
        value2 = d3.select("#"+basicEm2).attr("value");

        //em1 = value1.substr(2,1);
        //em2 = value2.substr(2,1);

        pos1 = Number(value1.substr(4,1));
        pos2 = Number(value2.substr(4,1));

        // emozioni di grado 1 e 3 sul petalo da disattivare perchè è si deve attivare quella centrale
        var em_0_1 = emotions_0[pos1];
        var em_0_2 = emotions_0[pos2];
        var em_2_1 = emotions_2[pos1];
        var em_2_2 = emotions_2[pos2];
        d3.select('#'+em_0_1).attr("class", "not-active").select("textPath").attr("class", "text_not-active");
        d3.select('#'+em_2_1).attr("class", "not-active").select("textPath").attr("class", "text_not-active");
        d3.select('#'+em_0_2).attr("class", "not-active").select("textPath").attr("class", "text_not-active");
        d3.select('#'+em_2_2).attr("class", "not-active").select("textPath").attr("class", "text_not-active");

        selectionDyad(basicEm1, basicEm2, selected);
    });

// stessa situazione per le terziarie
d3.selectAll(".tertiary_text")
    .selectAll("textPath")
    .on("click", function(){
        var name = d3.select(this).attr("id");
        var length = name.length;
        var t_dyad = name.substr(5, length);

        if(d3.select("#"+t_dyad).attr("class") == "active"){
            selected = false;
            d3.select("#"+t_dyad).attr("class", "not-active");
            d3.select("#text_"+t_dyad).attr("class", "text_not-active");
        }else{
            selected = true;
            d3.select("#"+t_dyad).attr("class", "active");
            d3.select("#text_"+t_dyad).attr("class", "text_active");
        }

        var basicEm1;
        var basicEm2;

        for(var i = 0; i < emotions_t.length; i++){
            if(emotions_t[i].result == t_dyad){
                basicEm1 = emotions_t[i].emotion1;
                basicEm2 = emotions_t[i].emotion2;
            }
        }

        value1 = d3.select("#"+basicEm1).attr("value");
        value2 = d3.select("#"+basicEm2).attr("value");

        //em1 = value1.substr(2,1);
        //em2 = value2.substr(2,1);
        pos1 = Number(value1.substr(4,1));
        pos2 = Number(value2.substr(4,1));

        var em_0_1 = emotions_0[pos1];
        var em_0_2 = emotions_0[pos2];
        var em_2_1 = emotions_2[pos1];
        var em_2_2 = emotions_2[pos2];
        d3.select('#'+em_0_1).attr("class", "not-active").select("textPath").attr("class", "text_not-active");
        d3.select('#'+em_2_1).attr("class", "not-active").select("textPath").attr("class", "text_not-active");
        d3.select('#'+em_0_2).attr("class", "not-active").select("textPath").attr("class", "text_not-active");
        d3.select('#'+em_2_2).attr("class", "not-active").select("textPath").attr("class", "text_not-active");

        selectionDyad(basicEm1, basicEm2, selected);
    });


function selectionDyad(basicEm1, basicEm2, selected){

    var em1 = d3.select("svg.plutchik").select("#"+basicEm1)
    var em2 = d3.select("svg.plutchik").select("#"+basicEm2)

    // se ho selezionato
    if(selected == true){

        if(flag == true){

            var tooltip = d3.select("body").append("div").attr("class", "toolTip").attr("id", "tooltip_"+basicEm1+"-"+basicEm2);

            tooltip.style("visibility", "visible")
                   .style("left", (width/2)-50+"px")
                   .style("top", (height/2)-55+"px")
                   .style("display", "inline-block")
                   .html("Vuoi selezionare <br><span>" + (basicEm1) + ", " + (basicEm2) + "</span>?<br><button type=\"button\" id=\"tooltip-btn-si\" class=\"btn btn-outline-secondary\">Si</button><button type=\"button\" id=\"tooltip-btn-no\" class=\"btn btn-outline-secondary\">No</button>");

            d3.select("#tooltip_"+basicEm1+"-"+basicEm2)
                .select("#tooltip-btn-si")
                .on("click", function(){
                    em1.attr("class", "active").select("textPath").attr("class", "text_active");
                    em2.attr("class", "active").select("textPath").attr("class", "text_active");
                    tooltip.remove();
                });

            d3.select("#tooltip_"+basicEm1+"-"+basicEm2)
                .select("#tooltip-btn-no")
                .on("click", function(){ tooltip.remove(); });

        }else{
            em1.attr("class", "active").select("textPath").attr("class", "text_active");
            em2.attr("class", "active").select("textPath").attr("class", "text_active");
        }
    }

}
