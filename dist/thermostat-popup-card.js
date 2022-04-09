/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,e=Symbol(),n=new Map;class s{constructor(t,n){if(this._$cssResult$=!0,n!==e)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t;}get styleSheet(){let e=n.get(this.cssText);return t&&void 0===e&&(n.set(this.cssText,e=new CSSStyleSheet),e.replaceSync(this.cssText)),e}toString(){return this.cssText}}const o=t=>new s("string"==typeof t?t:t+"",e),r=(t,...n)=>{const o=1===t.length?t[0]:n.reduce(((e,n,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+t[s+1]),t[0]);return new s(o,e)},i=(e,n)=>{t?e.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((t=>{const n=document.createElement("style"),s=window.litNonce;void 0!==s&&n.setAttribute("nonce",s),n.textContent=t.cssText,e.appendChild(n);}));},S=t?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const n of t.cssRules)e+=n.cssText;return o(e)})(t):t;//# sourceMappingURL=css-tag.js.map

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var s$1;const e$1=window.trustedTypes,r$1=e$1?e$1.emptyScript:"",h=window.reactiveElementPolyfillSupport,o$1={toAttribute(t,i){switch(i){case Boolean:t=t?r$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t);}catch(t){s=null;}}return s}},n$1=(t,i)=>i!==t&&(i==i||t==t),l={attribute:!0,type:String,converter:o$1,reflect:!1,hasChanged:n$1};class a extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o();}static addInitializer(t){var i;null!==(i=this.l)&&void 0!==i||(this.l=[]),this.l.push(t);}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this._$Eh(s,i);void 0!==e&&(this._$Eu.set(e,s),t.push(e));})),t}static createProperty(t,i=l){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e);}}static getPropertyDescriptor(t,i,s){return {get(){return this[i]},set(e){const r=this[t];this[i]=e,this.requestUpdate(t,r,s);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||l}static finalize(){if(this.hasOwnProperty("finalized"))return !1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s]);}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift(S(i));}else void 0!==i&&s.push(S(i));return s}static _$Eh(t,i){const s=i.attribute;return !1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ep=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Em(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)));}addController(t){var i,s;(null!==(i=this._$Eg)&&void 0!==i?i:this._$Eg=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t));}removeController(t){var i;null===(i=this._$Eg)||void 0===i||i.splice(this._$Eg.indexOf(t)>>>0,1);}_$Em(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Et.set(i,this[i]),delete this[i]);}));}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return i(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}));}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}));}attributeChangedCallback(t,i,s){this._$AK(t,s);}_$ES(t,i,s=l){var e,r;const h=this.constructor._$Eh(t,s);if(void 0!==h&&!0===s.reflect){const n=(null!==(r=null===(e=s.converter)||void 0===e?void 0:e.toAttribute)&&void 0!==r?r:o$1.toAttribute)(i,s.type);this._$Ei=t,null==n?this.removeAttribute(h):this.setAttribute(h,n),this._$Ei=null;}}_$AK(t,i){var s,e,r;const h=this.constructor,n=h._$Eu.get(t);if(void 0!==n&&this._$Ei!==n){const t=h.getPropertyOptions(n),l=t.converter,a=null!==(r=null!==(e=null===(s=l)||void 0===s?void 0:s.fromAttribute)&&void 0!==e?e:"function"==typeof l?l:null)&&void 0!==r?r:o$1.fromAttribute;this._$Ei=n,this[n]=a(i,t.type),this._$Ei=null;}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||n$1)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===s.reflect&&this._$Ei!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this._$Ep=this._$E_());}async _$E_(){this.isUpdatePending=!0;try{await this._$Ep;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,i)=>this[i]=t)),this._$Et=void 0);let i=!1;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this._$EU();}catch(t){throw i=!1,this._$EU(),t}i&&this._$AE(s);}willUpdate(t){}_$AE(t){var i;null===(i=this._$Eg)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$EU(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(t){return !0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,i)=>this._$ES(i,this[i],t))),this._$EC=void 0),this._$EU();}updated(t){}firstUpdated(t){}}a.finalized=!0,a.elementProperties=new Map,a.elementStyles=[],a.shadowRootOptions={mode:"open"},null==h||h({ReactiveElement:a}),(null!==(s$1=globalThis.reactiveElementVersions)&&void 0!==s$1?s$1:globalThis.reactiveElementVersions=[]).push("1.3.1");//# sourceMappingURL=reactive-element.js.map

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$1;const i$1=globalThis.trustedTypes,s$2=i$1?i$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,e$2=`lit$${(Math.random()+"").slice(9)}$`,o$2="?"+e$2,n$2=`<${o$2}>`,l$1=document,h$1=(t="")=>l$1.createComment(t),r$2=t=>null===t||"object"!=typeof t&&"function"!=typeof t,d=Array.isArray,u=t=>{var i;return d(t)||"function"==typeof(null===(i=t)||void 0===i?void 0:i[Symbol.iterator])},c=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v=/-->/g,a$1=/>/g,f=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,_=/'/g,m=/"/g,g=/^(?:script|style|textarea|title)$/i,p=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),$=p(1),y=p(2),b=Symbol.for("lit-noChange"),w=Symbol.for("lit-nothing"),T=new WeakMap,x=(t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new N(i.insertBefore(h$1(),t),t,void 0,null!=s?s:{});}return l._$AI(t),l},A=l$1.createTreeWalker(l$1,129,null,!1),C=(t,i)=>{const o=t.length-1,l=[];let h,r=2===i?"<svg>":"",d=c;for(let i=0;i<o;i++){const s=t[i];let o,u,p=-1,$=0;for(;$<s.length&&(d.lastIndex=$,u=d.exec(s),null!==u);)$=d.lastIndex,d===c?"!--"===u[1]?d=v:void 0!==u[1]?d=a$1:void 0!==u[2]?(g.test(u[2])&&(h=RegExp("</"+u[2],"g")),d=f):void 0!==u[3]&&(d=f):d===f?">"===u[0]?(d=null!=h?h:c,p=-1):void 0===u[1]?p=-2:(p=d.lastIndex-u[2].length,o=u[1],d=void 0===u[3]?f:'"'===u[3]?m:_):d===m||d===_?d=f:d===v||d===a$1?d=c:(d=f,h=void 0);const y=d===f&&t[i+1].startsWith("/>")?" ":"";r+=d===c?s+n$2:p>=0?(l.push(o),s.slice(0,p)+"$lit$"+s.slice(p)+e$2+y):s+e$2+(-2===p?(l.push(void 0),i):y);}const u=r+(t[o]||"<?>")+(2===i?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return [void 0!==s$2?s$2.createHTML(u):u,l]};class E{constructor({strings:t,_$litType$:s},n){let l;this.parts=[];let r=0,d=0;const u=t.length-1,c=this.parts,[v,a]=C(t,s);if(this.el=E.createElement(v,n),A.currentNode=this.el.content,2===s){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(l=A.nextNode())&&c.length<u;){if(1===l.nodeType){if(l.hasAttributes()){const t=[];for(const i of l.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(e$2)){const s=a[d++];if(t.push(i),void 0!==s){const t=l.getAttribute(s.toLowerCase()+"$lit$").split(e$2),i=/([.?@])?(.*)/.exec(s);c.push({type:1,index:r,name:i[2],strings:t,ctor:"."===i[1]?M:"?"===i[1]?H:"@"===i[1]?I:S$1});}else c.push({type:6,index:r});}for(const i of t)l.removeAttribute(i);}if(g.test(l.tagName)){const t=l.textContent.split(e$2),s=t.length-1;if(s>0){l.textContent=i$1?i$1.emptyScript:"";for(let i=0;i<s;i++)l.append(t[i],h$1()),A.nextNode(),c.push({type:2,index:++r});l.append(t[s],h$1());}}}else if(8===l.nodeType)if(l.data===o$2)c.push({type:2,index:r});else {let t=-1;for(;-1!==(t=l.data.indexOf(e$2,t+1));)c.push({type:7,index:r}),t+=e$2.length-1;}r++;}}static createElement(t,i){const s=l$1.createElement("template");return s.innerHTML=t,s}}function P(t,i,s=t,e){var o,n,l,h;if(i===b)return i;let d=void 0!==e?null===(o=s._$Cl)||void 0===o?void 0:o[e]:s._$Cu;const u=r$2(i)?void 0:i._$litDirective$;return (null==d?void 0:d.constructor)!==u&&(null===(n=null==d?void 0:d._$AO)||void 0===n||n.call(d,!1),void 0===u?d=void 0:(d=new u(t),d._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Cl)&&void 0!==l?l:h._$Cl=[])[e]=d:s._$Cu=d),void 0!==d&&(i=P(t,d._$AS(t,i.values),d,e)),i}class V{constructor(t,i){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:l$1).importNode(s,!0);A.currentNode=o;let n=A.nextNode(),h=0,r=0,d=e[0];for(;void 0!==d;){if(h===d.index){let i;2===d.type?i=new N(n,n.nextSibling,this,t):1===d.type?i=new d.ctor(n,d.name,d.strings,this,t):6===d.type&&(i=new L(n,this,t)),this.v.push(i),d=e[++r];}h!==(null==d?void 0:d.index)&&(n=A.nextNode(),h++);}return o}m(t){let i=0;for(const s of this.v)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class N{constructor(t,i,s,e){var o;this.type=2,this._$AH=w,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cg=null===(o=null==e?void 0:e.isConnected)||void 0===o||o;}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=P(this,t,i),r$2(t)?t===w||null==t||""===t?(this._$AH!==w&&this._$AR(),this._$AH=w):t!==this._$AH&&t!==b&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.k(t):u(t)?this.S(t):this.$(t);}M(t,i=this._$AB){return this._$AA.parentNode.insertBefore(t,i)}k(t){this._$AH!==t&&(this._$AR(),this._$AH=this.M(t));}$(t){this._$AH!==w&&r$2(this._$AH)?this._$AA.nextSibling.data=t:this.k(l$1.createTextNode(t)),this._$AH=t;}T(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=E.createElement(e.h,this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.m(s);else {const t=new V(o,this),i=t.p(this.options);t.m(s),this.k(i),this._$AH=t;}}_$AC(t){let i=T.get(t.strings);return void 0===i&&T.set(t.strings,i=new E(t)),i}S(t){d(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new N(this.M(h$1()),this.M(h$1()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){var i;void 0===this._$AM&&(this._$Cg=t,null===(i=this._$AP)||void 0===i||i.call(this,t));}}class S$1{constructor(t,i,s,e,o){this.type=1,this._$AH=w,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=w;}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=P(this,t,i,0),n=!r$2(t)||t!==this._$AH&&t!==b,n&&(this._$AH=t);else {const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=P(this,e[s+l],i,l),h===b&&(h=this._$AH[l]),n||(n=!r$2(h)||h!==this._$AH[l]),h===w?t=w:t!==w&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h;}n&&!e&&this.C(t);}C(t){t===w?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class M extends S$1{constructor(){super(...arguments),this.type=3;}C(t){this.element[this.name]=t===w?void 0:t;}}const k=i$1?i$1.emptyScript:"";class H extends S$1{constructor(){super(...arguments),this.type=4;}C(t){t&&t!==w?this.element.setAttribute(this.name,k):this.element.removeAttribute(this.name);}}class I extends S$1{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5;}_$AI(t,i=this){var s;if((t=null!==(s=P(this,t,i,0))&&void 0!==s?s:w)===b)return;const e=this._$AH,o=t===w&&e!==w||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==w&&(e===w||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t);}}class L{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){P(this,t);}}const z=window.litHtmlPolyfillSupport;null==z||z(E,N),(null!==(t$1=globalThis.litHtmlVersions)&&void 0!==t$1?t$1:globalThis.litHtmlVersions=[]).push("2.2.2");//# sourceMappingURL=lit-html.js.map

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var l$2,o$3;class s$3 extends a{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0;}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=x(i,this.renderRoot,this.renderOptions);}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0);}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1);}render(){return b}}s$3.finalized=!0,s$3._$litElement$=!0,null===(l$2=globalThis.litElementHydrateSupport)||void 0===l$2||l$2.call(globalThis,{LitElement:s$3});const n$3=globalThis.litElementPolyfillSupport;null==n$3||n$3({LitElement:s$3});(null!==(o$3=globalThis.litElementVersions)&&void 0!==o$3?o$3:globalThis.litElementVersions=[]).push("3.2.0");//# sourceMappingURL=lit-element.js.map

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var n$4;const e$3=null!=(null===(n$4=window.HTMLSlotElement)||void 0===n$4?void 0:n$4.prototype.assignedElements)?(o,n)=>o.assignedElements(n):(o,n)=>o.assignedNodes(n).filter((o=>o.nodeType===Node.ELEMENT_NODE));//# sourceMappingURL=query-assigned-elements.js.map

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */console.warn("The main 'lit-element' module entrypoint is deprecated. Please update your imports to use the 'lit' package: 'lit' and 'lit/decorators.ts' or import from 'lit-element/lit-element.ts'. See https://lit.dev/msg/deprecated-import-path for more information.");
//# sourceMappingURL=index.js.map

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},e$4=t=>(...e)=>({_$litDirective$:t,values:e});class i$2{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}//# sourceMappingURL=directive.js.map

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o$4=e$4(class extends i$2{constructor(t){var i;if(super(t),t.type!==t$2.ATTRIBUTE||"class"!==t.name||(null===(i=t.strings)||void 0===i?void 0:i.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return " "+Object.keys(t).filter((i=>t[i])).join(" ")+" "}update(i,[s]){var r,o;if(void 0===this.et){this.et=new Set,void 0!==i.strings&&(this.st=new Set(i.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in s)s[t]&&!(null===(r=this.st)||void 0===r?void 0:r.has(t))&&this.et.add(t);return this.render(s)}const e=i.element.classList;this.et.forEach((t=>{t in s||(e.remove(t),this.et.delete(t));}));for(const t in s){const i=!!s[t];i===this.et.has(t)||(null===(o=this.st)||void 0===o?void 0:o.has(t))||(i?(e.add(t),this.et.add(t)):(e.remove(t),this.et.delete(t)));}return b}});//# sourceMappingURL=class-map.js.map

function hass() {
  if(document.querySelector('hc-main'))
    return document.querySelector('hc-main').hass;

  if(document.querySelector('home-assistant'))
    return document.querySelector('home-assistant').hass;

  return undefined;
}function lovelace_view() {
  var root = document.querySelector("hc-main");
  if(root) {
    root = root && root.shadowRoot;
    root = root && root.querySelector("hc-lovelace");
    root = root && root.shadowRoot;
    root = root && root.querySelector("hui-view") || root.querySelector("hui-panel-view");
    return root;
  }

  root = document.querySelector("home-assistant");
  root = root && root.shadowRoot;
  root = root && root.querySelector("home-assistant-main");
  root = root && root.shadowRoot;
  root = root && root.querySelector("app-drawer-layout partial-panel-resolver");
  root = root && root.shadowRoot || root;
  root = root && root.querySelector("ha-panel-lovelace");
  root = root && root.shadowRoot;
  root = root && root.querySelector("hui-root");
  root = root && root.shadowRoot;
  root = root && root.querySelector("ha-app-layout");
  root = root && root.querySelector("#view");
  root = root && root.firstElementChild;
  return root;
}

async function load_lovelace() {
  if(customElements.get("hui-view")) return true;

  await customElements.whenDefined("partial-panel-resolver");
  const ppr = document.createElement("partial-panel-resolver");
  ppr.hass = {panels: [{
    url_path: "tmp",
    "component_name": "lovelace",
  }]};
  ppr._updateRoutes();
  await ppr.routerOptions.routes.tmp.load();
  if(!customElements.get("ha-panel-lovelace")) return false;
  const p = document.createElement("ha-panel-lovelace");
  p.hass = hass();
  if(p.hass === undefined) {
    await new Promise(resolve => {
      window.addEventListener('connection-status', (ev) => {
        console.log(ev);
        resolve();
      }, {once: true});
    });
    p.hass = hass();
  }
  p.panel = {config: {mode: null}};
  p._fetchConfig();
  return true;
}

async function _selectTree(root, path, all=false) {
  let el = root;
  if(typeof(path) === "string") {
    path = path.split(/(\$| )/);
  }
  if(path[path.length-1] === "")
     path.pop();
  for(const [i, p] of path.entries()) {
    if(!p.trim().length) continue;
    if(!el) return null;
    if(el.localName && el.localName.includes("-"))
      await customElements.whenDefined(el.localName);
    if(el.updateComplete)
      await el.updateComplete;
    if(p === "$")
      if(all && i == path.length-1)
        el = [el.shadowRoot];
      else
        el = el.shadowRoot;
    else
      if(all && i == path.length-1)
        el = el.querySelectorAll(p);
      else
        el = el.querySelector(p);
  }
  return el;
}

async function selectTree(root, path, all=false, timeout=10000) {
  return Promise.race([
    _selectTree(root, path, all),
    new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), timeout))
  ]).catch((err) => {
    if(!err.message || err.message !== "timeout")
      throw(err);
    return null;
  });
}

