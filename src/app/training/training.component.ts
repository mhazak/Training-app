import { Component, OnDestroy, OnInit } from '@angular/core';
import { Exercise } from './exercise.model';
import { TrainingService } from './training.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
	ongoingTraining = false;
	subscription!: Subscription;
	runningExercise!: Exercise;

  	constructor(private trainingService: TrainingService) { }

  	ngOnInit(): void {
		this.subscription = this.trainingService.exerciseStarted.subscribe((exercise: Exercise) => {
			this.ongoingTraining = true;
			this.runningExercise = exercise;
		});
  	}

	ngOnDestroy () {
		this.subscription.unsubscribe();
	}

}
