import { Component, OnInit } from '@angular/core';

import { DummyComponentService } from './dummy-component.service';
import { Dummy } from '../models/Dummy';

@Component({
	selector: 'app-dummy-component',
	templateUrl: './dummy-component.component.html',
	styleUrls: ['./dummy-component.component.css']
})
export class DummyComponentComponent implements OnInit {

	dummyData: Dummy;

	constructor(private dummyComponentService: DummyComponentService) { }

	ngOnInit() {
		this.get();
	}

	get(): void {
		this.dummyComponentService.get()
			.subscribe(response => this.dummyData = response);
	}
}
