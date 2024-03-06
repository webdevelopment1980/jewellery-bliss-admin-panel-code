import { Routes, Route } from "react-router-dom";
import MultiStepForm from "./components/ProductsManagment/AddProducts/MultiStepForm";
import ProductGrid from "./components/ProductsManagment/FetchAndUpdate/ProductsGrid";
import ProductManagement from "./components/ProductsManagment/ProductManagement";
import Login from "./pages/Auth/Login";
import { useEffect, useState } from "react";
import SidebarWithHeader from "./components/SidebarWithHeader/SidebarWithHeader";
import HomeDashboard from "./components/Dash/Home";
import UserTable from "./components/UserManagment/UsersTable";
import OrdersTable from "./components/ProductsManagment/FetchAndUpdate/OrderTable";
import OrderDetails from "./components/ProductsManagment/FetchAndUpdate/SingleOrder";
import RegisterForm from "./components/he/SalespersonRegister";

import TabsSalesPerson from "./components/he/TabsSalesPerson";
import UpdatePerson from "./components/he/UpdatePerson";
import SinglePerson from "./components/he/SinglePerson";
import GoldPriceTable from "./components/Charts/GoldTable";
import MakingChargesTable from "./components/makingcharges/makingCharges";
import BookingsTable from "./components/Bookings/Booking";
import CustomOrders from "./components/CustomOrders/customorders";
import CustomOrdersDetails from "./components/CustomOrders/singleCustomOrder";
import PremiumCharges from "./components/Premium/premium";
import editPremiumCharges from "./components/Premium/editpremium";

function App() {
  const [initialLoad, setInitialLoad] = useState(true);
  const [loggedIn, setLoggedIn] = useState(() => {
    const token = localStorage.getItem("token");
    return token ? true : false;
  });
  useEffect(() => {
    setLoggedIn(() => {
      const token = localStorage.getItem("token");
      return token ? true : false;
    });
    setTimeout(() => {
      setInitialLoad((prev) => false);
    }, 1000);
    console.log("loggedIn:", loggedIn);
  }, [loggedIn]);

  return (
    <>
      {initialLoad ? (
        <>Loading...</>
      ) : (
        <>
          {loggedIn ? (
            <SidebarWithHeader setLoggedIn={setLoggedIn}>
              <Routes>
                {loggedIn ? (
                  <>
                    <Route path="/" element={<HomeDashboard />} />
                    <Route path="/products" element={<ProductManagement />} />
                    <Route path="/dealers" element={<UserTable />} />
                    <Route path="/orders" element={<OrdersTable />} />
                    <Route path="/orders/:orderId" element={<OrderDetails />} />
                    <Route path="/add-salesperson" element={<RegisterForm />} />
                    <Route path="/salesperson" element={<TabsSalesPerson />} />
                    <Route
                      path="/salesperson/update/:personId"
                      element={<UpdatePerson />}
                    />
                    <Route
                      path="/salesperson/:personId"
                      element={<SinglePerson />}
                    />
                    <Route path="/pricetable" element={<GoldPriceTable />} />
                    <Route
                      path="/makingcharges"
                      element={<MakingChargesTable />}
                    />
                    <Route path="/bookings" element={<BookingsTable />} />
                    <Route path="/customorders" element={<CustomOrders />} />
                    <Route
                      path="/Singlecustomorders/:orderId"
                      element={<CustomOrdersDetails />}
                    />
                    <Route
                      path="/PremiumCharges"
                      element={<PremiumCharges />}
                    />
                    <Route
                      path="/editPremiumCharges"
                      element={<editPremiumCharges />}
                    />
                  </>
                ) : (
                  <>
                    <Route
                      path="*"
                      element={<Login setLoggedIn={setLoggedIn} />}
                    />{" "}
                  </>
                )}
              </Routes>
            </SidebarWithHeader>
          ) : (
            <Routes>
              <Route path="*" element={<Login setLoggedIn={setLoggedIn} />} />
            </Routes>
          )}
        </>
      )}
    </>
  );
}

export default App;
