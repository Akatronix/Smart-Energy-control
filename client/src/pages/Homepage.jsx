// import React, { useEffect, useState } from "react";
// import DataBox from "../components/DataBox";
// import SensorBox from "../components/SensorBox";
// import getData from "@/utils/getData";
// import validateToken from "@/utils/isTokenExpired";
// import { useNavigate } from "react-router";

// const Homepage = () => {
//   const [sensor, setSonsor] = useState([]);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     let interval = setInterval(async () => {
//       const isValid = validateToken();
//       if (!isValid) {
//         navigate("/auth/login", { replace: true });
//         return;
//       }

//       const data = await getData();
//       if (!data) {
//         setError("Error: failed to fetch data");
//         return;
//       }
//       setSonsor(data.sensor[0]);

//       error &&
//         setTimeout(() => {
//           setError("");
//         }, 1000);
//     }, 500);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <>
//       <div className=" w-full h-[90vh] ">
//         <p className="mb-3 text-red-500">{error}</p>
//         <div className="md:flex items-start justify-between gap-2 w-full flex-wrap ">
//           <DataBox data={sensor} />
//           <SensorBox />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Homepage;

import React, { useEffect, useState } from "react";
import getData from "@/utils/getData";
import validateToken from "@/utils/isTokenExpired";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { ImPower } from "react-icons/im";
import { MdPower } from "react-icons/md";
import { RiEyeFill } from "react-icons/ri";
import { VscClose } from "react-icons/vsc";

import logo from "../assets/logo.jpg";
import UpdateSwitch from "@/utils/switchPost";

const Homepage = () => {
  const [sensor, setSensor] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [activities, setActivities] = useState([]);
  const [relayStatus, setRelayStatus] = useState("");
  const [isAuto, setIsAuto] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let interval = setInterval(async () => {
      const isValid = validateToken();
      if (!isValid) {
        toast.error("Session expired. Please login again.");
        navigate("/auth/login", { replace: true });
        return;
      }

      // setIsLoading(true);
      const data = await getData();
      setIsLoading(false);

      if (!data) {
        setError("Error: failed to fetch data");
        toast.error("Failed to fetch sensor data");
        return;
      }

      setSensor(data.sensor[0]);
      setActivities(data.activities);
      setRelayStatus(data.relay[0]);
      setIsAuto(data.relay[0].relayState == "ON" ? true : false);

      if (error) {
        setTimeout(() => {
          setError("");
        }, 500);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <img src={logo} alt="Logo" className="h-10 w-10 rounded-lg" />
              <h1 className="ml-3 text-lg font-bold text-gray-900">
                Smart Energy Control
              </h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="flex text-sm rounded-full ">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 flex items-center justify-center text-white font-medium">
                  A
                </div>
              </button>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/auth/login");
              }}
              className="text-gray-500 hover:text-gray-700 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
            <p className="mt-1 text-sm text-gray-500">
              Monitor and Control your IoT Energy System
            </p>
          </div>
          <div>
            <span className="text-sm text-gray-700  flex items-center justify-center">
              Device is Currently:{" "}
              <span className="text-red-400 ml-1.5">
                {relayStatus.relayState}
              </span>
              .
            </span>
            {/* <div className="bg-red-500 md:flex md:items-center md:justify-center pb-1.5"> */}
            <Switch
              checked={isAuto}
              onCheckedChange={async (checked) => {
                setIsAuto(checked);
                const data = await UpdateSwitch({
                  id: "68e8a4b2791d7679f72818c2",
                  relayState: checked == true ? "ON" : "OFF",
                });
                console.log(data);
                if (data.status == 200) {
                  toast.success(
                    `Successfully Turned ${data.data.relayState} the Device`
                  );
                }
              }}
              className="mt-4"
            />
            {/* </div> */}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Dashboard Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Additional Stats Cards */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-md p-6 text-white">
                <h3 className="text-lg font-medium mb-2">Current</h3>
                <p className="text-3xl font-bold">
                  {sensor.current ? `${sensor.current}A` : "0.00 A"}
                </p>
                <div className="mt-4 flex items-center">
                  <MdPower className="h-5 w-5 text-blue-200" />
                  <span className="ml-2 text-blue-200">The System Current</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl shadow-md p-6 text-white">
                <h3 className="text-lg font-medium mb-2">Voltage</h3>
                <p className="text-3xl font-bold">
                  {`${sensor.voltage} v` || "0.00 v"}
                </p>
                <div className="mt-4 flex items-center">
                  <ImPower className="h-5 w-5 text-amber-200" />
                  <span className="ml-2 text-amber-200">
                    The System Voltage
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-md p-4 text-white">
                <h3 className="text-lg font-medium mb-2">Motion</h3>
                <div className="flex items-center justify-start gap-4 relative">
                  <div>
                    <p className="text-xl font-bold">
                      {sensor.motion == "1" ? "Detected" : "No Motion"}
                    </p>
                    {sensor.humans > 0 ? (
                      <p className="text-green-200">Relay State is ON</p>
                    ) : (
                      <p className="text-green-200">Relay State is OFF</p>
                    )}
                  </div>

                  <div>
                    <p className="text-5xl absolute top-0 right-[20px] font-bold">
                      {sensor.humans}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <RiEyeFill className="h-5 w-5 text-green-200" />
                  <span className="ml-2 text-green-200">
                    Motion Detecting System
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">
                    Recent Login Activity
                  </h3>
                </div>
                <div className="p-6 overflow-y-auto pb-12">
                  {activities.length !== 0 ? (
                    <div className="flow-root">
                      <ul className="-mb-8 overflow-y-scroll pr-5 h-[33vh]">
                        {activities.map((activity, index) => (
                          <li key={`list${index}`}>
                            <div className="relative pb-8">
                              <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"></span>
                              <div className="relative flex space-x-3">
                                {activity.attempted == true ? (
                                  <div>
                                    <span className="h-8 w-8 rounded-full bg-red-500 flex items-center justify-center ring-8 ring-white">
                                      {/* <svg
                                        className="h-5 w-5 text-white"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                          clipRule="evenodd"
                                        />
                                      </svg> */}
                                      <VscClose className="text-white size-5 font-extrabold" />
                                    </span>
                                  </div>
                                ) : (
                                  <div>
                                    <span className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
                                      <svg
                                        className="h-5 w-5 text-white"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    </span>
                                  </div>
                                )}
                                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                  <div>
                                    <p className="text-sm text-gray-900 font-medium">
                                      {activity.title}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      {activity.attempted == true
                                        ? "who attempted:"
                                        : "who logged-in:"}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      {activity.email}
                                    </p>
                                  </div>
                                  <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                    <p>10:42 AM</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-sm text-gray-500">No Activity</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Homepage;
