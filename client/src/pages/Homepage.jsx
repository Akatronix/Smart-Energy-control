import React from "react";

export default function ErrorPage() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <p className="text-red-500 text-lg font-semibold">
        Error: Please Contact the Developer
      </p>
    </div>
  );
}



// import React, { useEffect, useState, useCallback, useMemo } from "react";
// import getData from "@/utils/getData";
// import validateToken from "@/utils/isTokenExpired";
// import { useNavigate } from "react-router";
// import { toast } from "sonner";
// import { Switch } from "@/components/ui/switch";
// import { ImPower } from "react-icons/im";
// import { MdPower } from "react-icons/md";
// import { RiEyeFill } from "react-icons/ri";
// import { VscClose } from "react-icons/vsc";
// import {
//   FaLightbulb,
//   FaFan,
//   FaSnowflake,
//   FaTv,
//   FaTemperatureLow,
//   FaTrashAlt,
// } from "react-icons/fa";

// import logo from "../assets/logo.jpg";
// import UpdateSwitch from "@/utils/switchPost";
// import SimpleChart from "@/components/chartBox";
// import clearHistoricalData from "@/utils/clearHistoricalData";
// import Hospot from "@/components/Hospot";

// // Memoized appliance card component to prevent unnecessary re-renders
// const ApplianceCard = React.memo(({ appliance, appData, onToggle }) => {
//   return (
//     <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
//       <div className="p-5">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center">
//             <div className="text-2xl mr-3">{appliance.icon}</div>
//             <h4 className="text-lg font-medium text-gray-900">
//               {appliance.name}
//             </h4>
//           </div>
//           <div className="flex items-center justify-start gap-2">
//             <p className="text-gray-500">
//               <span className="text-gray-500 text-sm">
//                 Device is:
//               </span>
//               {appData?.switchStatus == "ON" ? " ON" : " OFF"}
//             </p>
//             <Switch
//               checked={appData?.switchStatus == "ON" ? true : appliance.status}
//               onCheckedChange={onToggle}
//             />
//           </div>
//         </div>

//         <div className="mt-4 grid grid-cols-2 gap-4">
//           <div className="bg-gray-50 p-3 rounded-lg">
//             <p className="text-sm text-gray-500">Voltage</p>
//             <p className="text-lg font-semibold">
//               {appData?.voltage ? appData.voltage : "0"} V
//             </p>
//           </div>
//           <div className="bg-gray-50 p-3 rounded-lg">
//             <p className="text-sm text-gray-500">Current</p>
//             <p className="text-lg font-semibold">
//               {appData?.current ? appData.current : "0"} A
//             </p>
//           </div>
//           <div className="bg-gray-50 p-3 rounded-lg">
//             <p className="text-sm text-gray-500">Power</p>
//             <p className="text-lg font-semibold">
//               {appData?.power ? appData.power : "0"} W
//             </p>
//           </div>
//           <div className="bg-gray-50 p-3 rounded-lg">
//             <p className="text-sm text-gray-500">Energy</p>
//             <p className="text-lg font-semibold">
//               {appData?.energy ? appData.energy : "0"} kWh
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// });

// // Memoized activity item component
// const ActivityItem = React.memo(({ activity, timeDisplay }) => {
//   return (
//     <li>
//       <div className="relative pb-8">
//         <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"></span>
//         <div className="relative flex space-x-3">
//           {activity.attempted == true ? (
//             <div>
//               <span className="h-8 w-8 rounded-full bg-red-500 flex items-center justify-center ring-8 ring-white">
//                 <VscClose className="text-white size-5 font-extrabold" />
//               </span>
//             </div>
//           ) : (
//             <div>
//               <span className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
//                 <svg
//                   className="h-5 w-5 text-white"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </span>
//             </div>
//           )}
//           <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
//             <div>
//               <p className="text-sm text-gray-900 font-medium">
//                 {activity.title}
//               </p>
//               <p className="text-sm text-gray-500">
//                 {activity.attempted == true
//                   ? "who attempted:"
//                   : "who logged-in:"}
//               </p>
//               <p className="text-sm text-gray-500">{activity.email}</p>
//             </div>
//             <div className="text-right text-sm whitespace-nowrap text-gray-500">
//               <p>{timeDisplay(activity.timestamp)}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </li>
//   );
// });

