import {Component, inject} from '@angular/core';
import {Router, RouterModule} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import Swal from 'sweetalert2';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export default class AuthComponent {
  private fb = inject(FormBuilder);
  private authenticationService = inject(AuthService);
  private router = inject( Router );

  public myForm: FormGroup = this.fb.group({
    email: ['fazozela@gmail.com', [Validators.required]],
    password:  ['Abc123456', [Validators.required]],
  })

  login(){
    const {email, password} = this.myForm.value;

    this.authenticationService.login(email, password)
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/panel')
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "¡Bienvenido a Self Discovered!",
            showConfirmButton: false,
            timer: 1500
          });
        },
        error: (errorMessage) => {
          Swal.fire('Error', errorMessage, 'error')
        }
      })
  }
}
