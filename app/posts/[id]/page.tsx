import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import ActionButton from "@/components/action-button";

export const getPost = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/posts/${id}`);
  const post = await res.json();
  return post;
};

const Posts = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const { title, content } = await getPost(id);

  return (
    <div className="flex flex-col gap-8 min-h-screen container mx-auto px-4 md:px-8">
      <h1 className="text-2xl font-bold">Post: {id}</h1>
      <div className="flex justify-center">
        <Card className="w-full sm:max-w-md">
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Title: {title}</CardTitle>
            <ActionButton id={id} />
          </CardHeader>
          <CardContent>
            <p>Content: {content}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default Posts;
