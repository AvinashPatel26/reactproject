import { configureStore, createSlice, current } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    veg: [
  { id: 1001, name: "Paneer Butter Masala", price: 180, imageurl: "/images/paneerbuttermasala.jpeg", description: "Rich, creamy curry with soft paneer cubes." },
  { id: 1002, name: "Masala Dosa", price: 90, imageurl: "/images/masaladosa.webp", description: "Crispy dosa stuffed with spiced potatoes." },
  { id: 1003, name: "Veg Fried Rice", price: 120, imageurl: "/images/friedrice.jpg", description: "Stir-fried rice with mixed vegetables." },
  { id: 1004, name: "Dal Tadka", price: 100, imageurl: "/images/daltadka.jpeg", description: "Yellow lentils tempered with ghee and spices." },
  { id: 1005, name: "Idli Sambar", price: 80, imageurl: "/images/idlisambhar.jpeg", description: "Soft idlis served with flavorful sambar." },
  { id: 1006, name: "Chole Bhature", price: 150, imageurl: "/images/cholebhature.jpg", description: "Fluffy bhature with spicy chickpea curry." },
  { id: 1007, name: "Pav Bhaji", price: 120, imageurl: "/images/pavbhaji.jpg", description: "Buttery pav with spicy mashed vegetable curry." },
  { id: 1008, name: "Rajma Chawal", price: 110, imageurl: "/images/rajmachawal.jpg", description: "Red kidney beans curry served with rice." },
  { id: 1009, name: "Aloo Paratha", price: 90, imageurl: "/images/alooparatha.jpeg", description: "Stuffed flatbread with spiced potatoes." },
  { id: 1010, name: "Pani Puri", price: 70, imageurl: "/images/Pani_puri.jpg", description: "Tangy and spicy street food favorite." },
  { id: 1011, name: "Veg Pulao", price: 130, imageurl: "/images/vegimage.jpeg", description: "Fragrant rice with mixed vegetables." },
  { id: 1012, name: "Butter Naan", price: 50, imageurl: "/images/butternaan.jpg", description: "Soft naan topped with melted butter." },
  { id: 1013, name: "Kadhai Paneer", price: 190, imageurl: "/images/kadhaipaneer.jpg", description: "Paneer cooked with capsicum and spices." },
  { id: 1014, name: "Veg Hakka Noodles", price: 140, imageurl: "/images/veghakkanoodles.webp", description: "Stir-fried noodles with fresh vegetables." },
  { id: 1015, name: "Dhokla", price: 80, imageurl: "/images/dhokla.jpeg", description: "Soft and spongy Gujarati snack." },
  { id: 1016, name: "Malai Kofta", price: 200, imageurl: "/images/malaikofta.webp", description: "Creamy curry with fried dumplings." },
  { id: 1017, name: "Veg Manchurian", price: 150, imageurl: "/images/vegmanchurian.jpeg", description: "Crispy veg balls in spicy Manchurian sauce." },
  { id: 1018, name: "Stuffed Capsicum", price: 160, imageurl: "/images/stuffedcapcicum.jpeg", description: "Capsicum stuffed with spicy potato filling." },
  { id: 1019, name: "Palak Paneer", price: 180, imageurl: "/images/palakpaneer.jpg", description: "Paneer cubes in a creamy spinach gravy." },
  { id: 1020, name: "Gulab Jamun", price: 80, imageurl: "/images/gulabjamun.jpg", description: "Soft, sweet dumplings soaked in syrup." }
]
,
    nonVeg: [
      { id: 2001, name: "Chicken Biryani", price: 250, imageurl: "/images/chickenbiryani.jpeg", description: "Aromatic rice with chicken." },
      { id: 2002, name: "Mutton Rogan Josh", price: 320, imageurl: "/images/muttonroganjosh.jpeg", description: "Rich Kashmiri mutton curry." },
      { id: 2003, name: "Grilled Fish", price: 280, imageurl: "/images/grilledfish.jpeg", description: "Fresh fish grilled with herbs." },
      { id: 2004, name: "Butter Chicken", price: 300, imageurl: "/images/butterchicken.jpeg", description: "Creamy tomato gravy with chicken." },
      { id: 2005, name: "Prawn Masala", price: 350, imageurl: "/images/prawnmasala.jpeg", description: "Spicy prawn curry with onions." },
      { id: 2006, name: "Chicken Shawarma", price: 180, imageurl: "/images/chickenshwarna.jpeg", description: "Middle Eastern wrap with chicken." },
      { id: 2007, name: "Fish Curry", price: 260, imageurl: "/images/fishcurry.jpeg", description: "Tangy fish curry with coconut milk." },
      { id: 2008, name: "Egg Curry", price: 150, imageurl: "/images/eggcurry.jpeg", description: "Spicy egg curry with onions." },
      { id: 2009, name: "Chicken Fry", price: 220, imageurl: "/images/chickenfry.jpeg", description: "Crispy fried chicken." },
      { id: 2010, name: "Mutton Kebab", price: 280, imageurl: "/images/muttonkebab.jpeg", description: "Smoky grilled mutton kebabs." },
      { id: 2011, name: "Chicken Soup", price: 120, imageurl: "/images/chickensoup.jpg", description: "Warm chicken broth with spices." },
      { id: 2012, name: "Fish Fry", price: 250, imageurl: "/images/fishfry.jpeg", description: "Crispy fried fish." },
      { id: 2013, name: "Prawn Fry", price: 270, imageurl: "/images/prawnfry.jpeg", description: "Golden fried prawns." },
      { id: 2014, name: "Chicken Curry", price: 280, imageurl: "/images/chickencurry.jpeg", description: "Traditional chicken curry." },
      { id: 2015, name: "Lamb Chops", price: 400, imageurl: "/images/lambchops.jpeg", description: "Grilled lamb chops with spices." },
      { id: 2016, name: "Crab Masala", price: 420, imageurl: "/images/crabmasala.jpeg", description: "Spicy crab curry with masala." },
      { id: 2017, name: "Duck Roast", price: 450, imageurl: "/images/duckroast.jpeg", description: "Roast duck with Indian spices." },
      { id: 2018, name: "Egg Omelette", price: 80, imageurl: "/images/eggomlette.jpeg", description: "Fluffy omelette with veggies." },
      { id: 2019, name: "Fish Tikka", price: 300, imageurl: "/images/fishtikka.jpeg", description: "Spicy grilled fish tikka." },
      { id: 2020, name: "Mutton Biryani", price: 350, imageurl: "/images/muttonbiryani.jpeg", description: "Fragrant biryani with mutton." }
    ],
    milk: [
      { id: 3001, name: "Full Cream Milk", price: 60, imageurl: "/images/fullcreammilk.webp", description: "Rich and creamy cow milk, ideal for desserts." },
      { id: 3002, name: "Toned Milk", price: 50, imageurl: "/images/tonedmilk.png", description: "Nutritious and low-fat milk, perfect for daily use." },
      { id: 3003, name: "Skimmed Milk", price: 55, imageurl: "/images/skimmedmilk.webp", description: "Fat-free milk, high in protein and calcium." },
      { id: 3004, name: "Organic Cow Milk", price: 70, imageurl: "/images/organiccowmilk.jpeg", description: "Fresh organic milk, free from chemicals." },
      { id: 3005, name: "Buffalo Milk", price: 65, imageurl: "/images/buffalomilk.jpeg", description: "Creamy buffalo milk rich in calcium." },
      { id: 3006, name: "Almond Milk", price: 120, imageurl: "/images/almondmilk.avif", description: "Vegan alternative made from almonds." },
      { id: 3007, name: "Soy Milk", price: 90, imageurl: "/images/soymilk.jpg", description: "Plant-based milk rich in protein." },
      { id: 3008, name: "Coconut Milk", price: 100, imageurl: "/images/coconutmilk.avif", description: "Creamy milk extracted from coconuts." },
      { id: 3009, name: "Goat Milk", price: 95, imageurl: "/images/goatmillk.webp", description: "Easily digestible milk alternative." },
      { id: 3010, name: "Chocolate Milk", price: 40, imageurl: "/images/chocolatemilk.jpeg", description: "Delicious chocolate-flavored milk." },
      { id: 3011, name: "Strawberry Milk", price: 40, imageurl: "/images/strawberrymilk.jpeg", description: "Refreshing strawberry-flavored milk." },
      { id: 3012, name: "Vanilla Milk", price: 40, imageurl: "/images/vanillamilk.jpeg", description: "Smooth vanilla-flavored milk." },
      { id: 3013, name: "Curd", price: 80, imageurl: "/images/curd.jpeg", description: "Thick and creamy curd made from milk." },
      { id: 3014, name: "Paneer", price: 250, imageurl: "/images/paneer.jpeg", description: "Fresh cottage cheese rich in protein." },
      { id: 3015, name: "Cheddar Cheese", price: 320, imageurl: "/images/cheddarcheese.jpeg", description: "Sharp and tangy cheese block." },
      { id: 3016, name: "Mozzarella Cheese", price: 300, imageurl: "/images/mozarellacheeze.jpeg", description: "Soft cheese perfect for pizzas." },
      { id: 3017, name: "Butter", price: 200, imageurl: "/images/butter.jpeg", description: "Creamy salted butter." },
      { id: 3018, name: "Ghee", price: 500, imageurl: "/images/ghee.jpeg", description: "Traditional desi ghee." },
      { id: 3019, name: "Milk Powder", price: 350, imageurl: "/images/powdermilk.jpeg", description: "Instant milk powder for baking." },
      { id: 3020, name: "Kheer", price: 150, imageurl: "/images/kheer.jpeg", description: "Indian dessert made with milk and rice." }
    ],
    chocolate: [
      { id: 4001, name: "Milk Chocolate", price: 120, imageurl: "/images/milkchocolate.jpeg", description: "Smooth milk chocolate." },
      { id: 4002, name: "Dark Chocolate 70%", price: 150, imageurl: "/images/darkchocolate.jpeg", description: "Rich dark chocolate with 70% cocoa." },
      { id: 4003, name: "White Chocolate", price: 130, imageurl: "/images/whitechocolate.jpeg", description: "Sweet creamy white chocolate." },
      { id: 4004, name: "Hazelnut Chocolate", price: 160, imageurl: "/images/hazelnutchocolate.jpeg", description: "Chocolate with roasted hazelnuts." },
      { id: 4005, name: "Almond Chocolate", price: 170, imageurl: "/images/almondchocolate.jpeg", description: "Chocolate with whole almonds." },
      { id: 4006, name: "Caramel Chocolate", price: 140, imageurl: "/images/caramelchocolate.jpeg", description: "Chocolate with gooey caramel filling." },
      { id: 4007, name: "Fruit & Nut Chocolate", price: 160, imageurl: "/images/fruitnutchocolate.jpeg", description: "Raisins and nuts in smooth chocolate." },
      { id: 4008, name: "Mint Chocolate", price: 150, imageurl: "/images/mintchocolate.jpeg", description: "Refreshing mint with chocolate." },
      { id: 4009, name: "Chocolate Cookies", price: 200, imageurl: "/images/chocolatecookies.jpeg", description: "Cookies loaded with choco chips." },
      { id: 4010, name: "Brownie", price: 180, imageurl: "/images/brownie.jpeg", description: "Gooey chocolate brownie." },
      { id: 4011, name: "Chocolate Cake", price: 220, imageurl: "/images/chocolatecake.jpeg", description: "Moist chocolate sponge cake." },
      { id: 4012, name: "Chocolate Muffin", price: 150, imageurl: "/images/chocolatemuffin.jpeg", description: "Muffin with choco chunks." },
      { id: 4013, name: "Chocolate Ice Cream", price: 100, imageurl: "/images/chocolateicecream.jpeg", description: "Creamy cocoa ice cream." },
      { id: 4014, name: "Hot Chocolate", price: 120, imageurl: "/images/hotchocolate.jpeg", description: "Warm drink topped with cream." },
      { id: 4015, name: "Chocolate Milkshake", price: 130, imageurl: "/images/chocolatemilkshake.jpeg", description: "Thick milkshake with syrup." },
      { id: 4016, name: "Chocolate Truffle", price: 200, imageurl: "/images/chocolatetruffle.jpeg", description: "Cocoa-coated rich truffles." },
      { id: 4017, name: "Chocolate Pastry", price: 160, imageurl: "/images/chocolatepastry.jpeg", description: "Fluffy chocolate pastry." },
      { id: 4018, name: "Belgian Chocolate", price: 250, imageurl: "/images/belgianchocolate.jpeg", description: "Premium Belgian chocolate." },
      { id: 4019, name: "Swiss Chocolate", price: 280, imageurl: "/images/swisschocolate.jpeg", description: "Imported Swiss chocolate." },
      { id: 4020, name: "Chocolate Donut", price: 90, imageurl: "/images/chocolatedonut.jpeg", description: "Donut with chocolate glaze." }
    ]
  },
  reducers: {}
});

 
const initialState = JSON.parse(localStorage.getItem("cart")) || [];


  let cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
   addToCart(state, action) {
      const item = state.find(product => product.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart(state, action) {
      const index = state.findIndex(item => item.id === action.payload.id);
      if (index !== -1) state.splice(index, 1);
    },
    increaseItem(state, action) {
      const index = state.findIndex(item => item.id === action.payload.id);
      if (index !== -1) state[index].quantity += 1;
    },
    decreaseItem(state, action) {
      const index = state.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        if (state[index].quantity > 1) {
          state[index].quantity -= 1;
        } else {
          state.splice(index, 1);
        }
      }
    },
    clearCart(){
      return [];
    }
  }
});
const orderSlice = createSlice({
  name : "order",
  initialState: [],
  reducers: {
    addOrder: (state, action) => {
      state.push(action.payload);
    }
  }
});

