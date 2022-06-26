import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

	@ViewChild('selectedExercise') selectedExercise!: any;
	@Output() trainingStarts = new EventEmitter<void>();
	exercises!: Exercise[];

	constructor(private trainingService: TrainingService) { }

  	ngOnInit(): void {
		this.exercises = this.trainingService.getExercises();
  	}

	toggleCurrentTraining () {
		console.log({selectedExercise: this.selectedExercise._value});
		this.trainingService.startExercise(this.selectedExercise._value);
	}

}
