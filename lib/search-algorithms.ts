import { straightLineDistanceToBucharest } from "./map-data"

type Node = {
  state: string
  parent: Node | null
  action: string | null
  pathCost: number
  depth: number
}

type SearchResult = {
  algorithm: string
  path: string[]
  distance: number
  nodesExpanded: number
  nodesGenerated: number
  maxFrontierSize: number
  executionTime: number
}

function getPath(node: Node): string[] {
  const path: string[] = []
  let current: Node | null = node

  while (current) {
    path.unshift(current.state)
    current = current.parent
  }

  return path
}

export function breadthFirstSearch(
  graph: Record<string, Record<string, number>>,
  start: string,
  goal: string,
): SearchResult {
  const startTime = performance.now()

  let nodesExpanded = 0
  let nodesGenerated = 1
  let maxFrontierSize = 1

  if (start === goal) {
    const endTime = performance.now()
    return {
      algorithm: "bfs",
      path: [start],
      distance: 0,
      nodesExpanded,
      nodesGenerated,
      maxFrontierSize,
      executionTime: endTime - startTime,
    }
  }

  const startNode: Node = { state: start, parent: null, action: null, pathCost: 0, depth: 0 }
  const frontier: Node[] = [startNode]
  const explored = new Set<string>()

  while (frontier.length > 0) {
    maxFrontierSize = Math.max(maxFrontierSize, frontier.length)

    const node = frontier.shift()!
    nodesExpanded++

    explored.add(node.state)

    const neighbors = graph[node.state] || {}

    for (const [neighbor, distance] of Object.entries(neighbors)) {
      const childNode: Node = {
        state: neighbor,
        parent: node,
        action: `${node.state} to ${neighbor}`,
        pathCost: node.pathCost + distance,
        depth: node.depth + 1,
      }
      nodesGenerated++

      if (neighbor === goal) {
        const path = getPath(childNode)
        const endTime = performance.now()
        return {
          algorithm: "bfs",
          path,
          distance: childNode.pathCost,
          nodesExpanded,
          nodesGenerated,
          maxFrontierSize,
          executionTime: endTime - startTime,
        }
      }

      if (!explored.has(neighbor) && !frontier.some((n) => n.state === neighbor)) {
        frontier.push(childNode)
      }
    }
  }

  const endTime = performance.now()
  return {
    algorithm: "bfs",
    path: [],
    distance: 0,
    nodesExpanded,
    nodesGenerated,
    maxFrontierSize,
    executionTime: endTime - startTime,
  }
}

export function uniformCostSearch(
  graph: Record<string, Record<string, number>>,
  start: string,
  goal: string,
): SearchResult {
  const startTime = performance.now()

  let nodesExpanded = 0
  let nodesGenerated = 1
  let maxFrontierSize = 1

  if (start === goal) {
    const endTime = performance.now()
    return {
      algorithm: "ucs",
      path: [start],
      distance: 0,
      nodesExpanded,
      nodesGenerated,
      maxFrontierSize,
      executionTime: endTime - startTime,
    }
  }

  const startNode: Node = { state: start, parent: null, action: null, pathCost: 0, depth: 0 }
  const frontier: Node[] = [startNode]
  const explored = new Set<string>()

  while (frontier.length > 0) {
    maxFrontierSize = Math.max(maxFrontierSize, frontier.length)

    frontier.sort((a, b) => a.pathCost - b.pathCost)
    const node = frontier.shift()!
    nodesExpanded++

    if (node.state === goal) {
      const path = getPath(node)
      const endTime = performance.now()
      return {
        algorithm: "ucs",
        path,
        distance: node.pathCost,
        nodesExpanded,
        nodesGenerated,
        maxFrontierSize,
        executionTime: endTime - startTime,
      }
    }

    explored.add(node.state)

    const neighbors = graph[node.state] || {}

    for (const [neighbor, distance] of Object.entries(neighbors)) {
      const childNode: Node = {
        state: neighbor,
        parent: node,
        action: `${node.state} to ${neighbor}`,
        pathCost: node.pathCost + distance,
        depth: node.depth + 1,
      }
      nodesGenerated++

      if (!explored.has(neighbor) && !frontier.some((n) => n.state === neighbor)) {
        frontier.push(childNode)
      } else {
        const existingIndex = frontier.findIndex((n) => n.state === neighbor)
        if (existingIndex !== -1 && frontier[existingIndex].pathCost > childNode.pathCost) {
          frontier[existingIndex] = childNode
        }
      }
    }
  }

  const endTime = performance.now()
  return {
    algorithm: "ucs",
    path: [],
    distance: 0,
    nodesExpanded,
    nodesGenerated,
    maxFrontierSize,
    executionTime: endTime - startTime,
  }
}

