import { OrderFields, OrderStatuses } from "./api";


const statusMap: {[Status in OrderStatuses]: string} = {
    in_progress: "In Progress",
    cancelled: "Cancelled",
    placed: "Placed",
    shipped: "Shipping"
};

export const Order = ({product_name, price, first_name, last_name, order_status}: OrderFields) => {
    return <div style={{display: "flex", gap: "8px" }}>
        <p>Product: {product_name}</p>
        <p>Price: {price}</p>
        <p>Name: {first_name} {last_name} </p>
        <p>Status: {statusMap[order_status]} </p>
    </div>;
}