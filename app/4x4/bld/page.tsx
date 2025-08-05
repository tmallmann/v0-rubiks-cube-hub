"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Edit2, Save, X, Trash2 } from "lucide-react"

interface LetterPair {
  id: string
  pair: string
  algorithm: string
  name: string
  learned: boolean
  sound: string
}

export default function FourByFourBLDPage() {
  const [letterPairs, setLetterPairs] = useState<LetterPair[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editAlgorithm, setEditAlgorithm] = useState("")
  const [editName, setEditName] = useState("")
  const [editSound, setEditSound] = useState("")
  const [selectedLetter, setSelectedLetter] = useState<string>("A")

  useEffect(() => {
    const saved = localStorage.getItem("4x4-bld-pairs")
    if (saved) {
      setLetterPairs(JSON.parse(saved))
    } else {
      // Generate default letter pairs AA to ZZ
      const pairs: LetterPair[] = []
      for (let i = 65; i <= 90; i++) {
        for (let j = 65; j <= 90; j++) {
          const pair = String.fromCharCode(i) + String.fromCharCode(j)
          pairs.push({
            id: `4x4-pair-${pair}`,
            pair,
            algorithm: "",
            name: "",
            learned: false,
            sound: "",
          })
        }
      }
      setLetterPairs(pairs)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("4x4-bld-pairs", JSON.stringify(letterPairs))
  }, [letterPairs])

  const handleEdit = (id: string, currentAlgorithm: string, currentName: string, currentSound: string) => {
    setEditingId(id)
    setEditAlgorithm(currentAlgorithm)
    setEditName(currentName)
    setEditSound(currentSound)
  }

  const handleSave = () => {
    if (editingId) {
      setLetterPairs((prev) =>
        prev.map((pair) =>
          pair.id === editingId ? { ...pair, algorithm: editAlgorithm, name: editName, sound: editSound } : pair,
        ),
      )
      setEditingId(null)
      setEditAlgorithm("")
      setEditName("")
      setEditSound("")
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditAlgorithm("")
    setEditName("")
    setEditSound("")
  }

  const handleDelete = (id: string) => {
    setLetterPairs((prev) =>
      prev.map((pair) => (pair.id === id ? { ...pair, algorithm: "", name: "", sound: "" } : pair)),
    )
  }

  const handleLearnedToggle = (id: string) => {
    setLetterPairs((prev) => prev.map((pair) => (pair.id === id ? { ...pair, learned: !pair.learned } : pair)))
  }

  const handleSoundUpdate = (id: string, sound: string) => {
    setLetterPairs((prev) => prev.map((pair) => (pair.id === id ? { ...pair, sound } : pair)))
  }

  const filteredByLetter = letterPairs.filter((pair) => pair.pair.startsWith(selectedLetter))

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/4x4">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to 4×4 Methods
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">4×4 BLD Letter Pairs</h1>
          <p className="text-xl text-gray-600">Manage letter pair associations for 4×4 blindfolded solving</p>
        </div>

        <div className="mb-4">
          {Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).map((letter) => (
            <Button
              key={letter}
              variant={selectedLetter === letter ? "default" : "outline"}
              onClick={() => setSelectedLetter(letter)}
              className="mr-2"
            >
              {letter}
            </Button>
          ))}
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">
            Letter Pairs Starting with {selectedLetter} ({filteredByLetter.length})
          </h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="p-3 bg-gray-100 border border-gray-300">Pair</th>
                <th className="p-3 bg-gray-100 border border-gray-300">Name</th>
                <th className="p-3 bg-gray-100 border border-gray-300">Algorithm</th>
                <th className="p-3 bg-gray-100 border border-gray-300">Learned</th>
                <th className="p-3 bg-gray-100 border border-gray-300">Sound</th>
                <th className="p-3 bg-gray-100 border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredByLetter.map((pair) => (
                <tr key={pair.id} className="bg-white border border-gray-300">
                  <td className="p-2 border border-gray-300 font-mono">{pair.pair}</td>
                  <td className="p-2 border border-gray-300 font-mono">
                    {editingId === pair.id ? (
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      />
                    ) : (
                      pair.name
                    )}
                  </td>
                  <td className="p-2 border border-gray-300">
                    {editingId === pair.id ? (
                      <Textarea
                        value={editAlgorithm}
                        onChange={(e) => setEditAlgorithm(e.target.value)}
                        placeholder="Enter algorithm..."
                        className="font-mono"
                      />
                    ) : (
                      <code className="text-sm">{pair.algorithm}</code>
                    )}
                  </td>
                  <td className="p-2 border border-gray-300">
                    {editingId === pair.id ? (
                      <Checkbox
                        checked={editSound === "true"}
                        onCheckedChange={(checked) => setEditSound(checked ? "true" : "false")}
                      />
                    ) : (
                      <Checkbox checked={pair.learned} onCheckedChange={() => handleLearnedToggle(pair.id)} />
                    )}
                  </td>
                  <td className="p-2 border border-gray-300">
                    {editingId === pair.id ? (
                      <input
                        type="text"
                        value={editSound}
                        onChange={(e) => setEditSound(e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      />
                    ) : (
                      pair.sound
                    )}
                  </td>
                  <td className="p-2 border border-gray-300">
                    {editingId === pair.id ? (
                      <>
                        <Button size="sm" onClick={handleSave}>
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={handleCancel}>
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(pair.id, pair.algorithm, pair.name, pair.sound)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDelete(pair.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
