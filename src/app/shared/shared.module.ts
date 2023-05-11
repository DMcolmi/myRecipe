import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { DropdownDirective } from "./dropdown.directive";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations:[
        AlertComponent,
        LoadingSpinnerComponent,
        DropdownDirective
    ],
    imports:[
        CommonModule,
        FormsModule
    ],
    exports:[
        CommonModule,
        AlertComponent,
        LoadingSpinnerComponent,
        DropdownDirective,        
        FormsModule
    ]
})
export class SharedModule{}