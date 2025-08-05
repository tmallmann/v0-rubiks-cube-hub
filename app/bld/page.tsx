"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Save, X, Edit2, ArrowLeft, RefreshCw } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"

interface LetterPair {
  id: string
  pair: string
  name: string
  sound: string
  edgesAlgorithm: string // New field for Edges algorithm
  cornersAlgorithm: string // New field for Corners algorithm
  learned: boolean
}

interface FlipCase {
  id: string
  piece: number
  sound: string
  name: string
  algorithm: string
  learned: boolean // Added
}

interface TwistCase {
  id: string
  piece: number
  sound: string
  name: string
  algorithm1: string
  algorithm2: string
  learned: boolean // Added
}

export default function BLDPage() {
  // Letter Pairs State
  const [letterPairs, setLetterPairs] = useState<LetterPair[]>([])
  const [editingPairId, setEditingPairId] = useState<string | null>(null)
  const [editPairName, setEditPairName] = useState("")
  const [editPairSound, setEditPairSound] = useState("")
  const [editPairEdgesAlgorithm, setEditPairEdgesAlgorithm] = useState("")
  const [editPairCornersAlgorithm, setEditPairCornersAlgorithm] = useState("")
  const [selectedLetter, setSelectedLetter] = useState<string>("A")

  // Flips State
  const [flips, setFlips] = useState<FlipCase[]>([])
  const [editingFlipId, setEditingFlipId] = useState<string | null>(null)
  const [editFlipSound, setEditFlipSound] = useState("")
  const [editFlipName, setEditFlipName] = useState("")
  const [editFlipAlgorithm, setEditFlipAlgorithm] = useState("")
  const [editFlipPiece, setEditFlipPiece] = useState("")

  // Twists State
  const [twists, setTwists] = useState<TwistCase[]>([])
  const [editingTwistId, setEditingTwistId] = useState<string | null>(null)
  const [editTwistSound, setEditTwistSound] = useState("")
  const [editTwistName, setEditTwistName] = useState("")
  const [editTwistAlgorithm1, setEditTwistAlgorithm1] = useState("")
  const [editTwistAlgorithm2, setEditTwistAlgorithm2] = useState("")
  const [editTwistPiece, setEditTwistPiece] = useState("")

  // Table Selection State
  const [selectedTable, setSelectedTable] = useState<"pairs" | "flips" | "twists">("pairs")

  // Trainer state
  const [currentTrainerPair, setCurrentTrainerPair] = useState<LetterPair | null>(null)
  const [trainerInput, setTrainerInput] = useState("")
  const [feedbackMessage, setFeedbackMessage] = useState("")
  const [showAnswer, setShowAnswer] = useState(false)

  // --- Load/Save Data from Local Storage ---
  useEffect(() => {
    const savedPairs = localStorage.getItem("bld-pairs")
    if (savedPairs) {
      setLetterPairs(JSON.parse(savedPairs))
    } else {
      const pairs: LetterPair[] = []
      for (let i = 65; i <= 90; i++) {
        for (let j = 65; j <= 90; j++) {
          const pair = String.fromCharCode(i) + String.fromCharCode(j)
          pairs.push({
            id: `pair-${pair}`,
            pair,
            name: "",
            sound: "",
            edgesAlgorithm: "",
            cornersAlgorithm: "",
            learned: false,
          })
        }
      }
      setLetterPairs(pairs)
    }

    const savedFlips = localStorage.getItem("bld-flips")
    if (savedFlips) {
      setFlips(JSON.parse(savedFlips))
    } else {
      const defaultFlips: FlipCase[] = Array.from({ length: 11 }, (_, i) => ({
        id: `flip-${i + 1}`,
        piece: i + 1,
        sound: "",
        name: "",
        algorithm: "",
        learned: false, // Added
      }))
      setFlips(defaultFlips)
    }

    const savedTwists = localStorage.getItem("bld-twists")
    if (savedTwists) {
      setTwists(JSON.parse(savedTwists))
    } else {
      const defaultTwists: TwistCase[] = Array.from({ length: 7 }, (_, i) => ({
        id: `twist-${i + 1}`,
        piece: i + 1,
        sound: "",
        name: "",
        algorithm1: "",
        algorithm2: "",
        learned: false, // Added
      }))
      setTwists(defaultTwists)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("bld-pairs", JSON.stringify(letterPairs))
  }, [letterPairs])

  useEffect(() => {
    localStorage.setItem("bld-flips", JSON.stringify(flips))
  }, [flips])

  useEffect(() => {
    localStorage.setItem("bld-twists", JSON.stringify(twists))
  }, [twists])

  // --- Letter Pairs Handlers ---
  const handleUpdatePair = (id: string, updates: Partial<LetterPair>) => {
    setLetterPairs((prev) => prev.map((pair) => (pair.id === id ? { ...pair, ...updates } : pair)))
  }

  const handleEditPair = (
    id: string,
    currentName: string,
    currentSound: string,
    currentEdgesAlgorithm: string,
    currentCornersAlgorithm: string,
  ) => {
    setEditingPairId(id)
    setEditPairName(currentName)
    setEditPairSound(currentSound)
    setEditPairEdgesAlgorithm(currentEdgesAlgorithm)
    setEditPairCornersAlgorithm(currentCornersAlgorithm)
  }

  const handleSavePair = () => {
    if (editingPairId) {
      handleUpdatePair(editingPairId, {
        name: editPairName,
        sound: editPairSound,
        edgesAlgorithm: editPairEdgesAlgorithm,
        cornersAlgorithm: editPairCornersAlgorithm,
      })
      setEditingPairId(null)
      setEditPairName("")
      setEditPairSound("")
      setEditPairEdgesAlgorithm("")
      setEditPairCornersAlgorithm("")
    }
  }

  const handleCancelPair = () => {
    setEditingPairId(null)
    setEditPairName("")
    setEditPairSound("")
    setEditPairEdgesAlgorithm("")
    setEditPairCornersAlgorithm("")
  }

  const handleToggleLearned = (id: string, checked: boolean) => {
    handleUpdatePair(id, { learned: checked })
  }

  const filteredByLetter = letterPairs.filter((pair) => pair.pair.startsWith(selectedLetter))

  // --- Flips Handlers ---
  const handleUpdateFlip = (id: string, updates: Partial<FlipCase>) => {
    setFlips((prev) => prev.map((flip) => (flip.id === id ? { ...flip, ...updates } : flip)))
  }

  const handleEditFlip = (
    id: string,
    currentPiece: string,
    currentSound: string,
    currentName: string,
    currentAlgorithm: string,
    currentLearned: boolean,
  ) => {
    setEditingFlipId(id)
    setEditFlipPiece(currentPiece)
    setEditFlipSound(currentSound)
    setEditFlipName(currentName)
    setEditFlipAlgorithm(currentAlgorithm)
  }

  const handleSaveFlip = () => {
    if (editingFlipId) {
      handleUpdateFlip(editingFlipId, {
        piece: editFlipPiece,
        sound: editFlipSound,
        name: editFlipName,
        algorithm: editFlipAlgorithm,
      })
      setEditingFlipId("")
      setEditFlipPiece("")
      setEditFlipSound("")
      setEditFlipName("")
      setEditFlipAlgorithm("")
    }
  }

  const handleCancelFlip = () => {
    setEditingFlipId("")
    setEditFlipPiece("")
    setEditFlipSound("")
    setEditFlipName("")
    setEditFlipAlgorithm("")
  }

  const handleToggleLearnedFlip = (id: string, checked: boolean) => {
    handleUpdateFlip(id, { learned: checked })
  }

  // --- Twists Handlers ---
  const handleUpdateTwist = (id: string, updates: Partial<TwistCase>) => {
    setTwists((prev) => prev.map((twist) => (twist.id === id ? { ...twist, ...updates } : twist)))
  }

  const handleEditTwist = (
    id: string,
    currentPiece: string,
    currentSound: string,
    currentName: string,
    currentAlg1: string,
    currentAlg2: string,
    currentLearned: boolean,
  ) => {
    setEditingTwistId(id)
    setEditTwistPiece(currentPiece)
    setEditTwistSound(currentSound)
    setEditTwistName(currentName)
    setEditTwistAlgorithm1(currentAlg1)
    setEditTwistAlgorithm2(currentAlg2)
  }

  const handleSaveTwist = () => {
    if (editingTwistId) {
      handleUpdateTwist(editingTwistId, {
        piece: editTwistPiece,
        sound: editTwistSound,
        name: editTwistName,
        algorithm1: editTwistAlgorithm1,
        algorithm2: editTwistAlgorithm2,
      })
      setEditingTwistId("")
      setEditTwistPiece("")
      setEditTwistSound("")
      setEditTwistName("")
      setEditTwistAlgorithm1("")
      setEditTwistAlgorithm2("")
    }
  }

  const handleCancelTwist = () => {
    setEditingTwistId("")
    setEditTwistPiece("")
    setEditTwistSound("")
    setEditTwistName("")
    setEditTwistAlgorithm1("")
    setEditTwistAlgorithm2("")
  }

  const handleToggleLearnedTwist = (id: string, checked: boolean) => {
    handleUpdateTwist(id, { learned: checked })
  }

  // --- Trainer functions ---
  const generateRandomPair = useCallback(() => {
    const learnablePairs = letterPairs.filter((p) => p.name || p.sound)
    if (learnablePairs.length === 0) {
      setCurrentTrainerPair(null)
      setFeedbackMessage("No learnable pairs defined yet. Add names or sounds to your letter pairs!")
      return
    }
    const randomIndex = Math.floor(Math.random() * learnablePairs.length)
    setCurrentTrainerPair(learnablePairs[randomIndex])
    setTrainerInput("")
    setFeedbackMessage("")
    setShowAnswer(false)
  }, [letterPairs])

  useEffect(() => {
    if (letterPairs.length > 0 && !currentTrainerPair) {
      generateRandomPair()
    }
  }, [letterPairs, currentTrainerPair, generateRandomPair])

  const checkTrainerAnswer = () => {
    if (!currentTrainerPair) return

    const normalizedInput = trainerInput.trim().toLowerCase()
    const normalizedName = currentTrainerPair.name.trim().toLowerCase()
    const normalizedSound = currentTrainerPair.sound.trim().toLowerCase()

    if (normalizedInput === normalizedName || normalizedInput === normalizedSound) {
      setFeedbackMessage("Correct!")
      setShowAnswer(false)
      setTimeout(generateRandomPair, 1000) // Generate new pair after a short delay
    } else {
      setFeedbackMessage("Incorrect. Try again or click 'Show Answer'.")
      setShowAnswer(false)
    }
  }

  const handleTrainerKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      checkTrainerAnswer()
    }
  }

  const handleShowAnswer = () => {
    setShowAnswer(true)
    setFeedbackMessage("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">BLD Methods</h1>
          <p className="text-xl text-gray-600">
            Manage letter pair, flip, and twist associations for blindfolded solving
          </p>
        </div>

        {/* BLD Trainer Section */}
        <div className="mb-8 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">BLD Trainer</h2>
          {currentTrainerPair ? (
            <div className="flex flex-col items-center space-y-4">
              <div className="text-6xl font-bold text-purple-600">{currentTrainerPair.pair}</div>
              <p className="text-lg text-gray-700">What is the sound or image for this pair?</p>
              <div className="flex w-full max-w-md space-x-2">
                <Input
                  type="text"
                  value={trainerInput}
                  onChange={(e) => setTrainerInput(e.target.value)}
                  onKeyPress={handleTrainerKeyPress}
                  placeholder="Type your answer..."
                  className="flex-1"
                />
                <Button onClick={checkTrainerAnswer}>Check</Button>
                <Button variant="outline" onClick={handleShowAnswer}>
                  Show Answer
                </Button>
              </div>
              {feedbackMessage && (
                <p
                  className={`text-lg font-semibold ${feedbackMessage.startsWith("Correct") ? "text-green-600" : "text-red-600"}`}
                >
                  {feedbackMessage}
                </p>
              )}
              {showAnswer && currentTrainerPair && (
                <div className="text-md text-gray-800">
                  <p>
                    Sound: <span className="font-semibold">{currentTrainerPair.sound || "N/A"}</span>
                  </p>
                  <p>
                    Image: <span className="font-semibold">{currentTrainerPair.name || "N/A"}</span>
                  </p>
                  <p>
                    Edges (UF) Alg: <code className="font-mono">{currentTrainerPair.edgesAlgorithm || "N/A"}</code>
                  </p>
                  <p>
                    Corners (UFR) Alg: <code className="font-mono">{currentTrainerPair.cornersAlgorithm || "N/A"}</code>
                  </p>
                </div>
              )}
              <Button variant="secondary" onClick={generateRandomPair}>
                <RefreshCw className="h-4 w-4 mr-2" />
                New Pair
              </Button>
            </div>
          ) : (
            <p className="text-center text-gray-600">Loading trainer or no learnable pairs available.</p>
          )}
        </div>

        {/* Table Selection Buttons */}
        <div className="mb-6 flex gap-4">
          <Button variant={selectedTable === "pairs" ? "default" : "outline"} onClick={() => setSelectedTable("pairs")}>
            Comms
          </Button>
          <Button variant={selectedTable === "flips" ? "default" : "outline"} onClick={() => setSelectedTable("flips")}>
            Flips
          </Button>
          <Button
            variant={selectedTable === "twists" ? "default" : "outline"}
            onClick={() => setSelectedTable("twists")}
          >
            Twists
          </Button>
        </div>

        {/* Conditional Table Rendering */}
        {selectedTable === "pairs" && (
          <>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Filter by first letter:</h3>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).map((letter) => (
                  <Button
                    key={letter}
                    size="sm"
                    variant={selectedLetter === letter ? "default" : "outline"}
                    onClick={() => setSelectedLetter(letter)}
                    className="w-10 h-10"
                  >
                    {letter}
                  </Button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full table-fixed">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                        {/* Checkbox header */}
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                        Pair
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-40">
                        Sound
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-40">
                        Image
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Edges (UF)
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Corners (UFR)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {filteredByLetter.map((pair, index) => (
                      <tr
                        key={pair.id}
                        className={pair.learned ? "bg-green-200" : index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 w-12">
                          <Checkbox
                            checked={pair.learned}
                            onCheckedChange={(checked) => handleToggleLearned(pair.id, checked as boolean)}
                            aria-label={`Mark ${pair.pair} as learned`}
                          />
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm font-mono font-medium text-gray-900 w-16">
                          {pair.pair}
                        </td>
                        <td className="px-4 py-2 w-40">
                          {editingPairId === pair.id ? (
                            <input
                              type="text"
                              value={editPairSound}
                              onChange={(e) => setEditPairSound(e.target.value)}
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                              placeholder="Enter sound..."
                            />
                          ) : (
                            <span className="text-sm text-gray-900">{pair.sound || "No sound"}</span>
                          )}
                        </td>
                        <td className="px-4 py-2 w-40">
                          {editingPairId === pair.id ? (
                            <input
                              type="text"
                              value={editPairName}
                              onChange={(e) => setEditPairName(e.target.value)}
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                              placeholder="Enter name..."
                            />
                          ) : (
                            <span className="text-sm text-gray-900">{pair.name || "Unnamed"}</span>
                          )}
                        </td>
                        <td className="px-4 py-2">
                          {editingPairId === pair.id ? (
                            <input
                              type="text"
                              value={editPairEdgesAlgorithm}
                              onChange={(e) => setEditPairEdgesAlgorithm(e.target.value)}
                              className="w-full px-2 py-1 text-sm font-mono border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                              placeholder="Enter Edges algorithm..."
                            />
                          ) : (
                            <code className="text-sm text-gray-700">{pair.edgesAlgorithm || "No algorithm"}</code>
                          )}
                        </td>
                        <td className="px-4 py-2">
                          {editingPairId === pair.id ? (
                            <div className="flex items-center space-x-2">
                              <input
                                type="text"
                                value={editPairCornersAlgorithm}
                                onChange={(e) => setEditPairCornersAlgorithm(e.target.value)}
                                className="flex-1 px-2 py-1 text-sm font-mono border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Enter Corners algorithm..."
                              />
                              <Button size="sm" onClick={handleSavePair}>
                                <Save className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="outline" onClick={handleCancelPair}>
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between">
                              <code className="text-sm text-gray-700">{pair.cornersAlgorithm || "No algorithm"}</code>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() =>
                                  handleEditPair(
                                    pair.id,
                                    pair.name || "",
                                    pair.sound || "",
                                    pair.edgesAlgorithm || "",
                                    pair.cornersAlgorithm || "",
                                  )
                                }
                              >
                                <Edit2 className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {selectedTable === "flips" && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                      {/* Checkbox header */}
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                      PIECE
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-40">
                      SOUND
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-40">
                      IMAGE
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      FLIP (UF)  
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {flips.map((flip, index) => (
                    <tr
                      key={flip.id}
                      className={flip.learned ? "bg-green-200" : index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 w-12">
                        <Checkbox
                          checked={flip.learned}
                          onCheckedChange={(checked) => handleToggleLearnedFlip(flip.id, checked as boolean)}
                          aria-label={`Mark flip as learned`}
                        />
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-mono font-medium text-gray-900 w-40">
                        {editingFlipId === flip.id ? (
                          <input
                            type="text" // Changed to text
                            value={editFlipPiece}
                            onChange={(e) => setEditFlipPiece(e.target.value)}
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        ) : (
                          flip.piece
                        )}
                      </td>
                      <td className="px-4 py-2 w-40">
                        {editingFlipId === flip.id ? (
                          <input
                            type="text"
                            value={editFlipSound}
                            onChange={(e) => setEditFlipSound(e.target.value)}
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter sound..."
                          />
                        ) : (
                          <span className="text-sm text-gray-900">{flip.sound || "No sound"}</span>
                        )}
                      </td>
                      <td className="px-4 py-2 w-40">
                        {editingFlipId === flip.id ? (
                          <input
                            type="text"
                            value={editFlipName}
                            onChange={(e) => setEditFlipName(e.target.value)}
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter name..."
                          />
                        ) : (
                          <span className="text-sm text-gray-900">{flip.name || "Unnamed"}</span>
                        )}
                      </td>
                      <td className="px-4 py-2">
                        {editingFlipId === flip.id ? (
                          <div className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={editFlipAlgorithm}
                              onChange={(e) => setEditFlipAlgorithm(e.target.value)}
                              className="flex-1 px-2 py-1 text-sm font-mono border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                              placeholder="Enter algorithm..."
                            />
                            <Button size="sm" onClick={handleSaveFlip}>
                              <Save className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={handleCancelFlip}>
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <code className="text-sm text-gray-700">{flip.algorithm || "No algorithm"}</code>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() =>
                                handleEditFlip(flip.id, flip.piece, flip.sound, flip.name, flip.algorithm, flip.learned)
                              }
                            >
                              <Edit2 className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedTable === "twists" && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                      {/* Checkbox header */}
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                      PIECE
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-40">
                      IMAGE CW  
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-40">
                      IMAGE CCW   
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      TWIST CW   
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {"TWIST CCW"}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {twists.map((twist, index) => (
                    <tr
                      key={twist.id}
                      className={twist.learned ? "bg-green-200" : index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 w-12">
                        <Checkbox
                          checked={twist.learned}
                          onCheckedChange={(checked) => handleToggleLearnedTwist(twist.id, checked as boolean)}
                          aria-label={`Mark twist ${twist.piece} as learned`}
                        />
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-mono font-medium text-gray-900 w-16">
                        {editingTwistId === twist.id ? (
                          <input
                            type="text" // Changed to text
                            value={editTwistPiece}
                            onChange={(e) => setEditTwistPiece(e.target.value)}
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        ) : (
                          twist.piece
                        )}
                      </td>
                      <td className="px-4 py-2 w-40">
                        {editingTwistId === twist.id ? (
                          <input
                            type="text"
                            value={editTwistSound}
                            onChange={(e) => setEditTwistSound(e.target.value)}
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter sound..."
                          />
                        ) : (
                          <span className="text-sm text-gray-900">{twist.sound || "No sound"}</span>
                        )}
                      </td>
                      <td className="px-4 py-2 w-40">
                        {editingTwistId === twist.id ? (
                          <input
                            type="text"
                            value={editTwistName}
                            onChange={(e) => setEditTwistName(e.target.value)}
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter name..."
                          />
                        ) : (
                          <span className="text-sm text-gray-900">{twist.name || "Unnamed"}</span>
                        )}
                      </td>
                      <td className="px-4 py-2">
                        {editingTwistId === twist.id ? (
                          <input
                            type="text"
                            value={editTwistAlgorithm1}
                            onChange={(e) => setEditTwistAlgorithm1(e.target.value)}
                            className="w-full px-2 py-1 text-sm font-mono border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter ALG 1..."
                          />
                        ) : (
                          <code className="text-sm text-gray-700">{twist.algorithm1 || "No algorithm"}</code>
                        )}
                      </td>
                      <td className="px-4 py-2">
                        {editingTwistId === twist.id ? (
                          <div className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={editTwistAlgorithm2}
                              onChange={(e) => setEditTwistAlgorithm2(e.target.value)}
                              className="flex-1 px-2 py-1 text-sm font-mono border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                              placeholder="Enter ALG 2..."
                            />
                            <Button size="sm" onClick={handleSaveTwist}>
                              <Save className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={handleCancelTwist}>
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <code className="text-sm text-gray-700">{twist.algorithm2 || "No algorithm"}</code>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() =>
                                handleEditTwist(
                                  twist.id,
                                  twist.piece,
                                  twist.sound,
                                  twist.name,
                                  twist.algorithm1,
                                  twist.algorithm2,
                                  twist.learned,
                                )
                              }
                            >
                              <Edit2 className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
