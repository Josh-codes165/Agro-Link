import { useState, useEffect } from "react";
import "../styles/Dashboard.css";

function Crops() {
  const [crops, setCrops] = useState(() => {
    const savedCrops = localStorage.getItem("crops");

    return savedCrops
      ? JSON.parse(savedCrops)
      : [
          {
            name: "Maize",
            farm: "Farm A",
            planting: "12 Aug 2026",
            harvest: "20 Nov 2026",
            status: "🌱 Growing",
          },
          {
            name: "Tomatoes",
            farm: "Farm B",
            planting: "02 Jul 2026",
            harvest: "18 Sep 2026",
            status: "🍅 Ready",
          },
          {
            name: "Rice",
            farm: "Farm C",
            planting: "15 Jun 2026",
            harvest: "30 Oct 2026",
            status: "🌾 Growing",
          },
        ];
  });

  const [showForm, setShowForm] = useState(false);

  const [newCrop, setNewCrop] = useState({
    name: "",
    farm: "",
    planting: "",
    harvest: "",
    status: "🌱 Growing",
  });

  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("crops", JSON.stringify(crops));
  }, [crops]);

  // Add or Update Crop
  const handleAddCrop = () => {
    if (
      !newCrop.name ||
      !newCrop.farm ||
      !newCrop.planting ||
      !newCrop.harvest
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (editingIndex !== null) {
      const updatedCrops = [...crops];
      updatedCrops[editingIndex] = newCrop;
      setCrops(updatedCrops);
      setEditingIndex(null);
    } else {
      setCrops([...crops, newCrop]);
    }

    setNewCrop({
      name: "",
      farm: "",
      planting: "",
      harvest: "",
      status: "🌱 Growing",
    });

    setShowForm(false);
  };

  // Delete Crop
  const handleDeleteCrop = (indexToDelete) => {
    const updatedCrops = crops.filter(
      (_, index) => index !== indexToDelete
    );

    setCrops(updatedCrops);

    if (editingIndex === indexToDelete) {
      setEditingIndex(null);
      setShowForm(false);
    }
  };

  // Edit Crop
  const handleEditCrop = (index) => {
    setNewCrop(crops[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  return (
    <main className="main-content">
      <div className="topbar">
        <div>
          <h2>🌾 Crops</h2>
          <p>Manage all your crops in one place.</p>
        </div>

        <button
          className="add-btn"
          onClick={() => {
            setEditingIndex(null);
            setNewCrop({
              name: "",
              farm: "",
              planting: "",
              harvest: "",
              status: "🌱 Growing",
            });
            setShowForm(true);
          }}
        >
          + Add Crop
        </button>
      </div>

      {showForm && (
        <div className="crop-form">
          <h3>
            {editingIndex !== null ? "Edit Crop" : "Add New Crop"}
          </h3>

          <input
            type="text"
            placeholder="Crop Name"
            value={newCrop.name}
            onChange={(e) =>
              setNewCrop({ ...newCrop, name: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Farm Name"
            value={newCrop.farm}
            onChange={(e) =>
              setNewCrop({ ...newCrop, farm: e.target.value })
            }
          />

          <input
            type="date"
            value={newCrop.planting}
            onChange={(e) =>
              setNewCrop({ ...newCrop, planting: e.target.value })
            }
          />

          <input
            type="date"
            value={newCrop.harvest}
            onChange={(e) =>
              setNewCrop({ ...newCrop, harvest: e.target.value })
            }
          />

          <select
            value={newCrop.status}
            onChange={(e) =>
              setNewCrop({ ...newCrop, status: e.target.value })
            }
          >
            <option>🌱 Growing</option>
            <option>🍅 Ready</option>
            <option>🌾 Harvested</option>
          </select>

          <button
            className="add-btn"
            onClick={handleAddCrop}
          >
            {editingIndex !== null ? "Update Crop" : "Save Crop"}
          </button>
        </div>
      )}

      <div className="recent-activities">
        <table className="crop-table">
          <thead>
            <tr>
              <th>Crop Name</th>
              <th>Farm</th>
              <th>Planting Date</th>
              <th>Harvest Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {crops.map((crop, index) => (
              <tr key={index}>
                <td>{crop.name}</td>
                <td>{crop.farm}</td>
                <td>{crop.planting}</td>
                <td>{crop.harvest}</td>
                <td>{crop.status}</td>

                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEditCrop(index)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteCrop(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default Crops;