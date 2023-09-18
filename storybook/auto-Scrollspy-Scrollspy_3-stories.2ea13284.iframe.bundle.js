/*! For license information please see auto-Scrollspy-Scrollspy_3-stories.2ea13284.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkboosted=self.webpackChunkboosted||[]).push([[3585],{"./node_modules/@mdx-js/react/lib/index.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{NF:function(){return withMDXComponents},Zo:function(){return MDXProvider},ah:function(){return useMDXComponents},pC:function(){return MDXContext}});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({});function withMDXComponents(Component){return function boundMDXComponent(props){const allComponents=useMDXComponents(props.components);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component,{...props,allComponents:allComponents})}}function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((()=>"function"==typeof components?components(contextComponents):{...contextComponents,...components}),[contextComponents,components])}const emptyObject={};function MDXProvider({components:components,children:children,disableParentContext:disableParentContext}){let allComponents;return allComponents=disableParentContext?"function"==typeof components?components({}):components||emptyObject:useMDXComponents(components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},children)}},"./node_modules/@storybook/addon-docs/dist/blocks.mjs":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Xz:function(){return _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.Xz},oG:function(){return _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.oG}});var _storybook_client_logger__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("@storybook/client-logger"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs");(0,_storybook_client_logger__WEBPACK_IMPORTED_MODULE_0__.deprecate)("Import from '@storybook/addon-docs/blocks' is deprecated. Please import from '@storybook/blocks' instead.")},"./stories/auto/Scrollspy/Custom-MDX-Documentation.mdx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__("./node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js"),_Users_ju_Orange_Boosted_Bootstrap_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),_storybook_addon_docs_blocks__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@storybook/addon-docs/dist/blocks.mjs");function _createMdxContent(props){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_addon_docs_blocks__WEBPACK_IMPORTED_MODULE_2__.Xz,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_addon_docs_blocks__WEBPACK_IMPORTED_MODULE_2__.oG,{id:"components-scrollspy--scrollspy-0"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_addon_docs_blocks__WEBPACK_IMPORTED_MODULE_2__.Xz,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_addon_docs_blocks__WEBPACK_IMPORTED_MODULE_2__.oG,{id:"components-scrollspy--scrollspy-1"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_addon_docs_blocks__WEBPACK_IMPORTED_MODULE_2__.Xz,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_addon_docs_blocks__WEBPACK_IMPORTED_MODULE_2__.oG,{id:"components-scrollspy--scrollspy-2"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_addon_docs_blocks__WEBPACK_IMPORTED_MODULE_2__.Xz,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_addon_docs_blocks__WEBPACK_IMPORTED_MODULE_2__.oG,{id:"components-scrollspy--scrollspy-3"})})]})}__webpack_exports__.Z=function MDXContent(props={}){const{wrapper:MDXLayout}=Object.assign({},(0,_Users_ju_Orange_Boosted_Bootstrap_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim__WEBPACK_IMPORTED_MODULE_3__.ah)(),props.components);return MDXLayout?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MDXLayout,Object.assign({},props,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_createMdxContent,props)})):_createMdxContent()}},"./stories/auto/Scrollspy/Scrollspy_3.stories.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Scrollspy_3:function(){return Scrollspy_3},__namedExportsOrder:function(){return __namedExportsOrder}});var _Scrollspy_3$paramete,_Scrollspy_3$paramete2,_Custom_MDX_Documentation_mdx__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./stories/auto/Scrollspy/Custom-MDX-Documentation.mdx");__webpack_exports__.default={title:"Components/Scrollspy",parameters:{docs:{page:_Custom_MDX_Documentation_mdx__WEBPACK_IMPORTED_MODULE_0__.Z}}};const Scrollspy_3=()=>'<div class="bd-example m-0 border-0">\n  <div class="row">\n    <div class="col-4">\n      <div id="simple-list-example" class="d-flex flex-column gap-2 simple-list-example-scrollspy text-center">\n        <a class="p-1" href="#simple-list-item-1">Item 1</a>\n        <a class="p-1" href="#simple-list-item-2">Item 2</a>\n        <a class="p-1" href="#simple-list-item-3">Item 3</a>\n        <a class="p-1" href="#simple-list-item-4">Item 4</a>\n        <a class="p-1" href="#simple-list-item-5">Item 5</a>\n      </div>\n    </div>\n    <div class="col-8">\n      <div data-bs-spy="scroll" data-bs-target="#simple-list-example" data-bs-offset="0" data-bs-smooth-scroll="true" class="scrollspy-example" tabindex="0">\n        <h4 id="simple-list-item-1">Item 1</h4>\n        <p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It\'s repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>\n        <h4 id="simple-list-item-2">Item 2</h4>\n        <p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It\'s repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>\n        <h4 id="simple-list-item-3">Item 3</h4>\n        <p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It\'s repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>\n        <h4 id="simple-list-item-4">Item 4</h4>\n        <p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It\'s repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>\n        <h4 id="simple-list-item-5">Item 5</h4>\n        <p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It\'s repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>\n      </div>\n    </div>\n  </div>\n</div>\n<script type="text/javascript">\n  /* global boosted: false */\n  document.querySelectorAll(\'[href]\').forEach(link => {link.addEventListener(\'click\', event => {event.preventDefault()})})\n<\/script>';Scrollspy_3.parameters={...Scrollspy_3.parameters,docs:{...null==(_Scrollspy_3$paramete=Scrollspy_3.parameters)?void 0:_Scrollspy_3$paramete.docs,source:{originalSource:'() => `<div class="bd-example m-0 border-0">\n  <div class="row">\n    <div class="col-4">\n      <div id="simple-list-example" class="d-flex flex-column gap-2 simple-list-example-scrollspy text-center">\n        <a class="p-1" href="#simple-list-item-1">Item 1</a>\n        <a class="p-1" href="#simple-list-item-2">Item 2</a>\n        <a class="p-1" href="#simple-list-item-3">Item 3</a>\n        <a class="p-1" href="#simple-list-item-4">Item 4</a>\n        <a class="p-1" href="#simple-list-item-5">Item 5</a>\n      </div>\n    </div>\n    <div class="col-8">\n      <div data-bs-spy="scroll" data-bs-target="#simple-list-example" data-bs-offset="0" data-bs-smooth-scroll="true" class="scrollspy-example" tabindex="0">\n        <h4 id="simple-list-item-1">Item 1</h4>\n        <p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It\'s repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>\n        <h4 id="simple-list-item-2">Item 2</h4>\n        <p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It\'s repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>\n        <h4 id="simple-list-item-3">Item 3</h4>\n        <p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It\'s repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>\n        <h4 id="simple-list-item-4">Item 4</h4>\n        <p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It\'s repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>\n        <h4 id="simple-list-item-5">Item 5</h4>\n        <p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It\'s repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>\n      </div>\n    </div>\n  </div>\n</div>\n<script type="text/javascript">\n  /* global boosted: false */\n  document.querySelectorAll(\'[href]\').forEach(link => {link.addEventListener(\'click\', event => {event.preventDefault()})})\n<\/script>`',...null==(_Scrollspy_3$paramete2=Scrollspy_3.parameters)||null==(_Scrollspy_3$paramete2=_Scrollspy_3$paramete2.docs)?void 0:_Scrollspy_3$paramete2.source}}};const __namedExportsOrder=["Scrollspy_3"]},"./node_modules/react/cjs/react-jsx-runtime.production.min.js":function(__unused_webpack_module,exports,__webpack_require__){var f=__webpack_require__("./node_modules/react/index.js"),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,g){var b,d={},e=null,h=null;for(b in void 0!==g&&(e=""+g),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(h=a.ref),a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.Fragment=l,exports.jsx=q,exports.jsxs=q},"./node_modules/react/jsx-runtime.js":function(module,__unused_webpack_exports,__webpack_require__){module.exports=__webpack_require__("./node_modules/react/cjs/react-jsx-runtime.production.min.js")}}]);