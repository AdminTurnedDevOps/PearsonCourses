import {ErrorObject} from "ajv"

export interface Localize {
  (errors?: null | ErrorObject[]): void
}
