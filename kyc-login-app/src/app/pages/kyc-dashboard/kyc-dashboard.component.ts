import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-kyc-dashboard.component',
  imports: [CommonModule, FormsModule],
  templateUrl: './kyc-dashboard.component.html',
  styleUrl: './kyc-dashboard.component.css'
})
export class KycDashboardComponent {
  filterText = '';
  selectedUser: any = null;

  kycList = [
    { name: 'Rajesh Kumar', document: 'Aadhar', status: 'Approved', date: '2025-06-01' },
    { name: 'Sonal Patel', document: 'PAN', status: 'Pending', date: '2025-06-02' },
    { name: 'Ankit Sharma', document: 'Voter ID', status: 'Rejected', date: '2025-06-03' },
    { name: 'Divya Jain', document: 'Aadhar', status: 'Approved', date: '2025-06-04' },
    { name: 'Vikram Mehta', document: 'PAN', status: 'Pending', date: '2025-06-05' },
  ];

  filteredList() {
    const text = this.filterText.trim().toLowerCase();
    return this.kycList.filter(user =>
      user.name.toLowerCase().includes(text) ||
      user.status.toLowerCase().includes(text)
    );
  }

  view(user: any) {
    this.selectedUser = user;
  }

  close() {
    this.selectedUser = null;
  }
}
