import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import Swal from "sweetalert2";
import {NavigationEnd, Router, RouterLink, RouterLinkActive} from "@angular/router";
import {AuthService} from "../../pages/auth/services/auth.service";
import {filter} from "rxjs";

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent {
  @ViewChild('navbarToggler') navbarToggler!: ElementRef;
  @ViewChild('navbarSupportedContent') navbarContent!: ElementRef;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private authService: AuthService
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.closeNavbar();
    });
  }

  closeNavbar() {
    if (this.navbarContent && this.navbarToggler) {
      const content = this.navbarContent.nativeElement;
      const toggler = this.navbarToggler.nativeElement;

      if (content.classList.contains('show')) {
        setTimeout(() => {
          this.renderer.removeClass(content, 'show');
          toggler.setAttribute('aria-expanded', 'false');
        }, 150); // Small delay to ensure the navigation has occurred
      }
    }
  }

  onLogout(){
    const token = localStorage.getItem('token');

    if(token){
      this.authService.logout();
      Swal.fire({
        position: "top-end",
        icon: "info",
        title: "Sesión cerrada",
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/inicio']);
    }else{
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "No se inició sesión",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

}
