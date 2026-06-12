import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useLazyGetPDFQuery,
  useLazyGetCSVQuery,
} from "../redux/reportsApi";
import styles from "../style/dashboard.module.css";

export default function Dashboard() {
  const [selected, setSelected] = useState("pdf"); 
  const [getPDF, { isFetching: isPdfFetching }] = useLazyGetPDFQuery();
  const [getCSV, { isFetching: isCsvFetching }] = useLazyGetCSVQuery();
  const navigate = useNavigate();

  const downloadPDF = async () => {
    try {
      const result = await getPDF().unwrap();
      const url = window.URL.createObjectURL(result);
      const a = document.createElement("a");
      a.href = url;
      a.download = "report.pdf";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("PDF failed");
    }
  };

  const downloadCSV = async () => {
    try {
      const result = await getCSV().unwrap();
      const url = window.URL.createObjectURL(result);
      const a = document.createElement("a");
      a.href = url;
      a.download = "report.csv";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("CSV failed");
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      sessionStorage.clear();

      navigate("/", { replace: true });
    } catch (err) {
      console.error("Logout failed", err);
      navigate("/", { replace: true });
    }
  };

  return (
    <div className={styles.dashboard}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h1 className={styles.logo}>Dashboard</h1>
        </div>
        <nav className={styles.nav}>
          <button
            type="button"
            className={`${styles.navLink} ${
              selected === "pdf" ? styles.active : ""
            }`}
            onClick={() => setSelected("pdf")}
          >
            Download PDF
          </button>
          <button
            type="button"
            className={`${styles.navLink} ${
              selected === "csv" ? styles.active : ""
            }`}
            onClick={() => setSelected("csv")}
          >
            Download CSV
          </button>
        </nav>
        <div className={styles.sidebarFooter}>
          <span className={styles.version}>v1.0</span>
        </div>
      </aside>
      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.headerTop}>
            <h2 className={styles.title}>
              {selected === "pdf" && "PDF Report"}
              {selected === "csv" && "CSV Report"}
            </h2>
            <button
              type="button"
              className={styles.logoutButton}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </header>
        <section className={styles.content}>
          {selected === "pdf" && (
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>PDF Report</h3>
              <p className={styles.cardText}>
                Click the button below to download the report as a PDF file.
              </p>
              <button
                type="button"
                className={styles.primaryButton}
                onClick={downloadPDF}
                disabled={isPdfFetching}
              >
                {isPdfFetching ? "Preparing..." : "Download PDF"}
              </button>
            </div>
          )}

          {selected === "csv" && (
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>CSV Report</h3>
              <p className={styles.cardText}>
                Click the button below to download the report as a CSV file.
              </p>
              <button
                type="button"
                className={styles.primaryButton}
                onClick={downloadCSV}
                disabled={isCsvFetching}
              >
                {isCsvFetching ? "Preparing..." : "Download CSV"}
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}