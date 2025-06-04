import React, { useEffect, useState } from "react";
import axios from "axios";

const GolfCoursesNearby = ({ lat, lon, cityName }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Haversine formula för att beräkna avstånd mellan två koordinater
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Jordens radie i km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Avstånd i km
  };

  useEffect(() => {
    const fetchGolfCourses = async () => {
      try {
        const radius = 25000; // Öka till 25 km för fler resultat
        const query = `
          [out:json];
          (
            node["leisure"="golf_course"](around:${radius},${lat},${lon});
            way["leisure"="golf_course"](around:${radius},${lat},${lon});
            relation["leisure"="golf_course"](around:${radius},${lat},${lon});
          );
          out center;
        `;
        const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(
          query
        )}`;

        const response = await axios.get(url);
        const elements = response.data.elements;

        const courseNames = elements
          .filter((el) => el.tags?.name)
          .map((el) => {
            const courseLat = el.lat || el.center?.lat;
            const courseLon = el.lon || el.center?.lon;
            const distance = calculateDistance(lat, lon, courseLat, courseLon);

            return {
              id: el.id,
              name: el.tags.name,
              lat: courseLat,
              lon: courseLon,
              distance: distance,
            };
          })
          .sort((a, b) => a.distance - b.distance) // Sortera efter avstånd
          .slice(0, 8); // Visa max 8 golfbanor

        setCourses(courseNames);
      } catch (error) {
        console.error("Error fetching golf courses:", error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    if (lat && lon) {
      fetchGolfCourses();
    }
  }, [lat, lon]);

  return (
    <div className="golf-courses-section">
      <h3>🏌️ Golfbanor nära {cityName}</h3>
      {loading && <p className="loading">Laddar golfbanor...</p>}
      {!loading && courses.length === 0 && (
        <p className="no-courses">Inga golfbanor hittades inom 25 km.</p>
      )}
      {!loading && courses.length > 0 && (
        <div className="golf-courses-list">
          {courses.map((course) => (
            <div key={course.id} className="golf-course-item">
              <div className="golf-course-info">
                <span className="golf-course-name">📍 {course.name}</span>
                <span className="golf-course-distance">
                  {course.distance.toFixed(1)} km från {cityName}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GolfCoursesNearby;
