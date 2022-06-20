/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../components/Input";
import { reset, update } from "../redux/userSlice";

const Invoice: NextPage = ({ data, success }: any) => {
  // const phone_numberData: string = data.data[0].phone_number;
  // console.log(success);
  // console.log(phone_numberData);
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

  const [phoneRes, setPhoneRes] = useState({});
  const [active, setActive] = useState();
  /**
   * fetching student ID from API
   */
  async function fetchData() {
    try {
      let url = `https://nl-ns-apim-ds.azure-api.net/dev-darwin-lc/v1/customerSupport/getAddExtentiondata/${values.phone}`;
      const res: any = await axios({
        method: "GET",
        url: url,
        headers: {
          "Ocp-Apim-Subscription-Key": "23835e387fda4748b2aed408f9e90e8c",
        },
      });
      // console.log(res.data);
      // console.log(res.data[0]._id);
      setPhoneRes(res.data.data[0].phone_number);
      setValues({
        ...values,
        student_id: res.data.data[0]._id,
        learncab_id: res.data.data[0].student_id,
      });
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    if (values.phone.length == 10) {
      fetchData();
    }
  }, [values.phone]);

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

  const [error, setError] = useState({
    name: {
      error: false,
      message: "",
    },
    email: {
      error: false,
      message: "",
    },
    phone: {
      error: false,
      message: "",
    },
    student_id: {
      error: false,
      message: "",
    },
    learncab_id: {
      error: false,
      message: "",
    },
    address: {
      error: false,
      message: "",
    },
    city: {
      error: false,
      message: "",
    },
    state: {
      error: false,
      message: "",
    },
    pincode: {
      error: false,
      message: "",
    },
    country: {
      error: false,
      message: "",
    },
    gst_number: {
      error: false,
      message: "",
    },
    payment_id: {
      error: false,
      message: "",
    },
    date: {
      error: false,
      message: "",
    },
  });
  console.log(error);
  const [itemListError, setItemListError] = useState({
    description: {
      error: false,
      message: "",
      index: [],
    },
    price: {
      error: false,
      message: "",
      index: [],
    },
    amount_paid: {
      error: false,
      message: "",
      index: [],
    },
    plan_code: {
      error: false,
      message: "",
      index: [],
    },
    days: {
      error: false,
      message: "",
      index: [],
    },
    discount: {
      error: false,
      message: "",
      index: [],
    },
  });
  let [pdf, setPdf] = useState();

  const dispatch = useDispatch();
  const Name: string = useSelector((state: any) => state.detail.name);
  const Email: string = useSelector((state: any) => state.detail.email);
  const Phone: number = useSelector((state: any) => state.detail.phone);
  const StudentId: string = useSelector(
    (state: any) => state.detail.student_id
  );
  const LearncabId: string = useSelector(
    (state: any) => state.detail.learncab_id
  );
  const Address: string = useSelector((state: any) => state.detail.address);
  const City: string = useSelector((state: any) => state.detail.city);
  const State: string = useSelector((state: any) => state.detail.state);
  const Pincode: string = useSelector((state: any) => state.detail.pincode);
  const Country: string = useSelector((state: any) => state.detail.country);
  const GSTNo: string = useSelector((state: any) => state.detail.gst_number);
  const PaymentId: string = useSelector(
    (state: any) => state.detail.payment_id
  );
  const InvoiceDate: string = useSelector((state: any) => state.detail.date);

  const itemsDetails: any = useSelector((state: any) => state.detail.itemList);

  /**
   *
   * */
  let errorIncludes: any = [];

  for (let key in error) {
    // {console.log(key)}
    let obj = error[key]; 
    // console.log(obj);
    for (let prop in obj) {
      // console.log(prop);
      if (prop === "error") {
        errorIncludes.push(obj[prop]);
        // console.log(errorIncludes);
        console.log(obj[prop]);
        // console.log(errorIncludes);
      }
    }
  }

  // for (let key in itemListError) {
  //   let obj: any = itemListError[key];
  //   for (let prop in obj) {
  //     if (prop === "error") {
  //       errorIncludes.push(obj[prop]);
  //     }
  //   }
  // }
  useEffect(() => {
    return () => {
      const isActive = errorIncludes.some((item: boolean) => {
        console.log(item);
        item === true});
      console.log(isActive);
      setActive(isActive);
      // console.log(!isActive);
    };
  }, [errorIncludes]);

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    dispatch(
      update({
        values: values,
        itemList: itemList,
      })
    );

    let details = {
      name: Name,
      email: Email,
      phone: Phone,
      student_id: StudentId,
      learncab_id: LearncabId,
      address: Address,
      city: City,
      state: State,
      pincode: Pincode,
      country: Country,
      gst_number: GSTNo,
      payment_id: PaymentId,
      invoice_date: InvoiceDate,
      items: itemsDetails,
    };

    let apiUrl = "http://localhost:8000/invoy/api/v1/invoice/generateInvoice";

    axios({
      method: "post",
      url: apiUrl,
      data: details,
      headers: { "Content-Type": "application/Json" },
    })
      .then((response) => {
        //handle success
        // console.log(response);
        // console.log(response.data.fileurl);
        let urldata = response.data.fileurl;

        // Array.from(document.querySelectorAll("input")).forEach(
        //   (input) => (input.value = "")
        // );

        setPdf(urldata);
      })
      .catch((response) => {
        //handle error
        console.log(response);
      });
  }

  const handleSetErrors = (
    name: string,
    isValid: boolean,
    errorMessage: string
  ) => {
    setError({
      ...error,
      [name]: {
        error: isValid,
        message: errorMessage,
      },
    });
  };

  const handleChange = (inputValue: any, name: string) => {
    setValues({ ...values, [inputValue.target.name]: inputValue.target.value });

    const { value } = inputValue.target;
    // let emailReg = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/g;
    // let emailRegex = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    switch (name) {
      case "name":
        if (value.length < 3) {
          handleSetErrors(
            "name",
            true,
            "*name can't be less than 3 characters"
          );
        } else {
          handleSetErrors("name", false, "");
        }
        break;

      case "email":
        if (value.length < 6) {
          handleSetErrors(
            "email",
            true,
            "*email should be in the format axxxxx@gmail.com"
          );
        }
        // else if (!emailRegex.test(value.email)) {
        //   handleSetErrors(
        //     "email",
        //     true,
        //     "*email should be in the format ex.axxx@gmaxx.com"
        //   );
        // }
        else {
          handleSetErrors("email", false, "");
        }
        break;

      case "phone":
        if (value.length < 10) {
          handleSetErrors(
            "phone",
            true,
            "*Phone Number cannot be more than 10 number"
          );
        } else {
          handleSetErrors("phone", false, "");
        }
        break;

      // case "student_id":
      //   if (value.length < 3) {
      //     handleSetErrors("student_id", true, "*please Enter Student id");
      //   } else {
      //     handleSetErrors("student_id", false, "");
      //   }
      //   break;

      // case "learncab_id":
      //   if (value.length < 3) {
      //     handleSetErrors("learncab_id", true, "*please Enter Learncab id");
      //   } else {
      //     handleSetErrors("learncab_id", false, "");
      //   }
      //   break;

      case "address":
        if (value.length < 3) {
          handleSetErrors("address", true, "*please Enter your address");
        } else {
          handleSetErrors("address", false, "");
        }
        break;

      case "city":
        if (value.length < 3) {
          handleSetErrors("city", true, "*please Enter City name");
        } else {
          handleSetErrors("city", false, "");
        }
        break;

      case "state":
        if (value.length < 3) {
          handleSetErrors("state", true, "*Please Enter State name");
        } else {
          handleSetErrors("state", false, "");
        }
        break;
      case "pincode":
        if (value.length < 3) {
          handleSetErrors("pincode", true, "*pincode required");
        } else {
          handleSetErrors("pincode", false, "");
        }
        break;
      case "country":
        if (value.length < 3) {
          handleSetErrors("country", true, "*Please Enter country name");
        } else {
          handleSetErrors("country", false, "");
        }
        break;

      // case "gst_number":
      //   if (value.length < 3) {
      //     handleSetErrors("gst_number", true, "");
      //   } else {
      //     handleSetErrors("gst_number", false, "");
      //   }
      //   break;

      // case "date":
      //   if (value.length < 3) {
      //     handleSetErrors("date", true, "Invalid Date");
      //   } else {
      //     handleSetErrors("date", false, "");
      //   }
      //   break;
      default:
      // do nothing
    }
  };

  // const handleSetItemErrors = (
  //   name: string,
  //   isValid: boolean,
  //   errorMessage: string,
  //   indexNumber: number
  // ) => {
  //   let indexArrayValues;
  //   for (let key in itemListError) {
  //     let obj = itemListError[key]
  //     for (let prop in obj) {
  //       if (prop === "index") {
  //         indexArrayValues = obj[prop]
  //       }
  //     }
  //   }

  //   if (!isValid) {
  //     if (indexArrayValues.includes(indexNumber)) {
  //       indexArrayValues = indexArrayValues.filter(
  //         (item: number) => item != indexNumber
  //       );
  //     }
  //     setItemListError({
  //       ...itemListError,
  //       [name]: {
  //         errror: false,
  //         message: errorMessage,
  //         index: indexArrayValues,
  //       },
  //     });
  //   } else {
  //     if (!indexArrayValues.includes(indexNumber)) {
  //       indexArrayValues.push(indexNumber);
  //     }
  //     setItemListError({
  //       ...itemListError,
  //       [name]: {
  //         errror: true,
  //         message: errorMessage,
  //         index: indexArrayValues,
  //       },
  //     });
  //   }
  // };

  //   handleChange(i, event) {
  //     let values = [...this.state.values];
  //     values[i] = event.target.value;
  //     this.setState({ values });
  //  }

  const handleItemChange = (
    e: { target: { name: any; value: any } },
    index: number,
    inpName: string
  ) => {
    const { name, value } = e.target;
    const updatedItems = itemList.map((item, i) => {
      if (index === i) {
        return { ...item, [name]: value };
      } else {
        return item;
      }
    });
    setItemList(updatedItems);
    // switch (inpName) {
    //   case "description":
    //     if (value.length < 3) {
    //       handleSetItemErrors(
    //         "description",
    //         true,
    //         "*description required",
    //         index
    //       );
    //     } else {
    //       handleSetItemErrors("description", false, "", index);
    //     }
    //     break;
    //   case "price":
    //     if (value.length < 2) {
    //       handleSetItemErrors("price", true, "*price required", index);
    //     } else {
    //       handleSetItemErrors("price", false, "", index);
    //     }
    //     break;
    //   case "amount_paid":
    //     if (value.length < 2) {
    //       handleSetItemErrors(
    //         "amount_paid",
    //         true,
    //         "*amount Paid required",
    //         index
    //       );
    //     } else {
    //       handleSetItemErrors("amount_paid", false, "", index);
    //     }
    //     break;
    //   case "plan_code":
    //     if (value.length < 2) {
    //       handleSetItemErrors("plan_code", true, "*plan code required", index);
    //     } else {
    //       handleSetItemErrors("plan_code", false, "", index);
    //     }
    //     break;
    //   case "days":
    //     if (value.length < 2) {
    //       handleSetItemErrors("days", true, "*days required", index);
    //     } else {
    //       handleSetItemErrors("days", false, "", index);
    //     }
    //     break;
    //   case "discount":
    //     if (value.length < 2) {
    //       handleSetItemErrors("discount", true, "*discount required", index);
    //     } else {
    //       handleSetItemErrors("discount", false, "", index);
    //     }
    //     break;
    //   default:
    //   //do nothing
    // }
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

  interface NewType1 {
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

  interface NewType {
    description: string;
    price: string;
    amount_paid: string;
    plan_code: string;
    days: string;
    discount: string;
  }

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
                {/* {inputs.map((input) => (
                  <div className="md:mr-10" key={input.id}>
                    <Input
                      type={input.type}
                      name={input.name}
                      id={input.id}
                      title={input.title}
                      onChange={handleChange}
                      placeholder={input.placeholder}
                      error={error[input.name]}
                    />
                  </div>
                ))} */}
                <div className="md:mr-10">
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    title="Name / Business Name"
                    value={values.name || ""}
                    onChange={(value: any) => handleChange(value, "name")}
                    placeholder="Enter Name"
                    error={error.name}
                  />
                </div>

                <div className="md:mr-10">
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    title="Email"
                    value={values.email || ""}
                    onChange={(value: any) => handleChange(value, "email")}
                    placeholder="Enter Email"
                    error={error.email}
                  />
                </div>
                <div className="md:mr-10">
                  <Input
                    type="Number"
                    name="phone"
                    id="phone"
                    title="Phone No"
                    value={values.phone || ""}
                    onChange={(value: any) => handleChange(value, "phone")}
                    placeholder="Enter Phone No"
                    error={error.phone}
                  />
                </div>
                <div className="md:mr-10">
                  <label
                    htmlFor="student_id"
                    className="block text-gray-700 text-xs font-bold mb-1"
                  >
                    Student ID
                  </label>

                  {/*  */}
                  {values.phone == phoneRes ? (
                    <div>
                      <input
                        type="text"
                        placeholder="Enter Student ID"
                        name="student_id"
                        value={values.student_id}
                        readOnly
                        id="student_id"
                        className="block bg-gray-200 border-[1px] px-7 md:px-2 py-[2px] mb-1 rounded outline-none border-gray-400 placeholder:text-sm placeholder:font-[400] focus:border-blue-900 focus:outline-none focus:drop-shadow-xl"
                      />
                    </div>
                  ) : (
                    <div>
                      <input
                        type="text"
                        placeholder="Enter Student ID"
                        name="student_id"
                        value={values.student_id || ""}
                        onChange={(value: any) =>
                          handleChange(value, "student_id")
                        }
                        id="student_id"
                        className="block bg-gray-200 border-[1px] px-7 md:px-2 py-[2px] mb-1 rounded outline-none border-gray-400 placeholder:text-sm placeholder:font-[400] focus:border-blue-900 focus:outline-none focus:drop-shadow-xl"
                      />
                      <p className="text-red-600 text-xs mb-2">
                        {error.student_id.message}
                      </p>
                    </div>
                  )}
                </div>

                <div className="md:mr-10">
                  <label
                    htmlFor="student_id"
                    className="block text-gray-700 text-xs font-bold mb-1"
                  >
                    Learncab ID
                  </label>

                  {/*  */}
                  {values.phone == phoneRes ? (
                    <div>
                      <input
                        type="text"
                        placeholder="Enter Student ID"
                        name="learncab_id"
                        value={values.learncab_id}
                        readOnly
                        id="learncab_id"
                        className="block bg-gray-200 border-[1px] px-7 md:px-2 py-[2px] mb-1 rounded outline-none border-gray-400 placeholder:text-sm placeholder:font-[400] focus:border-blue-900 focus:outline-none focus:drop-shadow-xl"
                      />
                    </div>
                  ) : (
                    <div>
                      <input
                        type="text"
                        placeholder="Enter Student ID"
                        name="learncab_id"
                        value={values.learncab_id || ""}
                        onChange={(value: any) =>
                          handleChange(value, "learncab_id")
                        }
                        id="learncab_id"
                        className="block bg-gray-200 border-[1px] px-7 md:px-2 py-[2px] mb-1 rounded outline-none border-gray-400 placeholder:text-sm placeholder:font-[400] focus:border-blue-900 focus:outline-none focus:drop-shadow-xl"
                      />
                      <p className="text-red-600 text-xs mb-2">
                        {error.learncab_id.message}
                      </p>
                    </div>
                  )}
                </div>

                <div className="md:mr-10">
                  <Input
                    type="text"
                    name="address"
                    id="address"
                    title="Address"
                    value={values.address || ""}
                    onChange={(value: any) => handleChange(value, "address")}
                    placeholder="Enter Address"
                    error={error.address}
                  />
                </div>
                <div className="md:mr-10">
                  <Input
                    type="text"
                    name="city"
                    id="city"
                    title="City"
                    value={values.city || ""}
                    onChange={(value: any) => handleChange(value, "city")}
                    placeholder="Enter City"
                    error={error.city}
                  />
                </div>
                <div className="md:mr-10">
                  <Input
                    type="text"
                    name="state"
                    id="state"
                    title="State"
                    value={values.state || ""}
                    onChange={(value: any) => handleChange(value, "state")}
                    placeholder="Enter State"
                    error={error.state}
                  />
                </div>
                <div className="md:mr-10">
                  <Input
                    type="text"
                    name="pincode"
                    id="pincode"
                    title="Pincode"
                    value={values.pincode || ""}
                    onChange={(value: any) => handleChange(value, "pincode")}
                    placeholder="Enter Pincode"
                    error={error.pincode}
                  />
                </div>
                <div className="md:mr-10">
                  <Input
                    type="text"
                    name="country"
                    id="country"
                    title="Country"
                    value={values.country || ""}
                    onChange={(value: any) => handleChange(value, "country")}
                    placeholder="Enter Country"
                    error={error.country}
                  />
                </div>
                <div className="md:mr-10">
                  <Input
                    type="text"
                    name="gst_number"
                    id="gst_number"
                    title="GST Number"
                    value={values.gst_number || ""}
                    onChange={(value: any) => handleChange(value, "gst_number")}
                    placeholder="Enter GST Number"
                    error={error.gst_number}
                  />
                </div>
                <div className="md:mr-10">
                  <Input
                    type="text"
                    name="payment_id"
                    id="payment_id"
                    title="Payment ID"
                    value={values.payment_id || ""}
                    onChange={(value: any) => handleChange(value, "payment_id")}
                    placeholder="Enter Payment ID"
                    error={error.payment_id}
                  />
                </div>
                <div className="md:mr-10">
                  <Input
                    type="Date"
                    name="date"
                    id="date"
                    title="Date"
                    value={values.date || ""}
                    onChange={(value: any) => handleChange(value, "date")}
                    placeholder="Enter Date"
                    error={error.date}
                  />
                </div>
              </div>
              <div className="border-[1px] w-full bg-gray-200 border-gray-200 inline-block mb-2 drop-shadow-xl"></div>

              {/**
               * Items
               */}

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
                              value={itemList[i].description || ""}
                              onChange={(value: any) =>
                                handleItemChange(value, i, "description")
                              }
                              error={itemListError.description}
                              index={i}
                            />
                          </div>
                          <div className="md:mr-10">
                            <Input
                              type="Number"
                              name="price"
                              id="price"
                              title="Price"
                              placeholder="Enter Price"
                              onChange={(value: any) =>
                                handleItemChange(value, i, "price")
                              }
                              value={itemList[i].price || ""}
                              error={itemListError.price}
                              index={i}
                            />
                          </div>
                          <div className="md:mr-10">
                            <Input
                              type="Number"
                              name="amount_paid"
                              id="amount_paid"
                              title="Amount Paid"
                              placeholder="Enter Amount Paid"
                              value={itemList[i].amount_paid || ""}
                              onChange={(value: any) =>
                                handleItemChange(value, i, "amount_paid")
                              }
                              error={itemListError.amount_paid}
                              index={i}
                            />
                          </div>
                          <div className="md:mr-10">
                            <Input
                              type="string"
                              name="plan_code"
                              id="plan_code"
                              title="Plan Code"
                              placeholder="Enter Plan Code"
                              value={itemList[i].plan_code || ""}
                              onChange={(value: any) =>
                                handleItemChange(value, i, "plan_code")
                              }
                              error={itemListError.plan_code}
                              index={i}
                            />
                          </div>
                          <div className="md:mr-10">
                            <Input
                              type="Number"
                              name="days"
                              id="days"
                              title="Days"
                              placeholder="Enter Days"
                              value={itemList[i].days || ""}
                              onChange={(value: any) =>
                                handleItemChange(value, i, "days")
                              }
                              error={itemListError.days}
                              index={i}
                            />
                          </div>
                          <div className="md:mr-10">
                            <Input
                              type="string"
                              name="discount"
                              id="discount"
                              title="Discount"
                              placeholder="Enter Discount"
                              value={itemList[i].discount || ""}
                              onChange={(value: any) =>
                                handleItemChange(value, i, "discount")
                              }
                              error={itemListError.discount}
                              index={i}
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
                  disabled={!active}
                  type="submit"
                  // onClick={(e) => {
                  //   Array.from(document.querySelectorAll("input")).forEach(
                  //     (input) => (input.value = "")
                  //   );
                  //   setValues([{}]);
                  //   setItemList([{}]);
                  // }}
                  className="m-4 w-20 py-1 text-center text-white rounded  bg-darkViolet  disabled:opacity-40 disabled:bg-red-600  hover:bg-blue-800 hover:text-white"
                >
                  Submit
                </button>

                <button
                  type="reset"
                  className="m-4 w-20 py-1 text-center text-white rounded bg-darkViolet hover:bg-blue-800 hover:text-white"
                  // onClick={(e) => {
                  //   e.preventDefault();
                  //   dispatch(reset());

                  //   Array.from(document.querySelectorAll("input")).forEach(
                  //     (input) => (input.value = "")
                  //   );
                  //   setValues([{}]);
                  //   setItemList([{}]);
                  // }}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-span-3">
          <div className="flex flex-col items-center justify-center  md:w-[670px]  lg:w-auto min-h-[600px] border-2 m-4 bg-gray-300">
            <object
              data={pdf}
              type="application/pdf"
              className="w-[370px] h-[600px] md:w-[650px] md:h-[800px] lg:w-[440px] lg:h-[650px]"
            >
              <p className="text-center">
                Alternative text - include a link{" "}
                <a className="text-darkViolet font-bold underline" href={pdf}>
                  to the PDF!
                </a>
              </p>
            </object>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
