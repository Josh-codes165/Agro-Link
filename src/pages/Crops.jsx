import { useState, useEffect } from "react";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";
import "../styles/Dashboard.css";

function Crops() {
  const farmerName =
    localStorage.getItem("farmerName") || "Farmer";

  const storageKey = `crops_${farmerName}`;

  const [crops, setCrops] = useState(() => {
    const savedCrops = localStorage.getItem(storageKey);

    if (!savedCrops) {
      return [];
    }

    try {
      return JSON.parse(savedCrops);
    } catch {
      return [];
    }
  });

  const [showForm, setShowForm] = useState(false);

  const [newCrop, setNewCrop] = useState({
    name: "",
    quantity: "",
    price: "",
    status: "Active",
  });

  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem(
      storageKey,
      JSON.stringify(crops)
    );
  }, [crops, storageKey]);

  /* =========================
     LISTING COUNTS
  ========================= */

  const activeListings = crops.filter(
    (crop) => crop.status === "Active"
  ).length;

  const inactiveListings = crops.filter(
    (crop) => crop.status === "Inactive"
  ).length;


  /* =========================
     ADD / UPDATE CROP
  ========================= */

  const handleAddCrop = () => {
    if (
      !newCrop.name.trim() ||
      !newCrop.quantity.trim() ||
      !newCrop.price.trim()
    ) {
      alert(
        "Please fill in the crop, quantity and price."
      );

      return;
    }

    if (editingIndex !== null) {
      const updatedCrops = [...crops];

      updatedCrops[editingIndex] = {
        ...updatedCrops[editingIndex],
        ...newCrop,
        name: newCrop.name.trim(),
        quantity: newCrop.quantity.trim(),
        price: newCrop.price.trim(),
      };

      setCrops(updatedCrops);
      setEditingIndex(null);
    } else {
      setCrops([
        ...crops,
        {
          ...newCrop,
          name: newCrop.name.trim(),
          quantity: newCrop.quantity.trim(),
          price: newCrop.price.trim(),
          views: 0,
          requests: 0,
        },
      ]);
    }

    setNewCrop({
      name: "",
      quantity: "",
      price: "",
      status: "Active",
    });

    setShowForm(false);
  };


  /* =========================
     DELETE CROP
  ========================= */

  const handleDeleteCrop = (indexToDelete) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this crop?"
    );

    if (!confirmDelete) return;

    setCrops(
      crops.filter(
        (_, index) => index !== indexToDelete
      )
    );
  };


  /* =========================
     EDIT CROP
  ========================= */

  const handleEditCrop = (index) => {
    setNewCrop({
      name: crops[index].name || "",
      quantity: crops[index].quantity || "",
      price: crops[index].price || "",
      status: crops[index].status || "Active",
    });

    setEditingIndex(index);
    setShowForm(true);
  };


  /* =========================
     OPEN ADD FORM
  ========================= */

  const openAddForm = () => {
    setEditingIndex(null);

    setNewCrop({
      name: "",
      quantity: "",
      price: "",
      status: "Active",
    });

    setShowForm(true);
  };


  /* =========================
     PAGE
  ========================= */

  return (
    <div className="listings-page">

      {/* =========================
          PAGE HEADER
      ========================= */}

      <div className="topbar">

        <div>
          <h2>My Listings</h2>

          <p>
            Manage and keep track of all your
            crops in one place.
          </p>
        </div>

        <button
          className="add-btn"
          onClick={openAddForm}
        >
          <FiPlus />
          Add New Listing
        </button>

      </div>


      {/* =========================
          SUMMARY CARDS
      ========================= */}

      <div className="listing-summary">

        <div className="listing-summary-card">
          <span>Total Listings</span>

          <h2>
            {crops.length}
          </h2>
        </div>


        <div className="listing-summary-card">
          <span>Active</span>

          <h2>
            {activeListings}
          </h2>
        </div>


        <div className="listing-summary-card">
          <span>Inactive</span>

          <h2>
            {inactiveListings}
          </h2>
        </div>

      </div>


      {/* =========================
          ADD / EDIT FORM
      ========================= */}

      {showForm && (
        <div className="crop-form">

          <h3>
            {editingIndex !== null
              ? "Edit Listing"
              : "Add New Listing"}
          </h3>


          <div className="form-grid">

            {/* Crop Name */}

            <input
              type="text"
              placeholder="Crop Name"
              value={newCrop.name}
              onChange={(e) =>
                setNewCrop({
                  ...newCrop,
                  name: e.target.value,
                })
              }
            />


            {/* Quantity */}

            <input
              type="text"
              placeholder="Quantity e.g. 500kg"
              value={newCrop.quantity}
              onChange={(e) =>
                setNewCrop({
                  ...newCrop,
                  quantity: e.target.value,
                })
              }
            />


            {/* Price */}

            <input
              type="text"
              placeholder="Price e.g. ₦250,000"
              value={newCrop.price}
              onChange={(e) =>
                setNewCrop({
                  ...newCrop,
                  price: e.target.value,
                })
              }
            />


            {/* Status */}

            <select
              value={newCrop.status}
              onChange={(e) =>
                setNewCrop({
                  ...newCrop,
                  status: e.target.value,
                })
              }
            >
              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>
            </select>

          </div>


          {/* FORM BUTTONS */}

          <div className="form-buttons">

            <button
              className="add-btn"
              onClick={handleAddCrop}
            >
              {editingIndex !== null
                ? "Update Listing"
                : "Save Listing"}
            </button>


            <button
              className="cancel-btn"
              onClick={() => {
                setShowForm(false);
                setEditingIndex(null);

                setNewCrop({
                  name: "",
                  quantity: "",
                  price: "",
                  status: "Active",
                });
              }}
            >
              Cancel
            </button>

          </div>

        </div>
      )}


      {/* =========================
          LISTINGS TABLE
      ========================= */}

      <div className="recent-activities listings-card">

        <div className="section-header">

          <h2>
            Crop Listings
          </h2>

          <span className="listing-count">
            {crops.length}{" "}

            {crops.length === 1
              ? "listing"
              : "listings"}
          </span>

        </div>


        <div className="table-wrapper">

          <table className="crop-table">

            <thead>

              <tr>

                <th>Crop</th>

                <th>Quantity</th>

                <th>Price</th>

                <th>Status</th>

                <th>Actions</th>

              </tr>

            </thead>


            <tbody>

              {/* EMPTY STATE */}

              {crops.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="empty-state"
                  >
                    <strong>
                      No listings yet
                    </strong>

                    <br />

                    Start adding your crops
                    to make them available
                    to buyers.
                  </td>

                </tr>

              ) : (

                /* CROP LISTINGS */

                crops.map((crop, index) => (

                  <tr key={index}>

                    <td>
                      <strong>
                        {crop.name}
                      </strong>
                    </td>


                    <td>
                      {crop.quantity}
                    </td>


                    <td>
                      {crop.price}
                    </td>


                    <td>

                      <span
                        className={
                          crop.status === "Active"
                            ? "status-active"
                            : "status-inactive"
                        }
                      >
                        {crop.status}
                      </span>

                    </td>


                    <td>

                      {/* EDIT */}

                      <button
                        className="edit-btn"
                        onClick={() =>
                          handleEditCrop(index)
                        }
                        title="Edit listing"
                      >
                        <FiEdit2 />
                      </button>


                      {/* DELETE */}

                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDeleteCrop(index)
                        }
                        title="Delete listing"
                      >
                        <FiTrash2 />
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Crops;