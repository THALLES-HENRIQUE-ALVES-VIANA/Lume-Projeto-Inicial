import{r as i,u as $,P as q,a as H,D as U,d as _,O as j,C as B,I as M,j as s,$ as J,B as P}from"./index-B5jLUV2g.js";import{C as G}from"./card.esm-taPyjTpq.js";function m(e){"@babel/helpers - typeof";return m=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},m(e)}function Y(e,t){if(m(e)!=="object"||e===null)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(m(n)!=="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function K(e){var t=Y(e,"string");return m(t)==="symbol"?t:String(t)}function L(e,t,r){return t=K(t),t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function x(){return x=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},x.apply(this,arguments)}function X(e){if(Array.isArray(e))return e}function V(e,t){var r=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(r!=null){var n,a,l,u,c=[],o=!0,f=!1;try{if(l=(r=r.call(e)).next,t!==0)for(;!(o=(n=l.call(r)).done)&&(c.push(n.value),c.length!==t);o=!0);}catch(v){f=!0,a=v}finally{try{if(!o&&r.return!=null&&(u=r.return(),Object(u)!==u))return}finally{if(f)throw a}}return c}}function S(e,t){(t==null||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function W(e,t){if(e){if(typeof e=="string")return S(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);if(r==="Object"&&e.constructor&&(r=e.constructor.name),r==="Map"||r==="Set")return Array.from(e);if(r==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return S(e,t)}}function Q(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function E(e,t){return X(e)||V(e,t)||W(e,t)||Q()}var Z={root:function(t){var r=t.props,n=t.state;return _("p-avatar p-component",{"p-avatar-image":j.isNotEmpty(r.image)&&!n.imageFailed,"p-avatar-circle":r.shape==="circle","p-avatar-lg":r.size==="large","p-avatar-xl":r.size==="xlarge","p-avatar-clickable":!!r.onClick})},label:"p-avatar-text",icon:"p-avatar-icon"},ee=`
@layer primereact {
    .p-avatar {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        font-size: 1rem;
    }
    
    .p-avatar.p-avatar-image {
        background-color: transparent;
    }
    
    .p-avatar.p-avatar-circle {
        border-radius: 50%;
    }
    
    .p-avatar.p-avatar-circle img {
        border-radius: 50%;
    }
    
    .p-avatar .p-avatar-icon {
        font-size: 1rem;
    }
    
    .p-avatar img {
        width: 100%;
        height: 100%;
    }
    
    .p-avatar-clickable {
        cursor: pointer;
    }
}
`,b=B.extend({defaultProps:{__TYPE:"Avatar",className:null,icon:null,image:null,imageAlt:"avatar",imageFallback:"default",label:null,onImageError:null,shape:"square",size:"normal",style:null,template:null,children:void 0},css:{classes:Z,styles:ee}});function w(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),r.push.apply(r,n)}return r}function te(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?w(Object(r),!0).forEach(function(n){L(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):w(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}var A=i.forwardRef(function(e,t){var r=$(),n=i.useContext(q),a=b.getProps(e,n),l=i.useRef(null),u=i.useState(!1),c=E(u,2),o=c[0],f=c[1],v=i.useState(!1),O=E(v,2),I=O[0],N=O[1],y=b.setMetaData({props:a,state:{imageFailed:o,nested:I}}),d=y.ptm,h=y.cx,R=y.isUnstyled;H(b.css.styles,R,{name:"avatar"});var T=function(){if(j.isNotEmpty(a.image)&&!o){var p=r({src:a.image,onError:z},d("image"));return i.createElement("img",x({alt:a.imageAlt},p))}else if(a.label){var k=r({className:h("label")},d("label"));return i.createElement("span",k,a.label)}else if(a.icon){var D=r({className:h("icon")},d("icon"));return M.getJSXIcon(a.icon,te({},D),{props:a})}return null},z=function(p){a.imageFallback==="default"?a.onImageError||(f(!0),p.target.src=null):p.target.src=a.imageFallback,a.onImageError&&a.onImageError(p)};i.useEffect(function(){var g=U.isAttributeEquals(l.current.parentElement,"data-pc-name","avatargroup");N(g)},[]),i.useImperativeHandle(t,function(){return{props:a,getElement:function(){return l.current}}});var C=r({ref:l,style:a.style,className:_(a.className,h("root",{imageFailed:o}))},b.getOtherProps(a),d("root")),F=a.template?j.getJSXElement(a.template,a):T();return i.createElement("div",C,F,a.children)});A.displayName="Avatar";function ne(){const e=s.jsxs("div",{className:"flex flex-column align-items-center",children:[s.jsx(A,{image:J,size:"xlarge",shape:"circle"}),s.jsx("span",{className:"mt-3",children:"Grupo Prysmo"}),s.jsxs("div",{className:"sobre-footer-actions",children:[s.jsx("a",{href:"https://www.youtube.com/",target:"_blank",rel:"noreferrer",children:s.jsx(P,{label:"YouTube",icon:"pi pi-youtube",className:"p-button-help"})}),s.jsx("a",{href:"https://pt-br.facebook.com/",target:"_blank",rel:"noreferrer",children:s.jsx(P,{label:"Facebook",icon:"pi pi-facebook",className:"p-button-help"})})]})]});return s.jsx("div",{className:"sobre flex justify-content-center align-items-center",children:s.jsxs(G,{title:"Grupo Prysmo",footer:e,children:[s.jsxs("section",{children:[s.jsx("h2",{children:"Visao Geral"}),s.jsxs("p",{children:["O grupo é composto por ",s.jsx("b",{children:"Agatha Liz, Isabela Santiago, Thalles Henrique, Júlia Rodrigues e Yasmin de Jesus"}),". Todos cursando o técnico de desenvolvimento de sistemas no último ano."]})]}),s.jsxs("section",{children:[s.jsx("h2",{children:"Tecnologias Utilizadas"}),s.jsxs("ul",{children:[s.jsx("li",{children:"React.Native"}),s.jsx("li",{children:"Mysql e PHP"}),s.jsx("li",{children:"Trello e notion"})]})]}),s.jsxs("section",{children:[s.jsx("h2",{children:"Funcionalidades Principais"}),s.jsx("p",{children:"O aplicativo surgiu da realidade enfrentada pelos os idosos no dia a dia, que cada vez mais tecnológica transforma tarefas básicas, antes feitas de maneira fisica para o ambiente digital, tornando esse grupo que muitas vezes sente dificuldade com essas aplicações a serem inseridos na sociedade."})]})]})})}export{ne as default};
