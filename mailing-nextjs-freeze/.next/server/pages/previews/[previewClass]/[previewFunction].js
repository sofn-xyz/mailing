"use strict";
(() => {
var exports = {};
exports.id = 641;
exports.ids = [641];
exports.modules = {

/***/ 9087:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _previewFunction_),
  "getStaticPaths": () => (/* binding */ getStaticPaths),
  "getStaticProps": () => (/* binding */ getStaticProps)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "next/dist/shared/lib/styled-jsx"
var styled_jsx_ = __webpack_require__(7561);
var styled_jsx_default = /*#__PURE__*/__webpack_require__.n(styled_jsx_);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: ./src/components/Header.tsx + 2 modules
var Header = __webpack_require__(2991);
// EXTERNAL MODULE: ./src/components/HotIFrame.tsx + 1 modules
var HotIFrame = __webpack_require__(4782);
;// CONCATENATED MODULE: ./src/components/MjmlErrors.tsx



const MjmlErrors = ({ errors  })=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "jsx-b5ae4d8cd120b485" + " " + "mjmlErrors",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                        className: "jsx-b5ae4d8cd120b485",
                        children: "MJML Errors"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "jsx-b5ae4d8cd120b485",
                        children: "Please resolve the following MJML errors in your email before continuing"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("ul", {
                        className: "jsx-b5ae4d8cd120b485",
                        children: errors.map((error, i)=>/*#__PURE__*/ jsx_runtime_.jsx("li", {
                                className: "jsx-b5ae4d8cd120b485",
                                children: error.formattedMessage
                            }, `error${i}`))
                    })
                ]
            }),
            jsx_runtime_.jsx((styled_jsx_default()), {
                id: "b5ae4d8cd120b485",
                children: ".mjmlErrors.jsx-b5ae4d8cd120b485{padding:100px;background:red;color:white}"
            })
        ]
    });
};
/* harmony default export */ const components_MjmlErrors = (MjmlErrors);

;// CONCATENATED MODULE: ./src/pages/previews/[previewClass]/[previewFunction].tsx







