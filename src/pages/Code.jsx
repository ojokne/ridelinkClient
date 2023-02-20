// import { useEffect, useState } from "react";
// import Loader from "../components/Loader";
// import { Link } from "react-router-dom";
// import { FaListAlt } from "react-icons/fa";
// import OrderCard from "../components/OrderCard";
// import { ACTIONS } from "../context/actions";
// import { useAuthentication, useOrders } from "../context/StateProvider";
// import useAuth from "../utils/useAuth";
// import { useRef } from "react";

// const styles = {
//   iconLarge: {
//     color: "white",
//     backgroundColor: "#32a885",
//     opacity: 0.8,
//     fontSize: "5em",
//     padding: "6px",
//     margin: "6px",
//     borderRadius: "50%",
//     textAlign: "center",
//   },
// };

// const Code = () => {
//   useAuth();
//   const { auth } = useAuthentication();
//   const { orders, ordersDispatch } = useOrders();
//   const [empty, setEmpty] = useState(true);
//   const [alert, setAlert] = useState({
//     alert: false,
//     message: "",
//     type: "",
//   });
//   const [loading, setLoading] = useState(true);
//   const effectRan = useRef(false);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await fetch(
//           `http://localhost:5000/client/orders/${auth.id}`,
//           {
//             method: "GET",
//             credentials: "include",
//           }
//         );
//         const data = await res.json();
//         if (data.orders.length > 0) {
//           setEmpty(false);
//         }
//         ordersDispatch({ type: ACTIONS.ADD_ORDERS, orders: data.orders });

//         setLoading(false);
//       } catch (e) {
//         console.log(e);
//         setLoading(false);
//         setAlert((prev) => {
//           return {
//             ...prev,
//             alert: true,
//             message: "An error occurred, Please Reload",
//           };
//         });
//       }
//     };
//     if (!effectRan.current) {
//       fetchOrders();
//       return () => {
//         effectRan.current = true;
//         ordersDispatch({ type: ACTIONS.CLEAR_ORDERS });
//       };
//     }
//   }, [auth.id, ordersDispatch]);

//   if (loading) {
//     return <Loader loading={loading} description="Loading" />;
//   }

//   return (
//     <div className="mx-auto" style={{ maxWidth: "600px" }}>
//       {alert.alert && (
//         <div
//           className="alert alert-warning alert-dismissible fade show m-3 p-3"
//           role="alert"
//         >
//           {alert.message}
//           <button
//             type="button"
//             className="btn-close"
//             data-bs-dismiss="alert"
//             aria-label="Close"
//           ></button>
//         </div>
//       )}
//       <div className="bg-white m-2 p-2 rounded shadow-sm">
//         {empty && (
//           <div className="text-center">
//             <div>
//               <FaListAlt style={styles.iconLarge} />
//             </div>
//             <p className="text-center text-muted">
//               You have not placed any orders yet
//             </p>
//             <div className="mt-3">
//               <Link
//                 to="/quote-form"
//                 className="text-decoration-none ridelink-color"
//               >
//                 Get a quote
//               </Link>
//             </div>
//           </div>
//         )}
//         {orders.map((data, index) => {
//           return <OrderCard order={data.order} trip={data.trip} key={index} />;
//         })}
//       </div>
//     </div>
//   );
// };

// export default Code;
