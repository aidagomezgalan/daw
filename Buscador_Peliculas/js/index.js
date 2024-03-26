"use strict";
let data, idFilm, cookieLocal, claveCookieJSON;
let aFavoritas = [];

//Carga del DOM
$(function () {
  $(".popular").on("click", mostrarPopular);
  $(".hoy").on("click", mostrarHoy);
  $(".proximo").on("click", mostrarProximamente);
  $(".valorada").on("click", mostrarValoradas);
  $(".mostrFavoritos").on("click", mostrarFavoritos);
});

//----------------------------------------- CREACIÓN DE CARD Y MODAL ------------------------------------//

//Función para crear la card de una película
const filmCard = () => {
  let card = $(
    '<div class="card" style="width: 15em;"><img class="card-img-top" src=""><div class="card-body"><a href="#" class="card-link title"></a><br><p class="btn btn-primary"></p><p class="card-text"></p></div></div>'
  );
  $(card).css("margin", "5px");
  return card;
};

//Función para crear el body de la ventana modal de una película
const filmModalBody = () => {
  let modalBody = $(
    '<img class="card-img-top" src=""style="width: 10em;"><p id= "runtime" class="card-text">Duración:</p><div id="genres"></div><h4 class="card-title">Sinopsis</h4><p id="overview" class="card-text">Texto</p>'
  );
  return modalBody;
};

//Función para crear el footer de la ventana modal de una película
const filmModalFooter = () => {
  let modalFooter = $(
    '<button type="button" class="btn btn-danger">Añadir a favoritos</button><button type="button" class="btn btn-secondary">Cerrar</button>'
  );
  return modalFooter;
};

//----------------------------------------- MOSTRAR PELÍCULAS, MODAL Y MENSAJE ------------------------------------//

//Función para mostrar mensaje informativo
const infoMsg = (title) => {
  Swal.fire({
    icon: "info",
    title: title,
    showConfirmButton: false,
    position: "top-right",
    toast: true,
    timer: 2500,
  });
};

//Función para mostrar películas
const mostrarPeliculas = (data) => {
  //Vaciamos el contenedor de películas
  $("#resultado").empty();
  //Recorremos los datos recogidos de la API
  $(data).each((ind, ele) => {
    //Añadimos la card por cada película de data
    $("#resultado").append(filmCard);
    //Agregamos el título y el id de cada película a su card
    let titulos = $(".card a.title");
    $(titulos[ind]).html("<b>" + ele.title + "</b>");
    $(titulos[ind]).attr("id", ele.id);
    //Añadimos la imagen a cada card
    let caratulas = $(".card img");
    $(caratulas[ind]).attr(
      "src",
      "https://www.themoviedb.org/t/p/w220_and_h330_face/" + ele.poster_path
    );
    //Añadimos la valoración de cada película a su card
    let valoracion = $(".card p.btn-primary");
    //Mostramos con 1 decimal
    $(valoracion[ind]).text(ele.vote_average.toFixed(1));
    //Añadimos la fecha de cada película a su card
    let fechas = $(".card p.card-text");
    //Mostramos la fecha local
    let fechaLocal = new Date(ele.release_date).toLocaleDateString();
    $(fechas[ind]).html("<b>" + fechaLocal + "</b>");
  });
  //Añadimos el evento al título para mostrar el modal
  $(".card a.title").on("click", mostrarModal);
};

//Función para mostrar modal de película
const mostrarModal = async (e) => {
  //Vaciamos contenedores del contenido
  $("#staticBackdropLabel").empty();
  $(".modal-body").empty();
  $(".modal-footer").empty();
  //Asignamos la id de la card pulsado
  idFilm = $(e.target.parentElement).attr("id");
  //Recogemos la consulta de la película por su id
  try {
    const response = await axios(
      "https://api.themoviedb.org/3/movie/" +
        idFilm +
        "?api_key=221830c637ecf58a4e212fac1fb142f7&language=es-ES"
    );
    data = response.data;
    //Mostramos modal
    $("#modal").modal("show");
    //Recogemos el año de la película
    let yearMovie = new Date(data.release_date).getFullYear();
    //Agregamos el título, el año y la id
    $("#staticBackdropLabel")
      .html(data.title + "<br>" + "(" + yearMovie + ")")
      .attr("id-film", idFilm);
    //Añadimos el contenido del modal
    $(".modal-body").append(filmModalBody);
    //Añadimos la información de cada apartado del cuerpo con los datos recogidos de la API:
    //Añadimos la imagen para el modal
    $(".modal-body img").attr(
      "src",
      "https://www.themoviedb.org/t/p/w220_and_h330_face/" + data.poster_path
    );
    //Calculamos y mostramos la duración de la película en horas y minutos
    let horas = Math.floor(data.runtime / 60);
    let minutos = Math.floor(data.runtime - horas * 60);
    $(".modal-body #runtime").html(
      "<b>" + "Duración: " + horas + "h " + minutos + "m" + "</b>"
    );
    //Recorremos los géneros de la película y los vamos añadiendo en un <span>
    $(data.genres).each((ind, ele) => {
      $(".modal-body #genres").append('<span class="btn btn-primary"></span>');
      let generos = $("#genres span");
      $(generos[ind]).text(ele.name).css("margin", "2px");
    });
    //Añadimos la sinopsis de la película
    $(".modal-body #overview").html(data.overview);
    //Añadimos el contenido del footer
    $(".modal-footer").append(filmModalFooter);
    //Añadimos el evento al botón "cerrar" para ocultar el modal
    $(".modal-footer button.btn-secondary").on("click", () => {
      $("#modal").modal("hide");
    });
    //Recogemos la cookie
    getCookie();
    //Si la id coincide con la id de la película en la que estamos:
    if (aFavoritas.includes(idFilm)) {
      //Cambiamos el texto del botón
      $(".modal-footer button.btn-danger").text("Eliminar de favoritos");
      //Añadimos el evento al botón para eliminar la película
      $(".modal-footer button.btn-danger").on("click", eliminarFavoritos);
    } else {
      //Si no, cambiamos el texto del botón y añadimos el evento para añadir película
      $(".modal-footer button.btn-danger").text("Añadir a favoritos");
      $(".modal-footer button.btn-danger").on("click", anadirFavoritos);
    }
  } catch (error) {
    console.error(error);
  }
};

