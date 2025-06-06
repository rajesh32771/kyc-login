import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-kyc-admin-upload',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrl : './kyc-admin-upload.component.css',
  templateUrl: "./kyc-admin-upload.component.html"  
 
})
export class KycAdminUploadComponent {
  form: any = {
    name: '',
    dob: '',
    pan: null,
    aadhaar: null,
    audio: null,
    video: null
  };

  submitted = false;

  handleFile(event: any, type: string) {
    const file = event.target.files[0];
    if (file) {
      this.form[type] = file;
    }
  }

  submit() {
    this.submitted = true;

    // Normally, here you'd send form data to the backend
    console.log('Submitted KYC form:', this.form);
  }
}