export function depthFirstSearch(
  graph: Record<string, Record<string, number>>,
  start: string,
  goal: string,
): SearchResult {
  const startTime = performance.now()

  let nodesExpanded = 0
  let nodesGenerated = 1
  let maxFrontierSize = 1

  if (start === goal) {
    const endTime = performance.now()
    return {
      algorithm: "dfs",
      path: [start],
      distance: 0,
      nodesExpanded,
      nodesGenerated,
      maxFrontierSize,
      executionTime: endTime - startTime,
    }
  }

  const startNode: Node = { state: start, parent: null, action: null, pathCost: 0, depth: 0 }
  const frontier: Node[] = [startNode]
  const explored = new Set<string>()

  while (frontier.length > 0) {
    maxFrontierSize = Math.max(maxFrontierSize, frontier.length)

    const node = frontier.pop()!
    nodesExpanded++

    if (node.state === goal) {
      const path = getPath(node)
      const endTime = performance.now()
      return {
        algorithm: "dfs",
        path,
        distance: node.pathCost,
        nodesExpanded,
        nodesGenerated,
        maxFrontierSize,
        executionTime: endTime - startTime,
      }
    }

    explored.add(node.state)

    const neighbors = graph[node.state] || {}

    const neighborEntries = Object.entries(neighbors)
    for (let i = neighborEntries.length - 1; i >= 0; i--) {
      const [neighbor, distance] = neighborEntries[i]

      if (!explored.has(neighbor) && !frontier.some((n) => n.state === neighbor)) {
        const childNode: Node = {
          state: neighbor,
          parent: node,
          action: `${node.state} to ${neighbor}`,
          pathCost: node.pathCost + distance,
          depth: node.depth + 1,
        }
        nodesGenerated++

        frontier.push(childNode)
      }
    }
  }

  const endTime = performance.now()
  return {
    algorithm: "dfs",
    path: [],
    distance: 0,
    nodesExpanded,
    nodesGenerated,
    maxFrontierSize,
    executionTime: endTime - startTime,
  }
}

export function depthLimitedSearch(
  graph: Record<string, Record<string, number>>,
  start: string,
  goal: string,
  depthLimit: number,
): SearchResult {
  const startTime = performance.now()

  let nodesExpanded = 0
  let nodesGenerated = 1
  let maxFrontierSize = 1

  if (start === goal) {
    const endTime = performance.now()
    return {
      algorithm: "dls",
      path: [start],
      distance: 0,
      nodesExpanded,
      nodesGenerated,
      maxFrontierSize,
      executionTime: endTime - startTime,
    }
  }

  const startNode: Node = { state: start, parent: null, action: null, pathCost: 0, depth: 0 }
  const frontier: Node[] = [startNode]
  const explored = new Set<string>()

  while (frontier.length > 0) {
    maxFrontierSize = Math.max(maxFrontierSize, frontier.length)

    const node = frontier.pop()!
    nodesExpanded++

    if (node.state === goal) {
      const path = getPath(node)
      const endTime = performance.now()
      return {
        algorithm: "dls",
        path,
        distance: node.pathCost,
        nodesExpanded,
        nodesGenerated,
        maxFrontierSize,
        executionTime: endTime - startTime,
      }
    }

    explored.add(node.state)

    if (node.depth < depthLimit) {
      const neighbors = graph[node.state] || {}

      const neighborEntries = Object.entries(neighbors)
      for (let i = neighborEntries.length - 1; i >= 0; i--) {
        const [neighbor, distance] = neighborEntries[i]

        if (!explored.has(neighbor) && !frontier.some((n) => n.state === neighbor)) {
          const childNode: Node = {
            state: neighbor,
            parent: node,
            action: `${node.state} to ${neighbor}`,
            pathCost: node.pathCost + distance,
            depth: node.depth + 1,
          }
          nodesGenerated++

          frontier.push(childNode)
        }
      }
    }
  }

  const endTime = performance.now()
  return {
    algorithm: "dls",
    path: [],
    distance: 0,
    nodesExpanded,
    nodesGenerated,
    maxFrontierSize,
    executionTime: endTime - startTime,
  }
}

