import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { useListings } from './ListingsContext';
import * as nigerianStates from 'nigerian-states-and-lgas';
import '../styles/addListing.css';
import { Upload } from 'lucide-react';

const STATES = nigerianStates.all().map((s) => s.state);

const initialFormState = {
  cropType: 'Rice',
  pricePerKg: '',
  state: '',
  city: '',
  quantity: '',
  totalPrice: '',
  availableFrom: '',
  description: '',
  imagePreview: '',
};

export default function AddListing() {
  const navigate = useNavigate();
  const { addListing } = useListings();
  const [formData, setFormData] = useState(initialFormState);
  const fileInputRef = useRef(null);

  const [lgasList, setLgasList] = useState([]);

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setFormData((prev) => ({ ...prev, state: selectedState, city: '' }));

    const foundState = nigerianStates
      .all()
      .find((s) => s.state === selectedState);
    setLgasList(foundState ? foundState.lgas : []);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, imagePreview: previewUrl }));
  };

  const validateForm = () => {
    if (!formData.cropType) return 'Please select a crop type.';
    if (!formData.pricePerKg.trim()) return 'Price per kg is required.';
    if (!formData.state) return 'Please select a state.';
    if (!formData.city) return 'Please select a city.';
    if (!formData.quantity.trim()) return 'Quantity is required.';
    if (!formData.totalPrice.trim()) return 'Total price is required.';
    if (!formData.availableFrom) return 'Please select an availability date.';
    if (!formData.description.trim()) return 'Description is required.';
    if (!formData.imagePreview) return 'Please upload a photo of your produce.';
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    addListing(formData);
    navigate('/listings');
  };

  return (
    <DashboardLayout>
      <div className="page-header-text">
        <h1>Add new crop listing</h1>
        <p>Fill in the details of your produce</p>
      </div>

      {error && <p className="form-error">{error}</p>}
      <form className="add-listing" onSubmit={handleSubmit}>
        <div className="form-fields">
          <div className="form-field-left">
            <div className="crop-type">
              <label htmlFor="categories">Crop type</label>
              <select
                name="cropType"
                id="categories"
                value={formData.cropType}
                onChange={handleChange}>
                <option value="Rice">Rice</option>
                <option value="Tomatoes">Tomatoes</option>
                <option value="Yams">Yams</option>
                <option value="Potatoes">Potatoes</option>
                <option value="Maize">Maize</option>
                <option value="Cassava">Cassava</option>
                <option value="Beans">Beans</option>
                <option value="Garri">Garri</option>
              </select>
            </div>
            <div className="price">
              <label htmlFor="price-per-kg">Price per kg ($)</label>
              <input
                type="text"
                id="price-per-kg"
                name="pricePerKg"
                value={formData.pricePerKg}
                onChange={handleChange}
              />
            </div>
            <div className="location">
              <div className="state-field">
                <label htmlFor="state">State</label>
                <select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleStateChange}>
                  <option value="" disabled>
                    Select state
                  </option>
                  {STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div className="state-field">
                <label htmlFor="city">City / LGA</label>
                <select
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  disabled={!formData.state}>
                  <option value="" disabled>
                    {formData.state
                      ? 'Select city / LGA'
                      : 'Select a state first'}
                  </option>
                  {lgasList.map((lga) => (
                    <option key={lga} value={lga}>
                      {lga}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="form-field-left">
            <div className="quantity">
              <label htmlFor="quantity">Quantity</label>
              <input
                type="text"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
              />
            </div>
            <div className="price">
              <label htmlFor="total-price">Total price ($)</label>
              <input
                type="text"
                id="total-price"
                name="totalPrice"
                value={formData.totalPrice}
                onChange={handleChange}
              />
            </div>
            <div className="availability">
              <label htmlFor="availability-date">Available from</label>
              <input
                type="date"
                id="availability-date"
                name="availableFrom"
                value={formData.availableFrom}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="description">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              cols={50}
              rows={10}
              placeholder="Describe your produce..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="img-field">
          <div className="img-field-header">
            <label>
              Produce image <span className="required-asterisk">*</span>
            </label>
            <p>Add a clear photo of your produce</p>
          </div>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            hidden
          />

          <div
            onClick={() => fileInputRef.current?.click()}
            className="img-dropzone">
            {formData.imagePreview ? (
              <img
                src={formData.imagePreview}
                alt="Produce preview"
                className="img-field-preview"
              />
            ) : (
              <>
                <Upload className="img-dropzone-icon" />
                <p className="img-dropzone-title">Upload photos</p>
                <p className="img-dropzone-subtitle">or drag and drop</p>
                <p className="img-dropzone-caption">PNG, JPG up to 5MB</p>
              </>
            )}
          </div>

          <button
            type="button"
            className="btn-outline img-upload-btn"
            onClick={() => fileInputRef.current?.click()}>
            <Upload size={16} />
            {formData.imagePreview ? 'Change photo' : 'Upload photo'}
          </button>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn-outline"
            onClick={() => navigate('/listings')}>
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Publish listing
          </button>
        </div>
      </form>
    </DashboardLayout>
  );
}
