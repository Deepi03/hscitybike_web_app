import React, { useEffect, useState } from "react";
import { Journey } from "../types/journey";
import { DisplayResult } from "./DisplayResult";

export const Search = ({ props }: any) => {
  const [result, setResult] = useState<Journey[]>();

  const api = async (text: string) => {
    const data = await fetch(
      `http://localhost:8080/api/journey/search?text=${text}`
    );
    const jsonData = await data.json();
    setResult(jsonData);
  };

  const inputHandler = (e: any) => {
    props.parentCallback(true);
    api(e.target.value);
  };

  useEffect(
    () => {
      props.parentCallback(true);
    },
    [props]
  );

  return (
    <div className="container">
      <input
        id="filled-basic"
        onChange={inputHandler}
        placeholder="Search"
        className="search-textField"
      />
      {result ? <DisplayResult parentToChild={result} /> : null}
    </div>
  );
};
