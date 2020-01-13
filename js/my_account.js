"use strict";
require.config(requireConfig),require(["jquery","tmpl","i18n","bootstrap","bootsnav","common"],function(e,s,t,i,r,a){function n(e){switch(e){case"menu_my_order":l();break;case"menu_my_cart":o();break;case"menu_my_fav":d();break;case"menu_my_coupon":c();break;case"menu_my_address":_();break;case"menu_account_setting":p()}}function l(){document.title=e.i18n.map.MyOrderTitle,e("#fav_list_wrap").hide(),e("#cart_list_wrap").hide(),e("#order_list_wrap").show(),e("#coupons_list_wrap").hide(),e("#address_list_wrap").hide(),e("#account_setting_wrap").hide(),v()}function o(){document.title=e.i18n.map.MyCartTitle,e("#order_list_wrap").hide(),e("#cart_list_wrap").show(),e("#fav_list_wrap").hide(),e("#coupons_list_wrap").hide(),e("#address_list_wrap").hide(),e("#account_setting_wrap").hide(),f()}function d(){document.title=e.i18n.map.MyFavTitle,e("#fav_list_wrap").show(),e("#cart_list_wrap").hide(),e("#order_list_wrap").hide(),e("#coupons_list_wrap").hide(),e("#address_list_wrap").hide(),e("#account_setting_wrap").hide(),y()}function c(){document.title=e.i18n.map.MyCouponTitle,e("#fav_list_wrap").hide(),e("#cart_list_wrap").hide(),e("#order_list_wrap").hide(),e("#coupons_list_wrap").show(),e("#address_list_wrap").hide(),e("#account_setting_wrap").hide(),g()}function _(){document.title=e.i18n.map.MyAddressTitle,e("#fav_list_wrap").hide(),e("#cart_list_wrap").hide(),e("#order_list_wrap").hide(),e("#coupons_list_wrap").hide(),e("#address_list_wrap").show(),e("#account_setting_wrap").hide(),m(),u()}function p(){document.title=e.i18n.map.MyAccountSettingTitle,e("#fav_list_wrap").hide(),e("#cart_list_wrap").hide(),e("#order_list_wrap").hide(),e("#coupons_list_wrap").hide(),e("#address_list_wrap").hide(),e("#account_setting_wrap").show();var s=sessionStorage.getItem("userInfo");if(s){s=JSON.parse(s),e("#account_setting_first_name_input").val(s.firstName),e("#account_setting_last_name_input").val(s.lastName);for(var t=document.getElementsByName("gender"),i=0;i<t.length;i++)t[i].value==s.sex&&(t[i].checked=!0)}}function u(){a.dao.getUserAddress({userId:a.util.getUserId(),addrType:1},function(s){var t=s;t&&t.length>0?(e("#billing_address_list").html(e("#addressItemTempl").tmpl(t)),e("#billing_address_list li #phone_number_label").text(e.i18n.map.PhoneNumberlabel),e("#billing_address_list li .button-wrap button:nth-child(1)").text(e.i18n.map.Edit),e("#billing_address_list li .button-wrap button:nth-child(2)").text(e.i18n.map.Delete),e("#billing_address_list li .button-wrap button").click(function(){h(t,e(this),function(){m()})}),e("#billing_address_list").show(),e("#billing_address_empty_wrap").hide()):(e("#billing_address_list").hide(),e("#billing_address_empty_wrap").show())})}function h(s,t,i){if("edit"==t[0].id){e(".edit-address-mask").removeClass("hide");var r=t.parent().parent().data().data;N=s[r],console.log("currentAddr = "+N),e("#first_name_input").val(N.recFirstname),e("#last_name_input").val(N.recLastname),e("#address_input").val(N.streetAddr),e("#address_2_input").val(N.extendAddr),e("#city_input").val(N.city),e("#postal_code_input").val(N.postCode),e("#email_input").val(N.email),e("#phone_input").val(N.telephone),e("#phone_2_input").val(N.telephone1),1==N.isDefault?e("#default_input").attr("checked",!0):e("#default_input").attr("checked",!1),C(N.country,N.fullCountry)}else a.dao.delAddress({addrId:t.data().data},function(e){console.log("删除成功"),i()})}function m(){a.dao.getUserAddress({userId:a.util.getUserId(),addrType:0},function(s){var t=s;t&&t.length>0?(e("#shipping_address_list").html(e("#addressItemTempl").tmpl(t)),e("#shipping_address_list li #phone_number_label").text(e.i18n.map.PhoneNumberlabel),e("#shipping_address_list li .button-wrap button:nth-child(1)").text(e.i18n.map.Edit),e("#shipping_address_list li .button-wrap button:nth-child(2)").text(e.i18n.map.Delete),e("#shipping_address_list li .button-wrap button").click(function(){h(t,e(this),function(){m()})}),e("#shipping_address_list").show(),e("#shipping_address_empty_wrap").hide()):(e("#shipping_address_list").hide(),e("#shipping_address_empty_wrap").show())})}function v(){a.dao.getUserOrder({userId:a.util.getUserId()},function(s){var t=s;if(t&&t.length>0){for(var i=0;i<t.length;i++){var r=t[i],n=a.util.getCurrencySymbol(r.correncyCode);n||(n=a.util.getCurrencySymbol(a.util.getLocalCurrency())),r.realCost=a.util.formatProductPrice(r.realCost,n),r.totalCost=a.util.formatProductPrice(r.totalCost,n),0==r.paymentStatus?r.paymentStatusString=e.i18n.map.OrderStatusPendding:1==r.paymentStatus||5==r.paymentStatus||10==r.paymentStatus?r.paymentStatusString=e.i18n.map.OrderStatusSuccess:3==r.paymentStatus?r.paymentStatusString=e.i18n.map.OrderStatusDelay:r.paymentStatusString=e.i18n.map.OrderStatusFail,r.crTimeString=a.util.formatOrderDateTime(r.crTime)}e("#order_item_list").html(e("#orderItemTempl").tmpl(t)),e("#order_item_list #detail_btn").attr("title",e.i18n.map.ViewDetail),e("#order_item_list #payment_btn").attr("title",e.i18n.map.ContinuePayment),e("#order_item_list").show(),e("#order_empty_wrap").hide()}else e("#order_item_list").hide(),e("#order_empty_wrap").show()})}function f(){var s={currencyId:a.util.getLocalCurrency(),userId:a.util.getUserId(),cart:[],applyCpNo:a.util.getCouponCode()};a.dao.shoppingCart({inputParams:JSON.stringify(s)},function(s){if(s.cart&&s.cart.length>0){var t=0,i=a.util.getCurrencySymbol(a.util.getLocalCurrency()),r=a.util.getAdvSource().u;r||(r=a.util.getQueryString("u"));var n="";r&&(n="?u="+r);for(var l=a.util.encodeMenuType(a.util.getUvid()),o=0;o<s.cart.length;o++){var d=s.cart[o];d.displayImg=a.util.picUrl+d.displayImg,d.cost=a.util.formatProductPrice(d.cost,i);var c=a.util.formatProductName(d.productName)+"-d-"+a.util.encodeMenuType(d.productId)+"-"+a.util.encodeMenuType(d.productColorId)+"-"+l+".html"+n;d.href=c,t+=Number(d.productNum)}e("#cart_list").html(e("#cartTempl").tmpl(s.cart)),e("#cart_list #color_title").html(e.i18n.map.ColorTitle),e("#cart_list #remove_label").html(e.i18n.map.Remove),t>0?(e("#cart_product_number").html(t),e("#cart_product_number").show()):(e("#cart_product_number").html("0"),e("#cart_product_number").show());for(var _=["1","2","3","4","5"],o=0;o<s.cart.length;o++){var p=e("#qtyItemTempl").tmpl(_);e("#"+o).find(".dropdown-menu").html(p),e("#"+o+" .dropdown-menu li").each(function(t){e(this).click(function(){var i=_[t],r=e(this).parent().parent().parent().parent()[0].id;e("#"+r).find("#qty_content").html(i),w(e(this).parent().parent().parent().parent().data().data,i,s)})}),e("#"+o+" .remove-btn").each(function(){e(this).click(function(){console.log("del "+e(this).parent().parent().data().data+"item"),w(e(this).parent().parent().parent().parent().data().data,0,s)})})}}else e("#cart_list").hide(),e("#cart_empty_wrap").show(),e("#cart_product_number").html("0"),e("#cart_product_number").show()},function(){e("#cart_list").hide(),e("#cart_empty_wrap").show()})}function w(e,s,t){if(console.log("changeProductNumber"),a.util.checkIsLogin()){var i=t.cart[e];i.productNum=Number(s),i.userId=a.util.getUserId(),a.dao.shoppingCartMt({inputParams:JSON.stringify([i])},function(e){f()})}else if(localStorage.productList){var r=JSON.parse(localStorage.productList);if(0==Number(s))r.splice(e,1);else{var i=r[e];i.productNum=Number(s)}localStorage.setItem("productList",JSON.stringify(r)),f()}}function y(){var s=[];s&&s.length>0?(e("#fav_item_list").html(e("#favItemTempl").tmpl(s)),e("#fav_item_list").show(),e("#fav_empty_wrap").hide()):(e("#fav_item_list").hide(),e("#fav_empty_wrap").show())}function g(){a.dao.getCoupon({userId:a.util.getUserId(),currencyId:a.util.getLocalCurrency()},function(s){if(s){var t=[s];e("#coupon_item_list").html(e("#couponItemTempl").tmpl(t)),e("#coupon_item_list #code_text").html(e.i18n.map.Code),e("#coupon_item_list").show(),e("#coupon_empty_wrap").hide()}else e("#coupon_item_list").hide(),e("#coupon_empty_wrap").show()})}function b(s,t){return!e(s).parent().hasClass("has-error")&&""!==e(s).val()||(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e(t).css("visibility","visible"),!1)}function C(s,t){var i=document.getElementById("countryList");x=s||(sessionStorage.country_belong?sessionStorage.country_belong:i.options[0].value),e("#countryList option[value='"+x+"']").prop("selected","selected"),e.getJSON("/resources/json/country.json",function(s){var t=i.selectedIndex;if(s&&s[t]&&s[t].state&&s[t].state.length>0)I(s[t].state,!0),e("#provice_selected_wrap").show(),e("#provice_input_wrap").hide();else{document.getElementById("provinceList").length=0,e("#provice_selected_wrap").hide(),e("#provice_input_wrap").show()}e("#countryList").on("change",function(){var t=e(this).find("option:selected").val();x=t;var r=i.selectedIndex;if(s&&s[r]&&s[r].state&&s[r].state.length>0)I(s[r].state,!1),e("#provice_selected_wrap").show(),e("#provice_input_wrap").hide();else{document.getElementById("provinceList").length=0,e("#provice_selected_wrap").hide(),e("#provice_input_wrap").show()}})})}function I(s,t){if(s&&s.length>0){e("#provice_selected_wrap").show(),e("#provice_input_wrap").hide();var i=s;document.getElementById("provinceList").length=0;for(var r=0;r<i.length;r++){var a="<option value='"+i[r]+"'>"+i[r]+"</option>";t&&N&&N.province==i[r]&&(a="<option value='"+i[r]+"' selected>"+i[r]+"</option>"),e("#provinceList").append(a)}}else e("#provice_selected_wrap").hide(),e("#provice_input_wrap").show(),N&&e("#province_input").val(N.province)}function S(){var s=a.util.getUserId();if(s){var t=e("input[type='radio'][name='gender']:checked").val();a.dao.userInfoModify({userId:s,sex:t,firstName:e("#account_setting_first_name_input").val(),lastName:e("#account_setting_last_name_input").val()},function(s){var i=sessionStorage.getItem("userInfo");i&&(i=JSON.parse(i),i.sex=t,i.firstName=e("#account_setting_first_name_input").val(),i.lastName=e("#account_setting_last_name_input").val(),sessionStorage.setItem("userInfo",JSON.stringify(i))),e("#modify_information_success_message").show()})}}function k(){var s=a.util.getUserId();s&&a.dao.mdpwd({userId:s,oldPwd:e("#modify_old_pwd_input").val(),newPwd:e("#modify_new_pwd_input").val(),checkCode:""},function(s){e("#modify_pwd_success_message").removeClass("alert-danger"),e("#modify_pwd_success_message").addClass("alert-success"),e("#modify_pwd_success_message").html(e.i18n.map.ModifyPwdSuccess),e("#modify_pwd_success_message").show()},function(s){e("#modify_pwd_success_message").removeClass("alert-success"),e("#modify_pwd_success_message").addClass("alert-danger"),e("#modify_pwd_success_message").html(s.msg),e("#modify_pwd_success_message").show()})}console.log("my_account.js");var N,x,A=a.util.getQueryString("id");console.log("my_account.js---id= "+A),a.initLoginStatus(function(s){s?6==A?(p(),e(".menu-list span").removeClass("selected"),e("#menu_account_setting").addClass("selected"),e(".menu-content-wrap .title").text(e.i18n.map.AccountSetting)):5==A?(_(),e(".menu-list span").removeClass("selected"),e("#menu_my_address").addClass("selected"),e(".menu-content-wrap .title").text(e.i18n.map.ManageAddressBook)):4==A?(c(),e(".menu-list span").removeClass("selected"),e("#menu_my_coupon").addClass("selected"),e(".menu-content-wrap .title").text(e.i18n.map.MyCoupons)):3==A?(d(),e(".menu-list span").removeClass("selected"),e("#menu_my_fav").addClass("selected"),e(".menu-content-wrap .title").text(e.i18n.map.MyFavorites)):2==A?(o(),e(".menu-list span").removeClass("selected"),e("#menu_my_cart").addClass("selected"),e(".menu-content-wrap .title").text(e.i18n.map.MyCart)):(l(),e(".menu-list span").removeClass("selected"),e("#menu_my_order").addClass("selected"),e(".menu-content-wrap .title").text(e.i18n.map.MyOrder)):window.location.href="../../../login.html"}),function(){e(".menu-list span").bind("click",function(){e(this).hasClass("selected")||(e(".menu-list span").removeClass("selected"),e(this).addClass("selected"),e(".menu-content-wrap .title").text(e(this).text()),n(e(this)[0].id))}),e("#sava_base_information").click(function(){var e=!0;e=b("#account_setting_first_name_input","#account_setting_error_first_name")&&e,(e=b("#account_setting_last_name_input","#account_setting_error_last_name")&&e)&&S()}),e("#sava_new_pwd").click(function(){var s=!0;s=b("#modify_old_pwd_input","#old_pwd_error")&&s,s=b("#modify_new_pwd_input","#new_pwd_error")&&s,s=b("#modify_confirm_new_pwd_input","#confirm_new_pwd_error")&&s,e("#modify_new_pwd_input").val()!==e("#modify_confirm_new_pwd_input").val()&&(s=!1,e("#modify_pwd_success_message").removeClass("alert-success"),e("#modify_pwd_success_message").addClass("alert-danger"),e("#modify_pwd_success_message").html(e.i18n.map.PasswordNotMatch),e("#modify_pwd_success_message").show()),s&&k()}),e("#add_new_addr_btn").click(function(){N=null;var s=sessionStorage.getItem("userInfo");s&&(s=JSON.parse(s),e("#first_name_input").val(s.firstName),e("#last_name_input").val(s.lastName),e("#email_input").val(s.email)),e("#address_input").val(""),e("#address_2_input").val(""),e("#city_input").val(""),e("#postal_code_input").val(""),e("#phone_input").val(""),e("#phone_2_input").val(""),e("#selected_province_span").text(""),e("#selected_country_span").text(""),e(".edit-address-mask").removeClass("hide"),C()}),e("#save_address_btn").click(function(){var s=!0,t=b("#first_name_input","#error_first_name");s&&((s=t&&s)||e("#first_name_input").focus());var i=b("#last_name_input","#error_last_name");s&&((s=i&&s)||e("#last_name_input").focus());var r=!0,n=a.util.checkAddress(e("#address_input").val());0==n?(e("#address_input").parent().removeClass("has-success"),e("#address_input").parent().addClass("has-error"),e("#error_address").css("visibility","visible"),r=!1):-1==n?(e("#address_input").parent().removeClass("has-success"),e("#address_input").parent().addClass("has-error"),e("#error_address").css("visibility","visible"),r=!1):1==n&&(e("#address_input").parent().removeClass("has-error"),e("#address_input").parent().addClass("has-success"),e("#error_address").css("visibility","hidden")),s&&((s=r&&s)||e("#address_input").focus()),r=!0,n=a.util.checkAddress(e("#address_2_input").val()),-1==n?(e("#address_2_input").parent().removeClass("has-success"),e("#address_2_input").parent().addClass("has-error"),e("#error_address_2").css("visibility","visible"),r=!1):(e("#address_2_input").parent().removeClass("has-error"),e("#address_2_input").parent().addClass("has-success"),e("#error_address_2").css("visibility","hidden")),s&&((s=r&&s)||e("#address_2_input").focus());var l=b("#city_input","#error_city");s&&((s=l&&s)||e("#city_input").focus());var o=b("#postal_code_input","#error_postal_code");s&&((s=o&&s)||e("#postal_code_input").focus());var d=b("#email_input","#error_email");s&&((s=d&&s)||e("#email_input").focus());var c=b("#phone_input","#error_phone");if(s&&((s=c&&s)||e("#phone_input").focus()),e("#provice_input_wrap").is(":visible")){var _=b("#province_input","#error_province");s&&((s=_&&s)||e("#province_input").focus())}var p=e("#provinceList").find("option:selected").text();if(e("#provice_input_wrap").is(":visible")&&(p=e("#province_input").val()),s){var h={userId:a.util.getUserId(),country:x,fullCountry:e("#countryList").find("option:selected").text(),province:p,city:e("#city_input").val(),streetAddr:e("#address_input").val(),extendAddr:e("#address_2_input").val(),email:e("#email_input").val(),postCode:e("#postal_code_input").val(),isBillAddr:"0",telephone:e("#phone_input").val(),telephone1:e("#phone_2_input").val(),recFirstname:e("#first_name_input").val(),recLastname:e("#last_name_input").val()};N?(h.addrId=N.addrId,N.isBillAddr||(N.isBillAddr="0"),h.isBillAddr=N.isBillAddr,e("#default_input").get(0).checked?h.isDefault=1:h.isDefault=0,a.dao.updateAddress({inputParams:JSON.stringify(h)},function(s){e(".edit-address-mask").addClass("hide"),"1"==N.isBillAddr?u():m(),N=null})):a.dao.addAddress({inputParams:JSON.stringify(h)},function(s){e(".edit-address-mask").addClass("hide"),m()})}}),e("#cancel_save_address_btn").click(function(){e(".edit-address-mask").addClass("hide")})}(),function(){e("#account_setting_first_name_input").blur(function(){var s=a.util.checkNull(e(this).val());console.log(s),0==s?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#account_setting_error_first_name").css("visibility","visible")):1==s&&(e(this).parent().removeClass("has-error"),e(this).parent().addClass("has-success"),e("#account_setting_error_first_name").css("visibility","hidden"))}),e("#account_setting_last_name_input").blur(function(){var s=a.util.checkNull(e(this).val());console.log(s),0==s?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#account_setting_error_last_name").css("visibility","visible")):1==s&&(e(this).parent().removeClass("has-error"),e(this).parent().addClass("has-success"),e("#account_setting_error_last_name").css("visibility","hidden"))}),e("#modify_old_pwd_input").blur(function(){var s=a.util.checkPassword(e(this).val());console.log(s),0==s?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#old_pwd_error").css("visibility","visible")):-1==s?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#old_pwd_error").css("visibility","visible")):1==s&&(e(this).parent().removeClass("has-error"),e(this).parent().addClass("has-success"),e("#old_pwd_error").css("visibility","hidden"))}),e("#modify_new_pwd_input").blur(function(){var s=a.util.checkPassword(e(this).val());console.log(s),0==s?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#new_pwd_error").css("visibility","visible")):-1==s?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#new_pwd_error").css("visibility","visible")):1==s&&(e(this).parent().removeClass("has-error"),e(this).parent().addClass("has-success"),e("#new_pwd_error").css("visibility","hidden"))}),e("#modify_confirm_new_pwd_input").blur(function(){var s=a.util.checkPassword(e(this).val());console.log(s),0==s?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#confirm_new_pwd_error").css("visibility","visible")):-1==s?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#confirm_new_pwd_error").css("visibility","visible")):1==s&&(e(this).parent().removeClass("has-error"),e(this).parent().addClass("has-success"),e("#confirm_new_pwd_error").css("visibility","hidden"))}),e("#first_name_input").blur(function(){var s=a.util.checkNull(e(this).val());console.log(s),0==s?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_first_name").css("visibility","visible")):1==s&&(e(this).parent().removeClass("has-error"),e(this).parent().addClass("has-success"),e("#error_first_name").css("visibility","hidden"))}),e("#last_name_input").blur(function(){var s=a.util.checkNull(e(this).val());console.log(s),0==s?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_last_name").css("visibility","visible")):1==s&&(e(this).parent().removeClass("has-error"),e(this).parent().addClass("has-success"),e("#error_last_name").css("visibility","hidden"))}),e("#address_input").blur(function(){var s=a.util.checkAddress(e(this).val());0==s?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_address").css("visibility","visible")):-1==s?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_address").css("visibility","visible")):1==s&&(e(this).parent().removeClass("has-error"),e(this).parent().addClass("has-success"),e("#error_address").css("visibility","hidden"))}),e("#address_2_input").blur(function(){-1==a.util.checkAddress(e(this).val())?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_address_2").css("visibility","visible")):(e(this).parent().removeClass("has-error"),e(this).parent().addClass("has-success"),e("#error_address_2").css("visibility","hidden"))}),e("#city_input").blur(function(){var s=a.util.checkNull(e(this).val());console.log(s),0==s?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_city").css("visibility","visible")):1==s&&(e(this).parent().removeClass("has-error"),e(this).parent().addClass("has-success"),e("#error_city").css("visibility","hidden"))}),e("#province_input").blur(function(){var s=a.util.checkNull(e(this).val());console.log(s),0==s?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_province").css("visibility","visible")):1==s&&(e(this).parent().removeClass("has-error"),e(this).parent().addClass("has-success"),e("#error_province").css("visibility","hidden"))}),e("#postal_code_input").blur(function(){var s=a.util.checkPhone(e(this).val());console.log(s),0==s?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_postal_code").css("visibility","visible")):-1==s?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_postal_code").css("visibility","visible")):1==s&&(e(this).parent().removeClass("has-error"),e(this).parent().addClass("has-success"),e("#error_postal_code").css("visibility","hidden"))}),e("#email_input").blur(function(){var s=a.util.checkEmail(e(this).val());console.log(s),0==s?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_email").css("visibility","visible")):-1==s?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_email").css("visibility","visible")):1==s&&(e(this).parent().removeClass("has-error"),e(this).parent().addClass("has-success"),e("#error_email").css("visibility","hidden"))}),e("#phone_input").blur(function(){var s=a.util.checkPhone(e(this).val());console.log(s),0==s?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_phone").css("visibility","visible")):-1==s?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_phone").css("visibility","visible")):1==s&&(e(this).parent().removeClass("has-error"),e(this).parent().addClass("has-success"),e("#error_phone").css("visibility","hidden"))})}()});