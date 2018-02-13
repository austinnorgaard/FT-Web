import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SetupComponent } from './setup-component/setup.component';
import { FTSessionComponent } from './ft-session-component/ft-session.component';

const routes: Routes = [
    { path: '', redirectTo: '/setup', pathMatch: 'full'},
    { path: 'setup', component: SetupComponent },
    { path: 'session', component: FTSessionComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
