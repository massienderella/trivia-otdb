/*// inicio sesión con firebase
$(document).ready(function() {
  // para que siempre esté deslogeado
  firebase.auth().signOut();
  $('#start').hide();
  $('button').hide();
});
// Al hacer click en el boton de registro con google:
document.getElementById('btnsignUp').addEventListener('click', GoogleSignUp, false);
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
// función de ingreso con google
var token = 'none';
var user = 'none';
var email = 'none';
// guardar los usuarios que se registren
var userData = firebase.database().ref('users');
function GoogleSignUp() {
  if (!firebase.auth().currentUser) {
    // para saber si el usuario se ha conectado
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase.auth().signInWithPopup(provider).then(function(result) {
      token = result.credential.accessToken;
      user = result.user;
      email = user.email;
      $('.google-sign').hide() && $('#start').show();
      // guardar el nombre de usuario en firebase
      userData.orderByChild('email').equalTo(user.email).on('value', function(snapshot) {
        // console.log(snapshot.val());
        if (snapshot.val() === null) {
          // console.log('Nuevo Usuario');
          userData.push({
            photo: user.photoURL,
            name: user.displayName,
            email: user.email
          });
        } else {
          // console.log('Usuario Existente');
        }
      });
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var errorEmail = error.email;
      var credencial = error.credencial;
      // console.log(errorCode);
      if (errorCode === 'auth/account-exists-with-different-credential') {
        alert('Es el mismo usuario');
      }
    });
  } else {
    firebase.auth().signOut();
  }
} */


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
   let index = 0;
   let correct = 0;
   let correctAnswers = [];
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
      //Para la respuesta correcta
      if ($(this).text() === rightAnswer && index !== 10) {
        $('#start').text('Next question');
        $('#start').show();
        $('.questionBox').html('');
        $('.resultBox').append('<h1 class="message text-center">Well done!!</h1><img src="assets/img/perritofeliz.jpg" class="img-responsive text-center" alt="">');
        correct++;
        } if ($(this).text() !== rightAnswer && index !== 10) {
      //Para la respuesta incorrecta
        $('#start').text('Next question');
        $('#start').show();
        $('.questionBox').html('');
        $('.resultBox').append('<h1 class="message text-center">Wrong answer :(</h1> <img src="assets/img/perritotriste.jpg" class="img-responsive text-center" alt="">');
      }
      index++;
      if (index === 10) {
        $('.questionBox').html('');
            $('.title').text('Your results');
            $('.title').show();
            $('#start').hide();
            $('.resultBox').html(`You got ${countCorrect} out of ${counter}`);
            let answersDisplay = data.results.forEach(function(element) {
            $('.questionBox').append(`<p class="questionResults questionResultsQuestion">Question:</p> <p class="displayQuestionResult">${element.question}</p> <p class="questionResults">Correct answer:</p> <p class="correctAnswer">${element.correct_answer}</p>`); 
          });
      }
    });
      
    index++;
    console.log(index)
  }
});