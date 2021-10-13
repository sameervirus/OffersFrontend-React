import PropTypes from "prop-types";
function Button({ title, classtitle, onClick, disabled }) {
  let titles = undefined;
  if (title.includes("fa")) {
    titles = `<i className="fas ${title}"></i>`;
  }
  return (
    <button
      type="button"
      className={`btn ${classtitle} me-2`}
      onClick={onClick}
      disabled={disabled}
    >
      {titles && <i className={`fas ${title}`}></i>}
      {!titles && title}
    </button>
  );
}

Button.defaultProps = {
  classtitle: "btn-primary",
  title: "Button",
  disabled: false,
};

Button.propTypes = {
  title: PropTypes.string,
  classtitle: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
