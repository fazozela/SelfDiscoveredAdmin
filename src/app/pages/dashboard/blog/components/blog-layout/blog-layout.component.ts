import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-blog-layout',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './blog-layout.component.html',
  styleUrl: './blog-layout.component.css'
})
export default class BlogLayoutComponent {

}
