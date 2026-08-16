import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const { data } = await axios.get(
        `${import.meta.env.VITE_URL}/api/v1/orders/myorder`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <div className="text-center mt-20">Loading orders...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-5xl mx-auto">

       <div className="flex justify-between items-center mb-8">
  <h1 className="text-3xl font-bold">
    My Orders
  </h1>

  <button
    onClick={() => navigate("/")}
    className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2.5 rounded-lg font-semibold transition"
  >
    Continue Shopping
  </button>
</div>

        {orders.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <h2 className="text-xl font-semibold">
              No Orders Found
            </h2>

            <p className="text-gray-500 mt-2">
              You haven't placed any orders yet.
            </p>
          </div>
        ) : (
          <div className="space-y-6">

            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-lg shadow p-6"
              >

                {/* Order Header */}
                <div className="flex justify-between items-center border-b pb-4 mb-4">

                  <div>
                    <p className="text-sm text-gray-500">
                      Order ID
                    </p>

                    <p className="font-semibold">
                      {order._id}
                    </p>
                  </div>

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      order.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Failed"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>

                </div>

                {/* Products */}
                <div className="space-y-4">

                  {order.products.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center gap-4"
                    >

                      <img
                        src={item.productId?.productImg?.[0]?.url}
                        alt={item.productId?.productName}
                        className="w-20 h-20 object-contain border rounded"
                      />

                      <div className="flex-1">

                        <h3 className="font-semibold">
                          {item.productId?.productName}
                        </h3>

                        <p className="text-gray-500">
                          ₹{item.productId?.productPrice}
                        </p>

                        <p className="text-gray-500">
                          Quantity: {item.quantity}
                        </p>

                      </div>

                    </div>
                  ))}

                </div>

                {/* Order Details */}
                <div className="border-t mt-5 pt-4 flex justify-between">

                  <div>
                    <p className="text-gray-500">
                      Order Date
                    </p>

                    <p>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-gray-500">
                      Total Amount
                    </p>

                    <p className="text-xl font-bold">
                      ₹{order.amount}
                    </p>
                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default Orders;