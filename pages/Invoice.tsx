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

  const [res, setRes] = useState({});

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
      console.log(res.data);
      // console.log(res.data[0]._id);
      setRes(res.data.data[0].phone_number);
      setValues({ ...values, student_id: res.data.data[0]._id });
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
    name: false,
    email: false,
    phone: false,
    student_id: false,
    learncab_id: false,
    address: false,
    city: false,
    state: false,
    pincode: false,
    country: false,
    gst_number: false,
    payment_id: false,
    date: false,
  });
  const [itemListError, setItemListError] = useState({
    description: "",
    price: "",
    amount_paid: "",
    plan_code: "",
    days: "",
    discount: "",
  });
  const [isSubmit, setIsSubmit] = useState(false);
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

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    console.log(values);
    console.log(itemList);
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
    console.log(details);
    let apiUrl = "http://localhost:8000/invoy/api/v1/invoice/generateInvoice";
    // {
    //   error &&
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
        // setValues([{}]);
        // setItemList([{}]);
        setPdf(urldata);
      })
      .catch((response) => {
        //handle error
        console.log(response);
      });
    // }
  }

  const handleChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });

    // setItemList({ ...itemList, [e.target.name]: e.target.value });
    setError(valid(values));
    // console.log(values);
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

  let valid = (value: NewType1) => {
    let errors: any = {};

    let emailReg = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/g;
    let mobileReg =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g;

    // switch (value) {
    //   case "name":
    //     if (!value.name) {
    //       errors.name = "*Name required";
    //     }
    //     break;

    //   default:
    //     break;
    // }
    //!  name
    if (!value.name) {
      setError({ ...error, name: true });
      errors.name = "*Name required";
    }
    //!  email
    if (!value.email) {
      setError({ ...error, email: true });
      errors.email = "*Email required";
    } else if (!emailReg.test(value.email)) {
      setError({ ...error, email: true });
      errors.email = "*email should be in the format ex.axxx@gmaxx.com";
    }

    //!  Phone number
    if (!value.phone) {
      setError({ ...error, phone: true });
      errors.phone = "*phonenumber required";
    }

    //!  Student id
    if (!value.student_id) {
      setError({ ...error, student_id: true });
      errors.student_id = "*Student id required";
    }

    //!  Learncab id
    if (!value.learncab_id) {
      setError({ ...error, learncab_id: true });
      errors.learncab_id = "*Learncab id required";
    }

    //!   Address
    if (!value.address) {
      setError({ ...error, address: true });
      errors.address = "*address required";
    }

    //!   city
    if (!value.city) {
      setError({ ...error, city: true });
      errors.city = "*city required";
    }

    //!   state
    if (!value.state) {
      setError({ ...error, state: true });
      errors.state = "*state required";
    }

    //!   pincode
    if (!value.pincode) {
      setError({ ...error, pincode: true });
      errors.pincode = "*pincode required";
    }

    //!   country
    if (!value.country) {
      setError({ ...error, country: true });
      errors.country = "*country required";
    }

    //!  Payment id
    if (!value.payment_id) {
      setError({ ...error, payment_id: true });
      errors.payment_id = "*Payment id required";
    }

    // //!  invoice_date
    // if (!value.date) {
    //   errors.date = "*invoice date required";
    // }

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
                    value={values.name}
                    onChange={handleChange}
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
                    value={values.email}
                    onChange={handleChange}
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
                    value={values.phone}
                    // onChange={handleChangePhoneNumber}
                    onChange={handleChange}
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
                  {values.phone == res ? (
                    <input
                      type="text"
                      placeholder="Enter Student ID"
                      name="student_id"
                      defaultValue={values.student_id}
                      readOnly
                      id="student_id"
                      className="block bg-gray-200 border-[1px] px-7 md:px-2 py-[2px] mb-1 rounded outline-none border-gray-400 placeholder:text-sm placeholder:font-[400] focus:border-blue-900 focus:outline-none focus:drop-shadow-xl"
                    />
                  ) : (
                    <div>
                      <input
                        type="text"
                        placeholder="Enter Student ID"
                        name="student_id"
                        value={values.student_id}
                        onChange={handleChange}
                        id="student_id"
                        className="block bg-gray-200 border-[1px] px-7 md:px-2 py-[2px] mb-1 rounded outline-none border-gray-400 placeholder:text-sm placeholder:font-[400] focus:border-blue-900 focus:outline-none focus:drop-shadow-xl"
                      />
                      <p className="text-red-600 text-xs mb-2">
                        {error.student_id}
                      </p>
                    </div>
                  )}
                </div>
                <div className="md:mr-10">
                  <Input
                    type="text"
                    name="learncab_id"
                    id="learncab_id"
                    title="Learncab ID"
                    value={values.learncab_id}
                    onChange={handleChange}
                    placeholder="Enter Learncab ID"
                    error={error.learncab_id}
                  />
                </div>
                <div className="md:mr-10">
                  <Input
                    type="text"
                    name="address"
                    id="address"
                    title="Address"
                    value={values.address}
                    onChange={handleChange}
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
                    value={values.city}
                    onChange={handleChange}
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
                    value={values.state}
                    onChange={handleChange}
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
                    value={values.pincode}
                    onChange={handleChange}
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
                    value={values.country}
                    onChange={handleChange}
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
                    value={values.gst_number}
                    onChange={handleChange}
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
                    value={values.payment_id}
                    onChange={handleChange}
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
                    value={values.date}
                    onChange={handleChange}
                    placeholder="Enter Date"
                    error={error.date}
                  />
                </div>
              </div>
              <div className="border-[1px] w-full bg-gray-200 border-gray-200 inline-block mb-2 drop-shadow-xl"></div>
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
                              value={itemList[0].description}
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
                              value={itemList[0].price}
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
                              value={itemList[0].amount_paid}
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
                              value={itemList[0].plan_code}
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
                              value={itemList[0].days}
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
                              value={itemList[0].discount}
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
                  // onClick={(e) => {
                  //   Array.from(document.querySelectorAll("input")).forEach(
                  //     (input) => (input.value = "")
                  //   );
                  //   setValues([{}]);
                  //   setItemList([{}]);
                  // }}
                  className="m-4 w-20 py-1 text-center text-white rounded  bg-darkViolet hover:bg-blue-800 hover:text-white"
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
              // width="100%"
              // height="100%"
              className="w-[370px] h-[600px] md:w-[650px] md:h-[800px] lg:w-[510px] lg:h-[600px]"
            >
              <p>
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

// export async function getServerSideProps() {
//   console.log("came here");
//   let url = `https://nl-ns-apim-ds.azure-api.net/dev-darwin-lc/v1/customerSupport/getAddExtentiondata/9916965096`;
//   const res = await axios({
//     method: "GET",
//     url: url,
//     headers: {
//       "Ocp-Apim-Subscription-Key": "23835e387fda4748b2aed408f9e90e8c",
//     },
//   });
//   return {
//     props: {
//       data: res.data,
//       success: true,
//     },
//   };
// }