//----------------------------------------- COOKIES ------------------------------------//

//Función para crear cookie en localStorage desde objeto JSON
const CrearCookie = () => {
  //Creamos el objeto JSON
  let cookieJSON = {
    //El valor de id será un array, que se irá actualizando, con las id de las películas favoritas
    id: aFavoritas,
  };
  //Convertimos el JSON en un string para poder guardarlo en LocalStorage
  cookieJSON = JSON.stringify(cookieJSON);
  //Establecemos la cookie con key "Favoritas" y le pasamos el valor del objeto
  localStorage.setItem("Favoritas", cookieJSON);
};

//Función para obtener la cookie de localStorage
const getCookie = () => {
  //Recogemos la cookie de localStorage
  cookieLocal = localStorage.getItem(localStorage.key("Favoritas"));
  //Si no está creada la creamos y la volvemos a coger
  if (cookieLocal == null) {
    CrearCookie();
    cookieLocal = localStorage.getItem(localStorage.key("Favoritas"));
  }
  //La convertimos a JSON
  claveCookieJSON = JSON.parse(cookieLocal);
  //Actualizamos el array con las id de películas favoritas de localStorage
  aFavoritas = claveCookieJSON.id;
};

//----------------------------------------- AÑLADIR/ELIMINAR FAVORITOS ------------------------------------//

//Función para añadir película a favoritos
const anadirFavoritos = () => {
  //Recogemos la cookie
  getCookie();
  //Añadimos la id de la película al array
  aFavoritas.push(idFilm);
  //Actualizamos la cookie con el array:
  claveCookieJSON.id = aFavoritas;
  //Convertimos el JSON en un string para poder guardarlo en LocalStorage
  cookieLocal = JSON.stringify(claveCookieJSON);
  try {
    //Establecemos la cookie con key "Favoritas" y le pasamos el valor del objeto
    localStorage.setItem("Favoritas", cookieLocal);
    //Mostramos mensaje informativo
    let title = "Película añadida a favoritos";
    infoMsg(title);
    //Desactivamos el evento del botón para que no se añada la misma película
    $(".modal-footer button.btn-danger").off("click");
  } catch (error) {
    //Mostramos mensaje informativo
    let title = "No ha podido añadirse la película a favoritos";
    infoMsg(title);
  }
};

//Función para eliminar película a favoritos
const eliminarFavoritos = () => {
  //Recogemos la cookie
  getCookie();
  //Recorremos el array de favoritas
  aFavoritas.forEach((favorita) => {
    //Si la id del array coindice con le película en la que estamos, quitamos ese id del array por la posición en la que se encuentra
    if (favorita == idFilm) {
      aFavoritas.splice(aFavoritas.indexOf(favorita), 1);
    }
  });
  //Actualizamos la cookie:
  claveCookieJSON.id = aFavoritas;
  //Convertimos el JSON en un string para poder guardarlo en LocalStorage
  cookieLocal = JSON.stringify(claveCookieJSON);
  try {
    //Establecemos la cookie con key "Favoritas" y le pasamos el valor del objeto
    localStorage.setItem("Favoritas", cookieLocal);
    //Mostramos mensaje informativo
    let title = "Película eliminada de favoritos";
    infoMsg(title);
  } catch (error) {
    //Mostramos mensaje informativo
    let title = "No ha podido eliminarse la película de favoritos";
    infoMsg(title);
  }
};

//----------------------------------------- MENÚ ------------------------------------//

