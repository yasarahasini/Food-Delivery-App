"use client";
import React, { useState } from "react";
import { useRouter } from "expo-router";

const Page = () => {
  const router = useRouter();
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState("");

  const handleTrack = () => {
    if (!orderId) {
      setStatus("Please enter a valid Order ID");
      return;
    }
    setStatus("🚚 Your order is on the way!");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Track My Order</h1>
      <p style={styles.subtitle}>
        Enter your order ID to check the current status
      </p>

      <input
        type="text"
        placeholder="Enter Order ID"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        style={styles.input}
      />

      <button onClick={handleTrack} style={styles.button}>
        Track Order
      </button>

      {/* ✅ LOCATION BUTTON */}
      <button
        onClick={() => router.push("/map/page")}
        style={styles.locationBtn}
      >
        📍 Location
      </button>

      {status && <p style={styles.status}>{status}</p>}
    </div>
  );
};

export default Page;

const styles = {
  container: {
    minHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "16px",
    color: "#666",
    marginBottom: "20px",
    textAlign: "center",
  },
  input: {
    width: "280px",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginBottom: "12px",
  },
  button: {
    width: "280px",
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#ff6b00",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
  },
  locationBtn: {
    width: "280px",
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#28a745",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "12px",
  },
  status: {
    marginTop: "16px",
    fontSize: "16px",
    fontWeight: "600",
  },
};
