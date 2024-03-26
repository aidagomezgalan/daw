"use strict"

const crearConexion=()=>{
    let objeto;
    if (window.XMLHttpRequest){ //Averigua si el navegador soporta XMLHttpRequest
        objeto=new XMLHttpRequest();
    }else if (window.ActiveXObject){ //Averigua si el navegador es IE
        try{
            objeto=new ActiveXObject("MSXML2.XMLHTTP");
        }catch(e){
             objeto=new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
    return objeto;
}