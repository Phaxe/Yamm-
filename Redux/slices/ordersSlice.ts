import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
const API_URL = process.env.NEXT_PUBLIC_MAIN_URL;
import api from "../config/apiService";
import { Order, OrderData, OrdersState, OrderItem } from "@/app/types/orderTypes";
//Slice to manage request related to orders --- 




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

// Async thunk for creating a new order
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (newOrder: Order, { rejectWithValue }) => {
    try {
      const response = await api.post(`/orders`, newOrder);
      return response.data; // Assuming API returns the created order
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to create order"
      );
    }
  }
);


// Async thunk for deleting a new order
export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/orders/${id}`);
      return id; // Return the ID of the deleted order
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to delete order"
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
      })
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.loading = false;
        state.data.push(action.payload); // Add new order to the state
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create order";
      })
      .addCase(deleteOrder.fulfilled, (state, action: PayloadAction<string>) => {
        state.data = state.data.filter((order) => order.id !== action.payload); // Remove the deleted order from the state
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.error = action.error.message || "Failed to delete order";
      });
  },
});

export default ordersSlice.reducer;
