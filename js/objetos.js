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

    buscarUsuario(sNombreUsuario){
        
        let oUsuario=this._usuarios.find(oUser=>oUser.usuario==sNombreUsuario);
        
        return oUsuario;
    }
    
    modificarUsuario(oUsuario) {
        //comprobar que el email no exista. 
        let bModificado=true;

        if(this._usuarios.some(oU => (oU.email == oUsuario.email) && (oUsuario.usuario != oU.usuario) ))
        {
            bModificado = false;
        }else{
            let oRefeUsuario=this.buscarUsuario(oUsuario.usuario);
        
            oRefeUsuario.email=oUsuario.email;
            oRefeUsuario.nombre=oUsuario.nombre;
            oRefeUsuario.contraseña=oUsuario.contraseña;
        }
        
        

        return bModificado;
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

    }

    modificarNota(oNota) {

    }

    bajaNota(oNota) {

    }

    altaGrupo(oGrupo) 
    {
        
        this._grupos.push(oGrupo);
        
       

    }

    bajaGrupo(oGrupo) {

    }

    generarFilasGrupos(tBody)
    {

        for(let g of this._grupos)
        {
            // busca todos los usuarios de un grupo
            let listaGruposUsuario=this._usuarioGrupos.filter(oUsuGru=>g.id==oUsuGru.idGrupo);
            
            let oUsuarios=[];
            for(let i=0;i<listaGruposUsuario.length;i++){
                let oUsuario=this.buscarUsuario(listaGruposUsuario[i].idUsuario);
                oUsuarios.push(oUsuario);
            }

            let $row=tBody.insertRow(-1); 
            $row.insertCell(-1).textContent=g.id;
            $row.insertCell(-1).textContent=g.nombreGrupo;

            let oLista = document.createElement("ul");

            for(let i=0;i<oUsuarios.length;i++){
                let oElementoList = document.createElement("li");
                oElementoList.textContent = oUsuarios[i].usuario;
                oLista.appendChild(oElementoList);
            }

            $row.insertCell(-1).appendChild(oLista);

            //editar y eliminar
            let $editar=document.createElement("div");
            $editar.classList.add("fondo-editar");
            $editar.dataset.id=g.id;
            $editar.dataset.toggle="modal";
            $editar.dataset.target="#modalEditarGrupo";

            $row.insertCell(-1).appendChild($editar);

            let $eliminar=document.createElement("div");
            $eliminar.classList.add("fondo-eliminar");
            $eliminar.dataset.id=g.id;
            $row.insertCell(-1).appendChild($eliminar);
        }         

    }

    altaUsuarioGrupo(oGrupo,oListadoObjetosUsuario){

        for(let oU of oListadoObjetosUsuario){
            this._usuarioGrupos.push(new UsuarioGrupo(oU.usuario,oGrupo.id));
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
    constructor(sTitulo, sContenido)
    {
        if(Nota.contador==undefined){
            Nota.contador=1;
        }else{
            Nota.contador++;
        }

        this.id = Nota.contador;
        this.titulo = sTitulo;
        this.contenido = sContenido;
    }
}

class Grupo 
{
    constructor(sNombreGrupo)
    {
        if(Grupo.contador==undefined){
            Grupo.contador=1;
        }else{
            Grupo.contador++;
        }
        this.id=Grupo.contador;
        this.nombreGrupo = sNombreGrupo;
        this.notas = [];
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