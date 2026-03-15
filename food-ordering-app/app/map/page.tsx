"use client";
import React from "react";
import { useRouter } from "expo-router";

const Page = () => {
  const router = useRouter();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Delivery Location</h1>

      <iframe
        src="https://www.google.com/maps?q=Colombo,Sri%20Lanka&output=embed"
        width="100%"
        height="400"
        style={{ border: 0, borderRadius: "10px" }}
        allowFullScreen
        loading="lazy"
      />

      <button
        onClick={() => router.push("/order-history/page")}
        style={{
          marginTop: "20px",
          backgroundColor: "#28a79c",
          color: "#fff",
          padding: "12px 20px",
          borderRadius: "8px",
          border: "none",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
       Order Details Page
      </button>
    </div>
  );
};

export default Page;
