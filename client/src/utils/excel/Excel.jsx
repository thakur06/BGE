import React from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const TableToExcel = () => {
  const tableData = [
    ["Product", "Step", "Detail"],
    ["Valve A", "Step 1", "Detail 1"],
    ["Valve B", "Step 2", "Detail 2"],
    ["Valve C", "Step 3", "Detail 3"],
  ];

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Process Data");

    // 1. Add image
    const imageUrl = "/biogas_logo.jpg"; // Make sure logo.png is inside public/
    const response = await fetch(imageUrl);
    const imageBlob = await response.blob();
    const imageBuffer = await imageBlob.arrayBuffer();

    const imageId = workbook.addImage({
      buffer: imageBuffer,
      extension: "jpg",
    });

    worksheet.addImage(imageId, {
      tl: { col: 0, row: 0 },
      ext: { width: 150, height: 80 },
    });

    // 2. Add table data starting from row 5 (leave space for image)
    tableData.forEach((row, rowIndex) => {
      const excelRow = worksheet.getRow(rowIndex + 6);
      row.forEach((cell, colIndex) => {
        const excelCell = excelRow.getCell(colIndex + 1);
        excelCell.value = cell;

        // Header row styling
        if (rowIndex === 0) {
          excelCell.font = { bold: true };
          excelCell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFE6E6E6" }, // Light gray
          };
          excelCell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
        }
      });
      excelRow.commit();
    });

    // 3. Set column widths
    worksheet.columns = [
      { width: 20 }, // Product
      { width: 15 }, // Step
      { width: 25 }, // Detail
    ];

    // 4. Generate and download file
    const buffer = await workbook.xlsx.writeBuffer();
    const excelBlob = new Blob([buffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(
      excelBlob,
      `Biogas-process-data_${new Date().toISOString().slice(0, 10)}.xlsx`
    );
  };

  return (
    <div className="p-4 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold text-amber-800 mb-4">
        Styled Excel Export (with Image)
      </h1>

      {/* Table Preview */}
      <table className="w-full border-collapse mb-6">
        <thead>
          <tr className="bg-gray-200 font-bold">
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

      <button
        onClick={exportToExcel}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-blue-600 transition"
      >
        Export to Excel
      </button>
    </div>
  );
};

export default TableToExcel;
