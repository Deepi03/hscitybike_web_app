import React, { useEffect, useState } from "react";

import "../styles/pages/journey.scss";
import { StationContent } from "../types/stationContent";
import { Container, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { useNavigate } from "react-router-dom";

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
   const navigate = useNavigate()

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
      
      <h1 className="heading">Stations</h1>
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
      <Container className="mt-3 container">
        <Pagination size="lg">
          <PaginationItem
            onClick={() => changePage(stationContent.pageNumber - 1)}
            disabled={stationContent.pageNumber === 0}
            className="pagination-item"
          >
            <PaginationLink className="pagination-link" previous></PaginationLink>
          </PaginationItem>
          
          <PaginationItem
            onClick={() => changePage(stationContent.pageNumber + 1)}
            className="pagination-item"
            disabled={stationContent.lastPage}
          >
            <PaginationLink className="pagination-link" next></PaginationLink>
          </PaginationItem>
        </Pagination>
      </Container>
      <div className="back">
        <button onClick={() => navigate(-1)}>
              Go back
      </button>
      </div>
    </div>
  );
};
