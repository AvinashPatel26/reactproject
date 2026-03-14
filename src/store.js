import { configureStore, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./api/axios";

/* ======================================================
   API CALL
====================================================== */

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {

      const response = await axios.get("/api/products");

      return response.data || [];

    } catch (error) {

      return rejectWithValue(
        error.response?.data || "Server Error"
      );

    }
  }
);

/* ======================================================
   PRODUCT SLICE
====================================================== */

const productSlice = createSlice({

  name: "products",

  initialState: {
    products: [],
    status: "idle",
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {

    builder

      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

  },

});

/* ======================================================
   CART SLICE
====================================================== */

const getCartFromStorage = () => {

  try {
    return JSON.parse(localStorage.getItem("cart")) || [];
  } catch {
    return [];
  }

};

const cartSlice = createSlice({

  name: "cart",

  initialState: getCartFromStorage(),

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
   STORE
====================================================== */

const store = configureStore({

  reducer: {
    products: productSlice.reducer,
    cart: cartSlice.reducer,
    orders: orderSlice.reducer,
  },

  devTools: import.meta.env.DEV,

});

/* ======================================================
   LOCAL STORAGE
====================================================== */

store.subscribe(() => {

  try {

    const cart = store.getState().cart;

    localStorage.setItem("cart", JSON.stringify(cart));

  } catch {}

});

/* ======================================================
   EXPORTS
====================================================== */

export { fetchProducts };

export const {
  addToCart,
  removeFromCart,
  increaseItem,
  decreaseItem,
  clearCart,
} = cartSlice.actions;

export const { addOrder, setOrders } = orderSlice.actions;

export default store;