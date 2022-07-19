import React from "react";

type MjmlErrorsProps = {
  errors: Array<MjmlError>;
};

const MjmlErrors: React.FC<MjmlErrorsProps> = ({ errors }) => {
  return (
    <>
      <div className="container">
        <div className="mjmlErrors">
          <h1>MJML Errors</h1>
          <div className="subhead">
            Please resolve the following MJML errors in your email to continue:
          </div>
          <ul>
            {errors.map((error, i) => (
              <li className="code" key={`error${i}`}>
                {error.formattedMessage}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <style jsx>{`
        .container {
          padding: 32px;
        }
        .mjmlErrors {
          padding: 38px 32px 32px;
          max-width: 720px;
          margin: auto;
          border-radius: 4px;
          box-shadow: 2px 4px 16px 2px rgba(0, 0, 0, 0.1);
          border-top: solid 8px #f59c9c;
        }
        h1 {
          font-weight: 400;
          margin: 0;
        }
        .subhead {
          padding: 12px 0;
          font-size: 16px;
          line-height: 120%;
        }
        ul {
          background: #eee;
          padding: 0px 16px;
          border-radius: 2px;
        }
        li {
          list-style-type: none;
          padding: 16px 0;
          margin: 0;
          text-indent: 0;
        }
        .code {
          font-family: menlo, monospace;
        }
      `}</style>
    </>
  );
};

export default MjmlErrors;
