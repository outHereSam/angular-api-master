import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { CacheService } from './cache.service';
import { of, throwError } from 'rxjs';
import { Post } from '../interfaces/IPost';
import { Comment } from '../interfaces/IComment';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  let cacheServiceSpy: jasmine.SpyObj<CacheService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('CacheService', ['get']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService, { provide: CacheService, useValue: spy }],
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
    cacheServiceSpy = TestBed.inject(
      CacheService
    ) as jasmine.SpyObj<CacheService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get posts', (done) => {
    const mockPosts: Post[] = [
      { userId: 1, id: 1, title: 'Post 1', body: 'Body 1' },
      { userId: 2, id: 2, title: 'Post 2', body: 'Body 2' },
    ];
    cacheServiceSpy.get.and.returnValue(of(mockPosts));

    service.getPosts().subscribe((posts) => {
      expect(posts).toEqual(mockPosts);
      done();
    });
  });

  it('should get post by id with comments', (done) => {
    const mockPost: Post = {
      userId: 1,
      id: 1,
      title: 'Post 1',
      body: 'Body 1',
    };
    const mockComments: Comment[] = [
      {
        postId: 1,
        id: 1,
        name: 'Comment 1',
        email: 'user@example.com',
        body: 'Comment body 1',
      },
    ];
    cacheServiceSpy.get.and.returnValues(of(mockPost), of(mockComments));

    service.getPostById(1).subscribe((post) => {
      expect(post).toEqual({ ...mockPost, comments: mockComments });
      expect(cacheServiceSpy.get.calls.count()).toBe(2);
      done();
    });
  });

  it('should create a post', (done) => {
    const mockPostData = {
      title: 'New Post',
      body: 'This is a new post',
      userId: 1,
    };
    const mockResponse: Post = { id: 101, ...mockPostData };

    service.createPost(mockPostData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
      done();
    });

    const req = httpMock.expectOne(service.apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should delete a post', (done) => {
    const postId = 1;

    service.deletePost(postId).subscribe(() => {
      done();
    });

    const req = httpMock.expectOne(`${service.apiUrl}/${postId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should handle errors', (done) => {
    cacheServiceSpy.get.and.returnValue(
      throwError(() => new Error('Test error'))
    );

    service.getPosts().subscribe({
      error: (error) => {
        expect(error).toBeTruthy();
        done();
      },
    });
  });
});