function fireEvent(ev, detail, entity=null) {
  ev = new Event(ev, {
    bubbles: true,
    cancelable: false,
    composed: true,
  });
  ev.detail = detail || {};
  if(entity) {
    entity.dispatchEvent(ev);
  } else {
    var root = lovelace_view();
    if (root) root.dispatchEvent(ev);
  }
}

let helpers = window.cardHelpers;
const helperPromise = new Promise(async (resolve, reject) => {
  if(helpers) resolve();

  const updateHelpers = async () => {
    helpers = await window.loadCardHelpers();
    window.cardHelpers = helpers;
    resolve();
  };

  if(window.loadCardHelpers) {
    updateHelpers();
  } else {
    // If loadCardHelpers didn't exist, force load lovelace and try once more.
    window.addEventListener("load", async () => {
      load_lovelace();
      if(window.loadCardHelpers) {
        updateHelpers();
      }
    });
  }
});

async function closePopUp() {
  const root = document.querySelector("home-assistant") || document.querySelector("hc-root");
  fireEvent("hass-more-info", {entityId: "."}, root);
  const el = await selectTree(root, "$ card-tools-popup");

  if(el)
    el.closeDialog();
}

var t$3,r$3;!function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none";}(t$3||(t$3={})),function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24";}(r$3||(r$3={}));function E$1(e){return e.substr(0,e.indexOf("."))}function L$1(e){return E$1(e.entity_id)}//# sourceMappingURL=index.m.js.map

