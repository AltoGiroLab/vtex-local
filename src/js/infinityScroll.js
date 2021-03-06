/**
 * Infinity Scroll
 * @author Carlos Vinicius [Quatro Digital]
 * @version 3.14
 * @license MIT
 */
 "function" !== typeof String.prototype.trim &&
 (String.prototype.trim = function () {
     return this.replace(/^\s+|\s+$/g, "");
 });
(function (c) {
 "function" !== typeof c.fn.QD_infinityScroll &&
     ((window._QuatroDigital_InfinityScroll = window._QuatroDigital_InfinityScroll || {}),
     (c.fn.QD_infinityScroll = function (f) {
         var a = window._QuatroDigital_InfinityScroll,
             e = function (a, c) {
                 if ("object" === typeof console && "undefined" !== typeof console.error && "undefined" !== typeof console.info && "undefined" !== typeof console.warn) {
                     var b;
                     "object" === typeof a ? (a.unshift("[Infinity Scroll]\n"), (b = a)) : (b = ["[Infinity Scroll]\n" + a]);
                     if ("undefined" === typeof c || ("alerta" !== c.toLowerCase() && "aviso" !== c.toLowerCase()))
                         if ("undefined" !== typeof c && "info" === c.toLowerCase())
                             try {
                                 console.info.apply(console, b);
                             } catch (d) {
                                 try {
                                     console.info(b.join("\n"));
                                 } catch (e) {}
                             }
                         else
                             try {
                                 console.error.apply(console, b);
                             } catch (d) {
                                 try {
                                     console.error(b.join("\n"));
                                 } catch (e) {}
                             }
                     else
                         try {
                             console.warn.apply(console, b);
                         } catch (d) {
                             try {
                                 console.warn(b.join("\n"));
                             } catch (e) {}
                         }
                 }
             },
             p = {
                 lastShelf: ">div:last",
                 elemLoading: '\x3c!-- Infinity Scroll - Loading message --\x3e<div id="scrollLoading" class="qd-is-loading"></div>',
                 searchUrl: null,
                 returnToTop: c('<div id="returnToTop" class="qd-is-return-top"><a href="#"><span class="text">voltar ao</span><span class="text2">TOPO</span><span class="arrowToTop"></span></a></div>'),
                 scrollBy: document,
                 callback: function () {},
                 getShelfHeight: function (a) {
                     return a.scrollTop() + a.height();
                 },
                 paginate: null,
                 insertContent: function (a, b) {
                     a.after(b);
                 },
                 authorizeScroll: function () {
                     return !0;
                 },
             },
             d = jQuery.extend({}, p, f),
             b = jQuery(this);
         jQuery("");
         if (1 > b.length) return b;
         1 < b.length &&
             (e(
                 "Identifiquei que a seletor informado (" +
                     b.selector +
                     ") retornou " +
                     b.length +
                     " elementos.\n Para solucionar o problema estou selecionando autom\u00e1ticamente o primeiro com o id: #" +
                     (b.filter("[id^=ResultItems]:first").attr("id") || "!Not Found"),
                 "Aviso"
             ),
             (b = b.filter("[id^=ResultItems]:first")));
         b.filter("[id^=ResultItems]").length ||
             e(["Certifique-se que esta selecionando o elemento correto.\n O plugin espera que o elemento seja o que cont\u00e9m o id: #" + (c("div[id^=ResultItems]").attr("id") || "!Not Found"), c("div[id^=ResultItems]")], "Info");
         b.parent().filter("[id^=ResultItems]").length &&
             ((b = b.parent()),
             e(
                 [
                     "Identifiquei que o seletor pai do elemento que voc\u00ea informou \u00e9 o #" +
                         (jQuery("div[id^=ResultItems]").attr("id") || "!Not Found") +
                         ".\n Como forma de corrigir esse problema de sele\u00e7\u00e3o de elemento, assumirei a prateleira correta.",
                     b,
                 ],
                 "Aviso"
             ));
         c("body").append(d.returnToTop);
         var g = c(window),
             q = c(document),
             m = c(d.scrollBy),
             n = c(d.elemLoading);
         a.toTopE = c(d.returnToTop);
         a.moreResults = !0;
         a.currentPage = 2;
         var r = function () {
             var a,
                 b = /\/buscapagina\?.+&PageNumber=/i,
                 d = /\/paginaprateleira\?.+PageNumber=/i;
             c("script:not([src])").each(function () {
                 var c = this.innerHTML;
                 if (-1 < c.indexOf("buscapagina")) return (a = b.exec(c)), !1;
                 if (-1 < c.indexOf("paginaprateleira")) return (a = d.exec(c)), !1;
             });
             if ("object" === typeof a && "undefined" !== typeof a[0]) return a[0].replace("paginaprateleira", "buscapagina");
             e("N\u00e3o foi poss\u00edvel localizar a url de busca da p\u00e1gina.\n Tente adicionar o .js ao final da p\u00e1gina. \n[M\u00e9todo: getSearchUrl]");
             return "";
         };
         (function () {
             var c = g.height();
             g.bind("resize.QD_infinityScroll", function () {
                 c = g.height();
             });
             var b = 0;
             m.bind("scroll.QD_infinityScroll", function () {
                 clearTimeout(b);
                 b = setTimeout(function () {
                     q.scrollTop() > c
                         ? document.body.getAttribute("data-qd-infinity-scroll") || document.body.setAttribute("data-qd-infinity-scroll", 1)
                         : document.body.getAttribute("data-qd-infinity-scroll") && document.body.removeAttribute("data-qd-infinity-scroll");
                 }, 20);
             });
             a.buttonToTop = a.toTopE.find("a").bind("click.QD_infinityScroll", function () {
                 jQuery("html,body").animate({ scrollTop: 0 }, "slow");
                 return !1;
             });
         })();
         (function () {
             a.searchUrl = null !== d.searchUrl ? d.searchUrl : r();
             a.currentStatus = !0;
             var f = c(".pager[id*=PagerTop]:first").attr("id") || "";
             if ("" !== f && ((a.pages = window["pagecount_" + f.split("_").pop()]), "undefined" === typeof a.pages))
                 for (var h in window)
                     if (/pagecount_[0-9]+/.test(h)) {
                         a.pages = window[h];
                         break;
                     }
             "undefined" === typeof a.pages && (a.pages = 9999999999999);
             var k = function () {
                 if (a.currentStatus) {
                     var f = b.find(d.lastShelf);
                     if (1 > f.length) return e("\u00daltima Prateleira/Vitrine n\u00e3o encontrada \n (" + f.selector + ")"), !1;
                     f.after(n);
                     a.currentStatus = !1;
                     var g = a.currentPage;
                     c.ajax({
                         url: a.searchUrl.replace(/pagenumber\=[0-9]*/i, "PageNumber=" + a.currentPage),
                         dataType: "html",
                         success: function (b) {
                             1 > b.trim().length ? ((a.moreResults = !1), e("N\u00e3o existem mais resultados a partir da p\u00e1gina: " + g, "Aviso"), c(window).trigger("QuatroDigital.is_noMoreResults")) : d.insertContent(f, b);
                             a.currentStatus = !0;
                             n.remove();
                         },
                         error: function () {
                             e("Houve um erro na requisi\u00e7\u00e3o Ajax de uma nova p\u00e1gina.");
                         },
                         complete: function (a, b) {
                             d.callback();
                             c(window).trigger("QuatroDigital.is_Callback");
                         },
                     });
                     a.currentPage++;
                 }
             };
             if ("function" === typeof d.paginate)
                 d.paginate(function () {
                     return a.currentPage <= a.pages && a.moreResults ? (k(), !0) : !1;
                 });
             else {
                 var l = 0;
                 m.bind("scroll.QD_infinityScroll_paginate", function () {
                     clearTimeout(l);
                     l = setTimeout(function () {
                         a.currentPage <= a.pages && a.moreResults && d.authorizeScroll() && g.scrollTop() + g.height() >= d.getShelfHeight(b) && k();
                     }, 70);
                 });
             }
         })();
         return b;
     }),
     c(document).ajaxSend(function (c, a, e) {
         -1 < e.url.indexOf("PageNumber") && 0 < e.url.search(/PageNumber\=[^0-9]+/) && a.abort();
     }),
     (window.goToTopPage = function () {}),
     c(function () {
         window.goToTopPage = function () {};
     }));
})(jQuery);
