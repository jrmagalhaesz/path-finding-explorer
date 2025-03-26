"use client"

import { useEffect, useRef } from "react"
import { roadMap, cityCoordinates } from "@/lib/map-data"

interface MapVisualizationProps {
  highlightedPath: string[]
}

export default function MapVisualization({ highlightedPath }: MapVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = 600
    canvas.height = 400

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "rgba(0, 0, 0, 0.2)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    for (const [city1, neighbors] of Object.entries(roadMap)) {
      const coord1 = cityCoordinates[city1]

      for (const [city2, distance] of Object.entries(neighbors)) {
        const coord2 = cityCoordinates[city2]

        const isHighlighted =
          highlightedPath.length > 0 &&
          highlightedPath.includes(city1) &&
          highlightedPath.includes(city2) &&
          Math.abs(highlightedPath.indexOf(city1) - highlightedPath.indexOf(city2)) === 1

        ctx.beginPath()
        ctx.moveTo(coord1.x, coord1.y)
        ctx.lineTo(coord2.x, coord2.y)

        if (isHighlighted) {
          ctx.strokeStyle = "#10b981"
          ctx.lineWidth = 3
        } else {
          ctx.strokeStyle = "rgba(255, 255, 255, 0.5)"
          ctx.lineWidth = 1
        }

        ctx.stroke()

        const midX = (coord1.x + coord2.x) / 2
        const midY = (coord1.y + coord2.y) / 2

        ctx.fillStyle = "white"
        ctx.font = "10px sans-serif"
        ctx.fillText(distance.toString(), midX, midY)
      }
    }

    for (const [city, coord] of Object.entries(cityCoordinates)) {
      const isHighlighted = highlightedPath.includes(city)
      const isEndpoint =
        highlightedPath.length > 0 &&
        (city === highlightedPath[0] || city === highlightedPath[highlightedPath.length - 1])

      ctx.beginPath()
      ctx.arc(coord.x, coord.y, isEndpoint ? 8 : 5, 0, Math.PI * 2)

      if (isEndpoint) {
        ctx.fillStyle = "#f59e0b"
      } else if (isHighlighted) {
        ctx.fillStyle = "#10b981"
      } else {
        ctx.fillStyle = "white"
      }

      ctx.fill()

      ctx.fillStyle = "white"
      ctx.font = "12px sans-serif"
      ctx.fillText(city, coord.x + 10, coord.y)
    }
  }, [highlightedPath])

  return (
    <div className="border border-white/20 rounded-lg overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-auto" style={{ maxWidth: "100%", height: "auto" }} />
    </div>
  )
}

