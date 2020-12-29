import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Chapter } from './chapter/chapter';
import { ChapterService } from './chapter/chapter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title: string = 'Quiz Angular';
  chapters: Observable<Chapter[]>;

  constructor(private _chapterService: ChapterService) { }

  ngOnInit(): void {
    this.chapters = this._chapterService.index()
    .pipe(
      map((chapters: Chapter[]) => {
        let askCount: number = 0;
        // ordered questions
        return chapters.map((chapter, index) => {
          chapter.order = index;
          // ordered asks
          chapter.asks = chapter.asks.map((ask: any) => {
            ask.order = askCount++;
            return ask;
          });
          return chapter;
        });

      })
    )
  }

}
