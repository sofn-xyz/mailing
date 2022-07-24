"use strict";
exports.id = 120;
exports.ids = [120];
exports.modules = {

/***/ 2991:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ components_Header)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "next/dist/shared/lib/styled-jsx"
var styled_jsx_ = __webpack_require__(7561);
var styled_jsx_default = /*#__PURE__*/__webpack_require__.n(styled_jsx_);
// EXTERNAL MODULE: ../../node_modules/next/link.js
var next_link = __webpack_require__(9097);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "react-tiny-popover"
var external_react_tiny_popover_ = __webpack_require__(7076);
;// CONCATENATED MODULE: ./src/components/Tooltip.tsx




const Tooltip = ({ content , trigger  })=>{
    const { 0: show , 1: setShow  } = (0,external_react_.useState)(false);
    const handleEsc = (0,external_react_.useCallback)((event)=>{
        if (event.key === "Escape") setShow(false);
    }, []);
    (0,external_react_.useEffect)(()=>{
        document.addEventListener("keydown", handleEsc, false);
        return function cleanup() {
            document.removeEventListener("keydown", handleEsc, false);
        };
    }, []);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(external_react_tiny_popover_.Popover, {
                onClickOutside: ()=>setShow(false),
                isOpen: show,
                positions: [
                    "bottom",
                    "left"
                ],
                content: ({ position , childRect , popoverRect  })=>/*#__PURE__*/ jsx_runtime_.jsx(external_react_tiny_popover_.ArrowContainer // if you'd like an arrow, you can import the ArrowContainer!
                    , {
                        position: position,
                        childRect: childRect,
                        popoverRect: popoverRect,
                        arrowColor: "#333",
                        arrowSize: 6,
                        className: "popover-arrow-container",
                        arrowClassName: "popover-arrow",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "jsx-15582e1f462d57b8" + " " + "popover",
                            children: content
                        })
                    }),
                padding: 4,
                children: trigger(show, setShow)
            }),
            show && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                onClick: ()=>setShow(false),
                className: "jsx-15582e1f462d57b8" + " " + "overlay"
            }),
            jsx_runtime_.jsx((styled_jsx_default()), {
                id: "15582e1f462d57b8",
                children: ".popover.jsx-15582e1f462d57b8{background:#333;color:white;-webkit-border-radius:2px;-moz-border-radius:2px;border-radius:2px;padding:16px;margin-right:24px}.overlay.jsx-15582e1f462d57b8{position:absolute;top:65px;right:0;left:0;bottom:0;opacity:0}"
            })
        ]
    });
};
/* harmony default export */ const components_Tooltip = (Tooltip);

;// CONCATENATED MODULE: ./src/components/PreviewSender.tsx



