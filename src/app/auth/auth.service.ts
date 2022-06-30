import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthData } from "./auth-data.model";
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from "../training/training.service";
import { UIService } from "../shared/ui.service";
import { Store } from "@ngrx/store";

import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from './auth.actions';

@Injectable()
export class AuthService {

	constructor (private router: Router,
		private auth: AngularFireAuth,
		private uiservice: UIService,
		private store: Store<{ui: fromRoot.State}>) {}

	initAuthListener () {
		this.auth.authState.subscribe(user => {
			if (user) {
				this.store.dispatch(new Auth.SetAuthenticated());
				this.router.navigate(['/training']);
			} else {
				this.store.dispatch(new Auth.SetUnauthenticated());
				this.router.navigate(['/login']);
			}
		})
	}

	registerUser(authData: AuthData) {
		this.store.dispatch(new UI.StartLoading());
		this.auth
			.auth
			.createUserWithEmailAndPassword(authData.email, authData.password)
			.then(res => {
				this.store.dispatch(new UI.StopLoading());
			})
			.catch(err => {
				this.store.dispatch(new UI.StopLoading());
				this.uiservice.snackbarOpen(err.message, null, { duration: 3000 })
			})
	}

	login(authData: AuthData) {
		this.store.dispatch(new UI.StartLoading());
		this.auth
			.auth
			.signInWithEmailAndPassword(authData.email, authData.password)
			.then(res => {
				this.store.dispatch(new UI.StopLoading());
			})
			.catch(err => {
				this.store.dispatch(new UI.StopLoading());

				this.uiservice.snackbarOpen(err.message, null, { duration: 3000 })
			})
	}

	logout() {
		this.auth.auth.signOut();
	}
}
