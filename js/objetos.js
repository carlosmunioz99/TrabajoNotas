'use strict';
class Notas {
    constructor() {
        this._notas = [];
        this._usuarios = [];
        this._usuarioGrupos = [];
        this._grupos = [];
    }

    getUsuarios()
    {
        return this._usuarios;
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



    altaNota(oNota) 
    {
        let bResultado = true;
        if(this._notas.some(oN => (oN.idNota == oNota.idNota)))
        {
            bResultado = false;
        }
        else
        {
            this._notas.push(oNota);
            let listaUsuarios = this.getUsuarios();
            let usuarioABuscar = listaUsuarios.find(oU => oU.usuario == oNota.usuario.usuario)
            usuarioABuscar.notas.push(oNota);
            console.log(usuarioABuscar);
        }
        return bResultado;

    }

    modificarNota(oNota) {

    }

    bajaNota(oNota) {

    }

    altaGrupo(oGrupo) 
    {
        let bResultado = true;

        if(this._grupos.some(oG => (oG.nombreGrupo == oGrupo.sNombreGrupo)))
        {
            bResultado = false;
        }
        else
        {
            this._grupos.push(oGrupo);
        }
        return bResultado;

    }

    bajaGrupo(oGrupo) {

    }

    generarFilasGrupos(tBody)
    {
        
        
        for(let g of this._grupos)
        {
            console.log(g.listaUsuarios);
            let nombreUsuarios = [];
            for(let oU of g.listaUsuarios){
                nombreUsuarios.push(oU.usuario);
            }
            
            let $row=tBody.insertRow(-1); 
            $row.insertCell(-1).textContent=g.nombreGrupo
            

            //agregar usuarios
            let oLista = document.createElement("ul");
        for(let i=0;i<nombreUsuarios.length;i++)
        {
            console.log(nombreUsuarios[i]);
            let oElementoList = document.createElement("li");
            oElementoList.textContent = nombreUsuarios[i];
            oLista.appendChild(oElementoList);
        }

        $row.insertCell(-1).appendChild(oLista);
            //editar y eliminar
            let $editar=document.createElement("div");
            $editar.classList.add("fondo-editar");
            $editar.dataset.id=g.nombreGrupo;
            $editar.dataset.toggle="modal";
            $editar.dataset.target="#modalEditarGrupo";

            $row.insertCell(-1).appendChild($editar);

            let $eliminar=document.createElement("div");
            $eliminar.classList.add("fondo-eliminar");
            $eliminar.dataset.id=g.nombreGrupo;
            $row.insertCell(-1).appendChild($eliminar);

        }
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
    constructor(iIdNota, sTitulo, sContenido, sPrioridad, oUsuario)
    {
        this.idNota = iIdNota;
        this.titulo = sTitulo;
        this.contenido = sContenido;
        this.prioridad = sPrioridad;
        this.usuario = oUsuario;
    }
    
    static contenidoNota(oNota)
    {
        let oDivNota = document.createElement('div')
        oDivNota.setAttribute("class", "card");

        let notaContenido = document.createElement('div');
        notaContenido.setAttribute("class", "card-body");
        let oEncabezado = document.createElement('h5');
        oEncabezado.setAttribute("class", "card-title");
        oEncabezado.textContent = oNota.titulo;

        let oContenido = document.createElement('p');
        oContenido.setAttribute("class", "card-text")
        oContenido.textContent = oNota.contenido;

        oDivNota.style.width = "18rem";
        oDivNota.style.height= "300px";
        
        if(oNota.prioridad == "alta")
        {
            oDivNota.style.backgroundColor = "red";
        }
        if(oNota.prioridad == "media")
        {
            oDivNota.style.backgroundColor = "yellow";
        }
        if(oNota.prioridad == "baja")
        {
            oDivNota.style.backgroundColor = "green";
        }
        let contenedor = document.querySelector("#contenedor-notas");
        contenedor.appendChild(oDivNota);
        oDivNota.appendChild(notaContenido);
        notaContenido.appendChild(oEncabezado)
        notaContenido.appendChild(oContenido);
    }
}

class Grupo 
{
    constructor(sNombreGrupo, arrlistaUsuarios)
    {
        this.nombreGrupo = sNombreGrupo;
        this.listaUsuarios = arrlistaUsuarios;
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