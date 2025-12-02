import { Spinner } from "./ui/spinner";

const Loader = ({ message }: { message?: string }) => {
  return (
    <div className="flex items-center gap-2 justify-center">
      <Spinner />
      <p>{message || "Loading..."}</p>
    </div>
  );
};
export default Loader;
