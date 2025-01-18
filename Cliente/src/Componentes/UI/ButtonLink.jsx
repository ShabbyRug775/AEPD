import { Link } from "react-router-dom";

export const ButtonLink = ({ to, children }) => (
  <Link to={to} className="bg-lime-950 m-1 p-3 rounded-md text-lime-100 font-bold hover:bg-lime-500 hover:text-lime-950">
    {children}
  </Link>
);