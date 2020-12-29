import { Component, Input, OnInit } from '@angular/core';
import { AskService } from './ask.service';
import { CitiesService } from './cities.service';

@Component({
  selector: 'app-ask',
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.css']
})
export class AskComponent implements OnInit {

  @Input() ask: {
    type: string,
    value: string,
    index: number,
    answers: Array<Object>
  };

  step: number = 2;
  expanded: boolean = false;
  cities: Array<any> = [];
  limitRank: number = 2;
  reachedLimit: boolean = false;

  addText: boolean = false;
  addTextValue: string = '';

  constructor(private _citiesService: CitiesService,
    private _askService: AskService) { }

  ngOnInit(): void {
    this._citiesService.getCities().subscribe((cities: Array<any>) =>
      this.cities = cities);
    this._askService.emmitSelectedAsk.subscribe((ask: number) =>
      this.step = ask)
  }

  // Navigates between the asks
  setStep(index: number): void {
    this.step = index;
    this._askService.selectAsk(this.step);
  }

  nextStep(e: any, panel: any): void {
    if (!panel.expanded) return;
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

  validateAnswers(elem: any): void {
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
    this.ask.answers.push({ value: item, checked: false });
    this.addTextValue = '';
    this.addText = false;
  }

}