export function iterativeDeepeningSearch(
  graph: Record<string, Record<string, number>>,
  start: string,
  goal: string,
): SearchResult {
  const startTime = performance.now()

  let nodesExpanded = 0
  let nodesGenerated = 0
  let maxFrontierSize = 0

  if (start === goal) {
    return {
      algorithm: "ids",
      path: [start],
      distance: 0,
      nodesExpanded: 1,
      nodesGenerated: 1,
      maxFrontierSize: 1,
      executionTime: performance.now() - startTime,
    }
  }

  for (let depthLimit = 0; depthLimit < 100; depthLimit++) {
    const startNode: Node = { state: start, parent: null, action: null, pathCost: 0, depth: 0 }
    const frontier: Node[] = [startNode]

    let currentNodesExpanded = 0
    let currentNodesGenerated = 1
    let currentMaxFrontierSize = 1

    while (frontier.length > 0) {
      currentMaxFrontierSize = Math.max(currentMaxFrontierSize, frontier.length)

      const node = frontier.pop()!
      currentNodesExpanded++

      if (node.state === goal) {
        const path = getPath(node)
        const endTime = performance.now()

        nodesExpanded += currentNodesExpanded
        nodesGenerated += currentNodesGenerated
        maxFrontierSize = Math.max(maxFrontierSize, currentMaxFrontierSize)

        return {
          algorithm: "ids",
          path,
          distance: node.pathCost,
          nodesExpanded,
          nodesGenerated,
          maxFrontierSize,
          executionTime: endTime - startTime,
        }
      }

      if (node.depth < depthLimit) {
        const neighbors = graph[node.state] || {}

        const neighborEntries = Object.entries(neighbors)
        for (let i = neighborEntries.length - 1; i >= 0; i--) {
          const [neighbor, distance] = neighborEntries[i]

          const childNode: Node = {
            state: neighbor,
            parent: node,
            action: `${node.state} to ${neighbor}`,
            pathCost: node.pathCost + distance,
            depth: node.depth + 1,
          }
          currentNodesGenerated++

          let isInPath = false
          let current: Node | null = node
          while (current) {
            if (current.state === neighbor) {
              isInPath = true
              break
            }
            current = current.parent
          }

          if (!isInPath) {
            frontier.push(childNode)
          }
        }
      }
    }

    nodesExpanded += currentNodesExpanded
    nodesGenerated += currentNodesGenerated
    maxFrontierSize = Math.max(maxFrontierSize, currentMaxFrontierSize)
  }

  const endTime = performance.now()
  return {
    algorithm: "ids",
    path: [],
    distance: 0,
    nodesExpanded,
    nodesGenerated,
    maxFrontierSize,
    executionTime: endTime - startTime,
  }
}

