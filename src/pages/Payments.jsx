import { useState, useEffect } from "react";
import "../styles/Dashboard.css";

function Payments() {
  const farmerName =
    localStorage.getItem("farmerName") || "Farmer";

  const storageKey = `payments_${farmerName}`;

  const [payments, setPayments] = useState(() => {
    const savedPayments = localStorage.getItem(storageKey);

    if (!savedPayments) {
      return [];
    }

    try {
      return JSON.parse(savedPayments);
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      storageKey,
      JSON.stringify(payments)
    );
  }, [payments, storageKey]);

  const getAmount = (amount) => {
    if (typeof amount === "number") {
      return amount;
    }

    return Number(
      String(amount || "")
        .replace(/[₦$,\s]/g, "")
    ) || 0;
  };

  const completedPayments = payments
    .filter(
      (payment) => payment.status === "Paid"
    )
    .reduce(
      (total, payment) =>
        total + getAmount(payment.amount),
      0
    );

  const pendingPayments = payments
    .filter(
      (payment) => payment.status === "Pending"
    )
    .reduce(
      (total, payment) =>
        total + getAmount(payment.amount),
      0
    );

  const totalRevenue = completedPayments;

  const formatCurrency = (amount) => {
    return `₦${amount.toLocaleString("en-NG")}`;
  };

  return (
    <div className="payments-page">

      {/* PAGE HEADER */}

      <div className="page-header">

        <div>
          <h1>Payments</h1>

          <p className="page-subtitle">
            Track your farm payments and transactions.
          </p>
        </div>

      </div>


      {/* PAYMENT SUMMARY */}

      <div className="cards payments-summary">

        <div className="card">

          <h3>Total Revenue</h3>

          <h2>
            {formatCurrency(totalRevenue)}
          </h2>

          <p>This month</p>

        </div>


        <div className="card">

          <h3>Pending Payments</h3>

          <h2>
            {formatCurrency(pendingPayments)}
          </h2>

          <p>Awaiting payment</p>

        </div>


        <div className="card">

          <h3>Completed Payments</h3>

          <h2>
            {formatCurrency(completedPayments)}
          </h2>

          <p>Received</p>

        </div>


        <div className="card">

          <h3>Total Transactions</h3>

          <h2>
            {payments.length}
          </h2>

          <p>This month</p>

        </div>

      </div>


      {/* RECENT TRANSACTIONS */}

      <div className="recent-activities payments-card">

        <div className="section-header">

          <div>
            <h2>Recent Transactions</h2>

            <p className="table-subtitle">
              View and track your payment transactions.
            </p>
          </div>

          <span className="listing-count">

            {payments.length}{" "}

            {payments.length === 1
              ? "transaction"
              : "transactions"}

          </span>

        </div>


        {/* TRANSACTIONS TABLE */}

        <div className="table-wrapper">

          <table className="crop-table">

            <thead>

              <tr>
                <th>Buyer</th>
                <th>Crop</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>

            </thead>


            <tbody>

              {payments.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="empty-state"
                  >

                    <strong>
                      No transactions yet
                    </strong>

                    <br />

                    Your payment transactions
                    will appear here.

                  </td>

                </tr>

              ) : (

                payments.map((payment, index) => (

                  <tr key={index}>

                    <td>
                      <strong>
                        {payment.buyer}
                      </strong>
                    </td>

                    <td>
                      {payment.crop}
                    </td>

                    <td>
                      {formatCurrency(
                        getAmount(payment.amount)
                      )}
                    </td>

                    <td>
                      {payment.date}
                    </td>

                    <td>

                      {payment.status === "Paid" && (
                        <span className="status-active">
                          Paid
                        </span>
                      )}

                      {payment.status === "Pending" && (
                        <span className="status-pending">
                          Pending
                        </span>
                      )}

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

export default Payments;