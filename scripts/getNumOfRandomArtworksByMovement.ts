import SparqlClient from "sparql-http-client"
import z, { ZodType } from "zod"

export interface ResultSchema {
  image: string
  paintingLabel: string
  artistName: string
  date_of_birth?: string
  date_of_death?: string
  image_of_artist?: string
  movementLabel: string
  width?: string
  height?: string
  creationYear?: string
  description?: string
  abstract?: string
}

const resultSchema = z.object({
  image: z.string(),
  paintingLabel: z.string(),
  artistName: z.string(),
  date_of_birth: z.string().optional(),
  date_of_death: z.string().optional(),
  image_of_artist: z.string().optional(),
  movementLabel: z.string(),
  width: z.string().optional(),
  height: z.string().optional(),
  creationYear: z.string().optional(),
  description: z.string().optional(),
  abstract: z.string().optional(),
})

// TODO: remove, once figured out, why sparqlQuery function produces build error
const sparqlQueryTest = <ResultType>(
  query: string,
  resultSchema: ZodType<ResultType, any, any>,
): Promise<ResultType[]> => {
  const endpointUrl: string = "http://localhost:3030/art"
  return new Promise((resolve, reject) => {
    const client = new SparqlClient({ endpointUrl })
    const stream = client.query.select(query)

    const results: Array<ResultType> = []

    stream.on("data", (result: unknown) => {
      try {
        // Simplify the result object to only contain the values
        // Maybe you need to adjust this or create a new sparqlquery function for your use case
        const simplifiedResult = Object.fromEntries(
          Object.entries(z.record(z.string(), z.any()).parse(result)).map(
            ([key, value]) => [key, value.value],
          ),
        )

        const validatedResult = resultSchema.parse(simplifiedResult)

        results.push(validatedResult)
      } catch (error) {
        reject(error)
      }
    })

    stream.on("error", (err) => {
      reject(err)
    })

    stream.on("end", () => {
      resolve(results)
    })
  })
}

export const getArtworksByMovement = async (
  movementName: string,
  num: number,
): Promise<ResultSchema[]> => {
  const results = await sparqlQueryTest<ResultSchema>(
    `
    PREFIX : <http://h-da.de/fbi/art/>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

    SELECT DISTINCT ?image ?paintingLabel ?artistName ?date_of_birth ?date_of_death (STR(?artist_img) AS ?image_of_artist) ?movementLabel ?width ?height ?year ?description ?abstract WHERE {
      ?painting a :artwork;
        rdfs:label ?paintingLabel;
        :image ?image;
        :movement ?movement.

      ?movement rdfs:label ?movementLabel.
      FILTER(?movementLabel = "${movementName}")  # Ensure this is how you filter movements.

      ?painting :artist ?artist.
      ?artist rdfs:label ?artistName;
              :date_of_birth ?date_of_birth;
              :date_of_death ?date_of_death;
              :image ?artist_img.

      OPTIONAL { ?painting :width ?width. }
      OPTIONAL { ?painting :height ?height. }
      OPTIONAL { ?painting :inception ?year. }
      OPTIONAL { ?painting :description ?description. }
      OPTIONAL { ?painting :abstract ?abstract. }
    } 
    ORDER BY RAND()
    LIMIT ${num}

    `,
    resultSchema,
  )

  // Format the console output for better readability and prepare for the second query
  if (results.length > 0) {
    return results
  } else {
    console.log("No results found for the specified movement.")
    return []
  }
}