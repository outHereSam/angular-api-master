import { Component, inject, Input } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { Post } from '../../interfaces/IPost';
import { ApiService } from '../../services/api.service';
import { Store } from '@ngrx/store';
import { addPost } from '../../state/posts/posts.actions';
import { PostData } from '../../interfaces/IPostData';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-form-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-modal.component.html',
  styleUrl: './form-modal.component.sass',
})
export class FormModalComponent {
  modalService: ModalService = inject(ModalService);
  apiService: ApiService = inject(ApiService);

  @Input() post: Post | null | undefined;

  postForm: FormGroup;

  constructor(private store: Store) {
    this.postForm = new FormGroup({});
  }

  ngOnInit() {
    this.postForm = new FormGroup({
      title: new FormControl(this.post?.title || '', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      body: new FormControl(this.post?.body || '', [
        Validators.required,
        Validators.minLength(10),
      ]),
    });

    if (this.post) {
      this.postForm.markAllAsTouched();
    }
  }

  handleSubmit() {
    this.apiService
      .createPost({
        id: this.post?.id || 0,
        title: this.postForm.value.title,
        body: this.postForm.value.body,
        userId: 11,
      })
      .subscribe((post: any) => {
        const newPost = {
          ...post,
          id: post.id,
          userId: 11,
          title: this.postForm.value.title,
          body: this.postForm.value.body,
          comments: [],
        };
        this.store.dispatch(addPost({ post: newPost }));
      });
    this.store.dispatch(addPost({ post: { ...this.postForm.value } }));
    this.modalService.closeModal();
  }
}
