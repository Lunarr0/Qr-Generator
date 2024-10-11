import qr from "qr-image";
import fs from "fs";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

//used because file part changes from sysytem to system 
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
    //const qrPath = __dirname + "/public/gen_qr_img.png";
    const qrPath = __dirname + "/gen_qr_img.png";
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




app.get("/", (req, res) => {    
  //res.sendFile(__dirname + "/public/index.html");
  res.sendFile(__dirname + "/index.html");

});


  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });







