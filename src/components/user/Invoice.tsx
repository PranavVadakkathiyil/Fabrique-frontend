import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const Invoice: React.FC = () => {
  const printRef = useRef<HTMLDivElement | null>(null);
  const { state } = useLocation();
  const order = state?.order;
  //console.log(order);

  if (!order) return <p>No order data received.</p>;

  const download = async () => {
    const elem = printRef.current;
    if (!elem) return;

    const canvas = await html2canvas(elem, { scale: 2 });
    const img = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    pdf.addImage(img, "PNG", 0, 0, pageWidth, 0);
    pdf.save(`invoice-${order._id.slice(-6)}.pdf`);
  };

  return (
    <div style={{ minHeight: "100vh", padding: "20px", backgroundColor: "#f0f0f0" }}>
      {/* Responsive scroll wrapper */}
      <div style={{ overflowX: "auto" }}>
        <div
          ref={printRef}
          style={{
            width: "794px", // A4 width at 96 DPI
            minHeight: "1123px",
            backgroundColor: "#ffffff",
            padding: "32px",
            boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)",
            fontFamily: "Arial, sans-serif",
            color: "#000",
            fontSize: "14px",
            margin: "0 auto",
          }}
        >
          {/* Header */}
          <div
            style={{
              borderBottom: "1px solid #000",
              paddingBottom: "16px",
              marginBottom: "24px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>INVOICE</h1>
            <div style={{ textAlign: "right" }}>
              <p><strong>FABRIQUE.CO Pvt Ltd</strong></p>
              <p>www.fabrique.com</p>
              <p>Email: support@fabrique.com</p>
            </div>
          </div>

          {/* Order Info */}
          <div
            style={{
              marginBottom: "24px",
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div style={{ flex: "1 1 300px" }}>
              <p><strong>Order ID:</strong> #{order._id.slice(0, 8)}</p>
              <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
            <div style={{ flex: "1 1 300px" }}>
              <p><strong>Customer:</strong> {order.name}</p>
              <p><strong>Phone:</strong> {order.phone}</p>
              <p><strong>Address:</strong> {order.address}, {order.pincode}</p>
            </div>
          </div>

          {/* Table */}
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                minWidth: "600px",
                borderCollapse: "collapse",
                marginBottom: "24px",
              }}
            >
              <thead>
                <tr>
                  {[
                    "Product",
                    "Color",
                    "Size",
                    "Qty",
                    "Unit Price",
                    "Total",
                    "PaymentMode",
                    "Payment status",
                  ].map((head) => (
                    <th
                      key={head}
                      style={{
                        border: "1px solid #000",
                        padding: "8px",
                        backgroundColor: "#ddd",
                        textAlign:
                          head === "Unit Price" || head === "Total"
                            ? "right"
                            : "left",
                      }}
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {order.items.map((item: any, index: number) => (
                  <tr key={index}>
                    <td style={{ border: "1px solid #000", padding: "8px" }}>{item.name}</td>
                    <td style={{ border: "1px solid #000", padding: "8px" }}>{item.color}</td>
                    <td style={{ border: "1px solid #000", padding: "8px" }}>{item.size}</td>
                    <td style={{ border: "1px solid #000", padding: "8px" }}>{item.productcount}</td>
                    <td
                      style={{
                        border: "1px solid #000",
                        padding: "8px",
                        textAlign: "right",
                      }}
                    >
                      ₹{item.amount}
                    </td>
                    <td
                      style={{
                        border: "1px solid #000",
                        padding: "8px",
                        textAlign: "right",
                      }}
                    >
                      ₹{item.amount * item.productcount}
                    </td>
                    <td style={{ border: "1px solid #000", padding: "8px" }}>
                      {item.paymentMode}
                    </td>
                    <td style={{ border: "1px solid #000", padding: "8px" }}>
                      {item.paymentStatus}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div style={{ width: "250px", marginLeft: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Subtotal:</span>
              <span>₹{order.subtotal}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Delivery Fee:</span>
              <span>₹{order.deliveryFee}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Discount:</span>
              <span>{order.discount || 0}%</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontWeight: "bold",
                borderTop: "1px solid #000",
                paddingTop: "8px",
                marginTop: "8px",
              }}
            >
              <span>Total:</span>
              <span>₹{order.totalAmount}</span>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              textAlign: "center",
              fontSize: "12px",
              marginTop: "40px",
              color: "#555",
            }}
          >
            <p>Thank you for shopping with us!</p>
            <p>This is a computer-generated invoice and does not require a signature.</p>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <button
          onClick={download}
          style={{
            padding: "10px 20px",
            backgroundColor: "#000",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default Invoice;
