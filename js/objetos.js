'use strict';
class Notas {
    constructor() {
        this._notas = [];
        this._usuarios = [];
        this._usuarioGrupos = [];
        this._grupos = [];
    }


    registrarUsuario(oUsuario) 
    {
        let bResultado = true;

        if(this._usuarios.some(oU => (oU.usuario == oUsuario.usuario || oU.email == oUsuario.email)))
        {
            bResultado = false;
        }
        else
        {
            this._usuarios.push(oUsuario);
        }
        return bResultado;

    }

    buscarUsuario(sNombreUsuario,sPassword){
        //buscar usuario, false si no lo encuentra, true si sí
        return false;
    }

    modificarUsuario(oUsuario) {

    }

    bajaUsuario(oUsuario) {

    }

    altaNota(oNota) {

    }

    modificarNota(oNota) {

    }

    bajaNota(oNota) {

    }

    altaGrupo(oGrupo) {

    }

    bajaGrupo(oGrupo) {

    }
}

class Usuario {
    constructor(sUsuario, sContraseña, sEMail, sNombre) {
        this.usuario = sUsuario;
        this.contraseña = sContraseña;
        this.email = sEMail;
        this.nombre = sNombre;
        this.notas = [];
    }
}

class Nota
{
    constructor(iIdNota, sTitulo, sContenido)
    {
        this.idNota = iIdNota;
        this.titulo = sTitulo;
        this.contenido = sContenido;
    }
}

class Grupo 
{
    contructor(sIdGrupo, sNombre)
    {
        this.idGrupo = sIdGrupo;
        this.nombre = sNombre;
        this.usuarios = [];
    }
}


class UsuarioGrupo
{
    constructor(sIdUsuario, sIdGrupo)
    {
        this.idUsuario = sIdUsuario;
        this.idGrupo = sIdGrupo;
    }
}