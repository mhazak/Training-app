import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthData } from "./auth-data.model";
import { User } from "./user.model";

@Injectable()
export class AuthService {
	authChange = new Subject<boolean>();
	private user!: User | null;

	constructor (private router: Router) {}

	registerUser(authData: AuthData) {
		this.user = {
			email: authData.email,
			id: '123'
		}

		this.authSuccessfully();
	}

	login(authData: AuthData) {
		this.user = {
			email: authData.email,
			id: '123'
		}
		this.authSuccessfully();
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
