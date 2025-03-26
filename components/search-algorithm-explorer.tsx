"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Info, MapPin, Route, Search } from "lucide-react"
import MapVisualization from "./map-visualization"
import ResultDisplay from "./result-display"
import { cities, roadMap } from "@/lib/map-data"
import {
  breadthFirstSearch,
  uniformCostSearch,
  depthFirstSearch,
  depthLimitedSearch,
  iterativeDeepeningSearch,
  bidirectionalSearch,
  greedySearch,
  aStarSearch,
} from "@/lib/search-algorithms"

export default function SearchAlgorithmExplorer() {
  const [startCity, setStartCity] = useState<string>("")
  const [endCity, setEndCity] = useState<string>("")
  const [currentTab, setCurrentTab] = useState("introduction")
  const [searchResults, setSearchResults] = useState<any>(null)
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("")

  const runSearch = () => {
    if (!startCity || !endCity) {
      return
    }

    let result
    switch (selectedAlgorithm) {
      case "bfs":
        result = breadthFirstSearch(roadMap, startCity, endCity)
        break
      case "ucs":
        result = uniformCostSearch(roadMap, startCity, endCity)
        break
      case "dfs":
        result = depthFirstSearch(roadMap, startCity, endCity)
        break
      case "dls":
        result = depthLimitedSearch(roadMap, startCity, endCity, 10)
        break
      case "ids":
        result = iterativeDeepeningSearch(roadMap, startCity, endCity)
        break
      case "bidirectional":
        result = bidirectionalSearch(roadMap, startCity, endCity)
        break
      case "greedy":
        result = greedySearch(roadMap, startCity, endCity)
        break
      case "astar":
        result = aStarSearch(roadMap, startCity, endCity)
        break
      default:
        return
    }

    setSearchResults(result)
    setCurrentTab("results")
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-sm border-none text-white">
        <CardHeader>
          <CardTitle className="text-3xl font-bold flex items-center gap-2">
            <Route className="h-8 w-8 text-emerald-400" />
            Explorador de Algoritmos de Busca
          </CardTitle>
          <CardDescription className="text-gray-200">
            Explore e compare diferentes algoritmos de busca para encontrar caminhos entre cidades
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-white/10 backdrop-blur-sm border-none text-white">
            <CardHeader>
              <CardTitle className="text-xl font-medium flex items-center gap-2">
                <MapPin className="h-5 w-5 text-emerald-400" />
                Selecionar Cidades
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Cidade de Origem</label>
                <Select value={startCity} onValueChange={setStartCity}>
                  <SelectTrigger className="bg-white/5 border-white/20 text-white">
                    <SelectValue placeholder="Selecione a cidade de origem" />
                  </SelectTrigger>
                  <SelectContent className="bg-emerald-900 text-white border-white/20">
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Cidade de Destino</label>
                <Select value={endCity} onValueChange={setEndCity}>
                  <SelectTrigger className="bg-white/5 border-white/20 text-white">
                    <SelectValue placeholder="Selecione a cidade de destino" />
                  </SelectTrigger>
                  <SelectContent className="bg-emerald-900 text-white border-white/20">
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Separator className="bg-white/20" />
              <div className="space-y-2">
                <label className="text-sm font-medium">Algoritmo de Busca</label>
                <Select value={selectedAlgorithm} onValueChange={setSelectedAlgorithm}>
                  <SelectTrigger className="bg-white/5 border-white/20 text-white">
                    <SelectValue placeholder="Selecione o algoritmo" />
                  </SelectTrigger>
                  <SelectContent className="bg-emerald-900 text-white border-white/20">
                    <SelectItem value="bfs">1.1 Busca em Largura</SelectItem>
                    <SelectItem value="ucs">1.2 Busca de Custo Uniforme</SelectItem>
                    <SelectItem value="dfs">1.3 Busca em Profundidade</SelectItem>
                    <SelectItem value="dls">1.4 Busca em Profundidade Limitada</SelectItem>
                    <SelectItem value="ids">1.5 Busca de Aprofundamento Iterativo</SelectItem>
                    <SelectItem value="bidirectional">1.6 Busca Bidirecional</SelectItem>
                    <SelectItem value="greedy">2.1 Busca Gulosa</SelectItem>
                    <SelectItem value="astar">2.2 Algoritmo A*</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
                onClick={runSearch}
                disabled={!startCity || !endCity || !selectedAlgorithm}
              >
                <Search className="mr-2 h-4 w-4" />
                Encontrar Caminho
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-none text-white">
            <CardHeader>
              <CardTitle className="text-xl font-medium flex items-center gap-2">
                <Info className="h-5 w-5 text-emerald-400" />
                Navegação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-2">
                <Button
                  variant={currentTab === "introduction" ? "default" : "ghost"}
                  className={
                    currentTab === "introduction"
                      ? "bg-emerald-500 hover:bg-emerald-600"
                      : "text-white hover:bg-white/10"
                  }
                  onClick={() => setCurrentTab("introduction")}
                >
                  Introdução
                </Button>
                <Button
                  variant={currentTab === "theory" ? "default" : "ghost"}
                  className={
                    currentTab === "theory" ? "bg-emerald-500 hover:bg-emerald-600" : "text-white hover:bg-white/10"
                  }
                  onClick={() => setCurrentTab("theory")}
                >
                  Base Teórica
                </Button>
                <Button
                  variant={currentTab === "methodology" ? "default" : "ghost"}
                  className={
                    currentTab === "methodology"
                      ? "bg-emerald-500 hover:bg-emerald-600"
                      : "text-white hover:bg-white/10"
                  }
                  onClick={() => setCurrentTab("methodology")}
                >
                  Metodologia
                </Button>
                <Button
                  variant={currentTab === "results" ? "default" : "ghost"}
                  className={
                    currentTab === "results" ? "bg-emerald-500 hover:bg-emerald-600" : "text-white hover:bg-white/10"
                  }
                  onClick={() => setCurrentTab("results")}
                >
                  Resultados
                </Button>
                <Button
                  variant={currentTab === "conclusion" ? "default" : "ghost"}
                  className={
                    currentTab === "conclusion" ? "bg-emerald-500 hover:bg-emerald-600" : "text-white hover:bg-white/10"
                  }
                  onClick={() => setCurrentTab("conclusion")}
                >
                  Conclusão
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="bg-white/10 backdrop-blur-sm border-none text-white h-full">
            <CardContent className="p-6">
              <Tabs value={currentTab} className="h-full">
                <TabsContent value="introduction" className="mt-0 h-full">
                  <ScrollArea className="h-[600px] pr-4">
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold text-emerald-400">Introdução aos Problemas de Busca</h2>
                      <p>
                        Problemas de busca são fundamentais em inteligência artificial e ciência da computação. Eles
                        envolvem encontrar um caminho de um estado inicial para um estado objetivo através de uma
                        sequência de ações. Nesta aplicação, exploramos vários algoritmos de busca aplicados a um
                        problema clássico: encontrar rotas entre cidades em um mapa.
                      </p>
                      <p>
                        O mapa representa cidades na Romênia, com estradas conectando-as e distâncias em quilômetros.
                        Este é um problema de referência bem conhecido em IA para testar e comparar algoritmos de busca.
                      </p>
                      <h3 className="text-xl font-semibold text-emerald-300 mt-6">Tipos de Algoritmos de Busca</h3>
                      <p>Os algoritmos de busca podem ser amplamente categorizados em dois tipos:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>
                          <span className="font-medium text-emerald-300">Busca Não Informada (Cega):</span> Esses
                          algoritmos não possuem informações adicionais sobre os estados além do que é fornecido na
                          definição do problema. Eles só podem gerar sucessores e distinguir um estado objetivo de um
                          estado não-objetivo.
                        </li>
                        <li>
                          <span className="font-medium text-emerald-300">Busca Informada (Heurística):</span> Esses
                          algoritmos usam conhecimento específico do problema além da definição do problema em si para
                          encontrar soluções de forma mais eficiente.
                        </li>
                      </ul>
                      <h3 className="text-xl font-semibold text-emerald-300 mt-6">O Problema do Mapa da Romênia</h3>
                      <p>
                        Nesta aplicação, usamos o mapa da Romênia como nosso espaço de busca. O problema é encontrar uma
                        rota de uma cidade para outra, otimizando pela menor distância percorrida.
                      </p>
                      <p>
                        Cada cidade é um nó em nosso grafo, e as estradas entre as cidades são arestas com pesos
                        representando distâncias. O objetivo é encontrar o caminho ideal entre quaisquer duas cidades
                        usando várias estratégias de busca.
                      </p>
                      <div className="mt-6">
                        <MapVisualization highlightedPath={[]} />
                      </div>
                      <p className="mt-4">
                        Para usar esta aplicação, selecione uma cidade de origem e uma cidade de destino, escolha um
                        algoritmo de busca e clique em &quot;Encontrar Caminho&quot; para ver os resultados. Você pode comparar
                        diferentes algoritmos para entender seus pontos fortes e fracos.
                      </p>
                    </div>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="theory" className="mt-0 h-full">
                  <ScrollArea className="h-[600px] pr-4">
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold text-emerald-400">Base Teórica dos Algoritmos de Busca</h2>

                      <h3 className="text-xl font-semibold text-emerald-300 mt-6">
                        1. Estratégias de Busca Não Informada (Cega)
                      </h3>

                      <h4 className="text-lg font-medium text-emerald-200 mt-4">1.1 Busca em Largura (BFS)</h4>
                      <p>
                        A BFS explora todos os nós vizinhos na profundidade atual antes de passar para nós no próximo
                        nível de profundidade. Utiliza uma fila FIFO (First-In-First-Out) para acompanhar os nós a serem
                        visitados.
                      </p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>
                          <span className="font-medium">Completude:</span> Sim, se o fator de ramificação for finito.
                        </li>
                        <li>
                          <span className="font-medium">Otimalidade:</span> Sim, se todos os custos de passo forem
                          iguais.
                        </li>
                        <li>
                          <span className="font-medium">Complexidade de Tempo:</span> O(b^d), onde b é o fator de
                          ramificação e d é a profundidade do objetivo.
                        </li>
                        <li>
                          <span className="font-medium">Complexidade de Espaço:</span> O(b^d), pois precisa armazenar
                          todos os nós na memória.
                        </li>
                      </ul>

                      <h4 className="text-lg font-medium text-emerald-200 mt-4">1.2 Busca de Custo Uniforme (UCS)</h4>
                      <p>
                        A UCS expande o nó com o menor custo de caminho. É semelhante à BFS, mas usa uma fila de
                        prioridade ordenada pelo custo cumulativo do caminho em vez de uma fila FIFO.
                      </p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>
                          <span className="font-medium">Completude:</span> Sim, se o custo do passo for maior que alguma
                          constante positiva.
                        </li>
                        <li>
                          <span className="font-medium">Otimalidade:</span> Sim, sempre encontra o caminho de menor
                          custo.
                        </li>
                        <li>
                          <span className="font-medium">Complexidade de Tempo:</span> O(b^(C*/ε)), onde C* é o custo da
                          solução ótima e ε é o custo mínimo de qualquer ação.
                        </li>
                        <li>
                          <span className="font-medium">Complexidade de Espaço:</span> O(b^(C*/ε)), pois precisa
                          armazenar todos os nós na memória.
                        </li>
                      </ul>

                      <h4 className="text-lg font-medium text-emerald-200 mt-4">1.3 Busca em Profundidade (DFS)</h4>
                      <p>
                        A DFS explora o mais longe possível ao longo de cada ramo antes de retroceder. Utiliza uma pilha
                        LIFO (Last-In-First-Out) para acompanhar os nós a serem visitados.
                      </p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>
                          <span className="font-medium">Completude:</span> Não, pode ficar presa em loops infinitos.
                        </li>
                        <li>
                          <span className="font-medium">Otimalidade:</span> Não, pode encontrar uma solução subótima.
                        </li>
                        <li>
                          <span className="font-medium">Complexidade de Tempo:</span> O(b^m), onde m é a profundidade
                          máxima da árvore de busca.
                        </li>
                        <li>
                          <span className="font-medium">Complexidade de Espaço:</span> O(bm), que é muito melhor que a
                          BFS.
                        </li>
                      </ul>

                      <h4 className="text-lg font-medium text-emerald-200 mt-4">
                        1.4 Busca em Profundidade Limitada (DLS)
                      </h4>
                      <p>
                        A DLS é uma variante da DFS que impõe um limite na profundidade da busca para evitar loops
                        infinitos.
                      </p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>
                          <span className="font-medium">Completude:</span> Não, se o objetivo estiver além do limite de
                          profundidade.
                        </li>
                        <li>
                          <span className="font-medium">Otimalidade:</span> Não, pode encontrar uma solução subótima.
                        </li>
                        <li>
                          <span className="font-medium">Complexidade de Tempo:</span> O(b^l), onde l é o limite de
                          profundidade.
                        </li>
                        <li>
                          <span className="font-medium">Complexidade de Espaço:</span> O(bl).
                        </li>
                      </ul>

                      <h4 className="text-lg font-medium text-emerald-200 mt-4">
                        1.5 Busca de Aprofundamento Iterativo (IDS)
                      </h4>
                      <p>
                        A IDS realiza DLS com limites de profundidade crescentes até que um objetivo seja encontrado.
                        Combina os benefícios da BFS e DFS.
                      </p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>
                          <span className="font-medium">Completude:</span> Sim, se o fator de ramificação for finito.
                        </li>
                        <li>
                          <span className="font-medium">Otimalidade:</span> Sim, se todos os custos de passo forem
                          iguais.
                        </li>
                        <li>
                          <span className="font-medium">Complexidade de Tempo:</span> O(b^d), semelhante à BFS.
                        </li>
                        <li>
                          <span className="font-medium">Complexidade de Espaço:</span> O(bd), semelhante à DFS.
                        </li>
                      </ul>

                      <h4 className="text-lg font-medium text-emerald-200 mt-4">1.6 Busca Bidirecional</h4>
                      <p>
                        A busca bidirecional executa duas buscas simultâneas—uma para frente a partir do estado inicial
                        e uma para trás a partir do objetivo—esperando se encontrar no meio.
                      </p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>
                          <span className="font-medium">Completude:</span> Sim, se ambas as buscas forem completas.
                        </li>
                        <li>
                          <span className="font-medium">Otimalidade:</span> Sim, se ambas as buscas forem ótimas.
                        </li>
                        <li>
                          <span className="font-medium">Complexidade de Tempo:</span> O(b^(d/2)), que é muito melhor que
                          a BFS.
                        </li>
                        <li>
                          <span className="font-medium">Complexidade de Espaço:</span> O(b^(d/2)), pois precisa
                          armazenar nós para ambas as buscas.
                        </li>
                      </ul>

                      <h3 className="text-xl font-semibold text-emerald-300 mt-6">
                        2. Estratégias de Busca Informada (Heurística)
                      </h3>

                      <h4 className="text-lg font-medium text-emerald-200 mt-4">2.1 Busca Gulosa</h4>
                      <p>
                        A busca gulosa expande o nó que parece estar mais próximo do objetivo de acordo com uma função
                        heurística h(n).
                      </p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>
                          <span className="font-medium">Completude:</span> Não, pode ficar presa em loops.
                        </li>
                        <li>
                          <span className="font-medium">Otimalidade:</span> Não, pode encontrar uma solução subótima.
                        </li>
                        <li>
                          <span className="font-medium">Complexidade de Tempo:</span> O(b^m), onde m é a profundidade
                          máxima da árvore de busca.
                        </li>
                        <li>
                          <span className="font-medium">Complexidade de Espaço:</span> O(b^m), pois precisa armazenar
                          todos os nós na memória.
                        </li>
                      </ul>

                      <h4 className="text-lg font-medium text-emerald-200 mt-4">2.2 Busca A*</h4>
                      <p>
                        A busca A* combina o custo para alcançar o nó (g(n)) e o custo estimado até o objetivo (h(n))
                        para determinar qual nó expandir a seguir. Utiliza a função de avaliação f(n) = g(n) + h(n).
                      </p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>
                          <span className="font-medium">Completude:</span> Sim, se a heurística for admissível e
                          consistente.
                        </li>
                        <li>
                          <span className="font-medium">Otimalidade:</span> Sim, se a heurística for admissível e
                          consistente.
                        </li>
                        <li>
                          <span className="font-medium">Complexidade de Tempo:</span> Exponencial no pior caso, mas
                          muito melhor na prática com uma boa heurística.
                        </li>
                        <li>
                          <span className="font-medium">Complexidade de Espaço:</span> Exponencial, pois precisa
                          armazenar todos os nós na memória.
                        </li>
                      </ul>

                      <p className="mt-4">
                        Esses algoritmos formam a base da busca em inteligência artificial e têm aplicações em vários
                        domínios, desde busca de caminhos em jogos até planejamento em robótica.
                      </p>
                    </div>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="methodology" className="mt-0 h-full">
                  <ScrollArea className="h-[600px] pr-4">
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold text-emerald-400">Metodologia</h2>

                      <h3 className="text-xl font-semibold text-emerald-300 mt-6">Representação do Problema</h3>
                      <p>
                        Para implementar e comparar diferentes algoritmos de busca, primeiro precisamos representar o
                        problema em um formato adequado:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>
                          <span className="font-medium">Representação do Grafo:</span> O mapa da Romênia é representado
                          como um grafo ponderado onde as cidades são nós e as estradas são arestas com distâncias como
                          pesos.
                        </li>
                        <li>
                          <span className="font-medium">Espaço de Estados:</span> Cada estado em nosso problema de busca
                          é uma cidade no mapa.
                        </li>
                        <li>
                          <span className="font-medium">Estado Inicial:</span> A cidade de origem selecionada pelo
                          usuário.
                        </li>
                        <li>
                          <span className="font-medium">Estado Objetivo:</span> A cidade de destino selecionada pelo
                          usuário.
                        </li>
                        <li>
                          <span className="font-medium">Ações:</span> Mover-se de uma cidade para uma cidade adjacente
                          através de uma estrada conectora.
                        </li>
                        <li>
                          <span className="font-medium">Custo do Caminho:</span> A soma das distâncias das estradas
                          percorridas.
                        </li>
                      </ul>

                      <h3 className="text-xl font-semibold text-emerald-300 mt-6">Abordagem de Implementação</h3>
                      <p>Para cada algoritmo de busca, implementamos os seguintes componentes:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>
                          <span className="font-medium">Estruturas de Dados:</span> Estruturas de dados apropriadas para
                          cada algoritmo (por exemplo, filas para BFS, pilhas para DFS, filas de prioridade para UCS e
                          A*).
                        </li>
                        <li>
                          <span className="font-medium">Representação do Nó:</span> Cada nó na árvore de busca contém o
                          estado atual (cidade), nó pai, ação tomada e custo do caminho.
                        </li>
                        <li>
                          <span className="font-medium">Gerenciamento da Fronteira:</span> Métodos para adicionar,
                          remover e verificar nós na fronteira com base na estratégia do algoritmo.
                        </li>
                        <li>
                          <span className="font-medium">Conjunto Explorado:</span> Um conjunto para acompanhar os
                          estados visitados para evitar ciclos.
                        </li>
                        <li>
                          <span className="font-medium">Teste de Objetivo:</span> Uma função para verificar se o estado
                          atual é o estado objetivo.
                        </li>
                        <li>
                          <span className="font-medium">Reconstrução do Caminho:</span> Um método para reconstruir o
                          caminho do estado inicial ao estado objetivo uma vez encontrado.
                        </li>
                      </ul>

                      <h3 className="text-xl font-semibold text-emerald-300 mt-6">Função Heurística</h3>
                      <p>
                        Para algoritmos de busca informada (Gulosa e A*), implementamos uma função heurística baseada na
                        distância em linha reta entre as cidades. Esta é uma heurística admissível, pois a distância em
                        linha reta é sempre menor ou igual à distância real da estrada.
                      </p>
                      <p>
                        As distâncias em linha reta foram pré-computadas e armazenadas em uma tabela de consulta para
                        eficiência.
                      </p>

                      <h3 className="text-xl font-semibold text-emerald-300 mt-6">Métricas de Avaliação</h3>
                      <p>Para comparar o desempenho de diferentes algoritmos, coletamos as seguintes métricas:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>
                          <span className="font-medium">Comprimento do Caminho:</span> O número de cidades no caminho do
                          estado inicial ao estado objetivo.
                        </li>
                        <li>
                          <span className="font-medium">Custo do Caminho:</span> A distância total do caminho.
                        </li>
                        <li>
                          <span className="font-medium">Nós Expandidos:</span> O número de nós que foram expandidos
                          durante a busca.
                        </li>
                        <li>
                          <span className="font-medium">Nós Gerados:</span> O número total de nós que foram gerados
                          (incluindo aqueles que não foram expandidos).
                        </li>
                        <li>
                          <span className="font-medium">Tamanho Máximo da Fronteira:</span> O número máximo de nós na
                          fronteira em qualquer ponto durante a busca.
                        </li>
                        <li>
                          <span className="font-medium">Tempo de Execução:</span> O tempo necessário para encontrar a
                          solução.
                        </li>
                      </ul>

                      <h3 className="text-xl font-semibold text-emerald-300 mt-6">Visualização</h3>
                      <p>
                        Para ajudar a entender o comportamento de cada algoritmo, implementamos um componente de
                        visualização que mostra:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>
                          <span className="font-medium">O Mapa:</span> Uma representação visual do mapa da Romênia com
                          cidades e estradas.
                        </li>
                        <li>
                          <span className="font-medium">O Caminho:</span> O caminho encontrado pelo algoritmo destacado
                          no mapa.
                        </li>
                        <li>
                          <span className="font-medium">Estatísticas:</span> Métricas sobre o processo de busca e o
                          caminho resultante. Métricas sobre o processo de busca e o caminho resultante.
                        </li>
                      </ul>

                      <p className="mt-4">
                        Esta metodologia nos permite implementar, testar e comparar sistematicamente diferentes
                        algoritmos de busca no problema do mapa da Romênia, fornecendo insights sobre seu comportamento
                        e características de desempenho.
                      </p>
                    </div>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="results" className="mt-0 h-full">
                  {searchResults ? (
                    <ResultDisplay results={searchResults} />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[600px] text-center">
                      <Search className="h-16 w-16 text-emerald-400 mb-4 opacity-50" />
                      <h3 className="text-xl font-medium text-emerald-300">Nenhum Resultado de Busca Ainda</h3>
                      <p className="text-gray-300 max-w-md mt-2">
                        Selecione uma cidade de origem, cidade de destino e um algoritmo de busca, depois clique em
                        &quot;Encontrar Caminho&quot; para ver os resultados aqui.
                      </p>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="conclusion" className="mt-0 h-full">
                  <ScrollArea className="h-[600px] pr-4">
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold text-emerald-400">Conclusão</h2>

                      <p>
                        Após implementar e comparar vários algoritmos de busca no problema do mapa da Romênia, podemos
                        tirar várias conclusões sobre seu desempenho e adequação para diferentes cenários.
                      </p>

                      <h3 className="text-xl font-semibold text-emerald-300 mt-6">Comparação de Desempenho</h3>

                      <h4 className="text-lg font-medium text-emerald-200 mt-4">Algoritmos de Busca Não Informada</h4>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>
                          <span className="font-medium">Busca em Largura (BFS):</span> Garante o caminho mais curto em
                          termos do número de passos, mas não necessariamente a menor distância. Expande muitos nós,
                          consumindo memória significativa.
                        </li>
                        <li>
                          <span className="font-medium">Busca de Custo Uniforme (UCS):</span> Sempre encontra o caminho
                          ótimo em termos de distância, mas pode explorar mais nós do que o necessário se o objetivo
                          estiver longe do início.
                        </li>
                        <li>
                          <span className="font-medium">Busca em Profundidade (DFS):</span> Pode encontrar uma solução
                          rapidamente se o objetivo estiver em um caminho que aconteça de ser explorado cedo, mas pode
                          encontrar um caminho subótimo e pode ficar preso em ramos profundos.
                        </li>
                        <li>
                          <span className="font-medium">Busca em Profundidade Limitada (DLS):</span> Aborda o problema
                          de caminhos infinitos da DFS, mas pode perder soluções se o limite de profundidade for muito
                          baixo.
                        </li>
                        <li>
                          <span className="font-medium">Busca de Aprofundamento Iterativo (IDS):</span> Combina os
                          benefícios da BFS e DFS, encontrando caminhos ótimos enquanto usa menos memória que a BFS, mas
                          ao custo de trabalho repetido.
                        </li>
                        <li>
                          <span className="font-medium">Busca Bidirecional:</span> Pode reduzir significativamente o
                          espaço de busca ao encontrar-se no meio, mas a complexidade de implementação aumenta,
                          especialmente para a busca para trás.
                        </li>
                      </ul>

                      <h4 className="text-lg font-medium text-emerald-200 mt-4">Algoritmos de Busca Informada</h4>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>
                          <span className="font-medium">Busca Gulosa:</span> Frequentemente encontra soluções
                          rapidamente, mas pode não encontrar o caminho ótimo, pois considera apenas o custo estimado
                          até o objetivo.
                        </li>
                        <li>
                          <span className="font-medium">Busca A*:</span> Consistentemente supera outros algoritmos
                          quando uma boa heurística está disponível, encontrando caminhos ótimos enquanto expande menos
                          nós que a UCS.
                        </li>
                      </ul>

                      <h3 className="text-xl font-semibold text-emerald-300 mt-6">Principais Insights</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>
                          <span className="font-medium">Compensações:</span> Há uma clara compensação entre otimalidade,
                          completude, complexidade de tempo e complexidade de espaço entre diferentes algoritmos.
                        </li>
                        <li>
                          <span className="font-medium">Qualidade da Heurística:</span> O desempenho dos algoritmos de
                          busca informada depende fortemente da qualidade da função heurística. Uma boa heurística pode
                          reduzir drasticamente o espaço de busca.
                        </li>
                        <li>
                          <span className="font-medium">Características do Problema:</span> A escolha do algoritmo deve
                          ser guiada pelas características do problema, como o tamanho do espaço de estados, o fator de
                          ramificação e se uma heurística admissível está disponível.
                        </li>
                        <li>
                          <span className="font-medium">Restrições de Memória:</span> Em ambientes com restrições de
                          memória, algoritmos como DFS e IDS podem ser preferidos em relação a BFS e A*.
                        </li>
                      </ul>

                      <h3 className="text-xl font-semibold text-emerald-300 mt-6">Aplicações Práticas</h3>
                      <p>Os algoritmos de busca estudados neste projeto têm numerosas aplicações práticas:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>
                          <span className="font-medium">Sistemas de Navegação:</span> GPS e aplicativos de mapeamento
                          usam variantes desses algoritmos para encontrar rotas.
                        </li>
                        <li>
                          <span className="font-medium">IA em Jogos:</span> Busca de caminhos em videogames
                          frequentemente usa A* ou suas variantes.
                        </li>
                        <li>
                          <span className="font-medium">Robótica:</span> Robôs autônomos usam algoritmos de busca para
                          planejamento e navegação.
                        </li>
                        <li>
                          <span className="font-medium">Roteamento de Rede:</span> Protocolos de roteamento em redes de
                          computadores usam princípios similares.
                        </li>
                        <li>
                          <span className="font-medium">Resolução de Quebra-cabeças:</span> Muitas aplicações de
                          resolução de quebra-cabeças usam essas técnicas de busca.
                        </li>
                      </ul>

                      <h3 className="text-xl font-semibold text-emerald-300 mt-6">Trabalhos Futuros</h3>
                      <p>Várias direções para trabalhos futuros poderiam aprimorar este estudo:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>
                          <span className="font-medium">Heurísticas Avançadas:</span> Desenvolver e testar heurísticas
                          mais sofisticadas para o problema do mapa da Romênia.
                        </li>
                        <li>
                          <span className="font-medium">Algoritmos com Limite de Memória:</span> Implementar variantes
                          com limite de memória como IDA* (Aprofundamento Iterativo A*) e SMA* (A* com Memória
                          Simplificada Limitada).
                        </li>
                        <li>
                          <span className="font-medium">Ambientes Dinâmicos:</span> Estender os algoritmos para lidar
                          com mudanças dinâmicas no mapa, como fechamentos de estradas ou tráfego.
                        </li>
                        <li>
                          <span className="font-medium">Busca Multi-objetivo:</span> Considerar múltiplos objetivos
                          simultaneamente, como minimizar a distância enquanto também minimiza o tempo de viagem.
                        </li>
                      </ul>

                      <p className="mt-4">
                        Em conclusão, este projeto forneceu insights valiosos sobre o comportamento e desempenho de
                        vários algoritmos de busca em um problema prático de busca de caminhos. A natureza interativa da
                        aplicação permite que os usuários explorem esses algoritmos em primeira mão, obtendo uma
                        compreensão mais profunda de suas características e das compensações envolvidas na seleção de
                        algoritmos.
                      </p>
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

