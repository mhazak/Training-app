import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UIService {
	constructor(private snackbar: MatSnackBar) {}

	snackbarOpen (message, action, config) {
		this.snackbar.open(message, action, config);
	}
}
