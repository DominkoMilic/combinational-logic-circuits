import CryptoJS from "crypto-js";
import { clearAllElements } from "./elementMenagement";
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const secretKey = "8/U3RDMEPaQ2wsqDQ08B8JbJMBpA12Xzsk3XGKYxVoQ=";
const savedDisplayElements = [];
const savedDisplayCables = [];

const getAllElementsFromDisplay = (allElements, allCables) => {
  savedDisplayElements.length = 0;
  savedDisplayCables.length = 0;
  savedDisplayElements.push(allElements);
  savedDisplayCables.push(allCables);
};

const saveFile = async (allElements, allCables) => {
  getAllElementsFromDisplay(allElements, allCables);

  const data = {
    elements: savedDisplayElements,
    cables: savedDisplayCables,
    timestamp: new Date().toISOString(),
  };

  const encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    secretKey
  ).toString();

  try {
    const fileHandle = await window.showSaveFilePicker({
      suggestedName: "logical-circuit.clc",
      types: [
        {
          description: "Custom Layout Config",
          accept: { "application/clc": [".clc"] },
        },
      ],
    });

    const writable = await fileHandle.createWritable();
    await writable.write(encryptedData);
    await writable.close();

    alert("File saved successfully!");
  } catch (error) {
    console.error("Error saving file:", error);
  }
};

const loadFile = async (
  setCables,
  setFunctions,
  setMenuVisible,
  setDeleteVisible,
  loadedFile
) => {
  try {
    let encryptedText;

    if (!loadedFile) {
      const [fileHandle] = await window.showOpenFilePicker({
        types: [
          {
            description: "Custom Layout Config",
            accept: { "application/clc": [".clc"] },
          },
        ],
      });

      const file = await fileHandle.getFile();
      encryptedText = await file.text();
    } else {
      const response = await fetch(loadedFile);
      if (!response.ok) throw new Error("Failed to fetch the file.");
      encryptedText = await response.text();
    }

    const decryptedBytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
    const decryptedData = JSON.parse(
      decryptedBytes.toString(CryptoJS.enc.Utf8)
    );

    if (
      decryptedData &&
      Array.isArray(decryptedData.elements) &&
      Array.isArray(decryptedData.cables)
    ) {
      savedDisplayElements.length = 0;
      savedDisplayCables.length = 0;

      savedDisplayElements.push(...decryptedData.elements);
      savedDisplayCables.push(...decryptedData.cables);

      clearAllElements(
        setCables,
        setFunctions,
        setMenuVisible,
        setDeleteVisible
      );

      await delay(500);

      setCables(savedDisplayCables[0]);

      setAllElementsFunction(setFunctions, savedDisplayElements);
    } else {
      throw new Error("Invalid data structure in decrypted file.");
    }
  } catch (error) {
    console.error("Error loading or decrypting file:", error);
  }
};

const setAllElementsFunction = (setFunctions, savedDisplayElements) => {
  Object.entries(savedDisplayElements[0]).forEach(([key, elements]) => {
    const functionName = `set${key.charAt(0).toUpperCase() + key.slice(1)}`;

    if (setFunctions[functionName]) {
      setFunctions[functionName](elements);
    } else {
      console.warn(`No function found for key: ${functionName}`);
    }
  });
};

export { saveFile, loadFile };
