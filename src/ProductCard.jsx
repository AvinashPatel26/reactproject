import React from "react";

function ProductCard({
  item,
  cartItem,
  addToCart,
  increaseItem,
  decreaseItem,
  BACKEND_URL
}) {
  const imageSrc = item.imageurl
    ? `${BACKEND_URL}${item.imageurl}`
    : "/images/default.png";

  return (
    // Added: h-full, flex, and flex-col to the outer container
    <div className="bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden h-full flex flex-col">
      
      <img
        src={imageSrc}
        alt={item.name}
        className="w-full h-40 object-cover"
      />

      {/* Added: flex, flex-col, and flex-grow so this section expands */}
      <div className="p-4 flex flex-col flex-grow">
        
        {/* Changed items-center to items-start in case the title wraps to two lines */}
        <div className="flex justify-between items-start gap-2">
          {/* Added: line-clamp-2 to prevent super long titles from breaking the layout */}
          <h3 className="font-semibold line-clamp-2">
            {item.name}
          </h3>
          {/* Added: shrink-0 so the price tag doesn't get squished by a long title */}
          <span className="bg-green-600 text-white px-3 py-1 text-sm rounded-full shrink-0">
            ₹{item.price}
          </span>
        </div>

        {/* Added: line-clamp-2 to keep descriptions to a uniform 2 lines */}
        <p className="text-gray-500 text-sm mt-2 line-clamp-2">
          {item.description}
        </p>

        {/* Added: mt-auto and pt-4. mt-auto is the magic trick that pushes this footer to the bottom! */}
        <div className="flex justify-between items-center mt-auto pt-4">
          <span className="bg-yellow-400 text-xs px-2 py-1 rounded">
            ⭐ {item.rating || 4.5}
          </span>

          {!cartItem ? (
            <button
              onClick={() => addToCart(item)}
              className="border border-red-400 text-red-500 px-3 py-1 rounded-full text-sm hover:bg-red-50 transition"
            >
              Add
            </button>
          ) : (
            <div className="flex gap-2 items-center">
              <button
                onClick={() => decreaseItem(item)}
                className="bg-orange-500 hover:bg-orange-600 transition text-white px-2 rounded"
                aria-label="Decrease quantity"
              >
                -
              </button>

              <span className="font-medium">{cartItem.quantity}</span>

              <button
                onClick={() => increaseItem(item)}
                className="bg-orange-500 hover:bg-orange-600 transition text-white px-2 rounded"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default ProductCard;