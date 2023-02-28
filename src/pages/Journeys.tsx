import React, { useEffect, useState } from "react";
import "../styles/pages/journey.scss";
import { JourneyContent } from "../types/journeyContent";
import {
  Container,
  Pagination,
  PaginationItem,
  PaginationLink
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { DisplayResult } from "../components/DisplayResult";
import { Search } from "../components/Search";

export const Journeys = () => {
  const [result, setResult] = useState<JourneyContent>();
  const [flag, setFlag] = useState<boolean>(false);
  const navigate = useNavigate();
  const [journeyContent, setJourneyContent] = useState<JourneyContent>({
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
      console.log("inside ",flag
      );
      api(journeyContent.pageNumber, journeyContent.pageSize);
    },
    []
  );

  const changePage = (pageNumber = 0, pageSize = 5) => {
    if (pageNumber > journeyContent.pageNumber && journeyContent.content) {
      setJourneyContent({
        ...journeyContent,
        pageNumber: pageNumber
      });
      return;
    }

    if (
      pageNumber < journeyContent.pageNumber &&
      journeyContent.pageNumber > 0
    ) {
      setJourneyContent({
        ...journeyContent,
        pageNumber: pageNumber
      });
      return;
    }
  };
  
   /* const callbackFunction = (flag: boolean) => {
      setFlag(flag);
};  */ 

  return (
    <div>
      <h1 className="heading">Journey</h1>
        {/* <Search parentCallback = {callbackFunction}/>  */}  
      {result?.content ? <DisplayResult parentToChild = {result?.content} /> &&
      <Container className="mt-3 container">
        <Pagination size="lg" className="pagination">
          <PaginationItem
            className="pagination-item"
            onClick={() => changePage(journeyContent.pageNumber - 1)}
            disabled={journeyContent.pageNumber === 0}
          >
            <PaginationLink className="pagination-link" previous />
          </PaginationItem>

          <PaginationItem
            className="pagination-item"
            onClick={() => changePage(journeyContent.pageNumber + 1)}
            disabled={journeyContent.lastPage}
          >
            <PaginationLink className="pagination-link" next />
          </PaginationItem>
        </Pagination>
      </Container>
      : null}
      <div className="back">
        <button onClick={() => navigate(-1)}>Go back</button>
      </div>
    </div>
  );
};
