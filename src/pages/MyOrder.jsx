import axios from "axios";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import OrderCard from "@/components/OrderCard";

function MyOrder() {
  const [userOrder, setUserOrder] = useState(null);
  console.log("order", userOrder);

  const getUserOrders = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const res = await axios.get(
      `${import.meta.env.VITE_URL}/api/v1/orders/myorder`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (res.data.success) {
      console.log("user orders", res.data.orders);
      setUserOrder(res.data.orders);
    }
  };

  useEffect(() => {
    getUserOrders();
  }, []);
  return (
    <>
    <OrderCard userOrder={userOrder}/>
    </>
  );
}

export default MyOrder;
