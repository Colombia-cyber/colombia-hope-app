import { Link } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/chat", label: "Chat" },
  { to: "/debate", label: "Debate" },
  { to: "/survey", label: "Survey" },
  { to: "/news", label: "News" }
];

function Navbar() {
  return (
    <nav className="bg-white bg-opacity-70 backdrop-blur-md sticky top-0 z-50 shadow flex items-center justify-between px-6 py-3">
      <span className="font-bold text-xl">Colombia Hope</span>
      <div className="flex gap-4">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="hover:text-blue-600 transition font-medium"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;