import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { MapPin, CalendarDays, Plus, X, ChevronDown } from "lucide-react";

import FarmerLayout from "../layouts/FarmerLayout";

import "../styles/AddListing.css";

/* =========================================================
   CROP IMAGES
========================================================= */

const cropImages = {
  Tomatoes: "/images/Tomatoes.jpg",
  Cabbage: "/images/Cabbage.jpg",
  Cassava: "/images/Cassava.jpg",
  Maize: "/images/Maize.jpg",
  Potato: "/images/Potato.jpg",
};

/* =========================================================
   TODAY'S DATE
========================================================= */

const today = new Date().toISOString().split("T")[0];

/* =========================================================
   ADD LISTING
========================================================= */

function AddListing() {
  const navigate = useNavigate();

  /* =======================================================
     FORM STATE
  ======================================================= */

  const [formData, setFormData] = useState({
    produceName: "Tomatoes",
    quantity: "100",
    unit: "kg",
    pricePerKg: "200",
    price: "20000",
    location: "Enugu, Enugu State",
    availableFrom: today,
    description: "Fresh tomatoes of good quality.",
    image: cropImages.Tomatoes,
  });

  const [imagePreview, setImagePreview] = useState(cropImages.Tomatoes);

  /* =======================================================
     HANDLE NORMAL INPUTS
  ======================================================= */

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => {
      const updatedData = {
        ...previousData,
        [name]: value,
      };

      /* Change image automatically when crop changes */
      if (name === "produceName") {
        updatedData.image = cropImages[value];

        setImagePreview(cropImages[value]);
      }

      return updatedData;
    });
  }

  /* =======================================================
     HANDLE QUANTITY
  ======================================================= */

  function handleQuantityChange(event) {
    const quantity = event.target.value;

    setFormData((previousData) => {
      const pricePerKg = Number(previousData.pricePerKg) || 0;

      const totalPrice = Number(quantity) * pricePerKg;

      return {
        ...previousData,
        quantity,
        price: totalPrice.toString(),
      };
    });
  }

  /* =======================================================
     HANDLE PRICE PER KG
  ======================================================= */

  function handlePricePerKgChange(event) {
    const pricePerKg = event.target.value;

    setFormData((previousData) => {
      const quantity = Number(previousData.quantity) || 0;

      const totalPrice = Number(pricePerKg) * quantity;

      return {
        ...previousData,
        pricePerKg,
        price: totalPrice.toString(),
      };
    });
  }

  /* =======================================================
     HANDLE IMAGE UPLOAD
  ======================================================= */

  function handleImageChange(event) {
    const file = event.target.files[0];

    if (!file) return;

    /* Maximum file size: 5MB */
    if (file.size > 5 * 1024 * 1024) {
      alert("Please select an image smaller than 5MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setImagePreview(reader.result);

      setFormData((previousData) => ({
        ...previousData,
        image: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  }

  /* =======================================================
     REMOVE IMAGE
  ======================================================= */

  function removeImage() {
    setImagePreview("");

    setFormData((previousData) => ({
      ...previousData,
      image: "",
    }));
  }

  /* =======================================================
     HANDLE SUBMIT
  ======================================================= */

  function handleSubmit(event) {
    event.preventDefault();

    const quantity = Number(formData.quantity);
    const pricePerKg = Number(formData.pricePerKg);

    /* Quantity validation */
    if (!Number.isFinite(quantity) || quantity <= 0) {
      alert("Quantity must be greater than 0.");
      return;
    }

    /* Make sure quantity is a whole number */
    if (!Number.isInteger(quantity)) {
      alert("Quantity must be a whole number.");
      return;
    }

    /* Price validation */
    if (!Number.isFinite(pricePerKg) || pricePerKg < 0) {
      alert("Price per kg cannot be negative.");
      return;
    }

    /* Location validation */
    if (formData.location.trim().length < 3) {
      alert("Please enter a valid location.");
      return;
    }

    /* Date validation */
    if (!formData.availableFrom) {
      alert("Please select an available date.");
      return;
    }

    /* Prevent past dates */
    if (formData.availableFrom < today) {
      alert("Available date cannot be in the past.");
      return;
    }

    /* Description validation */
    if (formData.description.trim().length < 10) {
      alert("Description must contain at least 10 characters.");
      return;
    }

    /* Create listing object */
    const listingToSave = {
      ...formData,

      quantity: quantity.toString(),

      pricePerKg: pricePerKg.toString(),

      price: (quantity * pricePerKg).toString(),

      listedOn: formData.availableFrom,

      image: formData.image || cropImages[formData.produceName],
    };

    /* Save listing */
    localStorage.setItem("ubaniListing", JSON.stringify(listingToSave));

    /* Navigate to success page */
    navigate("/listing-published");
  }

  /* =======================================================
     CHARACTER COUNT
  ======================================================= */

  const characterCount = formData.description.length;

  /* =======================================================
     DISPLAY
  ======================================================= */

  return (
    <FarmerLayout>
      <main className="add-listing-page">
        <div className="add-listing-container">
          {/* =================================================
              HEADER
          ================================================= */}

          <header className="add-listing-header">
            <h1>Add new crop listing</h1>

            <p>Fill in the details of your produce</p>
          </header>

          {/* =================================================
              MAIN CONTENT
          ================================================= */}

          <form className="add-listing-content" onSubmit={handleSubmit}>
            {/* =================================================
                LEFT SIDE
            ================================================= */}

            <div className="add-listing-form">
              {/* =================================================
                  CROP TYPE + QUANTITY
              ================================================= */}

              <div className="form-row">
                {/* Crop type */}

                <div className="form-group">
                  <label htmlFor="produceName">Crop type</label>

                  <div className="select-wrapper">
                    <select
                      id="produceName"
                      name="produceName"
                      value={formData.produceName}
                      onChange={handleChange}
                    >
                      <option value="Tomatoes">Tomatoes</option>

                      <option value="Cabbage">Cabbage</option>

                      <option value="Cassava">Cassava</option>

                      <option value="Maize">Maize</option>

                      <option value="Potato">Potato</option>
                    </select>

                    <ChevronDown size={24} />
                  </div>
                </div>

                {/* Quantity */}

                <div className="form-group">
                  <label htmlFor="quantity">Quantity</label>

                  <div className="quantity-wrapper">
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      min="1"
                      step="1"
                      value={formData.quantity}
                      onChange={handleQuantityChange}
                      required
                    />

                    <select
                      name="unit"
                      value={formData.unit}
                      onChange={handleChange}
                    >
                      <option value="kg">kg</option>

                      <option value="bags">bags</option>

                      <option value="tons">tons</option>

                      <option value="pieces">pieces</option>

                      <option value="litres">litres</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* =================================================
                  PRICE + TOTAL
              ================================================= */}

              <div className="form-row">
                {/* Price per kg */}

                <div className="form-group">
                  <label htmlFor="pricePerKg">Price per kg ($)</label>

                  <input
                    type="number"
                    id="pricePerKg"
                    name="pricePerKg"
                    min="0"
                    step="0.01"
                    value={formData.pricePerKg}
                    onChange={handlePricePerKgChange}
                    required
                  />
                </div>

                {/* Total price */}

                <div className="form-group">
                  <label htmlFor="price">Total price ($)</label>

                  <input
                    type="text"
                    id="price"
                    value={Number(formData.price || 0).toLocaleString()}
                    readOnly
                  />
                </div>
              </div>

              {/* =================================================
                  LOCATION + DATE
              ================================================= */}

              <div className="form-row">
                {/* Location */}

                <div className="form-group">
                  <label htmlFor="location">Location</label>

                  <div className="icon-input">
                    <MapPin size={25} />

                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      minLength="3"
                      maxLength="100"
                      required
                    />

                    <ChevronDown size={24} />
                  </div>
                </div>

                {/* Available date */}

                <div className="form-group">
                  <label htmlFor="availableFrom">Available from</label>

                  <div className="icon-input">
                    <CalendarDays size={25} />

                    <input
                      type="date"
                      id="availableFrom"
                      name="availableFrom"
                      value={formData.availableFrom}
                      min={today}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* =================================================
                  DESCRIPTION
              ================================================= */}

              <div className="form-group description-group">
                <label htmlFor="description">Description</label>

                <div className="description-wrapper">
                  <textarea
                    id="description"
                    name="description"
                    maxLength="250"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />

                  <span className="character-count">{characterCount}/250</span>
                </div>
              </div>

              {/* =================================================
                  BUTTONS
              ================================================= */}

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => navigate("/dashboard")}
                >
                  Cancel
                </button>

                <button type="submit" className="publish-button">
                  Publish listing
                </button>
              </div>
            </div>

            {/* =================================================
                RIGHT SIDE - PHOTO PANEL
            ================================================= */}

            <div className="photo-panel">
              {/* Main image */}

              {imagePreview ? (
                <div className="main-photo">
                  <img
                    src={imagePreview}
                    alt={`${formData.produceName} produce`}
                  />

                  <button
                    type="button"
                    className="remove-photo"
                    onClick={removeImage}
                    aria-label="Remove photo"
                  >
                    <X size={28} />
                  </button>
                </div>
              ) : (
                <div className="empty-photo">
                  <span>No photo selected</span>
                </div>
              )}

              {/* Add more photos */}

              <label className="add-more-photos">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  hidden
                />

                <Plus size={30} />

                <span>Add more photos</span>

                <small>(Max 4 photos)</small>
              </label>
            </div>
          </form>
        </div>
      </main>
    </FarmerLayout>
  );
}

export default AddListing;
