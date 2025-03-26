import { ScrollArea } from "@/components/ui/scroll-area"

interface AlgorithmDescriptionProps {
  algorithm: string
}

export default function AlgorithmDescription({ algorithm }: AlgorithmDescriptionProps) {
  const getDescription = () => {
    switch (algorithm) {
      case "bfs":
        return {
          title: "Busca em Largura (BFS)",
          description:
            "A BFS explora todos os nós vizinhos na profundidade atual antes de passar para nós no próximo nível de profundidade. Utiliza uma fila FIFO para acompanhar os nós a serem visitados.",
          properties: [
            { name: "Completude", value: "Sim, se o fator de ramificação for finito" },
            { name: "Otimalidade", value: "Sim, se todos os custos de passo forem iguais" },
            {
              name: "Complexidade de Tempo",
              value: "O(b^d), onde b é o fator de ramificação e d é a profundidade do objetivo",
            },
            { name: "Complexidade de Espaço", value: "O(b^d), pois precisa armazenar todos os nós na memória" },
          ],
        }
      case "ucs":
        return {
          title: "Busca de Custo Uniforme (UCS)",
          description:
            "A UCS expande o nó com o menor custo de caminho. É semelhante à BFS, mas usa uma fila de prioridade ordenada pelo custo cumulativo do caminho em vez de uma fila FIFO.",
          properties: [
            { name: "Completude", value: "Sim, se o custo do passo for maior que alguma constante positiva" },
            { name: "Otimalidade", value: "Sim, sempre encontra o caminho de menor custo" },
            {
              name: "Complexidade de Tempo",
              value: "O(b^(C*/ε)), onde C* é o custo da solução ótima e ε é o custo mínimo de qualquer ação",
            },
            { name: "Complexidade de Espaço", value: "O(b^(C*/ε)), pois precisa armazenar todos os nós na memória" },
          ],
        }
      case "dfs":
        return {
          title: "Busca em Profundidade (DFS)",
          description:
            "A DFS explora o mais longe possível ao longo de cada ramo antes de retroceder. Utiliza uma pilha LIFO para acompanhar os nós a serem visitados.",
          properties: [
            { name: "Completude", value: "Não, pode ficar presa em loops infinitos" },
            { name: "Otimalidade", value: "Não, pode encontrar uma solução subótima" },
            { name: "Complexidade de Tempo", value: "O(b^m), onde m é a profundidade máxima da árvore de busca" },
            { name: "Complexidade de Espaço", value: "O(bm), que é muito melhor que a BFS" },
          ],
        }
      case "dls":
        return {
          title: "Busca em Profundidade Limitada (DLS)",
          description:
            "A DLS é uma variante da DFS que impõe um limite na profundidade da busca para evitar loops infinitos.",
          properties: [
            { name: "Completude", value: "Não, se o objetivo estiver além do limite de profundidade" },
            { name: "Otimalidade", value: "Não, pode encontrar uma solução subótima" },
            { name: "Complexidade de Tempo", value: "O(b^l), onde l é o limite de profundidade" },
            { name: "Complexidade de Espaço", value: "O(bl)" },
          ],
        }
      case "ids":
        return {
          title: "Busca de Aprofundamento Iterativo (IDS)",
          description:
            "A IDS realiza DLS com limites de profundidade crescentes até que um objetivo seja encontrado. Combina os benefícios da BFS e DFS.",
          properties: [
            { name: "Completude", value: "Sim, se o fator de ramificação for finito" },
            { name: "Otimalidade", value: "Sim, se todos os custos de passo forem iguais" },
            { name: "Complexidade de Tempo", value: "O(b^d), semelhante à BFS" },
            { name: "Complexidade de Espaço", value: "O(bd), semelhante à DFS" },
          ],
        }
      case "bidirectional":
        return {
          title: "Busca Bidirecional",
          description:
            "A busca bidirecional executa duas buscas simultâneas—uma para frente a partir do estado inicial e uma para trás a partir do objetivo—esperando se encontrar no meio.",
          properties: [
            { name: "Completude", value: "Sim, se ambas as buscas forem completas" },
            { name: "Otimalidade", value: "Sim, se ambas as buscas forem ótimas" },
            { name: "Complexidade de Tempo", value: "O(b^(d/2)), que é muito melhor que a BFS" },
            { name: "Complexidade de Espaço", value: "O(b^(d/2)), pois precisa armazenar nós para ambas as buscas" },
          ],
        }
      case "greedy":
        return {
          title: "Busca Gulosa",
          description:
            "A busca gulosa expande o nó que parece estar mais próximo do objetivo de acordo com uma função heurística h(n).",
          properties: [
            { name: "Completude", value: "Não, pode ficar presa em loops" },
            { name: "Otimalidade", value: "Não, pode encontrar uma solução subótima" },
            { name: "Complexidade de Tempo", value: "O(b^m), onde m é a profundidade máxima da árvore de busca" },
            { name: "Complexidade de Espaço", value: "O(b^m), pois precisa armazenar todos os nós na memória" },
          ],
        }
      case "astar":
        return {
          title: "Algoritmo A*",
          description:
            "A busca A* combina o custo para alcançar o nó (g(n)) e o custo estimado até o objetivo (h(n)) para determinar qual nó expandir a seguir. Utiliza a função de avaliação f(n) = g(n) + h(n).",
          properties: [
            { name: "Completude", value: "Sim, se a heurística for admissível e consistente" },
            { name: "Otimalidade", value: "Sim, se a heurística for admissível e consistente" },
            {
              name: "Complexidade de Tempo",
              value: "Exponencial no pior caso, mas muito melhor na prática com uma boa heurística",
            },
            { name: "Complexidade de Espaço", value: "Exponencial, pois precisa armazenar todos os nós na memória" },
          ],
        }
      default:
        return {
          title: "Selecione um Algoritmo",
          description: "Por favor, selecione um algoritmo de busca para ver sua descrição.",
          properties: [],
        }
    }
  }

  const { title, description, properties } = getDescription()

  return (
    <ScrollArea className="h-[300px] pr-4">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400">{title}</h2>
        <p>{description}</p>

        {properties.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-emerald-300 mb-2">Propriedades</h3>
            <div className="grid grid-cols-2 gap-2">
              {properties.map((prop, index) => (
                <div key={index} className="space-y-1">
                  <div className="text-sm font-medium text-emerald-200">{prop.name}</div>
                  <div className="text-sm">{prop.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  )
}

