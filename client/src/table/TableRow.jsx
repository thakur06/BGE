// TableRow.jsx
import PropTypes from "prop-types";

const TableRow = ({ data }) => {
  return (
    <tbody>
      {data.map((row, rowIndex) => (
        <tr
          key={rowIndex}
          className="border-b border-gray-200 hover:bg-gray-100 transition-colors"
        >
          {row.map((cell, cellIndex) => (
            <td
              key={cellIndex}
              className="px-6 py-4 text-gray-800 text-sm whitespace-nowrap"
            >
              {cell}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

TableRow.propTypes = {
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.node)).isRequired,
};

export default TableRow;