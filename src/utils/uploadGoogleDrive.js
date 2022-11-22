require('dotenv').config();
const { google } = require('googleapis');
const fs = require('fs');

// oauth2 config
const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.REDIRECT_URI,
);
oAuth2Client.setCredentials({ refresh_token: process.env.DRIVE_REFRESH_TOKEN });

const uploadGoogleDrive = async (file) => {
  try {
    const drive = google.drive({
      version: 'v3',
      auth: oAuth2Client,
    });

    // upload to gd
    const response = await drive.files.create({
      requestBody: {
        name: file.filename,
        mimeType: file.mimetype,
        // parents: ['1yLZDBHqR2NyYoVi772ikSnhQ11I4Ssg7'],
      },
      media: {
        mimeType: file.mimetype,
        body: fs.createReadStream(file.path),
      },
    });

    // set permission
    await drive.permissions.create({
      fileId: response.data.id,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    // get gd link
    const result = await drive.files.get({
      fileId: response.data.id,
      fields: 'webViewLink, webContentLink',
    });

    return {
      id: response.data.id,
      gdLink: result.data.webViewLink,
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = uploadGoogleDrive;
