import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';
import { Usuario } from "../../../models/usuario";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  login : FormGroup;

  constructor(private fb: FormBuilder, 
              private toastr: ToastrService,
              private router: Router,
              private loginService: LoginService) {
    this.login = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
   }

  ngOnInit(): void {
  }

  log():void{
    const usuario: Usuario = {
      username: this.login.value.username,
      password: this.login.value.password
    };
    this.loading = true;
    this.loginService.login(usuario).subscribe(data => {
      this.loading = false;
      this.loginService.setLocalStorage(data.token);
      this.router.navigate(['/dashboard']);
    }, error => {
       this.loading = false;
       this.toastr.error(error.error.message, 'Error');
       this.login.reset();
    });
  }
}
