const fs = require("fs-extra");
// Define the source and destination paths for the files you want to copy
const filesToCopy = ["package.json"];

const destinationDir = "dist";

// Loop through the files and copy them to the destination directory
filesToCopy.forEach((file) => {
  fs.copySync(file, `${destinationDir}/${file}`);
});
