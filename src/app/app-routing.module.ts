import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'gallery',
    loadChildren: () => import('./gallery/gallery.module').then(mod => mod.GalleryModule),
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: "**", redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }