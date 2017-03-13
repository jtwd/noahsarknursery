var jsDebug = true;
var curYear;
var navToggle = document.getElementById('btn-nav-toggle');
var subNavToggle = document.getElementById('sub-nav-toggle');
var yearCopy = document.getElementById('year-copyright');
var body = document.body;
var llImgs = document.querySelectorAll('[data-src]');
var slides = document.querySelectorAll('.Hero-img img')
var slideInterval;
var slideTotal = slides.length;
var currentSlide = 0;


function hasClass(el, className) {
  return el.classList ? el.classList.contains(className) : new RegExp('\\b'+ className+'\\b').test(el.className);
}

function addClass(el, className) {
  if (el.classList) el.classList.add(className);
  else if (!hasClass(el, className)) el.className += ' ' + className;
}

function removeClass(el, className) {
  if (el.classList) el.classList.remove(className);
  else el.className = el.className.replace(new RegExp('\\b'+ className+'\\b', 'g'), '');
}

function getTargetNode(target) {
  if (target.id === 'sub-nav-toggle' || target.id === 'btn-nav-toggle') {
    return target;
  } else {
    if (target.parentNode.id === 'sub-nav-toggle' || target.parentNode.id === 'btn-nav-toggle') {
      return target.parentNode;
    } else {
      return false;
    }
  }
}

function toggleNavMenu(e) {
  var target = getTargetNode(e.target);
  var className = 'menu-is-open';

  e.preventDefault();

  if (!target) {
    log('Can not find menu toggler', 'error');
    return false;
  }

  if (target.id === 'sub-nav-toggle') {
    className = 'Nav-sub-is-open';
  }

  if (!hasClass(body, className)) {
    addClass(body, className);
  } else {
    removeClass(body, className);
  }

}

function log(msg, type) {
  if(console && jsDebug) {
    if (type && type !== 'log') {
      if(type === 'error') {
        console.error(msg);
      }
      if(type === 'warning') {
        console.warning(msg);
      }
    } else {
      console.log(msg);
    }
  }
}

function enableToggle(toggler) {
  toggler.addEventListener('click', toggleNavMenu);
  log(toggler.className + ' - toggle enabled');
}

if (navToggle) {
  enableToggle(navToggle);
}

if (subNavToggle) {
  enableToggle(subNavToggle);
}

if (yearCopy) {
  curYear =  new Date().getFullYear();
  yearCopy.innerHTML = curYear;
  log('Copyright year updated');
}

for (var i = 0, x = llImgs.length; i < x; i++) {
  llImgs[i].setAttribute('src', llImgs[i].getAttribute('data-src'));
}

if (document.querySelector('.Hero-img')) {
  if (document.querySelector('.Hero-img').getAttribute('data-module') === 'js-slider') {
    slideInterval = setInterval(nextSlide, 4000);
  }
}


function nextSlide() {
  slides[currentSlide].classList.remove('showing');
  currentSlide = (currentSlide+1)%slideTotal;
  slides[currentSlide].classList.add('showing');
}

