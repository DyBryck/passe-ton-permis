const Layout = ({ children }) => {
  return (
    <main id="scrollable-container" className="flex-1 overflow-y-auto pb-14">
      {children}
    </main>
  );
};

export default Layout;
