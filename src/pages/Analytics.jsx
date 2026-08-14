import { useMemo } from "react";
import "../styles/Dashboard.css";

function Analytics() {
  const farmerName =
    localStorage.getItem("farmerName") || "Farmer";

  // Each farmer gets their own data
  const cropsKey = `crops_${farmerName}`;
  const requestsKey = `buyerRequests_${farmerName}`;

  const crops = useMemo(() => {
    const savedCrops = localStorage.getItem(cropsKey);

    if (!savedCrops) return [];

    try {
      return JSON.parse(savedCrops);
    } catch {
      return [];
    }
  }, [cropsKey]);

  const requests = useMemo(() => {
    const savedRequests = localStorage.getItem(requestsKey);

    if (!savedRequests) return [];

    try {
      return JSON.parse(savedRequests);
    } catch {
      return [];
    }
  }, [requestsKey]);

  // Analytics calculations
  const totalListings = crops.length;

  const activeListings = crops.filter(
    (crop) => crop.status === "Active"
  ).length;

  const totalViews = crops.reduce(
    (total, crop) => total + Number(crop.views || 0),
    0
  );

  const totalRequests = requests.length;

  const acceptedRequests = requests.filter(
    (request) => request.status === "Accepted"
  ).length;

  const pendingRequests = requests.filter(
    (request) => request.status === "Pending"
  ).length;

  return (
    <div className="analytics-page">

      {/* PAGE HEADER */}

      <div className="page-header">
        <div>
          <h1>Market Insights</h1>

          <p className="page-subtitle">
            Track your farm performance and understand how your
            listings are performing.
          </p>
        </div>
      </div>


      {/* ANALYTICS SUMMARY */}

      <div className="cards">

        <div className="card">
          <h3>Total Listings</h3>

          <h2>{totalListings}</h2>

          <p>All your crop listings</p>
        </div>


        <div className="card">
          <h3>Active Listings</h3>

          <h2>{activeListings}</h2>

          <p>Currently available</p>
        </div>


        <div className="card">
          <h3>Total Views</h3>

          <h2>{totalViews}</h2>

          <p>Views on your listings</p>
        </div>


        <div className="card">
          <h3>Buyer Requests</h3>

          <h2>{totalRequests}</h2>

          <p>Requests from buyers</p>
        </div>

      </div>


      {/* REQUEST PERFORMANCE */}

      <div className="cards">

        <div className="card">
          <h3>Accepted Requests</h3>

          <h2>{acceptedRequests}</h2>

          <p>Successful requests</p>
        </div>


        <div className="card">
          <h3>Pending Requests</h3>

          <h2>{pendingRequests}</h2>

          <p>Waiting for response</p>
        </div>

      </div>


      {/* CROP PERFORMANCE */}

      <div className="recent-activities">

        <div className="section-header">

          <div>
            <h2>Crop Performance</h2>

            <p className="table-subtitle">
              See how your individual crop listings are performing.
            </p>
          </div>

          <span className="listing-count">
            {crops.length}{" "}
            {crops.length === 1
              ? "crop"
              : "crops"}
          </span>

        </div>


        <div className="table-wrapper">

          <table className="crop-table">

            <thead>
              <tr>
                <th>Crop</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Views</th>
                <th>Requests</th>
                <th>Status</th>
              </tr>
            </thead>


            <tbody>

              {crops.length === 0 ? (

                <tr>
                  <td
                    colSpan="6"
                    className="empty-state"
                  >
                    <strong>
                      No crop data yet
                    </strong>

                    <br />

                    Add your crops in My Listings to
                    start seeing your analytics.
                  </td>
                </tr>

              ) : (

                crops.map((crop, index) => {

                  const cropRequests = requests.filter(
                    (request) =>
                      request.crop?.toLowerCase() ===
                      crop.name?.toLowerCase()
                  ).length;

                  return (
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
                        {crop.views || 0}
                      </td>

                      <td>
                        {cropRequests}
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

                    </tr>
                  );
                })

              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* MARKET PRICE INSIGHTS */}

      <div className="recent-activities">

        <div className="section-header">

          <div>
            <h2>Market Price Insights</h2>

            <p className="table-subtitle">
              Review the prices of your currently listed crops.
            </p>
          </div>

        </div>


        <div className="table-wrapper">

          <table className="crop-table">

            <thead>
              <tr>
                <th>Crop</th>
                <th>Your Price</th>
                <th>Availability</th>
              </tr>
            </thead>


            <tbody>

              {crops.length === 0 ? (

                <tr>
                  <td
                    colSpan="3"
                    className="empty-state"
                  >
                    <strong>
                      No market data available
                    </strong>

                    <br />

                    Add a crop listing to see its
                    market information here.
                  </td>
                </tr>

              ) : (

                crops.map((crop, index) => (

                  <tr key={index}>

                    <td>
                      <strong>
                        {crop.name}
                      </strong>
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

export default Analytics;