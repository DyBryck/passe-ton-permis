import { useLocation } from "react-router";
import AddNoteIcon from "./base/AddNoteIcon";
import HouseIcon from "./base/HouseIcon";
import ProfileIcon from "./base/ProfileIcon";

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="fixed bottom-0 flex h-14 w-full items-center justify-evenly bg-gray-100">
      <HouseIcon selected={currentPath === "/app/accueil"} />
      <AddNoteIcon selected={currentPath === "/app/ajouter-une-note"} />
      <ProfileIcon selected={currentPath === "/app/profile"} />
    </nav>
  );
};

export default Navbar;
