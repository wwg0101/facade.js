var e = module,
    o = exports;
window.facade = new (function() {
    var t = !1,
        e = {},
        o = [],
        i = 0,
        n = !0;
    this.setDebug = function(e) {
        t = e;
    };
    this.setSubscribeEnable = function(t) {
        n = t;
    };
    this.send = function(o, i) {
        var l = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        if (n) {
            t && cc.log("[FACADE]send:" + o);
            var r = null,
                a = 0,
                s = null;
            for (var c in e) {
                var _ = e[c],
                    d = _[o];
                if (null != d)
                    if (l) {
                        var u = parseInt(c.replace("__", ""));
                        if (u > a) {
                            a = u;
                            s = _.__target;
                            r = d;
                        }
                    } 
                    else{
                        d.apply(_.__target, null != i ? [i] : null);
                    } 
            }
            if (l && null != r){
                r.apply(s, null != i ? [i] : null);
            }
        }
    };
    this.subscribe = function(o, n, l) {
        var r =
                !(arguments.length > 3 && void 0 !== arguments[3]) ||
                arguments[3],
            a = l.__name;
        if (null == a) {
            l.__name = a = "__" + i++;
            var s = this;
            if (r){
                var customOnDestroy = null;
                if (l.onDestroy){
                    customOnDestroy = (l.onDestroy).bind(l);
                }
                l.onDestroy = function() {
                    customOnDestroy && customOnDestroy();
                    t && cc.log("[FACADE]remove:" + o + " id:" + l.__name);
                    s.remove(l);
                };
            }
        }
        var c = e[a];
        if (null == c) {
            c = {
                __target: l
            };
            e[a] = c;
        }
        c[o] = n;
    };
    this.remove = function(t) {
        var o = t.__name;
        e[o] = null;
        delete e[o];
    };
    this.removeAll = function() {
        e = {};
    };
    this.clostView = function(t) {
        if (t) {
            this.remove(t);
            t.node.destroy();
        }
    };
    this.addBean = function(e) {
        t && cc.log("[FACADE]addBean:" + e.constructor.name);
        o.push(e);
    };
    this.eachBean = function(e, i) {
        t && cc.log("[FACADE]eachBean:" + e);
        for (var n = 0, l = o.length; n < l; n++) {
            var r = o[n];
            if (e in r)
                r[e].apply(r, i);
                // try {
                //     r[e].apply(r, i);
                // } catch (t) {
                //     cc.error(
                //         "[FACADE]eachBean error: " +
                //             r.constructor.name +
                //             " " +
                //             t.toString()
                //     );
                // }
        }
    };
})();
