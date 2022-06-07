import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Input from "../components/Input";

const Invoice: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Invoice</title>
      </Head>
      <header className="bg-darkViolet sticky top-0 h-[72px] hidden md:flex  justify-between items-center drop-shadow-xl z-50">
        <p className="ml-8 mr-8 text-white font-semibold uppercase">Invoice</p>
      </header>
      <div className="grid lg:grid-cols-8 md:grid-cols-4 divide-x m-1 border-[1px]">
        <div className="md:col-span-5">
          <div>
            <form className="flex flex-col justify-center items-center border-2 md:border-2 m-9 mx-12 md:m-4 p-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 w-full">
                <div className="md:mr-10">
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    title="Name"
                    placeholder="Enter Name"
                  />
                </div>
                <div className="md:mr-10">
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    title="Email"
                    placeholder="Enter Email"
                  />
                </div>
                <div className="md:mr-10">
                  <Input
                    type="Number"
                    placeholder="Enter Phone No"
                    name="phone"
                    id="phone"
                    title="Phone No"
                  />
                </div>
                <div className="md:mr-10">
                  <Input
                    type="text"
                    placeholder="Enter Student ID"
                    name="student_id"
                    id="student_id"
                    title="Student ID"
                  />
                </div>
                <div className="md:mr-10">
                  <Input
                    type="text"
                    placeholder="Enter LearnCab ID"
                    name="learncab_id"
                    id="learncab_id"
                    title="LearnCab ID"
                  />
                </div>
                <div className="md:mr-10">
                  <Input
                    type="text"
                    placeholder="Enter Address"
                    name="address"
                    id="address"
                    title="Address"
                  />
                </div>
                <div className="md:mr-10">
                  <Input
                    type="text"
                    placeholder="Enter City"
                    name="city"
                    id="city"
                    title="City"
                  />
                </div>
                <div className="md:mr-10">
                  <Input
                    type="text"
                    placeholder="Enter State"
                    name="state"
                    id="state"
                    title="State"
                  />
                </div>
                <div className="md:mr-10">
                  <Input
                    type="text"
                    placeholder="Enter Pincode"
                    name="pincode"
                    id="pincode"
                    title="Pincode"
                  />
                </div>
                <div className="md:mr-10">
                  <Input
                    type="text"
                    placeholder="Enter Country"
                    name="country"
                    id="country"
                    title="Country"
                  />
                </div>
                <div className="md:mr-10">
                  <Input
                    type="text"
                    placeholder="Enter GST Number"
                    name="gst_number"
                    id="gst_number"
                    title="GST Number"
                  />
                </div>
                <div className="md:mr-10">
                  <Input
                    type="text"
                    placeholder="Enter Payment ID"
                    name="payment_id"
                    id="payment_id"
                    title="Payment ID"
                  />
                </div>
                <div className="md:mr-10">
                  <Input
                    type="Date"
                    placeholder="Enter Date"
                    name="date"
                    id="date"
                    title="Date"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
