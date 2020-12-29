import { Answer } from "./answer";

export class Ask {
  id: number;
  value: string;
  type: string;
  answer: string;
  order: number;
  answers: Array<Answer>;
}
