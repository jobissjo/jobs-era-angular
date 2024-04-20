import { Component, Inject } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MessageModel } from "../../Models/message-model";
@Component({
    selector: 'custom-dialog.component',
    templateUrl: './custom-dialog.component.html',
    standalone: true,
    imports: [MatButtonModule, MatDialogModule],
    styles: [`.actions{
      display:'flex';
      justify-content:'space-between'
    }`]
})
export class CustomDialogComponent {

    title: string;
    message:string;
    constructor(public dialogRef: MatDialogRef<CustomDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: MessageModel) {
        this.title = data.title;
        this.message = data.message;
    }

    noClick() {
        this.dialogRef.close(false);
    }

    okClick() {
        this.dialogRef.close(true);
    }
}