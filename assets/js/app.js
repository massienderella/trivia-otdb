//AUTENTICACIÓN CON FIREBASE

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA9kHhoH3jqulXjnO3I3zMYu64lkV_9dUs",
    authDomain: "trivia-69c2b.firebaseapp.com",
    databaseURL: "https://trivia-69c2b.firebaseio.com",
    projectId: "trivia-69c2b",
    storageBucket: "trivia-69c2b.appspot.com",
    messagingSenderId: "489651669941"
  };
  firebase.initializeApp(config);

  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});




//TRABAJO CON API

// Inicializar API + obtener JSON con información
$(document).ready(() =>{
  $('#start').on('click', function(enter) {
    $.ajax({
      url: 'https://opentdb.com/api.php?amount=10&category=27&type=multiple',
      type: 'GET',
      datatype: 'json'
    })
      .done(function(response) {
        console.log(response);
        showInfo(response);
      })
      .fail(function() {
        console.log('error en conexión a API');
      });
  });


 // Extraer información desde JSON y crear elementos para mostrarla en pantalla 
function showInfo(info) {
   let index = 0
   let category = info.results[index].category;    
   let difficulty = info.results[index].difficulty;    
   let questions = info.results[index].question;
   let rightAnswer = info.results[index].correct_answer;
   let wrongAnswer1 = info.results[index].incorrect_answers['0'];
   let wrongAnswer2 = info.results[index].incorrect_answers['1'];
   let wrongAnswer3 = info.results[index].incorrect_answers['2'];
    

//Array con posibles respuestas
   let answers = [];
   answers.push(rightAnswer);
   answers.push(wrongAnswer1);
   answers.push(wrongAnswer2);
   answers.push(wrongAnswer3);
// .sort() ordena strings dependiendo de su valor unicode
   answers.sort();
   console.log(answers);

//Texto a mostrar (categoría + dificultad + pregunta + )
   $('.questionBox').append('<h4 class="category text-center">' + 'Category: ' + category + '</h4>');
   $('.questionBox').append('<h4 class="difficulty text-capitalize text-center">' + 'Difficulty: ' + difficulty + '</h4>');
   $('.questionBox').append('<div class="row text-center"><div class="col-lg-12"><h2 class="question text-center">' + questions + '</h2>');

//.forEach(), para que agregue cada elemento sobre el que itera a .answerBox   
   let answerBox = answers.forEach(function(ans) {
    $('.questionBox').append(`<div class="row text-center"><div class="col-lg-12 answerButton"><button type="button" class="btn btn-primary answer text-center option">${ans}</a>`);
   });

    $('#start').hide();
    $('.option').on('click', function() {
      if ($(this) === rightAnswer) {
        $('#start').text('Next question');
        $('#start').show();
        $('.questionBox').empty();
        $('.questionBox').append('<h1 class="message">Well done!!</h1><img src="assets/img/perritofeliz.jpg" alt="">');
        } else {
        $('#start').text('Next question');
        $('#start').show();
        $('.questionBox').empty('');
        $('.questionBox').append('<h1 class="message">Wrong answer, try again!</h1> <img src="assets/img/perritotriste.jpg" alt="">');
      }
    });
      
    index++;
    console.log(index)
  }
});