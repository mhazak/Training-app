import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
	exercises!: Observable<Exercise[]>;

	constructor(private trainingService: TrainingService, private db: AngularFirestore) { }

  	ngOnInit(): void {
		this.exercises = this.db
		.collection('availableExercises')
		.snapshotChanges()
		.pipe(
			map(docData => {
				return docData.map(doc => {
					const data: any = doc.payload.doc.data()
					return {
						id: doc.payload.doc.id,
						...data
					}
				})
			})
		)
  	}

	startTraining (form: NgForm) {
		this.trainingService.startExercise(form.value.selectedExercise);
	}

}
