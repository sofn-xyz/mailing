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
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [lastSendAt, setLastSentAt] = useState<Date | null>(null);

  useEffect(() => {
    if (!email) {
      setEmail(window.localStorage.getItem("previewSenderEmail"));
    }
  }, []);

  const send: React.FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();

      if (!email) return;

      window.localStorage.setItem("previewSenderEmail", email);
      try {
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
          setError(data.error);
        } else {
          setLastSentAt(new Date());
          setShowSuccess(true);
          setTimeout(() => {
            setShowSuccess(false);
          }, 1000);
        }
      } catch (e) {
        console.error(e);
        setError("Something went wrong, check the console");
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
    <>
      Send a preview
      <form onSubmit={send}>
        <input
          aria-label="email"
          type="email"
          value={email || ""}
          onChange={onInputChange}
        />
        <input type="submit" value="Send" disabled={!email?.length} />
      </form>
      {showSuccess && <div>Success! Check your email.</div>}
      {error && <div className="error">{error}</div>}
      {lastSendAt && <div>Sent at {lastSendAt?.toLocaleTimeString()}</div>}
      <style jsx>{`
        .error {
          color: red;
        }
      `}</style>
    </>
  );
};

export default PreviewSender;
