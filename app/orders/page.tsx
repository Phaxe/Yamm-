"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/Redux/config/store";
import {
  fetchOrders,
  toggleOrderStatus,
  updateOrderDecision,
} from "@/Redux/slices/ordersSlice";
import OrdersTable from "@/components/OrdersTable/OrdersTable";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function OrdersPage() {

  const dispatch = useDispatch<AppDispatch>();

  // handling data inside my state from my ordersSlice and storing data
  const {
    data: orders = [],
    loading,
    error,
  } = useSelector((state: RootState) => state.orders);

//To fetch the data on page load and pass it to the table 
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

//To handle the active status inside the table and displaying notification depending on the API request status
  const handleToggleActive = (id: string) => {
    dispatch(toggleOrderStatus(id))
      .then((action) => {
        if (toggleOrderStatus.fulfilled.match(action)) {
          toast.success("Order status updated successfully!");
        } else if (toggleOrderStatus.rejected.match(action)) {
          toast.error("Failed to update order status.");
        }
      })
      .catch(() => {
        toast.error("An error occurred while updating order status.");
      });
  };

//To handle the decision change inside the table and displaying notification depending on the API request status
  const handleDecisionChange = (id: string, decision: string) => {
    dispatch(updateOrderDecision({ id, decision: decision as "reject" | "accept" | "escalate" }))
      .then((action) => {
        if (updateOrderDecision.fulfilled.match(action)) {
          toast.success(`Order decision updated to ${decision}!`);
        } else if (updateOrderDecision.rejected.match(action)) {
          toast.error("Failed to update order decision.");
        }
      })
      .catch(() => {
        toast.error("An error occurred while updating order decision.");
      });
  };


//Here to pass the max item per page and the total page to dynamicly pass it through tables
  const maxItems = 15;
  const totalPages = Math.ceil(orders.length / maxItems); // Calculate total pages

// Here to pass table headers depending on the table needs 
  const tableHeaders = [
    { key: "id", label: "ID" },
    { key: "reason", label: "Reason" },
    { key: "store_name", label: "Store Name" },
    { key: "store_logo", label: "Store Logo" },
    { key: "store_url", label: "Store URL" },
    { key: "amount", label: "Amount" },
    { key: "active", label: "Active" },
    { key: "actions", label: "Actions" },
    { key: "view", label: "View" },
  ];
//calling and passing props to the generic table 
  return (
    <OrdersTable
      tableHeaders={tableHeaders}
      tableRows={orders}
      tableClassName="my-10"
      loading={loading}
      maxItems={15}
      totalPages={totalPages}
      error={error}
      onToggleActive={handleToggleActive}
      onDecisionChange={handleDecisionChange}
    />
  );
}

export default OrdersPage;