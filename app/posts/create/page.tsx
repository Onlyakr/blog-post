import PostForm from "@/components/create-post-form";

const CreatePost = () => {
  return (
    <div className="flex flex-col gap-8 min-h-screen container mx-auto px-4 md:px-8">
      {/* Create Post Form */}
      <h1 className="text-2xl font-bold">Create Post</h1>
      <div className="flex justify-center">
        <PostForm />
      </div>
    </div>
  );
};
export default CreatePost;
