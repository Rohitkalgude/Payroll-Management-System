import React from "react";
import { Lightbulb, ShieldCheck, Users } from "lucide-react";
import Logo from "../assets/Logo";
import { useNavigate } from "react-router-dom";


function AboutUs() {
  const navigate = useNavigate();

  const navigateToDashbord = () =>{
    navigate("/");
    
  }

  return (
    <div className="bg-sideBgClr text-gray-800 py-12 font-Inter ">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-12 flex items-center">
          <div onClick={navigateToDashbord}>
            <Logo className="w-48 h-auto cursor-pointer"  />
          </div>
          <div className="text-center w-full pr-32"> 
            <h1 className="text-4xl font-bold "> About Salarium</h1>
          </div>
        </div>

        {/* Who We Are and Our Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-semibold mb-6">Who We Are</h2>
            <p className="text-lg leading-relaxed">
              Salarium is a cutting-edge payroll management system designed to
              simplify and streamline payroll processes for businesses of all
              sizes. Our platform offers a comprehensive suite of features that
              ensure timely and accurate payroll processing, compliance with
              local regulations, and easy integration with existing systems.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-semibold mb-6">Our Mission</h2>
            <p className="text-lg leading-relaxed">
              Our mission is to empower businesses with efficient and reliable
              payroll solutions that save time, reduce errors, and enhance
              employee satisfaction. We are committed to delivering a
              user-friendly experience, robust security, and continuous
              innovation to meet the evolving needs of our clients.
            </p>
          </div>
        </div>

        {/* Our Values */}
        <div className="my-8 border-y-2 py-8">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Our Values
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="w-full md:w-1/3 p-4">
              <div className="bg-blue-100 p-8 rounded-lg shadow-md text-center">
                <Lightbulb className="h-12 w-12 text-blue-600 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                <p className="text-gray-700">
                  We continuously seek new ways to improve our platform and
                  deliver the best possible payroll solutions.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-4">
              <div className="bg-blue-100 p-8 rounded-lg shadow-md text-center">
                <ShieldCheck className="h-12 w-12 text-blue-600 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold mb-2">Integrity</h3>
                <p className="text-gray-700">
                  We operate with the highest standards of honesty and
                  transparency in everything we do.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-4">
              <div className="bg-blue-100 p-8 rounded-lg shadow-md text-center">
                <Users className="h-12 w-12 text-blue-600 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold mb-2">Customer Focus</h3>
                <p className="text-gray-700">
                  Our customers are at the heart of our business, and we are
                  dedicated to exceeding their expectations.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="my-8 border-b-2 py-8">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-sideBgClr p-8 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold mb-4">Expertise</h3>
              <p className="text-gray-700">
                With years of experience in payroll management, we bring
                unparalleled expertise to our clients, ensuring they receive the
                best service possible.
              </p>
            </div>
            <div className="bg-sideBgClr p-8 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold mb-4">Security</h3>
              <p className="text-gray-700">
                We prioritize the security of our clients' data, using
                state-of-the-art encryption and security protocols to protect
                sensitive information.
              </p>
            </div>
            <div className="bg-sideBgClr p-8 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold mb-4">Customer Support</h3>
              <p className="text-gray-700">
                Our customer support team is always ready to assist, ensuring
                that any issues are resolved quickly and efficiently.
              </p>
            </div>
          </div>
        </div>

        {/* Our History */}
        <div className="my-8 border-b-2 py-8">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Our History
          </h2>
          <p className="text-lg leading-relaxed text-center mx-auto max-w-3xl">
            Founded in [Year], Salarium started with a vision to revolutionize
            payroll management by creating a system that is both powerful and
            easy to use. Over the years, we have expanded our services, added
            new features, and continually improved our platform to meet the
            evolving needs of our clients. Today, we are proud to serve
            thousands of businesses worldwide, helping them manage payroll
            efficiently and effectively.
          </p>
        </div>

        {/* Our Team */}
        <div className="my-8 border-b-2 py-8">
          <h2 className="text-3xl font-semibold mb-8 text-center">Our Team</h2>
          <p className="text-lg leading-relaxed text-center mx-auto max-w-3xl">
            Our team consists of passionate professionals who are experts in
            their fields, ranging from software development to customer support.
            We are dedicated to making payroll management as seamless as
            possible for our clients. Our commitment to innovation, integrity,
            and customer focus drives us to constantly improve and adapt to new
            challenges.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
