// Make sure to include these imports:
require("dotenv").config();
const { GoogleAIFileManager } = require("@google/generative-ai/server");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = process.env.AI_STUDIO_API_KEY;

const fileManager = new GoogleAIFileManager(API_KEY);

// Upload a file to the AI Studio
async function uploadAndExtractContext({
  imagePath,
  mimeType,
  imageName,
  queryText,
}) {
  const uploadResult = await fileManager.uploadFile(imagePath, {
    mimeType: mimeType,
    displayName: imageName,
  });
  //   return uploadResult;
  // View the response.
  console.log(
    `Uploaded file ${uploadResult.file.displayName} as: ${uploadResult.file.uri}`
  );

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent([
    queryText,
    {
      fileData: {
        fileUri: uploadResult.file.uri,
        mimeType: uploadResult.file.mimeType,
      },
    },
  ]);
  return result.response.text();
}

module.exports = uploadAndExtractContext;
