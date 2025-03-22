
import { motion } from "framer-motion";
import { Users, Briefcase, CheckCircle, CloudUpload } from "lucide-react";
import Navbar from "./Usernavbar";

const AboutPage = () => {
  const gallery = [
    "https://images.pexels.com/photos/7581110/pexels-photo-7581110.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/4307853/pexels-photo-4307853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/7581007/pexels-photo-7581007.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/7580752/pexels-photo-7580752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/7581119/pexels-photo-7581119.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/7580804/pexels-photo-7580804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  ];
  return (
    <div
      className="relative bg-cover bg-center min-h-screen"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-photo/office-skyscrapers-business-district_107420-95733.jpg')",
      }}
    >
    {/* <Navbar/> */}
      {/* Hero Section */}
      <div className="bg-black bg-opacity-50 py-20 text-white text-center">
        <h1 className="text-5xl font-bold">
          Welcome to Kris Software Consultancy
        </h1>
        <p className="text-lg mt-4">
          Empowering businesses with innovative software solutions.
        </p>
      </div>

      {/* About Section */}
      <div className="container mx-auto py-20 px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="bg-white p-8 rounded-xl shadow-lg"
        >
          <h2 className="text-4xl font-bold mb-4">Who We Are</h2>
          <p className="text-gray-700 leading-relaxed">
            At Kris Software Consultancy, we specialize in delivering
            state-of-the-art software solutions, ensuring our clients stay ahead
            in their industry. With a team of dedicated experts, we offer
            personalized consulting, development, and support services tailored
            to your needs.
          </p>
        </motion.div>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="bg-gray-100 p-8 rounded-xl shadow-lg flex flex-col items-center"
        >
          <Users size={48} className="text-blue-500" />
          <h3 className="text-2xl font-semibold mt-4">Expert Team</h3>
          <p className="text-gray-600 text-center">
            A passionate team of experienced professionals ready to tackle any
            challenge.
          </p>
        </motion.div>
      </div>

      {/* Services Section */}
      <div className="container mx-auto py-20 px-6 text-center">
        <h2 className="text-4xl font-bold mb-10">Our Core Services</h2>
        <div className="flex flex-wrap justify-center gap-10">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-lg shadow-lg w-80"
          >
            <Briefcase size={48} className="text-blue-500 mx-auto" />
            <h3 className="text-xl font-semibold mt-4">Business Consulting</h3>
            <p className="text-gray-600">
              Providing strategic solutions to boost business efficiency and
              growth.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-lg shadow-lg w-80"
          >
            <CheckCircle size={48} className="text-green-500 mx-auto" />
            <h3 className="text-xl font-semibold mt-4">Software Development</h3>
            <p className="text-gray-600">
              Custom software solutions tailored to your business needs.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-lg shadow-lg w-80"
          >
            <CloudUpload size={48} className="text-purple-500 mx-auto" />
            <h3 className="text-xl font-semibold mt-4">Cloud Solutions</h3>
            <p className="text-gray-600">
              Scalable cloud-based solutions for your growing business needs.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Projects Done Section */}
      <div className="container mx-auto py-20 px-6 text-center">
        <h2 className="text-4xl font-bold mb-10">Projects We've Completed</h2>
        <div className="flex flex-wrap justify-center gap-10">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-lg shadow-lg w-80"
          >
            <img
              src="https://img.freepik.com/free-vector/online-shopping-concept-with-phone_23-2148714485.jpg?t=st=1740507042~exp=1740510642~hmac=33ad114c5f16ded21e95caeb2d7ca0136a13fd6d54e59464bcbe2b59f62dd5c6&w=1380"
              alt="Project 1"
              className="rounded-lg mb-4 w-full h-48 object-cover"
            />
            <h3 className="text-xl font-semibold mt-2">E-Commerce Platform</h3>
            <p className="text-gray-600">
              Developed a scalable e-commerce website with secure payment
              integration.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-lg shadow-lg w-80"
          >
            <img
              src="https://img.freepik.com/free-vector/realistic-ui-ux-background_52683-68896.jpg?t=st=1740506623~exp=1740510223~hmac=8a8c2eba17d6f8f98327d78539a6c715590b9b8eb95c384d4aa30a6a4d2c1933&w=1380"
              alt="Project 2"
              className="rounded-lg mb-4 w-full h-48 object-cover"
            />
            <h3 className="text-xl font-semibold mt-2">
              Mobile App Development
            </h3>
            <p className="text-gray-600">
              Built a cross-platform mobile app for seamless user experience.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-lg shadow-lg w-80"
          >
            <img
              src="https://img.freepik.com/free-vector/concept-cloud-storage-data-transfer-server-room-big-data-center_39422-328.jpg?t=st=1740506970~exp=1740510570~hmac=ce534ba546160ef5cfdb9c80c915dd4ca67bce842e1ae8c21b3d76c2431f4ac0&w=1380"
              alt="Project 3"
              className="rounded-lg mb-4 w-full h-48 object-cover"
            />
            <h3 className="text-xl font-semibold mt-2">Cloud Infrastructure</h3>
            <p className="text-gray-600">
              Designed and deployed cloud solutions for high availability and
              scalability.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-lg shadow-lg w-80"
          >
            <img
              src="https://img.freepik.com/free-vector/internet-data-security-concept-laptop-with-server-rack-clock-protection-encryption-data_39422-839.jpg?t=st=1740506888~exp=1740510488~hmac=495f2689118f0346e5f9001632fa128fbd3036fc5ad1c3256dbeed1d20ab3cb6&w=1380"
              alt="Project 4"
              className="rounded-lg mb-4 w-full h-48 object-cover"
            />
            <h3 className="text-xl font-semibold mt-2">Cybersecurity System</h3>
            <p className="text-gray-600">
              Implemented advanced security measures for data protection.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="container mx-auto py-20 px-6">
        <h2 className="text-4xl font-bold text-center mb-10 text-white">
          Our Work Gallery
        </h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
        {gallery.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
             <img
                src={item}
                alt={`Gallery Image ${index + 1}`}
                className="w-full h-60 object-cover"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-6 mt-20">
        <p>&copy; 2025 Kris Software Consultancy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutPage;