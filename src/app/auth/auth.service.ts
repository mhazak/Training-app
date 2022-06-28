import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthData } from "./auth-data.model";
import { User } from "./user.model";
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class AuthService {
	authChange = new Subject<boolean>();
	private user!: User | null;

	constructor (private router: Router, private auth: AngularFireAuth) {}

	registerUser(authData: AuthData) {
		this.auth
			.auth
			.createUserWithEmailAndPassword(authData.email, authData.password)
			.then(res => {
				console.log({res});
				this.authSuccessfully();
			})
			.catch(err => {
				console.log({err});
			})


		this.authSuccessfully();
	}

	login(authData: AuthData) {
		console.log({authData});
		this.auth
			.auth
			.signInWithEmailAndPassword(authData.email, authData.password)
			.then(res => {
				console.log({res});
				this.authSuccessfully();
			})
			.catch(err => {
				console.log({err, email: authData.email, password: authData.password})
			})
	}

	logout() {
		this.user = null;
		this.router.navigate(['/login']);
	}

	getUser() {
		return { ...this.user };
	}

	isAuth() {
		return !!this.user;
	}

	authSuccessfully() {
		this.authChange.next(true);
		this.router.navigate(['/training']);
	}
}
