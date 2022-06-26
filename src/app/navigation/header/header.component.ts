import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

	@Output() headerToggler = new EventEmitter<void>();
	isLogged: boolean = false;
	authSubscription!: Subscription;
	constructor(private authService: AuthService) { }

	ngOnInit(): void {
		this.authSubscription = this.authService.authChange.subscribe((logged: boolean) => {
			this.isLogged = logged;
		});
	}

	onMenuToggle() {
		this.headerToggler.emit();
	}

	ngOnDestroy() {
		this.authSubscription.unsubscribe();
	}
}
