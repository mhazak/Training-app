import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

import { Subscription, take } from 'rxjs';

import { StopTrainingComponent } from './stop-training/stop-training.component';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})

export class CurrentTrainingComponent implements OnInit {

	constructor(private dialog: MatDialog, private trainingService: TrainingService, private store: Store<fromTraining.State>) { }

	interval: any;
	progress = 0;
	status = 'Keep going!';
	selectedExercise!: Exercise;

	subscription!: Subscription;

	ngOnInit(): void {
		this.startOrContinue();
	}

	startOrContinue() {

		this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(training => {

			if (training) {
				// duration of training devided by 100 (percent) multiple by 1000 (ms)
				const step = training?.duration / 100 * 1000;
				this.interval = setInterval(() => {
					this.progress += 1;
					if (this.progress >= 100) {
						this.trainingService.completedExercise();
						this.status = 'Your workout is done. Well done!';
						clearInterval(this.interval);
						return;
					}
				}, step);
			}
		})

	}

	stopTraining () {
		clearInterval(this.interval);
		const dialogResult = this.dialog.open(StopTrainingComponent, { data: {
			progress: this.progress
		}});

		dialogResult.afterClosed().subscribe(result => {
			if (result) {
				this.trainingService.cancelledExercise(this.progress);
				return;
			}

			this.startOrContinue();
		});

	}

}
