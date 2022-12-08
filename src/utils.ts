
export type AdjValue = 0 | 1;
export type AdjMatrix = Array<Array<AdjValue>>;

export interface Graph {
  nodeNames: Array<string>,
  adjMatrix: AdjMatrix
};

export interface ResultsData {
  graph: Graph,
  colouredNodes: Array<ColouredNode>
};

export function setAdjMatrixValue(
  G: AdjMatrix,
  i: number,
  j: number,
  x: AdjValue
): AdjMatrix {
  // clone ith row
  let row_i: Array<AdjValue> = G[i].slice();

  // set jth col. in ith row
  row_i.splice(j, 1, x);

  // replace ith row
  G.splice(i, 1, row_i);
  return G;
}

export interface QueueNode {
  node: number;
  colour: number;
}

export interface ColouredNode {
  node: string;
  colour: string;
}
