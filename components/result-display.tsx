"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Check, Route, Search } from "lucide-react"
import MapVisualization from "./map-visualization"
import AlgorithmDescription from "./algorithm-description"

interface ResultDisplayProps {
  results: {
    algorithm: string
    path: string[]
    distance: number
    nodesExpanded: number
    nodesGenerated: number
    maxFrontierSize: number
    executionTime: number
  }
}

export default function ResultDisplay({ results }: ResultDisplayProps) {
  const getAlgorithmName = (algorithm: string) => {
    switch (algorithm) {
      case "bfs":
        return "Busca em Largura"
      case "ucs":
        return "Busca de Custo Uniforme"
      case "dfs":
        return "Busca em Profundidade"
      case "dls":
        return "Busca em Profundidade Limitada"
      case "ids":
        return "Busca de Aprofundamento Iterativo"
      case "bidirectional":
        return "Busca Bidirecional"
      case "greedy":
        return "Busca Gulosa"
      case "astar":
        return "Algoritmo A*"
      default:
        return algorithm
    }
  }

  return (
    <ScrollArea className="h-[600px] pr-4">
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Check className="h-6 w-6 text-emerald-400" />
          <h2 className="text-2xl font-bold text-emerald-400">Resultados da Busca</h2>
        </div>

        <Card className="bg-white/5 border-white/20">
          <CardHeader>
            <CardTitle className="text-xl font-medium text-emerald-300">
              {getAlgorithmName(results.algorithm)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-emerald-200 mb-2">Caminho Encontrado</h3>
                <div className="bg-white/5 rounded-lg p-3 text-white">{results.path.join(" → ")}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-lg p-4 flex flex-col items-center justify-center">
                  <Route className="h-8 w-8 text-emerald-400 mb-2" />
                  <div className="text-2xl font-bold">{results.distance} km</div>
                  <div className="text-sm text-gray-300">Distância Total</div>
                </div>

                <div className="bg-white/5 rounded-lg p-4 flex flex-col items-center justify-center">
                  <Search className="h-8 w-8 text-emerald-400 mb-2" />
                  <div className="text-2xl font-bold">{results.path.length}</div>
                  <div className="text-sm text-gray-300">Cidades Visitadas</div>
                </div>
              </div>

              <Separator className="bg-white/20" />

              <div>
                <h3 className="text-lg font-medium text-emerald-200 mb-2">Métricas de Desempenho</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-emerald-200">Nós Expandidos</div>
                    <div className="text-lg">{results.nodesExpanded}</div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-sm font-medium text-emerald-200">Nós Gerados</div>
                    <div className="text-lg">{results.nodesGenerated}</div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-sm font-medium text-emerald-200">Tamanho Máximo da Fronteira</div>
                    <div className="text-lg">{results.maxFrontierSize}</div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-sm font-medium text-emerald-200">Tempo de Execução</div>
                    <div className="text-lg">{results.executionTime.toFixed(2)} ms</div>
                  </div>
                </div>
              </div>

              <Separator className="bg-white/20" />

              <div>
                <h3 className="text-lg font-medium text-emerald-200 mb-2">Visualização do Mapa</h3>
                <MapVisualization highlightedPath={results.path} />
              </div>

              <Separator className="bg-white/20" />

              <div>
                <h3 className="text-lg font-medium text-emerald-200 mb-2">Informações do Algoritmo</h3>
                <AlgorithmDescription algorithm={results.algorithm} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  )
}

