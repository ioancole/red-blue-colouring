import * as React from "react";

interface Props {
  updatePaths: (s: string) => any;
  submitPaths: () => any;
}

export const PathsInputComponent: React.FC<Props> = (props) => {
  const onChange = (e) => {
    props.updatePaths(e.target.value);
  };

  return (
    <>
      <label>Insert paths string:</label>
      <br/>
      <br/>
      <textarea onChange={onChange}/>
      <br/>
      <br/>
      <button type="button" className="btn btn-primary" onClick={props.submitPaths}>Calculate!</button>
    </>
  );
};
