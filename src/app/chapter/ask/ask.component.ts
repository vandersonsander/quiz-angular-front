import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Answer } from './answer';
import { AnswerService } from './answer.service';
import { Ask } from './ask';
import { AskService } from './ask.service';
import { CitiesService } from './cities.service';

@Component({
  selector: 'app-ask',
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.css']
})
export class AskComponent implements OnInit {

  @Input() ask: Ask;

  step: number = 3;
  expanded: boolean = false;
  cities: Array<any> = [];
  limitRank: number = 2;
  reachedLimit: boolean = false;
  loopAsk: Observable<any>;

  currentLoopAsk: number = 3;

  addText: boolean = false;
  addTextValue: string = '';

  checked: boolean;

  likedItems: any[] = [];

  constructor(
    private _citiesService: CitiesService,
    private _askService: AskService,
    private _answerService: AnswerService) { }

  ngOnInit(): void {
    this._citiesService.getCities().subscribe((cities: Array<any>) =>
      this.cities = cities);
    this._askService.emmitSelectedAsk.subscribe((ask: number) =>
      this.step = ask);
    this.validateAnswers();
  }

  // Navigates between the asks
  setStep(index: number): void {
    this.step = index;
    this._askService.selectAsk(this.step);
  }

  nextStep(e: any, panel: any): void {
    if (panel && !panel.expanded) return;
    // Removes the click event of the parent element
    e && e.stopPropagation();
    this.step++;
    this.setStep(this.step);
  }

  prevStep(e: any): void {
    // Removes the click event of the parent element
    e && e.stopPropagation();
    this.step--;
    this.setStep(this.step);
  }

  loadLoop() {
    this._answerService.index().subscribe(data => {
      this.ask.answers = data.filter(answer => {
        return answer.ask.id === this.currentLoopAsk;
      });
    })
  }

  actionOnOpen(ask: Ask) {
    if (ask.type === 'loop')
      this.loadLoop()
  }

  validateAnswers(): void {
    const answersCount: any = this.ask.answers
      .reduce((count: number, answer: { checked: boolean }) => {
        return answer.checked ? (count + 1) : count;
      }, 0);
    if (answersCount === 2) {
      this.reachedLimit = true;
      return;
    }
    this.reachedLimit = false;
  }

  addItem(input: any, item: string): void {
    if (item === '') {
      input.validate();
      return;
    }
    const newAnswer = new Answer();
    newAnswer.value = item;
    newAnswer.checked = false;
    newAnswer.ask = this.ask;
    this._answerService.store(newAnswer).subscribe((data) => {
      this.ask.answers.push(data);
    });
    this.addTextValue = '';
    this.addText = false;
  }

  onDropItem(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data,
        event.previousIndex,
        event.currentIndex)
    }
  }

  deleteItem(id: number) {
    this._answerService.destroy(id).subscribe(() => {
      this.ask.answers = this.ask.answers.filter((answer) => answer.id !== id);
    });
  }

  saveAnswer(): void {
    switch (this.ask.type) {
    case 'multi-select':
      Promise.all(
        this.ask.answers.map(answer => {
          return this._answerService.update(answer.id, answer).toPromise();
        })
      );
      return;
    case 'one-select':
      this._askService.update(this.ask.id, this.ask).toPromise();
      return;
    case 'input':
      this._askService.update(this.ask.id, this.ask).toPromise()
        .then(res => console.log(res));
      return;
    case 'input-number':
      this._askService.update(this.ask.id, this.ask).toPromise()
        .then(res => console.log(res));
      return;
    case 'loop':
      this.ask.answers.map(answer => {
        return this._answerService.update(answer.id, answer).toPromise();
      })
    default:
      return;
    }

  }

  setAnswerLoop(res: boolean, answer: any) {
    if (res) {
      answer.checked = true;
      this.likedItems = this.likedItems.filter(item => item.id !== answer.id);
      this.likedItems.push(answer);
      this.ask.answers[this.ask.answers
        .findIndex(fItem => fItem.id === answer.id)] = answer;
    }
  }

}
