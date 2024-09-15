import { Component, inject, Input } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { Post } from '../../interfaces/IPost';

@Component({
  selector: 'app-form-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-modal.component.html',
  styleUrl: './form-modal.component.sass',
})
export class FormModalComponent {
  modalService: ModalService = inject(ModalService);
  @Input() post: Post | null = null;

  postForm: FormGroup;

  constructor() {
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
    console.log('Title:', this.postForm.value.title);
    console.log('Body:', this.postForm.value.body);
    this.modalService.closeModal();
  }
}
