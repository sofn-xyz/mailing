type MjmlErrorsProps = {
  errors: Array<MjmlError>;
};

const MjmlErrors: React.FC<MjmlErrorsProps> = ({ errors }) => {
  return (
    <div className="bg-red font-white p-24">
      <h1>MJML Errors</h1>
      <div>
        Please resolve the following MJML errors in your email before continuing
      </div>
      <ul>
        {errors.map((error, i) => (
          <li key={`error${i}`}>{error.formattedMessage}</li>
        ))}
      </ul>
    </div>
  );
};

export default MjmlErrors;
