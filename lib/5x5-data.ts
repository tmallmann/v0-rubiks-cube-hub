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

const l2eImageUrls = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/l2e1-EWakZmkPy1SsSWBe0Ga7C9vPCLVdZq.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/l2e2-5TGbulXqOyYeX0kUG3MgmxWpBvI3cd.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/l2e3-aNMnAQj1EOd2N88qcoI6YYCRhtELUZ.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/l2e4-mv2xkPOU3cOzfYAoyzAl3FN30vBUj8.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/l2e5-OeJdA2EbW2wRPUyCIo5Eyd8PYtRLyd.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/l2e6-ZSZHDMA6go0bMvaogz8d3OyC0eNv3k.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/l2e7-ybNgYXEgFarxQA33YAeP1R2erNey3d.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/l2e10-4wUeXb4lPczZHkZt8NER1MczzJEH7A.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/l2e8-0QUVaXM7mCVQUDy91hHpcRexPyIVKM.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/l2e9-MHexccoPlQC4clyLsDwRtrdOlJCTzT.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/l2e12-PJ5VM0TQqv4ZjFOsDPujHnOCI14M8D.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/l2e11-teWaCEqGf2BHq5cLfThJp7TlNo7IQ2.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/l2e13-lHNLuAhF40hN12jIEEE7racik1baAP.png",
]

const l2eAlgorithms = [
  "Rw' U' R' U R' F R F' Rw",
  "Lw U' R' U R' F R F' Lw'",
  "x' M' U' R' U R' F R F' M x",
  "Rw2 F2 U2 Rw2 U2 F2 Rw2",
  "Rw2 B2 Rw' U2 Rw' U2' x' U2 Rw' U2' Rw U2 Rw' U2' Rw2 U2 x",
  "Rw U2 x Rw U2 Rw U2 Rw' U2 Lw U2 3Rw' U2 Rw U2 Rw' U2 Rw'",
  "Lw' U2 Lw' U2 F2 Lw' F2 Rw U2 Rw' U2 Lw2",
  "F2 Rw U2 Rw U2' Rw' F2 Rw' U2 Rw' U2' Rw U2 Rw' U2' Rw2",
  "B2 Rw' U2 Rw' U2' Rw B2 Rw U2 Rw U2' Rw' U2 Rw U2' Rw2",
  "Rw' U2 Rw2 U2 Rw U2 Rw' U2 Rw U2 Rw2 U2 Rw'",
  "Rw U2 Rw2 U2 Rw' U2 Rw U2 Rw' U2 Rw2 U2 Rw",
  "Rw' U2 Rw' U2 B2 Rw' B2 Rw' F2 Lw2 F2 Rw U2 Rw2",
  "Rw U R U' Rw2 U' R U Rw2 U R U' Rw'",
]

export const FiveXFiveL2ECases: MethodCase[] = l2eAlgorithms.map((algorithm, index) => ({
  id: `5x5-l2e-${index + 1}`,
  title: `L2E Case ${index + 1}`,
  algorithm,
  image: l2eImageUrls[index],
}))
