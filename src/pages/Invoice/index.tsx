import { deleteAsync, selectInvoice } from "../../redux/features/invoice/invoiceSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function Invoice() {
  let navigate = useNavigate();
  let location = useLocation();
  let params = useParams();
  const dispatch = useAppDispatch();
  const invoice = useAppSelector(selectInvoice(parseInt(params.invoiceId ?? "0")));

  return (
    <>
      {!invoice && <p>Not found!</p>}
      {invoice &&
        <main style={{ padding: "1rem" }}>
          <h2>Total Due: {invoice.amount}</h2>
          <p>
            {invoice.name}: {invoice.number}
          </p>
          <p>Due Date: {invoice.due.toString()}</p>
          <p>
            <button onClick={() => {
              dispatch(deleteAsync(parseInt(params.invoiceId ?? "0")));
              navigate("/invoices" + location.search);
            }}
            >
              Delete
            </button>
          </p>
        </main>
      }
    </>
  );
}