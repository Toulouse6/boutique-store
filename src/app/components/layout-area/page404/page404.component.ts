import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-page404',
  standalone: true,
  imports: [],
  templateUrl: './page404.component.html',
  styleUrl: './page404.component.css'
})
export class Page404Component {
    
        public constructor(title: Title) {
            title.setTitle("Boutique Toulouse | Not Found")
        }
}
