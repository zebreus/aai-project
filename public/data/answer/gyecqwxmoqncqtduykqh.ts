// This file is automatically generated. Do not modify manually.

export type Gyecqwxmoqncqtduykqh = {
  id: string
  artwork: {
    image: string
    paintingLabel: string
    artistName: string
    movementLabel: string
    date_of_birth?: string | undefined
    date_of_death?: string | undefined
    artist_img?: string | undefined
    width?: string | undefined
    height?: string | undefined
    inception?: string | undefined
    country?: string | undefined
    description?: string | undefined
    abstract?: string | undefined
    motifs: string[]
    genres: string[]
    materials: string[]
  }
  prompt: string
  result: number
}

const gyecqwxmoqncqtduykqh: Gyecqwxmoqncqtduykqh = {
  id: "gyecqwxmoqncqtduykqh",
  artwork: {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/6c/Retrat_de_noia_-_Joan_Brull%2C_Museu_Abell%C3%B3_1662.png",
    paintingLabel: "Portrait of girl",
    artistName: "Joan Brull Vinyoles",
    movementLabel: "Art Nouveau",
    date_of_birth: "1863",
    date_of_death: "1912",
    artist_img:
      "https://upload.wikimedia.org/wikipedia/commons/d/d2/Autoretrat_-_Joan_Brull_i_Vinyoles_%281863-1912%29.jpg",
    description: "painting by Joan Brull",
    motifs: ["woman"],
    genres: ["portrait"],
    materials: ["oil paint", "canvas"],
  },
  prompt:
    "a painting of a young woman with short hair, an oil on canvas painting by Károly Ferenczy, pixiv, classical realism, oil on canvas, studio portrait, impressionism, art nouveau",
  result: 0,
} satisfies Gyecqwxmoqncqtduykqh

// Export as default value to avoid a weird bug where json files are sometimes preferred over ts files
export default gyecqwxmoqncqtduykqh