// Table.jsx
import PropTypes from "prop-types";

const Table = ({ children, className = "" }) => {
  return (
    <div className="overflow-x-auto">
      <table
        className={`min-w-full bg-white border border-gray-200 shadow-md rounded-lg ${className}`}
      >
        {children}
      </table>
    </div>
  );
};

Table.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Table;