import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Quiz Angular';
  chapters = [
    {
      number: 1,
      title: 'Intro',
      asks: [
        {
          index: 0,
          type: 'input',
          value: 'Cidade',
          answer: '',
        },
        {
          index: 1,
          type: 'one-select',
          value: 'Sexo',
          answers: [
            {
              value: 'Masculino',
              checked: true,
            },
            {
              value: 'Feminino',
              checked: false,
            },
            {
              value: 'Outro',
              cheked: false
            }
          ]
        }
      ]
    },
    {
      number: 2,
      title: 'Principal',
      asks: [
        {
          index: 2,
          type: 'multi-select',
          value: 'Cite as 2 principais marcas',
          answers: [
            {
              value: 'Coca-cola',
              checked: false,
            },
            {
              value: 'Fanta',
              checked: false,
            },
            {
              value: 'Guaraná Antártica',
              checked: false,
            },
            {
              value: 'Doly',
              checked: false,
            },
          ]
        },
        {
          index: 3,
          type: 'one-select',
          value: 'Quais vc gosta',
          answers: [
            {
              value: 'Coca-cola',
              checked: false,
            },
            {
              value: 'Fanta',
              checked: false,
            },
            {
              value: 'Guaraná Antártica',
              checked: false,
            },
            {
              value: 'Doly',
              checked: false,
            },
          ]
        }
      ]
    },
  ];
}
