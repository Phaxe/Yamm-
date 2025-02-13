"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/Redux/config/store";
import { fetchOrders, Order } from "@/Redux/slices/ordersSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { data: orders, loading } = useSelector((state: RootState) => state.orders);
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (orders.length === 0) {
      dispatch(fetchOrders());
    }
  }, [dispatch, orders.length]);

  useEffect(() => {
    if (orders.length > 0) {
      const foundOrder = orders.find((order) => order.id === id);
      setOrder(foundOrder || null);
    }
  }, [orders, id]);

  if (loading) return <p>Loading order details...</p>;
  if (!order) return <p>Order not found.</p>;

  return (
    <div className="w-[1000px]  m-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Order #{order.id}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <Image src={order.store_logo} alt={order.store_name} width={50} height={50} className="rounded-full" />
            <div>
              <h2 className="text-lg font-semibold">{order.store_name}</h2>
              <Link
                href={order.store_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Visit Store
              </Link>
            </div>
          </div>

          <p><strong>Reason:</strong> {order.reason}</p>
          <p><strong>Amount:</strong> ${order.amount}</p>
          <p><strong>Status:</strong> {order.active ? "Active" : "Inactive"}</p>
          <p><strong>Decision:</strong> {order.decision}</p>

          <h3 className="mt-4 text-lg font-semibold">Items</h3>
          <ul className="mt-2 space-y-2">
            {order.Items.map((item) => (
              <li key={item.id} className="flex justify-between border-b pb-2">
                <span>{item.name} (x{item.quantity})</span>
                <span>${item.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
