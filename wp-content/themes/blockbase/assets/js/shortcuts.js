( function ( g ) {

    var t = {
        PLATFORM_WINDOWS: 'windows',
        PLATFORM_IPHONE: 'iphone',
        PLATFORM_IPOD: 'ipod',
        PLATFORM_IPAD: 'ipad',
        PLATFORM_BLACKBERRY: 'blackberry',
        PLATFORM_BLACKBERRY_10: 'blackberry_10',
        PLATFORM_SYMBIAN: 'symbian_series60',
        PLATFORM_SYMBIAN_S40: 'symbian_series40',
        PLATFORM_J2ME_MIDP: 'j2me_midp',
        PLATFORM_ANDROID: 'android',
        PLATFORM_ANDROID_TABLET: 'android_tablet',
        PLATFORM_FIREFOX_OS: 'firefoxOS',
        PLATFORM_MOBILE_GENERIC: 'mobile_generic',
  
        userAgent : false, // Shortcut to the browser User Agent String.
        matchedPlatformName : false, // Matched platform name. False otherwise.
        matchedUserAgentName : false, // Matched UA String. False otherwise.
  
        init: function() {
          try {
            t.userAgent = g.navigator.userAgent.toLowerCase();
            t.getPlatformName();
            t.getMobileUserAgentName();
          }	catch ( e ) {
            console.error( e );
          }
        },
  
        initForTest: function( userAgent ) {
          t.matchedPlatformName = false;
          t.matchedUserAgentName = false;
          try {
            t.userAgent = userAgent.toLowerCase();
            t.getPlatformName();
            t.getMobileUserAgentName();
          }	catch ( e ) {
            console.error( e );
          }
        },
  
        /**
         * This method detects the mobile User Agent name.
         */
        getMobileUserAgentName: function() {
          if ( t.matchedUserAgentName !== false )
            return t.matchedUserAgentName;
  
          if ( t.userAgent === false )
            return false;
  
          if ( t.isChromeForIOS() )
            t.matchedUserAgentName = 'chrome-for-ios';
          else if ( t.isTwitterForIpad() )
            t.matchedUserAgentName =  'twitter-for-ipad';
          else if ( t.isTwitterForIphone() )
            t.matchedUserAgentName =  'twitter-for-iphone';
          else if ( t.isIPhoneOrIPod() )
            t.matchedUserAgentName = 'iphone';
          else if ( t.isIPad() )
            t.matchedUserAgentName = 'ipad';
          else if ( t.isAndroidTablet() )
            t.matchedUserAgentName = 'android_tablet';
          else if ( t.isAndroid() )
            t.matchedUserAgentName = 'android';
          else if ( t.isBlackberry10() )
            t.matchedUserAgentName = 'blackberry_10';
          else if ( has( 'blackberry' ) )
            t.matchedUserAgentName = 'blackberry';
          else if ( t.isBlackberryTablet() )
            t.matchedUserAgentName = 'blackberry_tablet';
          else if ( t.isWindowsPhone7() )
            t.matchedUserAgentName = 'win7';
          else if ( t.isWindowsPhone8() )
            t.matchedUserAgentName = 'winphone8';
          else if ( t.isOperaMini() )
            t.matchedUserAgentName = 'opera-mini';
          else if ( t.isOperaMobile() )
            t.matchedUserAgentName = 'opera-mobi';
          else if ( t.isKindleFire() )
            t.matchedUserAgentName = 'kindle-fire';
          else if ( t.isSymbianPlatform() )
            t.matchedUserAgentName = 'series60';
          else if ( t.isFirefoxMobile() )
            t.matchedUserAgentName = 'firefox_mobile';
          else if ( t.isFirefoxOS() )
            t.matchedUserAgentName = 'firefoxOS';
          else if ( t.isFacebookForIphone() )
            t.matchedUserAgentName = 'facebook-for-iphone';
          else if ( t.isFacebookForIpad() )
            t.matchedUserAgentName = 'facebook-for-ipad';
          else if ( t.isWordPressForIos() )
            t.matchedUserAgentName = 'ios-app';
          else if ( has( 'iphone' ) )
            t.matchedUserAgentName = 'iphone-unknown';
          else if ( has( 'ipad' ) )
            t.matchedUserAgentName = 'ipad-unknown';
  
          return t.matchedUserAgentName;
        },
  
        /**
         * This method detects the mobile platform name.
         */
        getPlatformName : function() {
          if ( t.matchedPlatformName !== false )
            return t.matchedPlatformName;
  
          if ( t.userAgent === false )
            return false;
  
          if ( has( 'windows ce' ) || has( 'windows phone' ) ) {
            t.matchedPlatformName = t.PLATFORM_WINDOWS;
          } else if ( has( 'ipad' ) ) {
            t.matchedPlatformName = t.PLATFORM_IPAD;
          } else if ( has( 'ipod' ) ) {
            t.matchedPlatformName = t.PLATFORM_IPOD;
          } else if ( has( 'iphone' ) ) {
            t.matchedPlatformName = t.PLATFORM_IPHONE;
          } else if ( has( 'android' ) ) {
            if ( t.isAndroidTablet() )
              t.matchedPlatformName = t.PLATFORM_ANDROID_TABLET;
            else
              t.matchedPlatformName = t.PLATFORM_ANDROID;
          } else if ( t.isKindleFire() ) {
            t.matchedPlatformName = t.PLATFORM_ANDROID_TABLET;
          } else if ( t.isBlackberry10() ) {
            t.matchedPlatformName = t.PLATFORM_BLACKBERRY_10;
          } else if ( has( 'blackberry' ) ) {
            t.matchedPlatformName = t.PLATFORM_BLACKBERRY;
          } else if ( t.isBlackberryTablet() ) {
            t.matchedPlatformName = t.PLATFORM_BLACKBERRY;
          } else if ( t.isSymbianPlatform() ) {
            t.matchedPlatformName = t.PLATFORM_SYMBIAN;
          } else if ( t.isSymbianS40Platform() ) {
            t.matchedPlatformName = t.PLATFORM_SYMBIAN_S40;
          } else if ( t.isJ2MEPlatform() ) {
            t.matchedPlatformName = t.PLATFORM_J2ME_MIDP;
          } else if ( t.isFirefoxOS() ) {
            t.matchedPlatformName = t.PLATFORM_FIREFOX_OS;
          } else if ( t.isFirefoxMobile() ) {
            t.matchedPlatformName = t.PLATFORM_MOBILE_GENERIC;
          }
  
          return t.matchedPlatformName;
        },
  
  
        /**
         * Detect the BlackBerry OS version.
         *
         * Note: This is for smartphones only. Does not work on BB tablets.
         */
        getBlackBerryOSVersion : check( function() {
          if ( t.isBlackberry10() )
            return '10';
  
          if ( ! has( 'blackberry' ) )
            return false;
  
          var rv = -1; // Return value assumes failure.
          var re;
  
          if ( has( 'webkit' ) ) { // Detecting the BB OS version for devices running OS 6.0 or higher
            re = /Version\/([\d\.]+)/i;
          } else {
            // BlackBerry devices <= 5.XX
            re = /BlackBerry\w+\/([\d\.]+)/i;
          }
          if ( re.exec( t.userAgent ) != null )
            rv =  RegExp.$1.toString();
  
          return rv === -1 ? false : rv;
        } ),
  
        /**
         * Detects if the current UA is iPhone Mobile Safari or another iPhone or iPod Touch Browser.
         */
        isIPhoneOrIPod : check( function() {
          return has( 'safari' ) && ( has( 'iphone' ) || has( 'ipod' ) );
        } ),
  
        /**
         * Detects if the current device is an iPad.
         */
        isIPad : check( function() {
          return has( 'ipad' ) && has( 'safari' );
        } ),
  
  
        /**
        *  Detects if the current UA is Chrome for iOS
        */
        isChromeForIOS : check( function() {
          return t.isIPhoneOrIPod() && has( 'crios/' );
        } ),
  
        /**
         * Detects if the current browser is the Native Android browser.
         */
        isAndroid : check( function() {
          if ( has( 'android' ) ) {
            return ! ( t.isOperaMini() || t.isOperaMobile() || t.isFirefoxMobile() );
          }
        } ),
  
        /**
         * Detects if the current browser is the Native Android Tablet browser.
         */
         isAndroidTablet : check( function() {
          if ( has( 'android' ) && ! has( 'mobile' ) ) {
            return ! ( t.isOperaMini() || t.isOperaMobile() || t.isFirefoxMobile() );
          }
        } ),
  
  
        /**
         * Detects if the current browser is Opera Mobile
         */
        isOperaMobile : check( function() {
          return has( 'opera' ) && has( 'mobi' );
        } ),
  
        /**
         * Detects if the current browser is Opera Mini
         */
        isOperaMini : check( function() {
          return has( 'opera' ) && has( 'mini' );
        } ),
  
  
        /**
         * isBlackberry10() can be used to check the User Agent for a BlackBerry 10 device.
         */
        isBlackberry10 : check( function() {
          return has( 'bb10' ) && has( 'mobile' );
        } ),
  
        /**
         * isBlackberryTablet() can be used to check the User Agent for a RIM blackberry tablet
         */
        isBlackberryTablet : check( function() {
          return has( 'playbook' ) && has( 'rim tablet' );
        } ),
  
        /**
         * Detects if the current browser is a Windows Phone 7 device.
         */
        isWindowsPhone7 : check( function () {
          return has( 'windows phone os 7' );
        } ),
  
        /**
         * Detects if the current browser is a Windows Phone 8 device.
         */
        isWindowsPhone8 : check( function () {
          return has( 'windows phone 8' );
        } ),
  
        /**
         * Detects if the device platform is J2ME.
         */
        isJ2MEPlatform : check( function () {
          return has( 'j2me/midp' ) || ( has( 'midp' ) && has( 'cldc' ) );
        } ),
  
  
        /**
         * Detects if the device platform is the Symbian Series 40.
         */
        isSymbianS40Platform : check( function() {
          if ( has( 'series40' ) ) {
            return has( 'nokia' ) || has( 'ovibrowser' ) || has( 'nokiabrowser' );
          }
        } ),
  
  
        /**
         * Detects if the device platform is the Symbian Series 60.
         */
        isSymbianPlatform : check( function() {
          if ( has( 'webkit' ) ) {
            // First, test for WebKit, then make sure it's either Symbian or S60.
            return has( 'symbian' ) || has( 'series60' );
          } else if ( has( 'symbianos' ) && has( 'series60' ) ) {
            return true;
          } else if ( has( 'nokia' ) && has( 'series60' ) ) {
            return true;
          } else if ( has( 'opera mini' ) ) {
            return has( 'symbianos' ) || has( 'symbos' ) || has( 'series 60' );
          }
        } ),
  
  
        /**
         * Detects if the current browser is the Kindle Fire Native browser.
         */
        isKindleFire : check( function() {
          return has( 'silk/' ) && has( 'silk-accelerated=' );
        } ),
  
        /**
         * Detects if the current browser is Firefox Mobile (Fennec)
         */
        isFirefoxMobile : check( function() {
          return has( 'fennec' );
        } ),
  
  
        /**
         * Detects if the current browser is the native FirefoxOS browser
         */
        isFirefoxOS : check( function() {
          return has( 'mozilla' ) && has( 'mobile' ) && has( 'gecko' ) && has( 'firefox' );
        } ),
  
  
        /**
         * Detects if the current UA is Facebook for iPad
         */
        isFacebookForIpad : check( function() {
          if ( ! has( 'ipad' ) )
            return false;
  
          return has( 'facebook' ) || has( 'fbforiphone' ) || has( 'fban/fbios;' );
        } ),
  
        /**
         * Detects if the current UA is Facebook for iPhone
         */
        isFacebookForIphone : check( function() {
          if ( ! has( 'iphone' ) )
            return false;
  
          return ( has( 'facebook' ) && ! has( 'ipad' ) ) ||
            ( has( 'fbforiphone' ) && ! has( 'tablet' ) ) ||
            ( has( 'fban/fbios;' ) && ! has( 'tablet' ) ); // FB app v5.0 or higher
        } ),
  
        /**
         * Detects if the current UA is Twitter for iPhone
         */
        isTwitterForIphone : check( function() {
          if ( has( 'ipad' ) )
            return false;
  
          return has( 'twitter for iphone' );
        } ),
  
        /**
         * Detects if the current UA is Twitter for iPad
         */
        isTwitterForIpad : check( function() {
          return has( 'twitter for ipad' ) || ( has( 'ipad' ) && has( 'twitter for iphone' ) );
        } ),
  
  
        /**
         * Detects if the current UA is WordPress for iOS
         */
        isWordPressForIos : check( function() {
          return has( 'wp-iphone' );
        } )
    };
  
    function has( str ) {
      return t.userAgent.indexOf( str ) != -1;
    }
  
    function check( fn ) {
      return function() {
        return t.userAgent === false ? false : fn() || false;
      }
    }
  
    g.wpcom_mobile_user_agent_info = t;
  
  } )( typeof window !== 'undefined' ? window : this );
  ;
  !function(){"use strict";var e,t={noop:function(){},texturize:function(e){return(e=(e=(e=(e+="").replace(/'/g,"&#8217;").replace(/&#039;/g,"&#8217;")).replace(/"/g,"&#8221;").replace(/&#034;/g,"&#8221;").replace(/&quot;/g,"&#8221;").replace(/[\u201D]/g,"&#8221;")).replace(/([\w]+)=&#[\d]+;(.+?)&#[\d]+;/g,'$1="$2"')).trim()},applyReplacements:function(e,t){if(e)return t?e.replace(/{(\d+)}/g,(function(e,r){return void 0!==t[r]?t[r]:e})):e},getBackgroundImage:function(e){var t=document.createElement("canvas"),r=t.getContext&&t.getContext("2d");if(e){r.filter="blur(20px) ",r.drawImage(e,0,0);var o=t.toDataURL("image/png");return t=null,o}}},r=function(){function e(e,t){return Element.prototype.matches?e.matches(t):Element.prototype.msMatchesSelector?e.msMatchesSelector(t):void 0}function r(e,t,r,o){if(!e)return o();e.style.removeProperty("display"),e.style.opacity=t,e.style.pointerEvents="none";var a=function(i,n){var l=(performance.now()-i)/n;l<1?(e.style.opacity=t+(r-t)*l,requestAnimationFrame((()=>a(i,n)))):(e.style.opacity=r,e.style.removeProperty("pointer-events"),o())};requestAnimationFrame((function(){requestAnimationFrame((function(){a(performance.now(),200)}))}))}return{closest:function(t,r){if(t.closest)return t.closest(r);var o=t;do{if(e(o,r))return o;o=o.parentElement||o.parentNode}while(null!==o&&1===o.nodeType);return null},matches:e,hide:function(e){e&&(e.style.display="none")},show:function(e){e&&(e.style.display="block")},fadeIn:function(e,o){r(e,0,1,o=o||t.noop)},fadeOut:function(e,o){o=o||t.noop,r(e,1,0,(function(){e&&(e.style.display="none"),o()}))},scrollToElement:function(e,t,r){if(!e||!t)return r?r():void 0;var o=t.querySelector(".jp-carousel-info-extra");o&&(o.style.minHeight=window.innerHeight-64+"px");var a=!0,i=Date.now(),n=t.scrollTop,l=Math.max(0,e.offsetTop-Math.max(0,window.innerHeight-function(e){var t=e.querySelector(".jp-carousel-info-footer"),r=e.querySelector(".jp-carousel-info-extra"),o=e.querySelector(".jp-carousel-info-content-wrapper");if(t&&r&&o){var a=window.getComputedStyle(r),i=parseInt(a.paddingTop,10)+parseInt(a.paddingBottom,10);return i=isNaN(i)?0:i,o.offsetHeight+t.offsetHeight+i}return 0}(t)))-t.scrollTop;function s(){a=!1}l=Math.min(l,t.scrollHeight-window.innerHeight),t.addEventListener("wheel",s),function e(){var c,u=Date.now(),d=(c=(u-i)/300)<.5?2*c*c:1-Math.pow(-2*c+2,2)/2,p=(d=d>1?1:d)*l;if(t.scrollTop=n+p,u<=i+300&&a)return requestAnimationFrame(e);r&&r(),o&&(o.style.minHeight=""),a=!1,t.removeEventListener("wheel",s)}()},getJSONAttribute:function(e,t){if(e&&e.hasAttribute(t))try{return JSON.parse(e.getAttribute(t))}catch{return}},convertToPlainText:function(e){var t=document.createElement("div");return t.textContent=e,t.innerHTML},stripHTML:function(e){return e.replace(/<[^>]*>?/gm,"")},emitEvent:function(e,t,r){var o;try{o=new CustomEvent(t,{bubbles:!0,cancelable:!0,detail:r||null})}catch{(o=document.createEvent("CustomEvent")).initCustomEvent(t,!0,!0,r||null)}e.dispatchEvent(o)},isTouch:function(){return"ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch}}}();function o(){var o,a,i,n,l="",s=!1,c="div.gallery, div.tiled-gallery, ul.wp-block-gallery, ul.blocks-gallery-grid, figure.wp-block-gallery.has-nested-images, div.wp-block-jetpack-tiled-gallery, a.single-image-gallery",u=".gallery-item, .tiled-gallery-item, .blocks-gallery-item,  .tiled-gallery__item",d=u+", .wp-block-image",p={},m="undefined"!=typeof wpcom&&wpcom.carousel&&wpcom.carousel.stat?wpcom.carousel.stat:t.noop,g="undefined"!=typeof wpcom&&wpcom.carousel&&wpcom.carousel.pageview?wpcom.carousel.pageview:t.noop;function h(t){if(!s)switch(t.which){case 38:t.preventDefault(),p.overlay.scrollTop-=100;break;case 40:t.preventDefault(),p.overlay.scrollTop+=100;break;case 39:t.preventDefault(),e.slideNext();break;case 37:case 8:t.preventDefault(),e.slidePrev();break;case 27:t.preventDefault(),L()}}function f(){s=!0}function v(){s=!1}function y(e){e.role="button",e.tabIndex=0,e.ariaLabel=jetpackCarouselStrings.image_label}function w(){p.overlay||(p.overlay=document.querySelector(".jp-carousel-overlay"),p.container=p.overlay.querySelector(".jp-carousel-wrap"),p.gallery=p.container.querySelector(".jp-carousel"),p.info=p.overlay.querySelector(".jp-carousel-info"),p.caption=p.info.querySelector(".jp-carousel-caption"),p.commentField=p.overlay.querySelector("#jp-carousel-comment-form-comment-field"),p.emailField=p.overlay.querySelector("#jp-carousel-comment-form-email-field"),p.authorField=p.overlay.querySelector("#jp-carousel-comment-form-author-field"),p.urlField=p.overlay.querySelector("#jp-carousel-comment-form-url-field"),window.innerWidth<=760&&Math.round(window.innerWidth/760*110)<40&&r.isTouch(),[p.commentField,p.emailField,p.authorField,p.urlField].forEach((function(e){e&&(e.addEventListener("focus",f),e.addEventListener("blur",v))})),p.overlay.addEventListener("click",(function(e){var t,o,a=e.target,i=!!r.closest(a,".jp-carousel-close-hint"),n=!!window.matchMedia("(max-device-width: 760px)").matches;a===p.overlay?n||L():i?L():a.classList.contains("jp-carousel-image-download")?m("download_original_click"):a.classList.contains("jp-carousel-comment-login")?(t=p.currentSlide,o=t?t.attrs.attachmentId:"0",window.location.href=jetpackCarouselStrings.login_url+"%23jp-carousel-"+o):r.closest(a,"#jp-carousel-comment-form-container")?function(e){var t=e.target,o=r.getJSONAttribute(p.container,"data-carousel-extra")||{},a=p.currentSlide.attrs.attachmentId,i=document.querySelector("#jp-carousel-comment-form-submit-and-info-wrapper"),n=document.querySelector("#jp-carousel-comment-form-spinner"),l=document.querySelector("#jp-carousel-comment-form-button-submit"),s=document.querySelector("#jp-carousel-comment-form");if(p.commentField&&p.commentField.getAttribute("id")===t.getAttribute("id"))f(),r.show(i);else if(r.matches(t,'input[type="submit"]')){e.preventDefault(),e.stopPropagation(),r.show(n),s.classList.add("jp-carousel-is-disabled");var c={action:"post_attachment_comment",nonce:jetpackCarouselStrings.nonce,blog_id:o.blog_id,id:a,comment:p.commentField.value};if(!c.comment.length)return void j(jetpackCarouselStrings.no_comment_text,!1);if(1!==Number(jetpackCarouselStrings.is_logged_in)&&(c.email=p.emailField.value,c.author=p.authorField.value,c.url=p.urlField.value,1===Number(jetpackCarouselStrings.require_name_email))){if(!c.email.length||!c.email.match("@"))return void j(jetpackCarouselStrings.no_comment_email,!1);if(!c.author.length)return void j(jetpackCarouselStrings.no_comment_author,!1)}var u=new XMLHttpRequest;u.open("POST",jetpackCarouselStrings.ajaxurl,!0),u.setRequestHeader("X-Requested-With","XMLHttpRequest"),u.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),u.onreadystatechange=function(){if(this.readyState===XMLHttpRequest.DONE&&this.status>=200&&this.status<300){var e;try{e=JSON.parse(this.response)}catch{return void j(jetpackCarouselStrings.comment_post_error,!1)}"approved"===e.comment_status?j(jetpackCarouselStrings.comment_approved,!0):"unapproved"===e.comment_status?j(jetpackCarouselStrings.comment_unapproved,!0):j(jetpackCarouselStrings.comment_post_error,!1),H(),A(a),l.value=jetpackCarouselStrings.post_comment,r.hide(n),s.classList.remove("jp-carousel-is-disabled")}else j(jetpackCarouselStrings.comment_post_error,!1)};var d=[];for(var m in c)if(m){var g=encodeURIComponent(m)+"="+encodeURIComponent(c[m]);d.push(g.replace(/%20/g,"+"))}var h=d.join("&");u.send(h)}}(e):(r.closest(a,".jp-carousel-photo-icons-container")||a.classList.contains("jp-carousel-photo-title"))&&function(e){e.preventDefault();var t=e.target,o=p.info.querySelector(".jp-carousel-info-extra"),a=p.info.querySelector(".jp-carousel-image-meta"),i=p.info.querySelector(".jp-carousel-comments-wrapper"),n=p.info.querySelector(".jp-carousel-icon-info"),l=p.info.querySelector(".jp-carousel-icon-comments");function s(){l&&l.classList.remove("jp-carousel-selected"),n.classList.toggle("jp-carousel-selected"),i&&i.classList.remove("jp-carousel-show"),a&&(a.classList.toggle("jp-carousel-show"),a.classList.contains("jp-carousel-show")?o.classList.add("jp-carousel-show"):o.classList.remove("jp-carousel-show"))}function c(){n&&n.classList.remove("jp-carousel-selected"),l.classList.toggle("jp-carousel-selected"),a&&a.classList.remove("jp-carousel-show"),i&&(i.classList.toggle("jp-carousel-show"),i.classList.contains("jp-carousel-show")?o.classList.add("jp-carousel-show"):o.classList.remove("jp-carousel-show"))}(r.closest(t,".jp-carousel-icon-info")||t.classList.contains("jp-carousel-photo-title"))&&(a&&a.classList.contains("jp-carousel-show")?r.scrollToElement(p.overlay,p.overlay,s):(s(),r.scrollToElement(p.info,p.overlay))),r.closest(t,".jp-carousel-icon-comments")&&(i&&i.classList.contains("jp-carousel-show")?r.scrollToElement(p.overlay,p.overlay,c):(c(),r.scrollToElement(p.info,p.overlay)))}(e)})),window.addEventListener("keydown",h),p.overlay.addEventListener("jp_carousel.afterOpen",(function(){v(),p.slides.length<=1||(p.slides.length<=5?r.show(p.info.querySelector(".jp-swiper-pagination")):r.show(p.info.querySelector(".jp-carousel-pagination")))})),p.overlay.addEventListener("jp_carousel.beforeClose",(function(){f(),document.documentElement.style.removeProperty("height"),e&&e.enable(),r.hide(p.info.querySelector(".jp-swiper-pagination")),r.hide(p.info.querySelector(".jp-carousel-pagination"))})),p.overlay.addEventListener("jp_carousel.afterClose",(function(){window.history.pushState?history.pushState("",document.title,window.location.pathname+window.location.search):window.location.href="",l="",p.isOpen=!1})),p.overlay.addEventListener("touchstart",(function(e){e.touches.length>1&&e.preventDefault()})))}function j(e,t){var o=p.overlay.querySelector("#jp-carousel-comment-post-results"),a="jp-carousel-comment-post-"+(t?"success":"error");o.innerHTML='<span class="'+a+'">'+e+"</span>",r.hide(p.overlay.querySelector("#jp-carousel-comment-form-spinner")),p.overlay.querySelector("#jp-carousel-comment-form").classList.remove("jp-carousel-is-disabled"),r.show(o)}function b(){var e=document.querySelectorAll("a img[data-attachment-id]");Array.prototype.forEach.call(e,(function(e){var t=e.parentElement,o=t.parentElement;if(!o.classList.contains("gallery-icon")&&!r.closest(o,u)&&t.hasAttribute("href")){var a=!1;t.getAttribute("href").split("?")[0]===e.getAttribute("data-orig-file").split("?")[0]&&1===Number(jetpackCarouselStrings.single_image_gallery_media_file)&&(a=!0),t.getAttribute("href")===e.getAttribute("data-permalink")&&(a=!0),a&&(y(e),t.classList.add("single-image-gallery"),t.setAttribute("data-carousel-extra",JSON.stringify({blog_id:Number(jetpackCarouselStrings.blog_id)})))}}))}function S(o){(!o||o<0||o>p.slides.length)&&(o=0),p.currentSlide=p.slides[o];var a,i,n=p.currentSlide,s=n.attrs.attachmentId;!function(e){var t=e.el,r=e.attrs,o=t.querySelector("img");if(!o.hasAttribute("data-loaded")){var a=!!r.previewImage,i=r.thumbSize;!a||i&&t.offsetWidth>i.width?o.src=r.src:o.src=r.previewImage,o.setAttribute("itemprop","image"),o.setAttribute("data-loaded",1)}}(p.slides[o]),1!==Number(jetpackCarouselStrings.display_background_image)||p.slides[o].backgroundImage||function(t){var r=t.el;e&&e.slides&&(r=e.slides[e.activeIndex]);var o=t.attrs.originalElement;o.complete&&0!==o.naturalHeight?E(t,r,o):o.onload=function(){E(t,r,o)}}(p.slides[o]),r.hide(p.caption),function(e){var t,o,a,i,n="",l="",s="";if(t=p.overlay.querySelector(".jp-carousel-photo-caption"),o=p.overlay.querySelector(".jp-carousel-caption"),a=p.overlay.querySelector(".jp-carousel-photo-title"),i=p.overlay.querySelector(".jp-carousel-photo-description"),r.hide(t),r.hide(o),r.hide(a),r.hide(i),n=q(e.caption)||"",l=q(e.title)||"",s=q(e.desc)||"",(n||l||s)&&(n&&(t.innerHTML=n,o.innerHTML=n,r.show(t),r.show(o)),r.stripHTML(n)===r.stripHTML(l)&&(l=""),r.stripHTML(n)===r.stripHTML(s)&&(s=""),r.stripHTML(l)===r.stripHTML(s)&&(s=""),s&&(i.innerHTML=s,r.show(i),l||n||(t.innerHTML=r.stripHTML(s),r.show(t))),l)){var c=r.stripHTML(l);a.innerHTML=c,n||(t.innerHTML=c,o.innerHTML=c,r.show(t)),r.show(a)}}({caption:n.attrs.caption,title:n.attrs.title,desc:n.attrs.desc}),function(e){if(!e||1!==Number(jetpackCarouselStrings.display_exif))return!1;var t=p.info.querySelector(".jp-carousel-image-meta ul.jp-carousel-image-exif"),r="";for(var o in e){var a=e[o],i=jetpackCarouselStrings.meta_data||[];if(0!==parseFloat(a)&&a.length&&-1!==i.indexOf(o)){switch(o){case"focal_length":a+="mm";break;case"shutter_speed":a=k(a);break;case"aperture":a="f/"+a}r+="<li><h5>"+jetpackCarouselStrings[o]+"</h5>"+a+"</li>"}}t.innerHTML=r,t.style.removeProperty("display")}(p.slides[o].attrs.imageMeta),function(e){if(!e)return!1;var r,o=[e.attrs.origWidth,e.attrs.origHeight],a=document.createElement("a");a.href=e.attrs.src.replace(/\?.+$/,""),r=null!==a.hostname.match(/^i[\d]{1}\.wp\.com$/i)?a.href:e.attrs.origFile.replace(/\?.+$/,"");var i=p.info.querySelector(".jp-carousel-download-text"),n=p.info.querySelector(".jp-carousel-image-download");i.innerHTML=t.applyReplacements(jetpackCarouselStrings.download_original,o),n.setAttribute("href",r),n.style.removeProperty("display")}(n),1===Number(jetpackCarouselStrings.display_comments)&&(a=p.slides[o].attrs.commentsOpened,i=p.container.querySelector(".jp-carousel-comment-form-container"),1===parseInt(a,10)?r.fadeIn(i):r.fadeOut(i),A(s),r.hide(p.info.querySelector("#jp-carousel-comment-post-results")));var c=p.info.querySelector(".jp-carousel-pagination");if(c&&p.slides.length>5){var u=o+1;c.innerHTML="<span>"+u+" / "+p.slides.length+"</span>"}jetpackCarouselStrings.stats&&((new Image).src=document.location.protocol+"//pixel.wp.com/g.gif?"+jetpackCarouselStrings.stats+"&post="+encodeURIComponent(s)+"&rand="+Math.random()),g(s),window.location.hash=l="#jp-carousel-"+s}function L(){document.body.style.overflow=a,document.documentElement.style.overflow=i,H(),f(),r.emitEvent(p.overlay,"jp_carousel.beforeClose"),window.scrollTo(window.scrollX||window.pageXOffset||0,n||0),e.destroy(),p.isOpen=!1,p.slides=[],p.currentSlide=void 0,p.gallery.innerHTML="",r.fadeOut(p.overlay,(function(){r.emitEvent(p.overlay,"jp_carousel.afterClose")}))}function x(e,t,r){var o,a=r?e.replace(/.*=([\d]+%2C[\d]+).*$/,"$1"):e.replace(/.*-([\d]+x[\d]+)\..+$/,"$1");return"9999"===(o=a!==e?r?a.split("%2C"):a.split("x"):[t,0])[0]&&(o[0]="0"),"9999"===o[1]&&(o[1]="0"),o}function k(e){return e>=1?Math.round(10*e)/10+"s":"1/"+Math.round(1/e)+"s"}function q(e){return!e.match(" ")&&e.match("_")?"":e}function A(e,t){var a=void 0===t,i=p.info.querySelector(".jp-carousel-icon-comments .jp-carousel-has-comments-indicator");if(i.classList.remove("jp-carousel-show"),clearInterval(o),e){(!t||t<1)&&(t=0);var n=p.info.querySelector(".jp-carousel-comments"),l=p.info.querySelector("#jp-carousel-comments-loading");r.show(l),a&&(r.hide(n),n.innerHTML="");var s=new XMLHttpRequest,c=jetpackCarouselStrings.ajaxurl+"?action=get_attachment_comments&nonce="+jetpackCarouselStrings.nonce+"&id="+e+"&offset="+t;s.open("GET",c),s.setRequestHeader("X-Requested-With","XMLHttpRequest");var u=function(){r.fadeIn(n),r.fadeOut(l)};s.onload=function(){if(p.currentSlide&&p.currentSlide.attrs.attachmentId===e){var c,d=s.status>=200&&s.status<300;try{c=JSON.parse(s.responseText)}catch{}if(!d||!c||!Array.isArray(c))return u();a&&(n.innerHTML="");for(var m=0;m<c.length;m++){var g=c[m],h=document.createElement("div");h.classList.add("jp-carousel-comment"),h.setAttribute("id","jp-carousel-comment-"+g.id),h.innerHTML='<div class="comment-gravatar">'+g.gravatar_markup+'</div><div class="comment-content"><div class="comment-author">'+g.author_markup+'</div><div class="comment-date">'+g.date_gmt+"</div>"+g.content+"</div>",n.appendChild(h),clearInterval(o),o=setInterval((function(){p.container.scrollTop+150>window.innerHeight&&(A(e,t+10),clearInterval(o))}),300)}c.length>0&&(r.show(n),i.innerText=c.length,i.classList.add("jp-carousel-show")),r.hide(l)}},s.onerror=u,s.send()}}function E(e,r,o){var a=t.getBackgroundImage(o);e.backgroundImage=a,r.style.backgroundImage="url("+a+")",r.style.backgroundSize="cover"}function H(){p.commentField&&(p.commentField.value="")}function T(e,o){p.slides=[];var a={width:window.innerWidth,height:window.innerHeight-64};0!==o&&null!==e[o].getAttribute("data-gallery-src")&&((new Image).src=e[o].getAttribute("data-gallery-src"));var i=!!r.closest(e[0],".tiled-gallery.type-rectangular");Array.prototype.forEach.call(e,(function(e,o){var n=r.closest(e,"a"),l=e.getAttribute("data-orig-file")||e.getAttribute("src-orig"),s=e.getAttribute("data-attachment-id")||e.getAttribute("data-id")||"0",c=document.querySelector('img[data-attachment-id="'+s+'"] + figcaption');c=c?c.innerHTML:e.getAttribute("data-image-caption");var u={originalElement:e,attachmentId:s,commentsOpened:e.getAttribute("data-comments-opened")||"0",imageMeta:r.getJSONAttribute(e,"data-image-meta")||{},title:e.getAttribute("data-image-title")||"",desc:e.getAttribute("data-image-description")||"",mediumFile:e.getAttribute("data-medium-file")||"",largeFile:e.getAttribute("data-large-file")||"",origFile:l||"",thumbSize:{width:e.naturalWidth,height:e.naturalHeight},caption:c||"",permalink:n&&n.getAttribute("href"),src:l||e.getAttribute("src")||""},d=r.closest(e,".tiled-gallery-item"),m=d&&d.querySelector(".tiled-gallery-caption"),g=m&&m.innerHTML;g&&(u.caption=g);var h=function(e){var t=e.getAttribute("data-orig-size")||"";if(t){var r=t.split(",");return{width:parseInt(r[0],10),height:parseInt(r[1],10)}}return{width:e.getAttribute("data-original-width")||e.getAttribute("width")||void 0,height:e.getAttribute("data-original-height")||e.getAttribute("height")||void 0}}(e);if(u.origWidth=h.width||u.thumbSize.width,u.origHeight=h.height||u.thumbSize.height,"undefined"!=typeof wpcom&&wpcom.carousel&&wpcom.carousel.generateImgSrc?u.src=wpcom.carousel.generateImgSrc(e,a):u.src=function(e){if("object"!=typeof e&&(e={}),void 0===e.origFile)return"";if(void 0===e.origWidth||void 0===e.maxWidth)return e.origFile;if(void 0===e.mediumFile||void 0===e.largeFile)return e.origFile;var t=document.createElement("a");t.href=e.largeFile;var r=/^i[0-2]\.wp\.com$/i.test(t.hostname),o=x(e.largeFile,e.origWidth,r),a=parseInt(o[0],10),i=parseInt(o[1],10);if(e.origMaxWidth=e.maxWidth,e.origMaxHeight=e.maxHeight,void 0!==window.devicePixelRatio&&window.devicePixelRatio>1&&(e.maxWidth=e.maxWidth*window.devicePixelRatio,e.maxHeight=e.maxHeight*window.devicePixelRatio),a>=e.maxWidth||i>=e.maxHeight)return e.largeFile;var n=x(e.mediumFile,e.origWidth,r),l=parseInt(n[0],10),s=parseInt(n[1],10);if(l>=e.maxWidth||s>=e.maxHeight)return e.mediumFile;if(r){var c=e.largeFile.lastIndexOf("?"),u=e.largeFile;return-1!==c&&(u=e.largeFile.substring(0,c),(e.origWidth>e.maxWidth||e.origHeight>e.maxHeight)&&(e.origMaxWidth=2*e.maxWidth,e.origMaxHeight=2*e.maxHeight,u+="?fit="+e.origMaxWidth+"%2C"+e.origMaxHeight)),u}return e.origFile}({origFile:u.src,origWidth:u.origWidth,origHeight:u.origHeight,maxWidth:a.width,maxHeight:a.height,mediumFile:u.mediumFile,largeFile:u.largeFile}),e.setAttribute("data-gallery-src",u.src),"0"!==u.attachmentId){u.title=t.texturize(u.title),u.desc=t.texturize(u.desc),u.caption=t.texturize(u.caption);var f=new Image;f.src=u.src;var v=document.createElement("div");v.classList.add("swiper-slide"),v.setAttribute("itemprop","associatedMedia"),v.setAttribute("itemscope",""),v.setAttribute("itemtype","https://schema.org/ImageObject");var y=document.createElement("div");y.classList.add("swiper-zoom-container"),p.gallery.appendChild(v),v.appendChild(y),y.appendChild(f),v.setAttribute("data-attachment-id",u.attachmentId),v.setAttribute("data-permalink",u.permalink),v.setAttribute("data-orig-file",u.origFile),i&&(u.previewImage=u.src);var w={el:v,attrs:u,index:o};p.slides.push(w)}}))}function _(e,t){if(!window.Swiper670){var o=document.querySelector("#jp-carousel-loading-overlay");r.show(o);var a=document.createElement("script");return a.id="jetpack-carousel-swiper-js",a.src=window.jetpackSwiperLibraryPath.url,a.async=!0,a.onload=function(){r.hide(o),C(e,t)},a.onerror=function(){r.hide(o)},void document.head.appendChild(a)}C(e,t)}function C(t,o){var l,s={imgSelector:".gallery-item [data-attachment-id], .tiled-gallery-item [data-attachment-id], img[data-attachment-id], img[data-id]",startIndex:0},c=r.getJSONAttribute(t,"data-carousel-extra");if(!c)return;const u=t.querySelectorAll(s.imgSelector);if(u.length&&(w(),!p.isOpen)){for(var d in p.isOpen=!0,a=getComputedStyle(document.body).overflow,document.body.style.overflow="hidden",i=getComputedStyle(document.documentElement).overflow,document.documentElement.style.overflow="hidden",n=window.scrollY||window.pageYOffset||0,p.container.setAttribute("data-carousel-extra",JSON.stringify(c)),m(["open","view_image"]),o||{})s[d]=o[d];-1===s.startIndex&&(s.startIndex=0),r.emitEvent(p.overlay,"jp_carousel.beforeOpen"),p.gallery.innerHTML="",p.overlay.style.opacity=1,p.overlay.style.display="block",T(u,s.startIndex),(e=new window.Swiper670(".jp-carousel-swiper-container",{centeredSlides:!0,zoom:!0,loop:p.slides.length>1,enabled:p.slides.length>1,pagination:{el:".jp-swiper-pagination",clickable:!0},navigation:{nextEl:".jp-swiper-button-next",prevEl:".jp-swiper-button-prev"},initialSlide:s.startIndex,on:{init:function(){S(s.startIndex)}},preventClicks:!1,preventClicksPropagation:!1,preventInteractionOnTransition:!r.isTouch(),threshold:5})).on("slideChange",(function(e){S(0===e.activeIndex?p.slides.length-1:e.activeIndex===p.slides.length+1?0:e.activeIndex-1),p.overlay.classList.remove("jp-carousel-hide-controls")})),e.on("zoomChange",(function(e,t){t>1&&p.overlay.classList.add("jp-carousel-hide-controls"),1===t&&p.overlay.classList.remove("jp-carousel-hide-controls")})),e.on("doubleTap",(function(e){if(clearTimeout(l),1===e.zoom.scale)var t=setTimeout((function(){p.overlay.classList.remove("jp-carousel-hide-controls"),clearTimeout(t)}),150)})),e.on("tap",(function(){e.zoom.scale>1&&(l=setTimeout((function(){p.overlay.classList.toggle("jp-carousel-hide-controls")}),150))})),r.fadeIn(p.overlay,(function(){r.emitEvent(p.overlay,"jp_carousel.afterOpen")}))}}function I(e){if("click"!==e.type){if("keydown"===e.type){const t=document.activeElement.parentElement,r=t&&t.classList.contains("tiled-gallery__item");" "!==e.key&&"Enter"!==e.key||!r||F(e)}}else F(e)}function M(e){var t=e.parentElement,o=t.parentElement,a=null;return o&&o.classList.contains("wp-block-image")?a=t.getAttribute("href"):t&&t.classList.contains("wp-block-image")&&t.querySelector(":scope > a")&&(a=t.querySelector(":scope > a").getAttribute("href")),!(a&&a.split("?")[0]!==e.getAttribute("data-orig-file").split("?")[0]&&a!==e.getAttribute("data-permalink")||t.classList.contains("gallery-caption")||r.matches(t,"figcaption"))}function F(e){if(window.CSS&&window.CSS.supports&&window.CSS.supports("display","grid")){var t,o=e.target,a=r.closest(o,c);if(a){if(!(t=a)||!t.getAttribute("data-carousel-extra"))return;if(!M(o))return;document.documentElement.style.height="auto",e.preventDefault(),e.stopPropagation();var i=r.closest(o,d),n=Array.prototype.indexOf.call(a.querySelectorAll(d),i);_(a,{startIndex:n})}}}document.body.addEventListener("click",I),document.body.addEventListener("keydown",I),document.querySelectorAll(u+"img").forEach((function(e){M(e)&&y(e)})),1===Number(jetpackCarouselStrings.single_image_gallery)&&(b(),document.body.addEventListener("is.post-load",(function(){b()}))),window.addEventListener("hashchange",(function(){var t=/jp-carousel-(\d+)/;if(window.location.hash&&t.test(window.location.hash)){if(window.location.hash!==l||!p.isOpen)if(window.location.hash&&p.gallery&&!p.isOpen&&history.back)history.back();else{l=window.location.hash;for(var r,o,a=window.location.hash.match(t),i=parseInt(a[1],10),n=document.querySelectorAll(c),s=0;s<n.length;s++){for(var u,d=n[s],m=d.querySelectorAll("img"),g=0;g<m.length;g++)if(parseInt(m[g].getAttribute("data-attachment-id"),10)===i||parseInt(m[g].getAttribute("data-id"),10)===i){u=g;break}if(void 0!==u){r=d,o=u,p.isOpen?(S(o),e.slideTo(o+1)):_(r,{startIndex:o});break}}}}else p.isOpen&&L()})),window.location.hash&&r.emitEvent(window,"hashchange")}"loading"!==document.readyState?o():document.addEventListener("DOMContentLoaded",o)}();;
  /**
   * Comment Likes - JavaScript
   *
   * This handles liking and unliking comments, as well as viewing who has
   * liked a particular comment.
   *
   * @dependency  Swipe (dynamically loaded when needed)
   *
   * @package     Comment_Likes
   * @subpackage  JavaScript
   */
  (function () {
      function init() {
          let extWin;
          let extWinCheck;
          let commentLikeEvent;
  
          // Only run once.
          if (window.comment_likes_loaded) {
              return;
          }
          window.comment_likes_loaded = true;
  
          // Client-side cache of who liked a particular comment to avoid
          // having to hit the server multiple times for the same data.
          const commentLikeCache = {};
  
          let swipeLibPromise;
  
          // Load the Swipe library, if it's not already loaded.
          function swipeLibLoader() {
              if (!swipeLibPromise) {
                  swipeLibPromise = new Promise((resolve, reject) => {
                      if (window.Swipe) {
                          resolve(window.Swipe);
                      } else {
                          const swipeScript = document.createElement('script');
                          swipeScript.src = comment_like_text.swipeUrl;
                          swipeScript.async = true;
                          document.body.appendChild(swipeScript);
                          swipeScript.addEventListener('load', () => resolve(window.Swipe));
                          swipeScript.addEventListener('error', error => reject(error));
                      }
                  });
              }
              return swipeLibPromise;
          }
  
          /**
           * Parse the comment ID from a comment like link.
           */
          function getCommentId(link) {
              const commentId =
                  link && link.getAttribute('href') && link.getAttribute('href').split('like_comment=');
              return commentId[1].split('&_wpnonce=')[0];
          }
  
          /**
           * Handle an ajax action on the comment like link.
           */
          function handleLinkAction(link, action, commentId, callback) {
              const nonce =
                  link && link.getAttribute('href') && link.getAttribute('href').split('_wpnonce=')[1];
  
              fetch('/wp-admin/admin-ajax.php', {
                  method: 'POST',
                  body: new URLSearchParams({
                      action: action,
                      _wpnonce: nonce,
                      like_comment: commentId,
                      blog_id: Number(link.dataset.blog),
                  }),
                  headers: {
                      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                      'X-Requested-With': 'XMLHttpRequest',
                      Accept: 'application/json',
                      'cache-control': 'no-cache',
                      pragma: 'no-cache',
                  },
              })
                  .then(response => response.json())
                  .then(callback);
          }
  
          function startPolling() {
              // Append cookie polling login iframe to this window to wait for user to finish logging in (or cancel)
              const loginIframe = document.createElement('iframe');
              loginIframe.id = 'wp-login-polling-iframe';
              loginIframe.src = 'https://wordpress.com/public.api/connect/?iframe=true';
              document.body.appendChild(loginIframe);
              loginIframe.style.display = 'none';
          }
  
          function stopPolling() {
              const iframe = document.querySelector('#wp-login-polling-iframe');
              if (iframe) {
                  iframe.remove();
              }
          }
  
          function hide(el) {
              if (el && el.style) {
                  el.style.display = 'none';
              }
          }
  
          function show(el) {
              if (el && el.style) {
                  el.style.removeProperty('display');
              }
          }
  
          // Overlay used for displaying comment like info.
          class Overlay {
              constructor() {
                  // Overlay element.
                  this.el = document.createElement('div');
                  this.el.classList.add('comment-likes-overlay');
                  document.body.appendChild(this.el);
                  hide(this.el);
  
                  this.el.addEventListener('mouseenter', () => {
                      // Don't hide the overlay if the user is mousing over it.
                      overlay.cancelHide();
                  });
  
                  this.el.addEventListener('mouseleave', () => overlay.requestHide());
  
                  // Inner contents of overlay.
                  this.innerEl = null;
  
                  // Instance of the Swipe library.
                  this.swipe = null;
  
                  // Timeout used for hiding the overlay.
                  this.hideTimeout = null;
              }
  
              // Initialise the overlay for use, removing any old content.
              clear() {
                  // Unload any previous instance of Swipe (to avoid leaking a global
                  // event handler). This is done before clearing the contents of the
                  // overlay because Swipe expects the slides to still be present.
                  if (this.swipe) {
                      this.swipe.kill();
                      this.swipe = null;
                  }
                  this.el.innerHTML = '';
                  this.innerEl = document.createElement('div');
                  this.innerEl.classList.add('inner');
                  this.el.appendChild(this.innerEl);
              }
  
              /**
               * Construct a list (<ul>) of user (gravatar, name) details.
               *
               * @param  data     liker data returned from the server
               * @param  klass    CSS class to apply to the <ul> element
               * @param  start    index of user to start at
               * @param  length   number of users to include in the list
               *
               * @return          A container element with the list
               */
              getUserBits(data, klass, start, length) {
                  start = start || 0;
                  let last = start + (length || data.length);
                  last = last > data.length ? data.length : last;
                  const container = document.createElement('div');
                  container.classList.add('liker-list');
                  let html = `<ul class="${klass || ''}">`;
                  for (let i = start; i < last; ++i) {
                      const user = data[i];
                      html += `
                          <li>
                              <a rel="nofollow" title="${user.display_name_esc}" href="${user.profile_url_esc}">
                                  <img src="${user.avatar_url_esc}" alt="${user.display_name_esc}" />
                                  <span class="user-name">${user.display_name_esc}</span>
                              </a>
                          </li>
                      `;
                  }
                  html += '</ul>';
                  container.innerHTML = html;
                  return container;
              }
  
              /**
               * Render the display of who has liked this comment. The type of
               * display depends on how many people have liked the comment.
               * If more than 10 people have liked the comment, this function
               * renders navigation controls and sets up the Swipe library for
               * changing between pages.
               *
               * @param link  the element over which the user is hovering
               * @param data  the results retrieved from the server
               */
              showLikes(link, data) {
                  this.clear();
  
                  link.dataset.likeCount = data.length;
                  if (data.length === 0) {
                      // No likers after all.
                      hide(this.el);
                      return;
                  }
  
                  this.innerEl.style.padding = '12px';
  
                  if (data.length < 6) {
                      // Only one column needed.
                      this.innerEl.style.maxWidth = '200px';
                      this.innerEl.innerHTML = '';
                      this.innerEl.appendChild(this.getUserBits(data, 'single'));
                      this.setPosition(link);
                  } else if (data.length < 11) {
                      // Two columns, but only one page.
                      this.innerEl.innerHTML = '';
                      this.innerEl.appendChild(this.getUserBits(data, 'double'));
                      this.setPosition(link);
                  } else {
                      // Multiple pages.
                      this.renderLikesWithPagination(data, link);
                  }
              }
  
              /**
               * Render multiple pages of likes with pagination controls.
               * This function is intended to be called by `showLikes` above.
               *
               * @param data  the results retrieved from the server
               */
              renderLikesWithPagination(data, link) {
                  swipeLibLoader().then(() => {
                      const page_count = Math.ceil(data.length / 10);
                      // Swipe requires two nested containers.
                      const swipe = document.createElement('div');
                      swipe.classList.add('swipe');
                      this.innerEl.appendChild(swipe);
  
                      const wrap = document.createElement('div');
                      wrap.classList.add('swipe-wrap');
                      swipe.appendChild(wrap);
  
                      for (let i = 0; i < page_count; ++i) {
                          wrap.appendChild(this.getUserBits(data, 'double', i * 10, 10));
                      }
  
                      /**
                       * Navigation controls.
                       * This is based on the Newdash controls found in
                       *    reader/recommendations-templates.php
                       */
                      const nav = document.createElement('nav');
                      nav.classList.add('slider-nav');
  
                      let navContents = `
                          <a href="#" class="prev">
                              <span class="noticon noticon-previous" title="Previous" alt="<"></span>
                          </a>
                          <span class="position">
                      `;
                      for (let i = 0; i < page_count; ++i) {
                          navContents += `<em data-page="${i}" class="${i === 0 ? 'on' : ''}">&bull;</em>`;
                      }
                      navContents += `
                          </span>
                          <a href="#" class="next">
                              <span class="noticon noticon-next" title="Next" alt=">"></span>
                          </a>
                      `;
                      this.innerEl.appendChild(nav);
                      nav.innerHTML = navContents;
  
                      /** Set up Swipe. **/
                      // Swipe cannot be set up successfully unless its container
                      // is visible, so we show it now.
                      show(this.el);
                      this.setPosition(link);
  
                      this.swipe = new Swipe(swipe, {
                          callback: function (pos) {
                              // Update the pagination indicators.
                              //
                              // If there are exactly two pages, Swipe has a weird
                              // special case where it duplicates both pages and
                              // can return index 2 and 3 even though those aren't
                              // real pages (see swipe.js, line 47). To deal with
                              // this, we use the expression `pos % page_count`.
                              pos = pos % page_count;
                              nav.querySelectorAll('em').forEach(em => {
                                  const page = Number(em.dataset.page);
                                  em.setAttribute('class', pos === page ? 'on' : '');
                              });
                          },
                      });
  
                      nav.querySelectorAll('em').forEach(em => {
                          em.addEventListener('click', e => {
                              // Go to the page corresponding to the indicator clicked.
                              this.swipe.slide(Number(em.dataset.page));
                              e.preventDefault();
                          });
                      });
                      // Previous and next buttons.
                      nav.querySelector('.prev').addEventListener('click', e => {
                          this.swipe.prev();
                          e.preventDefault();
                      });
                      nav.querySelector('.next').addEventListener('click', e => {
                          this.swipe.next();
                          e.preventDefault();
                      });
                  });
              }
  
              /**
               * Open the overlay and show a loading message.
               */
              showLoadingMessage(link) {
                  this.clear();
                  this.innerEl.textContent = comment_like_text.loading;
                  this.setPosition(link);
              }
  
              /**
               * Position the overlay near the current comment.
               *
               * @param link  element near which to position the overlay
               */
              setPosition(link) {
                  // Prepare a down arrow icon for the bottom of the overlay.
                  const icon = document.createElement('span');
                  this.el.appendChild(icon);
                  icon.classList.add('icon', 'noticon', 'noticon-downarrow');
                  icon.style.textShadow = '0px 1px 1px rgb(223, 223, 223)';
  
                  const rect = link.getBoundingClientRect();
                  const win = document.defaultView;
                  const offset = {
                      top: rect.top + win.scrollY,
                      left: rect.left + win.scrollX,
                  };
  
                  // Take measurements with the element fully visible.
                  show(this.el);
                  let left = offset.left - (this.el.offsetWidth - link.offsetWidth) / 2;
                  left = left < 5 ? 5 : left;
                  let top = offset.top - this.el.offsetHeight + 5;
                  hide(this.el);
  
                  const adminBar = document.querySelector('#wpadminbar');
  
                  // Check if the overlay would appear off the screen.
                  if (top < win.scrollY + ((adminBar && adminBar.offsetHeight) || 0)) {
                      // We'll display the overlay beneath the link instead.
                      top = offset.top + link.offsetHeight;
                      // Instead of using the down arrow icon, use an up arrow.
                      icon.remove();
                      this.el.prepend(icon);
                      icon.classList.remove('noticon-downarrow');
                      icon.classList.add('noticon-uparrow');
                      icon.style.textShadow = '0px -1px 1px rgb(223, 223, 223)';
                      icon.style.verticalAlign = 'bottom';
                  }
  
                  this.el.style.left = `${left}px`;
                  this.el.style.top = `${top}px`;
                  show(this.el);
  
                  // The height of the arrow icon differs slightly between browsers,
                  // so we compute the margin here to make sure it isn't disjointed
                  // from the overlay.
                  icon.style.marginTop = `${icon.scrollHeight - 26}px`;
                  icon.style.marginBottom = `${20 - icon.scrollHeight}px`;
  
                  // Position the arrow to be horizontally centred on the link.
                  icon.style.paddingLeft = `${
                      offset.left - left + (link.offsetWidth - icon.scrollWidth) / 2
                  }px`;
              }
  
              /**
               * Return whether the overlay is visible.
               */
              isVisible() {
                  return this.el.style.getPropertyValue('display') !== 'none';
              }
  
              /**
               * Request that the overlay be hidden after a short delay.
               */
              requestHide() {
                  if (this.hideTimeout !== null) {
                      return;
                  }
                  this.hideTimeout = setTimeout(() => {
                      hide(this.el);
                      this.clear();
                  }, 300);
              }
  
              /**
               * Cancel a request to hide the overlay.
               */
              cancelHide() {
                  if (this.hideTimeout !== null) {
                      clearTimeout(this.hideTimeout);
                      this.hideTimeout = null;
                  }
              }
          }
  
          // Overlay used for displaying comment like info.
          const overlay = new Overlay();
  
          // The most recent comment for which the user has requested to see
          // who liked it.
          var relevantComment;
  
          // Precache after this timeout.
          var precacheTimeout = null;
  
          /**
           * Fetch the like data for a particular comment.
           */
          function fetchLikeData(link, commentId) {
              commentLikeCache[commentId] = null;
  
              const container = link && link.parentElement && link.parentElement.parentElement;
              const star = container.querySelector('a.comment-like-link');
              star &&
                  handleLinkAction(star, 'view_comment_likes', commentId, data => {
                      // Populate the cache.
                      commentLikeCache[commentId] = data;
  
                      // Only show the overlay if the user is interested.
                      if (overlay.isVisible() && relevantComment === commentId) {
                          overlay.showLikes(link, data);
                      }
                  });
          }
  
          function readCookie(c) {
              const nameEQ = c + '=';
              const cookieStrings = document.cookie.split(';');
  
              for (let i = 0; i < cookieStrings.length; i++) {
                  let cookieString = cookieStrings[i];
                  while (cookieString.charAt(0) === ' ') {
                      cookieString = cookieString.substring(1, cookieString.length);
                  }
                  if (cookieString.indexOf(nameEQ) === 0) {
                      const chunk = cookieString.substring(nameEQ.length, cookieString.length);
                      const pairs = chunk.split('&');
                      const cookieData = {};
                      for (let num = pairs.length - 1; num >= 0; num--) {
                          const pair = pairs[num].split('=');
                          cookieData[pair[0]] = decodeURIComponent(pair[1]);
                      }
                      return cookieData;
                  }
              }
              return null;
          }
  
          function getServiceData() {
              const data = readCookie('wpc_wpc');
              if (data === null || typeof data.access_token === 'undefined' || !data.access_token) {
                  return false;
              }
              return data;
          }
  
          function readMessage(msg) {
              const event = msg.data;
  
              if (typeof event.event === 'undefined') {
                  return;
              }
  
              if (event.event === 'login' && event.success) {
                  extWinCheck = setInterval(function () {
                      if (!extWin || extWin.closed) {
                          clearInterval(extWinCheck);
                          if (getServiceData()) {
                              // Load page in an iframe to get the current comment nonce
                              const nonceIframe = document.createElement('iframe');
                              nonceIframe.id = 'wp-login-comment-nonce-iframe';
                              nonceIframe.style.display = 'none';
                              nonceIframe.src = commentLikeEvent + '';
                              document.body.appendChild(nonceIframe);
  
                              const commentLikeId = (commentLikeEvent + '')
                                  .split('like_comment=')[1]
                                  .split('&_wpnonce=')[0];
                              let c;
  
                              // Set a 5 second timeout to redirect to the comment page without doing the Like as a fallback
                              const commentLikeTimeout = setTimeout(() => {
                                  window.location = commentLikeEvent;
                              }, 5000);
  
                              // Check for a new nonced redirect and use that if available before timing out
                              const commentLikeCheck = setInterval(() => {
                                  const iframe = document.querySelector('#wp-login-comment-nonce-iframe');
                                  if (iframe) {
                                      c = iframe.querySelector(`#comment-like-${commentLikeId} .comment-like-link`);
                                  }
                                  if (c && typeof c.href !== 'undefined') {
                                      clearTimeout(commentLikeTimeout);
                                      clearInterval(commentLikeCheck);
                                      window.location = c.href;
                                  }
                              }, 100);
                          }
                      }
                  }, 100);
  
                  if (extWin) {
                      if (!extWin.closed) {
                          extWin.close();
                      }
                      extWin = false;
                  }
  
                  stopPolling();
              }
          }
  
          if (typeof window.postMessage !== 'undefined') {
              window.addEventListener('message', e => {
                  let message = e && e.data;
                  if (typeof message === 'string') {
                      try {
                          message = JSON.parse(message);
                      } catch (err) {
                          return;
                      }
                  }
  
                  const type = message && message.type;
                  if (type === 'loginMessage') {
                      readMessage(message);
                  }
              });
          }
  
          document.body.addEventListener('click', e => {
              let target = e.target;
  
              // Don't do anything when clicking on the "X people" link.
              if (target.matches('p.comment-likes a.view-likers')) {
                  e.preventDefault();
                  return;
              }
  
              // Retrieve the surrounding paragraph to the star, if it hasn't been liked.
              const notLikedPar = target.closest('p.comment-not-liked');
  
              // Return if not clicking on star or surrounding paragraph.
              if (!target.matches('a.comment-like-link') && !notLikedPar) {
                  return;
              }
  
              // When a comment hasn't been liked, make the text clickable, too.
              if (notLikedPar) {
                  target = notLikedPar.querySelector('a.comment-like-link');
                  if (!target) {
                      return;
                  }
              }
  
              if (target.classList.contains('needs-login')) {
                  e.preventDefault();
                  commentLikeEvent = target;
                  if (extWin) {
                      if (!extWin.closed) {
                          extWin.close();
                      }
                      extWin = false;
                  }
  
                  stopPolling();
  
                  const url = 'https://wordpress.com/public.api/connect/?action=request&service=wordpress';
                  extWin = window.open(
                      url,
                      'likeconn',
                      'status=0,toolbar=0,location=1,menubar=0,directories=0,resizable=1,scrollbars=1,height=560,width=500'
                  );
  
                  startPolling();
  
                  return false;
              }
  
              // Record that the user likes or does not like this comment.
              const commentId = getCommentId(target);
              target.classList.add('loading');
  
              let commentEl = document.querySelector(`p#comment-like-${commentId}`);
              // Determine whether to like or unlike based on whether the comment is
              // currently liked.
              const action =
                  commentEl && commentEl.dataset.liked === 'comment-liked'
                      ? 'unlike_comment'
                      : 'like_comment';
              handleLinkAction(target, action, commentId, data => {
                  // Invalidate the like cache for this comment.
                  delete commentLikeCache[commentId];
  
                  const countEl = document.querySelector(`#comment-like-count-${data.context}`);
                  if (countEl) {
                      countEl.innerHTML = data.display;
                  }
  
                  commentEl = document.querySelector(`p#comment-like-${data.context}`);
                  if (action === 'like_comment') {
                      commentEl.classList.remove('comment-not-liked');
                      commentEl.classList.add('comment-liked');
                      commentEl.dataset.liked = 'comment-liked';
                  } else {
                      commentEl.classList.remove('comment-liked');
                      commentEl.classList.add('comment-not-liked');
                      commentEl.dataset.liked = 'comment-not-liked';
                  }
  
                  // Prefetch new data for this comment (if there are likers left).
                  const parent = target.closest('.comment-likes');
                  const link = parent && parent.querySelector('a.view-likers');
                  if (link) {
                      fetchLikeData(link, commentId);
                  }
  
                  target.classList.remove('loading');
              });
              e.preventDefault();
              e.stopPropagation();
          });
  
          document.body.addEventListener(
              'mouseenter',
              function (e) {
                  if (!e.target.matches('p.comment-likes a.view-likers')) {
                      return;
                  }
                  // Show the user a list of who has liked this comment.
  
                  const link = e.target;
                  if (Number(link.dataset.likeCount || 0) === 0) {
                      // No one has liked this comment.
                      return;
                  }
  
                  // Don't hide the overlay.
                  overlay.cancelHide();
  
                  // Get the comment ID.
                  const container = link.parentElement && link.parentElement.parentElement;
                  const star = container && container.querySelector('a.comment-like-link');
                  const commentId = star && getCommentId(star);
                  relevantComment = commentId;
  
                  // Check if the list of likes for this comment is already in
                  // the cache.
                  if (commentId in commentLikeCache) {
                      const entry = commentLikeCache[commentId];
                      // Only display the likes if the ajax request is
                      // actually done.
                      if (entry !== null) {
                          overlay.showLikes(link, entry);
                      } else {
                          // Make sure the overlay is visible (in case
                          // the user moved the mouse away while loading
                          // but then came back before it finished
                          // loading).
                          overlay.showLoadingMessage(link);
                      }
                      return;
                  }
  
                  // Position the "Loading..." overlay.
                  overlay.showLoadingMessage(link);
  
                  // Fetch the data.
                  fetchLikeData(link, commentId);
              },
              true
          );
  
          document.body.addEventListener(
              'mouseleave',
              e => {
                  if (!e.target.matches('p.comment-likes a.view-likers')) {
                      return;
                  }
                  // User has moved cursor away - hide the overlay.
                  overlay.requestHide();
              },
              true
          );
  
          document.body.addEventListener(
              'mouseenter',
              e => {
                  if (!e.target.matches('.comment') || !e.target.querySelector('a.comment-like-link')) {
                      return;
                  }
                  // User is moving over a comment - precache the comment like data.
                  if (precacheTimeout !== null) {
                      clearTimeout(precacheTimeout);
                      precacheTimeout = null;
                  }
  
                  const star = e.target.querySelector('a.comment-like-link');
                  const parent = star.closest('.comment-likes');
                  const link = parent && parent.querySelector('a.view-likers');
                  if (!link || Number(link.dataset.likeCount || 0) === 0) {
                      // No likes.
                      return;
                  }
                  const commentId = getCommentId(star);
                  if (commentId in commentLikeCache) {
                      // Already in cache.
                      return;
                  }
  
                  precacheTimeout = setTimeout(() => {
                      precacheTimeout = null;
                      if (commentId in commentLikeCache) {
                          // Was cached in the interim.
                          return;
                      }
                      fetchLikeData(link, commentId);
                  }, 1000);
              },
              true
          );
      }
  
      if (document.readyState !== 'loading') {
          init();
      } else {
          document.addEventListener('DOMContentLoaded', init);
      }
  })();
  ;
  ( function () {
      'use strict';
  
      if ( typeof window.wpcom === 'undefined' ) {
          window.wpcom = {};
      }
  
      if ( window.wpcom.carousel ) {
          return;
      }
  
      var prebuilt_widths = jetpackCarouselStrings.widths;
      var pageviews_stats_args = jetpackCarouselStrings.stats_query_args;
  
      var findFirstLargeEnoughWidth = function ( original_w, original_h, dest_w, dest_h ) {
          var inverse_ratio = original_h / original_w;
  
          for ( var i = 0; i < prebuilt_widths.length; ++i ) {
              if ( prebuilt_widths[ i ] >= dest_w || prebuilt_widths[ i ] * inverse_ratio >= dest_h ) {
                  return prebuilt_widths[ i ];
              }
          }
  
          return original_w;
      };
  
      var removeResizeFromImageURL = function ( url ) {
          return removeArgFromURL( url, 'resize' );
      };
  
      var removeArgFromURL = function ( url, arg ) {
          var re = new RegExp( '[\\?&]' + arg + '(=[^?&]+)?' );
          if ( url.match( re ) ) {
              return url.replace( re, '' );
          }
          return url;
      };
  
      var addWidthToImageURL = function ( url, width ) {
          width = parseInt( width, 10 );
          // Give devices with a higher devicePixelRatio higher-res images (Retina display = 2, Android phones = 1.5, etc)
          if ( 'undefined' !== typeof window.devicePixelRatio && window.devicePixelRatio > 1 ) {
              width = Math.round( width * window.devicePixelRatio );
          }
          url = addArgToURL( url, 'w', width );
          url = addArgToURL( url, 'h', '' );
          return url;
      };
  
      var addArgToURL = function ( url, arg, value ) {
          var re = new RegExp( arg + '=[^?&]+' );
          if ( url.match( re ) ) {
              return url.replace( re, arg + '=' + value );
          } else {
              var divider = url.indexOf( '?' ) !== -1 ? '&' : '?';
              return url + divider + arg + '=' + value;
          }
      };
  
      var stat = function ( names ) {
          if ( typeof names !== 'string' ) {
              names = names.join( ',' );
          }
  
          new Image().src = window.location.protocol +
              '//pixel.wp.com/g.gif?v=wpcom-no-pv' +
              '&x_carousel=' + names +
              '&baba=' + Math.random();
      };
  
      var pageview = function ( post_id ) {
          new Image().src = window.location.protocol +
              '//pixel.wp.com/g.gif?host=' + encodeURIComponent( window.location.host ) +
              '&ref=' + encodeURIComponent( document.referrer ) +
              '&rand=' + Math.random() +
              '&' + pageviews_stats_args +
              '&post=' + encodeURIComponent( post_id );
      };
  
      var generateImgSrc = function ( srcItem, max ) {
          var origSize = srcItem.getAttribute( 'data-orig-size' ) || '';
  
          var src = srcItem.getAttribute( 'src' ) || srcItem.getAttribute( 'original' ) || srcItem.getAttribute( 'data-original' ) || srcItem.getAttribute( 'data-lazy-src' );
          if ( src.indexOf( 'imgpress' ) !== -1 ) {
              src = srcItem.getAttribute( 'data-orig-file' );
          }
          // Square/Circle galleries use a resize param that needs to be removed.
          src = removeResizeFromImageURL( src );
          src = addWidthToImageURL(
              src,
              findFirstLargeEnoughWidth( origSize.width, origSize.height, max.width, max.height )
          );
  
          return src;
      };
  
      window.wpcom.carousel = {
          findFirstLargeEnoughWidth: findFirstLargeEnoughWidth,
          removeResizeFromImageURL: removeResizeFromImageURL,
          addWidthToImageURL: addWidthToImageURL,
          stat: stat,
          pageview: pageview,
          generateImgSrc: generateImgSrc
      };
  
  } )();
  ;