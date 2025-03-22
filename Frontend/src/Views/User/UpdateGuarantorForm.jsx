// import React, { useState } from "react";

// const UpdateGuarantorForm = ({ onSubmit }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     position: "",
//     contact: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <div className="max-w-2xl bg-white rounded-lg p-6 shadow-lg">
//       <h2 className="text-xl font-semibold text-gray-800 mb-4">
//         Update Guarantor Details
//       </h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Name
//           </label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="mt-1 p-2 block w-full border rounded-lg shadow-sm focus:ring-green-600"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Position
//           </label>
//           <input
//             type="text"
//             name="position"
//             value={formData.position}
//             onChange={handleChange}
//             className="mt-1 p-2 block w-full border rounded-lg shadow-sm focus:ring-green-600"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Contact
//           </label>
//           <input
//             type="text"
//             name="contact"
//             value={formData.contact}
//             onChange={handleChange}
//             className="mt-1 p-2 block w-full border rounded-lg shadow-sm focus:ring-green-600"
//             required
//           />
//         </div>
//         <div className="flex space-x-4 mt-4">
//           <button
//             type="submit"
//             className="bg-[#28A745] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#218838]"
//           >
//             Save
//           </button>
//           <button
//             type="button"
//             onClick={() => onSubmit(null)}
//             className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700"
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UpdateGuarantorForm;



import React, { useState } from "react";

const UpdateGuarantorForm = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState(initialData || {
    name: "",
    position: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-2xl bg-white rounded-lg p-6 shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Update Guarantor Details
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border rounded-lg shadow-sm focus:ring-green-600"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Position
          </label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border rounded-lg shadow-sm focus:ring-green-600"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border rounded-lg shadow-sm focus:ring-green-600"
            required
          />
        </div>
        <div className="flex space-x-4 mt-4">
          <button
            type="submit"
            className="bg-[#28A745] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#218838]"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => onSubmit(null)}
            className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateGuarantorForm;

