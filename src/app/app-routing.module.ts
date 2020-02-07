import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'gallery',
    canActivate: [AuthGuard],
    loadChildren: () => import('./gallery/gallery.module').then(mod => mod.GalleryModule),
  },
  { path: '', redirectTo: '/gallery', pathMatch: 'full' },
  { path: "**", redirectTo: '/gallery', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }