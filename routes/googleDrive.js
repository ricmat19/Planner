// const express = require("express");
// const router = express.Router();
// const { google } = require("googleapis");

// const clientId = process.env.GOOGLE_API_CLIENT_ID;
// const clientSecret = process.env.GOOGLE_API_CLIENT_SECRET;
// const redirectURI = process.env.GOOGLE_API_REDIRECT_URI;
// const refreshToken = process.env.GOOGLE_API_REFRESH_TOKEN;

// const oAuth2Client = new google.auth.OAuth2(
//   clientId,
//   clientSecret,
//   redirectURI
// );
// oAuth2Client.setCredentials({ refresh_token: refreshToken });

// router.get("/files", async (req, res) => {
//   const drive = google.drive({ version: "v3", auth: oAuth2Client });

//   let files = {};
//   try {
//     await drive.files.list({}, (err, response) => {
//       if (err) return console.log("The API returned an error: " + err);
//       files = response.data.files;
//       if (files.length) {
//         console.log(files);
//       } else {
//         console.log("No files found.");
//       }
//       res.status(200).json({
//         status: "success",
//         results: files.length,
//         data: {
//           files: files,
//         },
//       });
//     });
//   } catch (err) {
//     console.log(err);
//   }
// });

// module.exports = router;
