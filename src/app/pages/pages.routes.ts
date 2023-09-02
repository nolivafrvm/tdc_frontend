import { RouterModule, Routes } from "@angular/router";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { UsuarioComponent } from "./usuario/usuario/usuario.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { UsuarioEditComponent } from "./usuario/usuario/usuario-edit.component";
import { DatoComponent } from "./dato/dato.component";
import { NovedadComponent } from "./novedad/novedad.component";
import { DispositivoComponent } from "./dispositivo/dispositivo.component";
import { DispositivoEditComponent } from "./dispositivo/dispositivo-edit.component";
    
const pagesRoutes:Routes = [
    
    {path: "usuario" , component: UsuarioComponent, data:[{titulo: "Usuarios"}]},    
    {path: "usuario/:id" , component: UsuarioEditComponent, data:[{titulo: "Edición de usuario"}]},    
    {path: "dashboard" , component: DashboardComponent, data:[{titulo: "Dashboard"}]}, 
    {path: "dato" , component: DatoComponent, data:[{titulo: "Datos"}]},
    {path: "novedad" , component: NovedadComponent, data:[{titulo: "Novedades"}]},
    {path: "dispositivo" , component: DispositivoComponent, data:[{titulo: "Dispositivos"}]},
    {path: "dispositivo/:id" , component: DispositivoEditComponent, data:[{titulo: "Edición de dispositivo"}]},
    {path: '' , redirectTo: '/dashboard' , pathMatch: 'full'}

]

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);