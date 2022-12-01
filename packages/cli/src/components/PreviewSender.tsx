import React, { useCallback, useEffect, useState } from "react";

type PreviewSenderProps = {
  previewFunction: string;
  previewClass: string;
};

const PreviewSender: React.FC<PreviewSenderProps> = ({
  previewFunction,
  previewClass,
}) => {
  const [email, setEmail] = useState<string | null>(null);
  const [error, setError] = useState<React.ReactElement | null>(null);
  const [lastSendAt, setLastSentAt] = useState<Date | null>(null);
  const [sending, setSending] = useState<boolean>(false);

  useEffect(() => {
    setEmail(window.localStorage.getItem("previewSenderEmail"));
    const lastSent = window.localStorage.getItem("previewSenderLastSentAt");
    if (lastSent) setLastSentAt(new Date(lastSent));
  }, []);

  const send: React.FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();

      if (!email) return;

      window.localStorage.setItem("previewSenderEmail", email);
      try {
        setError(null);
        setSending(true);
        const payload: SendPreviewRequestBody = {
          to: email,
          previewFunction,
          previewClass,
        };

        const response = await fetch("/api/previews/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        let data: SendPreviewResponseBody | undefined;
        let errorLoadingJson = false;

        try {
          data = await response.json();
        } catch (e) {
          console.error("response body was", response.body);
          errorLoadingJson = true;
        }

        if (errorLoadingJson || data?.error || response.status >= 300) {
          setLastSentAt(null);
          setError(<>{data?.error || "Unknown error, check your console"}</>);
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
    [previewClass, previewFunction, email]
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
          className="text-sm p-2 border-neutral-600 border-[1px] border-r-0 rounded-l-sm bg-gray-700 text-white outline-none hover:border-[#bbb] focus:border-[#bbb] placeholder:text-color-[#aaa] min-w-[216px] max-h-[38px]"
        />
        <input
          type="submit"
          value="Send"
          disabled={!email?.length}
          className="text-sm border-none p-[9px] rounded-r-sm cursor-pointer bg-[#fff] text-black hover:bg-white"
        />
      </form>
      {error && (
        <div className="error break-words max-w-[288px]">
          <span className="text-amber-300">⚠</span> {error}
        </div>
      )}
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
