import * as React from "react";

interface Props {
  message: string
}

export const FailComponent: React.FC<Props> = (props) => {

  return (
    <>
        <p>{props.message}</p>
    </>
  );
};
