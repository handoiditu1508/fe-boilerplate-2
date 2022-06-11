import { deleteAsync, selectInvoice } from "../../redux/features/invoice/invoiceSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";

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
          <p>Due Date: {invoice.due}</p>
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