class ThermostatPopupCard extends s$3 {
    constructor() {
        super();
        this.hvacModeOrdering = {
            auto: 1,
            heat_cool: 2,
            heat: 3,
            cool: 4,
            dry: 5,
            fan_only: 6,
            off: 7,
        };
        this.modeIcons = {
            auto: "mdi:autorenew",
            heat_cool: "mdi:autorenew",
            heat: "mdi:fire",
            cool: "mdi:snowflake",
            off: "mdi:power",
            fan_only: "mdi:fan",
            dry: "mdi:water-percent",
        };
        this.settings = false;
        this.settingsCustomCard = false;
        this.settingsPosition = "bottom";
        this._compareClimateHvacModes = (mode1, mode2) => this.hvacModeOrdering[mode1] - this.hvacModeOrdering[mode2];
    }
    static get properties() {
        return {
            hass: {},
            config: {},
            active: {}
        };
    }
    render() {
        var entity = this.config.entity;
        var stateObj = this.hass.states[entity];
        var icon = this.config.icon ? this.config.icon : stateObj.attributes.icon ? stateObj.attributes.icon : 'mdi:lightbulb';
        // REAL DATA
        var name = this.config.name || L$1(this.hass.states[this.config.entity]);
        var targetTemp = stateObj.attributes.temperature !== null && stateObj.attributes.temperature ? stateObj.attributes.temperature : stateObj.attributes.min_temp;
        var currentTemp = stateObj.attributes.current_temperature;
        var mode = stateObj.state in this.modeIcons ? stateObj.state : "unknown-mode";
        var _handleSize = 15;
        var _stepSize = this.config.stepSize ? this.config.stepSize : stateObj.attributes.target_temp_step ? stateObj.attributes.target_temp_step : 1;
        var gradient = true;
        var gradientPoints = [
            { point: 0, color: '#4fdae4' },
            { point: 10, color: '#2da9d8' },
            { point: 25, color: '#56b557' },
            { point: 50, color: '#f4c807' },
            { point: 70, color: '#faaa00' },
            { point: 100, color: '#f86618' },
        ];
        var fullscreen = "fullscreen" in this.config ? this.config.fullscreen : true;
        this.settings = "settings" in this.config ? true : false;
        this.settingsCustomCard = "settingsCard" in this.config ? true : false;
        this.settingsPosition = "settingsPosition" in this.config ? this.config.settingsPosition : "bottom";
        if (this.settingsCustomCard && this.config.settingsCard.cardOptions) {
            if (this.config.settingsCard.cardOptions.entity && this.config.settingsCard.cardOptions.entity == 'this') {
                this.config.settingsCard.cardOptions.entity = entity;
            }
            else if (this.config.settingsCard.cardOptions.entity_id && this.config.settingsCard.cardOptions.entity_id == 'this') {
                this.config.settingsCard.cardOptions.entity_id = entity;
            }
            else if (this.config.settingsCard.cardOptions.entities) {
                for (let key in this.config.settingsCard.cardOptions.entities) {
                    if (this.config.settingsCard.cardOptions.entities[key] == 'this') {
                        this.config.settingsCard.cardOptions.entities[key] = entity;
                    }
                }
            }
        }
        return $ `
            <div class="${fullscreen === true ? 'popup-wrapper' : ''}">
                <div class="${o$4({ [mode]: true })}" style="display:flex;width:100%;height:100%;">
                    <div id="popup" class="popup-inner" @click="${e => this._close(e)}">
                        <div class="info${fullscreen === true ? ' fullscreen' : ''}">
                            <div class="temp ${mode}">
                                ${currentTemp}&#176;
                            </div>
                            <div class="right">
                                <div class="name">${name}</div>
                                <div class="action">
                                    ${stateObj.attributes.hvac_action
            ? this.hass.localize(`state_attributes.climate.hvac_action.${stateObj.attributes.hvac_action}`)
            : this.hass.localize(`state.climate.${stateObj.state}`)}
                                    ${stateObj.attributes.preset_mode &&
            stateObj.attributes.preset_mode !== "none"
            ? $ `
                                                        -
                                                        ${this.hass.localize(`state_attributes.climate.preset_mode.${stateObj.attributes.preset_mode}`) || stateObj.attributes.preset_mode}
                                                    `
            : ""}
                                    ${targetTemp}&#176;
                                </div>
                            </div>
                        </div>


                        <div id="controls">
                            <div id="slider">
                                <custom-round-slider
                                        .value=${targetTemp}
                                        .low=${stateObj.attributes.target_temp_low}
                                        .high=${stateObj.attributes.target_temp_high}
                                        .min=${stateObj.attributes.min_temp}
                                        .max=${stateObj.attributes.max_temp}
                                        .step=${_stepSize}
                                        .handleSize=${_handleSize}
                                        .gradient=${gradient}
                                        .gradientPoints=${gradientPoints}
                                        @value-changing=${this._dragEvent}
                                        @value-changed=${this._setTemperature}
                                ></custom-round-slider>

                                <div id="slider-center">
                                    <div class="values">
                                        <div class="action">
                                            ${stateObj.attributes.hvac_action
            ? this.hass.localize(`state_attributes.climate.hvac_action.${stateObj.attributes.hvac_action}`)
            : this.hass.localize(`state.climate.${stateObj.state}`)}
                                            ${stateObj.attributes.preset_mode &&
            stateObj.attributes.preset_mode !== "none"
            ? $ `
                                                                -
                                                                ${this.hass.localize(`state_attributes.climate.preset_mode.${stateObj.attributes.preset_mode}`) || stateObj.attributes.preset_mode}
                                                            `
            : ""}
                                        </div>
                                        <div class="value">
                                            ${!this._setTemp
            ? ""
            : Array.isArray(this._setTemp)
                ? _stepSize === 1
                    ? y `
                                ${this._setTemp[0].toFixed()}&#176; -
                                ${this._setTemp[1].toFixed()}&#176;
                                `
                    : y `
                                ${this._setTemp[0].toFixed(1)}&#176; -
                                ${this._setTemp[1].toFixed(1)}&#176;
                                `
                : _stepSize === 1
                    ? y `
                                ${this._setTemp.toFixed()}&#176;
                                `
                    : y `
                                ${this._setTemp.toFixed(1)}&#176;
                                `}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="modes">
                            ${(stateObj.attributes.hvac_modes || [])
            .concat()
            .sort(this._compareClimateHvacModes)
            .map((modeItem) => this._renderIcon(modeItem, mode))}
                        </div>
                        ${this.settings ? $ `
                            <button class="settings-btn ${this.settingsPosition}${fullscreen === true ? ' fullscreen' : ''}"
                                    @click="${() => this._openSettings()}">
                                ${this.config.settings.openButton ? this.config.settings.openButton : 'Settings'}
                            </button>` : $ ``}
                    </div>
                    ${this.settings ? $ `
                        <div id="settings" class="settings-inner" @click="${e => this._close(e)}">
                            ${this.settingsCustomCard ? $ `
                                <card-maker nohass data-card="${this.config.settingsCard.type}"
                                            data-options="${JSON.stringify(this.config.settingsCard.cardOptions)}"
                                            data-style="${this.config.settingsCard.cardStyle ? this.config.settingsCard.cardStyle : ''}">
                                </card-maker>
                            ` : $ `
                                <more-info-controls
                                        .dialogElement=${null}
                                        .canConfigure=${false}
                                        .hass=${this.hass}
                                        .stateObj=${stateObj}
                                        style="--paper-slider-knob-color: white !important;
                  --paper-slider-knob-start-color: white !important;
                  --paper-slider-pin-color: white !important;
                  --paper-slider-active-color: white !important;
                  color: white !important;
                  --primary-text-color: white !important;"
                                ></more-info-controls>
                            `}
                            <button class="settings-btn ${this.settingsPosition}${fullscreen === true ? ' fullscreen' : ''}"
                                    @click="${() => this._closeSettings()}">
                                ${this.config.settings.closeButton ? this.config.settings.closeButton : 'Close'}
                            </button>
                        </div>
                    ` : $ ``}
                </div>
            </div>
        `;
    }
    firstUpdated() {
        if (this.settings && !this.settingsCustomCard) {
            const mic = this.shadowRoot.querySelector("more-info-controls").shadowRoot;
            mic.removeChild(mic.querySelector("app-toolbar"));
        }
        else if (this.settings && this.settingsCustomCard) {
            this.shadowRoot.querySelectorAll("card-maker").forEach(customCard => {
                var card = {
                    type: customCard.dataset.card
                };
                card = Object.assign({}, card, JSON.parse(customCard.dataset.options));
                customCard.config = card;
                let style = "";
                if (customCard.dataset.style) {
                    style = customCard.dataset.style;
                }
                if (style != "") {
                    let itterations = 0;
                    let interval = setInterval(function () {
                        let el = customCard.children[0];
                        if (el) {
                            window.clearInterval(interval);
                            var styleElement = document.createElement('style');
                            styleElement.innerHTML = style;
                            el.shadowRoot.appendChild(styleElement);
                        }
                        else if (++itterations === 10) {
                            window.clearInterval(interval);
                        }
                    }, 100);
                }
            });
        }
    }
    updated() {
        this._setTemp = this._getSetTemp(this.hass.states[this.config.entity]);
    }
    _openSettings() {
        this.shadowRoot.getElementById('popup').classList.add("off");
        this.shadowRoot.getElementById('settings').classList.add("on");
    }
    _closeSettings() {
        this.shadowRoot.getElementById('settings').classList.remove("on");
        this.shadowRoot.getElementById('popup').classList.remove("off");
    }
    _renderIcon(mode, currentMode) {
        if (!this.modeIcons[mode]) {
            return $ ``;
        }
        return $ `
            <ha-icon-button
                    class="${o$4({ "selected-icon": currentMode === mode })}"
                    .mode="${mode}"
                    @click="${this._handleModeClick}"
                    tabindex="0">
                <ha-icon icon="${this.modeIcons[mode]}" style="display:flex;"></ha-icon>
            </ha-icon-button>`;
    }
    _handleModeClick(e) {
        this.hass.callService("climate", "set_hvac_mode", {
            entity_id: this.config.entity,
            hvac_mode: e.currentTarget.mode,
        });
    }
    _getSetTemp(stateObj) {
        if (stateObj.state === "unavailable") {
            return this.hass.localize("state.default.unavailable");
        }
        if (stateObj.attributes.target_temp_low &&
            stateObj.attributes.target_temp_high) {
            return [
                stateObj.attributes.target_temp_low,
                stateObj.attributes.target_temp_high,
            ];
        }
        return stateObj.attributes.temperature;
    }
    _close(event) {
        if (event && (event.target.className.includes('popup-inner') || event.target.className.includes('settings-inner'))) {
            closePopUp();
        }
    }
    _dragEvent(e) {
        const stateObj = this.hass.states[this.config.entity];
        if (e.detail.low) {
            this._setTemp = [e.detail.low, stateObj.attributes.target_temp_high];
        }
        else if (e.detail.high) {
            this._setTemp = [stateObj.attributes.target_temp_low, e.detail.high];
        }
        else {
            this._setTemp = e.detail.value;
        }
    }
    _setTemperature(e) {
        const stateObj = this.hass.states[this.config.entity];
        if (e.detail.low) {
            this.hass.callService("climate", "set_temperature", {
                entity_id: this.config.entity,
                target_temp_low: e.detail.low,
                target_temp_high: stateObj.attributes.target_temp_high,
            });
        }
        else if (e.detail.high) {
            this.hass.callService("climate", "set_temperature", {
                entity_id: this.config.entity,
                target_temp_low: stateObj.attributes.target_temp_low,
                target_temp_high: e.detail.high,
            });
        }
        else {
            this.hass.callService("climate", "set_temperature", {
                entity_id: this.config.entity,
                temperature: e.detail.value,
            });
        }
    }
    setConfig(config) {
        if (!config.entity) {
            throw new Error("You need to define an entity");
        }
        this.config = config;
    }
    getCardSize() {
        return 1;
    }
    static get styles() {
        return r `
        :host {
            --auto-color: #EE7600;
            --eco-color: springgreen;
            --cool-color: #2b9af9;
            --heat-color: #EE7600;
            --manual-color: #44739e;
            --off-color: lightgrey;
            --fan_only-color: #8a8a8a;
            --dry-color: #efbd07;
            --idle-color: #00CC66;
            --unknown-color: #bac;
        }
        .popup-wrapper {
          margin-top:64px;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }
        .popup-inner {
          height: 100%;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
        .popup-inner.off {
          display:none;
        }
        #settings {
          display:none;
        }
        .settings-inner {
          height: 100%;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
        #settings.on {
          display:flex;
        }
        .settings-btn {
          position:absolute;
          right:30px;
          background-color: #7f8082;
          color: #FFF;
          border: 0;
          padding: 5px 20px;
          border-radius: 10px;
          font-weight: 500;
          cursor: pointer;
        }
        .settings-btn.bottom {
          bottom:15px;
        }
        .settings-btn.top {
          top: 25px;
        }
        .settings-btn.bottom.fullscreen {
          margin:0;
        }
        .fullscreen {
          margin-top:-64px;
        }
        .info {
          display:flex;
          flex-direction:row;
          margin-bottom: 40px;
        }
        .info .temp {
          background-color: #67cd67;
          height: 60px;
          width: 60px;  
          text-align:center;
          line-height:60px;
          border-radius:100%;
          color:#FFF;
          font-size:18px;
        }
        .info .temp.auto {
          background-color: var(--auto-color);
        }
        .info .temp.heat_cool {
          background-color: var(--auto-color);
        }
        .info .temp.heat {
          background-color: var(--heat-color);
        }
        .info .temp.cool {
          background-color: var(--cool-color);
        }
        .info .temp.manual {
          background-color: var(--manual-color);
        }
        .info .temp.off {
          background-color: var(--off-color);
        }
        .info .temp.fan_only {
          background-color: var(--fan_only-color);
        }
        .info .temp.eco {
          background-color: var(--eco-color);
        }
        .info .temp.dry {
          background-color: var(--dry-color);
        }
        .info .temp.idle {
          background-color: var(--idle-color);
        }
        .info .temp.unknown-mode {
          background-color: var(--unknown-color);
        }


        .info .right {
          display:flex;
          flex-direction:column;
          margin-left:15px;
          height:60px;
          align-items:center;
          justify-content:center;
        }
        .info .right .name {
          color:#FFF;
          font-size:24px;
        }
        .info .right .action {
          color: #8b8a8f;
          font-size:12px;
        }
        
        /* CONTROLS */
        .auto {
          --mode-color: var(--auto-color);
        }
        .heat_cool {
          --mode-color: var(--auto-color);
        }
        .cool {
          --mode-color: var(--cool-color);
        }
        .heat {
          --mode-color: var(--heat-color);
        }
        .manual {
          --mode-color: var(--manual-color);
        }
        .off {
          --mode-color: var(--off-color);
        }
        .fan_only {
          --mode-color: var(--fan_only-color);
        }
        .eco {
          --mode-color: var(--eco-color);
        }
        .dry {
          --mode-color: var(--dry-color);
        }
        .idle {
          --mode-color: var(--idle-color);
        }
        .unknown-mode {
          --mode-color: var(--unknown-color);
        }
        #controls {
          display: flex;
          justify-content: center;
          padding: 16px;
          position: relative;
          width:500px;
        }
        #slider {
          height: 100%;
          width: 100%;
          position: relative;
          max-width: 300px;
          min-width: 250px;
        }
        round-slider {
          --round-slider-path-color: var(--disabled-text-color);
          --round-slider-bar-color: var(--mode-color);
          padding-bottom: 10%;
        }
        #slider-center {
          position: absolute;
          width: calc(100% - 120px);
          height: calc(100% - 120px);
          box-sizing: border-box;
          border-radius: 100%;
          left: 60px;
          top: 60px;
          text-align: center;
          overflow-wrap: break-word;
          pointer-events: none;
        }
        
        .values {
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;
          height:100%;
          width:100%;
        }
        .values .action {
          color:#f4b941;
          font-size:10px;
          text-transform:uppercase;
        }
        .values .value {
          color:#FFF;
          font-size:60px;
          line-height: 60px;
        }
        
        #modes > * {
          color: var(--disabled-text-color);
          cursor: pointer;
          display: inline-block;
        }
        #modes .selected-icon {
          color: var(--mode-color);
        }
        text {
          color: var(--primary-text-color);
        }
    `;
    }
}
customElements.define('thermostat-popup-card', ThermostatPopupCard);
class CustomRoundSlider extends s$3 {
    constructor() {
        super();
        this.min = 0;
        this.max = 100;
        this.step = 1;
        this.startAngle = 135;
        this.arcLength = 270;
        this.handleSize = 6;
        this.handleZoom = 5;
        this.disabled = false;
        this.dragging = false;
        this.rtl = false;
        this._scale = 1;
        this.gradient = false;
        this.gradientPoints = [];
    }
    static get properties() {
        return {
            value: { type: Number },
            high: { type: Number },
            low: { type: Number },
            min: { type: Number },
            max: { type: Number },
            step: { type: Number },
            startAngle: { type: Number },
            arcLength: { type: Number },
            handleSize: { type: Number },
            handleZoom: { type: Number },
            disabled: { type: Boolean },
            dragging: { type: Boolean, reflect: true },
            rtl: { type: Boolean },
            _scale: { type: Number },
            gradient: { type: Boolean },
            gradientPoints: { type: Array }
        };
    }
    get _start() {
        return this.startAngle * Math.PI / 180;
    }
    get _len() {
        // Things get weird if length is more than a complete turn
        return Math.min(this.arcLength * Math.PI / 180, 2 * Math.PI - 0.01);
    }
    get _end() {
        return this._start + this._len;
    }
    get _enabled() {
        // If handle is disabled
        if (this.disabled)
            return false;
        if (this.value == null && (this.high == null || this.low == null))
            return false;
        if (this.value != null && (this.value > this.max || this.value < this.min))
            return false;
        if (this.high != null && (this.high > this.max || this.high < this.min))
            return false;
        if (this.low != null && (this.low > this.max || this.low < this.min))
            return false;
        return true;
    }
    _angleInside(angle) {
        // Check if an angle is on the arc
        let a = (this.startAngle + this.arcLength / 2 - angle + 180 + 360) % 360 - 180;
        return (a < this.arcLength / 2 && a > -this.arcLength / 2);
    }
    _angle2xy(angle) {
        if (this.rtl)
            return { x: -Math.cos(angle), y: Math.sin(angle) };
        return { x: Math.cos(angle), y: Math.sin(angle) };
    }
    _xy2angle(x, y) {
        if (this.rtl)
            x = -x;
        return (Math.atan2(y, x) - this._start + 2 * Math.PI) % (2 * Math.PI);
    }
    _value2angle(value) {
        const fraction = (value - this.min) / (this.max - this.min);
        return this._start + fraction * this._len;
    }
    _angle2value(angle) {
        return Math.round((angle / this._len * (this.max - this.min) + this.min) / this.step) * this.step;
    }
    get _boundaries() {
        // Get the maximum extents of the bar arc
        const start = this._angle2xy(this._start);
        const end = this._angle2xy(this._end);
        let up = 1;
        if (!this._angleInside(270))
            up = Math.max(-start.y, -end.y);
        let down = 1;
        if (!this._angleInside(90))
            down = Math.max(start.y, end.y);
        let left = 1;
        if (!this._angleInside(180))
            left = Math.max(-start.x, -end.x);
        let right = 1;
        if (!this._angleInside(0))
            right = Math.max(start.x, end.x);
        return {
            up, down, left, right,
            height: up + down,
            width: left + right,
        };
    }
    dragStart(ev) {
        let handle = ev.target;
        // Avoid double events mouseDown->focus
        if (this._rotation && this._rotation.type !== "focus") {
            return;
        }
        // If an invisible handle was clicked, switch to the visible counterpart
        if (handle.classList.contains("overflow")) {
            handle = handle.nextElementSibling;
        }
        if (!handle.classList.contains("handle"))
            return;
        handle.setAttribute('stroke-width', (this.handleSize * this._scale) + 5 + this.handleZoom);
        const min = handle.id === "high" ? this.low : this.min;
        const max = handle.id === "low" ? this.high : this.max;
        this._rotation = { handle, min, max, start: this[handle.id], type: ev.type };
        this.dragging = true;
    }
    dragEnd() {
        if (!this._rotation)
            return;
        const handle = this._rotation.handle;
        handle.setAttribute('stroke-width', (this.handleSize * this._scale) + 5);
        this._rotation = false;
        this.dragging = false;
        handle.blur();
        let event = new CustomEvent('value-changed', {
            detail: {
                [handle.id]: this[handle.id],
            }
        });
        this.dispatchEvent(event);
        // This makes the low handle render over the high handle if they both are
        // close to the top end.  Otherwise if would be unclickable, and the high
        // handle locked by the low.  Calcualtion is done in the dragEnd handler to
        // avoid "z fighting" while dragging.
        if (this.low && this.low >= 0.99 * this.max)
            this._reverseOrder = true;
        else
            this._reverseOrder = false;
    }
    drag(ev) {
        if (!this._rotation)
            return;
        if (this._rotation.type === "focus")
            return;
        ev.preventDefault();
        const mouseX = (ev.type === "touchmove") ? ev.touches[0].clientX : ev.clientX;
        const mouseY = (ev.type === "touchmove") ? ev.touches[0].clientY : ev.clientY;
        const rect = this.shadowRoot.querySelector("svg").getBoundingClientRect();
        const boundaries = this._boundaries;
        const x = mouseX - (rect.left + boundaries.left * rect.width / boundaries.width);
        const y = mouseY - (rect.top + boundaries.up * rect.height / boundaries.height);
        const angle = this._xy2angle(x, y);
        const pos = this._angle2value(angle);
        this._dragpos(pos);
    }
    _dragpos(pos) {
        if (pos < this._rotation.min || pos > this._rotation.max)
            return;
        const handle = this._rotation.handle;
        this[handle.id] = pos;
        let event = new CustomEvent('value-changing', {
            detail: {
                [handle.id]: pos,
            }
        });
        this.dispatchEvent(event);
    }
    _keyStep(ev) {
        if (!this._rotation)
            return;
        const handle = this._rotation.handle;
        if (ev.key === "ArrowLeft")
            if (this.rtl)
                this._dragpos(this[handle.id] + this.step);
            else
                this._dragpos(this[handle.id] - this.step);
        if (ev.key === "ArrowRight")
            if (this.rtl)
                this._dragpos(this[handle.id] - this.step);
            else
                this._dragpos(this[handle.id] + this.step);
    }
    firstUpdated() {
        document.addEventListener('mouseup', this.dragEnd.bind(this));
        document.addEventListener('touchend', this.dragEnd.bind(this), { passive: false });
        document.addEventListener('mousemove', this.drag.bind(this));
        document.addEventListener('touchmove', this.drag.bind(this), { passive: false });
        document.addEventListener('keydown', this._keyStep.bind(this));
    }
    updated(changedProperties) {
        // Workaround for vector-effect not working in IE and pre-Chromium Edge
        // That's also why the _scale property exists
        if (this.shadowRoot.querySelector("svg")
            && this.shadowRoot.querySelector("svg").style.vectorEffect !== undefined)
            return;
        if (changedProperties.has("_scale") && this._scale != 1) {
            this.shadowRoot.querySelector("svg").querySelectorAll("path").forEach((e) => {
                if (e.getAttribute('stroke-width'))
                    return;
                const orig = parseFloat(getComputedStyle(e).getPropertyValue('stroke-width'));
                e.style.strokeWidth = `${orig * this._scale}px`;
            });
        }
        const rect = this.shadowRoot.querySelector("svg").getBoundingClientRect();
        const scale = Math.max(rect.width, rect.height);
        this._scale = 2 / scale;
    }
    _renderArc(start, end) {
        const diff = end - start;
        start = this._angle2xy(start);
        end = this._angle2xy(end + 0.001); // Safari doesn't like arcs with no length
        return `
      M ${start.x} ${start.y}
      A 1 1,
        0,
        ${(diff) > Math.PI ? "1" : "0"} ${this.rtl ? "0" : "1"},
        ${end.x} ${end.y}
    `;
    }
    _renderHandle(id) {
        const theta = this._value2angle(this[id]);
        const pos = this._angle2xy(theta);
        // Two handles are drawn. One visible, and one invisible that's twice as
        // big. Makes it easier to click.
        return y `
      <g class="${id} handle">
        <path
          id=${id}
          class="overflow"
          d="
          M ${pos.x} ${pos.y}
          L ${pos.x + 0.001} ${pos.y + 0.001}
          "
          vector-effect="non-scaling-stroke"
          stroke="rgba(0,0,0,0)"
          stroke-linecap="round"
          stroke-width="${4 * this.handleSize * this._scale}"
          />
        <path
          id=${id}
          class="handle"
          d=${this._renderArc(this._value2angle(id != 'low' ? this[id] - 0.35 : this[id] + 0.35), this._value2angle(this[id]))}
          vector-effect="non-scaling-stroke"
          tabindex="0"
          @focus=${this.dragStart}
          @blur=${this.dragEnd}
          />
        </g>
      `;
    }
    ;
    render() {
        const view = this._boundaries;
        return $ `
            <svg
                    @mousedown=${this.dragStart}
                    @touchstart=${this.dragStart}
                    xmln="http://www.w3.org/2000/svg"
                    viewBox="${-view.left} ${-view.up} ${view.width} ${view.height}"
                    style="margin: 30px;"
                    focusable="false"
            >
                ${this.gradient ? $ `

                ` : $ ``}
                <g class="slider">
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            ${this.gradientPoints.map(gradientPoint => y `<stop offset="${gradientPoint.point}%" style="stop-color:${gradientPoint.color};" />`)}
                        </linearGradient>
                    </defs>
                    <path
                            class="path"
                            style="${this.gradient ? 'stroke: url(#gradient);' : 'stroke: var(--round-slider-path-color, lightgray);'}"
                            d=${this._renderArc(this._start, this._end)}
                            vector-effect="non-scaling-stroke"
                    />
                    ${this._enabled
            ? y `
              <path
                class="block"
                vector-effect="non-scaling-stroke"
                d=${this._renderArc(this._start, this._value2angle(this.low != null ? this.low : this.min))}
              />
              <path
                class="block"
                vector-effect="non-scaling-stroke"
                d=${this._renderArc(this._value2angle(this.high != null ? this.high : this.value), this._end)}
              />
              <path
                class="block-dash"
                stroke-dasharray="2, 25"
                vector-effect="non-scaling-stroke"
                d=${this._renderArc(this._start, this._end)}
              />
              <path
                class="bar"
                vector-effect="non-scaling-stroke"
                d=${this._renderArc(this._value2angle(this.low != null ? this.low : this.min), this._value2angle(this.high != null ? this.high : this.value))}
              />
              
              `
            : ``}
                </g>
                <g class="handles">
                    ${this._enabled
            ? this.low != null
                ? this._reverseOrder
                    ? $ `${this._renderHandle("high")} ${this._renderHandle("low")}`
                    : $ `${this._renderHandle("low")} ${this._renderHandle("high")}`
                : $ `${this._renderHandle("value")}`
            : ``}
                </g>

            </svg>
        `;
    }
    static get styles() {
        return r `
      :host {
        display: inline-block;
        width: 100%;
      }
      svg {
        overflow: visible;
      }
      .slider {
        fill: none;
        stroke-width: var(--round-slider-path-width, 30);
        stroke-linecap: var(--round-slider-linecap, butt);
      }
      .path {
      }
      .bar {
        stroke: var(--round-slider-bar-color, transparent);
      }
      .block {
        stroke-width: var(--round-slider-block-path-width, 31);
        stroke: #2c2c2e;
      }
      .block-dash {
        stroke-width: var(--round-slider-dash-width, 20);
        stroke: var(--round-slider-block-dash-color, rgba(255,255,255,0.1));
      }
      g.handles {
        stroke: var(--round-slider-handle-color, var(--round-slider-bar-color, deepskyblue));
        stroke-linecap: round;
      }
      g.handle {
        stroke-width: var(--round-slider-dash-width, 20);
        stroke: #FFF;
        stroke-dasharray: 3, 8;
        stroke-linecap: butt;
      }
      .handle:focus {
        outline: unset;
      }
    `;
    }
}
customElements.define('custom-round-slider', CustomRoundSlider);
