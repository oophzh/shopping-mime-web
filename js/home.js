"use strict";
require.config(requireConfig),require(["jquery","tmpl","i18n","bootstrap","bootsnav","owlCarousel","common"],function(e,i,t,r,l,a,o){function n(){if(console.log("getHomeProduct"),!o.util.getLocalCurrency())return void(p=setInterval(function(){n()},500));p&&clearInterval(p),o.dao.homePageProduct({currencyId:o.util.getLocalCurrency()},function(i){var t=o.util.getCurrencySymbol(o.util.getLocalCurrency()),r=o.util.getQueryString("u"),l=o.util.encodeMenuType(o.util.getUvid()),a="";if(r&&(a="?u="+r),c=i.new_arrivals){for(var n=0;n<c.length;n++){for(var d=c[n],p=0;p<d.display_data.length;p++){var g=d.display_data[p];g.original_price=o.util.formatProductPrice(g.original_price,t),g.current_price=o.util.formatProductPrice(g.current_price,t),g.img_display=o.util.picUrl+g.img_display,g.color_img=o.util.picUrl+g.color_img,g.height=o.util.getHomeImageHeight(),g.href=o.util.formatProductName(d.product_name)+"-d-"+o.util.encodeMenuType(d.product_id)+"-"+o.util.encodeMenuType(g.color_id)+"-"+l+".html"+a}d.showColor=sessionStorage.img_block}e("#new_bxslider").html(e("#productItemTempl").tmpl(c))}else e("#new_bxslider_wrap").hide();if(u=i.best_sellers){for(var n=0;n<u.length;n++){for(var d=u[n],p=0;p<d.display_data.length;p++){var g=d.display_data[p];g.original_price=o.util.formatProductPrice(g.original_price,t),g.current_price=o.util.formatProductPrice(g.current_price,t),g.img_display=o.util.picUrl+g.img_display,g.color_img=o.util.picUrl+g.color_img,g.height=o.util.getHomeImageHeight(),g.href=o.util.formatProductName(d.product_name)+"-d-"+o.util.encodeMenuType(d.product_id)+"-"+o.util.encodeMenuType(g.color_id)+"-"+l+".html"+a}d.showColor=sessionStorage.img_block}e("#best_bxslider").html(e("#productItemTempl").tmpl(u))}else e("#best_bxslider_wrap").hide();s(c,u),e(".loading-mask").addClass("hide"),e(".main-wrap").removeClass("invisibility"),e("footer").removeClass("invisibility")},null,function(){e(".loading-mask").addClass("hide"),e(".main-wrap").removeClass("invisibility"),e("footer").removeClass("invisibility"),e("a").each(function(){var i=e(this).attr("href"),t=o.util.getQueryString("u");if(!(i&&i.indexOf("-l-")>-1||i&&i.indexOf("-d-")>-1||i&&i.indexOf("ssl-checker.html")>-1||i&&i.indexOf("trustsealinfo.verisign.com")>-1)){if(i&&i.indexOf("uvid=")<0&&"javascript:void(0)"!==i)if("/"==i)i=i+"?uvid="+o.util.getUvid();else if(i&&i.indexOf("uvid=")<0){var r=i.length-"html".length;i=r>=0&&i.lastIndexOf("html")==r?i+"?uvid="+o.util.getUvid():i+"&uvid="+o.util.getUvid()}if(t&&"javascript:void(0)"!==i)if("/"==i)i=i+"?u="+t;else if(i){var r=i.length-"html".length;i=r>=0&&i.lastIndexOf("html")==r?i+"?u="+t:i+"&u="+t}e(this).attr("href",i)}})})}function s(i,t){e("#new_bxslider, #best_bxslider").trigger("destroy.owl.carousel"),e("#new_bxslider, #best_bxslider").owlCarousel({nav:!0,loop:!1,slideBy:"page",autoPlay:!0,rewind:!1,smartSpeed:70,responsive:{0:{items:1},480:{items:4},600:{items:4},960:{items:4},1200:{items:4},1550:{items:5},1650:{items:6}},navText:['<svg viewBox="0 0 24 24" style="width:40px;height:40px;background: rgba(0,0,0,0.3);border-radius: 50%;"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" style="fill: #f1f1f1;"></path></svg>','<svg viewBox="0 0 24 24" style="width:40px;height:40px;background: rgba(0,0,0,0.3);border-radius: 50%;"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" style="fill: #f1f1f1;"></path></svg>']}),e("#new_bxslider li .color-wrap img").bind("click",function(t){d(t,e(this),i)}),e("#best_bxslider li .color-wrap img").bind("click",function(i){d(i,e(this),t)})}function d(e,i,t){e.stopPropagation();var r=i.parent().parent().parent().data().data,l=i.data().data,t=t[r].display_data[l];i.parent().parent().find("img").removeClass("selected"),i.addClass("selected");var a=t.href;i.parent().parent().parent().find("a:first").attr("href",a),i.parent().parent().parent().find("img:first").attr("src",t.img_display),i.parent().parent().parent().find(".price-wrap .goods-price").html(t.current_price),i.parent().parent().parent().find(".price-wrap .goods-del-price").html(t.original_price)}console.log("home.js");var c="",u="";o.setCurrencyCodeCallback(function(){n()}),console.log("common.sessionStorageEnable = "+o.sessionStorageEnable),o.sessionStorageEnable&&o.initLoginStatus(),self!=top&&e(document.body).parent().addClass("overflowY");var p=null});