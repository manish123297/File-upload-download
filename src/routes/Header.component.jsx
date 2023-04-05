import { Link, Outlet } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div style={{ backgroundColor: "#afaff1", padding: "10px" }}>
        <h1>File Upload And Download</h1>
        <div style={{ backgroundColor: "darkblue", padding: "10px" }}>
          <Link
            style={{
              color: "whitesmoke",
              marginLeft: "20px",
              textDecoration: "none",
            }}
            to="/"
          >
            HOME
          </Link>
          <Link
            style={{
              color: "whitesmoke",
              marginLeft: "20px",
              textDecoration: "none",
            }}
            to="lists"
          >
            FILE LIST
          </Link>
        </div>
      </div>
      <Outlet></Outlet>
    </>
  );
};

export default Header;
