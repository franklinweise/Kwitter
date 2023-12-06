//LINKS FIREBASE
const firebaseConfig = {
    apiKey: "AIzaSyCpaXPrzWFZYEmqLpNUGUS8IE0FwiXaQrg",
    authDomain: "aula-93-71eca.firebaseapp.com",
    databaseURL: "https://aula-93-71eca-default-rtdb.firebaseio.com",
    projectId: "aula-93-71eca",
    storageBucket: "aula-93-71eca.appspot.com",
    messagingSenderId: "173198951077",
    appId: "1:173198951077:web:d592b814fb33d534e2034c"
  };
  
  
  firebase.initializeApp(firebaseConfig);
  
  userName = localStorage.getItem("userName"); //pegar o nome do usuário do localStorage
  roomName = localStorage.getItem("roomName"); //pegar o nome da sala do LocalStorage
  
  function send() //função enviar
  {
    msg = document.getElementById("msg").value; //armazenando a mensagem a ser enviada nessa variável
    firebase.database().ref(roomName).push({ //aqui o nome, mensagem e like serão adicionados a pasta da sala que estamos mandando a mensagem
        nome:userName,
        message:msg,
        like:0
    });
  
    msg = ""; //ao enviar a mensagem limpamos o campo input para poder escrever uma nova mensagem
  }
  
  //Termina aqui
  
  function getData() {
    firebase.database().ref("/" + roomName).on('value', function (snapshot) {
      document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
        childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
          firebaseMessageId = childKey; //chave única para cada mensagem contendo o nome, mensagem e like
          messageData = childData;
          //Início do código
          console.log(firebaseMessageId);
          console.log(messageData);
          nome = messageData['nome'];
          message = messageData['message'];
          like = messageData['like'];
          nameWithTag = "<h4> " + nome + "<img class='user_tick' src='tick.png'></h4>";
          messageWithTag = "<h4 class='message_h4'>" + message + "</h4>";
          like_button = "<button class='btn btn-warning' id=" + firebaseMessageId + " value=" + like + " onclick='updateLike(this.id)'>";
          spanWithTag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";
  
          row = nameWithTag + messageWithTag + like_button + spanWithTag;
          document.getElementById("output").innerHTML += row;
          //Fim do código
        }
      });
    });
  }
  getData();
  
  function updateLike(messageId) {
    console.log("botão de like pressionado - " + messageId);
    buttonId = messageId;
    likes = document.getElementById(buttonId).value;
updatedLikes=Number(likes)+1   
    console.log(updatedLikes);
  
    firebase.database().ref(roomName).child(messageId).update({
like:updatedLikes     
    });
  }
  
  function logout() {
localStorage.removeItem("userName")
localStorage.removeItem("roomName")
window.location.replace("index.html")    
  }