function _classCallCheck(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}var Sticky=function(){function t(){var i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};_classCallCheck(this,t),this.selector=i,this.elements=[],this.version="1.1.4",this.vp=this.getViewportSize(),this.scrollTop=this.getScrollTopPosition(),this.options={marginTop:e.marginTop||0,stickyFor:e.stickFor||0,stickyClass:e.stickyClass||null},this.run()}return t.prototype.run=function(){var t=this,i=setInterval(function(){if("complete"===document.readyState){clearInterval(i);var e=document.querySelectorAll(t.selector);t.forEach(e,function(i){return t.renderElement(i)})}},10)},t.prototype.renderElement=function(t){var i=this;t.sticky={},t.sticky.active=!1,t.sticky.marginTop=parseInt(t.getAttribute("data-margin-top"))||this.options.marginTop,t.sticky.stickyFor=parseInt(t.getAttribute("data-sticky-for"))||this.options.stickyFor,t.sticky.stickyClass=t.getAttribute("data-sticky-class")||this.options.stickyClass,t.sticky.container=this.getStickyContainer(t),t.sticky.container.rect=this.getRectangle(t.sticky.container),t.sticky.rect=this.getRectangle(t),"img"===t.tagName.toLowerCase&&(t.onload=function(){return t.sticky.rect=i.getRectangle(t)}),this.activate(t)},t.prototype.activate=function(t){var i=t.sticky.container.offsetHeight;this.css(t,{position:"fixed"});var e=t.sticky.container.offsetHeight;this.css(t,{position:""}),e>=i&&t.sticky.stickyFor<this.vp.width&&!t.sticky.active&&(t.sticky.active=!0),this.elements.indexOf(t)<0&&this.elements.push(t),t.sticky.resizeEvent||(this.initResizeEvents(t),t.sticky.resizeEvent=!0),t.sticky.scrollEvent||(this.initScrollEvents(t),t.sticky.scrollEvent=!0)},t.prototype.initResizeEvents=function(t){var i=this;t.sticky.resizeListener=function(){return i.onResizeEvents(t)},window.addEventListener("resize",t.sticky.resizeListener)},t.prototype.onResizeEvents=function(t){this.vp=this.getViewportSize(),t.sticky.rect=this.getRectangle(t),t.sticky.container.rect=this.getRectangle(t.sticky.container),t.sticky.stickyFor<this.vp.width&&!t.sticky.active?t.sticky.active=!0:t.sticky.stickyFor>=this.vp.width&&t.sticky.active&&(t.sticky.active=!1),this.setPosition(t)},t.prototype.initScrollEvents=function(t){var i=this;t.sticky.scrollListener=function(){return i.onScrollEvents(t)},window.addEventListener("scroll",t.sticky.scrollListener)},t.prototype.onScrollEvents=function(t){this.scrollTop=this.getScrollTopPosition(),t.sticky.active&&this.setPosition(t)},t.prototype.setPosition=function(t){this.css(t,{position:"",width:"",top:"",left:""}),this.vp.height<t.sticky.rect.height||!t.sticky.active||(t.sticky.rect.width||(t.sticky.rect=this.getRectangle(t)),this.scrollTop>t.sticky.rect.top-t.sticky.marginTop?(this.css(t,{position:"fixed",width:t.sticky.rect.width+"px",left:t.sticky.rect.left+"px"}),this.scrollTop+t.sticky.rect.height+t.sticky.marginTop>t.sticky.container.rect.top+t.sticky.container.offsetHeight?(t.sticky.stickyClass&&t.classList.remove(t.sticky.stickyClass),this.css(t,{top:t.sticky.container.rect.top+t.sticky.container.offsetHeight-(this.scrollTop+t.sticky.rect.height)+"px"})):(t.sticky.stickyClass&&t.classList.add(t.sticky.stickyClass),this.css(t,{top:t.sticky.marginTop+"px"}))):(t.sticky.stickyClass&&t.classList.remove(t.sticky.stickyClass),this.css(t,{position:"",width:"",top:"",left:""})))},t.prototype.update=function(){var t=this;this.forEach(this.elements,function(i){i.sticky.rect=t.getRectangle(i),i.sticky.container.rect=t.getRectangle(i.sticky.container),t.activate(i),t.setPosition(i)})},t.prototype.getStickyContainer=function(t){for(var i=t;!i.hasAttribute("data-sticky-container")&&i!==document.querySelector("body");)i=i.parentNode;return i},t.prototype.getRectangle=function(t){this.css(t,{position:"",width:"",top:"",left:""});var i=Math.max(t.offsetWidth,t.clientWidth,t.scrollWidth),e=Math.max(t.offsetHeight,t.clientHeight,t.scrollHeight),s=0,o=0;do s+=t.offsetTop||0,o+=t.offsetLeft||0,t=t.offsetParent;while(t);return{top:s,left:o,width:i,height:e}},t.prototype.getViewportSize=function(){return{width:Math.max(document.documentElement.clientWidth,window.innerWidth||0),height:Math.max(document.documentElement.clientHeight,window.innerHeight||0)}},t.prototype.getScrollTopPosition=function(){return(window.pageYOffset||document.scrollTop)-(document.clientTop||0)||0},t.prototype.forEach=function(t,i){for(var e=0,s=t.length;e<s;e++)i(t[e])},t.prototype.css=function(t,i){for(var e in i)i.hasOwnProperty(e)&&(t.style[e]=i[e])},t}();!function(t,i){"undefined"!=typeof exports?module.exports=i:"function"==typeof define&&define.amd?define([],i):t.Sticky=i}(this,Sticky);


if (Math.max(document.documentElement.clientWidth, window.innerWidth || 0) > 959) {
  var sticky = new Sticky('.sticky');
}

console.log('app1.js has loaded!');
