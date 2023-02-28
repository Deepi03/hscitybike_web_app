import React, { useEffect, useState } from "react";
import "../styles/pages/journey.scss";
import { IProps } from "../types/IProps";
import { Journey } from "../types/journey";
import { JourneyContent } from "../types/journeyContent";
import { Search } from "./Search";

export const DisplayResult = ({ parentToChild }: IProps) => {
  const [result, setResult] = useState<Journey[]>();
  console.log("display result");
  useEffect(
    () => {
      setResult(parentToChild);
    },
    [parentToChild]
  );

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Journey Id</th>
            <th>Departure Station ID</th>
            <th>Departure Station Name</th>
            <th>Departure Time</th>
            <th>Return Station ID</th>
            <th>Return Station Name</th>
            <th>Return Time</th>
            <th>Duration</th>
            <th> Distance</th>
          </tr>
        </thead>
        <tbody>
          {result?.map(value => {
            return (
              <tr key={value.departureStationId + value.departureTime}>
                <td>
                  {value.id}
                </td>
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
        </tbody>
      </table>
    </div>
  );
};
 