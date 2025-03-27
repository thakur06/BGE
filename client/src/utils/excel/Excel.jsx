import React from "react";
import * as XLSX from "xlsx";

const TableToExcel = () => {
  // Sample table data (replace with your actual data source)
  const tableData = [
    ["Product", "Step", "Detail"],
    ["Valve A", "Step 1", "Detail 1"],
    ["Valve B", "Step 2", "Detail 2"],
    ["Valve C", "Step 3", "Detail 3"],
  ];

  const exportToExcel = () => {
    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Convert table data to worksheet
    const ws = XLSX.utils.aoa_to_sheet(tableData);

    // Bold the header row
    const headerRange = XLSX.utils.decode_range("A1:C1"); // Range for first row (headers)
    for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col }); // Row 0 (header)
      if (!ws[cellAddress]) ws[cellAddress] = { t: "s", v: tableData[0][col] };
      ws[cellAddress].s = {
        font: { bold: true },
        fill: { fgColor: { rgb: "E6E6E6" } }, // Light gray background for headers
      };
    }

    // Optional: Add some basic styling
    ws["!cols"] = [
      { wch: 20 }, // Product column width
      { wch: 15 }, // Step column width
      { wch: 25 }, // Detail column width
    ];

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, "Process Data");

    // Generate Excel file and trigger download
    XLSX.writeFile(wb, `Biogas-process-data_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-amber-800 mb-4">
        Table to Excel Export
      </h1>

      {/* Display Table */}
      <table className="w-full border-collapse mb-6">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2 text-left">Product</th>
            <th className="border p-2 text-left">Step</th>
            <th className="border p-2 text-left">Detail</th>
          </tr>
        </thead>
        <tbody>
          {tableData.slice(1).map((row, index) => (
            <tr key={index}>
              <td className="border p-2">{row[0]}</td>
              <td className="border p-2">{row[1]}</td>
              <td className="border p-2">{row[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Export Button */}
      <button
        onClick={exportToExcel}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Export to Excel
      </button>
    </div>
  );
};

export default TableToExcel;