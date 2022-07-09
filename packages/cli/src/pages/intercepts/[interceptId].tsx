import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Intercept from "../../components/Intercept";

const ShowIntercept = () => {
  const { query } = useRouter();
  console.log("query", query);
  const [data, setData] = useState<Intercept>({ html: "" });
  const fetchData = async () => {
    const res = await fetch(`/intercepts/${query.interceptId}.json`);
    console.log("res", res);
    setData(await res.json());
  };
  useEffect(() => {
    if (query.interceptId) fetchData();
  }, [query.interceptId]);

  return <Intercept data={data} />;
};

export default ShowIntercept;
