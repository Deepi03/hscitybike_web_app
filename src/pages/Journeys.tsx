import React, { useEffect, useState } from "react";
import { Journey } from "../types/journey";
import "../styles/pages/journey.scss";

export const Journeys = () => {
  const [result, setResult] = useState<Journey[]>([]);

  useEffect(() => {
    const api = async () => {
      const data = await fetch("http://localhost:8080/api/journeys");
      const jsonData = await data.json();
      setResult(jsonData);
    };

    api();
  }, []);

  return (
    <div>
      <h1>Journey</h1>
      <table>
        <tr>
          <th>Departure Station ID</th>
          <th>Departure Station Name</th>
          <th>Departure Time</th>
          <th>Return Station ID</th>
          <th>Return Station Name</th>
          <th>Return Time</th>
          <th>Duration</th>
          <th> Distance</th>
        </tr>
        {result.map(value => {
          return (
            <tr>
              <td>
                {value.departureStationId}
              </td>
              <td>
                {value.departureStation}
              </td>
              <td>
                {value.departureTime}
              </td>
              <td>
                {value.returnStationId}
              </td>
              <td>
                {value.returnStation}
              </td>
              <td>
                {value.returnTime}
              </td>
              <td>
                {value.duration}
              </td>
              <td>
                {value.coveredDistance}
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};
