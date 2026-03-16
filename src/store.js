import { configureStore, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./api/axios";

/* ======================================================
   API CALLS
====================================================== */

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      // Assuming your custom axios instance has the baseURL set, 
      // we just need the endpoint route here.
      const response = await axios.get("/products");
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
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
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
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
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
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          return state.filter((i) => i._id !== item._id);
        }
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
      // Adding new orders to the beginning of the array so they show up first
      state.unshift(action.payload);
    },
    setOrders: (state, action) => {
      return action.payload;
    },
  },
});

/* ======================================================
   STORE CONFIGURATION
====================================================== */

const store = configureStore({
  reducer: {
    products: productSlice.reducer,
    cart: cartSlice.reducer,
    orders: orderSlice.reducer,
  },
  devTools: import.meta.env.DEV, // Enables Redux DevTools only in development mode
});

/* ======================================================
   LOCAL STORAGE SYNC
====================================================== */

// Subscribe to store updates to persist the cart
store.subscribe(() => {
  try {
    const cart = store.getState().cart;
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (err) {
    console.error("Could not save cart to localStorage", err);
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

export default store;