import { Suspense } from "react";

const ServerComponent = async () => {
  const data = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await data.json();

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>{posts}</Suspense>
    </div>
  );
};
export default ServerComponent;
