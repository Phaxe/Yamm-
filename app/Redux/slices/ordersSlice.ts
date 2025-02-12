

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
// import api from "../config/apiService";
// Define the type for an order item
interface OrderItem {
  name: string;
  id: string;
  price: number;
  quantity: number;
}

// Define the type for a single order
interface Order {
  Id: string;
  reason: string;
  store_name: string;
  store_logo: string;
  store_url: string;
  amount: number;
  active: boolean;
  decision: null | string;
  Items: OrderItem[];
}

// Define the slice state type
interface OrdersState {
  data: Order[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: OrdersState = {
  data: [],
  loading: false,
  error: null,
};

// Async thunk for fetching orders
export const fetchOrders = createAsyncThunk("orders/fetch", async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_MAIN_URL}/orders`
    );
    return response.data; // Assuming the API returns an array of orders
  } catch (error: any) {
    throw error.response?.data?.message || "Failed to fetch orders";
  }
});

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
    }
})

export default ordersSlice.reducer;