// const Homepage = () => {
//   const [sensor, setSensor] = useState([]);
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [activities, setActivities] = useState([]);
//   const [appData, setAppData] = useState([]);
//   const [appliances, setAppliances] = useState([
//     {
//       id: 1,
//       name: "Bulb",
//       icon: <FaLightbulb className="text-yellow-500" />,
//       voltage: 220,
//       current: 0.5,
//       power: 110,
//       energy: 0.2,
//       status: false,
//     },
//     {
//       id: 2,
//       name: "Fan",
//       icon: <FaFan className="text-blue-500" />,
//       voltage: 220,
//       current: 0.8,
//       power: 176,
//       energy: 0.5,
//       status: false,
//     },
//     {
//       id: 3,
//       name: "AC",
//       icon: <FaSnowflake className="text-cyan-500" />,
//       voltage: 220,
//       current: 5.0,
//       power: 1100,
//       energy: 2.5,
//       status: false,
//     },
//     {
//       id: 4,
//       name: "TV",
//       icon: <FaTv className="text-purple-500" />,
//       voltage: 220,
//       current: 1.5,
//       power: 330,
//       energy: 0.8,
//       status: false,
//     },
//     {
//       id: 5,
//       name: "Fridge",
//       icon: <FaTemperatureLow className="text-green-500" />,
//       voltage: 220,
//       current: 2.0,
//       power: 440,
//       energy: 1.2,
//       status: false,
//     },
//   ]);
//   const [chartControl, setchartControl] = useState({
//     datasets: [
//       {
//         name: "Bulb",
//         data: Array(24).fill(0),
//         color: "#f59e0b",
//       },
//       {
//         name: "Fan",
//         data: Array(24).fill(0),
//         color: "#3b82f6",
//       },
//       {
//         name: "AC",
//         data: Array(24).fill(0),
//         color: "#06b6d4",
//       },
//     ],
//     labels: [
//       "00:00",
//       "01:00",
//       "02:00",
//       "03:00",
//       "04:00",
//       "05:00",
//       "06:00",
//       "07:00",
//       "08:00",
//       "09:00",
//       "10:00",
//       "11:00",
//       "12:00",
//       "13:00",
//       "14:00",
//       "15:00",
//       "16:00",
//       "17:00",
//       "18:00",
//       "19:00",
//       "20:00",
//       "21:00",
//       "22:00",
//       "23:00",
//     ],
//   });

//   const [showDialog, setShowDialog] = useState(false);

//   const navigate = useNavigate();

//   // Memoize timeDisplay function
//   const timeDisplay = useCallback((timestamp) => {
//     if (!timestamp) return "";
//     const date = new Date(timestamp);
//     return date.toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//   }, []);

//   // Memoize toggle function
//   const toggleApplianceStatus = useCallback((id, newStatus) => {
//     setAppliances((prevAppliances) =>
//       prevAppliances.map((app) =>
//         app.id === id ? { ...app, status: newStatus } : app
//       )
//     );
//   }, []);

//   // Handle appliance toggle with API call
//   const handleApplianceToggle = useCallback(
//     (applianceId, socketId, newStatus, applianceName) => {
//       // Update local state immediately for responsive UI
//       toggleApplianceStatus(applianceId, newStatus);

//       // Call API to update switch status
//       if (socketId) {
//         UpdateSwitch(socketId, newStatus ? "ON" : "OFF")
//           .then(() => {
//             toast.success(`${applianceName} status updated`);
//           })
//           .catch((error) => {
//             console.error("Error updating switch:", error);
//             toast.error(`Failed to update ${applianceName} status`);
//             // Revert state on error
//             toggleApplianceStatus(applianceId, !newStatus);
//           });
//       } else {
//         toast.error("Socket ID not found");
//       }
//     },
//     [toggleApplianceStatus]
//   );

