import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TablesComponent } from './tables/tables.component';
import { ChartsComponent } from './charts/charts.component';
import { ColorsComponent } from './utilities/colors/colors.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { Login2Component } from './login2/login2.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'tables', component: TablesComponent,
        canActivate: [AuthGuard] },
      { path: 'charts', component: ChartsComponent, data: { title: '圖表' } },
      { path: 'charts/:type', component: ChartsComponent, data: { title: '圖表' } },
      { path: 'utilities',
        loadChildren: () => import('./utilities/utilities.module').then(m => m.UtilitiesModule) },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'login2', component: Login2Component },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
