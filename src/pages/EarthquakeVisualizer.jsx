import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Profile from "../components/Profile.jsx";

const EarthquakeVisualizer = () => {
  // User profile for this page
  const user = {
    name: "Casey",
    occupation: "Geography Student",
    email: "casey@earthquake.com",
  };

  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch earthquake data from USGS API
  useEffect(() => {
    const fetchEarthquakes = async () => {
      try {
        const res = await axios.get(
          "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
        );
        setEarthquakes(res.data.features); // Extract earthquake data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching earthquake data:", error);
        setLoading(false);
      }
    };

    fetchEarthquakes();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Earthquake Visualizer</h2>
      <Profile user={user} />

      {loading ? (
        <p className="mt-4">Loading earthquake data...</p>
      ) : (
        <div className="mt-6">
          {/* Map Component */}
          <MapContainer
            center={[20, 0]} // Initial center of the map
            zoom={2} // Initial zoom level
            style={{ height: "500px", width: "100%" }}
          >
            {/* Map tile layer */}
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />

            {/* Render earthquake markers */}
            {earthquakes.map((quake) => {
              const {
                coordinates,
              } = quake.geometry; // Coordinates: [longitude, latitude, depth]
              const { mag, place } = quake.properties; // Magnitude and location

              return (
                <CircleMarker
                  key={quake.id}
                  center={[coordinates[1], coordinates[0]]} // [latitude, longitude]
                  radius={mag * 2} // Circle size based on magnitude
                  color="red"
                  fillOpacity={0.5}
                >
                  <Popup>
                    <p><strong>Location:</strong> {place}</p>
                    <p><strong>Magnitude:</strong> {mag}</p>
                    <p><strong>Depth:</strong> {coordinates[2]} km</p>
                  </Popup>
                </CircleMarker>
              );
            })}
          </MapContainer>

          {/* Earthquake count */}
          <p className="mt-4 text-gray-700">
            Total Earthquakes Today: {earthquakes.length}
          </p>
        </div>
      )}
    </div>
  );
};

export default EarthquakeVisualizer;
