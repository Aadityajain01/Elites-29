"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

// Dummy blood bank data
const bloodBanks = [
  { city: "Delhi", name: "Red Cross Blood Bank", units: 50 },
  { city: "Delhi", name: "AIIMS Blood Bank", units: 75 },
  { city: "Mumbai", name: "Tata Memorial Blood Bank", units: 60 },
  { city: "Mumbai", name: "Fortis Hospital Blood Bank", units: 40 },
  { city: "Bangalore", name: "Apollo Blood Bank", units: 55 },
  { city: "Bangalore", name: "Narayana Health Blood Bank", units: 65 },
  { city: "Chennai", name: "Sri Ramachandra Blood Bank", units: 80 },
  { city: "Kolkata", name: "AMRI Blood Bank", units: 70 },
];

const Emergency = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBanks, setFilteredBanks] = useState([]);

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setFilteredBanks([]);
      return;
    }

    const results = bloodBanks.filter((bank) =>
      bank.city.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBanks(results);
  };

  return (
    <div>
      <Navbar />
      <div className="container max-w-2xl mx-auto mt-10 text-center">
        <div className="flex items-center justify-center gap-4">
          <Input
            placeholder="Enter city name..."
            className="text-red-700 border border-red-500 p-2 w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button onClick={handleSearch} className="bg-red-700 text-white px-5">
            Search
          </Button>
        </div>

        <div className="mt-10">
          <h1 className="text-red-700 font-bold text-2xl">
            Blood Banks in {searchQuery || "City"}
          </h1>
          <div className="mt-6 flex flex-col gap-6">
            {filteredBanks.length > 0 ? (
              filteredBanks.map((bank, index) => (
                <Card key={index} className="bg-red-700 text-white p-4 shadow-lg rounded-lg">
                  <CardHeader>
                    <CardTitle>{bank.name}</CardTitle>
                    <CardDescription className="text-white">
                      {bank.city} | Available Units: {bank.units}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))
            ) : (
              <p className="text-gray-600 mt-4">
                {searchQuery ? "No blood banks found in this city." : "Enter a city name to search."}
              </p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Emergency;
