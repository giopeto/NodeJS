import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';



import { AppComponent } from './app.component';
import { DummyComponentComponent } from './dummy-component/dummy-component.component';
import { DummyComponentService } from './dummy-component/dummy-component.service';

@NgModule({
	declarations: [
		AppComponent,
		DummyComponentComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule
	],
	providers: [DummyComponentService],
	bootstrap: [AppComponent]
})
export class AppModule { }
