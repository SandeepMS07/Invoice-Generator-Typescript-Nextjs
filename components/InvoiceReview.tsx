import { useSelector } from "react-redux";

const InvoiceReview = () => {
  const pdfurl : string = useSelector((state: any) => state.detail.pdf);
  return (
    <div>
      <object
        data={pdfurl}
        type="application/pdf"
        // width="100%"
        // height="100%"
        className="w-[370px] h-[600px] md:w-[650px] md:h-[800px] lg:w-[510px] lg:h-[600px]"
      >
        <p>
          Alternative text - include a link{" "}
          <a className="text-darkViolet font-bold underline" href={pdfurl}>
            to the PDF!
          </a>
        </p>
      </object>
    </div>
  );
};

export default InvoiceReview;
