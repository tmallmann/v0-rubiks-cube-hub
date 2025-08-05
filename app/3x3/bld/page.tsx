"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Save, X, Edit2, ArrowLeft } from "lucide-react"

interface LetterPair {
  id: string
  pair: string
  name: string
  algorithm: string
  learned: boolean
  sound: string
}

export default function BLDPage() {
  const [letterPairs, setLetterPairs] = useState<LetterPair[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editAlgorithm, setEditAlgorithm] = useState("")
  const [editName, setEditName] = useState("")
  const [selectedLetter, setSelectedLetter] = useState<string>("A")

  useEffect(() => {
    const saved = localStorage.getItem("3x3-bld-pairs")
    if (saved) {
      setLetterPairs(JSON.parse(saved))
    } else {
      // Generate default letter pairs AA to ZZ
      const pairs: LetterPair[] = []
      for (let i = 65; i <= 90; i++) {
        for (let j = 65; j <= 90; j++) {
          const pair = String.fromCharCode(i) + String.fromCharCode(j)
          pairs.push({
            id: `pair-${pair}`,
            pair,
            name: "",
            algorithm: "",
            learned: false,
            sound: "",
          })
        }
      }
      setLetterPairs(pairs)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("3x3-bld-pairs", JSON.stringify(letterPairs))
  }, [letterPairs])

  const handleEdit = (id: string, currentAlgorithm: string, currentName: string) => {
    setEditingId(id)
    setEditAlgorithm(currentAlgorithm)
    setEditName(currentName)
  }

  const handleSave = () => {
    if (editingId) {
      setLetterPairs((prev) =>
        prev.map((pair) => (pair.id === editingId ? { ...pair, algorithm: editAlgorithm, name: editName } : pair)),
      )
      setEditingId(null)
      setEditAlgorithm("")
      setEditName("")
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditAlgorithm("")
    setEditName("")
  }

  const handleDelete = (id: string) => {
    setLetterPairs((prev) => prev.map((pair) => (pair.id === id ? { ...pair, algorithm: "" } : pair)))
  }

  const handleLearnedToggle = (id: string) => {
    setLetterPairs((prev) => prev.map((pair) => (pair.id === id ? { ...pair, learned: !pair.learned } : pair)))
  }

  const handleSoundUpdate = (id: string, sound: string) => {
    setLetterPairs((prev) => prev.map((pair) => (pair.id === id ? { ...pair, sound } : pair)))
  }

  const filteredPairs = letterPairs.filter((pair) => pair.algorithm.trim() !== "")
  const emptyPairs = letterPairs.filter((pair) => pair.algorithm.trim() === "")
  const filteredByLetter = letterPairs.filter((pair) => pair.pair.startsWith(selectedLetter))

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/3x3">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to 3×3 Methods
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">BLD Letter Pairs</h1>
          <p className="text-xl text-gray-600">Manage letter pair associations for blindfolded solving</p>
        </div>

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
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                    Learned
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                    Pair
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sound
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Algorithm
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredByLetter.map((pair, index) => (
                  <tr key={pair.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-2 py-1 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={pair.learned}
                        onChange={() => handleLearnedToggle(pair.id)}
                        className="rounded"
                      />
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap text-sm font-mono font-medium text-gray-900">
                      {pair.pair}
                    </td>
                    <td className="px-2 py-1">
                      {editingId === pair.id ? (
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="Enter name..."
                        />
                      ) : (
                        <span className="text-sm text-gray-900">{pair.name || "Unnamed"}</span>
                      )}
                    </td>
                    <td className="px-2 py-1">
                      <input
                        type="text"
                        value={pair.sound}
                        onChange={(e) => handleSoundUpdate(pair.id, e.target.value)}
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Sound..."
                      />
                    </td>
                    <td className="px-2 py-1">
                      {editingId === pair.id ? (
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={editAlgorithm}
                            onChange={(e) => setEditAlgorithm(e.target.value)}
                            className="flex-1 px-2 py-1 text-sm font-mono border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter algorithm..."
                          />
                          <Button size="sm" onClick={handleSave}>
                            <Save className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={handleCancel}>
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <code className="text-xs text-gray-700">{pair.algorithm || "No algorithm"}</code>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEdit(pair.id, pair.algorithm, pair.name || "")}
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
      </div>
    </div>
  )
}
