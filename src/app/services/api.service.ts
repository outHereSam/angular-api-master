import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/IPost';
import { Comment } from '../interfaces/IComment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  getCommentsByUserId(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/${id}/comments`);
  }
}
