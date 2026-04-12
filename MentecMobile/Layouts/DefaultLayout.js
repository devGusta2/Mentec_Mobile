import NavBar from "../components/Navbar";

export default function DefaultLayout({ children }) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}