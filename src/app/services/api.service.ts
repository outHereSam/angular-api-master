import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  map,
  Observable,
  retry,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { Post } from '../interfaces/IPost';
import { Comment } from '../interfaces/IComment';
import { PostData } from '../interfaces/IPostData';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  constructor(private http: HttpClient, private cacheService: CacheService) {}

  getPosts(): Observable<Post[]> {
    return this.cacheService
      .get(this.apiUrl)
      .pipe(retry(3), catchError(this.handleError));
  }

  getCommentsByPostId(id: number): Observable<Comment[]> {
    return this.cacheService.get(`${this.apiUrl}/${id}/comments`);
  }

  getPostById(id: number): Observable<Post> {
    return this.cacheService.get(`${this.apiUrl}/${id}`).pipe(
      switchMap((post) =>
        this.getCommentsByPostId(id).pipe(
          map((comments: Comment[]) => ({ ...post, comments }))
        )
      ),
      catchError(this.handleError)
    );
  }

  createPost(postData: Post) {
    return this.http
      .post(this.apiUrl, postData)
      .pipe(catchError(this.handleError));
  }

  deletePost(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => console.log(`Post with id: ${id} deleted`)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError(() => error);
  }
}
