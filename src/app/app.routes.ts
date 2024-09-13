import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/post-list/post-list.component').then(
        (m) => m.PostListComponent
      ),
  },
  {
    path: 'posts/:id',
    loadComponent: () =>
      import('./pages/post-detail/post-detail.component').then(
        (m) => m.PostDetailComponent
      ),
  },
];
