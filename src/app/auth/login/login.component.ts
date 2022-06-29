import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromApp from '../../app.reducer';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	isLoading$: Observable<boolean>;

	loginForm = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', Validators.required)
	});
	constructor(private authService: AuthService, private store: Store<{ui: fromApp.State}>) { }

  	ngOnInit(): void {
		this.isLoading$ = this.store.pipe(map((state => state.ui.isLoading)))
  	}

	onSubmit() {
		this.authService.login({
			email: this.loginForm.value['email'],
			password: this.loginForm.value['password'],
		})

	}

}
