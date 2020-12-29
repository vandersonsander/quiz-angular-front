import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AskService {
  emmitSelectedAsk = new EventEmitter<number>();
  currentAsk: number = 0;

  constructor() { }

  getCurrentAsk():number {
    return this.currentAsk;
  }

  selectAsk(askIndex: number) {
    this.currentAsk = askIndex;
    this.emmitSelectedAsk.emit(this.currentAsk);
  }
}
