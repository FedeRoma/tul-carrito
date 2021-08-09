import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { User } from 'src/app/interfaces/user.interface';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router, private _firebaseService: FirebaseService, private message: NzMessageService) { }

  users: User[] = [];
  validateForm!: FormGroup;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }

    const user = this.validateForm.get('email')?.value
    const password = this.validateForm.get('password')?.value
    if (user && user == this.users[0].user && password && password == this.users[0].password)
      this.router.navigate(['/home'])
    else
      this.createMessage('error')
  }


  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: [null, [Validators.required]],
      remember: [true]
    });
    this.obtenerUsers()
  }

  obtenerUsers() {
    this._firebaseService.obtenerUsers().subscribe(doc => {
      this.users = [];
      doc.forEach((element: any) => {
        this.users.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
    })
  }

  createMessage(type: string): void {
    this.message.create(type, 'Usuario o contraseña incorrecto');
  }

}
