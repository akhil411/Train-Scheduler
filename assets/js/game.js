

$(document).ready(function(){
  // instructions();
  // close();
  var userData = {
    name: "",
    destination: "",
    firstTime: "",
    frequency:""
  }
  var config = {
    apiKey: "AIzaSyCDBnvcZxyADlpnsiEtwnx58trOy_qwwu8",
    authDomain: "click-counter-f1874.firebaseapp.com",
    databaseURL: "https://click-counter-f1874.firebaseio.com",
    projectId: "click-counter-f1874",
    storageBucket: "click-counter-f1874.appspot.com",
    messagingSenderId: "943978141878",
    appId: "1:943978141878:web:f1a611a4916867ffec6e17"
  };
  firebase.initializeApp(config);

  var traindata = firebase.database();

  var id = $('.table tr:last').attr('id');
  console.log(id);
  
  
  $("#submitForm").on("click", function(event) {
    var num = $('table tr:last').attr('id');
    event.preventDefault();
    name = $("#nameInput").val();
    destination = $("#destinationInput").val();
    firstTime = $("#firstTimeInput").val();
    frequency = $("#frequencyInput").val();
    $("#nameInput").val("");
    $("#destinationInput").val("");
    $("#firstTimeInput").val("");
    $("#frequencyInput").val("");
    num++;
    traindata.ref().push({
      id:num,
      name :name,
      destination :destination,
      firstTime :firstTime,
      frequency: frequency,
    });
  });

  traindata.ref().on("child_added", function(snapshot) {
    var newRow = "<tr id="+ snapshot.val().id + "><td>" + snapshot.val().name+ "</td>" + 
                  "<td>" + snapshot.val().destination+ "</td>" + 
                  "<td>" + snapshot.val().frequency + "</td>" + 
                  "<td class='update-time" + snapshot.val().id + "'>" + "" + "</td>" +
                  "<td class='update-minutes" + snapshot.val().id + "'>" + "" + "</td></tr>";
    
    $(".table tr:last").after(newRow);
  });

  

  setInterval(function() {
      traindata.ref().on("child_added", function(snapshot) {
      var inputTime = moment(snapshot.val().firstTime, 'HH:mm');
      var newTime = inputTime.toDate();
      var differMinute = moment().diff(newTime, 'minutes');
      var freq = snapshot.val().frequency;
      var minutesAway = freq - (differMinute % freq);
      var display = moment().format("HH:mm:ss");
      var time = moment().add(minutesAway, 'minutes');
      var displayTime = moment(time).format("HH:mm");

      
      $(".update-time" + snapshot.val().id).text(displayTime);
      $(".update-minutes" + snapshot.val().id).text(minutesAway);
      $("#currentTime").text(display);
    });
    }, 1000);



});

// function instructions()
// {
//    $("#instructions" ).on("click", function() {
//        $("#modalInstructions").css("display", "block");
//      });
// }

// function close()
// {
//    $(".close" ).on("click", function() {
//        $("#modalInstructions").css("display", "none");
//      });
// }