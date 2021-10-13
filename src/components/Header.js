import Button from "./Button";
const Header = ({ loginUser }) => {
  const onClick = () => {
    localStorage.removeItem("user");
    loginUser(false);
  };

  return (
    <header className="p-3 bg-dark text-white">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a
            href="/"
            className="d-flex align-items-center mb-2 mb-lg-0 me-md-auto text-white text-decoration-none"
          >
            ARCONS Offer System
          </a>

          <div className="text-end">
            <Button
              classtitle="btn-outline-danger"
              title="Logout"
              onClick={onClick}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
