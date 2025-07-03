import { createContext, useState, useEffect } from "react";

export const FileContext = createContext();

export function FileProvider({ children }) {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    const storedFiles = localStorage.getItem("uploadedFiles");
    if (storedFiles) {
      try {
        const parsed = JSON.parse(storedFiles);
        if (Array.isArray(parsed)) {
          setUploadedFiles(parsed);
        }
      } catch (e) {
        console.error("Failed to parse stored files:", e);
      }
    }
  }, []);

  useEffect(() => {

    if(uploadedFiles.length>0){
    localStorage.setItem("uploadedFiles", JSON.stringify(uploadedFiles));

    }
  }, [uploadedFiles]);



  const addFile = (file) => {
  const reader = new FileReader();
  reader.onload = () => {
    const base64 = reader.result;

    const newFile = {
      name: file.name || "Untitled",
      type: file.type || "",
      status: "pending",
      base64, 
    };

    setUploadedFiles((prev) => [...prev, newFile]);
  };

  reader.readAsDataURL(file); 
};


  const markCompleted = (index) => {
    setUploadedFiles((prev) =>
      prev.map((f, i) => (i === index ? { ...f, status: "completed" } : f))
    );
  };

  return (
    <FileContext.Provider value={{ uploadedFiles, addFile, markCompleted }}>
      {children}
    </FileContext.Provider>
  );
}
