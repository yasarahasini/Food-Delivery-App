"use client";
import React from "react";
import { useRouter } from "expo-router";

const Page = () => {
  const router = useRouter();

  return (
    <div style={styles.pageContainer}>
  
      <div style={styles.mapWrapper}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.58290437433!2d79.78616429532598!3d6.9218373693247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a70ad%3A0x2db2e413f65330a6!2sColombo!5e0!3m2!1sen!2slk!4v1710000000000!5m2!1sen!2slk"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        />
        
     
        <div style={styles.floatingHeader}>
           <button onClick={() => router.back()} style={styles.backCircle}>←</button>
           <div style={styles.statusPill}>
             <span style={styles.pulseDot}></span>
             LIVE TRACKING
           </div>
           <div style={{ width: 40 }} />
        </div>
      </div>

   
      <div style={styles.infoCard}>
        <div style={styles.dragHandle} />
        
        <div style={styles.driverSection}>
          <div style={styles.driverInfo}>
            <div style={styles.avatarPlaceholder}>
               <span style={{fontSize: '24px'}}>🛵</span>
            </div>
            <div>
              <h3 style={styles.driverName}>Chaminda Perera</h3>
              <p style={styles.vehicleText}>Honda Super Cub • WP BZ-45xx</p>
            </div>
          </div>
          <button style={styles.callBtn}>📞</button>
        </div>

        <div style={styles.addressBox}>
          <p style={styles.addressLabel}>DELIVERY ADDRESS</p>
          <p style={styles.addressValue}>No. 123, Galle Road, Colombo 03</p>
        </div>

        <button
          onClick={() => router.push("/order-history/page")}
          style={styles.primaryActionBtn}
        >
          VIEW ORDER DETAILS
        </button>
      </div>
    </div>
  );
};

export default Page;

const styles = {
  pageContainer: {
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
    position: "relative" as "relative",
    backgroundColor: "#000",
  },
  mapWrapper: {
    position: "absolute" as "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: "20%",
    zIndex: 1,
  },
  floatingHeader: {
    position: "absolute" as "absolute",
    top: "50px",
    left: "20px",
    right: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 10,
  },
  backCircle: {
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    backgroundColor: "#fff",
    border: "none",
    boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
    fontSize: "20px",
    cursor: "pointer",
  },
  statusPill: {
    backgroundColor: "rgba(0,0,0,0.8)",
    color: "#fff",
    padding: "10px 18px",
    borderRadius: "25px",
    fontSize: "12px",
    fontWeight: "bold",
    letterSpacing: "1px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  pulseDot: {
    width: "8px",
    height: "8px",
    backgroundColor: "#28a79c",
    borderRadius: "50%",
    boxShadow: "0 0 0 4px rgba(40,167,156,0.3)",
  },
  infoCard: {
    position: "absolute" as "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    borderTopLeftRadius: "40px",
    borderTopRightRadius: "40px",
    padding: "20px 30px 40px",
    zIndex: 20,
    boxShadow: "0 -10px 40px rgba(0,0,0,0.1)",
  },
  dragHandle: {
    width: "40px",
    height: "5px",
    backgroundColor: "#E0E0E0",
    borderRadius: "10px",
    margin: "0 auto 20px",
  },
  driverSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
  },
  driverInfo: { display: "flex", alignItems: "center", gap: "15px" },
  avatarPlaceholder: {
    width: "55px",
    height: "55px",
    backgroundColor: "#F0F2F5",
    borderRadius: "18px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  driverName: { margin: 0, fontSize: "18px", fontWeight: "800", color: "#1A1A1A" },
  vehicleText: { margin: 0, fontSize: "13px", color: "#888", fontWeight: "600" },
  callBtn: {
    width: "50px",
    height: "50px",
    borderRadius: "15px",
    border: "none",
    backgroundColor: "#28a79c",
    color: "#fff",
    fontSize: "20px",
    cursor: "pointer",
  },
  addressBox: {
    backgroundColor: "#F8F9FB",
    padding: "15px 20px",
    borderRadius: "20px",
    marginBottom: "25px",
  },
  addressLabel: { margin: "0 0 5px", fontSize: "11px", fontWeight: "800", color: "#BBB", letterSpacing: "0.5px" },
  addressValue: { margin: 0, fontSize: "14px", fontWeight: "600", color: "#333" },
  primaryActionBtn: {
    width: "100%",
    padding: "20px",
    borderRadius: "22px",
    border: "none",
    backgroundColor: "#1A1A1A",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "800",
    cursor: "pointer",
    letterSpacing: "1px",
    transition: "all 0.2s",
  },
};