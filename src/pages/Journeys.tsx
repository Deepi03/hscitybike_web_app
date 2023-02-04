import React, { useEffect, useState } from "react";
import "../styles/pages/journey.scss";
import { JourneyContent } from "../types/journeyContent";
import {
  Container,
  Pagination,
  PaginationItem,
  PaginationLink
} from "reactstrap";

export const Journeys = () => {
  const [result, setResult] = useState<JourneyContent>();

  const [journeyContent, setPostContent] = useState<JourneyContent>({
    content: [],
    totalPages: 0,
    totalElements: 0,
    pageSize: 5,
    lastPage: false,
    pageNumber: 0
  });

  const api = async (pageNumber: number, pageSize: number) => {
    const data = await fetch(
      `http://localhost:8080/api/journeys?page=${pageNumber}&size=${pageSize}`
    );
    const jsonData = await data.json();
    setResult(jsonData);
  };

  useEffect(
    () => {
      api(journeyContent.pageNumber, journeyContent.pageSize);
    },
    [journeyContent]
  );

  const changePage = (pageNumber = 0, pageSize = 5) => {
    if (pageNumber > journeyContent.pageNumber && journeyContent.content) {
      setPostContent({
        ...journeyContent,
        pageNumber: pageNumber
      });
      return;
    }

    if (pageNumber < journeyContent.pageNumber && journeyContent.pageNumber > 0) {
      setPostContent({
        ...journeyContent,
        pageNumber: pageNumber
      });
      return;
    }
  };

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
        {result?.content?.map(value => {
          return (
            <tr key={value.departureStationId+value.departureTime}>
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

      <Container className="mt-3">
        <Pagination size="lg">
          <PaginationItem
            onClick={() => changePage(journeyContent.pageNumber - 1)}
            disabled={journeyContent.pageNumber === 0}
          >
            <PaginationLink previous></PaginationLink>
          </PaginationItem>
          
          <PaginationItem
            onClick={() => changePage(journeyContent.pageNumber + 1)}
            disabled={journeyContent.lastPage}
          >
            <PaginationLink next></PaginationLink>
          </PaginationItem>
        </Pagination>
      </Container>
    </div>
  );
};
