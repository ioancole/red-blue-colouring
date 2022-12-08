import * as React from "react";

interface Props {
}

export const TitleComponent: React.FC<Props> = (props) => {
  return <div>
    <br/><br/>
      <h2>Welcome to the Red-Blue Colouring app!</h2>
      <p>This web application will check if a graph is red-blue colourable.
A graph is red-blue colourable if two connected nodes never have the same colour, and the graph is a connected graph.
You can enter a graph in the textarea by typing some paths (a word is a node, a dash an edge and a new line or a comma a separation between paths).</p>

Some examples inputs:
<ul>
<li>a - b - c</li>
<li>a - b, f - g</li>
<li>a - b - c - a</li>
<li>a - b, c - d, b - c, a - d</li>
</ul>
<p>(Note - all spaces will be removed before colouring the graph)</p>
    </div>;
};
