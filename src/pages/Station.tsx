import React, { useEffect, useState } from "react";

import "../styles/pages/journey.scss";
import { StationContent } from "../types/stationContent";
import { Container, Pagination, PaginationItem, PaginationLink } from "reactstrap";

export const Stations = () => {
  const [result, setResult] = useState<StationContent>();
  const [stationContent, setStationContent] = useState<StationContent>({
    content: [],
    totalPages: 0,
    totalElements: 0,
    pageSize: 5,
    lastPage: false,
    pageNumber: 0
  });

  const api = async (pageNumber: number, pageSize: number) => {
    const data = await fetch(`http://localhost:8080/api/stations?page=${pageNumber}&size=${pageSize}`);
    const jsonData = await data.json();
    setResult(jsonData);
  };

  useEffect(
    () => {
      api(stationContent.pageNumber, stationContent.pageSize);
    },
    [stationContent]
  );

  const changePage = (pageNumber = 0, pageSize = 5) => {
    if (pageNumber > stationContent.pageNumber && stationContent.content) {
      setStationContent({
        ...stationContent,
        pageNumber: pageNumber
      });
      return;
    }
    if (pageNumber < stationContent.pageNumber && stationContent.pageNumber > 0) {
      setStationContent({
        ...stationContent,
        pageNumber: pageNumber
      });
      return;
    }}


  return (
    <div>
      <h1>Stations</h1>
      <table>
        <tr>
          <th>Station Name</th>
          <th>No. of departures</th>
          <th>No. of returns</th>
        </tr>
        {result?.content.map(value => {
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
      <Container className="mt-3">
        <Pagination size="lg">
          <PaginationItem
            onClick={() => changePage(stationContent.pageNumber - 1)}
            disabled={stationContent.pageNumber === 0}
          >
            <PaginationLink previous></PaginationLink>
          </PaginationItem>
          
          <PaginationItem
            onClick={() => changePage(stationContent.pageNumber + 1)}
            disabled={stationContent.lastPage}
          >
            <PaginationLink next></PaginationLink>
          </PaginationItem>
        </Pagination>
      </Container>
    </div>
  );
};
