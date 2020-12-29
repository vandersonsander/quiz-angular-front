import { Ask } from "./ask/ask";

export class Chapter {
  id: number;
  order: number;
  title: string;
  asks: Array<Ask>;
}
