import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit {

  @Input() chapter: {
    number: number,
    title: string,
    asks: Array<any>
  };

  constructor() { }

  ngOnInit(): void {
  }

}
