import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

import { Observable } from 'rxjs';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	@Output() headerToggler = new EventEmitter<void>();
	isLogged$: Observable<boolean>;

	constructor(private authService: AuthService, private store: Store<fromRoot.State>) { }

	ngOnInit(): void {
		this.isLogged$ = this.store.select(fromRoot.getIsAuth);
	}

	onLogout () {
		this.authService.logout();
	}

	onMenuToggle() {
		this.headerToggler.emit();
	}
}
