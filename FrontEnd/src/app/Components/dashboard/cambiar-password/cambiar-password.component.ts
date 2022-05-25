import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css']
})
export class CambiarPasswordComponent implements OnInit {
  cambiarPassword: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private toastr: ToastrService,
              private router: Router) {
    this.cambiarPassword = this.fb.group({
      passwordAnterior: ['', Validators.required],
      nuevaPassword: ['', [Validators.required, Validators.minLength(4)]],
      passwordConfirmn: ['']
    }, {validator: this.checkPassword})
   }

  ngOnInit(): void {
  }
  checkPassword(group: FormGroup): any{
    const pass = group.controls['nuevaPassword'].value;
    const passwordConfirmn = group.controls['passwordConfirmn'].value;
    return pass === passwordConfirmn ? null : {notSame: true};
  }
  guardarPassword(){
    const changePassword: any = {
      passwordAnterior:  this.cambiarPassword.value.passwordAnterior,
      nuevaPassword: this.cambiarPassword.value.nuevaPassword
    };
    this.loading = true;
    this.usuarioService.changePassword(changePassword).subscribe(data => {
      this.router.navigate(['/dashboard']);
      this.toastr.info(data.message);
    }, error => {
      this.loading = false;
      this.cambiarPassword.reset();
      this.toastr.error(error.error.message,'Error')
    });
  }
}
