"use client";

import { useState, useEffect } from "react";
import { db } from "../../../firebase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const DonorsFeedback = () => {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    email: "",
    message: "",
  });

  const [feedbacks, setFeedbacks] = useState([]);
  const [message, setMessage] = useState("");

  // Dummy feedback data (fallback when no data is available)
  const dummyFeedbacks = [
    { name: "Rajesh Kumar", city: "Delhi", message: "Great initiative! Keep up the good work." },
    { name: "Pooja Sharma", city: "Mumbai", message: "This website makes blood donation easy!" },
    { name: "Amit Verma", city: "Bangalore", message: "I found a blood donor within minutes!" },
  ];

  // Fetch real-time feedback from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "donorsFeedback"), (snapshot) => {
      if (!snapshot.empty) {
        setFeedbacks(snapshot.docs.map((doc) => doc.data()));
      } else {
        setFeedbacks(dummyFeedbacks); // Use dummy data if no feedback is available
      }
    });

    return () => unsubscribe();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "donorsFeedback"), formData);
      setMessage("Feedback submitted successfully!");
      setFormData({ name: "", city: "", email: "", message: "" });
    } catch (error) {
      setMessage("Error submitting feedback. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Navbar />

      {/* Feedback List */}
      <div className="flex flex-col items-center gap-10 mt-10">
        <h1 className="text-red-700 font-bold text-3xl">Donors Feedback</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedbacks.map((feedback, index) => (
            <Card key={index} className="bg-red-700 text-white p-4 rounded-lg shadow-lg">
              <CardHeader>
                <CardTitle>{feedback.name} ({feedback.city})</CardTitle>
                <CardDescription className="text-white">{feedback.message}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* Feedback Form */}
      <div className="w-[800px] m-auto mt-10">
        <h1 className="w-full text-center font-bold text-3xl text-red-700">
          Submit Your Feedback
        </h1>
        <form
          onSubmit={handleSubmit}
          className="text-red-700 flex flex-col items-center p-4 gap-4 border rounded border-red-700"
        >
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Your Name"
            required
          />
          <Input
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter Your City"
            required
          />
          <Input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Your Email"
            type="email"
            required
          />
          <Textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Type your message here."
            required
          />
          <Button className="bg-red-700 text-white" type="submit">
            Submit
          </Button>
        </form>
        {message && <p className="text-center mt-3 text-green-600">{message}</p>}
      </div>

      <Footer />
    </div>
  );
};

export default DonorsFeedback;
