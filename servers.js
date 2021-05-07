var firebaseConfig = {
      apiKey: "AIzaSyDij2tygu7JJ7hlK3MCSlF5TJhxDko-H60",
      authDomain: "kwitter-aac8e.firebaseapp.com",
      databaseURL: "https://kwitter-aac8e-default-rtdb.firebaseio.com",
      projectId: "kwitter-aac8e",
      storageBucket: "kwitter-aac8e.appspot.com",
      messagingSenderId: "425820892841",
      appId: "1:425820892841:web:6c76dc8cbac4712db183b8"
    };

    firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "Welcome" + user_name + "!!!";

function addRoom() {
      room_name = document.getElementById("room_name").value;

      firebase.database().ref("/").child(room_name).update({
            purpose: "adding room name"
      });
      localStorage.setItem("room_name", room_name);
      window.location = "Havetalk_chatpage.html"
}

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;

                  console.log("Room Name - " + Room_names);
                  row = "<div class='room_name' id=" + Room_names + " onclick = 'redirecttoRoom(this.id)'>#" + Room_names + "</div> <hr>";
                  document.getElementById("output").innerHTML += row;
            });
      });
}
getData();

function redirecttoRoom(name) {
      console.log(name);
      localStorage.setItem("room_name", name);
      window.location = "Havetalk_chatpage.html";
}
function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location.replace("index.html");
}