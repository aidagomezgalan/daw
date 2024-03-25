"use strict";

$(document).ready(function () {
  //Declaramos las variables globales para tamaños de fuente e imagen
  let pSize = 15;
  let h2Size = 24;
  let width = 150;
  //Añadimos el texto informativo con el tamaño por defecto de la fuente
  $("#font-info").text("Tamaño fuente: " + pSize + "px");

  //Botón aumenta fuente
  $("#size-plus").on("click", function () {
    // Establecemos el límite para el aumento del texto
    if (pSize < 18) {
      //Añadimos el párrafo del histórico al pulsar el botón
      $("#historico").append("<p>Aumenta fuente</p>");
      //Aumentamos tamaño de textos y lo acumulamos
      pSize += 1;
      h2Size += 1;
      //Actualizamos su valor en cada etiqueta correspondiente
      $("#font-info").text("Tamaño fuente: " + pSize + "px");
      $(".parrafo-notice").css("font-size", pSize + "px");
      $("h2").css("font-size", h2Size + "px");
      //Disminuimos el ancho de la imagen y lo acumulamos
      width -= 10;
      //Actualizamos su valor
      $(".img-notice").css("width", width + "px");
    }
  });
  //Botón disminuye fuente
  $("#size-minus").on("click", function () {
    //Establecemos el límite para la disminución del texto
    if (pSize > 14) {
      $("#historico").append("<p>Disminuye fuente</p>");
      pSize -= 1;
      h2Size -= 1;
      $("#font-info").text("Tamaño fuente: " + pSize + "px");
      $(".parrafo-notice").css("font-size", pSize + "px");
      $("h2").css("font-size", h2Size + "px");
      width += 10;
      $(".img-notice").css("width", width + "px");
    }
  });
  //Botón modo oscuro
  $("#dark").on("click", function () {
    $("#historico").append("<p>Modo oscuro</p>");
    //Añadimos la clase que pondrá el fondo del body en negro
    $("body").addClass("negro");
    //Añadimos la clase que pondrá los textos en amarillo
    $("#nombre-alumno, h2, .nav-notice a").addClass("amarillo");
    //Añadimos la clase que pondrá los textos en blanco
    $(".parrafo-notice, footer").addClass("blanco");
  });

  //Botón vista simplificada
  $("#wrap").on("click", function () {
    $("#historico").append("<p>Vista simplificada</p>");
    //Establecemos la animación de las noticias
    $(".notice").slideUp("slow");
  });

  //Selección fuente
  $("#select").on("change", function () {
    $("#historico").append("<p>Selección de fuente</p>");
    //Según el valor seleccionado cambiaremos la fuente de los textos
    if ($("#fuente").val() == "2") {
      $(".parrafo-notice").css("font-family", "Raleway");
      $("h2").css("font-family", "Raleway");
    } else if ($("#fuente").val() == "3") {
      $(".parrafo-notice").css("font-family", "Montserrat");
      $("h2").css("font-family", "Montserrat");
    } else {
      $(".parrafo-notice").css("font-family", "Arial");
      $("h2").css("font-family", "Arial");
    }
  });
  //Botón última hora
  $("#news").on("click", function () {
    $("#historico").append("<p>Última noticia</p>");
    //Guardamos en una variable el valor del atributo "class" de los "h2"
    let darkClass = $("h2").attr("class");
    //Ocultamos el botón de última hora
    $(this).hide();
    //Añadimos a la lista el botón de la nueva noticia en la primera posición
    $("ul").prepend(
      "<li id='btn-new-notice' class='nav-notice'><a href='#ultima-noticia'>Última noticia</a></li>"
    );
    //Quitamos la clase "pulsado" de todos los botones del menú navegación
    $(".nav-notice").removeClass("pulsado");
    //Añadimos la clase "pulsado" al botón de nueva noticia para destacar que se ha pulsado
    $("#btn-new-notice").addClass("pulsado");
    //Añadimos en el main la nueva noticia, en la primera posición
    $("main").prepend(
      "<article id='ultima-noticia'><h2>Última noticia</h2><div class='notice'><p class='parrafo-notice'></p><img class='img-notice' src='img/noticia3.jpg' /></div></article>"
    );
    //Añadimos al párrafo de la nueva noticia, el texto
    $("#ultima-noticia p").text(
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi similique veniam iure! Quia quis sunt corrupti? Ipsam blanditiis accusamus provident, esse eius voluptatem officia at ipsa tempora, quam quae assumenda. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque, perspiciatis repellendus, voluptate natus officia, nisi tempore ad cupiditate aspernatur a vero? Eaque iure, ratione itaque voluptates ab aliquid illo incidunt? Lorem ipsum dolor sit amet consectetur adipisicing elit."
    );
    //Actualizamos los tamaños de la nueva noticia a los actuales
    $("#ultima-noticia p").css("font-size", pSize + "px");
    $("#ultima-noticia h2").css("font-size", h2Size + "px");
    $("#ultima-noticia img").css("width", width + "px");
    //Ocultamos la noticia para mostrarla con una animación
    $("#ultima-noticia").hide().slideDown("slow");
    //Si el valor es "amarillo" es que se ha pulsado el modo oscuro antes de crear la noticia
    if (darkClass == "amarillo") {
      //Actualizamos los colores de la nueva noticia al modo oscuro
      $("#ultima-noticia h2, #btn-new-notice a").addClass("amarillo");
      $("#ultima-noticia p").addClass("blanco");
    }
  });

  //Botón reset
  $("#reset").on("click", function () {
    //Mostramos el botón de última hora
    $("#news").show();
    //Quitamos los párrafos de histórico
    $("#historico p").remove();
    //Establecemos el valor de select por defecto
    $("#fuente").val("1");
    //Cambiamos la tipografía a su valor por defecto
    $(".parrafo-notice").css("font-family", "Arial");
    $("h2").css("font-family", "Arial");
    //Quitamos las clases del modo oscuro
    $("body").removeClass("negro");
    $("#nombre-alumno, h2, .nav-notice a").removeClass("amarillo");
    $(".parrafo-notice, footer").removeClass("blanco");
    //Establecemos los tamaños por defecto y los actualizamos
    pSize = 15;
    $(".parrafo-notice").css("font-size", pSize + "px");
    $("#font-info").text("Tamaño fuente: " + pSize + "px");
    h2Size = 24;
    $("h2").css("font-size", h2Size + "px");
    width = 150;
    $(".img-notice").css("width", width + "px");
    //Mostramos las noticias con su animación
    $(".notice").slideDown("slow");
    //Quitamos la noticia de última hora y su botón
    $("#ultima-noticia").remove();
    $("#btn-new-notice").remove();
    //Quitamos la clase "pulsado" de los botones de navegación
    $(".nav-notice").removeClass("pulsado");
  });

  //Botón ocultar/mostar
  $("#hide").on("click", function () {
    //Recogemos en una variable el valor de la clase del botón ocultar/mostrar
    let btnClass = $("#hide i").attr("class");
    //Si el valor es el icono de ocultar es que la barra de accesibilidad está desplegada
    if (btnClass == "fa-solid fa-eye-slash") {
      //Quitamos la clase ocultar del icono del botón
      $("#hide i").removeClass("fa-eye-slash");
      //Añadimos la clase mostrar del iciono del botón
      $("#hide i").addClass("fa-eye");
      //Cambiamos el ancho de la barra de accesibilidad
      $("#accesibilidad").css("width", "10%");
      //Alineamos la barra a la izquierda
      $("#accesibilidad").css("left", "0");
      //Ocultamos el contenido de la barra de accesibilidad
      $("button, #select, #info span").hide();
      //Mostramos el botón de ocultar/mostrar
      $("#hide").show();
      //Si la barra está plegada
    } else {
      //Quitamos la clase de mostrar del icono del botón
      $("#hide i").removeClass("fa-eye");
      //Añadimos la clase de ocultar del icono del botón
      $("#hide i").addClass("fa-eye-slash");
      //Establecemos el ancho de la barra al que tenía por defecto
      $("#accesibilidad").css("width", "100%");
      //Mostramos el contenido de la barra de accesibilidad
      $("button, #select, #info span").show();
    }
  });

  //Boton navegación pulsado
  $(".nav-notice a").on("click", function () {
    //Quitamos la clase "pulsado" de los botones de navegación
    $(".nav-notice").removeClass("pulsado");
    //Añadimos la clase "pulsado" al botón de navegación que hemos pulsado
    $(this).parent().addClass("pulsado");
  });

  //Boton navegación última noticia pulsado
  //Recogemos el botón desde su padre, para verificar su creación
  $("nav").on("click", "#btn-new-notice", function () {
    //Quitamos la clase "pulsado" de los botones de navegación
    $(".nav-notice").removeClass("pulsado");
    //Añadimos la clase "pulsado" al botón de última noticia
    $(this).addClass("pulsado");
  });

  //Vista de noticias
  //Establecemos una animación cuando se pinche en cada artículo
  $("#noticia1").on("click", function () {
    $("#noticia1 .notice").slideToggle("slow");
  });
  $("#noticia2").on("click", function () {
    $("#noticia2 .notice").slideToggle("slow");
  });
  $("#noticia3").on("click", function () {
    $("#noticia3 .notice").slideToggle("slow");
  });
  //Al crearse la última noticia de manera dinámica,
  //tenemos que seleccionarla desde su padre para verificar su creación
  $("main").on("click", "#ultima-noticia", function () {
    $("#ultima-noticia .notice").slideToggle("slow");
  });
});
