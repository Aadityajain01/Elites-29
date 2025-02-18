"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const Infor = (props) => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center gap-10">
        <h1 className="font-bold text-red-700 text-6xl">About us</h1>

        <div className="w-[1280px] mx-auto gap-4 flex-1">
          <p>
            Welcome to{" "}
            <span className="text-red-700 font-bold">Blood-Link</span> – A
            Platform for Life-Saving Blood Donations At{" "}
            <span className="text-red-700 font-bold">Blood-Link</span>, we are
            dedicated to bridging the gap between blood donors and recipients.
            Our mission is to create a reliable and easily accessible network
            where individuals can donate and receive blood in times of need.
          </p>
        </div>

        <div  className="w-[1280px] mx-auto gap-4 flex-1" >
          <h1>Our Vision</h1>
          <p>
            To ensure that no life is lost due to the lack of blood
            availability.
          </p>
        </div>

        <div  className="w-[1280px] mx-auto gap-4 flex-1"  >
          <h1> Our Mission</h1>
          <p>
            To raise awareness about the importance of blood donation. To
            connect donors with patients in urgent need. To maintain a safe and
            efficient blood donation process. To encourage voluntary,
            non-remunerated blood donations.
          </p>
        </div>

        <div  className="w-[1280px] mx-auto gap-4 flex-1"  >
          <h1>Why Choose Us?</h1>
          <ul>
            <li>
              ✅ A user-friendly platform for quick donor-recipient matching
            </li>
            <li>✅ A verified database of donors and blood banks</li>
            <li>✅ Awareness campaigns to encourage regular donations. </li>
            <li>✅ 24/7 support for urgent blood requests</li>
          </ul>
          <p>
            Join us in our mission to save lives. Donate blood today and be a
            hero!
          </p>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Infor;
