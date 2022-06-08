import type { NextPage } from "next";
import Head from "next/head";
import { FormEvent, useState } from "react";
import Input from "../components/Input";

const Invoice: NextPage = () => {
  interface values {
    name: string;
    email: any;
    phone: number;
    student_id: string;
    learncab_id: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    gst_number: string;
    payment_id: string;
    date: string;
  }

  let [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    student_id: "",
    learncab_id: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    gst_number: "",
    payment_id: "",
    date: "",
  });

  interface itemList {
    description: string;
    price: number;
    amount_paid: number;
    plan_code: string;
    days: number;
    discount: string;
  }
  [];
  let [itemList, setItemList] = useState([
    {
      description: "",
      price: "",
      amount_paid: "",
      plan_code: "",
      days: "",
      discount: "",
    },
  ]);

  const [error, setError] = useState({});
  const [itemListError, setItemListError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    console.log(values);
    console.log(itemList);
  }

  const handleChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // setItemList({ ...itemList, [e.target.name]: e.target.value });
    setError(valid(values));
  };

  const handleItemChange = (
    e: { target: { name: any; value: any } },
    index: number
  ) => {
    const { name, value } = e.target;
    // setItemList({ ...itemList, [name]: value });
    const list = [...itemList];
    list[index][name] = value;
    setItemList(list);
    setItemListError(validation(itemList));
  };
  const handleaddclick = () => {
    setItemList([
      ...itemList,
      {
        description: "",
        price: "",
        amount_paid: "",
        plan_code: "",
        days: "",
        discount: "",
      },
    ]);
  };

  const handleremove = (index: any) => {
    const list = [...itemList];
    list.splice(index, 1);
    setItemList(list);
  };

  const inputs = [
    {
      type: "text",
      placeholder: "Enter Name",
      name: "name",
      id: "name",
      title: "Name",
    },
    {
      type: "email",
      placeholder: "Enter Email",
      name: "email",
      id: "email",
      title: "Email",
    },
    {
      type: "Number",
      placeholder: "Enter Phone No",
      name: "phone",
      id: "phone",
      title: "Phone No",
    },
    {
      type: "text",
      placeholder: "Enter Student ID",
      name: "student_id",
      id: "student_id",
      title: "Student ID",
    },
    {
      type: "text",
      placeholder: "Enter LearnCab ID",
      name: "learncab_id",
      id: "learncab_id",
      title: "LearnCab ID",
    },
    {
      type: "text",
      placeholder: "Enter Address",
      name: "address",
      id: "address",
      title: "Address",
    },
    {
      type: "text",
      placeholder: "Enter City",
      name: "city",
      id: "city",
      title: "City",
    },
    {
      type: "text",
      placeholder: "Enter State",
      name: "state",
      id: "state",
      title: "State",
    },
    {
      type: "text",
      placeholder: "Enter Pincode",
      name: "pincode",
      id: "pincode",
      title: "Pincode",
    },
    {
      type: "text",
      placeholder: "Enter Country",
      name: "country",
      id: "country",
      title: "Country",
    },
    {
      type: "text",
      placeholder: "Enter GST Number",
      name: "gst_number",
      id: "gst_number",
      title: "GST Number",
    },
    {
      type: "text",
      placeholder: "Enter Payment ID",
      name: "payment_id",
      id: "payment_id",
      title: "Payment ID",
    },
    {
      type: "Date",
      placeholder: "Enter Date",
      name: "date",
      id: "date",
      title: "Date",
    },
  ];

  interface NewType {
    name: string;
    email: string;
    phone: string;
    student_id: string;
    learncab_id: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    gst_number: string;
    payment_id: string;
    date: string;
  }

  // function valid(values: {
  //   name: string;
  //   email: string;
  //   phone: string;
  //   student_id: string;
  //   learncab_id: string;
  //   address: string;
  //   city: string;
  //   state: string;
  //   pincode: string;
  //   country: string;
  //   gst_number: string;
  //   payment_id: string;
  //   date: string;
  // }): import("react").SetStateAction<{}> {
  //   let errors = {};

  //   return errors;
  // }

  let valid = (value: NewType) => {
    let errors: any = {};

    let emailReg = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/g;
    let mobileReg =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g;

    //!  name
    if (!value.name) {
      errors.name = "*Name required";
    }

    //!  email
    if (!value.email) {
      errors.email = "*Email required";
    } else if (!emailReg.test(value.email)) {
      errors.email = "*email should be in the format ex.axxx@gmaxx.com";
    }

    //!  Phone number
    if (!value.phone) {
      errors.phone = "*phonenumber required";
    }

    //!  Student id
    if (!value.student_id) {
      errors.student_id = "*Student id required";
    }

    //!  Learncab id
    if (!value.learncab_id) {
      errors.learncab_id = "*Learncab id required";
    }

    //!   Address
    if (!value.address) {
      errors.address = "*address required";
    }

    //!   city
    if (!value.city) {
      errors.city = "*city required";
    }

    //!   state
    if (!value.state) {
      errors.state = "*state required";
    }

    //!   pincode
    if (!value.pincode) {
      errors.pincode = "*pincode required";
    }

    //!   country
    if (!value.country) {
      errors.country = "*country required";
    }

    //!   gst_number
    if (!value.gst_number) {
      errors.gst_number = "*gst_number required";
    }

    //!  Payment id
    if (!value.payment_id) {
      errors.payment_id = "*Payment id required";
    }

    //!  invoice_date
    if (!value.date) {
      errors.date = "*invoice datFe required";
    }

    return errors;
  };

  interface NewType {
    description: string;
    price: string;
    amount_paid: string;
    plan_code: string;
    days: string;
    discount: string;
  }

  /**
   * itemList
   */
  let validation = (itemList: NewType): import("react").SetStateAction<{}> => {
    let errors: any = {};

    //! description
    if (!itemList.description) {
      errors.description = "*description required";
    }

    //! price
    if (!itemList.price) {
      errors.price = "*price required";
    }

    //! amount_paid
    if (!itemList.amount_paid) {
      errors.amount_paid = "*amount paid required";
    }

    //! plan_code
    if (!itemList.plan_code) {
      errors.plan_code = "*plan code required";
    }

    //! days
    if (!itemList.days) {
      errors.days = "*days required";
    }

    //! discount
    if (!itemList.discount) {
      errors.discount = "*discount required";
    }

    return errors;
  };

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
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="flex flex-col justify-center items-center border-2 md:border-2 m-9 mx-12 md:m-4 p-4"
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 w-full">
                {inputs.map((input) => (
                  <div className="md:mr-10" key={input.id}>
                    <Input
                      type={input.type}
                      name={input.name}
                      id={input.id}
                      title={input.title}
                      onChange={handleChange}
                      placeholder={input.title}
                      error={error[input.name]}
                    />
                  </div>
                ))}
              </div>
              <div className=" border-[1px] w-full bg-gray-200 border-gray-200 inline-block mb-2 drop-shadow-xl"></div>
              {/* Items */}
              <div className="flex flex-col w-full">
                <label
                  htmlFor=""
                  className="block text-gray-700 text-sm font-bold"
                >
                  Items:
                </label>
                {itemList.map((x, i) => {
                  return (
                    <div key={i}>
                      <div className="border-[1px] w-full mt-1 bg-gray-200  border-gray-200 inline-block mb-1 drop-shadow-xl"></div>
                      <div>
                        <div className="grid md:grid-cols-3">
                          <div className="md:mr-10">
                            <Input
                              type="text"
                              name="description"
                              id="description"
                              title="Description"
                              placeholder="Enter Description"
                              onChange={(e: any) => {
                                handleItemChange(e, i);
                              }}
                              error={itemListError.description}
                            />
                          </div>
                          <div className="md:mr-10">
                            <Input
                              type="Number"
                              name="price"
                              id="price"
                              title="Price"
                              placeholder="Enter Price"
                              onChange={(e: any) => {
                                handleItemChange(e, i);
                              }}
                              error={itemListError.price}
                            />
                          </div>
                          <div className="md:mr-10">
                            <Input
                              type="Number"
                              name="amount_paid"
                              id="amount_paid"
                              title="Amount Paid"
                              placeholder="Enter Amount Paid"
                              onChange={(e: any) => {
                                handleItemChange(e, i);
                              }}
                              error={itemListError.amount_paid}
                            />
                          </div>
                          <div className="md:mr-10">
                            <Input
                              type="string"
                              name="plan_code"
                              id="plan_code"
                              title="Plan Code"
                              placeholder="Enter Plan Code"
                              onChange={(e: any) => {
                                handleItemChange(e, i);
                              }}
                              error={itemListError.plan_code}
                            />
                          </div>
                          <div className="md:mr-10">
                            <Input
                              type="Number"
                              name="days"
                              id="days"
                              title="Days"
                              placeholder="Enter Days"
                              onChange={(e: any) => {
                                handleItemChange(e, i);
                              }}
                              error={itemListError.days}
                            />
                          </div>
                          <div className="md:mr-10">
                            <Input
                              type="string"
                              name="discount"
                              id="discount"
                              title="Discount"
                              placeholder="Enter Discount"
                              onChange={(e: any) => {
                                handleItemChange(e, i);
                              }}
                              error={itemListError.discount}
                            />
                          </div>
                        </div>
                        <div className="flex justify-end items-center mr-6">
                          <div>
                            {itemList.length !== 1 && (
                              <button
                                className="m-4 w-20 py-2 text-xs text-white rounded bg-red-600 hover:bg-red-500 border-red-500 hover:text-white"
                                onClick={() => handleremove(i)}
                              >
                                Delete
                              </button>
                            )}
                          </div>
                          <div>
                            {itemList.length - 1 === i && (
                              <button
                                className="m-4 w-20 py-2 text-xs text-white rounded bg-darkViolet hover:bg-blue-800 hover:text-white"
                                onClick={handleaddclick}
                              >
                                Add Items
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="border-[1px] w-full mt-4 bg-gray-200  border-gray-200 inline-block mb-1 drop-shadow-xl"></div>
              <div className="flex flex-row">
                <button
                  type="submit"
                  className="m-4 w-20 py-1 text-center text-white rounded  bg-darkViolet hover:bg-blue-800 hover:text-white"
                >
                  Submit
                </button>
                <button
                  type="reset"
                  className="m-4 w-20 py-1 text-center text-white rounded bg-darkViolet hover:bg-blue-800 hover:text-white"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-span-3">
          <div className="flex flex-col items-center justify-center  md:w-[670px]  lg:w-auto min-h-[600px] border-2 m-4 bg-gray-300">
            <p>name: {JSON.stringify(values.name)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;