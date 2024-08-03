import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {NavigationBarComponent} from "../../../shared/navigation-bar/navigation-bar.component";
import {SidebarComponent} from "../../../shared/sidebar/sidebar.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    NavigationBarComponent,
    SidebarComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export default class LayoutComponent {

}
