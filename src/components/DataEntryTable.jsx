import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { DialogContext } from "../context/DialogContext";
import "./DataEntryTable.css";
import { MoreInfoIcon } from "./icons";

function DataEntryTable() {
  const { setCurrentDataId, setIsDialogOpen, currentDataId } =
    useContext(DialogContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    phone: "",
  });

  const [entries, setEntries] = useState([]);

  useEffect(() => {
    if (currentDataId !== -1) return;
    const savedData = localStorage.getItem("userEntries");
    if (savedData) {
      try {
        setEntries(JSON.parse(savedData));
      } catch (error) {
        console.error("Error loading data:", error);
      }
    }
  }, [currentDataId]);

  useEffect(() => {
    if (entries.length > 0) {
      localStorage.setItem("userEntries", JSON.stringify(entries));
    }
  }, [entries]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.department ||
      !formData.phone
    ) {
      alert("Please fill in all fields");
      return;
    }

    const newEntry = {
      ...formData,
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
    };

    setEntries((prev) => [...prev, newEntry]);

    setFormData({
      name: "",
      email: "",
      department: "",
      phone: "",
    });
  };
  const handleShowDetail = (id) => {
    setCurrentDataId(id);
    setIsDialogOpen(true);
  };

  const handleClearAll = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, clear it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setEntries([]);
        localStorage.removeItem("userEntries");
        Swal.fire({
          title: "data is cleared!",
          text: "Your list  has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="data-entry-container">
      <h3>User Data Entry Form</h3>
      <p className="subtitle">Enter 4 parameters and save to local database</p>

      <form onSubmit={handleSubmit} className="entry-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            className="form-input"
            placeholder="Enter name"
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            className="form-input"
            placeholder="Enter email"
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="department">Department:</label>
          <input
            type="text"
            id="department"
            name="department"
            className="form-input"
            value={formData.department}
            onChange={handleInputChange}
            placeholder="Enter department"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            className="form-input"
            placeholder="Enter phone"
            onChange={handleInputChange}
          />
        </div>

        <button type="submit">Add Entry</button>
      </form>

      <div className="entries-section">
        <div className="entries-header">
          <h4>Saved Entries ({entries.length})</h4>
          {entries.length > 0 && (
            <button onClick={handleClearAll} className="clear-btn">
              Clear All
            </button>
          )}
        </div>

        {entries.length === 0 ? (
          <p className="no-entries">No entries yet. Add some data above.</p>
        ) : (
          <table className="entries-table">
            <thead>
              <tr>
                <th>Name</th>
                <th data-desktop="true">Email</th>
                <th data-desktop="true">Phone</th>
                <th style={{ width: "100px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.name}</td>
                  <td data-desktop="true">{entry.email}</td>
                  <td data-desktop="true">{entry.phone}</td>
                  <td className="action-buttons-modal-entry">
                    <button
                      onClick={() => handleShowDetail(entry.id)}
                      className="close-btn"
                    >
                      <MoreInfoIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default DataEntryTable;
