"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/Redux/config/store";
import {
  fetchOrders,
  toggleOrderStatus,
  updateOrderDecision,
} from "@/app/Redux/slices/ordersSlice";
import OrdersTable from "@/components/OrdersTable/OrdersTable";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";

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
      dispatch(toggleOrderStatus(id));
    };
  
    const handleDecisionChange = (id: string, decision: string) => {
      dispatch(updateOrderDecision({ id, decision }));
    };
  
    const handleViewDetails = (id: string) => {
      // Navigate to order details page
      router.push(`/orders/${id}`);
    };
  
    const tableHeaders = [
      { key: "id", label: "ID" },
      { key: "reason", label: "Reason" },
      { key: "store_name", label: "Store Name" },
      { key: "store_logo", label: "Store Logo" },
      { key: "store_url", label: "Store URL" },
      { key: "amount", label: "Amount" },
      { key: "active", label: "Active" },
      { key: "actions", label: "Actions" },
      { key: "view", label: "View" }
    ];
  return (
    
        <OrdersTable
              tableHeaders={tableHeaders}
              tableRows={orders}
              tableClassName="mx-auto"
              loading={loading}
              error={error}
              onToggleActive={handleToggleActive}
              onDecisionChange={handleDecisionChange}
              onViewDetails={handleViewDetails}/>
   
  )
}

export default OrdersPage