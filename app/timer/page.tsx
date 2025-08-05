"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, RotateCcw, ChevronLeft, ChevronRight, Copy, Check, X } from "lucide-react"

interface Solve {
  id: string
  time: number
  scramble: string
  scrambleType: string
  timestamp: Date
}

const scrambleTypes = {
  "3x3": {
    name: "3x3x3",
    moves: ["R", "R'", "R2", "L", "L'", "L2", "U", "U'", "U2", "D", "D'", "D2", "F", "F'", "F2", "B", "B'", "B2"],
    length: 20,
  },
  "2x2": { name: "2x2x2", moves: ["R", "R'", "R2", "U", "U'", "U2", "F", "F'", "F2"], length: 9 },
  "4x4": {
    name: "4x4x4",
    moves: [
      "R",
      "R'",
      "R2",
      "L",
      "L'",
      "L2",
      "U",
      "U'",
      "U2",
      "D",
      "D'",
      "D2",
      "F",
      "F'",
      "F2",
      "B",
      "B'",
      "B2",
      "Rw",
      "Rw'",
      "Rw2",
      "Lw",
      "Lw'",
      "Lw2",
      "Uw",
      "Uw'",
      "Uw2",
      "Dw",
      "Dw'",
      "Dw2",
      "Fw",
      "Fw'",
      "Fw2",
      "Bw",
      "Bw'",
      "Bw2",
    ],
    length: 40,
  },
  "5x5": {
    name: "5x5x5",
    moves: [
      "R",
      "R'",
      "R2",
      "L",
      "L'",
      "L2",
      "U",
      "U'",
      "U2",
      "D",
      "D'",
      "D2",
      "F",
      "F'",
      "F2",
      "B",
      "B'",
      "B2",
      "Rw",
      "Rw'",
      "Rw2",
      "Lw",
      "Lw'",
      "Lw2",
      "Uw",
      "Uw'",
      "Uw2",
      "Dw",
      "Dw'",
      "Dw2",
      "Fw",
      "Fw'",
      "Fw2",
      "Bw",
      "Bw'",
      "Bw2",
    ],
    length: 60,
  },
  OH: {
    name: "One-Handed",
    moves: ["R", "R'", "R2", "L", "L'", "L2", "U", "U'", "U2", "D", "D'", "D2", "F", "F'", "F2", "B", "B'", "B2"],
    length: 20,
  },
  Pyraminx: {
    name: "Pyraminx",
    moves: ["R", "R'", "L", "L'", "U", "U'", "B", "B'", "r", "r'", "l", "l'", "u", "u'", "b", "b'"],
    length: 10,
  },
}

function generateScramble(type: string): string {
  const config = scrambleTypes[type as keyof typeof scrambleTypes]
  const moves: string[] = []
  let lastMove = ""
  let lastAxis = ""

  for (let i = 0; i < config.length; i++) {
    let move: string
    let axis: string

    do {
      move = config.moves[Math.floor(Math.random() * config.moves.length)]
      axis = move[0]
    } while (axis === lastAxis || move === lastMove)

    moves.push(move)
    lastMove = move
    lastAxis = axis
  }

  return moves.join(" ")
}

