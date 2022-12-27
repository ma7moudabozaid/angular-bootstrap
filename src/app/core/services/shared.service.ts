import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  Url: string;

  constructor(private toastr: ToastrService) {
    this.Url = 'https://api.shoperapp.com/Images/Advertisements/';
  }

  public get Token(): string {
    return localStorage.getItem('Token') || '';
  }
  public get UserData(): any {
    return JSON.parse(localStorage.getItem('User') || '');
  }
  public get UserName(): string {
    const User = JSON.parse(localStorage.getItem('User') || '');
    return User.userName;
  }
  public get UserId(): number {
    const User = JSON.parse(localStorage.getItem('User') || '');
    return User.id;
  }

  // public get Url(): string {
  //   return 'https://api.shoperapp.com/Images/Advertisements/';
  // }

  toastrSuccess(message: string) {
    this.toastr.success(message || "Success");
  }

  toastrError(message: string) {
    this.toastr.error(message || "Error");
  }

  toastrInfo(message: string, title: string) {
    this.toastr.info(message, title);
  }

  toastrWarning(message: string, title: string) {
    this.toastr.warning(message, title);
  }
}
