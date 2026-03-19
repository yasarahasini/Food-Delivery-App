"use client";
import React, { useState } from "react";
import { useRouter } from "expo-router";

const Page = () => {
  const router = useRouter();
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState(false);

  const handleTrack = () => {
    if (!orderId) return;
    setStatus(true);
  };

  return (
    <div style={styles.pageWrapper}>
     
      <div style={styles.topNav}>
         <button onClick={() => router.back()} style={styles.iconBtn}>←</button>
         <span style={styles.navTitle}>LIVE TRACKING</span>
         <div style={{ width: 40 }} />
      </div>

      <div style={styles.content}>
      
        <div style={styles.inputContainer}>
          <input
            type="text"
            placeholder="ORDER ID (E.G. #XC-902)"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            style={styles.neoInput}
          />
          <button onClick={handleTrack} style={styles.trackActionBtn}>
            SEARCH
          </button>
        </div>

     
        {status ? (
          <div style={styles.statusCard}>
            <div style={styles.cardHeader}>
              <div>
                <p style={styles.label}>ESTIMATED ARRIVAL</p>
                <h2 style={styles.timeValue}>12:45 PM</h2>
              </div>
              <div style={styles.badge}>ON THE WAY</div>
            </div>

            <div style={styles.stepperContainer}>
              <div style={styles.line} />
              <div style={styles.stepRow}>
                <div style={{...styles.dot, backgroundColor: '#FF6B00'}} />
                <p style={styles.stepText}><b>Kitchen:</b> Preparing your meal</p>
              </div>
              <div style={styles.stepRow}>
                <div style={{...styles.dot, backgroundColor: '#FF6B00'}} />
                <p style={styles.stepText}><b>Courier:</b> Picked up (2 mins ago)</p>
              </div>
              <div style={styles.stepRow}>
                <div style={styles.dotPulse} />
                <p style={{...styles.stepText, color: '#000', fontWeight: 'bold'}}>Heading to your location</p>
              </div>
            </div>

            <button
              onClick={() => router.push("/map/page")}
              style={styles.mapEntryBtn}
            >
              <span style={{ fontSize: '18px' }}>📍</span> VIEW LIVE MAP
            </button>
          </div>
        ) : (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>🚚</div>
            <p>Ready to track your delicious journey?</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;

const styles = {
  pageWrapper: {
    minHeight: "100vh",
    backgroundColor: "#F0F2F5",
    fontFamily: "'Inter', sans-serif",
  },
  topNav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '50px 20px 20px',
    backgroundColor: '#fff',
  },
  navTitle: { fontWeight: '800', letterSpacing: '2px', fontSize: '14px' },
  iconBtn: { border: 'none', background: 'none', fontSize: '20px', cursor: 'pointer' },
  
  content: { padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' },

  inputContainer: {
    display: 'flex',
    backgroundColor: '#fff',
    padding: '8px',
    borderRadius: '16px',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
    marginBottom: '30px'
  },
  neoInput: {
    flex: 1,
    border: 'none',
    padding: '12px',
    outline: 'none',
    fontSize: '14px',
    fontWeight: '600'
  },
  trackActionBtn: {
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    padding: '0 20px',
    borderRadius: '12px',
    fontWeight: 'bold',
    fontSize: '12px',
    cursor: 'pointer'
  },

  statusCard: {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#fff',
    borderRadius: '30px',
    padding: '30px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
    position: 'relative',
    overflow: 'hidden'
  },
  cardHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '30px' },
  label: { fontSize: '11px', fontWeight: 'bold', color: '#999', margin: 0 },
  timeValue: { fontSize: '28px', fontWeight: '900', margin: 0, color: '#1A1A1A' },
  badge: {
    backgroundColor: '#E7F9ED',
    color: '#28A745',
    padding: '6px 12px',
    borderRadius: '10px',
    fontSize: '12px',
    fontWeight: 'bold',
    height: 'fit-content'
  },

  stepperContainer: { position: 'relative', paddingLeft: '20px', marginBottom: '30px' },
  line: { 
    position: 'absolute', left: '4px', top: '10px', bottom: '10px', 
    width: '2px', backgroundColor: '#EEE' 
  },
  stepRow: { display: 'flex', alignItems: 'center', marginBottom: '20px', position: 'relative' },
  dot: { width: '10px', height: '10px', borderRadius: '50%', marginRight: '15px', zIndex: 2 },
  dotPulse: { 
    width: '10px', height: '10px', borderRadius: '50%', marginRight: '15px', zIndex: 2,
    backgroundColor: '#FF6B00', boxShadow: '0 0 0 5px rgba(255,107,0,0.2)'
  },
  stepText: { fontSize: '14px', color: '#666', margin: 0 },

  mapEntryBtn: {
    width: '100%',
    padding: '18px',
    borderRadius: '18px',
    border: 'none',
    backgroundColor: '#1A1A1A',
    color: '#fff',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer'
  },

  emptyState: { textAlign: 'center', marginTop: '50px', color: '#999' },
  emptyIcon: { fontSize: '60px', marginBottom: '10px' }
};