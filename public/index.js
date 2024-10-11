// $(document).ready(function () {
//     $("#btn").click(function () {
//       var userInput = $("#user-input").val();
  
//       $.ajax({
//         url: "/generateQR",
//         type: "POST",
//         contentType: "application/json",
//         data: JSON.stringify({ input: userInput }), // Make sure the key is "input" to match the server
//         success: function (response) {
//           $("#qr-image").attr("src", response.imgPath); // Update image source with QR code path
//         },
//         error: function () {
//           alert("Error generating QR code");
//         }
//       });
//     });
//   });
  

// $(document).ready(function () {
//   $("#btn").click(function () {
//       var userInput = $("#user-input").val();

//       console.log(userInput);
      
//       $.ajax({
//           url: "/index", // Ensure this URL matches your server route
//           type: "POST",
//           contentType: "application/json",
//           data: JSON.stringify({ input: userInput }), // Ensure the key is "input"
//           success: function (response) {
//               $("#qr-image").attr("src", response["imgPath"]); // Update image source with QR code path
//           },
//           error: function () {
//               alert("Error generating QR code");
//           }
//       });
//   });
// });


$(document).ready(function () {
  $("#btn").click(function () {

    //get the user input
      var userInput = $("#user-input").val();

      console.log(userInput); // Log input

      $.ajax({
          url: "/index", // Ensure this URL matches your server route
          type: "POST",
          contentType: "application/json",
          data: JSON.stringify({ input: userInput }), // Ensure the key is "input"
          success: function (response) {
              console.log("Response received:", response); // Log the response
              $("#qr-image").attr("src", response.imgPath); // Update image source with QR code path
          },
          error: function () {
              alert("Error generating QR code");
          }
      });
  });
});
