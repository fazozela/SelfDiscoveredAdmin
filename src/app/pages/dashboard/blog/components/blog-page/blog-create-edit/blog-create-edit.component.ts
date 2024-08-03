import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule, Location} from "@angular/common";
import {BlogService} from "../../../services/blog.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {QuillModule} from "ngx-quill";

@Component({
  selector: 'app-blog-create-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, QuillModule],
  templateUrl: './blog-create-edit.component.html',
  styleUrl: './blog-create-edit.component.css'
})
export default class BlogCreateEditComponent implements OnInit{
  private fb = inject(FormBuilder);
  private blogService = inject(BlogService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private location = inject(Location)

  blogForm: FormGroup;
  isEditing = false;
  blogId: string | null = null;

  quillConfig = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['clean'],
      ['link', 'image']
    ]
  };

  constructor() {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      author: ['', Validators.required],
      imageUrl: [null]
    });
  }

  ngOnInit() {
    this.blogId = this.route.snapshot.paramMap.get('id');
    if (this.blogId) {
      this.isEditing = true;
      this.loadBlogData();
    }
  }

  loadBlogData() {
    if (this.blogId) {
      this.blogService.getBlogById(this.blogId).subscribe({
        next: (blog) => {
          this.blogForm.patchValue(blog);
        },
        error: (error) => {
          console.error('Error loading blog data', error);
          Swal.fire('Error', 'Failed to load blog data', 'error');
        }
      });
    }
  }

  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.blogForm.patchValue({
      imageUrl: file
    });
  }

  onSubmit() {
    if (this.blogForm.valid) {
      const formData = new FormData();
      Object.keys(this.blogForm.value).forEach(key => {
        formData.append(key, this.blogForm.get(key)?.value);
      });

      if (this.isEditing) {
        this.updateBlog(formData);
      } else {
        this.createBlog(formData);
      }
    }
  }

  createBlog(formData: FormData) {
    this.blogService.createBlog(formData).subscribe({
      next: () => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Blog creado con éxito",
          showConfirmButton: false,
          timer: 1500
        });
        this.location.back();
      },
      error: (error) => {
        console.error('Error al crear el blog', error);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error al crear el blog",
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }

  updateBlog(formData: FormData) {
    if (this.blogId) {
      this.blogService.updateBlog(this.blogId, formData).subscribe({
        next: () => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Blog editado correctamente",
            showConfirmButton: false,
            timer: 1500
          });
          this.location.back();
        },
        error: (error) => {
          console.error('Error al editar el blog', error);
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Error al editar el blog",
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
    }
  }

}
