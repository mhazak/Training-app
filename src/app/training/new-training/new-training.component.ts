import { Component, OnInit, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})

export class NewTrainingComponent implements OnInit, OnDestroy {

	@ViewChild('selectedExercise') selectedExercise!: any;
	@Output() trainingStarts = new EventEmitter<void>();
	exercises!: Exercise[];
	subscription: Subscription;

	constructor(private trainingService: TrainingService) { }

  	ngOnInit(): void {
		this.subscription = this.trainingService.exerciseChanged.subscribe((result: Exercise[]) => {
			this.exercises = result;
		});
		this.trainingService.fetchExercises();
  	}

	ngOnDestroy () {
		this.subscription.unsubscribe();
	}

	startTraining (form: NgForm) {
		this.trainingService.startExercise(form.value.selectedExercise);
	}

}
