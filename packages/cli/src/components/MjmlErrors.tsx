import React from "react";

type MjmlErrorsProps = {
  errors: Array<MjmlError>;
};

const MjmlErrors: React.FC<MjmlErrorsProps> = ({ errors }) => {
  return (
    <>
      <div className="mjmlErrors">
        <h1>MJML Errors</h1>
        <div>
          Please resolve the following MJML errors in your email before
          continuing
        </div>
        <ul>
          {errors.map((error, i) => (
            <li key={`error${i}`}>{error.formattedMessage}</li>
          ))}
        </ul>
      </div>
      <style jsx>{`
        .mjmlErrors {
          padding: 100px;
          background: red;
          color: white;
        }
      `}</style>
    </>
  );
};

export default MjmlErrors;
