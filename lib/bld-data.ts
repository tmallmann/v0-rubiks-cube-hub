export interface BldLetterPair {
  id: string
  pair: string
  name: string
  edgesAlgorithm: string
  cornersAlgorithm: string
  learned: boolean
}

export interface BldFlipCase {
  id: string
  piece: string
  name: string
  algorithm: string
  learned: boolean
}

export interface BldTwistCase {
  id: string
  piece: string
  name: string
  algorithm1: string
  algorithm2: string
  learned: boolean
}

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

export const defaultBldLetterPairs: BldLetterPair[] = Array.from(letters, (first) =>
  Array.from(letters, (second) => {
    const pair = `${first}${second}`
    return {
      id: `pair-${pair}`,
      pair,
      name: pair,
      edgesAlgorithm: `M2 U2 M2 [${pair}] M2 U2 M2`,
      cornersAlgorithm: `R' D' R D [${pair}] D' R' D R`,
      learned: false,
    }
  }),
).flat()

export const defaultBldFlips: BldFlipCase[] = [
  { id: "flip-UB", piece: "UB", name: "UB flip", algorithm: "M' U2 M U R' F' R S R' F R S' U", learned: false },
  { id: "flip-UR", piece: "UR", name: "UR flip", algorithm: "R' E2 R2 E' R' U' R E R2' E2 R U", learned: false },
  { id: "flip-UL", piece: "UL", name: "UL flip", algorithm: "L F' L' U M' U2 M U S' L F L' S", learned: false },
  { id: "flip-LF", piece: "LF", name: "LF flip", algorithm: "F' L' U M' U2 M U S' L F L' S L", learned: false },
  { id: "flip-LD", piece: "LD", name: "LD flip", algorithm: "S L F' L' U M' U2 M U S' L F L'", learned: false },
  { id: "flip-LB", piece: "LB", name: "LB flip", algorithm: "L' S L F' L' U M' U2 M U S' L F", learned: false },
  { id: "flip-FR", piece: "FR", name: "FR flip", algorithm: "F R U' M' U2 M U' S R' F' R S' R'", learned: false },
  { id: "flip-FD", piece: "FD", name: "FD flip", algorithm: "U2 M' U2 M U' S R' F' R S' R' F R U", learned: false },
  { id: "flip-RB", piece: "RB", name: "RB flip", algorithm: "R S' R' F R U' M' U2 M U' S R' F'", learned: false },
  { id: "flip-RD", piece: "RD", name: "RD flip", algorithm: "S' R' F R U' M' U2 M U' S R' F' R", learned: false },
  { id: "flip-BD", piece: "BD", name: "BD flip", algorithm: "U2 M U' S R' F' R S' R' F R U' M'", learned: false },
]

export const defaultBldTwists: BldTwistCase[] = [
  { id: "twist-UBL", piece: "UBL", name: "UBL twist", algorithm1: "(R : (U, R D R' D' R D R'))", algorithm2: "(R : (R D R' D' R D R', U))", learned: false },
  { id: "twist-UBR", piece: "UBR", name: "UBR twist", algorithm1: "(R D R' D' R D R', U')", algorithm2: "(U', R D R' D' R D R')", learned: false },
  { id: "twist-UFL", piece: "UFL", name: "UFL twist", algorithm1: "(U', R' D R D' R' D R)", algorithm2: "(R' D R D' R' D R, U')", learned: false },
  { id: "twist-DFL", piece: "DFL", name: "DFL twist", algorithm1: "(R U R': (R U' R' U R U' R', D))", algorithm2: "(R U R': (D, R U' R' U R U' R'))", learned: false },
  { id: "twist-DFR", piece: "DFR", name: "DFR twist", algorithm1: "(D' : (U', R' D R)) (R' D' R, U')", algorithm2: "(R': (D', R U' R' U R U' R'))", learned: false },
  { id: "twist-DBR", piece: "DBR", name: "DBR twist", algorithm1: "(R U R': (R U' R' U R U' R', D'))", algorithm2: "(R U R': (D', R U' R' U R U' R'))", learned: false },
  { id: "twist-DBL", piece: "DBL", name: "DBL twist", algorithm1: "(U' R: (D', R' U R U' R' U R))", algorithm2: "(U' R:(R' U R U' R' U R, D'))", learned: false },
]
