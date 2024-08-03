import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {BlogService} from "../../../services/blog.service";
import {Router, RouterLink} from "@angular/router";
import {BlogResponse} from "../../../interfaces/blog.interface";
import Swal from "sweetalert2";

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css'
})
export default class BlogListComponent implements OnInit{

  private blogService = inject(BlogService);
  private router = inject(Router);

  blogs: BlogResponse[] = [];

  ngOnInit(): void {
    this.getAllBlogs();
  }

  getAllBlogs() {
    this.blogService.getAllBlogs().subscribe({
      next: (response) => {
        console.log(response)
        this.blogs = response;
      },
      error: (error) => {
        console.error('Ocurrió un error!', error);
      }
    });
  }

  deleteBlog(id: string) {
    Swal.fire({
      title: '¿Estás segur@?',
      text: "Estás a punto de borrar un blog",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Borrar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.blogService.deleteBlog(id).subscribe({
          next: () => {
            Swal.fire(
              '¡Borrado!',
              'El blog fue borrado exitosamente',
              'success'
            );
            this.getAllBlogs(); // Refresh the list
          },
          error: (error) => {
            console.error('Error al borrar el blog', error);
            Swal.fire('Error', 'Erroral borrar el blog', 'error');
          }
        });
      }
    });
  }

}
