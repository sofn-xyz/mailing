"use strict";
(() => {
var exports = {};
exports.id = 405;
exports.ids = [405];
exports.modules = {

/***/ 8830:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "getStaticProps": () => (/* binding */ getStaticProps)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_dist_shared_lib_styled_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7561);
/* harmony import */ var next_dist_shared_lib_styled_jsx__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_dist_shared_lib_styled_jsx__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9097);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);




const getStaticProps = async (context)=>{
    let previews = [];
    if (true) {
        const res = await fetch("http://localhost:3883/previews.json");
        previews = await res.json();
    }
    return {
        props: {
            previews
        }
    };
};
const Home = ({ previews: initialPreviews  })=>{
    const { 0: previews , 1: setPreviews  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)( true ? initialPreviews : 0);
    const fetchData = async ()=>{
        const res = await fetch("/previews.json");
        setPreviews(await res.json());
    };
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        if ( false || !initialPreviews) fetchData();
    }, []);
    if (!previews) {
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}); // loading, should be quick bc everything is local
    }
    const showNullState = previews.length === 0 || previews.length === 2 && previews[0][0] === "TextEmail.tsx" && previews[1][0] === "Welcome.tsx";
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "jsx-24b3b7d07ca3a572",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "jsx-24b3b7d07ca3a572" + " " + "container",
                children: [
                    showNullState && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                        src: "https://s3.amazonaws.com/lab.campsh.com/mailing-lil%402x.png",
                        width: "76",
                        height: "16",
                        className: "jsx-24b3b7d07ca3a572" + " " + "eyebrow"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                        className: "jsx-24b3b7d07ca3a572",
                        children: "Previews"
                    }),
                    showNullState && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "jsx-24b3b7d07ca3a572" + " " + "null-sub",
                        children: [
                            "Build new email templates in ",
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                className: "jsx-24b3b7d07ca3a572" + " " + "code",
                                children: "emails"
                            }),
                            ". Add previews to ",
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                className: "jsx-24b3b7d07ca3a572" + " " + "code",
                                children: "emails/previews"
                            }),
                            " and they'll appear below."
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("hr", {
                        className: "jsx-24b3b7d07ca3a572"
                    }),
                    previews.map((preview)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "jsx-24b3b7d07ca3a572" + " " + "email-group",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h2", {
                                    className: "jsx-24b3b7d07ca3a572",
                                    children: [
                                        "\u25CF ",
                                        preview[0]
                                    ]
                                }),
                                preview[1].map((previewFunction)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "jsx-24b3b7d07ca3a572" + " " + "email-container",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                            href: `/previews/${preview[0]}/${previewFunction}`,
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                className: "jsx-24b3b7d07ca3a572" + " " + "email",
                                                children: previewFunction
                                            })
                                        }, previewFunction)
                                    }, previewFunction))
                            ]
                        }, preview[0]))
                ]
            }),
            !showNullState && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                href: "https://github.com/successor-software/mailing",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                    target: "_blank",
                    className: "jsx-24b3b7d07ca3a572" + " " + "footer",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                        src: "https://s3.amazonaws.com/lab.campsh.com/mailing-lil%402x.png",
                        width: "76",
                        height: "16",
                        className: "jsx-24b3b7d07ca3a572"
                    })
                })
            }),
            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_dist_shared_lib_styled_jsx__WEBPACK_IMPORTED_MODULE_1___default()), {
                id: "24b3b7d07ca3a572",
                children: ".container.jsx-24b3b7d07ca3a572{max-width:472px;margin:64px auto 64px;padding:64px 64px 32px;-webkit-border-radius:16px;-moz-border-radius:16px;border-radius:16px;border:1px dotted#000;-webkit-font-smoothing:antialiased}.eyebrow.jsx-24b3b7d07ca3a572{margin-bottom:40px}h1.jsx-24b3b7d07ca3a572{font-size:36px;font-weight:700;margin:0 0 16px;line-height:122%}.null-sub.jsx-24b3b7d07ca3a572{font-size:20px;max-width:380px;line-height:120%;padding:0 0 16px;line-height:140%}hr.jsx-24b3b7d07ca3a572{border-top:1px dotted#000;border-bottom:none;margin:24px 0 36px}h2.jsx-24b3b7d07ca3a572{font-size:20px;line-height:120%;margin-bottom:8px}.code.jsx-24b3b7d07ca3a572{background-color:#ddd;padding:0 2px;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;font-weight:700;font-family:menlo,monospace}.email-group.jsx-24b3b7d07ca3a572{margin-bottom:32px}.email-container.jsx-24b3b7d07ca3a572{margin-bottom:8px}a.email.jsx-24b3b7d07ca3a572{-webkit-transition:background-color,-webkit-transform 200ms ease-out;-moz-transition:background-color,-moz-transform 200ms ease-out;-o-transition:background-color,-o-transform 200ms ease-out;transition:background-color,-webkit-transform 200ms ease-out;transition:background-color,-moz-transform 200ms ease-out;transition:background-color,-o-transform 200ms ease-out;transition:background-color,transform 200ms ease-out;display:inline-block}a.email.jsx-24b3b7d07ca3a572:hover{background:#fafa98}a.email.jsx-24b3b7d07ca3a572:active{-webkit-transform:translateY(2px);-moz-transform:translateY(2px);-ms-transform:translateY(2px);-o-transform:translateY(2px);transform:translateY(2px)}.footer.jsx-24b3b7d07ca3a572{display:block;text-align:center}.footer.jsx-24b3b7d07ca3a572 img.jsx-24b3b7d07ca3a572{margin-top:-40px;margin-bottom:64px}@media(max-width:600px){.container.jsx-24b3b7d07ca3a572{border:none;padding:32px}}"
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Home);


/***/ }),

/***/ 3280:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4406:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/page-path/denormalize-page-path.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 299:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-next-pathname-info.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 5789:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-next-pathname-info.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 4567:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/path-has-prefix.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 7561:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/styled-jsx");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [88,97], () => (__webpack_exec__(8830)));
module.exports = __webpack_exports__;

})();