export default function TimerPage() {
  const [scrambleType, setScrambleType] = useState("3x3")
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [scrambles, setScrambles] = useState<string[]>([])
  const [currentScrambleIndex, setCurrentScrambleIndex] = useState(0)
  const [solves, setSolves] = useState<Solve[]>([])
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    // Generate initial scrambles
    const initialScrambles = Array.from({ length: 5 }, () => generateScramble(scrambleType))
    setScrambles(initialScrambles)
  }, [])

  // Regenerate scrambles when type changes
  useEffect(() => {
    const newScrambles = Array.from({ length: 5 }, () => generateScramble(scrambleType))
    setScrambles(newScrambles)
    setCurrentScrambleIndex(0)
  }, [scrambleType])

  useEffect(() => {
    const saved = localStorage.getItem("timer-solves")
    if (saved) {
      setSolves(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("timer-solves", JSON.stringify(solves))
  }, [solves])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    let startTime: number | null = null

    if (isRunning) {
      startTime = Date.now() - time
      interval = setInterval(() => {
        setTime(Date.now() - startTime!)
      }, 1)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning])

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault()
        if (isRunning) {
          // Stop timer
          setIsRunning(false)
          const newSolve: Solve = {
            id: Date.now().toString(),
            time,
            scramble: scrambles[currentScrambleIndex],
            scrambleType: scrambleType,
            timestamp: new Date(),
          }
          setSolves((prev) => [newSolve, ...prev])

          // Generate new scramble and move to next
          const newScramble = generateScramble(scrambleType)
          setScrambles((prev) => {
            const updated = [...prev]
            updated.push(newScramble)
            return updated
          })
          setCurrentScrambleIndex((prev) => prev + 1)
        } else {
          if (isReady) {
            // Start timer
            setTime(0)
            setIsRunning(true)
            setIsReady(false)
          } else {
            // Get ready
            setIsReady(true)
          }
        }
      }
    },
    [isRunning, isReady, time, scrambles, currentScrambleIndex, scrambleType],
  )

  const handleTouch = () => {
    if (isRunning) {
      // Stop timer
      setIsRunning(false)
      const newSolve: Solve = {
        id: Date.now().toString(),
        time,
        scramble: scrambles[currentScrambleIndex],
        scrambleType: scrambleType,
        timestamp: new Date(),
      }
      setSolves((prev) => [newSolve, ...prev])

      // Generate new scramble and move to next
      const newScramble = generateScramble(scrambleType)
      setScrambles((prev) => {
        const updated = [...prev]
        updated.push(newScramble)
        return updated
      })
      setCurrentScrambleIndex((prev) => prev + 1)
    } else {
      if (isReady) {
        // Start timer
        setTime(0)
        setIsRunning(true)
        setIsReady(false)
      } else {
        // Get ready
        setIsReady(true)
      }
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress)
    return () => document.removeEventListener("keydown", handleKeyPress)
  }, [handleKeyPress])

  const formatTime = (ms: number): string => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    const centiseconds = Math.floor((ms % 1000) / 10)

    if (minutes > 0) {
      return `${minutes}:${seconds.toString().padStart(2, "0")}.${centiseconds.toString().padStart(2, "0")}`
    }
    return `${seconds}.${centiseconds.toString().padStart(2, "0")}`
  }

  const generateNewScramble = () => {
    const newScramble = generateScramble(scrambleType)
    setScrambles((prev) => {
      const updated = [...prev]
      updated[currentScrambleIndex] = newScramble
      return updated
    })
  }

  const goToPreviousScramble = () => {
    if (currentScrambleIndex > 0) {
      setCurrentScrambleIndex((prev) => prev - 1)
    }
  }

  const goToNextScramble = () => {
    if (currentScrambleIndex < scrambles.length - 1) {
      setCurrentScrambleIndex((prev) => prev + 1)
    } else {
      // Generate new scramble if at the end
      const newScramble = generateScramble(scrambleType)
      setScrambles((prev) => [...prev, newScramble])
      setCurrentScrambleIndex((prev) => prev + 1)
    }
  }

  const copyScramble = async () => {
    try {
      await navigator.clipboard.writeText(scrambles[currentScrambleIndex])
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy scramble:", err)
    }
  }

  const reset = () => {
    setTime(0)
    setIsRunning(false)
    setIsReady(false)
  }

  const getTimerColor = () => {
    if (isRunning) return "text-green-600"
    if (isReady) return "text-yellow-600"
    return "text-gray-900"
  }

  const getTimerText = () => {
    if (isRunning) return formatTime(time)
    if (isReady) return "READY"
    return formatTime(time)
  }

  const averageOfLast5 = () => {
    if (solves.length < 5) return null
    const last5 = solves.slice(0, 5)
    const average = last5.reduce((sum, solve) => sum + solve.time, 0) / 5
    return formatTime(average)
  }

  const averageOfLast12 = () => {
    if (solves.length < 12) return null
    const last12 = solves.slice(0, 12)
    const average = last12.reduce((sum, solve) => sum + solve.time, 0) / 12
    return formatTime(average)
  }

  const deleteSolve = (solveId: string) => {
    setSolves((prev) => prev.filter((solve) => solve.id !== solveId))
  }

  const clearAllSolves = () => {
    if (confirm("Are you sure you want to clear all statistics?")) {
      setSolves([])
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Speedcubing Timer</h1>
          <p className="text-xl text-gray-600">Practice your solves with scrambles and track your progress</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Scramble Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span>Scramble</span>
                    <select
                      value={scrambleType}
                      onChange={(e) => setScrambleType(e.target.value)}
                      className="text-sm border rounded px-2 py-1"
                    >
                      {Object.entries(scrambleTypes).map(([key, config]) => (
                        <option key={key} value={key}>
                          {config.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={goToPreviousScramble}
                      disabled={currentScrambleIndex === 0}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={goToNextScramble}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={generateNewScramble}>
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={copyScramble}>
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <code className="text-lg font-mono break-all">
                    {scrambles[currentScrambleIndex] || "Generating scramble..."}
                  </code>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Scramble {currentScrambleIndex + 1} of {scrambles.length} (
                  {scrambleTypes[scrambleType as keyof typeof scrambleTypes].name})
                </p>
              </CardContent>
            </Card>

            {/* Timer Section */}
            <Card>
              <CardContent className="pt-6">
                <div
                  className="text-center cursor-pointer select-none"
                  onTouchStart={handleTouch}
                  onMouseDown={handleTouch}
                >
                  <div className={`text-8xl font-mono font-bold mb-4 ${getTimerColor()}`}>{getTimerText()}</div>
                  <div className="text-gray-600 mb-4">
                    {isRunning
                      ? "Touch screen or press SPACE to stop"
                      : isReady
                        ? "Touch screen or press SPACE to start"
                        : "Touch screen or press SPACE to get ready"}
                  </div>
                  <Button onClick={reset} variant="outline">
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Statistics Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600">Best Time</div>
                  <div className="text-xl font-mono">
                    {solves.length > 0 ? formatTime(Math.min(...solves.map((s) => s.time))) : "--"}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Average of 5</div>
                  <div className="text-xl font-mono">{averageOfLast5() || "--"}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Average of 12</div>
                  <div className="text-xl font-mono">{averageOfLast12() || "--"}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Total Solves</div>
                  <div className="text-xl font-mono">{solves.length}</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle>Recent Solves</CardTitle>
                <Button size="sm" variant="outline" onClick={clearAllSolves}>
                  Clear All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {solves.slice(0, 10).map((solve, index) => (
                    <div key={solve.id} className="flex justify-between items-center text-sm">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono">{formatTime(solve.time)}</span>
                        <span className="text-xs text-gray-400">({solve.scrambleType})</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-500">#{solves.length - index}</span>
                        <Button size="sm" variant="ghost" onClick={() => deleteSolve(solve.id)}>
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {solves.length === 0 && <div className="text-gray-500 text-center py-4">No solves yet</div>}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
