import DashboardLayout from "../components/DashboardLayout";
import "../styles/addListing.css";

export default function AddListing() {
  return (
    <DashboardLayout>
      <div className="page-header-text">
        <h1>Add new crop listing</h1>
        <p>Fill in the details of your produce</p>
      </div>

      <form className="add-listing">
        <div className="form-fields">
          <div className="form-field-left">
            <div className="crop-type">
              <label htmlFor="categories">Crop type</label>
              <select name="cropType" id="categories">
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
              <input type="text" id="price-per-kg" />
            </div>
            <div className="location">
              <div className="state-field">
                <label htmlFor="state">State</label>
                <select id="state" name="state">
                  <option value="Enugu">Enugu</option>
                </select>
              </div>
              <div className="state-field">
                <label htmlFor="city">City</label>
                <input type="text" id="city" name="city" />
              </div>
            </div>
          </div>

          <div className="form-field-left">
            <div className="quantity">
              <label htmlFor="quantity">Quantity</label>
              <input type="text" id="quantity" />
            </div>
            <div className="price">
              <label htmlFor="total-price">Total price ($)</label>
              <input type="text" id="total-price" />
            </div>
            <div className="availability">
              <label htmlFor="availability-date">Available from</label>
              <input type="date" id="availability-date" name="availableFrom" />
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
            />
          </div>
        </div>

        <div className="img-field"></div>

        <div className="form-actions">
          <button type="button" className="btn-outline">Cancel</button>
          <button type="submit" className="btn-primary">Publish listing</button>
        </div>
      </form>
    </DashboardLayout>
  );
}
