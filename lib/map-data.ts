export const cities = [
    "Arad",
    "Bucharest",
    "Craiova",
    "Drobeta",
    "Eforie",
    "Fagaras",
    "Giurgiu",
    "Hirsova",
    "Iasi",
    "Lugoj",
    "Mehadia",
    "Neamt",
    "Oradea",
    "Pitesti",
    "Rimnicu Vilcea",
    "Sibiu",
    "Timisoara",
    "Urziceni",
    "Vaslui",
    "Zerind",
  ]
  
  export const roadMap: Record<string, Record<string, number>> = {
    Arad: {
      Zerind: 75,
      Sibiu: 140,
      Timisoara: 118,
    },
    Bucharest: {
      Fagaras: 211,
      Pitesti: 101,
      Giurgiu: 90,
      Urziceni: 85,
    },
    Craiova: {
      Drobeta: 120,
      "Rimnicu Vilcea": 146,
      Pitesti: 138,
    },
    Drobeta: {
      Mehadia: 75,
      Craiova: 120,
    },
    Eforie: {
      Hirsova: 86,
    },
    Fagaras: {
      Sibiu: 99,
      Bucharest: 211,
    },
    Giurgiu: {
      Bucharest: 90,
    },
    Hirsova: {
      Urziceni: 98,
      Eforie: 86,
    },
    Iasi: {
      Neamt: 87,
      Vaslui: 92,
    },
    Lugoj: {
      Timisoara: 111,
      Mehadia: 70,
    },
    Mehadia: {
      Lugoj: 70,
      Drobeta: 75,
    },
    Neamt: {
      Iasi: 87,
    },
    Oradea: {
      Zerind: 71,
      Sibiu: 151,
    },
    Pitesti: {
      "Rimnicu Vilcea": 97,
      Craiova: 138,
      Bucharest: 101,
    },
    "Rimnicu Vilcea": {
      Sibiu: 80,
      Pitesti: 97,
      Craiova: 146,
    },
    Sibiu: {
      Arad: 140,
      Oradea: 151,
      Fagaras: 99,
      "Rimnicu Vilcea": 80,
    },
    Timisoara: {
      Arad: 118,
      Lugoj: 111,
    },
    Urziceni: {
      Bucharest: 85,
      Vaslui: 142,
      Hirsova: 98,
    },
    Vaslui: {
      Iasi: 92,
      Urziceni: 142,
    },
    Zerind: {
      Arad: 75,
      Oradea: 71,
    },
  }
  
  export const straightLineDistanceToBucharest: Record<string, number> = {
    Arad: 366,
    Bucharest: 0,
    Craiova: 160,
    Drobeta: 242,
    Eforie: 161,
    Fagaras: 176,
    Giurgiu: 77,
    Hirsova: 151,
    Iasi: 226,
    Lugoj: 244,
    Mehadia: 241,
    Neamt: 234,
    Oradea: 380,
    Pitesti: 100,
    "Rimnicu Vilcea": 193,
    Sibiu: 253,
    Timisoara: 329,
    Urziceni: 80,
    Vaslui: 199,
    Zerind: 374,
  }
  
  export const cityCoordinates: Record<string, { x: number; y: number }> = {
    Arad: { x: 91, y: 215 },
    Zerind: { x: 94, y: 185 },
    Oradea: { x: 107, y: 145 },
    Sibiu: { x: 207, y: 215 },
    Fagaras: { x: 305, y: 195 },
    Timisoara: { x: 94, y: 290 },
    Lugoj: { x: 165, y: 300 },
    Mehadia: { x: 165, y: 330 },
    Drobeta: { x: 165, y: 370 },
    Craiova: { x: 220, y: 370 },
    "Rimnicu Vilcea": { x: 233, y: 275 },
    Pitesti: { x: 305, y: 300 },
    Bucharest: { x: 360, y: 330 },
    Giurgiu: { x: 350, y: 390 },
    Urziceni: { x: 425, y: 330 },
    Hirsova: { x: 485, y: 290 },
    Eforie: { x: 525, y: 340 },
    Vaslui: { x: 480, y: 215 },
    Iasi: { x: 455, y: 165 },
    Neamt: { x: 400, y: 145 },
  }
  
  