//   // Function to handle clearing historical data
//   const handleClearHistoricalData = useCallback(async () => {
//     try {
//       const result = await clearHistoricalData();
//       if (result && result.message) {
//         toast.success(result.message);

//         // Refresh data to update the chart
//         const data = await getData();
//         if (data && data.chartData) {
//           setchartControl(data.chartData);
//         }
//       } else {
//         toast.error("Failed to clear historical data");
//       }
//     } catch (error) {
//       console.error("Error clearing historical data:", error);
//       toast.error("Failed to clear historical data");
//     }
//   }, []);

//   // Memoize chart data to prevent unnecessary re-renders
//   const chartData = useMemo(
//     () => ({
//       labels: chartControl.labels,
//       datasets: chartControl.datasets,
//     }),
//     [chartControl.labels, chartControl.datasets]
//   );

//   useEffect(() => {
//     let interval = setInterval(async () => {
//       const isValid = validateToken();
//       if (!isValid) {
//         toast.error("Session expired. Please login again.");
//         navigate("/auth/login", { replace: true });
//         return;
//       }

//       try {
//         const data = await getData();
//         setIsLoading(false);

//         if (!data) {
//           setError("Error: failed to fetch data");
//           toast.error("Failed to fetch sensor data");
//           return;
//         }

//         // Only update state if data has changed
//         if (
//           data.sensor &&
//           data.sensor[0] &&
//           JSON.stringify(data.sensor[0]) !== JSON.stringify(sensor)
//         ) {
//           setSensor(data.sensor[0]);
//         }

//         if (
//           data.activities &&
//           JSON.stringify(data.activities) !== JSON.stringify(activities)
//         ) {
//           setActivities(data.activities);
//         }

//         if (
//           data.socket &&
//           JSON.stringify(data.socket) !== JSON.stringify(appData)
//         ) {
//           setAppData(data.socket);
//         }

//         if (
//           data.chartData &&
//           JSON.stringify(data.chartData) !== JSON.stringify(chartControl)
//         ) {
//           setchartControl(data.chartData);
//         }

//         if (error) {
//           setTimeout(() => {
//             setError("");
//           }, 500);
//         }
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError("Error: failed to fetch data");
//         toast.error("Failed to fetch sensor data");
//       }
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [sensor, activities, appData, chartControl, error, navigate]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       {/* Header */}
//       <header className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
//           <div className="flex items-center">
//             <div className="flex-shrink-0 flex items-center">
//               <img src={logo} alt="Logo" className="h-10 w-10 rounded-lg" />
//               <h1 className="ml-3 text-lg font-bold text-gray-900">
//                 Smart Energy Control
//               </h1>
//             </div>
//           </div>
//           <div
//             className="flex items-center space-x-4"
//             onClick={() => setShowDialog(true)}
//           >
//             <div className="relative">
//               <button className="flex text-sm rounded-full ">
//                 <div className="h-8 w-8 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 flex items-center justify-center text-white font-medium">
//                   A
//                 </div>
//               </button>
//             </div>
//             <button
//               onClick={() => {
//                 localStorage.removeItem("token");
//                 navigate("/auth/login");
//               }}
//               className="text-gray-500 hover:text-gray-700 transition"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Dashboard Header */}
//         <div className="mb-8 flex items-center justify-between">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
//             <p className="mt-1 text-sm text-gray-500">
//               Monitor and Control your IoT Energy System
//             </p>
//           </div>
//         </div>
//         {/* Error Message */}
//         {error && (
//           <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
//             <div className="flex">
//               <div className="flex-shrink-0">
//                 <svg
//                   className="h-5 w-5 text-red-400"
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </div>
//               <div className="ml-3">
//                 <p className="text-sm text-red-700">{error}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         <Hospot isOpen={showDialog} onClose={() => setShowDialog(false)} />

