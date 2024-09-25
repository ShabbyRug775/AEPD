import { Link } from "react-router-dom";

export const ButtonLink = ({ to, children }) => (
  <Link to={to} className="bg-lime-400 px-4 py-1 rounded-md text-lime-950">
    {children}
  </Link>
);