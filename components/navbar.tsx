import Link from "next/link";

const Navbar = () => {
  return (
    <header className="h-16 border-b mb-12">
      <nav className="container mx-auto flex items-center justify-center h-full gap-8">
        <Link href="/">posts</Link>

        <Link href="/posts/create">create</Link>
      </nav>
    </header>
  );
};
export default Navbar;
