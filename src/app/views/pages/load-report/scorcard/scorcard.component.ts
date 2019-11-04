import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-scorcard',
  templateUrl: './scorcard.component.html',
  styleUrls: ['./scorcard.component.css']
})
export class ScorcardComponent implements OnInit {

	@Input() public scorcard: Object;

    constructor() {
	}

	ngOnInit() {
	}

}