export function bidirectionalSearch(
  graph: Record<string, Record<string, number>>,
  start: string,
  goal: string,
): SearchResult {
  const startTime = performance.now()

  let nodesExpanded = 0
  let nodesGenerated = 2
  let maxFrontierSize = 2

  if (start === goal) {
    const endTime = performance.now()
    return {
      algorithm: "bidirectional",
      path: [start],
      distance: 0,
      nodesExpanded,
      nodesGenerated,
      maxFrontierSize,
      executionTime: endTime - startTime,
    }
  }

  const startNode: Node = { state: start, parent: null, action: null, pathCost: 0, depth: 0 }
  const forwardFrontier: Node[] = [startNode]
  const forwardExplored = new Map<string, Node>()

  const goalNode: Node = { state: goal, parent: null, action: null, pathCost: 0, depth: 0 }
  const backwardFrontier: Node[] = [goalNode]
  const backwardExplored = new Map<string, Node>()

  while (forwardFrontier.length > 0 && backwardFrontier.length > 0) {
    maxFrontierSize = Math.max(maxFrontierSize, forwardFrontier.length + backwardFrontier.length)

    const forwardNode = forwardFrontier.shift()!
    nodesExpanded++

    forwardExplored.set(forwardNode.state, forwardNode)

    if (backwardExplored.has(forwardNode.state)) {
      const backwardNode = backwardExplored.get(forwardNode.state)!

      const forwardPath = getPath(forwardNode)

      const backwardPath = getPath(backwardNode).reverse()
      backwardPath.shift()

      const path = [...forwardPath, ...backwardPath]

      const totalDistance = forwardNode.pathCost + backwardNode.pathCost

      const endTime = performance.now()
      return {
        algorithm: "bidirectional",
        path,
        distance: totalDistance,
        nodesExpanded,
        nodesGenerated,
        maxFrontierSize,
        executionTime: endTime - startTime,
      }
    }

    const forwardNeighbors = graph[forwardNode.state] || {}
    for (const [neighbor, distance] of Object.entries(forwardNeighbors)) {
      if (!forwardExplored.has(neighbor) && !forwardFrontier.some((n) => n.state === neighbor)) {
        const childNode: Node = {
          state: neighbor,
          parent: forwardNode,
          action: `${forwardNode.state} to ${neighbor}`,
          pathCost: forwardNode.pathCost + distance,
          depth: forwardNode.depth + 1,
        }
        nodesGenerated++
        forwardFrontier.push(childNode)
      }
    }

    const backwardNode = backwardFrontier.shift()!
    nodesExpanded++

    backwardExplored.set(backwardNode.state, backwardNode)

    if (forwardExplored.has(backwardNode.state)) {
      const forwardNode = forwardExplored.get(backwardNode.state)!

      const forwardPath = getPath(forwardNode)

      const backwardPath = getPath(backwardNode).reverse()
      backwardPath.shift()

      const path = [...forwardPath, ...backwardPath]

      const totalDistance = forwardNode.pathCost + backwardNode.pathCost

      const endTime = performance.now()
      return {
        algorithm: "bidirectional",
        path,
        distance: totalDistance,
        nodesExpanded,
        nodesGenerated,
        maxFrontierSize,
        executionTime: endTime - startTime,
      }
    }

    for (const [city, neighbors] of Object.entries(graph)) {
      if (neighbors[backwardNode.state] !== undefined) {
        const distance = neighbors[backwardNode.state]

        if (!backwardExplored.has(city) && !backwardFrontier.some((n) => n.state === city)) {
          const childNode: Node = {
            state: city,
            parent: backwardNode,
            action: `${city} to ${backwardNode.state}`,
            pathCost: backwardNode.pathCost + distance,
            depth: backwardNode.depth + 1,
          }
          nodesGenerated++
          backwardFrontier.push(childNode)
        }
      }
    }
  }

  const endTime = performance.now()
  return {
    algorithm: "bidirectional",
    path: [],
    distance: 0,
    nodesExpanded,
    nodesGenerated,
    maxFrontierSize,
    executionTime: endTime - startTime,
  }
}

function getHeuristic(state: string, goal: string): number {
  if (goal === "Bucharest") {
    return straightLineDistanceToBucharest[state] || 0
  }

  return 0
}