const PreviewSender = ({ html , previewFunction , previewClass ,  })=>{
    const { 0: email , 1: setEmail  } = useState(null);
    const { 0: error , 1: setError  } = useState(null);
    const { 0: lastSendAt , 1: setLastSentAt  } = useState(null);
    const { 0: sending , 1: setSending  } = useState(false);
    useEffect(()=>{
        if (!email) {
            setEmail(window.localStorage.getItem("previewSenderEmail"));
            const lastSent = window.localStorage.getItem("previewSenderLastSentAt");
            if (lastSent) {
                setLastSentAt(new Date(lastSent));
            }
        }
    }, []);
    const send = useCallback(async (e)=>{
        e.preventDefault();
        if (!email) return;
        window.localStorage.setItem("previewSenderEmail", email);
        try {
            setSending(true);
            const payload = {
                to: email,
                html,
                previewFunction,
                previewClass,
                subject: `${previewClass} - ${previewFunction}`
            };
            const response = await fetch("/previews/send.json", {
                method: "POST",
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            if (data.error || response.status >= 300) {
                setLastSentAt(null);
                setError(/*#__PURE__*/ _jsx(_Fragment, {
                    children: data.error || "Unknown error, check your console"
                }));
            } else {
                setError(null);
                const lastSent = new Date();
                setLastSentAt(lastSent);
                window.localStorage.setItem("previewSenderLastSentAt", lastSent.toJSON());
            }
        } catch (e1) {
            console.error(e1);
            setLastSentAt(null);
            window.localStorage.removeItem("previewSenderLastSentAt");
        } finally{
            setSending(false);
        }
    }, [
        email
    ]);
    const onInputChange = useCallback((e)=>{
        setEmail(e.target.value);
    }, []);
    return /*#__PURE__*/ _jsxs("div", {
        className: "jsx-cfe44b7f29885685" + " " + "container",
        children: [
            /*#__PURE__*/ _jsx("h3", {
                className: "jsx-cfe44b7f29885685",
                children: "Send a test email"
            }),
            !lastSendAt && /*#__PURE__*/ _jsxs("div", {
                className: "jsx-cfe44b7f29885685" + " " + "subtitle",
                children: [
                    "To start sending emails, you must configure a transport in",
                    " ",
                    /*#__PURE__*/ _jsx("span", {
                        className: "jsx-cfe44b7f29885685" + " " + "mono",
                        children: "emails/index.tsx"
                    }),
                    ".",
                    " ",
                    /*#__PURE__*/ _jsx("a", {
                        href: "https://github.com/successor-software/mailing#configure-transport",
                        className: "jsx-cfe44b7f29885685",
                        children: "Learn more"
                    })
                ]
            }),
            /*#__PURE__*/ _jsxs("form", {
                onSubmit: send,
                className: "jsx-cfe44b7f29885685",
                children: [
                    /*#__PURE__*/ _jsx("input", {
                        "aria-label": "email",
                        type: "email",
                        placeholder: "name@example.com",
                        value: email || "",
                        onChange: onInputChange,
                        className: "jsx-cfe44b7f29885685"
                    }),
                    /*#__PURE__*/ _jsx("input", {
                        type: "submit",
                        value: "Send",
                        disabled: !email?.length,
                        className: "jsx-cfe44b7f29885685"
                    })
                ]
            }),
            error && /*#__PURE__*/ _jsxs("div", {
                className: "jsx-cfe44b7f29885685" + " " + "error",
                children: [
                    "\u26A0 ",
                    error
                ]
            }),
            sending && /*#__PURE__*/ _jsx("div", {
                className: "jsx-cfe44b7f29885685" + " " + "sending",
                children: "Sending..."
            }),
            !sending && lastSendAt && /*#__PURE__*/ _jsxs("div", {
                className: "jsx-cfe44b7f29885685" + " " + "last-send",
                children: [
                    "\u2713 Sent at ",
                    lastSendAt?.toLocaleTimeString()
                ]
            }),
            _jsx(_JSXStyle, {
                id: "cfe44b7f29885685",
                children: '.container.jsx-cfe44b7f29885685{max-width:320px;padding-bottom:8px;color:#fff}.container.jsx-cfe44b7f29885685>*.jsx-cfe44b7f29885685{-webkit-font-smoothing:antialiased}form.jsx-cfe44b7f29885685{margin-bottom:8px}input.jsx-cfe44b7f29885685{font-size:14px;background:#333;color:#fff;line-height:120%;padding:8px;border:solid 1px#666;-webkit-border-top-left-radius:2px;-moz-border-radius-topleft:2px;border-top-left-radius:2px;-webkit-border-bottom-left-radius:2px;-moz-border-radius-bottomleft:2px;border-bottom-left-radius:2px}input[type="email"].jsx-cfe44b7f29885685{border-right:none}input[type="email"].jsx-cfe44b7f29885685:hover{outline:none;border:1px solid#bbb;border-right:none}input[type="email"].jsx-cfe44b7f29885685:focus{outline:none;border:1px solid#bbb;border-right:none}.jsx-cfe44b7f29885685::-webkit-input-placeholder{color:#aaa}.jsx-cfe44b7f29885685:-moz-placeholder{color:#aaa}.jsx-cfe44b7f29885685::-moz-placeholder{color:#aaa}.jsx-cfe44b7f29885685:-ms-input-placeholder{color:#aaa}.jsx-cfe44b7f29885685::-ms-input-placeholder{color:#aaa}.jsx-cfe44b7f29885685::placeholder{color:#aaa}input[type="submit"].jsx-cfe44b7f29885685{background-color:#fff;color:#000;font-size:12px;border:none;padding:10px 12px 11px;position:relative;top:-2px;border-image-width:0;-webkit-border-top-left-radius:0px;-moz-border-radius-topleft:0px;border-top-left-radius:0px;-webkit-border-bottom-left-radius:0px;-moz-border-radius-bottomleft:0px;border-bottom-left-radius:0px;-webkit-border-top-right-radius:2px;-moz-border-radius-topright:2px;border-top-right-radius:2px;-webkit-border-bottom-right-radius:2px;-moz-border-radius-bottomright:2px;border-bottom-right-radius:2px;-webkit-transition:box-shadow 200ms ease-out;-moz-transition:box-shadow 200ms ease-out;-o-transition:box-shadow 200ms ease-out;transition:box-shadow 200ms ease-out}input[type="submit"].jsx-cfe44b7f29885685:hover{cursor:pointer;background:#fafa98}input[type="submit"].jsx-cfe44b7f29885685:active{-webkit-box-shadow:inset 0 0 12px rgba(0,0,0,.75);-moz-box-shadow:inset 0 0 12px rgba(0,0,0,.75);box-shadow:inset 0 0 12px rgba(0,0,0,.75)}a.jsx-cfe44b7f29885685{-webkit-transition:background-color,-webkit-transform 200ms ease-out;-moz-transition:background-color,-moz-transform 200ms ease-out;-o-transition:background-color,-o-transform 200ms ease-out;transition:background-color,-webkit-transform 200ms ease-out;transition:background-color,-moz-transform 200ms ease-out;transition:background-color,-o-transform 200ms ease-out;transition:background-color,transform 200ms ease-out;display:inline-block;color:#fff}a.jsx-cfe44b7f29885685:hover{background:#fadf98;color:#333}a.jsx-cfe44b7f29885685:active{-webkit-transform:translateY(2px);-moz-transform:translateY(2px);-ms-transform:translateY(2px);-o-transform:translateY(2px);transform:translateY(2px)}h3.jsx-cfe44b7f29885685{font-weight:700;font-size:16px;margin:4px 0 12px}.subtitle.jsx-cfe44b7f29885685{font-size:12px;margin-top:-4px;margin-bottom:16px;line-height:130%;max-width:288px}.mono.jsx-cfe44b7f29885685{font-family:Menlo,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New,monospace}.error.jsx-cfe44b7f29885685,.sending.jsx-cfe44b7f29885685,.last-send.jsx-cfe44b7f29885685{font-size:12px}.sending.jsx-cfe44b7f29885685,.last-send.jsx-cfe44b7f29885685{color:#a4f59c}'
            })
        ]
    });
};
/* harmony default export */ const components_PreviewSender = ((/* unused pure expression or super */ null && (PreviewSender)));

;// CONCATENATED MODULE: ./src/components/Header.tsx





const Header = ({ title , previewFunction , previewClass , isMobile , setIsMobile , previous , next , helpContent ,  })=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        id: "header",
        className: "jsx-a03daa077c28fc20",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                href: "/",
                children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                    id: "index",
                    className: "jsx-a03daa077c28fc20",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                        className: "jsx-a03daa077c28fc20",
                        children: "Index"
                    })
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                id: "email-container",
                className: "jsx-a03daa077c28fc20",
                children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    id: "current",
                    className: "jsx-a03daa077c28fc20",
                    children: title
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                id: "utilities",
                className: "jsx-a03daa077c28fc20",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                        id: "desktop",
                        onClick: ()=>setIsMobile(false),
                        className: "jsx-a03daa077c28fc20",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                            className: "jsx-a03daa077c28fc20",
                            children: "Desktop"
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                        id: "mobile",
                        onClick: ()=>setIsMobile(true),
                        className: "jsx-a03daa077c28fc20",
                        children: "Mobile"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(components_Tooltip, {
                        trigger: (show, setShow)=>/*#__PURE__*/ jsx_runtime_.jsx("button", {
                                id: "help",
                                onClick: ()=>setShow((current)=>!current),
                                className: "jsx-a03daa077c28fc20",
                                children: show ? /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                    className: "jsx-a03daa077c28fc20" + " " + "close",
                                    children: "\xd7"
                                }) : "?"
                            }),
                        content: helpContent
                    }),
                     false && /*#__PURE__*/ 0
                ]
            }),
            jsx_runtime_.jsx((styled_jsx_default()), {
                id: "a03daa077c28fc20",
                children: "#header.jsx-a03daa077c28fc20{height:64px;border-bottom:solid 1px#ccc;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;padding:0 22px 0 24px;-webkit-font-smoothing:antialiased}#index.jsx-a03daa077c28fc20{font-size:14px}#email-container.jsx-a03daa077c28fc20,#utilities.jsx-a03daa077c28fc20,#index.jsx-a03daa077c28fc20{-webkit-box-flex:1;-webkit-flex:1;-moz-box-flex:1;-ms-flex:1;flex:1}button.jsx-a03daa077c28fc20{background:#fff;height:40px;font-size:12px;border:solid 1px#ccc;padding:12px;-webkit-transition:background-color,box-shadow 200ms ease-out;-moz-transition:background-color,box-shadow 200ms ease-out;-o-transition:background-color,box-shadow 200ms ease-out;transition:background-color,box-shadow 200ms ease-out;line-height:1;text-align:center}a.jsx-a03daa077c28fc20{-webkit-transition:background-color,-webkit-transform 200ms ease-out;-moz-transition:background-color,-moz-transform 200ms ease-out;-o-transition:background-color,-o-transform 200ms ease-out;transition:background-color,-webkit-transform 200ms ease-out;transition:background-color,-moz-transform 200ms ease-out;transition:background-color,-o-transform 200ms ease-out;transition:background-color,transform 200ms ease-out}a.jsx-a03daa077c28fc20:hover span.jsx-a03daa077c28fc20,button.jsx-a03daa077c28fc20:hover{cursor:pointer;background:#fafa98}button.jsx-a03daa077c28fc20:active{-webkit-box-shadow:inset 0 0 12px rgba(0,0,0,.5);-moz-box-shadow:inset 0 0 12px rgba(0,0,0,.5);box-shadow:inset 0 0 12px rgba(0,0,0,.5)}a.jsx-a03daa077c28fc20:active{-webkit-transform:translateY(2px);-moz-transform:translateY(2px);-ms-transform:translateY(2px);-o-transform:translateY(2px);transform:translateY(2px)}#email-container.jsx-a03daa077c28fc20{text-align:center}#current.jsx-a03daa077c28fc20{font-size:14px}#utilities.jsx-a03daa077c28fc20{text-align:end}#desktop.jsx-a03daa077c28fc20{margin-right:0;border-right:none;-webkit-border-top-left-radius:2px;-moz-border-radius-topleft:2px;border-top-left-radius:2px;-webkit-border-bottom-left-radius:2px;-moz-border-radius-bottomleft:2px;border-bottom-left-radius:2px}#mobile.jsx-a03daa077c28fc20{margin-right:0;margin-left:0;-webkit-border-top-right-radius:2px;-moz-border-radius-topright:2px;border-top-right-radius:2px;-webkit-border-bottom-right-radius:2px;-moz-border-radius-bottomright:2px;border-bottom-right-radius:2px}#help.jsx-a03daa077c28fc20{margin-right:6px;margin-left:8px}#help.jsx-a03daa077c28fc20,#send.jsx-a03daa077c28fc20{width:40px;-webkit-border-radius:100%;-moz-border-radius:100%;border-radius:100%;line-height:10px}#send.jsx-a03daa077c28fc20{margin:0}#send.jsx-a03daa077c28fc20 img.jsx-a03daa077c28fc20{position:relative;top:1px}.close.jsx-a03daa077c28fc20{font-size:16px;line-height:10px;position:relative;left:1px}@media(max-width:768px){#desktop.jsx-a03daa077c28fc20,#mobile.jsx-a03daa077c28fc20,#help.jsx-a03daa077c28fc20{display:none}#email-container.jsx-a03daa077c28fc20{-webkit-box-flex:6;-webkit-flex:6;-moz-box-flex:6;-ms-flex:6;flex:6}}"
            })
        ]
    });
};
/* harmony default export */ const components_Header = (Header);


