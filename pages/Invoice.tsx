import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const Invoice: NextPage = () => {
  return (
    <div className="bg-darkViolet sticky top-0 h-[72px] hidden md:flex  justify-between items-center drop-shadow-xl z-50">
      <p className="ml-8 mr-8 text-white font-semibold uppercase">Invoice</p>
    </div>
  );
};

export default Invoice;