export function greedySearch(graph: Record<string, Record<string, number>>, start: string, goal: string): SearchResult {
  const startTime = performance.now()

  let nodesExpanded = 0
  let nodesGenerated = 1
  let maxFrontierSize = 1

  if (start === goal) {
    const endTime = performance.now()
    return {
      algorithm: "greedy",
      path: [start],
      distance: 0,
      nodesExpanded,
      nodesGenerated,
      maxFrontierSize,
      executionTime: endTime - startTime,
    }
  }

  const startNode: Node = { state: start, parent: null, action: null, pathCost: 0, depth: 0 }
  const frontier: Node[] = [startNode]
  const explored = new Set<string>()

  while (frontier.length > 0) {
    maxFrontierSize = Math.max(maxFrontierSize, frontier.length)

    frontier.sort((a, b) => getHeuristic(a.state, goal) - getHeuristic(b.state, goal))
    const node = frontier.shift()!
    nodesExpanded++

    if (node.state === goal) {
      const path = getPath(node)
      const endTime = performance.now()
      return {
        algorithm: "greedy",
        path,
        distance: node.pathCost,
        nodesExpanded,
        nodesGenerated,
        maxFrontierSize,
        executionTime: endTime - startTime,
      }
    }

    explored.add(node.state)

    const neighbors = graph[node.state] || {}

    for (const [neighbor, distance] of Object.entries(neighbors)) {
      const childNode: Node = {
        state: neighbor,
        parent: node,
        action: `${node.state} to ${neighbor}`,
        pathCost: node.pathCost + distance,
        depth: node.depth + 1,
      }
      nodesGenerated++

      if (!explored.has(neighbor) && !frontier.some((n) => n.state === neighbor)) {
        frontier.push(childNode)
      }
    }
  }

  const endTime = performance.now()
  return {
    algorithm: "greedy",
    path: [],
    distance: 0,
    nodesExpanded,
    nodesGenerated,
    maxFrontierSize,
    executionTime: endTime - startTime,
  }
}

export function aStarSearch(graph: Record<string, Record<string, number>>, start: string, goal: string): SearchResult {
  const startTime = performance.now()

  let nodesExpanded = 0
  let nodesGenerated = 1
  let maxFrontierSize = 1

  if (start === goal) {
    const endTime = performance.now()
    return {
      algorithm: "astar",
      path: [start],
      distance: 0,
      nodesExpanded,
      nodesGenerated,
      maxFrontierSize,
      executionTime: endTime - startTime,
    }
  }

  const startNode: Node = { state: start, parent: null, action: null, pathCost: 0, depth: 0 }
  const frontier: Node[] = [startNode]
  const explored = new Set<string>()

  while (frontier.length > 0) {
    maxFrontierSize = Math.max(maxFrontierSize, frontier.length)

    frontier.sort((a, b) => a.pathCost + getHeuristic(a.state, goal) - (b.pathCost + getHeuristic(b.state, goal)))
    const node = frontier.shift()!
    nodesExpanded++

    if (node.state === goal) {
      const path = getPath(node)
      const endTime = performance.now()
      return {
        algorithm: "astar",
        path,
        distance: node.pathCost,
        nodesExpanded,
        nodesGenerated,
        maxFrontierSize,
        executionTime: endTime - startTime,
      }
    }

    explored.add(node.state)

    const neighbors = graph[node.state] || {}

    for (const [neighbor, distance] of Object.entries(neighbors)) {
      const childNode: Node = {
        state: neighbor,
        parent: node,
        action: `${node.state} to ${neighbor}`,
        pathCost: node.pathCost + distance,
        depth: node.depth + 1,
      }
      nodesGenerated++

      if (!explored.has(neighbor)) {
        const existingIndex = frontier.findIndex((n) => n.state === neighbor)
        if (existingIndex === -1) {
          frontier.push(childNode)
        } else {
          if (frontier[existingIndex].pathCost > childNode.pathCost) {
            frontier[existingIndex] = childNode
          }
        }
      }
    }
  }

  const endTime = performance.now()
  return {
    algorithm: "astar",
    path: [],
    distance: 0,
    nodesExpanded,
    nodesGenerated,
    maxFrontierSize,
    executionTime: endTime - startTime,
  }
}


