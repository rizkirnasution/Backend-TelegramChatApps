require('dotenv').config();
const { google } = require('googleapis');

// oauth2 config
const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.REDIRECT_URI,
);
oAuth2Client.setCredentials({ refresh_token: process.env.DRIVE_REFRESH_TOKEN });

const deleteGoogleDrive = async (id) => {
  try {
    const drive = google.drive({
      version: 'v3',
      auth: oAuth2Client,
    });

    const response = await drive.files.delete({
      fileId: id,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

module.exports = deleteGoogleDrive;
