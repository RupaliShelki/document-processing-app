import { useContext } from "react";
import { FileContext } from "../context/FileContext";
import { MdDownloadDone } from "react-icons/md";


function Completed() {
  const { uploadedFiles } = useContext(FileContext);

  const completedFiles = uploadedFiles.filter(
    (file) => file.status === "completed"
  );

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div className=" w-[60vw] max-w-xl mx-auto bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center flex gap-4 items-center justify-center">
          Completed Files <MdDownloadDone />

        </h2>

        {completedFiles.length === 0 ? (
          <p className="text-center text-gray-600">No completed files yet.</p>
        ) : (
          <ul className="list-decimal list-inside pl-5 text-sm text-gray-700 space-y-2">
            {completedFiles.map((file, index) => (
              <li key={index} className="text-green-700 font-medium overflow-hidden text-ellipsis whitespace-nowrap">
                {file.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Completed;