const getStaticPaths = async ()=>{
    let paths = [];
    if (true) {
        const res = await fetch("http://localhost:3883/previews.json");
        const previews = await res.json();
        previews.forEach((previewClass)=>{
            paths = paths.concat(previewClass[1].map((previewFunction)=>({
                    params: {
                        previewClass: previewClass[0],
                        previewFunction
                    }
                })));
        });
    }
    return {
        paths,
        fallback: true
    };
};
const getStaticProps = async (context)=>{
    const { previewFunction , previewClass  } = context.params;
    const res = await fetch(`http://localhost:3883/previews/${previewClass}/${previewFunction}.json`);
    const initialData = await res.json();
    return {
        props: {
            initialData
        },
        revalidate: 1
    };
};
const Preview = ({ initialData  })=>{
    const router = (0,router_.useRouter)();
    const { 0: isMobile , 1: setIsMobile  } = (0,external_react_.useState)(false);
    const { 0: data , 1: setData  } = (0,external_react_.useState)( true ? initialData : 0);
    (0,external_react_.useEffect)(()=>{
        // TODO: exit if not in dev
        const fetchPreview = async ()=>{
            const response = await fetch(`${document.location.pathname}.json`);
            setData(await response.json());
        };
        const interval = window.setInterval(async function checkForReload() {
            const shouldReload = await fetch("/should_reload.json");
            const json = await shouldReload.json();
            if (json["shouldReload"]) {
                fetchPreview();
            }
        }, 1200);
        fetchPreview();
        return ()=>{
            window.clearInterval(interval);
        };
    }, []);
    const { previewClass , previewFunction  } = router.query;
    if (!(previewClass && previewFunction)) {
        return /*#__PURE__*/ jsx_runtime_.jsx("div", {
            children: "loading"
        });
    }
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: styled_jsx_default().dynamic([
            [
                "a2df3c5aa90edbc1",
                [
                    isMobile ? "320px" : "100%"
                ]
            ]
        ]),
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(Header/* default */.Z, {
                title: `${previewClass} - ${previewFunction}`,
                previewClass: previewClass,
                previewFunction: previewFunction,
                isMobile: isMobile,
                setIsMobile: setIsMobile,
                helpContent: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: styled_jsx_default().dynamic([
                                [
                                    "a2df3c5aa90edbc1",
                                    [
                                        isMobile ? "320px" : "100%"
                                    ]
                                ]
                            ]) + " " + "title",
                            children: "Hotkeys"
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: styled_jsx_default().dynamic([
                                [
                                    "a2df3c5aa90edbc1",
                                    [
                                        isMobile ? "320px" : "100%"
                                    ]
                                ]
                            ]) + " " + "hotkey",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                    className: styled_jsx_default().dynamic([
                                        [
                                            "a2df3c5aa90edbc1",
                                            [
                                                isMobile ? "320px" : "100%"
                                            ]
                                        ]
                                    ]) + " " + "character",
                                    children: "/"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                    className: styled_jsx_default().dynamic([
                                        [
                                            "a2df3c5aa90edbc1",
                                            [
                                                isMobile ? "320px" : "100%"
                                            ]
                                        ]
                                    ]) + " " + "description",
                                    children: "Jump to Index"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: styled_jsx_default().dynamic([
                                [
                                    "a2df3c5aa90edbc1",
                                    [
                                        isMobile ? "320px" : "100%"
                                    ]
                                ]
                            ]) + " " + "hotkey",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                    className: styled_jsx_default().dynamic([
                                        [
                                            "a2df3c5aa90edbc1",
                                            [
                                                isMobile ? "320px" : "100%"
                                            ]
                                        ]
                                    ]) + " " + "character",
                                    children: "."
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                    className: styled_jsx_default().dynamic([
                                        [
                                            "a2df3c5aa90edbc1",
                                            [
                                                isMobile ? "320px" : "100%"
                                            ]
                                        ]
                                    ]) + " " + "description",
                                    children: "Toggle desktop/mobile view"
                                })
                            ]
                        })
                    ]
                })
            }),
            !!data?.errors.length && /*#__PURE__*/ jsx_runtime_.jsx(components_MjmlErrors, {
                errors: data.errors
            }),
            data?.html && !data?.errors.length && /*#__PURE__*/ jsx_runtime_.jsx(HotIFrame/* default */.Z, {
                srcDoc: data.html,
                isMobile: isMobile,
                setIsMobile: setIsMobile
            }),
            jsx_runtime_.jsx((styled_jsx_default()), {
                id: "a2df3c5aa90edbc1",
                dynamic: [
                    isMobile ? "320px" : "100%"
                ],
                children: `iframe.__jsx-style-dynamic-selector{margin-top:8px;height:-webkit-calc(100vh - 50px);height:-moz-calc(100vh - 50px);height:calc(100vh - 50px);width:100%;max-width:${isMobile ? "320px" : "100%"};border:0}.title.__jsx-style-dynamic-selector{padding-bottom:4px}.title.__jsx-style-dynamic-selector,.character.__jsx-style-dynamic-selector{text-transform:uppercase;font-size:10px;line-height:100%}.hotkey.__jsx-style-dynamic-selector{font-size:12px;margin:12px 8px 0 0}.character.__jsx-style-dynamic-selector{color:#bbb;width:18px;height:18px;border:solid 1px#999;-webkit-border-radius:2px;-moz-border-radius:2px;border-radius:2px;text-align:center;margin-right:8px;display:inline-block;line-height:170%}.description.__jsx-style-dynamic-selector{position:relative;top:1.25px}`
            })
        ]
    });
};
/* harmony default export */ const _previewFunction_ = (Preview);


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

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 2784:
/***/ ((module) => {

module.exports = require("react-hotkeys-hook");

/***/ }),

/***/ 7076:
/***/ ((module) => {

module.exports = require("react-tiny-popover");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [88,97,120], () => (__webpack_exec__(9087)));
module.exports = __webpack_exports__;

})();