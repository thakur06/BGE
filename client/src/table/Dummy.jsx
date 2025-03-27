// ExampleTable.jsx
import Table from "./Table";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

const ExampleTable = () => {
  const headers = ["Name", "Role", "Status"];
  const data = [
    ["John Doe", "Engineer", "Active"],
    ["Jane Smith", "Manager", "Inactive"],
    ["Bob Johnson", "Technician", "Active"],
  ];

  return (
    <Table>
      <TableHeader headers={headers} />
      <TableRow data={data} />
    </Table>
  );
};

export default ExampleTable;