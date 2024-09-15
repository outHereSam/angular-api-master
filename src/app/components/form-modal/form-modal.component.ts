import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-modal.component.html',
  styleUrl: './form-modal.component.sass',
})
export class FormModalComponent {
  postForm = new FormGroup({
    title: new FormControl(''),
    body: new FormControl(''),
  });

  handleSubmit() {
    console.log('Title:', this.postForm.value.title);
    console.log('Body:', this.postForm.value.body);
  }
}
