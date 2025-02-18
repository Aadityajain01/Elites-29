"use client";
import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import Link from "next/link";

const Section2 = () => {
  const [searchData, setSearchData] = useState("");
  const [donors, setDonors] = useState([]);

  // Real-time data fetching from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "donors"), (snapshot) => {
      const donorList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDonors(donorList);
    });

    return () => unsubscribe(); // Cleanup function to avoid memory leaks
  }, []);

  // Filter donors based on search input (blood group or city)
  const filteredDonors = donors.filter(
    (donor) =>
      donor.bloodGroup?.toLowerCase().includes(searchData.toLowerCase()) ||
      donor.cityname?.toLowerCase().includes(searchData.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      {/* Search Bar */}
      <h2 className="m-4 text-3xl md:text-4xl font-bold text-center text-red-700">
        Find Blood Donors
      </h2>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
        <Link href={"/donors"}>
          <Input
            className="text-red-700 bg-red-100 w-full sm:w-[500px] md:w-[700px] lg:w-[900px]"
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
            placeholder="Search by blood group or city (e.g., A+, B-, O+, Mumbai)..."
          />
        </Link>
      </div>

      {/* Donor Cards (Real-time updates) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredDonors.length > 0 ? (
          filteredDonors.map((donor) => (
            <Card
              key={donor.id}
              className="rounded-lg shadow-lg border-none bg-red-700 text-white p-4"
            >
              <CardHeader className="flex flex-col">
                <CardTitle className="text-lg md:text-xl">{donor.cityname}</CardTitle>
                <CardDescription className="text-sm md:text-base">
                  <p><strong>Blood Group:</strong> {donor.bloodGroup}</p>
                  <p><strong>Units Available:</strong> {donor.donorsAvailable}</p>
                </CardDescription>
<Link href={"/donors"} >
<Button
                  variant="secondary"
                  className="bg-white text-red-700 hover:bg-red-700 hover:text-white rounded-lg mt-2"
                >
                  Contact Now
                </Button></Link>
              </CardHeader>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg col-span-full">No donors found.</p>
        )}
      </div>
    </div>
  );
};

export default Section2;