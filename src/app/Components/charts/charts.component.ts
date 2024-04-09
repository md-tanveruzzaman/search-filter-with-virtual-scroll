import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { GitgubSearchService } from 'src/app/Services/gitgub-search.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit{
  public barChartLegend = true;
  public barChartPlugins = [];
  @ViewChild(BaseChartDirective, { static: true }) chart!: BaseChartDirective;

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ ],
    datasets: [ { data: [], label: 'Stars' },]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

  constructor(
    private github: GitgubSearchService
  ) { }

  ngOnInit(): void {
    this.getLastYearsRepoStats();
  }

  private getLastYearsRepoStats() {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 1);
    const startDate = new Date(date.getFullYear(), 0, 1).toISOString();
    const endDate = new Date(date.getFullYear(), 11, 31).toISOString();

    this.github.getLastYearsRepoByStars(startDate, endDate)
      .subscribe({
        next: (items) => {
          if (items.length) {
            console.log(items.map(repo => repo.name))
            this.barChartData.labels = items.map(repo => repo.name + ` (${repo.language})`);
            this.barChartData.datasets[0].data = items.map(repo => repo.stargazers_count);
            this.chart.update();
          }
        }
      })
  }

  getLastYear() {
    const date = new Date();
    return date.getFullYear() - 1;
  }
}
