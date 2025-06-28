import { useContext } from "react";
import { FileContext } from "../context/FileContext";

function Review() {
  const { uploadedFiles, markCompleted } = useContext(FileContext);

  return (
    <div  className="w-full h-[100vh] flex justify-center items-center">
      <div className="w-[60vw] max-w-xl mx-auto bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Review Files</h2>

        {uploadedFiles.length === 0 ? (
          <p className="text-center text-gray-600">No files uploaded yet.</p>
        ) : (
          <ul className="space-y-4 list-disc  list-inside">
            {uploadedFiles.map((file, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b pb-2"
              >
                <span className="text-gray-800 w-1/2 overflow-hidden text-ellipsis whitespace-nowrap">{file.name}</span>

                {file.status === "completed" ? (
                  <span className="text-green-600 font-medium">Completed</span>
                ) : (
                  <button
                    onClick={() => markCompleted(index)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Mark as Completed
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Review;
