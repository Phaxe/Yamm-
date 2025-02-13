import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
const API_URL = process.env.NEXT_PUBLIC_MAIN_URL;
import api from "../config/apiService";

//Slice to manage request related to orders --- 


// Define the type for an order item
interface OrderItem {
  name: string;
  id: string;
  price: number;
  quantity: number;
}

// Define the type for a single order
export interface Order {
  id: string;
  reason: string;
  store_name: string;
  store_logo: string;
  store_url: string;
  amount: number;
  active: boolean;
  decision: null | "reject" | "accept" | "escalate";
  Items: OrderItem[];
}

// Define the slice state type
interface OrdersState {
  data: Order[];
  loading: boolean;
  error: string | null;
  status: boolean;
}

// Initial state
const initialState: OrdersState = {
  data: [],
  loading: false,
  error: null,
  status: false,
};

// Async thunk for fetching orders
export const fetchOrders = createAsyncThunk("orders/fetch", async () => {
  try {
    const response = await api.get(`/orders`);
    return response.data; // Assuming the API returns an array of orders
  } catch (error: any) {
    throw error.response?.data?.message || "Failed to fetch orders";
  }
});

//Updating the order status API call
export const toggleOrderStatus = createAsyncThunk(
  "orders/toggleOrderStatus",
  async (id: string, { rejectWithValue, getState }) => {
    try {
      const state: any = getState();
      const order = state.orders.data.find((order: any) => order.id === id);

      if (!order) return rejectWithValue("Order not found");

      const updatedActive = !order.active;

      const response = await api.put(`/orders/${id}`, {
        active: updatedActive,
      });

      return response.data; // Return the updated order from the API
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to update order status"
      );
    }
  }
);

//Updating the decision API call
export const updateOrderDecision = createAsyncThunk(
  "orders/updateOrderDecision",
  async (
    {
      id,
      decision,
    }: { id: string; decision: "reject" | "accept" | "escalate" },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.put(`/orders/${id}`, { decision });
      return response.data; // Ensure API returns updated order
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to update decision"
      );
    }
  }
);

// Create the Redux slice
const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchOrders.fulfilled,
        (state, action: PayloadAction<Order[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(toggleOrderStatus.fulfilled, (state, action) => {
        const updatedOrder = action.payload;
        state.data = state.data.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order
        );
      })
      .addCase(updateOrderDecision.fulfilled, (state, action) => {
        const updatedOrder = action.payload;
        state.data = state.data.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order
        );
      });
  },
});

export default ordersSlice.reducer;
