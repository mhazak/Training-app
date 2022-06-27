import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {

	displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
	datasource = new MatTableDataSource<Exercise>();
	subscription: Subscription;

	@ViewChild(MatSort) sort!: MatSort;
	@ViewChild(MatPaginator) paginator!: MatPaginator;

	constructor(private trainingService: TrainingService) { }

	ngOnInit(): void {
		this.subscription = this.trainingService.completedExercisesChanged.subscribe((result: Exercise[]) => {
			this.datasource.data = result;
		})
		this.trainingService.getExerciseHistory();
	}

	ngAfterViewInit() {
		this.datasource.sort = this.sort;
		this.datasource.paginator = this.paginator;
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	doFilter(event: KeyboardEvent) {
		const value = (event.target as HTMLInputElement).value;
		this.datasource.filter = value.trim().toLowerCase();
	}

}
