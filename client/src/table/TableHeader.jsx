// TableHeader.jsx
import PropTypes from "prop-types";

const TableHeader = ({ headers }) => {
  return (
    <thead className="bg-amber-800 text-white">
      <tr>
        {headers.map((header, index) => (
          <th
            key={index}
            className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider border-b border-amber-900"
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TableHeader;