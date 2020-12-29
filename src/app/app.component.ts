import { Component, OnInit } from '@angular/core';
import { Chapter } from './chapter/chapter';
import { ChapterService } from './chapter/chapter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title: string = 'Quiz Angular';
  chapters: Chapter[] = null;

  constructor(private _chapterService: ChapterService) { }

  ngOnInit(): void {
    this._chapterService.index().subscribe(data => {
      this.chapters = data;
      this.orderChapters();
    });
  }

  orderChapters() {
    let askCount: number = 0;
    this.chapters = this.chapters.map((chapter: any, index) => {
      chapter.order = index;
      // order asks
      chapter.asks = chapter.asks.map((ask: any) => {
        ask.order = askCount++;
        return ask;
      })
      return chapter;
    })
  }

}
