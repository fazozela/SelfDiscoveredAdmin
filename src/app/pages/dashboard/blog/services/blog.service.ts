import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BlogResponse} from "../interfaces/blog.interface";
import {Observable} from "rxjs";
import {environments} from "../../../../../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private readonly baseUrl = environments.testBaseUrl;
  private http = inject( HttpClient );

  constructor() { }

  getAllBlogs(): Observable<BlogResponse[]>{
    const url = `${ this.baseUrl }/blog`;
    return this.http.get<BlogResponse[]>(url);
  }

  getBlogById(id: string): Observable<BlogResponse> {
    const url = `${this.baseUrl}/blog/${id}`;
    return this.http.get<BlogResponse>(url);
  }

  createBlog(blogData: FormData): Observable<BlogResponse> {
    const url = `${this.baseUrl}/blog`;
    return this.http.post<BlogResponse>(url, blogData);
  }

  updateBlog(id: string, blogData: FormData): Observable<BlogResponse> {
    const url = `${this.baseUrl}/blog/${id}`;
    return this.http.patch<BlogResponse>(url, blogData);
  }

  deleteBlog(id: string): Observable<any> {
    const url = `${this.baseUrl}/blog/${id}`;
    return this.http.delete(url);
  }
}
