import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AlertasService } from 'src/app/service/alertas.service';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  usuario: Usuario = new Usuario()
  idUser: number
  confirmarSenha: string
  tipoUsuario: string
  altura: number

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
    this.altura = window.innerHeight - 279

    if (environment.token == "") {
      //alert("Your session has expired! Please log in again.")
      this.router.navigate(["/entrar"])
    }

    this.idUser = this.route.snapshot.params["id"]

    this.findByIdUser(this.idUser)

  }


  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value
  }

  update() {
    //this.usuario.tipo = this.tipoUsuario
    this.authService.atualizar(this.usuario).subscribe((resp: Usuario) => {
      this.usuario = resp
      this.alertas.showAlertSuccess("User updated successfully! Please log in again...")
      environment.token = ""
      environment.nome = ""
      environment.foto = ""
      environment.id = 0
      environment.tipo = ""
      this.router.navigate(["/entrar"])
    })    
  }

  updateFoto() {
    this.authService.atualizarFoto(this.usuario).subscribe((resp: Usuario) => {
      this.usuario = resp
      this.alertas.showAlertSuccess("User updated successfully! Please log in again...")
      environment.token = ""
      environment.nome = ""
      environment.foto = ""
      environment.id = 0
      environment.tipo = ""
      this.router.navigate(["/entrar"])
    })    
  }

  updateSenha() {
    if(this.usuario.senha != this.confirmarSenha){
      this.alertas.showAlertDanger("Passwords do not match! Please try again...")
    }else{
      this.authService.atualizarSenha(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp
        this.alertas.showAlertSuccess("User updated successfully! Please log in again...")
        environment.token = ""
        environment.nome = ""
        environment.foto = ""
        environment.id = 0
        environment.tipo = ""
        this.router.navigate(["/entrar"])
      })
    }        
  }

  findByIdUser(id: number) {
    this.authService.getByIdUser(id).subscribe((resp: Usuario) => {
      this.usuario = resp
    })
  }

  /*if (this.usuario.senha != this.confirmarSenha) {
      this.alertas.showAlertDanger("Passwords are incorrect!")
    } else {
      this.authService.atualizar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp
        this.alertas.showAlertSuccess("User updated successfully! Please log in again...")
        environment.token = ""
        environment.nome = ""
        environment.foto = ""
        environment.id = 0
        environment.tipo = ""
        this.router.navigate(["/entrar"])
      })
    }*/

 

}
