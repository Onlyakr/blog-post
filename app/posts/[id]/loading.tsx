import { Spinner } from "@/components/ui/spinner";

const Loading = () => {
  return (
    <div className="flex justify-center items-center gap-2 mt-16">
      <Spinner />
      <span>Loading...</span>
    </div>
  );
};
export default Loading;
