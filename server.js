import qr from "qr-image";
import fs from "fs";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
const port = 3000;

var userInput = "";

app.use(express.json());
app.use(express.static("public")); // Serve static files (like images)

app.use(bodyParser.urlencoded({ extended: true }));


app.post("/index", (req, res) => {
  const userInput = req.body["input"]; // Change to "input" to match client-side key
  
  if (!userInput || typeof userInput !== 'string') {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    // Generate the QR code and save as image
    const qr_svg = qr.image(userInput, { type: 'png' });
    const qrPath = __dirname + "/public/gen_qr_img.png";
    const stream = fs.createWriteStream(qrPath);

    qr_svg.pipe(stream);

    stream.on('finish', () => {
      // Send the image path back to the client once the file is written
      res.json({ imgPath: "/gen_qr_img.png" });
    });

    // Handle errors on the write stream
    stream.on('error', (error) => {
      console.error("Stream error:", error);
      res.status(500).json({ error: "Failed to generate QR code" });
    });

    // Optionally save input to a file
    fs.writeFile("url.txt", userInput, (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
      console.log(userInput);
    });

  } catch (error) {
    res.status(500).json({ error: "Failed to generate QR code" });
  }
});



// app.post("/index", (req, res) => {
//     const userInput = req.body["input"]; // Change to "input" to match client-side key
    
//     if (!userInput || typeof userInput !== 'string') {
//       return res.status(400).json({ error: "Invalid input" });
//     }
  
//     try {
//       // Generate the QR code and save as image
//       const qr_svg = qr.image(userInput, { type: 'png' });
//       const qrPath = __dirname + "/public/gen_qr_img.png";
//      // qr_svg.pipe(fs.createWriteStream(qrPath));

//       const stream = fs.createWriteStream(qrPath);

//       qr_svg.pipe(stream);

//       stream.on('finish', () => {
//         // Send the image path back to the client once the file is written
//         res.json({ imgPath: "/gen_qr_img.png" });
//     });

//     // Handle errors on the write stream
//     stream.on('error', (error) => {
//         console.error("Stream error:", error);
//         res.status(500).json({ error: "Failed to generate QR code" });
//     });
  
//       // Save input to a file (optional)
//       fs.writeFile("url.txt", userInput, (err) => {
//         if (err) throw err;
//         console.log("The file has been saved!");
//         console.log(userInput);
//       });
  
//       // Send the path of the generated QR code back to the client
//       res.json({ imgPath: "/gen_qr_img.png" });
//        } catch (error) {
//       res.status(500).json({ error: "Failed to generate QR code" });
//        }
//   });





// function generateQR(req, res, next) {
//     userInput = req.body["input"];
    
//   //   var qr_svg = qr.image(userInput);
//   //   qr_svg.pipe(fs.createWriteStream("gen_qr_img.png"));
//   // fs.writeFile("Url.txt", userInput, (err) => {
//   //       if (err) throw err;
//   //       console.log("The file has been saved!");
//   //     });

//       next();
  
//       //$("img").attr("src", "gen_qr_img.png");
//   }

//   app.use(generateQR);



app.get("/", (req, res) => {    
  res.sendFile(__dirname + "/public/index.html");

});

//  app.post("/submit", (req, res) => {
  //  res.send(`<h1>Your link is:</h1><h2>${userInput}✌️</h2>`);
   
//  })
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });






// import qr from "qr-image";
// import fs from "fs";
// import express from "express";
// import { dirname } from "path";
// import { fileURLToPath } from "url";

// const __dirname = dirname(fileURLToPath(import.meta.url));

// const app = express();
// const port = 3000;

// app.use(express.json());
// app.use(express.static("public")); // Serve static files (like images)

// app.post("/index", (req, res) => {
//     const userInput = req.body.input; // Access input from the request body

//     if (!userInput || typeof userInput !== 'string') {
//         return res.status(400).json({ error: "Invalid input" });
//     }

//     // Define the path for the generated QR code image
//     const qrPath = __dirname + "/public/gen_qr_img.png";

//     // Create a QR code and pipe it to the file stream
//     const qr_svg = qr.image(userInput, { type: 'png' });
//     const stream = fs.createWriteStream(qrPath);

//     // Handle the finish event of the write stream
//     stream.on('finish', () => {
//         // Send the image path back to the client once the file is written
//         res.json({ imgPath: "/gen_qr_img.png" });
//     });

//     // Handle errors on the write stream
//     stream.on('error', (error) => {
//         console.error("Stream error:", error);
//         res.status(500).json({ error: "Failed to generate QR code" });
//     });

//     // Pipe the QR code image to the stream
//     qr_svg.pipe(stream);
// });

// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/public/index.html");
// });

// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });
