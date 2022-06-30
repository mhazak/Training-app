import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {

	displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
	datasource = new MatTableDataSource<Exercise>();

	@ViewChild(MatSort) sort!: MatSort;
	@ViewChild(MatPaginator) paginator!: MatPaginator;

	constructor(private trainingService: TrainingService, private store: Store<fromTraining.State>) { }

	ngOnInit(): void {
		this.store.select(fromTraining.getFinishedExercises).subscribe((result: Exercise[]) => {
			this.datasource.data = result;
		})
		this.trainingService.getExerciseHistory();
	}

	ngAfterViewInit() {
		this.datasource.sort = this.sort;
		this.datasource.paginator = this.paginator;
	}

	doFilter(event: KeyboardEvent) {
		const value = (event.target as HTMLInputElement).value;
		this.datasource.filter = value.trim().toLowerCase();
	}

}
