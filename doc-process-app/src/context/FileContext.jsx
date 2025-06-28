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
    localStorage.setItem("uploadedFiles", JSON.stringify(uploadedFiles));
  }, [uploadedFiles]);

  const addFile = (file) => {
    const newFile = {
      name: file.name || "Untitled",
      type: file.type || "",
      status: "pending",
    };
    setUploadedFiles((prev) => [...prev, newFile]);
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
