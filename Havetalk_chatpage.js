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
room_name = localStorage.getItem("room_name");

function send(){
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name : user_name ,
        message : msg,
        like: 0
    });
    document.getElementById("msg").value="";
}
function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();

            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;

                console.log(firebase_message_id);
                console.log(message_data);
                Names = message_data["name"];
                Message = message_data["message"];
                Likes = message_data["like"];
                name_tag = "<h4>"+Names+"<img src='tick.png' class='user_tick'></h4>";
                message_tag = "<h4 class='message_h4'>"+Message+"</h4>";
                like_tag = "<button class='btn btn-success' id="+firebase_message_id+" value="+Likes+" onclick='updatelike(this.id)'>";
                span_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like:"+Likes+"</span></button><hr>";
                row = name_tag+message_tag+like_tag+span_tag;
                document.getElementById("output").innerHTML += row;
            }
        });
    });
}
getData();

function updatelike(message_id){
    console.log("clicked on like button-"+message_id);
    count_likes = document.getElementById(message_id).value;
    updated_likes = Number(count_likes) + 1;
    console.log(updated_likes);
    
    firebase.database().ref(room_name).child(message_id).update({
        like : updated_likes 
       });
}
function logout(){
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location.replace("index.html");
}