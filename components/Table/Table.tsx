"use client"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ChevronDown, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { RootState, AppDispatch } from "@/app/Redux/config/store";
import { fetchOrders } from "@/app/Redux/slices/ordersSlice";
import Image from "next/image";

export default function OrdersTable() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: orders = [], loading, error } = useSelector((state: RootState) => state.orders);
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleDecisionChange = (id: string, decision: string) => {
    // Dispatch action to update order decision in Redux (if needed)
  };

  // const toggleActive = (id: string) => {
  //   // Dispatch action to update active status in Redux (if needed)
  // };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;
console.log(orders);

  return (
    <div className="overflow-x-auto">
      <table className="w-[1200px] mx-auto border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Reason</th>
            <th className="p-3 text-left">Store Name</th>
            <th className="p-3 text-left">Logo</th>
            <th className="p-3 text-left">URL</th>
            <th className="p-3 text-left">Amount</th>
            <th className="p-3 text-left">Active</th>
            <th className="p-3 text-left">Decisions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.Id} className="border-t">
              <td className="p-3">{order.Id}</td>
              <td className="p-3">{order.reason}</td>
              <td className="p-3 flex items-center space-x-2">
                <Image width={100} height={100}  src="/vercel.svg" alt={order.store_name} className="w-8 h-8 rounded-full" />
                <a href={order.store_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  {order.store_name}
                </a>
              </td>
              <td className="p-3">${order.amount.toFixed(2)}</td>
              <td className="p-3">
                {/* <Switch checked={order.active} onCheckedChange={() => toggleActive(order.Id)} /> */}
                hi
              </td>
              <td className="p-3">{order.Items.length}</td>
              <td className="p-3">{order.decision || "Not Yet"}</td>
              <td className="p-3 flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      Change <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleDecisionChange(order.Id, "Reject")}>Reject</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDecisionChange(order.Id, "Accept")}>Accept</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDecisionChange(order.Id, "Escalate")}>Escalate</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="ghost" size="icon" onClick={() => router.push(`/orders/${order.Id}`)}>
                  <Eye className="w-5 h-5" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}