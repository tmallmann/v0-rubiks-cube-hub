import type { MethodCase } from "@/lib/method-data"

const l2cImageUrls = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/l2c1-EOO843SiPaAzdtAWPRKbo5PN9GlqLX.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/l2c2-HJSeZjjNb5NB7ZlYUjhLdCFVcf9mrs.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/l2c3-alNXtQbGcc6g5kP1hIKqSn8MEg1xwK.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/l2c4-T40Fw0R9hV9CzRfUncIFr0z7pkhrNg.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/l2c5-KGkQcMFsP186l23dVktFhIrIUcpvL0.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/l2c6-2vEyG0r7SjP2SwHY1rTDtvDGRb0idT.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/l2c7-dNgE5CYerFPShKbogp5tlnLPqopskI.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/l2c8-HWfr5lInOPCGB0RCbo2SmmcKMedSiH.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/l2c9-54jFlElI0A9AMhzaE1xMJmSWgAQwVi.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/l2c10-BW72hwrKRyLdmsVNwjtvBrOPBuML0O.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/l2c11-LLW48hNgNeTlXyvqebtDL81nBPwrRH.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/l2c12-V6ikND41pjmRxkhflqGh3Md13rKn42.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/l2c13-sCkidbRvUi9ZNqr7248EyUoSOinLxG.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/l2c15-XHTiaA2EkF487cePgJloey4L71wjTO.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/l2c12-V6ikND41pjmRxkhflqGh3Md13rKn42.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/l2c13-sCkidbRvUi9ZNqr7248EyUoSOinLxG.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/l2c17-baa9spO0qwyBireH7BfhuGAy560hRs.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/l2c18-ZpCSFENvqGakwhnBhV8xlCiRsu3VRR.png",
]

const l2cAlgorithms = [
  "Rw U2 Rw' U' Rw U' Rw'",
  "Rw U' Rw' U2 Rw U2 Rw' U Rw U2 Rw'",
  "Rw U Rw'",
  "Rw U Rw' U' Rw U' Rw'",
  "Rw U' Rw' U' Rw U' Rw'",
  "Rw U2 Rw' U Rw U2 Rw'",
  "Rw U' Rw'",
  "Rw U' Rw' U Rw U Rw'",
  "Rw U Rw' U Rw U Rw'",
  "Rw U2 Rw' U' Rw U2 Rw'",
  "U2 Rw U Rw' U' Rw U Rw' U' Rw U Rw' U'",
  "Rw U' Rw' U2 Rw U' Rw'",
  "Rw U2 Rw'",
  "Rw U Rw' U' Rw U2 Rw'",
  "Rw U' Rw' U Rw U2 Rw'",
  "Rw U' Rw' U Rw U' Rw'",
  "Rw U Rw' U' Rw U Rw'",
  "Rw U2 Rw' U2 Rw U' Rw'",
]

export const FiveXFiveL2CCases: MethodCase[] = l2cAlgorithms.map((algorithm, index) => ({
  id: `5x5-l2c-${index + 1}`,
  title: `L2C Case ${index + 1}`,
  algorithm,
  image: l2cImageUrls[index],
}))

export const FiveXFiveL2ECases: MethodCase[] = [
  { id: "5x5-l2e-1", title: "L2E Case 1", algorithm: "", image: "/images/5x5/l2e/l2e-1.png" },
]
