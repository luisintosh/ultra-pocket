import { Link, Outlet } from "react-router-dom";

function Root() {
  return (
    <div>
      <h1>Root</h1>
      <Link to={"about"}>About</Link>
      <Outlet />
    </div>
  );
}

export default Root;
