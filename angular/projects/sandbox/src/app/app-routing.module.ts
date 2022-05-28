import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FieldsGalleryComponent } from './fields-gallery/fields-gallery.component';

const routes: Routes = [
	{
		path: 'fields-gallery',
		component: FieldsGalleryComponent,
	},
	{
		path: '',
		redirectTo: 'fields-gallery',
		pathMatch: 'full',
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
