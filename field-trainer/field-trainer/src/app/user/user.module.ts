import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RegisterPageComponent } from "./components/register-page/register-page.component";
import { UserManagementService } from "./services/user-management.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatOptionModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { NgbAlertModule } from "@ng-bootstrap/ng-bootstrap";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatOptionModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        NgbAlertModule,
        MatButtonModule,
        ReactiveFormsModule,
    ],
    declarations: [RegisterPageComponent],
    providers: [UserManagementService],
})
export class UserModule {}
