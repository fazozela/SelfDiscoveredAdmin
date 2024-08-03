import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-consultation-layout',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './consultation-layout.component.html',
  styleUrl: './consultation-layout.component.css'
})
export default class ConsultationLayoutComponent {

}
