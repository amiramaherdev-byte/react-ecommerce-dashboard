const CartItem = ({ product }) => {
  return (
    <div key={product.id} >
      {product.title} - ${product.price} x{product.quantity}
    </div>
  );
};

export default CartItem;
