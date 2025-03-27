import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // Import autoTable separately
import logoImage from "../../assets/icons/biogas_logo.jpg"; // Your image file

const TableToPDF = () => {
  const generatePDF = () => {
    // Create new jsPDF instance
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Add a header
    doc.setFontSize(24);
    doc.setTextColor(40, 167, 69);
    doc.setFont("helvetica", "bold");
    doc.text("Process Section Report", 20, 20);

    // Add an image
    const img = new Image();
    img.src = logoImage;
    doc.addImage(img, "JPG", 20, 30, 50, 20);

    // Add some spacing
    doc.setFontSize(10);
    doc.setTextColor(40, 167, 69); // Green color (RGB: 40, 167, 69)
    doc.setFont("helvetica", "normal");
    doc.text(
      "Generated on: " + new Date().toLocaleDateString(),
      150, // x-position (right of logo: 20 + 50 + 10 spacing)
      40  // y-position (vertically centered with logo: 30 + 20/2)
    );
    // Table data
    const tableData = [
      ["Name", "Age", "City"],
      ["John", "25", "New York"],
      ["Jane", "30", "London"],
    ];

    // Add styled table using autoTable
    autoTable(doc, {
      startY: 70,
      head: [tableData[0]],
      body: tableData.slice(1),
      styles: {
        fontSize: 10,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [40, 167, 69],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240],
      },
      margin: { top: 70, left: 20, right: 20 },
    });

    // Add footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(100);
      doc.text(
        `Page ${i} of ${pageCount}`,
        doc.internal.pageSize.width / 2,
        doc.internal.pageSize.height - 10,
        { align: "center" }
      );
    }

    // Save the PDF
    doc.save("Biogas-Doc.pdf");
  };

  return (
    <div>
      <table id="myTable" border="1" className="border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th className="p-2">Age</th>
            <th className="p-2">City</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2">John</td>
            <td className="p-2">25</td>
            <td className="p-2">New York</td>
          </tr>
          <tr>
            <td className="p-2">Jane</td>
            <td className="p-2">30</td>
            <td className="p-2">London</td>
          </tr>
        </tbody>
      </table>

      <button
        onClick={generatePDF}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        Download as PDF
      </button>
    </div>
  );
};

export default TableToPDF;