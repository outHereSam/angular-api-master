import { Component } from '@angular/core';
import { PostListComponent } from '../../components/post-list/post-list.component';
import { FormModalComponent } from '../../components/form-modal/form-modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PostListComponent, FormModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass',
})
export class HomeComponent {}
