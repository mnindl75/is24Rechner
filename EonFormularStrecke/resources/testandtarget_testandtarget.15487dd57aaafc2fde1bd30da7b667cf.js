var mboxCopyright = "Copyright 1996-2015. Adobe Systems Incorporated. All rights reserved.";
var TNT = TNT || {};
TNT.a = (function() {
    return {
        nestedMboxes: [],
        b: {
            companyName: "Test&amp;Target",
            isProduction: true,
            adminUrl: "http://admin7.testandtarget.omniture.com/admin",
            clientCode: "eon",
            serverHost: "eon.tt.omtrdc.net",
            mboxTimeout: 30000,
            mboxLoadedTimeout: 100,
            mboxFactoryDisabledTimeout: 60 * 60,
            bodyPollingTimeout: 16,
            sessionExpirationTimeout: 31 * 60,
            experienceManagerDisabledTimeout: 30 * 60,
            experienceManagerTimeout: 5000,
            visitorApiTimeout: 500,
            visitorApiPageDisplayTimeout: 500,
            overrideMboxEdgeServer: false,
            overrideMboxEdgeServerTimeout: 31 * 60,
            tntIdLifetime: 1209600,
            crossDomain: "enabled",
            trafficDuration: 10368000,
            trafficLevelPercentage: 100,
            clientSessionIdSupport: false,
            clientTntIdSupport: false,
            passPageParameters: true,
            usePersistentCookies: true,
            crossDomainEnabled: true,
            crossDomainXOnly: false,
            imsOrgId: "C70B103A531F6C700A490D4D@AdobeOrg",
            globalMboxName: "target-global-mbox",
            globalMboxLocationDomId: "",
            globalMboxAutoCreate: false,
            experienceManagerPluginUrl: "//cdn.tt.omtrdc.net/cdn/target.js",
            siteCatalystPluginName: "tt",
            mboxVersion: 58,
            mboxIsSupportedFunction: function() {
                return true;
            },
            parametersFunction: function() {
                return "";
            },
            cookieDomainFunction: function() {
                return mboxCookiePageDomain();
            }
        },
        c: {
            d: "mboxPage",
            e: "mboxMCGVID",
            f: "mboxMCGLH",
            g: "mboxAAMB",
            h: "mboxMCAVID",
            i: "mboxMCSDID",
            j: "mboxCount",
            k: "mboxHost",
            l: "mboxFactoryId",
            m: "mboxPC",
            n: "screenHeight",
            o: "screenWidth",
            p: "browserWidth",
            q: "browserHeight",
            r: "browserTimeOffset",
            s: "colorDepth",
            t: "mboxXDomain",
            u: "mboxURL",
            v: "mboxReferrer",
            w: "mboxVersion",
            x: "mbox",
            y: "mboxId",
            z: "mboxDOMLoaded",
            A: "mboxTime",
            B: "scPluginVersion"
        },
        C: {
            D: "mboxDisable",
            E: "mboxSession",
            F: "mboxEnv",
            G: "mboxDebug"
        },
        H: {
            D: "disable",
            E: "session",
            m: "PC",
            I: "level",
            J: "check",
            G: "debug",
            K: "em-disabled",
            L: "mboxEdgeServer"
        },
        M: {
            N: "default",
            O: "mbox",
            P: "mboxImported-",
            Q: 60000,
            R: "mboxDefault",
            S: "mboxMarker-",
            T: 250,
            B: 1
        }
    }
}());
TNT.a.U = {};
(function(V) {
    var W = {}.toString;

    function X(Y) {
        return Y === void(0);
    }

    function Z(Y) {
        return Y === null;
    }

    function _(Y) {
        if (X(Y) || Z(Y)) {
            return true;
        }
        return Y.length === 0;
    }

    function ab(Y) {
        return W.call(Y) === '[object Function]';
    }

    function bb(Y) {
        return W.call(Y) === '[object Array]';
    }

    function cb(Y) {
        return W.call(Y) === '[object String]';
    }

    function db(Y) {
        return W.call(Y) === '[object Object]';
    }

    function eb(fb, gb) {
        var hb = fb.length,
            ib = -1;
        while (++ib < hb) {
            gb(fb[ib]);
        }
    }
    V.X = X;
    V.Z = Z;
    V._ = _;
    V.ab = ab;
    V.bb = bb;
    V.cb = cb;
    V.db = db;
    V.eb = eb;
}(TNT.a.U));
mboxUrlBuilder = function(jb, kb) {
    this.jb = jb;
    this.kb = kb;
    this.lb = [];
    this.mb = function(u) {
        return u;
    };
    this.nb = null;
};
mboxUrlBuilder.prototype = {
    constructor: mboxUrlBuilder,
    addNewParameter: function(ob, Y) {
        this.lb.push({
            name: ob,
            value: Y
        });
        return this;
    },
    addParameterIfAbsent: function(ob, Y) {
        if (!Y) {
            return;
        }
        for (var pb = 0; pb < this.lb.length; pb++) {
            var qb = this.lb[pb];
            if (qb.name === ob) {
                return this;
            }
        }
        this.checkInvalidCharacters(ob);
        return this.addNewParameter(ob, Y);
    },
    addParameter: function(ob, Y) {
        this.checkInvalidCharacters(ob);
        for (var pb = 0; pb < this.lb.length; pb++) {
            var qb = this.lb[pb];
            if (qb.name === ob) {
                qb.value = Y;
                return this;
            }
        }
        return this.addNewParameter(ob, Y);
    },
    addParameters: function(lb) {
        if (!lb) {
            return this;
        }
        for (var pb = 0; pb < lb.length; pb++) {
            var rb = lb[pb];
            var sb = rb.indexOf('=');
            if (sb === -1 || sb === 0) {
                continue;
            }
            this.addParameter(rb.substring(0, sb), rb.substring(sb + 1, rb.length));
        }
        return this;
    },
    setServerType: function(tb) {
        this.ub = tb;
    },
    setBasePath: function(nb) {
        this.nb = nb;
    },
    setUrlProcessAction: function(vb) {
        this.mb = vb;
    },
    buildUrl: function() {
        var wb = TNT.a.xb(this.jb),
            yb = this.nb ? this.nb : '/m2/' + this.kb + '/mbox/' + this.ub,
            zb = document.location.protocol == 'file:' ? 'http:' : document.location.protocol,
            u = zb + "//" + wb + yb,
            Ab = [];
        for (var pb = 0; pb < this.lb.length; pb++) {
            var qb = this.lb[pb];
            Ab.push(encodeURIComponent(qb.name) + '=' + encodeURIComponent(qb.value));
        }
        u += u.indexOf('?') != -1 ? '&' + Ab.join('&') : '?' + Ab.join('&');
        return this.Bb(this.mb(u));
    },
    getParameters: function() {
        return this.lb;
    },
    setParameters: function(lb) {
        this.lb = lb;
    },
    clone: function() {
        var Cb = new mboxUrlBuilder(this.jb, this.kb);
        Cb.setServerType(this.ub);
        Cb.setBasePath(this.nb);
        Cb.setUrlProcessAction(this.mb);
        for (var pb = 0; pb < this.lb.length; pb++) {
            Cb.addParameter(this.lb[pb].name, this.lb[pb].value);
        }
        return Cb;
    },
    Bb: function(Db) {
        return Db.replace(/\"/g, '&quot;').replace(/>/g, '&gt;');
    },
    checkInvalidCharacters: function(ob) {
        var Eb = new RegExp('(\'|")');
        if (Eb.exec(ob)) {
            throw "Parameter '" + ob + "' contains invalid characters";
        }
    }
};
mboxStandardFetcher = function() {};
mboxStandardFetcher.prototype = {
    constructor: mboxStandardFetcher,
    getType: function() {
        return 'standard';
    },
    fetch: function(Fb) {
        Fb.setServerType(this.getType());
        document.write('<' + 'scr' + 'ipt src="' + Fb.buildUrl() + '"><' + '\/scr' + 'ipt>');
    },
    cancel: function() {}
};
mboxAjaxFetcher = function() {};
mboxAjaxFetcher.prototype = {
    constructor: mboxAjaxFetcher,
    getType: function() {
        return 'ajax';
    },
    fetch: function(Fb) {
        Fb.setServerType(this.getType());
        var Gb = document.getElementsByTagName('head')[0],
            Hb = document.createElement('script');
        Hb.src = Fb.buildUrl();
        Gb.appendChild(Hb);
    },
    cancel: function() {}
};
(function(V) {
    function Ib() {}
    Ib.prototype = {
        constructor: Ib,
        getType: function() {
            return 'ajax';
        },
        fetch: function(Fb) {
            Fb.setServerType(this.getType());
            document.write('<' + 'scr' + 'ipt src="' + Fb.buildUrl() + '"><' + '\/scr' + 'ipt>');
        },
        cancel: function() {}
    };
    V.Ib = Ib;
}(TNT.a));
mboxMap = function() {
    this.Jb = {};
    this.Kb = [];
};
mboxMap.prototype = {
    constructor: mboxMap,
    put: function(Lb, Y) {
        if (!this.Jb[Lb]) {
            this.Kb[this.Kb.length] = Lb;
        }
        this.Jb[Lb] = Y;
    },
    get: function(Lb) {
        return this.Jb[Lb];
    },
    remove: function(Lb) {
        var Mb = [];
        this.Jb[Lb] = undefined;
        for (var i = 0; i < this.Kb.length; i++) {
            if (this.Kb[i] !== Lb) {
                Mb.push(this.Kb[i]);
            }
        }
        this.Kb = Mb;
    },
    each: function(vb) {
        for (var pb = 0; pb < this.Kb.length; pb++) {
            var Lb = this.Kb[pb];
            var Y = this.Jb[Lb];
            if (Y) {
                var Nb = vb(Lb, Y);
                if (Nb === false) {
                    break;
                }
            }
        }
    },
    isEmpty: function() {
        return this.Kb.length === 0;
    }
};
mboxList = function() {
    this.Ob = [];
};
mboxList.prototype = {
    constructor: mboxList,
    add: function(Pb) {
        if (!Pb) {
            return;
        }
        this.Ob.push(Pb);
    },
    get: function(x) {
        var Nb = new mboxList();
        for (var pb = 0; pb < this.Ob.length; pb++) {
            var Pb = this.Ob[pb];
            if (Pb.getName() === x) {
                Nb.add(Pb);
            }
        }
        return Nb;
    },
    getById: function(Qb) {
        return this.Ob[Qb];
    },
    length: function() {
        return this.Ob.length;
    },
    each: function(vb) {
        var U = TNT.a.U;
        if (!U.ab(vb)) {
            throw 'Action must be a function, was: ' + typeof(vb);
        }
        for (var pb = 0; pb < this.Ob.length; pb++) {
            vb(this.Ob[pb]);
        }
    }
};
mboxSignaler = function(Rb) {
    this.Rb = Rb;
};
mboxSignaler.prototype = {
    constructor: mboxSignaler,
    signal: function(Sb, x) {
        if (!this.Rb.isEnabled()) {
            return;
        }
        var Tb = mboxSignaler.Ub(),
            Vb = this.Wb(this.Rb.Xb(x));
        Tb.appendChild(Vb);
        var Yb = [].slice.call(arguments, 1),
            Pb = this.Rb.create(x, Yb, Vb),
            Fb = Pb.getUrlBuilder();
        Fb.addParameter(TNT.a.c.d, mboxGenerateId());
        Pb.load();
    },
    Wb: function(Zb) {
        var Nb = document.createElement('div');
        Nb.id = Zb;
        Nb.style.visibility = 'hidden';
        Nb.style.display = 'none';
        return Nb;
    }
};
mboxSignaler.Ub = function() {
    return document.body;
};
mboxLocatorDefault = function(_b) {
    this._b = _b;
    document.write('<div id="' + this._b + '" style="visibility:hidden;display:none">&nbsp;<\/div>');
};
mboxLocatorDefault.prototype = {
    constructor: mboxLocatorDefault,
    locate: function() {
        var ac = 1,
            bc = document.getElementById(this._b);
        while (bc) {
            if (bc.nodeType === ac && bc.className === 'mboxDefault') {
                return bc;
            }
            bc = bc.previousSibling;
        }
        return null;
    },
    force: function() {
        var cc = document.getElementById(this._b),
            dc = document.createElement('div');
        dc.className = 'mboxDefault';
        if (cc) {
            cc.parentNode.insertBefore(dc, cc);
        }
        return dc;
    }
};
mboxLocatorNode = function(bc) {
    this.bc = bc;
};
mboxLocatorNode.prototype = {
    constructor: mboxLocatorNode,
    locate: function() {
        return typeof(this.bc) === 'string' ? document.getElementById(this.bc) : this.bc;
    },
    force: function() {
        return null;
    }
};
mboxOfferContent = function() {
    this.ec = function() {};
};
mboxOfferContent.prototype = {
    constructor: mboxOfferContent,
    show: function(Pb) {
        var Nb = Pb.showContent(document.getElementById(Pb.getImportName()));
        if (Nb === 1) {
            this.ec();
        }
        return Nb;
    },
    setOnLoad: function(ec) {
        this.ec = ec;
    }
};
mboxOfferAjax = function(fc) {
    this.fc = fc;
    this.ec = function() {};
};
mboxOfferAjax.prototype = {
    constructor: mboxOfferAjax,
    setOnLoad: function(ec) {
        this.ec = ec;
    },
    show: function(Pb) {
        var gc = document.createElement('div'),
            Nb;
        gc.id = Pb.getImportName();
        gc.innerHTML = this.fc;
        Nb = Pb.showContent(gc);
        if (Nb === 1) {
            this.ec();
        }
        return Nb;
    }
};
mboxOfferDefault = function() {
    this.ec = function() {};
};
mboxOfferDefault.prototype = {
    constructor: mboxOfferDefault,
    show: function(Pb) {
        var Nb = Pb.hide();
        if (Nb === 1) {
            this.ec();
        }
        return Nb;
    },
    setOnLoad: function(ec) {
        this.ec = ec;
    }
};
mboxCookieManager = function(ob, hc) {
    this.ob = ob;
    this.ic = TNT.a.H.J;
    this.jc = TNT.a.b.crossDomainXOnly;
    this.kc = TNT.a.H.D;
    this.lc = TNT.a.b.usePersistentCookies;
    this.mc = new mboxMap();
    this.hc = hc === '' || hc.indexOf('.') === -1 ? '' : '; domain=' + hc;
    this.loadCookies();
};
mboxCookieManager.prototype = {
    constructor: mboxCookieManager,
    isEnabled: function() {
        this.setCookie(this.ic, 'true', 60);
        this.loadCookies();
        return this.getCookie(this.ic) == 'true';
    },
    setCookie: function(ob, Y, nc) {
        if (typeof ob == 'undefined' || typeof Y == 'undefined' || typeof nc == 'undefined') {
            return;
        }
        var oc = Math.ceil(nc + new Date().getTime() / 1000),
            pc = mboxCookieManager.qc(ob, encodeURIComponent(Y), oc);
        this.mc.put(ob, pc);
        this.saveCookies();
    },
    getCookie: function(ob) {
        var pc = this.mc.get(ob);
        return pc ? decodeURIComponent(pc.value) : null;
    },
    deleteCookie: function(ob) {
        this.mc.remove(ob);
        this.saveCookies();
    },
    getCookieNames: function(rc) {
        var sc = [];
        this.mc.each(function(ob, pc) {
            if (ob.indexOf(rc) === 0) {
                sc[sc.length] = ob;
            }
        });
        return sc;
    },
    saveCookies: function() {
        var tc = this,
            uc = [],
            vc = 0;
        this.mc.each(function(ob, pc) {
            if (!tc.jc || ob === tc.kc) {
                uc[uc.length] = mboxCookieManager.wc(pc);
                if (vc < pc.expireOn) {
                    vc = pc.expireOn;
                }
            }
        });
        var xc = new Date(vc * 1000);
        var Ab = [];
        Ab.push(this.ob, '=', uc.join('|'));
        if (tc.lc) {
            Ab.push('; expires=', xc.toGMTString());
        }
        Ab.push('; path=/', this.hc);
        document.cookie = Ab.join("");
    },
    loadCookies: function() {
        var yc = mboxCookieManager.zc(this.ob),
            Ac = mboxCookieManager.Bc(yc),
            Cc = Math.ceil(new Date().getTime() / 1000);
        this.mc = new mboxMap();
        for (var pb = 0; pb < Ac.length; pb++) {
            var pc = mboxCookieManager.Dc(Ac[pb]);
            if (Cc > pc.expireOn) {
                continue;
            }
            this.mc.put(pc.name, pc);
        }
    }
};
mboxCookieManager.wc = function(pc) {
    return pc.name + '#' + pc.value + '#' + pc.expireOn;
};
mboxCookieManager.Dc = function(W) {
    var Ab = W.split('#');
    return mboxCookieManager.qc(Ab[0], Ab[1], Ab[2]);
};
mboxCookieManager.qc = function(ob, Y, oc) {
    return {
        name: ob,
        value: Y,
        expireOn: oc
    };
};
mboxCookieManager.zc = function(ob) {
    var result = new RegExp('(^|; )' + encodeURIComponent(ob) + '=([^;]*)').exec(document.cookie);
    return result ? result[2] : null;
};
mboxCookieManager.Bc = function(W) {
    if (!W) {
        return [];
    }
    return W.split('|');
};
mboxSession = function(Ec, Fc, Gc, Hc, Ic) {
    var Jc = window.mboxForceSessionId;
    this.Gc = Gc;
    this.Hc = Hc;
    this.Ic = Ic;
    this.Zb = typeof(Jc) !== 'undefined' ? Jc : mboxGetPageParameter(Fc, true);
    this.Zb = this.Zb || Ic.getCookie(Gc) || Ec;
    this.Ic.setCookie(Gc, this.Zb, Hc);
};
mboxSession.prototype = {
    constructor: mboxSession,
    getId: function() {
        return this.Zb;
    },
    forceId: function(Kc) {
        this.Zb = Kc;
        this.Ic.setCookie(this.Gc, this.Zb, this.Hc);
    }
};
mboxPC = function(Gc, Hc, Ic) {
    var Lc = window.mboxForcePCId;
    this.Gc = Gc;
    this.Hc = Hc;
    this.Ic = Ic;
    this.Zb = typeof(Lc) != 'undefined' ? Lc : Ic.getCookie(Gc);
    if (this.Zb) {
        Ic.setCookie(Gc, this.Zb, Hc);
    }
};
mboxPC.prototype = {
    constructor: mboxPC,
    getId: function() {
        return this.Zb;
    },
    forceId: function(Kc) {
        if (this.Zb === Kc) {
            return false;
        }
        this.Zb = Kc;
        this.Ic.setCookie(this.Gc, this.Zb, this.Hc);
        return true;
    }
};
(function(V, U, H, b) {
    var Mc = new RegExp(".*\\.(\\d+)_\\d+");

    function xb(Oc) {
        var Pc = Mc.exec(Oc);
        if (Pc && Pc.length === 2) {
            return "mboxedge" + Pc[1] + ".tt.omtrdc.net";
        }
        return '';
    }

    function Qc(Ic, Rc) {
        var wb = xb(Rc);
        if (!U._(wb)) {
            Ic.setCookie(H.L, wb, b.overrideMboxEdgeServerTimeout);
        }
    }

    function Sc(Tc, Ic) {
        this.Tc = Tc;
        this.Ic = Ic;
        Qc(Ic, Tc.getId());
    }
    Sc.prototype = {
        constructor: Sc,
        getId: function() {
            return this.Tc.getId();
        },
        forceId: function(Kc) {
            if (!this.Tc.forceId(Kc)) {
                return false;
            }
            Qc(this.Ic, Kc);
            return true;
        }
    };
    V.Sc = Sc;
}(TNT.a, TNT.a.U, TNT.a.H, TNT.a.b));
mboxGetPageParameter = function(ob, Uc) {
    Uc = Uc || false;
    var Vc;
    if (Uc) {
        Vc = new RegExp("\\?[^#]*" + ob + "=([^\&;#]*)", "i");
    } else {
        Vc = new RegExp("\\?[^#]*" + ob + "=([^\&;#]*)");
    }
    var Nb = null;
    var Wc = Vc.exec(document.location);
    if (Wc && Wc.length >= 2) {
        Nb = Wc[1];
    }
    return Nb;
};
mboxCookiePageDomain = function() {
    var hc = (/([^:]*)(:[0-9]{0,5})?/).exec(document.location.host)[1];
    var Xc = /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/;
    if (!Xc.exec(hc)) {
        var Yc = (/([^\.]+\.[^\.]{3}|[^\.]+\.[^\.]+\.[^\.]{2})$/).exec(hc);
        if (Yc) {
            hc = Yc[0];
            if (hc.indexOf("www.") === 0) {
                hc = hc.substr(4);
            }
        }
    }
    return hc ? hc : "";
};
mboxShiftArray = function(Zc) {
    var Nb = [];
    for (var pb = 1; pb < Zc.length; pb++) {
        Nb[Nb.length] = Zc[pb];
    }
    return Nb;
};
mboxGenerateId = function() {
    return (new Date()).getTime() + "-" + Math.floor(Math.random() * 999999);
};
mboxScreenHeight = function() {
    return screen.height;
};
mboxScreenWidth = function() {
    return screen.width;
};
mboxBrowserWidth = function() {
    return (window.innerWidth) ? window.innerWidth : document.documentElement ? document.documentElement.clientWidth : document.body.clientWidth;
};
mboxBrowserHeight = function() {
    return (window.innerHeight) ? window.innerHeight : document.documentElement ? document.documentElement.clientHeight : document.body.clientHeight;
};
mboxBrowserTimeOffset = function() {
    return -new Date().getTimezoneOffset();
};
mboxScreenColorDepth = function() {
    return screen.pixelDepth;
};
TNT.a._c = (function() {
    var ad = [],
        bd = 0,
        cd = [];

    function dd(Qb, Yb) {
        bd += 1;
        ad[Qb] = Yb;
        ed();
    }

    function ed() {
        var hb = cd.length,
            ib = -1,
            fd;
        if (bd !== ad.length || !cd.length) {
            return;
        }
        while (++ib < hb) {
            fd = cd[ib];
            fd.fn.apply(fd.ctx, ad);
        }
    }
    return {
        gd: function() {
            var Qb = ad.length;
            ad[ad.length] = null;
            return function() {
                dd(Qb, [].slice.call(arguments));
            };
        },
        hd: function(cb, context) {
            cd.push({
                fn: cb,
                ctx: context
            });
            ed();
        }
    };
}());
mbox = function(ob, Zb, Fb, id, jd, Rb) {
    this.kd = null;
    this.ld = 0;
    this.md = id;
    this.jd = jd;
    this.nd = null;
    this.od = new mboxOfferContent();
    this.Ub = null;
    this.Fb = Fb;
    this.message = '';
    this.pd = {};
    this.qd = 0;
    this.rd = 5;
    this.Zb = Zb;
    this.ob = ob;
    this.sd();
    Fb.addParameter(TNT.a.c.x, ob);
    Fb.addParameter(TNT.a.c.y, Zb);
    this.td = function() {};
    this.ec = function() {};
    this.ud = null;
    this.vd = document.documentMode >= 10 && !Rb.isDomLoaded();
    if (this.vd) {
        this.wd = TNT.a.nestedMboxes;
        this.wd.push(this.ob);
    }
};
mbox.prototype.getId = function() {
    return this.Zb;
};
mbox.prototype.sd = function() {
    var maxLength = TNT.a.M.T;
    if (this.ob.length > maxLength) {
        throw "Mbox Name " + this.ob + " exceeds max length of " + maxLength + " characters.";
    } else if (this.ob.match(/^\s+|\s+$/g)) {
        throw "Mbox Name " + this.ob + " has leading/trailing whitespace(s).";
    }
};
mbox.prototype.getName = function() {
    return this.ob;
};
mbox.prototype.getParameters = function() {
    var lb = this.Fb.getParameters();
    var Nb = [];
    for (var pb = 0; pb < lb.length; pb++) {
        if (lb[pb].name.indexOf('mbox') !== 0) {
            Nb[Nb.length] = lb[pb].name + '=' + lb[pb].value;
        }
    }
    return Nb;
};
mbox.prototype.setOnLoad = function(vb) {
    this.ec = vb;
    return this;
};
mbox.prototype.setMessage = function(xd) {
    this.message = xd;
    return this;
};
mbox.prototype.setOnError = function(td) {
    this.td = td;
    return this;
};
mbox.prototype.setFetcher = function(yd) {
    if (this.nd) {
        this.nd.cancel();
    }
    this.nd = yd;
    return this;
};
mbox.prototype.getFetcher = function() {
    return this.nd;
};
mbox.prototype.load = function(lb) {
    var Fb = this.Fb;
    if (this.nd === null) {
        return this;
    }
    this.setEventTime("load.start");
    this.cancelTimeout();
    this.ld = 0;
    if (lb && lb.length > 0) {
        Fb = this.Fb.clone().addParameters(lb);
    }
    this.nd.fetch(Fb);
    var tc = this;
    this.zd = setTimeout(function() {
        tc.td('browser timeout', tc.nd.getType());
    }, TNT.a.b.mboxTimeout);
    this.setEventTime("load.end");
    return this;
};
mbox.prototype.loaded = function() {
    this.cancelTimeout();
    if (!this.activate() && this.qd < this.rd) {
        var tc = this;
        setTimeout(function() {
            tc.loaded();
        }, TNT.a.b.mboxLoadedTimeout);
    }
};
mbox.prototype.activate = function() {
    if (this.ld) {
        return this.ld;
    }
    this.setEventTime('activate' + (++this.qd) + '.start');
    if (this.vd && this.wd[this.wd.length - 1] !== this.ob) {
        return this.ld;
    }
    if (this.show()) {
        this.cancelTimeout();
        this.ld = 1;
    }
    this.setEventTime('activate' + this.qd + '.end');
    if (this.vd) {
        this.wd.pop();
    }
    return this.ld;
};
mbox.prototype.isActivated = function() {
    return this.ld;
};
mbox.prototype.setOffer = function(od) {
     if (od && od.show && od.setOnLoad && !CQ_Analytics.TestTarget.defaultContentTimeout) {
		console.log(true);
        this.od = od;
    } else {
        throw 'Invalid offer or offer arriving too late';
    }
    var Bd = TNT.a.b.globalMboxName === this.ob;
    Bd = Bd && od instanceof mboxOfferDefault;
    Bd = Bd && this.nd !== null;
    Bd = Bd && this.nd.getType() === 'ajax';
    if (!Bd) {
        this.od = od;
        return this;
    }
    var Cd = this.od.ec;
    this.od = od;
    this.od.setOnLoad(Cd);
    return this;
};
mbox.prototype.getOffer = function() {
    return this.od;
};
mbox.prototype.show = function() {
    this.setEventTime('show.start');
    var Nb = this.od.show(this);
    this.setEventTime(Nb == 1 ? "show.end.ok" : "show.end");
    return Nb;
};
mbox.prototype.showContent = function(fc) {
    if (!mbox.Dd(fc)) {
        return 0;
    }
    this.Ub = mbox.Ed(this, this.Ub);
    if (this.Ub === null) {
        return 0;
    }
    if (!mbox.Fd(document.body, this.Ub)) {
        return 0;
    }
    if (this.Ub === fc) {
        this.Gd(this.Ub);
        this.ec();
        return 1;
    }
    this.Hd(this.Ub);
    this.Hd(fc);
    mbox.Id(this, fc);
    this.Gd(this.Ub);
    this.ec();
    return 1;
};
mbox.Dd = function(fc) {
    return fc !== undefined && fc !== null;
};
mbox.Fd = function(Jd, Kd) {
    var DOCUMENT_POSITION_CONTAINED_BY = 16;
    var Ld = Jd.contains !== undefined;
    if (Ld) {
        return Jd !== Kd && Jd.contains(Kd);
    } else {
        return Boolean(Jd.compareDocumentPosition(Kd) & DOCUMENT_POSITION_CONTAINED_BY);
    }
};
mbox.Ed = function(Pb, dc) {
    if (dc !== undefined && dc !== null && mbox.Fd(document.body, dc)) {
        return dc;
    }
    return Pb.getDefaultDiv();
};
mbox.Id = function(Pb, Md) {
    Pb.Ub.parentNode.replaceChild(Md, Pb.Ub);
    Pb.Ub = Md;
};
mbox.prototype.hide = function() {
    this.setEventTime('hide.start');
    var Nb = this.showContent(this.getDefaultDiv());
    this.setEventTime(Nb == 1 ? 'hide.end.ok' : 'hide.end.fail');
    return Nb;
};
mbox.prototype.finalize = function() {
    this.setEventTime('finalize.start');
    this.cancelTimeout();
    if (!this.getDefaultDiv()) {
        if (this.md.force()) {
            this.setMessage('No default content, an empty one has been added');
        } else {
            this.setMessage('Unable to locate mbox');
        }
    }
    if (!this.activate()) {
        this.hide();
        this.setEventTime('finalize.end.hide');
    }
    this.setEventTime('finalize.end.ok');
};
mbox.prototype.cancelTimeout = function() {
    if (this.zd) {
        clearTimeout(this.zd);
    }
    if (this.nd) {
        this.nd.cancel();
    }
};
mbox.prototype.getDiv = function() {
    return this.Ub;
};
mbox.prototype.getDefaultDiv = function() {
    if (this.ud === null) {
        this.ud = this.md.locate();
    }
    return this.ud;
};
mbox.prototype.setEventTime = function(Nd) {
    this.pd[Nd] = (new Date()).getTime();
};
mbox.prototype.getEventTimes = function() {
    return this.pd;
};
mbox.prototype.getImportName = function() {
    return this.jd;
};
mbox.prototype.getURL = function() {
    return this.Fb.buildUrl();
};
mbox.prototype.getUrlBuilder = function() {
    return this.Fb;
};
mbox.prototype.Od = function(dc) {
    return dc.style.display != 'none';
};
mbox.prototype.Gd = function(dc) {
    this.Pd(dc, true);
};
mbox.prototype.Hd = function(dc) {
    this.Pd(dc, false);
};
mbox.prototype.Pd = function(dc, Qd) {
    dc.style.visibility = Qd ? "visible" : "hidden";
    dc.style.display = Qd ? "block" : "none";
};
mbox.prototype.Rd = function() {
    this.vd = false;
};
mbox.prototype.relocateDefaultDiv = function() {
    this.ud = this.md.locate();
};
mboxFactory = function(wb, kb, Sd) {
    var Td = TNT.a;
    var b = Td.b;
    var H = Td.H;
    var C = Td.C;
    var M = Td.M;
    var Ud = b.mboxVersion;
    this.Vd = false;
    this.Sd = Sd;
    this.Ob = new mboxList();
    mboxFactories.put(Sd, this);
    this.Wd = b.mboxIsSupportedFunction() && typeof(window.attachEvent || document.addEventListener || window.addEventListener) != 'undefined';
    this.Xd = this.Wd && mboxGetPageParameter(C.D, true) === null;
    var Yd = Sd == M.N;
    var Gc = M.O + (Yd ? '' : ('-' + Sd));
    this.Ic = new mboxCookieManager(Gc, b.cookieDomainFunction());
    if (!b.crossDomainXOnly) {
        this.Xd = this.Xd && this.Ic.isEnabled();
    }
    this.Xd = this.Xd && TNT.a.U.Z(this.Ic.getCookie(H.D)) && TNT.a.U.Z(this.Ic.getCookie(H.K));
    if (this.isAdmin()) {
        this.enable();
    }
    this.Zd();
    this._d = mboxGenerateId();
    this.ae = mboxScreenHeight();
    this.be = mboxScreenWidth();
    this.ce = mboxBrowserWidth();
    this.de = mboxBrowserHeight();
    this.ee = mboxScreenColorDepth();
    this.fe = mboxBrowserTimeOffset();
    this.ge = new mboxSession(this._d, C.E, H.E, b.sessionExpirationTimeout, this.Ic);
    var Tc = new mboxPC(H.m, b.tntIdLifetime, this.Ic);
    this.he = b.overrideMboxEdgeServer ? new Td.Sc(Tc, this.Ic) : Tc;
    this.Fb = new mboxUrlBuilder(wb, kb);
    this.ie(this.Fb, Yd, Ud);
    this.je = new Date().getTime();
    this.ke = this.je;
    var tc = this;
    this.addOnLoad(function() {
        tc.ke = new Date().getTime();
    });
    if (this.Wd) {
        this.addOnLoad(function() {
            tc.Vd = true;
            tc.getMboxes().each(function(Pb) {
                Pb.Rd();
                Pb.setFetcher(new mboxAjaxFetcher());
                Pb.finalize();
            });
            TNT.a.nestedMboxes = [];
        });
        if (this.Xd) {
            this.limitTraffic(b.trafficLevelPercentage, b.trafficDuration);
            this.le();
            this.me = new mboxSignaler(this);
        } else {
            if (!b.isProduction) {
                if (this.isAdmin()) {
                    if (!this.isEnabled()) {
                        alert("mbox disabled, probably due to timeout\n" + "Reset your cookies to re-enable\n(this message will only appear in administrative mode)");
                    } else {
                        alert("It looks like your browser will not allow " + b.companyName + " to set its administrative cookie. To allow setting the" + " cookie please lower the privacy settings of your browser.\n" + "(this message will only appear in administrative mode)");
                    }
                }
            }
        }
    }
};
mboxFactory.prototype.forcePCId = function(Kc) {
    if (!TNT.a.b.clientTntIdSupport) {
        return;
    }
    if (this.he.forceId(Kc)) {
        this.ge.forceId(mboxGenerateId());
    }
};
mboxFactory.prototype.forceSessionId = function(Kc) {
    if (!TNT.a.b.clientSessionIdSupport) {
        return;
    }
    this.ge.forceId(Kc);
};
mboxFactory.prototype.isEnabled = function() {
    return this.Xd;
};
mboxFactory.prototype.getDisableReason = function() {
    return this.Ic.getCookie(TNT.a.H.D);
};
mboxFactory.prototype.isSupported = function() {
    return this.Wd;
};
mboxFactory.prototype.disable = function(nc, ne) {
    if (typeof nc == 'undefined') {
        nc = 60 * 60;
    }
    if (typeof ne == 'undefined') {
        ne = 'unspecified';
    }
    if (!this.isAdmin()) {
        this.Xd = false;
        this.Ic.setCookie(TNT.a.H.D, ne, nc);
    }
};
mboxFactory.prototype.enable = function() {
    this.Xd = true;
    this.Ic.deleteCookie(TNT.a.H.D);
};
mboxFactory.prototype.isAdmin = function() {
    return document.location.href.indexOf(TNT.a.C.F) != -1;
};
mboxFactory.prototype.limitTraffic = function(oe, nc) {
    if (TNT.a.b.trafficLevelPercentage != 100) {
        if (oe == 100) {
            return;
        }
        var pe = true;
        if (parseInt(this.Ic.getCookie(TNT.a.H.I)) != oe) {
            pe = (Math.random() * 100) <= oe;
        }
        this.Ic.setCookie(TNT.a.H.I, oe, nc);
        if (!pe) {
            this.disable(60 * 60, 'limited by traffic');
        }
    }
};
mboxFactory.prototype.addOnLoad = function(qe) {
    if (this.isDomLoaded()) {
        qe();
    } else {
        var re = false;
        var se = function() {
            if (re) {
                return;
            }
            re = true;
            qe();
        };
        this.te.push(se);
        if (this.isDomLoaded() && !re) {
            se();
        }
    }
};
mboxFactory.prototype.getEllapsedTime = function() {
    return this.ke - this.je;
};
mboxFactory.prototype.getEllapsedTimeUntil = function(A) {
    return A - this.je;
};
mboxFactory.prototype.getMboxes = function() {
    return this.Ob;
};
mboxFactory.prototype.get = function(x, y) {
    return this.Ob.get(x).getById(y || 0);
};
mboxFactory.prototype.update = function(x, lb) {
    var Td = TNT.a,
        c = Td.c;
    if (!this.isEnabled()) {
        return;
    }
    var tc = this;
    if (!this.isDomLoaded()) {
        this.addOnLoad(function() {
            tc.update(x, lb);
        });
        return;
    }
    if (this.Ob.get(x).length() === 0) {
        throw "Mbox " + x + " is not defined";
    }
    this.Ob.get(x).each(function(Pb) {
        var Fb = Pb.getUrlBuilder();
        Fb.addParameter(c.d, mboxGenerateId());
        tc.ue(Fb, x);
        tc.ve(Fb);
        tc.we(Fb, x);
        Pb.load(lb);
    });
};
mboxFactory.prototype.setVisitorIdParameters = function(Fb, x) {
    this.ue(Fb, x);
};
mboxFactory.prototype.create = function(x, lb, xe) {
    var Pb = this.ye(x, lb, xe);
    if (Pb) {
        this.ue(Pb.getUrlBuilder(), x);
    }
    return Pb;
};
mboxFactory.prototype.ze = function(x, lb, xe) {
    return this.ye(x, lb, xe);
};
mboxFactory.prototype.ye = function(x, lb, xe) {
    if (!this.isSupported()) {
        return null;
    }
    var Ae = new Date();
    var A = Ae.getTime() - (Ae.getTimezoneOffset() * TNT.a.M.Q);
    var Fb = this.Fb.clone();
    Fb.addParameter(TNT.a.c.j, this.Ob.length() + 1);
    Fb.addParameter(TNT.a.c.A, A);
    Fb.addParameters(lb);
    this.ve(Fb);
    this.we(Fb, x);
    var y, md, Pb;
    if (xe) {
        md = new mboxLocatorNode(xe);
    } else {
        if (this.Vd) {
            throw 'The page has already been loaded, can\'t write marker';
        }
        md = new mboxLocatorDefault(this.Xb(x));
    }
    try {
        y = this.Ob.get(x).length();
        Pb = new mbox(x, y, Fb, md, this.Be(x), this);
        if (this.Xd) {
            Pb.setFetcher(this.Vd ? new mboxAjaxFetcher() : new mboxStandardFetcher());
        }
        var tc = this;
        Pb.setOnError(function(xd, tb) {
            Pb.setMessage(xd);
            Pb.activate();
            if (!Pb.isActivated()) {
                tc.disable(TNT.a.b.mboxFactoryDisabledTimeout, xd);
                window.location.reload(false);
            }
        });
        this.Ob.add(Pb);
    } catch (Ce) {
        this.disable();
        throw 'Failed creating mbox "' + x + '", the error was: ' + Ce;
    }
    return Pb;
};
mboxFactory.prototype.ve = function(Fb) {
    var m = this.he.getId();
    if (m) {
        Fb.addParameter(TNT.a.c.m, m);
    }
};
mboxFactory.prototype.ue = function(Fb, x) {
    var Td = TNT.a,
        De = Td.b.imsOrgId,
        kb = Td.b.clientCode,
        Ee = Td.c.i,
        i = Td.Fe(De, kb, x);
    if (i) {
        Fb.addParameter(Ee, i);
    }
};
mboxFactory.prototype.we = function(Fb, x) {
    var Ge = !TNT.isAutoCreateGlobalMbox() && TNT.getGlobalMboxName() === x;
    if (Ge) {
        Fb.addParameters(TNT.getTargetPageParameters());
    }
};
mboxFactory.prototype.getCookieManager = function() {
    return this.Ic;
};
mboxFactory.prototype.getPageId = function() {
    return this._d;
};
mboxFactory.prototype.getPCId = function() {
    return this.he;
};
mboxFactory.prototype.getSessionId = function() {
    return this.ge;
};
mboxFactory.prototype.getSignaler = function() {
    return this.me;
};
mboxFactory.prototype.getUrlBuilder = function() {
    return this.Fb;
};
mboxFactory.prototype.He = function(x) {
    return this.Sd + '-' + x + '-' + this.Ob.get(x).length();
};
mboxFactory.prototype.Xb = function(x) {
    return TNT.a.M.S + this.He(x);
};
mboxFactory.prototype.Be = function(x) {
    return TNT.a.M.P + this.He(x);
};
mboxFactory.prototype.ie = function(Fb, Yd, Ud) {
    Fb.addParameter(TNT.a.c.k, document.location.hostname);
    Fb.addParameter(TNT.a.c.d, this._d);
    Fb.addParameter(TNT.a.c.n, this.ae);
    Fb.addParameter(TNT.a.c.o, this.be);
    Fb.addParameter(TNT.a.c.p, this.ce);
    Fb.addParameter(TNT.a.c.q, this.de);
    Fb.addParameter(TNT.a.c.r, this.fe);
    Fb.addParameter(TNT.a.c.s, this.ee);
    Fb.addParameter(TNT.a.C.E, this.ge.getId());
    if (!Yd) {
        Fb.addParameter(TNT.a.c.l, this.Sd);
    }
    this.ve(Fb);
    if (TNT.a.b.crossDomainEnabled) {
        Fb.addParameter(TNT.a.c.t, TNT.a.b.crossDomain);
    }
    var c = TNT.getClientMboxExtraParameters();
    if (c) {
        Fb.addParameters(c.split('&'));
    }
    Fb.setUrlProcessAction(function(u) {
        if (TNT.a.b.passPageParameters) {
            u += '&';
            u += TNT.a.c.u;
            u += '=' + encodeURIComponent(document.location);
            var v = encodeURIComponent(document.referrer);
            if (u.length + v.length < 2000) {
                u += '&';
                u += TNT.a.c.v;
                u += '=' + v;
            }
        }
        u += '&';
        u += TNT.a.c.w;
        u += '=' + Ud;
        return u;
    });
};
mboxFactory.prototype.le = function() {
    document.write('<style>.' + TNT.a.M.R + ' { visibility:hidden; }</style>');
};
mboxFactory.prototype.isDomLoaded = function() {
    return this.Vd;
};
mboxFactory.prototype.Zd = function() {
    if (this.te) {
        return;
    }
    this.te = [];
    var tc = this;
    (function() {
        var Ie = document.addEventListener ? "DOMContentLoaded" : "onreadystatechange";
        var Je = false;
        var Ke = function() {
            if (Je) {
                return;
            }
            Je = true;
            for (var i = 0; i < tc.te.length; ++i) {
                tc.te[i]();
            }
        };
        if (document.addEventListener) {
            document.addEventListener(Ie, function() {
                document.removeEventListener(Ie, arguments.callee, false);
                Ke();
            }, false);
            window.addEventListener("load", function() {
                document.removeEventListener("load", arguments.callee, false);
                Ke();
            }, false);
        } else if (document.attachEvent) {
            if (self !== self.top) {
                document.attachEvent(Ie, function() {
                    if (document.readyState === 'complete') {
                        document.detachEvent(Ie, arguments.callee);
                        Ke();
                    }
                });
            } else {
                var Le = function() {
                    try {
                        document.documentElement.doScroll('left');
                        Ke();
                    } catch (Me) {
                        setTimeout(Le, 13);
                    }
                };
                Le();
            }
        }
        if (document.readyState === "complete") {
            Ke();
        }
    })();
};
mboxScPluginFetcher = function(kb, Ne) {
    this.kb = kb;
    this.Ne = Ne;
};
mboxScPluginFetcher.prototype = {
    constructor: mboxScPluginFetcher,
    getType: function() {
        return 'ajax';
    },
    fetch: function(Fb) {
        Fb.setServerType(this.getType());
        var Gb = document.getElementsByTagName('head')[0],
            Hb = document.createElement('script');
        Hb.src = this.Oe(Fb);
        Gb.appendChild(Hb);
    },
    cancel: function() {},
    Oe: function(Fb) {
        Fb.setBasePath('/m2/' + this.kb + '/sc/standard');
        this.Pe(Fb);
        var Qe = TNT.a.c.B;
        var Re = TNT.a.M.B;
        Fb.addParameter(Qe, Re);
        return Fb.buildUrl();
    },
    Pe: function(Fb) {
        var Se = ["dynamicVariablePrefix", "visitorID", "vmk", "ppu", "charSet", "visitorNamespace", "cookieDomainPeriods", "cookieLifetime", "pageName", "currencyCode", "variableProvider", "channel", "server", "pageType", "transactionID", "purchaseID", "campaign", "state", "zip", "events", "products", "linkName", "linkType", "resolution", "colorDepth", "javascriptVersion", "javaEnabled", "cookiesEnabled", "browserWidth", "browserHeight", "connectionType", "homepage", "pe", "pev1", "pev2", "pev3", "visitorSampling", "visitorSamplingGroup", "dynamicAccountSelection", "dynamicAccountList", "dynamicAccountMatch", "trackDownloadLinks", "trackExternalLinks", "trackInlineStats", "linkLeaveQueryString", "linkDownloadFileTypes", "linkExternalFilters", "linkInternalFilters", "linkTrackVars", "linkTrackEvents", "linkNames", "lnk", "eo"];
        for (var pb = 0; pb < Se.length; pb++) {
            this.Te(Se[pb], Fb);
        }
        for (pb = 1; pb <= 75; pb++) {
            this.Te('prop' + pb, Fb);
            this.Te('eVar' + pb, Fb);
            this.Te('hier' + pb, Fb);
        }
    },
    Te: function(ob, Fb) {
        var U = TNT.a.U,
            Y = this.Ne[ob];
        if (U._(Y) || U.db(Y)) {
            return;
        }
        Fb.addParameter(ob, Y);
    }
};
(function(V) {
    function Ue(Rb, Ne) {
        if (!Ne) {
            return null;
        }
        var Ve = TNT.a.b.siteCatalystPluginName,
            kb = TNT.a.b.clientCode,
            U = TNT.a.U;
        Ne["m_" + Ve] = function(Ne) {
            var We = '_t',
                Ye = 'm_i',
                Ze = Ne[Ye](Ve);
            Ze.Xd = true;
            Ze.kb = kb;
            Ze[We] = function() {
                if (!this.isEnabled()) {
                    return;
                }
                var Pb = this.ye(),
                    yd = new mboxScPluginFetcher(this.kb, this.s);
                if (Pb) {
                    Pb.setFetcher(yd);
                    Pb.load();
                }
            };
            Ze.isEnabled = function() {
                return this.Xd && Rb.isEnabled();
            };
            Ze.ye = function() {
                var x = this._e(),
                    dc = document.createElement('div');
                if (!U.X(document.body)) {
                    document.body.appendChild(dc);
                }
                return Rb.create(x, [], dc);
            };
            Ze._e = function() {
                var af = this.s.events && this.s.events.indexOf('purchase') != -1;
                return 'SiteCatalyst: ' + (af ? 'purchase' : 'event');
            };
        };
        return Ne.loadModule(Ve);
    }
    V.Ue = Ue;
}(TNT.a));
(function(V) {
    function bf(cf, Gc, nc, Ic) {
        if (cf.targetJSLoaded) {
            return;
        }
        Ic.setCookie(Gc, true, nc);
        window.location.reload();
    }

    function df(b, H, Ic) {
        var ef = '_AT',
            gf = 50,
            Gc = H.K,
            nc = b.experienceManagerDisabledTimeout,
            kd = b.experienceManagerTimeout,
            u = b.experienceManagerPluginUrl,
            hf = function(jf) {},
            kf = function(jf) {
                setTimeout(function() {
                    window[ef].applyWhenReady(jf);
                }, gf);
            };
        if (ef in window) {
            return;
        }
        window[ef] = {};
        if (Ic.getCookie(Gc) !== 'true') {
            document.write('<scr' + 'ipt src="' + u + '"><\/sc' + 'ript>');
            window[ef].applyWhenReady = kf;
            setTimeout(function() {
                bf(window[ef], Gc, nc, Ic);
            }, kd);
        } else {
            window[ef].applyWhenReady = hf;
        }
    }
    V.df = df;
}(TNT.a));
(function(V, U, c, _c) {
    var lf = new RegExp("\\|MCMID\\|"),
        mf = false,
        nf = [],
        of = [],
        pf = [];

    function qf(rf) {
        var sf, tf = function(Lb) {
            return 'vst.' + Lb;
        };
        if (!U.ab(rf.getCustomerIDs)) {
            return [];
        }
        sf = rf.getCustomerIDs();
        if (!U.db(sf)) {
            return [];
        }
        return V.uf(sf, [], tf);
    }

    function vf(rf, wf, Lb) {
        var xf;
        if (!U.ab(rf[wf])) {
            return;
        }
        xf = _c.gd();
        rf[wf](function(Y) {
            xf({
                key: Lb,
                value: Y
            });
        }, true);
    }

    function yf(rf, wf, Lb) {
        var Y;
        if (!U.ab(rf[wf])) {
            return;
        }
        Y = rf[wf]();
        if (!U._(Y)) {
            nf.push({
                key: Lb,
                value: Y
            });
        }
    }

    function zf(rf, Af) {
        Af(rf, 'getMarketingCloudVisitorID', c.e);
        Af(rf, 'getAudienceManagerBlob', c.g);
        Af(rf, 'getAnalyticsVisitorID', c.h);
        Af(rf, 'getAudienceManagerLocationHint', c.f);
    }

    function Bf(rf) {
        zf(rf, vf);
    }

    function Cf(rf) {
        zf(rf, yf);
    }

    function Df(Yb) {
        U.eb(Yb, function(fb) {
            nf.push(fb[0]);
        });
    }

    function Ef(Ff) {
        return !U._(Ff.value);
    }

    function Gf(Ff, Fb) {
        if (!Ef(Ff)) {
            return;
        }
        Fb.addParameter(Ff.key, Ff.value);
    }

    function Hf(Fb) {
        U.eb(nf, function(Ff) {
            Gf(Ff, Fb);
        });
    }

    function If(Rb, Ff) {
        var Pb = Ff.mbox;
        if (!Pb) {
            return;
        }
        switch (Ff.type) {
            case 'created':
                Pb.setFetcher(new mboxAjaxFetcher());
                Pb.load();
                break;
            case 'defined':
                Rb.update(Pb.getName(), Ff.params);
                break;
        }
    }

    function Jf(Rb, Kf) {
        _c.hd(function() {
            mf = false;
            Df([].slice.call(arguments));
            Hf(Rb.getUrlBuilder());
            U.eb(of, function(Ff) {
                Hf(Ff.mbox.getUrlBuilder());
                If(Rb, Ff);
            });
            setTimeout(Lf, Kf);
        });
    }

    function Mf(De) {
        var rf;
        if (U._(De) || U.X(window.Visitor) || !U.ab(window.Visitor.getInstance)) {
            return null;
        }
        rf = window.Visitor.getInstance(De);
        if (U.X(rf) || U.Z(rf) || !rf.isAllowed()) {
            return null;
        }
        return rf;
    }

    function Nf(rf) {
        var Of = rf.cookieRead(rf.cookieName);
        if (U._(Of)) {
            return true;
        }
        return !lf.test(Of);
    }

    function Pf(Rb, b) {
        var De = b.imsOrgId,
            Qf = b.visitorApiTimeout,
            Kf = b.visitorApiPageDisplayTimeout,
            Fb = Rb.getUrlBuilder(),
            rf;
        if (!Rb.isEnabled()) {
            return;
        }
        rf = Mf(De);
        if (U.Z(rf) || U.X(rf.cookieName) || !U.ab(rf.cookieRead)) {
            return;
        }
        Fb.addParameters(qf(rf));
        if (Nf(rf)) {
            mf = true;
            if (!U.X(rf.loadTimeout)) {
                rf.loadTimeout = Qf;
            }
            Rf();
            Sf();
            Bf(rf);
            Jf(Rb, Kf);
        } else {
            mf = false;
            Cf(rf);
            Hf(Fb);
        }
    }

    function Tf() {
        return mf;
    }

    function Uf(Ff) {
        switch (Ff.type) {
            case 'created':
                of.push(Ff);
                break;
            case 'defined':
                pf.push(Ff);
                break;
        }
    }

    function Vf(x) {
        var hb = pf.length,
            ib = -1;
        while (++ib < hb) {
            if (pf[ib].mbox.getName() === x) {
                return true;
            }
        }
        return false;
    }

    function Wf(Rb, x, c) {
        var Xf = nf.length > 0,
            Yf = [],
            hb = pf.length,
            ib = -1,
            Fb, Ff;
        while (++ib < hb) {
            Ff = pf[ib];
            Fb = Ff.mbox.getUrlBuilder();
            if (Ff.mbox.getName() !== x) {
                Yf.push(Ff);
                continue;
            }
            if (!Xf) {
                Ff.params = c;
                of.push(Ff);
                continue;
            }
            Fb.addParameters(c);
            Hf(Fb);
            If(Rb, Ff);
        }
        pf = Yf;
    }

    function Fe(De, kb, x) {
        var rf = Mf(De);
        if (U.Z(rf) || !U.ab(rf.getSupplementalDataID)) {
            return '';
        }
        return rf.getSupplementalDataID('mbox:' + kb + ':' + x);
    }

    function Sf() {
        document.documentElement.style.display = 'none';
    }

    function Lf() {
        document.documentElement.style.display = '';
    }

    function Zf() {
        if (window.addEventListener) {
            window.addEventListener('error', function _f() {
                Lf();
                window.removeEventListener('error', _f);
            });
        }
    }

    function ag() {
        if (window.attachEvent) {
            window.attachEvent('onerror', function bg() {
                Lf();
                window.detachEvent('onerror', bg);
            });
        }
    }

    function Rf() {
        Zf();
        ag();
    }
    V.Mf = Mf;
    V.Pf = Pf;
    V.Tf = Tf;
    V.Uf = Uf;
    V.Vf = Vf;
    V.Wf = Wf;
    V.Fe = Fe;
}(TNT.a, TNT.a.U, TNT.a.c, TNT.a._c));
(function(V, a, U, b, c, M) {
    function cg() {
        return b.globalMboxName;
    }

    function dg() {
        return b.globalMboxLocationDomId;
    }

    function eg() {
        return b.globalMboxAutoCreate;
    }

    function fg() {
        return b.parametersFunction();
    }

    function gg() {
        var ac = 1,
            hg = document.getElementsByTagName('script'),
            bc = hg[hg.length - 1];
        while (bc) {
            if (bc.nodeType === ac && bc.className === M.R) {
                return bc;
            }
            bc = bc.previousSibling;
        }
        return null;
    }

    function ig(Rb, x, c) {
        var Td = TNT.a,
            xe, Pb;
        if (Td.Tf()) {
            xe = gg();
            Pb = Rb.create(x, c, xe);
            Td.Uf({
                mbox: Pb,
                type: 'created'
            });
            return Pb;
        } else {
            Pb = Rb.create(x, c);
        }
        if (Pb && Rb.isEnabled()) {
            Pb.load();
        }
        return Pb;
    }

    function jg(Rb, xe, x, c) {
        var Td = TNT.a,
            Pb = Rb.ze(x, c, xe);
        if (Td.Tf()) {
            Td.Uf({
                mbox: Pb,
                type: 'defined'
            });
        }
        return Pb;
    }

    function kg(Rb, x, c) {
        var Td = TNT.a;
        if (Td.Vf(x)) {
            Td.Wf(Rb, x, c);
            return;
        }
        Rb.update(x, c);
    }

    function lg(Ic, ob) {
        return Ic.getCookie(ob);
    }

    function mg(Ic, ob, Y, nc) {
        Ic.setCookie(ob, Y, nc);
    }

    function ng(og) {
        var Nb = [];
        var pg = /([^&=]+)=([^&]*)/g;
        var qg = decodeURIComponent;
        var Pc = pg.exec(og);
        while (Pc) {
            Nb.push([qg(Pc[1]), qg(Pc[2])].join('='));
            Pc = pg.exec(og);
        }
        return Nb;
    }

    function uf(rg, Kb, tf) {
        var Nb = [];
        for (var Lb in rg) {
            if (!rg.hasOwnProperty(Lb)) {
                continue;
            }
            var Y = rg[Lb];
            if (U.db(Y)) {
                Kb.push(Lb);
                Nb = Nb.concat(uf(Y, Kb, tf));
                Kb.pop();
            } else {
                if (Kb.length > 0) {
                    Nb.push([tf(Kb.concat(Lb).join('.')), Y].join('='));
                } else {
                    Nb.push([tf(Lb), Y].join('='));
                }
            }
        }
        return Nb;
    }

    function sg() {
        var tg = window.targetPageParams,
            tf = function(Lb) {
                return Lb
            };
        if (!U.ab(tg)) {
            return [];
        }
        var Nb = null;
        try {
            Nb = tg();
        } catch (ug) {}
        if (U.Z(Nb)) {
            return [];
        }
        if (U.bb(Nb)) {
            return Nb;
        }
        if (U.cb(Nb) && !U._(Nb)) {
            return ng(Nb);
        }
        if (U.db(Nb)) {
            return uf(Nb, [], tf);
        }
        return [];
    }

    function vg(Rb) {
        var wg = cg(),
            xg = dg(),
            yg = sg(),
            zg, Ag, Bg;
        if (!xg) {
            xg = "mbox-" + wg + "-" + mboxGenerateId();
            zg = document.createElement("div");
            zg.className = "mboxDefault";
            zg.id = xg;
            zg.style.visibility = "hidden";
            zg.style.display = "none";
            Ag = setInterval(function() {
                if (document.body) {
                    clearInterval(Ag);
                    document.body.insertBefore(zg, document.body.firstChild);
                }
            }, b.bodyPollingTimeout);
        }
        Bg = Rb.create(wg, yg, xg);
        if (TNT.a.Tf()) {
            TNT.a.Uf({
                mbox: Bg,
                params: [],
                type: 'created'
            });
            return;
        }
        if (Bg && Rb.isEnabled()) {
            if (!Rb.isDomLoaded()) {
                Bg.setFetcher(new a.Ib());
            }
            Bg.load();
        }
    }

    function Cg(Rb, x, lb) {
        if (!Rb.isEnabled()) {
            return;
        }
        var Ae = new Date(),
            Dg = Ae.getTimezoneOffset() * M.Q,
            Fb = Rb.getUrlBuilder().clone();
        Fb.setBasePath('/m2/' + b.clientCode + '/viztarget');
        Fb.addParameter(c.x, x);
        Fb.addParameter(c.y, 0);
        Fb.addParameter(c.j, Rb.getMboxes().length() + 1);
        Fb.addParameter(c.A, Ae.getTime() - Dg);
        Fb.addParameter(c.d, mboxGenerateId());
        Fb.addParameter(c.z, Rb.isDomLoaded());
        if (lb && lb.length > 0) {
            Fb.addParameters(lb);
        }
        Rb.ve(Fb);
        Rb.we(Fb, x);
        Rb.ue(Fb, x);
        return Fb.buildUrl();
    }

    function Eg() {
        return new mboxMap();
    }

    function Fg(Gg, kb, Sd) {
        return new mboxFactory(Gg, kb, Sd);
    }
    a.ig = ig;
    a.jg = jg;
    a.kg = kg;
    a.Cg = Cg;
    a.lg = lg;
    a.mg = mg;
    a.vg = vg;
    a.Eg = Eg;
    a.Fg = Fg;
    a.uf = uf;
    V.getGlobalMboxName = cg;
    V.getGlobalMboxLocation = dg;
    V.isAutoCreateGlobalMbox = eg;
    V.getClientMboxExtraParameters = fg;
    V.getTargetPageParameters = sg;
}(TNT, TNT.a, TNT.a.U, TNT.a.b, TNT.a.c, TNT.a.M));
(function(V) {
    function Hg(Ic, b, Ig, Jg) {
        var Kg = 60 * 60,
            Lg = mboxGetPageParameter(Ig, true) || Ic.getCookie(Jg);
        if (!Lg) {
            return;
        }
        setTimeout(function() {
            if (typeof(window.mboxDebugLoaded) === 'undefined') {
                alert('Could not load the remote debug.\nPlease check your connection to ' + b.companyName + ' servers');
            }
        }, Kg);
        var Ab = [];
        Ab.push(b.adminUrl, '/mbox/mbox_debug.jsp', '?');
        Ab.push('mboxServerHost', '=', b.serverHost, '&');
        Ab.push('clientCode', '=', b.clientCode);
        document.write('<' + 'scr' + 'ipt src="' + Ab.join('') + '"><' + '\/scr' + 'ipt>');
    }

    function Mg(b, Ng) {
        var U = V.U,
            Og, Pg, Y;
        if (U.X(b) || U.Z(b) || !U.db(b)) {
            return Ng;
        }
        for (var Lb in b) {
            Og = b.hasOwnProperty(Lb) && Ng.hasOwnProperty(Lb);
            Y = b[Lb];
            Pg = !U.X(Y) && !U.Z(Y);
            if (Og && Pg) {
                Ng[Lb] = Y;
            }
        }
        return Ng;
    }

    function Qg(Rb, Ic) {
        TNT.createGlobalMbox = function() {
            V.vg(Rb);
        };
        window.mboxCreate = function(x) {
            var c = [].slice.call(arguments, 1);
            return V.ig(Rb, x, c);
        };
        window.mboxDefine = function(xe, x) {
            var c = [].slice.call(arguments, 2);
            return V.jg(Rb, xe, x, c);
        };
        window.mboxUpdate = function(x) {
            var c = [].slice.call(arguments, 1);
            V.kg(Rb, x, c);
        };
        window.mboxVizTargetUrl = function(x) {
            var c = [].slice.call(arguments, 1);
            return V.Cg(Rb, x, c);
        };
        window.mboxSetCookie = function(ob, Y, nc) {
            return V.mg(Ic, ob, Y, nc);
        };
        window.mboxGetCookie = function(ob) {
            return V.lg(Ic, ob);
        };
        if (typeof(V.Ue) !== 'undefined') {
            window.mboxLoadSCPlugin = function(Ne) {
                return V.Ue(Rb, Ne);
            }
        }
    }

    function Rg() {
        if (typeof(window.mboxVersion) !== 'undefined') {
            return;
        }
        V.b = Mg(window.targetGlobalSettings, V.b);
        var b = V.b,
            Ud = b.mboxVersion,
            Gg = b.serverHost,
            kb = b.clientCode,
            N = V.M.N,
            Ig = V.C.G,
            Jg = V.H.G,
            Sg = V.H.L,
            Rb, Ic;
        window.mboxFactories = V.Eg();
        window.mboxFactoryDefault = Rb = V.Fg(Gg, kb, N);
        window.mboxVersion = Ud;
        Ic = Rb.getCookieManager();
        Qg(Rb, Ic);
        Hg(Ic, b, Ig, Jg);
        V.xb = function(Tg) {
            var jb;
            if (!b.overrideMboxEdgeServer) {
                return Tg;
            }
            jb = Ic.getCookie(Sg);
            return jb === null ? Tg : jb;
        }
    }
    V.Rg = Rg;
}(TNT.a));
TNT.a.Rg();
TNT.a.Pf(window.mboxFactoryDefault, TNT.a.b);
TNT.a.df(TNT.a.b, TNT.a.H, window.mboxFactoryDefault.getCookieManager());
if (TNT.isAutoCreateGlobalMbox()) {
    TNT.createGlobalMbox();
}
/* patch IE */
if (!Array.prototype.indexOf) { 
    Array.prototype.indexOf = function(obj, start) {
         for (var i = (start || 0), j = this.length; i < j; i++) {
             if (this[i] === obj) { return i; }
         }
         return -1;
    }
}
if( !window.CQ_Analytics ) {
    window.CQ_Analytics = {};
}

// TODO is there a better way?
if ( typeof CQ_Analytics.TestTarget !== 'undefined' ) {
    var oldTandT = CQ_Analytics.TestTarget; 
}

CQ_Analytics.TestTarget = new function() {
    
    return {
        
        lateMboxArrivalTimeouts: {},
        
		defaultContentTimeout:false,
        /**
         * Initialises the Test&Target integration
         * 
         * It reads the clientcode from either the clientcode parameter (deprecated) or from
         * the CQ_Analytics.TestTarget.clientCode variable (preferred).
         * 
         * @param {String} clientcode the optional client code
         */
        init: function(clientcode) {
            
            if ( CQ_Analytics.TestTarget.clientCode ) {
                clientcode = CQ_Analytics.TestTarget.clientCode;
            } else {
                CQ_Analytics.TestTarget.clientCode = clientcode;
            }
            
            if (clientcode) {
                
                CQ_Analytics.TestTarget.clientCode = clientcode;
                
                var server = clientcode + '.tt.omtrdc.net';
                if (typeof mboxVersion == 'undefined') {
                    mboxVersion = 41;
                    mboxFactories = new mboxMap();
                    mboxFactoryDefault = new mboxFactory(server, clientcode, 'default');
                }
            
                if (mboxGetPageParameter("mboxDebug") != null
                        || mboxFactoryDefault.getCookieManager().getCookie("debug") != null) {
                    setTimeout(
                            function() {
                                if (typeof mboxDebugLoaded == 'undefined') {
                                    alert('Could not load the remote debug.\nPlease check your connection to Test&amp;Target servers');
                                }
                            }, 60 * 60);
                    document.write('<'
                                    + 'scr'
                                    + 'ipt language="Javascript1.2" src='
                                    + '"http://admin4.testandtarget.omniture.com/admin/mbox/mbox_debug.jsp?mboxServerHost='
                                    + server + '&clientCode=' + clientcode + '"><'
                                    + '\/scr' + 'ipt>');
                }
            }
        },
        


        /**
         * Fetches the resource from provided path and writes the
         * response to the document or the mbox Element if 
         * 
         * <ul>
         * <li>response status code is 200</li>
         * <li>response has a body with length > 0</li>
         * </ul>
         * 
         * Uses a synchronous call for requesting the resource. If a WCM mode is defined this
         * call forces the resource to be rendered with WCM mode disabled.
         * 
         * @static
         * @param {String}
         *            path Path to document/node to request.
         */
        pull: function(path) {
            var wcmmode = CQ.shared.HTTP.getParameter(document.location.href, 'wcmmode');
            if ( typeof CQ.WCM !== 'undefined' ) {
                wcmmode = "disabled";
            }
            if (wcmmode && wcmmode.length > 0) {
                path = CQ.shared.HTTP.addParameter(path,'wcmmode',wcmmode);
            }
            var output = CQ.shared.HTTP.get(path);
            var isOk = (output && output.status && output.status == 200);
            var hasBody = (output && output.body && output.body.length > 0);
            if (isOk && hasBody) {
                var caller = arguments.callee.caller;
                if (!caller) {
                    document.write(output.body);
                } else { 
                    // the target is the div used for the default content
                    var target;
                    while (caller){
                        if (caller.arguments.length > 0) {
                            if (caller.arguments[0].Ub) {
                                target = caller.arguments[0].Ub;
                                break;
                            }
                        }
                        caller = caller.arguments.callee.caller;
                    };
                    if (target) {
                        // look for the wrapper div which tracks clicks
                        var childDivs = target.getElementsByTagName('div');
                        if ( childDivs.length == 1 ) {
                            target = childDivs[0];
                        }
                        var scriptwrapper = document.createElement('div');
                        scriptwrapper.innerHTML = output.body;
                        target.appendChild(scriptwrapper);
                        var scripts = target.getElementsByTagName('script');
                        for (var i = 0; i < scripts.length; i++) {
                            eval(scripts[i].text);
                        }
                    }
                }
            } else {
                if (console) console.log("Could not pull resource. Response[status:{},body:{}]", output.status, output.body);
            }
        },

        /**
         * Triggers an update of all the registered mboxes
         * 
         * <p>Delays the update requests based on the <tt>delay</tt> parameter so that multiple update requests
         * are clumped together.</p>
         * 
         * @param delay {Integer} the delay in milliseconds to apply to the reload, defaults to 500
         */
        triggerUpdate: function(delay) {

            if ( typeof delay == "undefined")
                delay = 500;

            if(!CQ_Analytics.TestTarget.reloadRequested) {
                CQ_Analytics.TestTarget.reloadRequested = true;
                setTimeout("CQ_Analytics.TestTarget.deleteMboxCookies(); CQ_Analytics.TestTarget.reloadRequested = false;", delay);
            }
        },
        
        registerMboxUpdateCalls: function() {
            if (CQ_Analytics.mboxes) {
                CQ_TestTarget = {};
                CQ_TestTarget.usedStoresLoaded = false;
                CQ_TestTarget.usedStores = CQ_Analytics.TestTarget.getMappedSessionstores();
                
                var trackStoreUpdate = function(sessionstore) {
                    var idx = $CQ.inArray(sessionstore.getName(), CQ_TestTarget.usedStores);
                    if (idx > -1 && !$CQ.isEmptyObject(sessionstore.getData())) {
                        CQ_TestTarget.usedStores.splice(idx,1);
                    }
                    if (CQ_TestTarget.usedStores.length < 1 && !CQ_TestTarget.usedStoresLoaded) {
                        var campaignStore = ClientContext.get("campaign");
                        if ( campaignStore && campaignStore.isCampaignSelected() ) {
                            return;
                        }
                        CQ_Analytics.TestTarget.callMboxUpdate();
                        CQ_TestTarget.usedStoresLoaded = true;
                    }
                };
                
                if (CQ_TestTarget.usedStores.length > 0) {

                    // iterate over a copy of the stores since trackStoreUpdate potentially
                    // modifies the CQ_TestTarget.usedStores array
                    var usedStoresCopy = CQ_TestTarget.usedStores.slice(0);

                    // 1. handle stores which are already initialized
                    for ( var i = 0 ; i < usedStoresCopy.length ; i++ ) {
                        var storeName = usedStoresCopy[i];
                        var sessionstore = CQ_Analytics.ClientContextMgr.getRegisteredStore(storeName);
                        if ( sessionstore!=null && sessionstore.isInitialized()) {
                            trackStoreUpdate(sessionstore);
                        }
                    }

                    // 2. handle stores which are not initialized but trigger events 
                    CQ_Analytics.CCM.addListener("storeupdate", function(e, sessionstore) {
                        trackStoreUpdate(sessionstore);
                    });
                    // fallback in case the store does not call storeupdate 
                    CQ_Analytics.CCM.addListener("storesinitialize", function(e, sessionstore) {
                        if (!CQ_TestTarget.usedStoresLoaded) {
                            var campaignStore = ClientContext.get("campaign");
                            if ( campaignStore && campaignStore.isCampaignSelected() ) {
                                return;
                            }

                            CQ_Analytics.TestTarget.callMboxUpdate();
                        }
                    });
                } else {
                    
                    var campaignStore = ClientContext.get("campaign");
                    if ( campaignStore && campaignStore.isCampaignSelected() ) {
                        return;
                    }
                    CQ_Analytics.TestTarget.callMboxUpdate();
                }
            }           
        },
        
        maxProfileParams: 200,
        
        callMboxUpdate: function() {
            if (CQ_Analytics.mboxes) {
                for (var i=0;i<CQ_Analytics.mboxes.length;i++) {
                    var updateArgs = [CQ_Analytics.mboxes[i].name];
                    var profileParams = 0;
                    for(var j=0; j < CQ_Analytics.mboxes[i].mappings.length; j++) {
                        var profileprefix = "";
                        var param = CQ_Analytics.mboxes[i].mappings[j].param;
                        var keypath = '/' + CQ_Analytics.mboxes[i].mappings[j].ccKey.replace('.', '/');
                        if (CQ_Analytics.mboxes[i].isProfile.indexOf(param) > -1) {
                            if (CQ_Analytics.TestTarget.maxProfileParams > 0 && ++profileParams > CQ_Analytics.TestTarget.maxProfileParams) {
                                mboxUpdate.apply(this, updateArgs);
                                updateArgs = [CQ_Analytics.mboxes[i].name];
                                profileParams = 0;
                            }
                            /* we should always apply the prefix, to prevent parameter name collisions */
                            /*if (!param.match(/^profile\..*$/)) {*/
                                profileprefix = "profile.";
                            /*}*/
                        }
                        updateArgs.push(profileprefix + param + "=" + CQ_Analytics.Variables.replaceVariables(CQ_Analytics.ClientContext.get(keypath)));
                    }
                    /* space out the first call, which is probably the global mbox, by 100 ms,
                     * to give T&T time to process the profile and use it in the next update calls
                     */
                    var that = this;
                    (function (args) {
                        setTimeout(function () {
                            mboxUpdate.apply(that, args)
                        }, (i>0 ? 100:0));
                    })(updateArgs);
                }
            }
        },
        
        /**
         * Returns an Array of session store names used in
         * CQ_Analytics.mboxes mappings. Returns empty Array if none
         * found.
         */
        getMappedSessionstores: function () {
            var storenames = [];
            if (CQ_Analytics.mboxes) {
                for (var i=0;i<CQ_Analytics.mboxes.length;i++) {
                    for (var j=0; j < CQ_Analytics.mboxes[i].mappings.length; j++) {
                        var mapping = CQ_Analytics.mboxes[i].mappings[j].ccKey;
                        var tmp = mapping.split(".");
                        var storename = tmp[0];
                        var key = tmp[1];
                        if ($CQ.inArray(storename, storenames) < 0) {
                            storenames.push(storename);
                        }
                    }
                }
            }
            return storenames;
        },
        
        /**
         * Deletes mbox cookies. If mboxFactoryDefault is undefined the function returns.
         * Forces a page reload if either of CQ.WCM.isPreviewMode() or CQ.utils.WCM.isEditMode() is true.
         */
        deleteMboxCookies: function() {
            if (typeof mboxFactoryDefault == 'undefined') return;
            mboxFactoryDefault.regenerateSession();
            if (CQ && CQ.WCM && ( CQ.WCM.isPreviewMode() || CQ.utils.WCM.isEditMode() )) {
                
                var campaignStore = ClientContext.get("campaign");
                if ( campaignStore && campaignStore.isCampaignSelected() ) {
                    return;
                }

                CQ_Analytics.TestTarget.callMboxUpdate();
            }
        },
    
        registerListeners: function() {
            var stores = CQ_Analytics.CCM.getStores();
            for (var storename in stores) {
                var store = stores[storename];
                // completely ignore the mouse store since it's never useful for T&T
                if (storename != "mouseposition" && store.addListener) {
                    store.addListener("update",function(event, property) {
                        // avoid the surferstore getting mouse position updates
                        if ( typeof property == 'undefined' || 
                                ( property && property.match && property.match("^mouse") != "mouse") )
                        CQ_Analytics.TestTarget.triggerUpdate();
                    });
                }
            }
        },
                
        ignoredUpdates: {},
        
        ignoreNextUpdate: function(mboxName) {
            CQ_Analytics.TestTarget.ignoredUpdates[mboxName] = true;
        },
        
        /**
         * Adds a new mboxDefinition to the CQ_Analytics.mboxes array
         * 
         * <p>Removes any mbox definition with the same mbox id prior to adding the passed
         * mboxDefinition.</p> 
         * 
         * @return {Boolean} true if an mbox was replaced, false otherwise
         */
        addMbox: function (mboxDefinition) {
            var replaced = false;
            
            if (!CQ_Analytics.mboxes) { CQ_Analytics.mboxes = []; }
            for ( var i = 0 ; i < CQ_Analytics.mboxes.length ; i++ ) {
                
                var mbox = CQ_Analytics.mboxes[i];
                //  cleanup existing mbox
                if ( mbox.id == mboxDefinition.id ) { 
                    CQ_Analytics.mboxes.splice(i, 1);
                    replaced = true;
                    break;
                }
            }

            CQ_Analytics.mboxes.push ( mboxDefinition );

            return replaced;
        },
        
        /**
         * Hides the default content for an mbox
         */
        hideDefaultMboxContent: function(mboxId) {
            $CQ('#' + mboxId).find('div').css('visibility', 'hidden');
        },
        
        /**
         * Shows the default content for an mbox
         */
        showDefaultMboxContent: function(mboxId, mboxName) {
            var defaultContent = $CQ('#' + mboxId);
            
            // defaultContent no longer present -> mbox has loaded 
            if ( !defaultContent.length )
                return;
            
            mboxFactoryDefault.get(mboxName).show(new mboxOfferDefault());
            
            CQ_Analytics.TestTarget.ignoreNextUpdate(mboxName);
        },
        
        ignoreLateMboxArrival: function(mboxId, mboxName, timeout) {
            
            this.clearLateMboxArrivalTimeout(mboxId);
            
            var that = this;
            this.lateMboxArrivalTimeouts[mboxId] = setTimeout(function() {
                that.showDefaultMboxContent(mboxId, mboxName);
                that.clearLateMboxArrivalTimeout(mboxId);
            }, 2000);
        },
        
        clearLateMboxArrivalTimeout: function(mboxId) {
            if ( this.lateMboxArrivalTimeouts[mboxId] ) {
                clearTimeout(this.lateMboxArrivalTimeouts[mboxId]);
                delete this.lateMboxArrivalTimeouts[mboxId];
            }
        }
    }
};

// restore previous attributes
if ( typeof oldTandT !== 'undefined ') {
    for ( var prop in oldTandT ) {
        CQ_Analytics.TestTarget[prop] = oldTandT[prop];
    }
}

/**
 * Wait for document to load
 */
var tt_readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
        try {
            /** 
             * Skip setting the offer for updates arriving too late 
             */
            if (!mbox.prototype._setOffer) {
                mbox.prototype._setOffer = mbox.prototype.setOffer;
                mbox.prototype.setOffer = function(Nb) {

                    // http://bugzilla.corp.omniture.com/show_bug.cgi?id=106435
                    if ( '_onLoad' in Nb) {
                        Nb.show = function(_mbox) {
                            var _defaultDiv = _mbox.getDefaultDiv();
                            if (_defaultDiv == null) { // this needs to be '==' ,  see CQ5-28207
                              return 0;
                            }
                            
                            var _mboxName = _mbox.id ? _mbox.id : _mbox.getName();
                            
                            // modification - instead of overriding the onclick element
                            // to look for the the clickDiv which _should_ be present in the
                            // DOM right now instead of looking for it when the div is clicked
                            var _clickDiv = document.getElementById('mboxClick-' + _mboxName);
                            if (_clickDiv && _clickDiv.onclick) {
                              _defaultDiv.onclick = _clickDiv.onclick;
                            }
                            
                            var _result = _mbox.hide();
                            if (_result == 1) {
                              this._onLoad();
                            }
                            return _result;
                        };
                    }
                    
                    CQ_Analytics.TestTarget.clearLateMboxArrivalTimeout(this.g);
                    
                    if (CQ_Analytics.TestTarget.ignoredUpdates[this.g]) {
                        delete CQ_Analytics.TestTarget.ignoredUpdates[this.g];
                        return this;
                    } else {
                        return this._setOffer(Nb);
                    }
                }; 
            }
            /**
             * Removes the default div from this mbox
             * 
             * <p>This function is useful when the DOM on the page changes to prevent the cached DOM element from being
             * a disconnected from the actual document.</p>
             */
            mbox.prototype.clearDefaultDiv = function() {
                this.Tb = null;
            };

            mbox.prototype.setUrlBuilder = function(w) {
                this.w = w;
                this.w.addParameter('mbox', this.g)
                .addParameter('mboxId', this.Ib);
            };
            
            mboxCookieManager.prototype.deleteAllCookies = function() {

                var that = this;

                this.ec.each(function(g, fc) {
                    that.deleteCookie(g);
                });
            };

            mboxFactory.prototype.regenerateSession = function() {

                this.J.deleteAllCookies();
                this.L = mboxGenerateId();

                this.S = new mboxSession(this.L,
                        'mboxSession',
                        'session', 31 * 60, this.J);
                this.T = new mboxPC('PC',
                        1209600, this.J);

                var I = this.D == 'default';
                // TODO need to remove reference to CQ_Analytics.TestTarget to submit this upstream; should be a property of the mboxFactory
                this.w = new mboxUrlBuilder(this.C, CQ_Analytics.TestTarget.clientCode);
                this.U(this.w, I);

                var that = this;
                this.getMboxes().each(function(mbox) {
                    mbox.setUrlBuilder(that.w.clone());
                });
            };

            CQ_Analytics.CCM.onReady(function() {
                CQ_Analytics.TestTarget.registerListeners();
            }, CQ_Analytics.TestTarget);

        } catch (e) { 
            if (console) { console.error(e.message); }
        } finally {
            clearInterval(tt_readyStateCheckInterval);
        }
    }
}, 10);
