"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/Redux/config/store";
import { fetchOrders, Order } from "@/Redux/slices/ordersSlice";

export default function OrderDetailsPage() {
  const { id } = useParams(); // Get order ID from URL
  const dispatch = useDispatch<AppDispatch>();
  const { data: orders, loading } = useSelector((state: RootState) => state.orders);
  const [order, setOrder] = useState<Order>();

  useEffect(() => {
    if (orders.length === 0) {
      dispatch(fetchOrders()); // Ensure orders are loaded
    }
  }, [dispatch, orders.length]);

  useEffect(() => {
    if (orders.length > 0) {
      const foundOrder = orders.find((order) => order.id === id);
      setOrder(foundOrder);
    }
  }, [orders, id]);

  if (loading) return <p>Loading order details...</p>;
  if (!order) return <p>Order not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-md">
      <h1 className="text-2xl font-bold mb-4">Order #{order.id}</h1>
      <p><strong>Reason:</strong> {order.reason}</p>
      <p><strong>Store Name:</strong> {order.store_name}</p>
      <p><strong>Amount:</strong> ${order.amount}</p>
      <p><strong>Status:</strong> {order.active ? "Active" : "Inactive"}</p>
    </div>
  );
}
