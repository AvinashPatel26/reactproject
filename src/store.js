import { configureStore, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* ======================================================
   API CONFIG
====================================================== */
const API_URL =
  (import.meta.env.VITE_API_URL || "http://localhost:8080/api") + "/products";

/* ======================================================
   ASYNC PRODUCT FETCH (MATCHES BACKEND)
====================================================== */
export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchByCategory",
  async (category) => {
    const response = await axios.get(`${API_URL}/${category}`);
    return { category, data: response.data };
  }
);

/* ======================================================
   PRODUCT SLICE
====================================================== */
const productSlice = createSlice({
  name: "products",
  initialState: {
    veg: [],
    nonVeg: [],
    milk: [],
    chocolate: [],
    status: "idle",
    error: null,
  },
  reducers: {
    setVeg: (state, action) => {
      state.veg = action.payload;
    },
    setNonVeg: (state, action) => {
      state.nonVeg = action.payload;
    },
    setMilk: (state, action) => {
      state.milk = action.payload;
    },
    setChocolate: (state, action) => {
      state.chocolate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state[action.payload.category] = action.payload.data;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

/* ======================================================
   CART SLICE
====================================================== */
const initialCartState = JSON.parse(localStorage.getItem("cart")) || [];

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {

    addToCart(state, action) {
      const item = state.find((p) => p._id === action.payload._id);

      if (item) {
        item.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },

    removeFromCart(state, action) {
      return state.filter((item) => item._id !== action.payload._id);
    },

    increaseItem(state, action) {
      const item = state.find((p) => p._id === action.payload._id);
      if (item) item.quantity += 1;
    },

    decreaseItem(state, action) {
      const item = state.find((p) => p._id === action.payload._id);

      if (item) {
        if (item.quantity > 1) item.quantity -= 1;
        else return state.filter((i) => i._id !== item._id);
      }
    },

    clearCart() {
      return [];
    },

  },
});
/* ======================================================
   ORDER SLICE
====================================================== */
const orderSlice = createSlice({
  name: "orders",
  initialState: [],
  reducers: {
    addOrder: (state, action) => {
      state.push(action.payload);
    },
    setOrders: (state, action) => {
      return action.payload;
    },
  },
});

/* ======================================================
   STORE CONFIG
====================================================== */
const store = configureStore({
  reducer: {
    products: productSlice.reducer,
    cart: cartSlice.reducer,
    orders: orderSlice.reducer,
  },
});

/* ======================================================
   LOCAL STORAGE
====================================================== */
store.subscribe(() => {
  localStorage.setItem("cart", JSON.stringify(store.getState().cart));
});

/* ======================================================
   EXPORTS
====================================================== */
export const {
  setVeg,
  setNonVeg,
  setMilk,
  setChocolate,
} = productSlice.actions;

export const {
  addToCart,
  removeFromCart,
  increaseItem,
  decreaseItem,
  clearCart,
} = cartSlice.actions;

export const { addOrder, setOrders } = orderSlice.actions;

export default store;
