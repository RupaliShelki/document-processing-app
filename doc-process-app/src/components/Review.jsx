import { useContext, useState } from "react";
import { FileContext } from "../context/FileContext";
import { LuView } from "react-icons/lu";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { IoCloseSharp } from "react-icons/io5";

// import { useState } from "react";

function Review() {
  const { uploadedFiles, markCompleted } = useContext(FileContext);
  const [previewFile, setPreviewFile] = useState(null);

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div className="w-[60vw] max-w-xl mx-auto bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center flex gap-4 items-center justify-center ">
          Review Files <LuView />
        </h2>

        {uploadedFiles.length === 0 ? (
          <p className="text-center text-gray-600">No files uploaded yet.</p>
        ) : (
          <ul className="space-y-4 list-disc  list-inside">
            {uploadedFiles.map((file, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b pb-2 gap-2"
              >
                <span className="text-gray-800 w-1/2 overflow-hidden text-ellipsis whitespace-nowrap">
                  {file.name}
                </span>

                <div className="flex gap-2 w-[14rem] justify-between ">
                  <button
                    onClick={() => setPreviewFile(file)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm cursor-pointer"
                  >
                    Preview
                  </button>

                  {file.status === "completed" ? (
                    <span className="text-green-600 font-medium">
                      Completed
                    </span>
                  ) : (
                    <button
                      onClick={() => markCompleted(index)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm cursor-pointer"
                    >
                      Mark as Completed
                    </button>
                  )}
                </div>
              </li>
            ))}

            {previewFile && (
              <div className="mt-6 border rounded shadow p-4">
                <h4 className="font-semibold mb-2">
                  Previewing: {previewFile.name}
                </h4>
                <div className="w-full h-[500px] overflow-hidden border">
                  <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                    <Viewer fileUrl={previewFile.base64} />
                  </Worker>
                </div>
              </div>
            )}
          </ul>
        )}
        {previewFile && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-30 backdrop-blur-sm">
            <div className="bg-white rounded shadow-lg p-4 w-[90%] max-w-4xl h-[90%] relative">
              <IoCloseSharp
                onClick={() => setPreviewFile(null)}
                className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl cursor-pointer"
              />

              <h4 className="text-lg font-semibold mb-4 text-center">
                Previewing: {previewFile.name}
              </h4>

              <div className="w-full h-[93%] overflow-hidden border">
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                  <Viewer fileUrl={previewFile.base64} />
                </Worker>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Review;
