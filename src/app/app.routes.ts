import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';
import { LoginGuardGuard } from './services/guards/login-guard.guard';




const appRoutes:Routes = [
    {path:'login', component:LoginComponent},
    {path:'register', component:RegisterComponent},
        // AGREGAMOS PARA EL LAZY LOAD            
    {path: '' , component: PagesComponent, canActivate: [LoginGuardGuard],
    loadChildren : () => import('./pages/pages.module').then( m => m.PagesModule )},    
    {path:'**', component : NopagefoundComponent}
]

export const APP_ROUTES = RouterModule.forRoot(appRoutes, {useHash:true});