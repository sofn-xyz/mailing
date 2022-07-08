import { GetServerSideProps } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";

const Home = () => {
  const [previews, setPreviews] = useState<[string, string[]][] | null>(null);
  const fetchData = async () => {
    const res = await fetch("/previews.json");
    setPreviews(await res.json());
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (!previews) {
    return <></>;
  }
  const showNullState =
    previews.length === 0 ||
    (previews.length === 1 && previews[0][0] === "MyFirstEmail.tsx");

  return (
    <div>
      <h1>Previews</h1>
      {showNullState && (
        <div>
          Build emails in <span className="code">emails/previews</span> and
          they’ll appear below.
        </div>
      )}
      {previews.map((preview) => (
        <div key={preview[0]}>
          <h2>{preview[0]}</h2>
          {preview[1].map((previewFunction) => (
            <div key={previewFunction}>
              <Link href={`/previews/${preview[0]}/${previewFunction}`}>
                {previewFunction}
              </Link>
            </div>
          ))}
        </div>
      ))}
      <style jsx>{`
        h1 {
          font-size: 48px;
          font-weight: 700;
        }
        h2 {
          font-size: 20px;
        }
        .code {
          background-color: #ddd;
          padding: 0 6px;
          border-radius: 3px;
          font-weight: 700;
          font-family: menlo, monospace;
        }
      `}</style>
    </div>
  );
};

export default Home;
