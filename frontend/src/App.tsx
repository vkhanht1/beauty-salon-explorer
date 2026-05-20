import React, { useState, useEffect } from 'react';

interface Salon {
  id: number;
  name: string;
  address: string;
  district: string;
  phoneNumber: string | null;
  website: string | null;
  services: string | null;
  priceRange: string | null;
  rating: number | null;
  numberOfReviews: number | null;
}

const API_URL = 'http://localhost:8080/api/salons';

export default function App() {
  const [salons, setSalons] = useState<Salon[]>([]);
  const [filterDistrict, setFilterDistrict] = useState<string>('');
  const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setSalons(data))
      .catch(err => console.error("Error fetching salons:", err));
  }, []);

  const districts = Array.from(new Set(salons.map(s => s.district))).filter(Boolean);

  const displayedSalons = filterDistrict
    ? salons.filter(s => s.district === filterDistrict)
    : salons;
  const handleSelectSalon = (id: number) => {
    fetch(`${API_URL}/${id}`)
      .then(res => res.json())
      .then(data => {
        setSelectedSalon(data);
        setIsEditing(false);
      })
      .catch(err => console.error("Error fetching salon details:", err));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSalon) return;

    fetch(`${API_URL}/${selectedSalon.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(selectedSalon),
    })
      .then(res => res.json())
      .then(updatedSalon => {
        setSalons(salons.map(s => s.id === updatedSalon.id ? updatedSalon : s));
        setSelectedSalon(updatedSalon);
        setIsEditing(false);
        alert("Changes successfully!");
      })
      .catch(err => console.error("Error updating salon:", err));
  };

  return (
    <div style={{ display: 'flex', fontFamily: 'Arial, sans-serif', padding: '24px', gap: '24px', height: '90vh', backgroundColor: '#f9fafb' }}>

      {/* list and filter */}
      <div style={{ width: '45%', overflowY: 'auto', paddingRight: '12px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#111827' }}>Warsaw Beauty Explorer</h1>
        {/* dropdown */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#374151' }}>Filter by District:</label>
          <select
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', backgroundColor: '#fff' }}
            value={filterDistrict}
            onChange={(e) => setFilterDistrict(e.target.value)}
          >
            <option value="">All Districts</option>
            {districts.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {displayedSalons.map(salon => (
            <div
              key={salon.id}
              onClick={() => handleSelectSalon(salon.id)}
              style={{
                padding: '16px',
                backgroundColor: '#fff',
                border: selectedSalon?.id === salon.id ? '2px solid #2563eb' : '1px solid #e5e7eb',
                borderRadius: '8px',
                cursor: 'pointer',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
              }}
            >
              <h3 style={{ margin: '0 0 6px 0', fontSize: '18px', fontWeight: '600', color: '#1f2937' }}>{salon.name}</h3>
              <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>
                📍 {salon.district} &nbsp;|&nbsp; ⭐ {salon.rating || 'N/A'} &nbsp;|&nbsp; 💰 {salon.priceRange}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ width: '55%', backgroundColor: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflowY: 'auto' }}>
        {!selectedSalon ? (
          <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', fontStyle: 'italic' }}>
            Select a beauty salon from the list to view details and modify info.
          </div>
        ) : (
          !isEditing ? (
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#111827' }}>{selectedSalon.name}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '16px', color: '#4b5563' }}>
                <p><strong>Address:</strong> {selectedSalon.address}</p>
                <p><strong>District:</strong> {selectedSalon.district}</p>
                <p><strong>Phone:</strong> {selectedSalon.phoneNumber || 'N/A'}</p>
                <p><strong>Website:</strong> {selectedSalon.website ? <a href={selectedSalon.website} target="_blank" rel="noreferrer" style={{ color: '#2563eb' }}>{selectedSalon.website}</a> : 'N/A'}</p>
                <p><strong>Services Offered:</strong> {selectedSalon.services || 'N/A'}</p>
                <p><strong>Rating:</strong> {selectedSalon.rating} ({selectedSalon.numberOfReviews} reviews)</p>
                <p><strong>Price Range:</strong> {selectedSalon.priceRange}</p>
              </div>

              <button
                onClick={() => setIsEditing(true)}
                style={{ marginTop: '24px', padding: '10px 20px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
              >
                Edit Salon Details
              </button>
            </div>
          ) : (
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#111827' }}>Edit Salon Details</h2>

              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '4px' }}>Name:</label>
                <input style={{ width: '95%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }} value={selectedSalon.name} onChange={e => setSelectedSalon({ ...selectedSalon, name: e.target.value })} required />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '4px' }}>Address:</label>
                <input style={{ width: '95%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }} value={selectedSalon.address} onChange={e => setSelectedSalon({ ...selectedSalon, address: e.target.value })} required />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '4px' }}>District:</label>
                <input style={{ width: '95%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }} value={selectedSalon.district} onChange={e => setSelectedSalon({ ...selectedSalon, district: e.target.value })} required />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '4px' }}>Phone Number:</label>
                <input style={{ width: '95%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }} value={selectedSalon.phoneNumber || ''} onChange={e => setSelectedSalon({ ...selectedSalon, phoneNumber: e.target.value })} />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '4px' }}>Services (comma separated):</label>
                <input style={{ width: '95%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }} value={selectedSalon.services || ''} onChange={e => setSelectedSalon({ ...selectedSalon, services: e.target.value })} />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#10b981', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>Save Changes</button>
                <button type="button" onClick={() => setIsEditing(false)} style={{ padding: '10px 20px', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>Cancel</button>
              </div>
            </form>
          )
        )}
      </div>
    </div>
  );
}