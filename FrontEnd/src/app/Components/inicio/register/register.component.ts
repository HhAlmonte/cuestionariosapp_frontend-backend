import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastNoAnimationModule, ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  register: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, 
              private toast: ToastrService, 
              private usuarioService: UsuarioService,
              private router: Router ) {
    this.register = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmarPassword: ['', Validators.required]
    }, {validators: this.checkPassword});
   }

  ngOnInit(): void {
  }

  registrarUsuario(){
    const usuario: Usuario ={
      username : this.register.value.username,
      password : this.register.value.password
    }
    this.loading = true;
    this.usuarioService.saveUser(usuario).subscribe(data => {
      this.router.navigate(['/inicio/login']);
      this.toast.success('El usuario <' + usuario.username + '> fue registrado con exito','Usuario Registrado')
      this.loading = false;
    }, error => {
      this.loading = false;
      this.toast.error(error.error.message,'Error')
      this.register.reset();
    });
  }

  checkPassword(group: FormGroup): any{
    const pass = group.controls['password'].value;
    const confirmarPassword = group.controls['confirmarPassword'].value;
    return pass === confirmarPassword ? null : {notSame: true};
  }
}
