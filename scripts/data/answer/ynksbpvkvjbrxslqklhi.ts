// This file is automatically generated. Do not modify manually.

export type Ynksbpvkvjbrxslqklhi = {
  id: string
  artwork: {
    image: string
    paintingLabel: string
    artistName: string
    date_of_birth?: string | undefined
    date_of_death?: string | undefined
    image_of_artist?: string | undefined
    movementLabel: string
    width?: string | undefined
    height?: string | undefined
    inception?: string | undefined
    description?: string | undefined
    abstract?: string | undefined
    depicts?: string | undefined
    country?: string | undefined
  }
  prompt: string
  result: number
}

const ynksbpvkvjbrxslqklhi: Ynksbpvkvjbrxslqklhi = {
  id: "ynksbpvkvjbrxslqklhi",
  artwork: {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/c/c8/Portail_effet_de_matin_W1353.jpg",
    paintingLabel: "Rouen Cathedral, Portal, Morning Light",
    artistName: "Claude Monet",
    date_of_birth: "1840",
    date_of_death: "1926",
    image_of_artist:
      "https://upload.wikimedia.org/wikipedia/commons/a/a4/Claude_Monet_1899_Nadar_crop.jpg",
    movementLabel: "Impressionism",
    description:
      "painting by Claude Monet, 1893 - part of the Rouen Cathedral series - private collection - 2/2",
    depicts: ["Rouen Cathedral"],
  },
  prompt:
    "Painting in the style of Claude Monet.  \n\nA majestic Gothic cathedral stands tall, its stone façade glowing warmly in the morning light, with intricate details and ornate carvings visible on its portal",
  result: 0,
} satisfies Ynksbpvkvjbrxslqklhi

// Export as default value to avoid a weird bug where json files are sometimes preferred over ts files
export default ynksbpvkvjbrxslqklhi
