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
  const {
    data: orders = [],
    loading,
    error,
  } = useSelector((state: RootState) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

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

  const handleDecisionChange = (id: string, decision: string) => {
    dispatch(updateOrderDecision({ id, decision }))
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



  const maxItems = 15;
  const totalPages = Math.ceil(orders.length / maxItems); // Calculate total pages
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