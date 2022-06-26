import { Subject } from "rxjs";
import { AuthData } from "./auth-data.model";
import { User } from "./user.model";

export class AuthService {
	authChange = new Subject<boolean>();
	private user!: User | null;

	registerUser(authData: AuthData) {
		this.user = {
			email: authData.email,
			id: '123'
		}
		this.authChange.next(true);
	}

	login(authData: AuthData) {
		this.user = {
			email: authData.email,
			id: '123'
		}
		this.authChange.next(true);
	}

	logout() {
		this.user = null;
	}

	getUser() {
		return { ...this.user };
	}

	isAuth() {
		return !!this.user;
	}
}
