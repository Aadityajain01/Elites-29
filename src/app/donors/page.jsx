"use client";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "../../../firebase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const BloodGroupFinder = () => {
  const [searchData, setSearchData] = useState("");
  const [donors, setDonors] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);

  // Fetch donors from Firestore
  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "contacts"));
        const donorsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDonors(donorsList);
        setFilteredDonors(donorsList);
      } catch (error) {
        console.error("Error fetching donors:", error);
      }
    };

    fetchDonors();
  }, []);

  // Handle search (filter by city or blood group)
  const handleSearch = () => {
    const filtered = donors.filter(
      (donor) =>
        donor.cityname.toLowerCase().includes(searchData.toLowerCase()) ||
        donor.bloodGroup.toLowerCase().includes(searchData.toLowerCase())
    );
    setFilteredDonors(filtered);
  };

  return (
    <div>
      <Navbar />
      <div className="container p-6 mx-auto">
        <h2 className="mb-4 text-2xl font-bold text-center text-red-500">
          Find Blood Donors
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
          <Input
            className="text-red-700 bg-red-100 w-full md:w-1/2"
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
            placeholder="Search by city or blood group..."
          />
          <Button
            className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>

        {/* Display donor cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredDonors.length > 0 ? (
            filteredDonors.map((donor) => (
              <Card key={donor.id} className="rounded-lg shadow-lg bg-red-700 text-white p-4">
                <CardHeader>
                  <CardTitle className="text-xl">{donor.name}</CardTitle>
                  <CardDescription>
                    <p><strong>Blood Group:</strong> {donor.bloodGroup}</p>
                    <p><strong>City:</strong> {donor.cityname}</p>
                    <p><strong>Contact:</strong> {donor.contactNumber}</p>
                  </CardDescription>
                  {/* Click-to-call functionality */}
                  <a href={`tel:${donor.contactNumber}`}>
                    <Button
                      variant="secondary"
                      className="bg-white text-red-700 hover:bg-red-700 hover:text-white rounded-lg mt-2 w-full"
                    >
                      Contact Now
                    </Button>
                  </a>
                </CardHeader>
              </Card>
            ))
          ) : (
            <p className="text-center text-red-500">No donors found.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BloodGroupFinder;