//Función para mostrar "mis favoritas"
const mostrarFavoritos = async () => {
  //Vaciamos la card
  $("#resultado").empty();
  //Recogemos la cookie
  getCookie();
  //Vaciamos los datos
  data = [];
  //Recorremos el array de favoritas y consultamos la API por cada id
  aFavoritas.forEach((favorita) => {
    $.ajax({
      url:
        "https://api.themoviedb.org/3/movie/" +
        favorita +
        "?api_key=221830c637ecf58a4e212fac1fb142f7&language=es-ES",
      type: "GET",
      dataType: "json",
    })
      .done(function (responseText) {
        //Vamos añadiendo los datos de esa id
        data.push(responseText);

        //Mostramos mensaje informativo
        let title = "Mostrando películas favoritas";
        infoMsg(title);
        //Ordenamos por título
        data.sort((a, b) => {
          return a.title.localeCompare(b.title);
        });
        //Mostramos películas
        mostrarPeliculas(data);
      })

      .fail(function (data, textStatus, xhr) {
        Swal.fire({
          icon: "error",
          title: "Error " + xhr.status,
          text: xhr.statusText,
        });
      });
  });
};

//Petición AJAX para mostrar las películas "populares" con FETCH
const mostrarPopular = async () => {
  //Hacemos consulta a la API de las películas
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=221830c637ecf58a4e212fac1fb142f7&language=es-ES&page=1"
    );
    //Guardamos los datos recogidos
    data = await response.json();
    //Guardamos el apartado de resultados de los datos para poder mostrar las películas
    let results = data.results;
    //Ordenamos descendentemente por popularidad
    results.sort((a, b) => {
      return b.popularity - a.popularity;
    });

    //Mostramos mensaje informativo
    let title = "Mostrando página 1 de " + data.total_pages + " páginas";
    infoMsg(title);

    //Mosramos las películas
    mostrarPeliculas(results);
  } catch (error) {
    console.error(error);
  }
};

//Petición AJAX para mostrar las películas "hoy" con XMLHttpRequest
const mostrarHoy = () => {
  //Creamos el objeto para la conexión con xmlHTMLRequest
  let xmlHttp = crearConexion();
  if (xmlHttp != undefined) {
    //Preparamos el objeto xmlHttp
    xmlHttp.open(
      "GET",
      "https://api.themoviedb.org/3/movie/now_playing?api_key=221830c637ecf58a4e212fac1fb142f7&language=es-ES&page=1",
      true
    );
    xmlHttp.onreadystatechange = () => {
      //Si llegue al último estado y el resultado sea satisfactorio recogemos los datos en un JSON
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        data = JSON.parse(xmlHttp.responseText);
        let results = data.results;
        //Ordenamos por título
        results.sort((a, b) => {
          return a.title.localeCompare(b.title);
        });

        //Mostramos mensaje informativo
        let title = "Mostrando página 1 de " + data.total_pages + " páginas";
        infoMsg(title);

        //Mostramos películas
        mostrarPeliculas(results);
      }
    };
    //Comienza la petición de respuesta al servidor
    xmlHttp.send();
  } else {
    Swal.fire("El navegador no soporta AJAX. Debe actualizar el navegador");
  }
};

//Petición AJAX para mostrar las películas "próximamente" con JQuery
const mostrarProximamente = () => {
  //Hacemos consulta a la API de las películas
  $.ajax({
    url: "https://api.themoviedb.org/3/movie/upcoming?api_key=221830c637ecf58a4e212fac1fb142f7&language=es-ES&page=1",
    type: "GET",
    dataType: "json",
  })
    .done(function (responseText) {
      //Si se han recogido los datos, los guardamos
      data = responseText;
      let results = data.results;
      //Ordenamos por fecha
      results.sort((a, b) => {
        return Date.parse(b.release_date) - Date.parse(a.release_date);
      });

      //Mostramos mensaje informativo
      let title = "Mostrando página 1 de " + data.total_pages + " páginas";
      infoMsg(title);

      //Mostramos películas
      mostrarPeliculas(results);
    })

    .fail(function (data, textStatus, xhr) {
      Swal.fire({
        icon: "error",
        title: "Error " + xhr.status,
        text: xhr.statusText,
      });
    });
};

//Petición AJAX para mostrar las películas "mejor valoradas" con AXIOS
const mostrarValoradas = async () => {
  //Hacemos consulta a la API de las películas
  try {
    const response = await axios(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=221830c637ecf58a4e212fac1fb142f7&language=es-ES&page=1"
    );
    //Guardamos los datos
    data = response.data;
    let results = data.results;
    //Ordenamos descendentemente por popularidad
    results.sort((a, b) => {
      return b.popularity - a.popularity;
    });

    //Mostramos mensaje informativo
    let title = "Mostrando página 1 de " + data.total_pages + " páginas";
    infoMsg(title);

    //Mostramos películas
    mostrarPeliculas(results);
  } catch (error) {
    console.error(error);
  }
};
