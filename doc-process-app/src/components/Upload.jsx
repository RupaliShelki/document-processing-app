import { useState, useContext, useRef } from "react";
import { FileContext } from "../context/FileContext";

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const { uploadedFiles, addFile } = useContext(FileContext);
  const inputRef = useRef(null);

  
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type === "application/pdf") {
      setSelectedFile(selected);
    } else {
      alert("Please select a PDF file");
      setSelectedFile(null);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      addFile(selectedFile); 
      setSelectedFile(null);
      if (inputRef.current) inputRef.current.value = null;
    } else {
      alert("No file selected");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setSelectedFile(droppedFile);
      if (inputRef.current) inputRef.current.value = null;
    } else {
      alert("Please drop a valid PDF file");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault(); 
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center px-4 bg-gray-100">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="w-full max-w-xl bg-white p-6 rounded shadow-md border-2 border-dashed border-blue-300 hover:border-blue-500 transition-all duration-200"
      >
        <h2 className="text-xl font-semibold mb-6 text-center">Upload PDF</h2>

        <p className="text-center text-sm text-gray-500 mb-2">
          Drag and drop a PDF file here or choose manually.
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
          <input
            type="file"
            accept=".pdf"
            ref={inputRef}
            onChange={handleFileChange}
            className="file:bg-blue-500 file:text-white file:px-4 file:py-2 file:rounded file:border-0 file:cursor-pointer file:hover:bg-blue-600 w-full sm:w-auto"
          />
          <button
            onClick={handleUpload}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto"
          >
            Upload
          </button>
        </div>

        {selectedFile && (
          <p className="text-sm text-blue-600 mb-4 text-center overflow-hidden text-ellipsis whitespace-nowrap">
            Selected: {selectedFile.name}
          </p>
        )}

        <h3 className="font-semibold mb-2">Uploaded Files:</h3>
        <ul className="list-disc list-inside text-sm text-gray-700 max-h-40 overflow-auto">
          {uploadedFiles.map((file, index) => (
            <li
              key={index}
              className="overflow-hidden text-ellipsis whitespace-nowrap"
            >
              {file.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Upload;
