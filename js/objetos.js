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
        return true;
    }

    modificarUsuario(oUsuario) {

    }

    bajaUsuario(sNombreUsuario) {
        let iPosUsuario=this._usuarios.findIndex(oUsuario=>oUsuario.usuario==sNombreUsuario);
        this._usuarios.splice(iPosUsuario,1);

        let iPosUsuarioGrupo=this._usuarioGrupos.findIndex(oGrupoUsuario=>oGrupoUsuario.idUsuario==sNombreUsuario);
        //en caso de que el usuario pertenezca a un grupo
        if(iPosUsuarioGrupo!=-1){
            this._usuarioGrupos.splice(iPosUsuarioGrupo,1);
        }
    }

    generarFilasUsuarios($tbody){
        
        for(let u of this._usuarios){
            let $row=$tbody.insertRow(-1);
            $row.insertCell(-1).textContent=u.usuario;
            $row.insertCell(-1).textContent=u.nombre;
            $row.insertCell(-1).textContent=u.email;
            $row.insertCell(-1).textContent=u.contraseña;
            
            

            let $editar=document.createElement("div");
            $editar.classList.add("fondo-editar");
            $editar.dataset.id=u.usuario;
            $editar.dataset.toggle="modal";
            $editar.dataset.target="#modalEditarUsuario";

            $row.insertCell(-1).appendChild($editar);

            let $eliminar=document.createElement("div");
            $eliminar.classList.add("fondo-eliminar");
            $eliminar.dataset.id=u.usuario;
            $row.insertCell(-1).appendChild($eliminar);
        }
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