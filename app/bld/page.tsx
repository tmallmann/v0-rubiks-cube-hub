"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Save, X, Edit2, ArrowLeft, Upload, Download, Settings, Trash2 } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  defaultBldFlips,
  defaultBldLetterPairs,
  defaultBldTwists,
  type BldFlipCase,
  type BldLetterPair,
  type BldTwistCase,
} from "@/lib/bld-data"


export default function BLDPage() {
  // Letter Pairs State
  const [letterPairs, setBldLetterPairs] = useState<BldLetterPair[]>([])
  const [editingPairId, setEditingPairId] = useState<string | null>(null)
  const [editPairName, setEditPairName] = useState("")
  const [editPairEdgesAlgorithm, setEditPairEdgesAlgorithm] = useState("")
  const [editPairCornersAlgorithm, setEditPairCornersAlgorithm] = useState("")
  const [selectedLetter, setSelectedLetter] = useState<string>("A")

  // Flips State
  const [flips, setFlips] = useState<BldFlipCase[]>([])
  const [editingFlipId, setEditingFlipId] = useState<string | null>(null)
  const [editFlipName, setEditFlipName] = useState("")
  const [editFlipAlgorithm, setEditFlipAlgorithm] = useState("")
  const [editFlipPiece, setEditFlipPiece] = useState("")

  // Twists State
  const [twists, setTwists] = useState<BldTwistCase[]>([])
  const [editingTwistId, setEditingTwistId] = useState<string | null>(null)
  const [editTwistName1, setEditTwistName1] = useState("")
  const [editTwistName2, setEditTwistName2] = useState("")
  const [editTwistAlgorithm1, setEditTwistAlgorithm1] = useState("")
  const [editTwistAlgorithm2, setEditTwistAlgorithm2] = useState("")
  const [editTwistPiece, setEditTwistPiece] = useState("")

  // Table Selection State
  const [selectedTable, setSelectedTable] = useState<"edges" | "corners" | "flips" | "twists">("edges")

  // --- Load/Save Data from Local Storage ---
  useEffect(() => {
    const savedPairs = localStorage.getItem("bld-pairs")
    setBldLetterPairs(savedPairs ? JSON.parse(savedPairs) : defaultBldLetterPairs)

    const savedFlips = localStorage.getItem("bld-flips")
    setFlips(savedFlips ? JSON.parse(savedFlips) : defaultBldFlips)

    const savedTwists = localStorage.getItem("bld-twists")
    setTwists(savedTwists ? JSON.parse(savedTwists) : defaultBldTwists)

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
  const handleUpdatePair = (id: string, updates: Partial<BldLetterPair>) => {
    setBldLetterPairs((prev) => prev.map((pair) => (pair.id === id ? { ...pair, ...updates } : pair)))
  }

  const handleEditPair = (
    id: string,
    currentName: string,
    currentEdgesAlgorithm: string,
    currentCornersAlgorithm: string,
  ) => {
    setEditingPairId(id)
    setEditPairName(currentName)
    setEditPairEdgesAlgorithm(currentEdgesAlgorithm)
    setEditPairCornersAlgorithm(currentCornersAlgorithm)
  }

  const handleSavePair = () => {
    if (editingPairId) {
      handleUpdatePair(editingPairId, {
        name: editPairName,
        edgesAlgorithm: editPairEdgesAlgorithm,
        cornersAlgorithm: editPairCornersAlgorithm,
      })
      setEditingPairId(null)
      setEditPairName("")
      setEditPairEdgesAlgorithm("")
      setEditPairCornersAlgorithm("")
    }
  }

  const handleCancelPair = () => {
    setEditingPairId(null)
    setEditPairName("")
    setEditPairEdgesAlgorithm("")
    setEditPairCornersAlgorithm("")
  }

  const handleToggleLearned = (id: string, checked: boolean) => {
    handleUpdatePair(id, { learned: checked })
  }

  const filteredByLetter = letterPairs.filter((pair) => pair.piece.startsWith(selectedLetter))

  // --- Flips Handlers ---
  const handleUpdateFlip = (id: string, updates: Partial<BldFlipCase>) => {
    setFlips((prev) => prev.map((flip) => (flip.id === id ? { ...flip, ...updates } : flip)))
  }

  const handleEditFlip = (id: string, currentPiece: string, currentName: string, currentAlgorithm: string) => {
    setEditingFlipId(id)
    setEditFlipPiece(currentPiece)
    setEditFlipName(currentName)
    setEditFlipAlgorithm(currentAlgorithm)
  }

  const handleSaveFlip = () => {
    if (editingFlipId) {
      handleUpdateFlip(editingFlipId, {
        piece: editFlipPiece,
        name: editFlipName,
        algorithm: editFlipAlgorithm,
      })
      setEditingFlipId(null)
      setEditFlipPiece("")
      setEditFlipName("")
      setEditFlipAlgorithm("")
    }
  }

  const handleCancelFlip = () => {
    setEditingFlipId(null)
    setEditFlipPiece("")
    setEditFlipName("")
    setEditFlipAlgorithm("")
  }

  const handleToggleLearnedFlip = (id: string, checked: boolean) => {
    handleUpdateFlip(id, { learned: checked })
  }

  // --- Twists Handlers ---
  const handleUpdateTwist = (id: string, updates: Partial<BldTwistCase>) => {
    setTwists((prev) => prev.map((twist) => (twist.id === id ? { ...twist, ...updates } : twist)))
  }

  const handleEditTwist = (
    id: string,
    currentPiece: string,
    currentName1: string,
    currentName2: string,
    currentAlg1: string,
    currentAlg2: string,
  ) => {
    setEditingTwistId(id)
    setEditTwistPiece(currentPiece)
    setEditTwistName1(currentName1)
    setEditTwistName2(currentName2)
    setEditTwistAlgorithm1(currentAlg1)
    setEditTwistAlgorithm2(currentAlg2)
  }

  const handleSaveTwist = () => {
    if (editingTwistId) {
      handleUpdateTwist(editingTwistId, {
        piece: editTwistPiece,
        name: editTwistName1, // Assuming name1 is the primary name
        algorithm1: editTwistAlgorithm1,
        algorithm2: editTwistAlgorithm2,
      })
      setEditingTwistId(null)
      setEditTwistPiece("")
      setEditTwistName1("")
      setEditTwistName2("")
      setEditTwistAlgorithm1("")
      setEditTwistAlgorithm2("")
    }
  }

  const handleCancelTwist = () => {
    setEditingTwistId(null)
    setEditTwistPiece("")
    setEditTwistName1("")
    setEditTwistName2("")
    setEditTwistAlgorithm1("")
    setEditTwistAlgorithm2("")
  }

  const handleToggleLearnedTwist = (id: string, checked: boolean) => {
    handleUpdateTwist(id, { learned: checked })
  }

  // --- Import/Export Functions ---
  const handleExportData = () => {
    const data = {
      letterPairs,
      flips,
      twists,
    }
    const jsonString = JSON.stringify(data, null, 2)
    const blob = new Blob([jsonString], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "bld_data.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string
          const importedData = JSON.parse(content)
          if (importedData.letterPairs && importedData.flips && importedData.twists) {
            const cleanedPairs = importedData.letterPairs
            const cleanedFlips = importedData.flips
            const cleanedTwists = importedData.twists

            setBldLetterPairs(cleanedPairs)
            setFlips(cleanedFlips)
            setTwists(cleanedTwists)
            alert("BLD data imported successfully!")
          } else {
            alert("Invalid BLD data file format.")
          }
        } catch (error) {
          console.error("Error parsing imported data:", error)
          alert("Error importing data. Please ensure it's a valid BLD data file.")
        }
      }
      reader.readAsText(file)
    }
  }

  const handleClearData = () => {
    if (confirm("Are you sure you want to clear all BLD data? This action cannot be undone.")) {
      localStorage.removeItem("bld-pairs")
      localStorage.removeItem("bld-flips")
      localStorage.removeItem("bld-twists")
      setBldLetterPairs([])
      setFlips([])
      setTwists([])
      alert("All BLD data cleared.")
      // Restore the single source of truth from lib/bld-data.ts.
      setBldLetterPairs(defaultBldLetterPairs)
      setFlips(defaultBldFlips)
      setTwists(defaultBldTwists)
    }
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
          <p className="text-xl text-gray-600">Manage algorithms for blindfolded solving</p>
        </div>

        {/* Table Selection Buttons and Settings */}
        <div className="mb-6 flex gap-4 items-center">
          <Button variant={selectedTable === "edges" ? "default" : "outline"} onClick={() => setSelectedTable("edges")}>
            Edges
          </Button>
          <Button
            variant={selectedTable === "corners" ? "default" : "outline"}
            onClick={() => setSelectedTable("corners")}
          >
            Corners
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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto bg-transparent">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleExportData}>
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </DropdownMenuItem>
              <DropdownMenuItem>
                <label className="flex items-center cursor-pointer w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Import Data
                  <input type="file" accept=".txt" onChange={handleImportData} className="hidden" />
                </label>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleClearData} className="text-red-600">
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All Data
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Conditional Table Rendering */}
        {(selectedTable === "edges" || selectedTable === "corners") && (
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
                      {selectedTable === "edges" && (
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Commutator (UF)
                        </th>
                      )}
                      {selectedTable === "corners" && (
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Commutator (UFR)
                        </th>
                      )}
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
                            aria-label={`Mark ${pair.piece} as learned`}
                          />
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm font-mono font-medium text-gray-900 w-16">
                          {pair.piece}
                        </td>
                        {selectedTable === "edges" && (
                          <td className="px-4 py-2">
                            {editingPairId === pair.id ? (
                              <div className="flex items-center space-x-2">
                                <input
                                  type="text"
                                  value={editPairEdgesAlgorithm}
                                  onChange={(e) => setEditPairEdgesAlgorithm(e.target.value)}
                                  className="flex-1 px-2 py-1 text-sm font-mono border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                                  placeholder="Enter algorithm..."
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
                                <code className="text-sm text-gray-700">{pair.edgesAlgorithm || "No algorithm"}</code>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() =>
                                    handleEditPair(
                                      pair.id,
                                      pair.name || "",
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
                        )}
                        {selectedTable === "corners" && (
                          <td className="px-4 py-2">
                            {editingPairId === pair.id ? (
                              <div className="flex items-center space-x-2">
                                <input
                                  type="text"
                                  value={editPairCornersAlgorithm}
                                  onChange={(e) => setEditPairCornersAlgorithm(e.target.value)}
                                  className="flex-1 px-2 py-1 text-sm font-mono border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                                  placeholder="Enter algorithm..."
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
                        )}
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
                            type="text"
                            value={editFlipPiece}
                            onChange={(e) => setEditFlipPiece(e.target.value)}
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        ) : (
                          flip.piece
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
                              onClick={() => handleEditFlip(flip.id, flip.piece, flip.name, flip.algorithm)}
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
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      TWIST CW
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      TWIST CCW
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
                            type="text"
                            value={editTwistPiece}
                            onChange={(e) => setEditTwistPiece(e.target.value)}
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        ) : (
                          twist.piece
                        )}
                      </td>
                      <td className="px-4 py-2">
                        {editingTwistId === twist.id ? (
                          <input
                            type="text"
                            value={editTwistAlgorithm1}
                            onChange={(e) => setEditTwistAlgorithm1(e.target.value)}
                            className="w-full px-2 py-1 text-sm font-mono border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter algorithm..."
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
                              placeholder="Enter algorithm..."
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
                                  twist.name,
                                  twist.name, // Assuming name is used for both image fields
                                  twist.algorithm1,
                                  twist.algorithm2,
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
