// import { useState } from "react";
// import logo from "../assets/logo.jpg";
// import { toast } from "sonner";
// import { useNavigate } from "react-router-dom";

// const LoginPage = () => {
//   const [myFormData, setMyFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLoginRequest = async (e) => {
//     e.preventDefault();
//     console.log("clicked");
//     const { email, password } = myFormData;
//     if (!email || !password) return toast("All fields are required !");
//     setIsLoading(true);

//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_BASE_URL}/api/auth/login`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(myFormData),
//         }
//       );

//       console.log(response);

//       if (!response.ok) {
//         toast("Login Failed!");

//         setTimeout(() => {
//           setIsLoading(false);
//         }, 1000);

//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       setMyFormData({ email: "", password: "" });
//       const data = await response.json();
//       setTimeout(() => {
//         setIsLoading(false);
//       }, 1000);
//       toast("Login Successfully...");
//       localStorage.setItem("token", data.token);
//       navigate("/");
//     } catch (error) {
//       console.error("Error logging-in:", error);
//       setTimeout(() => {
//         setIsLoading(false);
//       }, 1000);
//       toast("Something Went Wrong!, While Loggin-In");
//       return null;
//     }
//   };

//   return (
//     <div className="w-screen h-screen flex items-center justify-center">
//       <div className="px-4 md:px-0">
//         <div className="w-full flex items-center justify-start gap-2.5">
//           <img
//             src={logo}
//             alt="company logo"
//             className="md:w-[50px] md:h-[50px] w-[36px] h-[36px] rounded-md border-2"
//           />
//           <h1 className="md:text-3xl font-bold text-lg text-[#333]">Login</h1>
//         </div>
//         <h1 className="md:text-md font-normal text-base text-[#333] mb-4 text-nowrap">
//           Iot Temperature Control System
//         </h1>
//         <form onSubmit={handleLoginRequest}>
//           <div>
//             <label htmlFor="email" className="text-[#333]">
//               Email
//             </label>
//             <br />
//             <input
//               value={myFormData.email}
//               required
//               onChange={(e) =>
//                 setMyFormData((prev) => ({ ...prev, email: e.target.value }))
//               }
//               type="email"
//               placeholder="xyz@emaple.com"
//               id="email"
//               className="
//               md:w-[400px] text-[#333] w-full py-3 px-6 border-2 border-zinc-400 outline-none rounded-md my-3"
//             />
//           </div>
//           <div>
//             <label htmlFor="password" className="text-[#333]">
//               Password
//             </label>
//             <br />
//             <input
//               required
//               value={myFormData.password}
//               onChange={(e) =>
//                 setMyFormData((prev) => ({ ...prev, password: e.target.value }))
//               }
//               type="password"
//               id="password"
//               className="
//               md:w-[400px] text-[#333] w-full py-3 px-6 border-2 border-zinc-400 outline-none rounded-md my-3"
//             />
//           </div>
//           <button
//             type="submit"
//             className="md:w-[400px] w-full py-3 px-6 border-none  outline-none rounded-md my-3 bg-blue-400 hover:bg-blue-500 hover:cursor-pointer text-white"
//           >
//             {isLoading ? <>Loading...</> : "Login"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

import { useState } from "react";
import logo from "../assets/logo.jpg";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [myFormData, setMyFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginRequest = async (e) => {
    e.preventDefault();
    console.log("clicked");
    const { email, password } = myFormData;
    if (!email || !password) return toast("All fields are required !");
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(myFormData),
        }
      );

      console.log(response);

      if (!response.ok) {
        toast("Login Failed!");

        setTimeout(() => {
          setIsLoading(false);
        }, 1000);

        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setMyFormData({ email: "", password: "" });
      const data = await response.json();
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      toast("Login Successfully...");
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      console.error("Error logging-in:", error);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      toast("Something Went Wrong!, While Loggin-In");
      return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all hover:shadow-2xl">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 text-center">
            <div className="flex justify-center mb-4">
              <img
                src={logo}
                alt="company logo"
                className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
              />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-blue-100">IoT Smart Energy Control System</p>
          </div>

          <div className="p-8">
            <form onSubmit={handleLoginRequest} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input
                    value={myFormData.email}
                    required
                    onChange={(e) =>
                      setMyFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    type="email"
                    placeholder="you@example.com"
                    id="email"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    required
                    value={myFormData.password}
                    onChange={(e) =>
                      setMyFormData((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    type="password"
                    id="password"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  />
                </div>
              </div>

              {/* <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div> */}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-lg text-white font-medium transition duration-200 ${
                  isLoading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md"
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>© 2025 IoT Smart Energy Control System. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
