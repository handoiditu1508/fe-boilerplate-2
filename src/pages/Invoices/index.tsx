import { getAsync, selectError, selectInvoices, selectLoading } from "../../redux/features/invoice/invoiceSlice";

import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { useEffect } from "react";

export default function Invoices(){
  const dispatch = useAppDispatch();
  const invoices = useAppSelector(selectInvoices);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);

  useEffect(() => {
    dispatch(getAsync());
  }, [dispatch]);

  return (
    <>
      {loading && <p>Loading...</p>}
      {!loading && error && <p>error: {error}</p>}
      {!loading && <div style={{ display: "flex" }}>
        <nav
          style={{
            borderRight: "solid 1px",
            padding: "1rem",
          }}
        >
          {invoices
            .map((invoice) => (
              <p key={invoice.id}>{invoice.name}</p>
            ))}
        </nav>
      </div>}
    </>
  );
}