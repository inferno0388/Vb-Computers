import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-form',
  templateUrl: './popup-form.component.html',
  styleUrls: ['./popup-form.component.scss']
})
export class PopupFormComponent {

  formData: any = {}; // Object to hold form data
 

  constructor(public dialogRef: MatDialogRef<PopupFormComponent>) {}

  closeDialog() {
    // Pass the form data when closing the dialog
    this.dialogRef.close(this.formData);
  }

}