/***/ }),

/***/ 4782:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ components_HotIFrame)
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
// EXTERNAL MODULE: external "react-hotkeys-hook"
var external_react_hotkeys_hook_ = __webpack_require__(2784);
;// CONCATENATED MODULE: ./src/components/hooks/usePreviewHotkeys.tsx



// Hotkeys for pages showing previews / intercepts
// Listen for hotkeys on the document and the iframe's
// document, so that they still work if iframe has focus.
function usePreviewHotkeys({ setIsMobile  }) {
    const router = (0,router_.useRouter)();
    const handleKey = (0,external_react_.useCallback)((e)=>{
        if (e.key === "/") {
            router.push("/");
        } else if (e.key === "m") {
            setIsMobile(true);
        } else if (e.key === "d") {
            setIsMobile(false);
        } else if (e.key === ".") {
            setIsMobile((current)=>!current);
        } else if (e.key === "ArrowRight" || e.key === "right") {} else if (e.key === "ArrowLeft" || e.key === "left") {}
    }, [
        router
    ]);
    (0,external_react_hotkeys_hook_.useHotkeys)("m,d,.,left,right,/", handleKey);
    const iframeRef = (0,external_react_.useCallback)((node)=>{
        if (null === node) return;
        node.onload = function onLoad() {
            const doc = node?.contentWindow?.document;
            doc?.addEventListener("keydown", handleKey);
        };
    }, [
        handleKey
    ]);
    return {
        iframeRef
    };
};

