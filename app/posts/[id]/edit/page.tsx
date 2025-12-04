import { getPost } from "@/lib/post";

import EditPostForm from "@/components/edit-post-form";

const EditPost = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const { title, content, category } = await getPost(id);

  return (
    <div className="flex flex-col gap-8 min-h-screen container mx-auto px-4 md:px-8">
      {/* Edit Post Form */}
      <h1 className="text-2xl font-bold">Edit Post : {id}</h1>
      <div className="flex justify-center">
        <EditPostForm
          postId={Number(id)}
          initialData={{ title, content, category }}
        />
      </div>
    </div>
  );
};
export default EditPost;
