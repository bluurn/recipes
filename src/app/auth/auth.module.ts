import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AuthComponent } from "./auth.component";

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: "", component: AuthComponent }]),
  ],
  declarations: [AuthComponent],
})
export class AuthModule {}