;// CONCATENATED MODULE: ./src/components/HotIFrame.tsx




const HotIFrame = ({ isMobile , setIsMobile , src , srcDoc ,  })=>{
    const { iframeRef  } = usePreviewHotkeys({
        setIsMobile
    });
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "jsx-29604b2be0f078fd" + " " + `frame ${isMobile ? " mobile" : ""}`,
                children: /*#__PURE__*/ jsx_runtime_.jsx("iframe", {
                    src: src,
                    srcDoc: srcDoc,
                    ref: iframeRef,
                    className: "jsx-29604b2be0f078fd"
                })
            }),
            jsx_runtime_.jsx((styled_jsx_default()), {
                id: "29604b2be0f078fd",
                children: ".frame.jsx-29604b2be0f078fd{margin:auto;display:block}.mobile.frame.jsx-29604b2be0f078fd{padding:64px 16px 74px;max-width:324px;-webkit-border-radius:32px;-moz-border-radius:32px;border-radius:32px;margin:64px auto}.mobile.jsx-29604b2be0f078fd iframe.jsx-29604b2be0f078fd{height:568px;max-width:320px}iframe.jsx-29604b2be0f078fd{width:100%;border:none;height:-webkit-calc(100vh - 65px);height:-moz-calc(100vh - 65px);height:calc(100vh - 65px)}.mobile.jsx-29604b2be0f078fd,.mobile.jsx-29604b2be0f078fd iframe.jsx-29604b2be0f078fd{border:2px solid#ccc}"
            })
        ]
    });
};
/* harmony default export */ const components_HotIFrame = (HotIFrame);


/***/ })

};
;