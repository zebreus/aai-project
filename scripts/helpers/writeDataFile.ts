import { writeFile } from "fs/promises";
import { ZodType } from "zod";
import { createTypeAlias, printNode, zodToTs } from "zod-to-ts";
import * as prettier from "prettier";

const pascalCase = (name: string) => {
  return name
    .replace(/[\W_-]+/g, " ")
    .split(/ |\B(?=[A-Z])/)
    .map((word) => word.charAt(0).toUpperCase() + word.toLowerCase().slice(1))
    .join("");
};

const camelCase = (name: string) => {
  const pascalCaseName = pascalCase(name);
  return pascalCaseName.charAt(0).toLowerCase() + pascalCaseName.slice(1);
};

/**
 *  Write a typescript file with the given data and schema.
 *
 * @param name Name of the file/data. In snake case of
 * @param data Data to write to the file.
 * @param schema Zod schema of the data. Used to generate typescript types.
 */
export const writeDataFile = async <ResultType>(
  name: string,
  data: ResultType,
  schema: ZodType<ResultType, any, any>,
) => {
  const fileName = `${camelCase(name)}.ts`;
  console.log(`Writing ${name} to scripts/data/${fileName}`);
  const filePath = `${module.path}/../data/${fileName}`;
  const typeIdentifier = pascalCase(name);
  const valueIdentifier =
    typeIdentifier.charAt(0).toLowerCase() + typeIdentifier.slice(1);
  const { node } = zodToTs(schema, typeIdentifier);
  const typeAlias = createTypeAlias(node, typeIdentifier);
  const fileContent = `
  // This file is automatically generated. Do not modify manually.

  export ${printNode(typeAlias)}

  export const ${valueIdentifier}: ${typeIdentifier} = ${JSON.stringify(
    data,
    null,
    0,
  )} satisfies ${typeIdentifier};
  `;
  const options = await prettier.resolveConfig(filePath);
  const formattedContent = await prettier.format(fileContent, {
    ...(options ?? {}),
    parser: "typescript",
  });
  await writeFile(filePath, formattedContent);
};