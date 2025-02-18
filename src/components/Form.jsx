"use client";
import { useState } from "react";
import { db } from "../../firebase";
import { addDoc, collection, doc, updateDoc, getDoc } from "firebase/firestore";
import { Input } from "./ui/input";
import Navbar from "./Navbar";
import { Button } from "./ui/button";
function Form() {
  const [formData, setFormData] = useState({
    bloodGroup: "",
    cityname: "",
    name: "",
    email: "",
    contactNumber: "",
  });
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Trim input values and check for empty fields
    const trimmedData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, value.trim()])
    );

    if (Object.values(trimmedData).some((value) => value === "")) {
      alert("Please fill in all fields before submitting.");
      setLoading(false);
      return;
    }

    try {
      // Add donor to Firestore (contacts collection)
      const docRef = await addDoc(collection(db, "contacts"), trimmedData);
      console.log("Document written with ID:", docRef.id);
      alert("Form submitted successfully!");

      // Update or create donor count in donors collection
      const donorRef = doc(db, "donors", `${trimmedData.cityname}_${trimmedData.bloodGroup}`);
      const donorSnapshot = await getDoc(donorRef);

      if (donorSnapshot.exists()) {
        // Increment donor count if entry exists
        await updateDoc(donorRef, {
          donorsAvailable: donorSnapshot.data().donorsAvailable + 1,
        });
      } else {
        // Create new entry if it doesn't exist
        await addDoc(collection(db, "donors"), {
          cityname: trimmedData.cityname,
          bloodGroup: trimmedData.bloodGroup,
          donorsAvailable: 1,
        });
      }

      // Reset form state
      setFormData({
        bloodGroup: "",
        cityname: "",
        name: "",
        email: "",
        contactNumber: "",
      });
    } catch (error) {
      console.error("Error adding document:", error);
      alert("Error submitting form. Please try again.");
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="border-red-700">
        <div className="text-center text-3xl text-red-700 font-bold mt-6">
          <h1>Your Blood Can Be a Second Life For Someone</h1>
          <h2>Donate to Save a Life!</h2>
        </div>
        <div>
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-8 border rounded shadow m-4 border-red-700"
          >
            <div>
              <label className="block mb-1">Name:</label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-1">Email:</label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-1">Contact:</label>
              <Input
                name="contactNumber"
                pattern="[0-9]*"
                inputMode="numeric"
                value={formData.contactNumber}
                onChange={handleChange}
                required
                placeholder="Enter your contact number"
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-1">Blood Group:</label>
              <Input
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                required
                placeholder="Enter your blood group"
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-1">City:</label>
              <Input
                name="cityname"
                value={formData.cityname}
                onChange={handleChange}
                required
                placeholder="Enter your city name"
                className="w-full p-2 border rounded"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full mt-4 p-2 bg-red-700 text-white rounded"
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Form;
