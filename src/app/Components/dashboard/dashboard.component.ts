import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  // Sample data for charts
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };

  public barChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
  ];

  // Sample data for pie chart
  public pieChartLabels = ['Red', 'Blue', 'Yellow'];
  public pieChartData = [300, 500, 100];
  public pieChartType = 'pie';
}
