export default function BlogLayout({ children }) {
  return (
    <div className="container mx-auto px-4">
      <main className="mt-16">{children}</main>
    </div>
  );
}
