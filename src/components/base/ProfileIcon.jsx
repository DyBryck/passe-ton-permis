import { Link } from "react-router";

const ProfileIcon = ({ selected }) => {
  return (
    <Link to={"/app/profile"}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`lucide lucide-house-icon ${selected && "text-[rgb(var(--primary))]"} lucide-house h-6`}
      >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    </Link>
  );
};

export default ProfileIcon;
