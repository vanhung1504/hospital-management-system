import Header from "~/components/Header";

function MainLayout({ title, children }) {
  return (
    <>
      <Header moduleName={title} />
      <main className="mt-5">{children}</main>
    </>
  );
}

export default MainLayout;
