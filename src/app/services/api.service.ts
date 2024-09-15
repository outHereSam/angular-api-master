import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
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

  getCommentsByPostId(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/${id}/comments`);
  }

  getPostById(id: number): Observable<Post> {
    return this.http
      .get<Post>(`${this.apiUrl}/${id}`)
      .pipe(
        switchMap((post) =>
          this.getCommentsByPostId(id).pipe(
            map((comments: Comment[]) => ({ ...post, comments }))
          )
        )
      );
  }

  deletePost(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
