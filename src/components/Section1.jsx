"use client";
import { useState, useEffect } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import Hero from "./Carousel";
import Link from "next/link";
import { collection, onSnapshot, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const Section1 = () => {
  const [unitsAvailable, setUnitsAvailable] = useState(0);
  const [peopleHelped, setPeopleHelped] = useState(0);

  // Real-time data fetching from Firestore
  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "stats", "dashboardData"); // Reference to the stats document
      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          setUnitsAvailable(docSnap.data().unitsAvailable || 0);
          setPeopleHelped(docSnap.data().peopleHelped || 0);
        }
      });

      return () => unsubscribe(); // Cleanup function
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-red-700 text-4xl text-center ">
        {/* Slogan */}
        Your Blood Can be a Second Life for Someone
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center border-none justify-center mt-10">
          {/* Units Available Card */}
          <Card className="rounded mr-5 shadow-lg border-none bg-red-700 w-[200px] h-[140px]">
            <CardHeader className="flex items-center justify-between text-white">
              <CardTitle>Units Available</CardTitle>
              <CardDescription>{unitsAvailable} units</CardDescription>
              <Link href={"/donate"}>
                <Button
                  variant="secondary"
                  className="bg-white text-red-700 hover:bg-red-700 hover:text-white rounded-lg"
                >
                  Donate Now
                </Button>
              </Link>
            </CardHeader>
          </Card>

          {/* People Helped Card */}
          <Card className="rounded shadow-lg bg-red-700 text-white w-[200px] h-[140px]">
            <CardHeader className="flex items-center justify-between">
              <CardTitle>People Helped</CardTitle>
              <CardDescription>{peopleHelped}+</CardDescription>
              <Link href={"/donors"}>
                <Button
                  variant="secondary"
                  className="bg-white text-red-700 hover:bg-red-700 hover:text-white rounded-lg"
                >
                  Ask Blood
                </Button>
              </Link>
            </CardHeader>
          </Card>
        </div>

        {/* Hero Carousel */}
        <div className="ml-[60px] h-[240px]">
          <Hero />
        </div>
      </div>
    </div>
  );
};

export default Section1;
