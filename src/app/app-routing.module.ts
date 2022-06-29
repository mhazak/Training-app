import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
	{ path: '', component: WelcomeComponent },
	// canLoad checks before component is loaded - via lazyloading its better solution than use canActivate inside training-routing.module
	{ path: 'training', loadChildren: () => import('./training/training.module').then(x => x.TrainingModule), canLoad: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
