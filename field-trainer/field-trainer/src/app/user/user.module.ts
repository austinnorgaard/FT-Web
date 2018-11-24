import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RegisterPageComponent } from "./components/register-page/register-page.component";
import { UserManagementService } from "./services/user-management.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule, MatOptionModule, MatInputModule, MatSelectModule, MatCheckboxModule, MatButtonModule } from "@angular/material";
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
