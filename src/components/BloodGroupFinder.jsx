// 'use client'
// import { useState } from "react"
// import { Input } from "./ui/input"
// import { Button } from "./ui/button";
// import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

// const BloodGroupFinder = () => {
//   const [searchData, setSearchData] = useState('');
//   // const {cityName,unitsAvailable} = useCollection()
//   const handleClick = () => {
//     // const city = "";
//   }
//   return (
//     <div>
//       <div>
//         {/* Search Bar  */}
//         {/* <Input type="" placeholder="search blood group...." 
//         onClick={handleSearch} >
//         </Input> */}
//       </div>
//       <div>
//         {/* cards */}
//       </div>
//       <div className="container p-6 mx-auto">
//         <h2 className="mb-4 text-2xl font-bold text-center text-red-500">Find Blood Donors</h2>
//         <div className="flex justify-center mb-6">
//           <Input
//             className="text-red-700 bg-red-100"
//             value={searchData}
//             onChange={(e) => setSearchData(e.target.value)}
//             placeholder="search blood ..........."
//           />
//           <Button
//             className="px-4 py-2 ml-4 text-white bg-red-600 rounded-lg hover:bg-red-700"
//             onClick={handleClick}
//             type="submit"
//           >
//             Search
//           </Button>
//         </div>
//         <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
//           <div className=" md:mt-10 h-[160px] lg:my-auto">
//             <Card className="rounded mr-5  shadow-lg border-none bg-red-700 w-[200px] h-[140px] ">
//               <CardHeader className="flex items-center justify-between  text-white">
//                 <CardTitle>City Name</CardTitle>
//                 <CardDescription>
//                   <p>Units Avilable</p>
//                   <p>1200+ units</p>
//                   </CardDescription>
//                 <Button variant="secondary" className="bg-white text-red-700 hover:bg-red-700 hover:text-white rounded-lg" >Contact Now</Button>
//               </CardHeader>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
// export default BloodGroupFinder;
