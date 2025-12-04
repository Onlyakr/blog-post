import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getPost } from "@/lib/post";

import ActionButton from "@/components/action-button";

const Posts = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const { title, content, category } = await getPost(id);

  return (
    <div className="flex flex-col gap-8 min-h-screen container mx-auto px-4 md:px-8">
      <h1 className="text-2xl font-bold">Post: {id}</h1>
      <div className="flex justify-center">
        <Card className="w-full sm:max-w-md">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Title: {title}</CardTitle>
              <ActionButton id={id} />
            </div>
            <CardDescription>Category : {category.name}</CardDescription>
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
