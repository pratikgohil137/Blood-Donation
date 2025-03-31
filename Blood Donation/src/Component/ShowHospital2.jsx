import React, { useEffect, useState } from "react";
import HospitalData from "../assets/HospitalData.json"; // Import JSON file


const ShowHospital = () => {
  const [hospitals, setHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [districts, setDistricts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10); // Controls how many hospitals to show

  useEffect(() => {
    setHospitals(HospitalData.hospitals);
    setFilteredHospitals(HospitalData.hospitals);
  }, []);

  // Update districts when state changes
  useEffect(() => {
    if (selectedState) {
      const filteredDistricts = [...new Set(hospitals
        .filter(hospital => hospital.state === selectedState)
        .map(hospital => hospital.district)
      )];
      setDistricts(filteredDistricts);
    } else {
      setDistricts([]);
    }
    setSelectedDistrict(""); // Reset district selection when state changes
  }, [selectedState, hospitals]);

  // Filter hospitals dynamically
  useEffect(() => {
    let filtered = hospitals;
    if (selectedState) {
      filtered = filtered.filter(hospital => hospital.state === selectedState);
    }
    if (selectedDistrict) {
      filtered = filtered.filter(hospital => hospital.district === selectedDistrict);
    }
    setFilteredHospitals(filtered);
    setVisibleCount(10); // Reset the visible count when filters change
  }, [selectedState, selectedDistrict, hospitals]);

  return (
    <div>
      <h2 className="container">Blood Donation Hospitals</h2>

      {/* Filter Dropdowns */}
      <div className="filters">
        <select onChange={(e) => setSelectedState(e.target.value)} value={selectedState}>
          <option value="">Select State</option>
          {[...new Set(hospitals.map(hospital => hospital.state))].map((state, index) => (
            <option key={index} value={state}>{state}</option>
          ))}
        </select>

        <select onChange={(e) => setSelectedDistrict(e.target.value)} value={selectedDistrict} disabled={!selectedState}>
          <option value="">Select District</option>
          {districts.map((district, index) => (
            <option key={index} value={district}>{district}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <table className="hospital-table">
        <thead>
          <tr>
            <th style={{textAlign:"center"}}>Name</th>
            <th style={{textAlign:"center"}}>Phone</th>
            <th style={{textAlign:"center"}}>Address</th>
            <th style={{textAlign:"center"}}>District</th>
            <th style={{textAlign:"center"}}>State</th>
          </tr>
        </thead>
        <tbody>
          {filteredHospitals.slice(0, visibleCount).map((hospital, index) => (
            <tr key={index}>
              <td>{hospital.name}</td>
              <td>{hospital.phone}</td>
              <td>{hospital.address}</td>
              <td>{hospital.district}</td>
              <td>{hospital.state}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Read More Button */}
      {filteredHospitals.length > visibleCount && (
        <button className="read-more-btn" onClick={() => setVisibleCount(visibleCount + 10)}>
          Show More
        </button>
      )}

      {/* Show Less Button */}
      {visibleCount > 10 && (
        <button className="read-more-btn" onClick={() => setVisibleCount(10)}>
          Show Less
        </button>
      )}
    </div>
  );
};

export default ShowHospital;