//         {/* Loading State */}
//         {isLoading && (
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//           </div>
//         )}
//         {/* Dashboard Grid */}
//         {!isLoading && (
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* Additional Stats Cards */}
//             <div className="lg:col-span-1">
//               <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-md p-6 text-white">
//                 <h3 className="text-lg font-medium mb-2">Total Energy</h3>
//                 <p className="text-3xl font-bold">
//                   {sensor.totalEnergy ? `${sensor.totalEnergy} kWh` : "0.00 kWh"}
//                 </p>
//                 <div className="mt-4 flex items-center">
//                   <MdPower className="h-5 w-5 text-blue-200" />
//                   <span className="ml-2 text-blue-200">The System Current</span>
//                 </div>
//               </div>
//             </div>

//             <div className="lg:col-span-1">
//               <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl shadow-md p-6 text-white">
//                 <h3 className="text-lg font-medium mb-2">Voltage</h3>
//                 <p className="text-3xl font-bold">
//                   {`${sensor.voltage} v` || "0.00 v"}
//                 </p>
//                 <div className="mt-4 flex items-center">
//                   <ImPower className="h-5 w-5 text-amber-200" />
//                   <span className="ml-2 text-amber-200">
//                     The System Voltage
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div className="lg:col-span-1">
//               <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-md p-4 text-white py-7">
//                 <h3 className="text-lg font-medium mb-2">Motion</h3>
//                 <div className="flex items-center justify-start gap-4 relative">
//                   <div>
//                     <p className="text-xl font-bold">
//                       {sensor.motion == "1" ? "Detected" : "No Motion"}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="mt-4 flex items-center">
//                   <RiEyeFill className="h-5 w-5 text-green-200" />
//                   <span className="ml-2 text-green-200">
//                     Motion Detecting System
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Appliances Section */}
//             <div className="lg:col-span-3">
//               <div className="bg-white rounded-xl shadow-md overflow-hidden">
//                 <div className="px-6 py-5 border-b border-gray-200">
//                   <h3 className="text-lg font-medium text-gray-900">
//                     Connected Appliances
//                   </h3>
//                 </div>
//                 <div className="p-6">
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {appliances.map((appliance, index) => (
//                       <ApplianceCard
//                         key={`appliance-${index}`}
//                         appliance={appliance}
//                         appData={appData[index]}
//                         onToggle={(newStatus) =>
//                           handleApplianceToggle(
//                             appliance.id,
//                             appData[index]?._id,
//                             newStatus,
//                             appliance.name
//                           )
//                         }
//                       />
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="lg:col-span-3 w-full">
//               <SimpleChart
//                 labels={chartData.labels}
//                 datasets={chartData.datasets}
//                 title="Energy Consumption by Device (kWh) in Last 24 Hours"
//               />
//               <div className="w-full flex items-center justify-center bg-white py-4">
//                 <button
//                   onClick={handleClearHistoricalData}
//                   className="flex items-center px-3 py-2 cursor-pointer  text-gray-500 rounded-md  transition-colors border border-gray-300"
//                 >
//                   <FaTrashAlt className="mr-2" />
//                   <span>Clear Historical Data</span>
//                 </button>
//               </div>
//             </div>

//             {/* Recent Activity */}
//             <div className="lg:col-span-3">
//               <div className="bg-white rounded-xl shadow-md overflow-hidden">
//                 <div className="px-6 py-5 border-b border-gray-200">
//                   <h3 className="text-lg font-medium text-gray-900">
//                     Recent Login Activity
//                   </h3>
//                 </div>
//                 <div className="p-6 overflow-y-auto pb-12">
//                   {activities.length !== 0 ? (
//                     <div className="flow-root">
//                       <ul className="-mb-8 overflow-y-scroll pr-5 h-[33vh]">
//                         {activities.map((activity, index) => (
//                           <ActivityItem
//                             key={`list${index}`}
//                             activity={activity}
//                             timeDisplay={timeDisplay}
//                           />
//                         ))}
//                       </ul>
//                     </div>
//                   ) : (
//                     <div className="text-center">
//                       <p className="text-sm text-gray-500">No Activity</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default Homepage;
