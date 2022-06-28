import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthData } from "./auth-data.model";
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from "../training/training.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AuthService {
	authChange = new Subject<boolean>();
	private isAuthenticated = false;

	constructor (private router: Router, private auth: AngularFireAuth, private trainingService: TrainingService, private snackbar: MatSnackBar) {}

	initAuthListener () {
		this.auth.authState.subscribe(user => {
			if (user) {
				this.isAuthenticated = true;
				this.authChange.next(true);
				this.router.navigate(['/training']);
			} else {
				this.trainingService.cancelSubscriptions();
				this.authChange.next(false);
				this.router.navigate(['/login']);
				this.isAuthenticated = false;
			}
		})
	}

	registerUser(authData: AuthData) {
		this.auth
			.auth
			.createUserWithEmailAndPassword(authData.email, authData.password)
			.then(res => {
			})
			.catch(err => {
				this.snackbar.open(err.message, null, {
					duration: 3000
				})
			})
	}

	login(authData: AuthData) {
		this.auth
			.auth
			.signInWithEmailAndPassword(authData.email, authData.password)
			.then(res => {
			})
			.catch(err => {
				this.snackbar.open(err.message, null, {
					duration: 3000
				})
			})
	}

	logout() {
		this.trainingService.cancelSubscriptions();
		this.auth.auth.signOut();
		this.isAuthenticated = false;
		this.router.navigate(['/login']);
	}

	isAuth() {
		return this.isAuthenticated;
	}
}
