import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { postReducer } from './state/posts/posts.reducer';
import { PostEffects } from './state/posts/posts.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore(),
    provideState({
        name: 'posts',
        reducer: postReducer,
    }),
    provideEffects(PostEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
],
};
