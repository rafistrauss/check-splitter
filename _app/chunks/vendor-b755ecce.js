function b(){}function Y(t,e){for(const n in e)t[n]=e[n];return t}function I(t){return t()}function G(){return Object.create(null)}function w(t){t.forEach(I)}function Z(t){return typeof t=="function"}function tt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function et(t){return Object.keys(t).length===0}function yt(t,e,n,i){if(t){const r=J(t,e,n,i);return t[0](r)}}function J(t,e,n,i){return t[1]&&i?Y(n.ctx.slice(),t[1](i(e))):n.ctx}function gt(t,e,n,i){if(t[2]&&i){const r=t[2](i(n));if(e.dirty===void 0)return r;if(typeof r=="object"){const u=[],s=Math.max(e.dirty.length,r.length);for(let l=0;l<s;l+=1)u[l]=e.dirty[l]|r[l];return u}return e.dirty|r}return e.dirty}function xt(t,e,n,i,r,u){if(r){const s=J(e,n,i,u);t.p(s,r)}}function bt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}let N=!1;function nt(){N=!0}function it(){N=!1}function ct(t,e,n,i){for(;t<e;){const r=t+(e-t>>1);n(r)<=i?t=r+1:e=r}return t}function rt(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const c=[];for(let o=0;o<e.length;o++){const a=e[o];a.claim_order!==void 0&&c.push(a)}e=c}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let r=0;for(let c=0;c<e.length;c++){const o=e[c].claim_order,a=(r>0&&e[n[r]].claim_order<=o?r+1:ct(1,r,d=>e[n[d]].claim_order,o))-1;i[c]=n[a]+1;const _=a+1;n[_]=c,r=Math.max(_,r)}const u=[],s=[];let l=e.length-1;for(let c=n[r]+1;c!=0;c=i[c-1]){for(u.push(e[c-1]);l>=c;l--)s.push(e[l]);l--}for(;l>=0;l--)s.push(e[l]);u.reverse(),s.sort((c,o)=>c.claim_order-o.claim_order);for(let c=0,o=0;c<s.length;c++){for(;o<u.length&&s[c].claim_order>=u[o].claim_order;)o++;const a=o<u.length?u[o]:null;t.insertBefore(s[c],a)}}function st(t,e){if(N){for(rt(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function wt(t,e,n){N&&!n?st(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function lt(t){t.parentNode.removeChild(t)}function $t(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function ot(t){return document.createElement(t)}function B(t){return document.createTextNode(t)}function kt(){return B(" ")}function Et(){return B("")}function St(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function jt(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function Nt(t){return t===""?null:+t}function ut(t){return Array.from(t.childNodes)}function ft(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function K(t,e,n,i,r=!1){ft(t);const u=(()=>{for(let s=t.claim_info.last_index;s<t.length;s++){const l=t[s];if(e(l)){const c=n(l);return c===void 0?t.splice(s,1):t[s]=c,r||(t.claim_info.last_index=s),l}}for(let s=t.claim_info.last_index-1;s>=0;s--){const l=t[s];if(e(l)){const c=n(l);return c===void 0?t.splice(s,1):t[s]=c,r?c===void 0&&t.claim_info.last_index--:t.claim_info.last_index=s,l}}return i()})();return u.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,u}function at(t,e,n,i){return K(t,r=>r.nodeName===e,r=>{const u=[];for(let s=0;s<r.attributes.length;s++){const l=r.attributes[s];n[l.name]||u.push(l.name)}u.forEach(s=>r.removeAttribute(s))},()=>i(e))}function At(t,e,n){return at(t,e,n,ot)}function dt(t,e){return K(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>B(e),!0)}function Mt(t){return dt(t," ")}function vt(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function Ct(t,e){t.value=e==null?"":e}function Tt(t,e,n,i){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}let $;function k(t){$=t}function L(){if(!$)throw new Error("Function called outside component initialization");return $}function qt(t){L().$$.on_mount.push(t)}function zt(t){L().$$.after_update.push(t)}function Bt(t,e){L().$$.context.set(t,e)}const E=[],Q=[],A=[],R=[],W=Promise.resolve();let O=!1;function U(){O||(O=!0,W.then(V))}function Lt(){return U(),W}function P(t){A.push(t)}const D=new Set;let M=0;function V(){const t=$;do{for(;M<E.length;){const e=E[M];M++,k(e),_t(e.$$)}for(k(null),E.length=0,M=0;Q.length;)Q.pop()();for(let e=0;e<A.length;e+=1){const n=A[e];D.has(n)||(D.add(n),n())}A.length=0}while(E.length);for(;R.length;)R.pop()();O=!1,D.clear(),k(t)}function _t(t){if(t.fragment!==null){t.update(),w(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(P)}}const v=new Set;let g;function Ot(){g={r:0,c:[],p:g}}function Pt(){g.r||w(g.c),g=g.p}function X(t,e){t&&t.i&&(v.delete(t),t.i(e))}function Dt(t,e,n,i){if(t&&t.o){if(v.has(t))return;v.add(t),g.c.push(()=>{v.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}}function Ft(t,e){t.d(1),e.delete(t.key)}function Ht(t,e,n,i,r,u,s,l,c,o,a,_){let d=t.length,m=u.length,h=d;const C={};for(;h--;)C[t[h].key]=h;const S=[],T=new Map,q=new Map;for(h=m;h--;){const f=_(r,u,h),p=n(f);let y=s.get(p);y?i&&y.p(f,e):(y=o(p,f),y.c()),T.set(p,S[h]=y),p in C&&q.set(p,Math.abs(h-C[p]))}const F=new Set,H=new Set;function z(f){X(f,1),f.m(l,a),s.set(f.key,f),a=f.first,m--}for(;d&&m;){const f=S[m-1],p=t[d-1],y=f.key,j=p.key;f===p?(a=f.first,d--,m--):T.has(j)?!s.has(y)||F.has(y)?z(f):H.has(j)?d--:q.get(y)>q.get(j)?(H.add(y),z(f)):(F.add(j),d--):(c(p,s),d--)}for(;d--;){const f=t[d];T.has(f.key)||c(f,s)}for(;m;)z(S[m-1]);return S}function It(t,e){const n={},i={},r={$$scope:1};let u=t.length;for(;u--;){const s=t[u],l=e[u];if(l){for(const c in s)c in l||(i[c]=1);for(const c in l)r[c]||(n[c]=l[c],r[c]=1);t[u]=l}else for(const c in s)r[c]=1}for(const s in i)s in n||(n[s]=void 0);return n}function Gt(t){return typeof t=="object"&&t!==null?t:{}}function Jt(t){t&&t.c()}function Kt(t,e){t&&t.l(e)}function ht(t,e,n,i){const{fragment:r,on_mount:u,on_destroy:s,after_update:l}=t.$$;r&&r.m(e,n),i||P(()=>{const c=u.map(I).filter(Z);s?s.push(...c):w(c),t.$$.on_mount=[]}),l.forEach(P)}function mt(t,e){const n=t.$$;n.fragment!==null&&(w(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function pt(t,e){t.$$.dirty[0]===-1&&(E.push(t),U(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Qt(t,e,n,i,r,u,s,l=[-1]){const c=$;k(t);const o=t.$$={fragment:null,ctx:null,props:u,update:b,not_equal:r,bound:G(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(c?c.$$.context:[])),callbacks:G(),dirty:l,skip_bound:!1,root:e.target||c.$$.root};s&&s(o.root);let a=!1;if(o.ctx=n?n(t,e.props||{},(_,d,...m)=>{const h=m.length?m[0]:d;return o.ctx&&r(o.ctx[_],o.ctx[_]=h)&&(!o.skip_bound&&o.bound[_]&&o.bound[_](h),a&&pt(t,_)),d}):[],o.update(),a=!0,w(o.before_update),o.fragment=i?i(o.ctx):!1,e.target){if(e.hydrate){nt();const _=ut(e.target);o.fragment&&o.fragment.l(_),_.forEach(lt)}else o.fragment&&o.fragment.c();e.intro&&X(t.$$.fragment),ht(t,e.target,e.anchor,e.customElement),it(),V()}k(c)}class Rt{$destroy(){mt(this,1),this.$destroy=b}$on(e,n){const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const r=i.indexOf(n);r!==-1&&i.splice(r,1)}}$set(e){this.$$set&&!et(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const x=[];function Wt(t,e=b){let n;const i=new Set;function r(l){if(tt(t,l)&&(t=l,n)){const c=!x.length;for(const o of i)o[1](),x.push(o,t);if(c){for(let o=0;o<x.length;o+=2)x[o][0](x[o+1]);x.length=0}}}function u(l){r(l(t))}function s(l,c=b){const o=[l,c];return i.add(o),i.size===1&&(n=e(r)||b),l(t),()=>{i.delete(o),i.size===0&&(n(),n=null)}}return{set:r,update:u,subscribe:s}}export{Gt as A,mt as B,Y as C,Wt as D,Lt as E,yt as F,xt as G,bt as H,gt as I,st as J,b as K,St as L,Ht as M,Ft as N,Ct as O,Nt as P,$t as Q,w as R,Rt as S,Z as T,ut as a,jt as b,At as c,lt as d,ot as e,Tt as f,wt as g,dt as h,Qt as i,vt as j,kt as k,Et as l,Mt as m,Ot as n,Dt as o,Pt as p,X as q,Bt as r,tt as s,B as t,zt as u,qt as v,Jt as w,Kt as x,ht as y,It as z};
