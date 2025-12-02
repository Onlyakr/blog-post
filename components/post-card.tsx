import type { Post } from "./posts-list";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const PostCard = ({ title, content }: Post) => {
  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Title: {title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Content: {content}</p>
      </CardContent>
    </Card>
  );
};
export default PostCard;
