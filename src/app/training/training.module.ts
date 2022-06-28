import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { CommonModule } from "@angular/common";

import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { MaterialModule } from "../material.module";
import { StopTrainingComponent } from "./current-training/stop-training/stop-training.component";
import { AngularFirestoreModule } from "@angular/fire/firestore";

@NgModule({
	declarations: [
		TrainingComponent,
		CurrentTrainingComponent,
		NewTrainingComponent,
		PastTrainingsComponent,
		StopTrainingComponent
	],
	imports: [
		MaterialModule,
		FormsModule,
		FlexLayoutModule,
		CommonModule,
		AngularFirestoreModule
	],
	exports: [],
	entryComponents: [StopTrainingComponent]
})

export class TrainingModule {}
