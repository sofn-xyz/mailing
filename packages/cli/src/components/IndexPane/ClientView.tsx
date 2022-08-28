import Link from "next/link";

type ClientViewProps = {
  previews: [string, string[]][];
};

const ClientView: React.FC<ClientViewProps> = ({ previews }) => {
  return (
    <>
      Client view
      {previews.map((preview) => (
        <div className="email-group" key={preview[0]}>
          <h2>{preview[0]}</h2>
          {preview[1].map((previewFunction) => (
            <div className="email-container" key={previewFunction}>
              <Link
                key={previewFunction}
                href={`/previews/${preview[0]}/${previewFunction}`}
                shallow
              >
                <a className="email">{previewFunction}</a>
              </Link>
            </div>
          ))}
        </div>
      ))}
      <style jsx>{`
        .email-group {
          margin: auto;
          display: block;
          padding: 32px;
        }
      `}</style>
    </>
  );
};

export default ClientView;
