import React from "react";
import pdfIcon from "../../assets/pdf_img.jpg";

const ViewDocuments = () => {
  const documents = [
    { name: "Signed Offer Letter.pdf", fileType: "PDF" },
    { name: "NYSC Certificate.pdf", fileType: "PDF" },
    { name: "Guarantor's Form.pdf", fileType: "PDF" },
    { name: "Degree Certificate.pdf", fileType: "PDF" },
    { name: "John Doe CV.pdf", fileType: "PDF" },
    { name: "Birth Certificate.pdf", fileType: "PDF" },
  ];

  const handleDownloadAll = () => {
    console.log("Downloading all documents as a zip file...");
    // Implement zip and download logic here
  };

  return (
      <div className="flex  bg-[#E3EDF9]">
        <div className="max-w-full bg-white p-4 flex-1">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Job Details / View Documents
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {documents.map((doc, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-4 border border-gray-300 rounded-lg bg-white"
              >
                <img
                  src={pdfIcon} 
                  alt="PDF Icon"
                  className="w-16 h-16 mb-2"
                />
                <p className="text-sm font-medium text-gray-700 text-center">
                  {doc.name}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={handleDownloadAll}
            className="bg-green-600 text-white px-6 py-3 mt-6 rounded-lg shadow-md hover:bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
          >
            Download ALL (Zip)
          </button>
        </div>
      </div>
  );
};

export default ViewDocuments;
