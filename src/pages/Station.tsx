import React, { useEffect, useState } from "react";

import { Station } from "../types/station";
import "../styles/pages/journey.scss";

export const Stations = () => {
  const [result, setResult] = useState<Station[]>([]);

  useEffect(() => {
    const api = async () => {
      const data = await fetch("http://localhost:8080/api/stations");
      const jsonData = await data.json();
      setResult(jsonData);
    };

    api();
  }, []);

  return (
    <div>
      <h1>Stations</h1>
      <table>
        <tr>
          <th>Station Name</th>
          <th>No. of departures</th>
          <th>No. of returns</th>
        </tr>
        {result.map(value => {
          return (
            <tr>
              <td>
                {value.station}
              </td>
              <td>
                {value.numberOfDepartures}
              </td>
              <td>
                {value.numberOfReturns}
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};
