const CartItem = ({ product }) => {
  return (
    <div key={product.id} className="">
      {product.title} - ${product.price} x{product.quantity}
    </div>
  );
};

export default CartItem;
