import type { Post } from "./posts-list";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const PostCard = ({ title, content, category }: Post) => {
  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Title: {title}</CardTitle>
        <CardDescription>Category : {category.name}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Content: {content}</p>
      </CardContent>
    </Card>
  );
};
export default PostCard;
