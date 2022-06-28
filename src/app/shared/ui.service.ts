import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subject } from "rxjs";

@Injectable()
export class UIService {
	constructor(private snackbar: MatSnackBar) {}

	loadingStateChange = new Subject<boolean>();

	snackbarOpen (message, action, config) {
		this.snackbar.open(message, action, config);
	}
}
