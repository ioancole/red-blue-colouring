import * as React from "react";
import {ResultsData} from "../utils";

interface Props {
  results: ResultsData
}

export const SuccessComponent: React.FC<Props> = (props) => {
  return (
    <>
      <p>Graph is red-blue colourable!</p>
        <ol>
          {
          props.results.colouredNodes.map(n => 
            <li key={n.node} className={n.colour}>{n.node}: {n.colour}</li>
            )
          }
        </ol>
    </>
  );
};
