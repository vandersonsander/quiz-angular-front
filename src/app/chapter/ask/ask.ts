import { Chapter } from "../chapter";
import { Answer } from "./answer";

export class Ask {
  id: number;
  value: string;
  type: string;
  answer: string;
  order: number;
  chapter: Chapter;
  answers: Array<Answer>;
}
