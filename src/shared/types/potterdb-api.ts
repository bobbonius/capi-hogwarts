import type { components, operations } from "./potterdb";

type JsonApiBody<
  Operation extends keyof operations,
  Status extends keyof operations[Operation]["responses"] = 200,
> = operations[Operation]["responses"][Status] extends {
  content: { "application/vnd.api+json": infer Body };
}
  ? Body
  : never;

export type Character = components["schemas"]["character"];
export type CharacterListResponse = JsonApiBody<"getCharacters">;
export type CharacterResponse = JsonApiBody<"getCharacter">;
