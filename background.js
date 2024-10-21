chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "saveJson" && request.data) {
    chrome.fileSystem.chooseEntry(
      { type: "saveFile", suggestedName: "data.json" },
      (fileEntry) => {
        if (!fileEntry) {
          console.error("No file selected.");
          return;
        }

        const jsonString = JSON.stringify(request.data, null, 2);

        // Create a file writer
        fileEntry.createWriter(
          (fileWriter) => {
            const blob = new Blob([jsonString], { type: "application/json" });
            fileWriter.write(blob);
          },
          (error) => {
            console.error("Error writing file:", error);
          }
        );
      }
    );
  } else {
    console.error("Invalid message format:", request);
  }
});
