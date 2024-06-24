import { Injectable } from "@angular/core";

interface Usuario {
    username: string;
    nombreCompleto: string;
    password: string;
    repeatpwd: string;

}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private usuarios: Usuario[] = [];

    constructor() {
        if (this.isLocalStorageAvailable()) {
            const usuariosGuardados = localStorage.getItem('usuarios');
            this.usuarios = usuariosGuardados ? JSON.parse(usuariosGuardados) : [];
        } else {
            this.usuarios = [];
        }
    }

    registrarUsuario(username: string, nameFull: string, password: string, repeatpwd: string): boolean {
        console.log('Agregando Usuario... ', { username, nameFull, password, repeatpwd });
        const usuarioExistente = this.usuarios.find(user => user.username === username);
        if (usuarioExistente) {
            this.mostrarAlerta('El usuario ya existe. ', 'danger');
            console.log('Usuario ya existe');
            return false;
        }

        const nuevoUser: Usuario = {
            username: "",
            nombreCompleto: "",
            password: "",
            repeatpwd: ""
        };
        this.usuarios.push(nuevoUser);
        if (this.isLocalStorageAvailable()) {
            localStorage.setItem('usuario', JSON.stringify(this.usuarios));
        }
        this.mostrarAlerta('Usuario Registrado OK...', 'success');
        console.log('Usuario Registrado con Exito.. ', nuevoUser);
        return true
    }


    iniciarSesion(username: string, password: string): boolean {
        console.log('Iniciando sesión...', { username, password });
        const usuario = this.usuarios.find(user => (user.username === username) && user.password === password);
        if (usuario) {
            this.mostrarAlerta('Inicio se sesión correcto' ,'success');
            console.log('Inicio Correcto', usuario);
            return true;
        } else {
            this.mostrarAlerta(' Usuario o Contraseña incorrecta... ','danger');
            console.log('Usuario o contraseña incorrecta');
            return false;
        }
    }


    private mostrarAlerta(mensaje: string, tipo: string): void {
        const alertaDiv = document.createElement('div');
        alertaDiv.className = `alert alert-${tipo}`;
        alertaDiv.appendChild(document.createTextNode(mensaje));
        const container = document.querySelector('.container');
        if (container) {
            const firstChild = container.firstChild;
            if (firstChild) {
                container.insertBefore(alertaDiv, firstChild);
            } else {
                container.appendChild(alertaDiv);
            }

            setTimeout(() => {
                const alerta = document.querySelector('.alert');
                if (alerta) {
                    alerta.remove();
                }
            }, 6000);
        }
    }
    private isLocalStorageAvailable(): boolean {
        try {
            const test = '__test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    }
}