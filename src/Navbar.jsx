import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import api from "./api/axios";
import { Navbar } from "react-bootstrap";

/* ======================================================
   FETCH PRODUCTS BY CATEGORY
====================================================== */

export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchByCategory",
  async (category, { rejectWithValue }) => {
    try {
      const response = await api.get(`/products/${category}`);

      return {
        category,
        data: response.data,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Server Error");
    }
  },
);

/* ======================================================
   PRODUCT SLICE
====================================================== */

const productSlice = createSlice({
  name: "products",

  initialState: {
    veg: [],
    nonveg: [],
    milk: [],
    chocolate: [],
    status: "idle",
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchProductsByCategory.pending, (state) => {
        state.status = "loading";
      })

      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.status = "succeeded";

        const { category, data } = action.payload;

        if (state[category] !== undefined) {
          state[category] = data;
        }
      })

      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.status = "failed";

        state.error = action.payload || action.error.message;
      });
  },
});

/* ======================================================
   CART SLICE
====================================================== */

const getCartFromStorage = () => {
  try {
    const saved = localStorage.getItem("cart");

    return saved ? JSON.parse(saved) : [];
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
        state.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },

    removeFromCart(state, action) {
      return state.filter((item) => item._id !== action.payload._id);
    },

    increaseItem(state, action) {
      const item = state.find((p) => p._id === action.payload._id);

      if (item) {
        item.quantity += 1;
      }
    },

    decreaseItem(state, action) {
      const item = state.find((p) => p._id === action.payload._id);

      if (!item) return;

      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        return state.filter((i) => i._id !== item._id);
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
    addOrder(state, action) {
      state.push(action.payload);
    },

    setOrders(state, action) {
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

  devTools: import.meta.env.DEV,
});

/* ======================================================
   LOCAL STORAGE PERSISTENCE
====================================================== */

store.subscribe(() => {
  try {
    const cart = store.getState().cart;

    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Cart storage failed:", error);
  }
});

/* ======================================================
   EXPORTS
====================================================== */

export const {
  addToCart,
  removeFromCart,
  increaseItem,
  decreaseItem,
  clearCart,
} = cartSlice.actions;

export const { addOrder, setOrders } = orderSlice.actions;

export default Navbar;
