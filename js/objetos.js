class Notas {
    constructor() {
        this._notas = [];
        this._usuarios = [];
        this._usuarioGrupos = [];
        this._grupos = [];
    }


    registrarUsuario(oUsuario) 
    {

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

class Notas
{
    constructor(iIdNota, sTitulo, sContenido)
    {
        this.idNota = iIdNota;
        this.titulo = sTitulo;
        this.contenido = sContenido;
    }
}

class Nota 
{
    contructor(sIdGrupo, sNombre)
    {
        this.idGrupo = sIdGrupo;
        this.nombre = sNombre;
        this.usuarios = [];
    }
}


class usuarioGrupo
{
    constructor(sIdUsuario, sIdGrupo)
    {
        this.idUsuario = sIdUsuario;
        this.idGrupo = sIdGrupo;
    }
}