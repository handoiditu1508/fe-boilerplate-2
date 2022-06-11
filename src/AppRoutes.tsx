import { Route, Routes } from "react-router-dom";

import App from "./App";
import Home from "./pages/Home";
import Invoice from "./pages/Invoice";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import React from "react";
import RequireAuth from "./components/RequireAuth";
import Suspense from "./components/Suspense";
import logo from "./assets/logo.svg";

const Expenses = React.lazy(() => import("./pages/Expenses"));
const Invoices = React.lazy(() => import("./pages/Invoices"));

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="expenses" element={<Suspense><Expenses /></Suspense>} />
        <Route path="invoices" element={<Suspense><Invoices /></Suspense>}>
          <Route index
            element={
              <main style={{ padding: "1rem" }}>
                <p>Select an invoice</p>
              </main>
            }
          />
          <Route path=":invoiceId" element={<Invoice />} />
        </Route>
        <Route path="login" element={<Suspense><Login /></Suspense>} />
        <Route path="profile" element={<RequireAuth><Suspense><Profile /></Suspense></RequireAuth>} />
        <Route path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Route>
    </Routes>
  );
}