import  { useCallback, useContext, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { FileContext } from "../context/FileContext";
import { LuUpload } from "react-icons/lu";

function Upload() {
  const { uploadedFiles, addFile } = useContext(FileContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setFileUrl(URL.createObjectURL(file));
    } else {
      alert("Please upload a valid PDF file.");
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
  });

  const handleUpload = () => {
    if (selectedFile) {
      addFile(selectedFile); // Add to global list
      setSelectedFile(null);
      setFileUrl(null);
    } else {
      alert("No file selected");
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center px-4 bg-gray-100 gap-6 pt-12">
      <div className="w-full max-w-xl bg-white p-6 rounded shadow-md border-2 border-dashed border-blue-300 hover:border-blue-500 transition-all duration-200">
        {/* Upload box */}
        <div {...getRootProps()}>
          <h2 className="text-xl font-semibold mb-4 text-center flex gap-4 items-center justify-center ">
            Upload PDF <LuUpload />
          </h2>
          <p className="text-center text-sm text-gray-500 mb-2">
            Drag and drop a PDF file here or click to select
          </p>
          <input {...getInputProps()} />
          {selectedFile && (
            <p className="text-sm text-blue-600 mt-2 text-center overflow-hidden text-ellipsis whitespace-nowrap">
              Selected: {selectedFile.name}
            </p>
          )}
        </div>
        {/* upload button */}
        <button
          onClick={handleUpload}
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Upload
        </button>
      </div>

      {/* PDF Preview */}
      {fileUrl && (
        <div className="w-full max-w-3xl h-[500px] border shadow-md rounded overflow-hidden">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Viewer fileUrl={fileUrl} />
          </Worker>
        </div>
      )}

      {/* Uploaded Files */}
      <div className="w-full max-w-xl bg-white p-4 rounded shadow-md">
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
