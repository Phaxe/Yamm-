"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/Redux/config/store";
import {
  createOrder,
  deleteOrder,
  fetchOrders,
  Order,
  toggleOrderStatus,
  updateOrderDecision,
} from "@/Redux/slices/ordersSlice";
import OrdersTable from "@/components/OrdersTable/OrdersTable";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AddOrderModal from "@/components/OrderModal/OrderModal";

interface OrderItem {
  name: string;
  id: string;
  price: number;
  quantity: number;
}

interface OrderData {
  id: string;
  reason: string;
  store_name: string;
  store_logo: string;
  store_url: string;
  amount: number;
  active: boolean;
  decision: null;
  Items: OrderItem[];
}
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

  //Add new order Modal and form 
  //this use state can me updated to reusable hook--
  const [isModalOpen, setModalOpen] = useState(false);
  const handleAddOrder = async (newOrder: OrderData) => {
    try {
      const resultAction = await dispatch(createOrder(newOrder)).unwrap();
  
      if (resultAction) {
        toast.success("Order created successfully!");
        setModalOpen(false); // Close modal on success
      }
    } catch (error) {
      toast.error("Failed to create order.");
    }
  };

// Handling deleting order request
const handleDeleteOrder = async (id: string) => {
  try {
    const resultAction = await dispatch(deleteOrder(id)).unwrap();
    if (resultAction) {
      toast.error("Order deleted successfully!");
    }
  } catch (error) {
    toast.error("Failed to delete order.");
  }
};

//Handling search functionality
const [searchQuery, setSearchQuery] = useState("");

const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setSearchQuery(e.target.value);
};

const filterOrders = (orders: Order[], query: string) => {
  if (!query) return orders;

  const lowerCaseQuery = query.toLowerCase();
  return orders.filter(order => {
    return (
      order.reason.toLowerCase().includes(lowerCaseQuery) ||
      order.store_name.toLowerCase().includes(lowerCaseQuery) ||
      order.store_url.toLowerCase().includes(lowerCaseQuery) ||
      order.id.toString().includes(lowerCaseQuery)
    );
  });
};

const filteredOrders = filterOrders(orders, searchQuery);


//Here to pass the max item per page and the total page to dynamicly pass it through tables
  const maxItems = 15;
  const totalPages = Math.ceil(filteredOrders.length / maxItems); // Calculate total pages

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
    { key: "delete", label: "Delete" }
  ];
//calling and passing props to the generic table 
return (
  <div className="w-full flex flex-col items-center justify-center mt-10">
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Search by Reason, Store Name, Store URL, or ID"
          value={searchQuery}
          onChange={handleSearchChange}
          className="border p-2 w-full md:w-1/2"
        />
        <Button onClick={() => setModalOpen(true)} className="flex-end self-end">
          Add new order
        </Button>
      </div>
      <div className="w-full">
        <OrdersTable
          tableHeaders={tableHeaders}
          tableRows={filteredOrders}
          tableClassName="my-10 w-full"
          loading={loading}
          maxItems={15}
          totalPages={totalPages}
          error={error}
          onToggleActive={handleToggleActive}
          onDecisionChange={handleDecisionChange}
          deleteOrder={handleDeleteOrder}
        />
      </div>
    </div>
    {isModalOpen && (
      <AddOrderModal
        onSubmit={(values) => handleAddOrder(values as OrderData)}
        onClose={() => setModalOpen(false)}
      />
    )}
  </div>
);
}

export default OrdersPage;