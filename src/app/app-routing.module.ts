import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'gallery',
    canActivate: [AuthGuard],
    loadChildren: () => import('./gallery/gallery.module').then(mod => mod.GalleryModule),
  },
  { path: '', redirectTo: 'gallery', pathMatch: 'full' },
  { path: "**", component: PageNotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled", enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }