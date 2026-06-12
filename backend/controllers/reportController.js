import PDFDocument from "pdfkit";
import { Parser } from "json2csv";

const data = [
  { name: "Christian", role: "user" },
  { name: "Admin", role: "admin" },
  { name: "Test User", role: "user" },
];

export const generatePDF = (req, res) => {
  const doc = new PDFDocument();

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=report.pdf");

  doc.pipe(res);

  doc.fontSize(20).text("User Report");

  data.forEach((d) => {
    doc.text(`${d.name} - ${d.role}`);
  });

  doc.end();
};

export const generateCSV = (req, res) => {
  const parser = new Parser();
  const csv = parser.parse(data);

  res.header("Content-Type", "text/csv");
  res.attachment("report.csv");
  res.send(csv);
};