"use client";

import { useEffect, useState } from "react";

const ClientComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/data");

      if (response.ok) {
        const data = await response.json();
        setData(data);
      } else {
        console.error("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <p>hello</p>
      <p>{data}</p>
    </div>
  );
};
export default ClientComponent;
