import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Intercept from "../../components/Intercept";

const ShowIntercept = () => {
  const { query } = useRouter();
  const [data, setData] = useState<Intercept>({ html: "" });
  const fetchData = useCallback(async () => {
    const res = await fetch(`/intercepts/${query.interceptId}.json`);
    setData(await res.json());
  }, [query.interceptId]);
  useEffect(() => {
    if (query.interceptId) fetchData();
  }, [query.interceptId, fetchData]);

  return <Intercept data={data} />;
};

export default ShowIntercept;
