import CryptoJS from "crypto-js";
import type { Cable, SetFunctions } from "../types";
import { clearAllElements } from "./elementManagement";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const secretKey = "8/U3RDMEPaQ2wsqDQ08B8JbJMBpA12Xzsk3XGKYxVoQ=";

export const saveFile = async (allElements: Record<string, unknown[]>, allCables: Cable[]) => {
  const data = {
    elements: [allElements],
    cables: [allCables],
    timestamp: new Date().toISOString(),
  };

  const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();

  try {
    const fileHandle = await (window as unknown as { showSaveFilePicker: (opts: unknown) => Promise<FileSystemFileHandle> }).showSaveFilePicker({
      suggestedName: "logical-circuit.clc",
      types: [{ description: "Custom Layout Config", accept: { "application/clc": [".clc"] } }],
    });
    const writable = await fileHandle.createWritable();
    await writable.write(encryptedData);
    await writable.close();
    alert("File saved successfully!");
  } catch (error) {
    console.error("Error saving file:", error);
  }
};

export const loadFile = async (
  setCables: React.Dispatch<React.SetStateAction<Cable[]>>,
  setFunctions: SetFunctions,
  setMenuVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setDeleteVisible: React.Dispatch<React.SetStateAction<boolean>>,
  loadedFile?: string | null
) => {
  try {
    let encryptedText: string;
    if (!loadedFile) {
      const [fileHandle] = await (window as unknown as { showOpenFilePicker: (opts: unknown) => Promise<FileSystemFileHandle[]> }).showOpenFilePicker({
        types: [{ description: "Custom Layout Config", accept: { "application/clc": [".clc"] } }],
      });
      const file = await fileHandle.getFile();
      encryptedText = await file.text();
    } else {
      const response = await fetch(loadedFile);
      if (!response.ok) throw new Error("Failed to fetch the file.");
      encryptedText = await response.text();
    }

    const decryptedBytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
    const decryptedData = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));

    if (decryptedData?.elements && decryptedData?.cables) {
      clearAllElements(setCables, setFunctions, setMenuVisible, setDeleteVisible);
      await delay(500);
      setCables(decryptedData.cables[0]);

      const elements = decryptedData.elements[0];
      Object.entries(elements).forEach(([key, value]) => {
        const funcName = `set${key.charAt(0).toUpperCase() + key.slice(1)}`;
        if (setFunctions[funcName]) {
          setFunctions[funcName](value as never[]);
        }
      });
    }
  } catch (error) {
    console.error("Error loading or decrypting file:", error);
  }
};
