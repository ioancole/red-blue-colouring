import { setAdjMatrixValue, AdjMatrix, Graph, ResultsData } from "./utils";
import { QueueNode, ColouredNode } from "./utils";

function buildGraph(strings: string): Graph {
  let paths = strings
    .replace(/ /g, '')
    .split(",")
    .map((a) => a.split("\n"))
    .flat(1);

  // Compile list of node names
  let graphNodes: Array<string> = [
    ...new Set(paths.map((p) => p.split("-")).flat(1)),
  ];

  let N = graphNodes.length;
  let G: AdjMatrix = Array(N).fill(Array(N).fill(0)); // N x N zeroes

  for (let p of paths) {
    let nodes = p.split("-");
    for (let i = 0; i < nodes.length - 1; i++) {
      let n = nodes[i];
      let m = nodes[i + 1];

      let index_n = graphNodes.indexOf(n);
      let index_m = graphNodes.indexOf(m);

      G = setAdjMatrixValue(G, index_n, index_m, 1);
      G = setAdjMatrixValue(G, index_m, index_n, 1);
    }
  }

  return {
    nodeNames: graphNodes,
    adjMatrix: G
  };
}

// Note that every bipartite graph (2-colourable) has a unique red-blue colouring.
// This makes the algorithm quite simple:
// - Traverse the graph in any type of node-by-node search - I have used a breadth first search because it's the easiest.
//   A depth-first search (or any other) would also work.
// - Colour each new node in the opposite colour to the previous node in the traversal.
// - If the node is already coloured in a different colour, then no red-blue colouring exists for the graph.
function colourGraphNodes(G: Graph): Map<number, number> {
  let N: number = G.adjMatrix.length;
  let colouredNodes = new Map<number, number>();

  colouredNodes.set(0, 0); // 0th node is coloured in 0th colour

  // queue for breadth-first search
  let nodesQueue: Array<QueueNode> = [{ node: 0, colour: 0 }];

  while (nodesQueue.length > 0) {
    let n = nodesQueue.pop();

    // Different colour for this node's neighbour
    let nextColour = (n.colour + 1) % 2;

    for (let i = 0; i < N; i++) {
      if (G.adjMatrix[n.node][i] > 0) {
        if (!colouredNodes.has(i)) {
          // Node is new - colour it and add to back of queue
          colouredNodes.set(i, nextColour);
          nodesQueue.unshift({ node: i, colour: nextColour });
        } else {
          // Node has already been coloured
          if (colouredNodes.get(i) !== nextColour) {
            throw Error("Graph not red-blue colourable!");
          }
        }
      }
    }
  }

  if (colouredNodes.size < N) throw Error("Graph is not connected!");

  return colouredNodes;
}

export function colourGraph(strings: string): ResultsData {
  let colours = ["red", "blue"];

  console.log(strings);

  let G = buildGraph(strings);

  console.log("Graph object:")
  console.log(G);

  let colouredNodesMap = colourGraphNodes(G);

  console.log("Coloured nodes Map:");
  console.log(colouredNodesMap);

  let colouredNodes: Array<ColouredNode> = G.nodeNames.map((n, i) => ({node: n, colour: colours[colouredNodesMap.get(i)] }));

  console.log("Node names with colours:");
  console.log(colouredNodes);

  return {
    graph: G,
    colouredNodes
  };
}
