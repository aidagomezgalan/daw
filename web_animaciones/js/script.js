"use strict";

//Declaramos las variables globales
let elemento = document.getElementById("miCanvas");
let dibujo = elemento.getContext("2d");
let x = 120;

//Ejecutamos la función cuando se cargue el DOM
document.addEventListener("DOMContentLoaded", () => {
  dibujoCanvas();
});

//Función para dibujar con CANVAS
const dibujoCanvas = () => {
  //Dibujamos triángulo:
  dibujo.fillStyle = "rgb(239, 82, 82)"; //Color de relleno
  dibujo.beginPath(); //Inicio ruta
  dibujo.moveTo(30, 60); //Punto de inicio x,y
  dibujo.lineTo(120, 100); //Línea a coordenadas x=120 y=100
  dibujo.lineTo(30, 140); //Línea a coordenadas x=30 y=140
  dibujo.fill(); //Cierre y relleno de trazado

  //Función para dibujar el texto:
  const dibujoTexto = () => {
    dibujo.fillStyle = "rgb(249, 248, 244)"; //color
    dibujo.font = "39px Oswald"; //estilo fuente
    dibujo.textBaseline = "middle"; //alineación vertical
    //Creamos el texto en la posición indicada (x,y)
    dibujo.fillText("A  i  d  a   G  ó  m  e  z   G  a  l  á  n", 130, 100);
  };

  // Función para dibujar un rectángulo que hará de máscara, recibiendo la posición del eje x que se irá actualizando:
  const dibujoMascara = (x) => {
    dibujo.fillStyle = "rgb(59, 60, 61)";
    dibujo.fillRect(x, 50, 560, 70); //Rectángulo con una posición y un tamaño (x, y, ancho, alto)
  };

  //Creamos intervalo:
  //La máscara en forma de rectángulo irá redibujándose hacia la derecha mediante su modificación en el eje x.
  //Cada medio segundo se borrará y se creará una nueva en la posición dada dinámicamente por el eje x.
  //Mostrará cada vez una letra del texto tapando el resto.
  const intervalo = setInterval(() => {
    //Aumentamos la posición en el eje x del rectángulo cada medio segundo
    x += 40.5;
    //Borramos la máscara anterior en la posición x que se encuentre en ese momento, sin modificar su tamaño
    dibujo.clearRect(x, 50, 560, 70);
    //Dibujamos el texto
    dibujoTexto();
    //Dibujamos la máscara con la posición actualizada
    dibujoMascara(x);
    //Paramos el intervalo cuando llegue a una posición x en la que se muestre todo el texto
    if (x >= 700) {
      clearInterval(intervalo);
    }
  }, 500);
};
