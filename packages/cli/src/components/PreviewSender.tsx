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
  }, []);

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

        if (data.error) {
          setError(<>{data.error}</>);
        } else {
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
    [email]
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
          To start sending emails, you must configure a transport in
          email/index.tsx.{" "}
          <a href="https://github.com/psugihara/mailing">Learn more</a>
        </div>
      )}
      <form onSubmit={send}>
        <input
          aria-label="email"
          type="email"
          value={email || ""}
          onChange={onInputChange}
        />
        <input type="submit" value="Send" disabled={!email?.length} />
      </form>
      {error && <div className="error">{error}</div>}
      {sending && <div className="sending">Sending...</div>}
      {!sending && lastSendAt && (
        <div className="last-send">
          Sent at {lastSendAt?.toLocaleTimeString()}
        </div>
      )}
      <style jsx>{`
        .container {
          max-width: 320px;
          color: #fff;
        }
        a {
          color: #fff;
        }
        h3 {
          font-weight: 700;
          font-size: 16px;
        }
        .subtitle {
          font-size: 12px;
          margin-bottom: 12px;
        }
        .mono {
          font-face: menlo, monospace, sans-serif;
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
