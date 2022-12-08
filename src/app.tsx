import * as React from "react";
import { TitleComponent } from "./components/title";
import { PathsInputComponent } from "./components/pathsInput";
import { SuccessComponent } from "./components/success";
import { FailComponent } from "./components/fail";

import { colourGraph } from "./colourGraph";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

export const App = () => {

  const [paths, setPaths] = React.useState("");
  const [algoSuccess, setAlgoSuccess] = React.useState(false);
  const [failMessage, setFailMessage] = React.useState("");
  const [calcResults, setCalcResults] = React.useState(undefined);

  const submitPaths = () => {
    try {
      let results = colourGraph(paths);
      setAlgoSuccess(true);
      setCalcResults(results);
    } catch (e) {
      setAlgoSuccess(false);
      setFailMessage(e.message);
    }
  };

  return (
    <div className="container">
      <div className="row">
      <div className="col-sm-2">
      </div>
      <div className="col-sm-8">

      <TitleComponent/>

      <PathsInputComponent
        updatePaths={setPaths}
        submitPaths={submitPaths}
      />

    <br/>

    { algoSuccess &&
      <SuccessComponent results={calcResults} /> }

    { !algoSuccess &&
      <FailComponent message={failMessage} /> }
    </div>
    </div>
  </div>

  );
};
