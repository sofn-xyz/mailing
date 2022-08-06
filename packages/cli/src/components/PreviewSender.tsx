import React, { useCallback, useEffect, useState } from "react";

type PreviewSenderProps = {
  html?: string;
  previewFunction?: string;
  previewClass?: string;
};

const PreviewSender: React.FC<PreviewSenderProps> = ({
  html,
  previewFunction,
  previewClass,
}) => {
  const [email, setEmail] = useState<string | null>(null);
  const [error, setError] = useState<React.ReactElement | null>(null);
  const [lastSendAt, setLastSentAt] = useState<Date | null>(null);
  const [sending, setSending] = useState<boolean>(false);

  useEffect(() => {
    if (!email) {
      setEmail(window.localStorage.getItem("previewSenderEmail"));
      const lastSent = window.localStorage.getItem("previewSenderLastSentAt");
      if (lastSent) {
        setLastSentAt(new Date(lastSent));
      }
    }
  }, [email]);

  const send: React.FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();

      if (!email) return;

      window.localStorage.setItem("previewSenderEmail", email);
      try {
        setSending(true);
        const payload: SendPreviewRequestBody = {
          to: email,
          html,
          previewFunction,
          previewClass,
          subject: `${previewClass} - ${previewFunction}`,
        };
        const response = await fetch("/previews/send.json", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        const data: SendPreviewResponseBody = await response.json();

        if (data.error || response.status >= 300) {
          setLastSentAt(null);
          setError(<>{data.error || "Unknown error, check your console"}</>);
        } else {
          setError(null);
          const lastSent = new Date();
          setLastSentAt(lastSent);
          window.localStorage.setItem(
            "previewSenderLastSentAt",
            lastSent.toJSON()
          );
        }
      } catch (e) {
        console.error(e);
        setLastSentAt(null);
        window.localStorage.removeItem("previewSenderLastSentAt");
      } finally {
        setSending(false);
      }
    },
    [html, previewClass, previewFunction, email]
  );

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    []
  );

  return (
    <div className="container">
      <h3>Send a test email</h3>
      {!lastSendAt && (
        <div className="subtitle">
          To start sending emails, you must configure a transport in{" "}
          <span className="mono">emails/index.tsx</span>.{" "}
          <a href="https://github.com/sofn-xyz/mailing#configure-transport">
            Learn more
          </a>
        </div>
      )}
      <form onSubmit={send}>
        <input
          aria-label="email"
          type="email"
          placeholder="name@example.com"
          value={email || ""}
          onChange={onInputChange}
        />
        <input type="submit" value="Send" disabled={!email?.length} />
      </form>
      {error && <div className="error">⚠ {error}</div>}
      {sending && <div className="sending">Sending...</div>}
      {!sending && lastSendAt && (
        <div className="last-send">
          ✓ Sent at {lastSendAt?.toLocaleTimeString()}
        </div>
      )}
      <style jsx>{`
        .container {
          max-width: 320px;
          padding-bottom: 8px;
          color: #fff;
        }
        .container > * {
          -webkit-font-smoothing: antialiased;
        }
        form {
          margin-bottom: 8px;
        }
        input {
          font-size: 14px;
          background: #333;
          color: #fff;
          line-height: 120%;
          padding: 8px;
          border: solid 1px #666;
          border-top-left-radius: 2px;
          border-bottom-left-radius: 2px;
        }
        input[type="email"] {
          border-right: none;
          width: 74%;
        }
        input[type="email"]:hover {
          outline: none;
          border: 1px solid #bbb;
          border-right: none;
        }
        input[type="email"]:focus {
          outline: none;
          border: 1px solid #bbb;
          border-right: none;
        }
        ::placeholder {
          color: #aaa;
        }
        input[type="submit"] {
          background-color: #fff;
          width: 20%;
          color: #000;
          font-size: 12px;
          border: none;
          padding: 11px 12px 14px;
          position: relative;
          top: -2px;
          border-image-width: 0;
          border-top-left-radius: 0px;
          border-bottom-left-radius: 0px;
          border-top-right-radius: 2px;
          border-bottom-right-radius: 2px;
          transition: box-shadow 200ms ease-out;
        }
        input[type="submit"]:hover {
          cursor: pointer;
          background: #e4ebfa;
        }
        input[type="submit"]:active {
          box-shadow: inset 0 0 12px rgba(0, 0, 0, 0.75);
        }
        a {
          transition: background-color, transform 200ms ease-out;
          display: inline-block;
          color: #fff;
        }
        a:hover {
          background: #fadf98;
          color: #333;
        }
        a:active {
          transform: translateY(2px);
        }
        h3 {
          font-weight: 700;
          font-size: 16px;
          margin: 4px 0 12px;
        }
        .subtitle {
          font-size: 12px;
          margin-top: -4px;
          margin-bottom: 16px;
          line-height: 130%;
          max-width: 288px;
        }
        .error,
        .sending,
        .last-send {
          font-size: 12px;
        }
        .sending,
        .last-send {
          color: #a4f59c;
        }
      `}</style>
    </div>
  );
};

export default PreviewSender;
