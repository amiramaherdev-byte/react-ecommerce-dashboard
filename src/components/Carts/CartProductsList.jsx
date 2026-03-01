const CartProductsList = ({ products }) => {
  return (
    <div>
      {products?.map((item) => (
        <div key={item.id} className="d-flex align-items-center border rounded p-3 shadow-sm">
         <img src={item.thumbnail} alt={item.title} className="me-3 rounded h-100" style={{width:"120px", objectFit: "cover"}}/>
         <div className="flex-grow-1">
             <h5>{item.title}</h5>
          <p className="mb-1">
            <strong>Price:</strong> ${item.price}
          </p>

          <p className="mb-1">
            <strong>Quantity:</strong> {item.quantity}
          </p>

          <p className="mb-1">
            <strong>Total:</strong> ${item.total}
          </p>

          <p className="mb-1 text-success">
            <strong>Discount:</strong> {item.discountPercentage}%
          </p>

          <p className="mb-0 text-danger">
            <strong>Discounted Total:</strong> ${item.discountedTotal}
          </p>
        </div>
        

        </div>

        
      ))}
      
      
    </div>
  );
};

export default CartProductsList;
