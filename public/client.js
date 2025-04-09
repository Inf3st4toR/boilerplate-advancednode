/*global io*/
$(document).ready(function () {
  let socket = io();

  //Listen to user count
  socket.on("user count", function (data) {
    console.log("User Count: " + data);
  });

  // Form submittion with new message in field with id 'm'
  $("form").submit(function () {
    var messageToSend = $("#m").val();

    $("#m").val("");
    return false; // prevent form submit from refreshing page
  });
});
