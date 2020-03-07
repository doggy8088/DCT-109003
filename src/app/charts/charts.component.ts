import { Component, OnInit } from '@angular/core';
import { chartAreaDemo } from '../chartAreaDemo';
import { chartPieDemo } from '../chartPieDemo';
import { chartBarDemo } from '../chartBarDemo';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  type = 0;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    chartAreaDemo();
    chartPieDemo();
    chartBarDemo();

    // this.type = +this.route.snapshot.paramMap.get('type');

    this.route.queryParamMap.subscribe(p => {
      this.type = +p.get('type');
    });
  }

  plusOne() {
    this.router.navigate(['/charts'], {
      queryParams: {
        type: this.type + 1
      }
    });
  }

}


