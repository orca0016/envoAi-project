import { useContext, useEffect, useState } from "react";
import { DialogContext } from "../context/DialogContext";
import Swal from "sweetalert2";
import { CloseIcon, TrashIcon } from "./icons";

const ShowEntryDataInformation = ({ entryDataId }) => {
  const [entries, setEntries] = useState([]);
  const { setIsDialogOpen, currentDataId , setCurrentDataId } = useContext(DialogContext);

  useEffect(() => {
    const savedData = localStorage.getItem("userEntries");
    if (savedData) {
      try {
        setEntries(JSON.parse(savedData));
      } catch (error) {
        console.error("Error loading data:", error);
      }
    }

    //when i create a new user entry data and try to open modal this dependency help to  get new data from localstorage.
  }, [currentDataId]);

  useEffect(() => {
    if (entries.length > 0) {
      localStorage.setItem("userEntries", JSON.stringify(entries));
    }
  }, [entries]);

  const exactDataEntry = entries.find((item) => item.id === entryDataId);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setEntries((prev) => {
          const updated = prev.filter((entry) => entry.id !== id);
          localStorage.setItem("userEntries", JSON.stringify(updated));
          return updated;
        });
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        setCurrentDataId(-1)
        setIsDialogOpen(false);
      }
    });
  
  };
  const handleCloseModal = () => {
    setIsDialogOpen(false);
  };

  return (
    <div>
      <h2>User Information Detail:</h2>
      <br />
      <div>
        <b>Fullname: </b>
        <span>{exactDataEntry?.name}</span>
      </div>
      <div>
        <b>Email: </b>
        <span>{exactDataEntry?.email}</span>
      </div>
      <div>
        <b>Department: </b>
        <span>{exactDataEntry?.department}</span>
      </div>
      <div>
        <b>Phone: </b>
        <span>{exactDataEntry?.phone}</span>
      </div>
      <div>
        <b>Added: </b>
        <span>{exactDataEntry?.timestamp}</span>
      </div>
      <br />
      <div className="action-buttons-modal-entry">
        <button onClick={() => handleDelete(exactDataEntry.id)} className="delete-btn-dialog">
          <TrashIcon />
        </button>
        <button
          onClick={() => handleCloseModal()}
          className="close-btn-dialog"
        >
          <CloseIcon/>
        </button>
      </div>
    </div>
  );
};

export default ShowEntryDataInformation;