// const userSlice = createSlice({
//   name: "user",
//   initialState: { user:[], isAuthenticated: false , currentUser: null},
//   reducers: {
//     registerUser: (state, action) => {
//       state.user.push(action.payload);
//     },
//     loginUser: (state, action) => {
//       const { userName, password } = action.payload;
//       const user = state.user.find(user => user.userName === userName && user.password === password);
//       if (user) {
//         state.currentUser = user;
//         state.isAuthenticated = true;
//       }
//     }
//   }
// });

// -------------------- Authentication Slice --------------------
const loadAuthState = () => {
  try {
    const saved = localStorage.getItem("auth");
    return saved ? JSON.parse(saved) : { users: [], currentUser: null, isAuthenticated: false };
  } catch {
    return { users: [], currentUser: null, isAuthenticated: false };
  }
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState: loadAuthState(),
  reducers: {
    registerUser: (state, action) => {
      state.users.push(action.payload);
    },
    loginUser: (state, action) => {
      const { username, password } = action.payload;
      const foundUser = state.users.find(
        (user) => user.username === username && user.password === password
      );
      if (foundUser) {
        state.currentUser = foundUser;
        state.isAuthenticated = true;
      } else {
        state.currentUser = null;
        state.isAuthenticated = false;
      }
    },
    logoutUser: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
    },
  },
});

// export the reducer
export let {addOrder} = orderSlice.actions

// Subscribe to store updates


// Configure Store
const store = configureStore({
  reducer: {
    products: productSlice.reducer,
    cart: cartSlice.reducer,
    orders: orderSlice.reducer,
    authentication: authenticationSlice.reducer,
  }
});


store.subscribe(() => {
    localStorage.setItem("cart", JSON.stringify(store.getState().cart))
    localStorage.setItem("authentication", JSON.stringify(store.getState().authentication))
  })

export const { addToCart, removeFromCart, increaseItem, decreaseItem, clearCart} = cartSlice.actions;
export const { registerUser, loginUser, logoutUser } = authenticationSlice.actions;
export default store;