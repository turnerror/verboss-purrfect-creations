import axios from "axios";
import moment from "moment";

export type OrderStatuses = "in_progress" | "cancelled" | "placed" | "shipped";

export type OrderFields = {
order_id: number,
order_placed: string,
product_name: string,
price: number,
first_name: string,
last_name: string,
address: string,
email: string,
order_status: OrderStatuses
}

export type Order = {id: string, createdTime: string, fields: OrderFields};

type OrderResponseSchema = {
    records: Order[],
    offset: string,
}

export const getDashboardStats = async () => {
    const response = await axios.get<{total: number, monthlyTotal: number, latestOrders: Order[], inProgressTotal: number, revenue: number}>("/dashboard-stats");

    return response.data;
}
