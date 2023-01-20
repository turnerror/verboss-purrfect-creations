import axios from "axios";
import { Order } from "./order.types";

export const getDashboardStats = async () => {
    const response = await axios.get<{total: number, monthlyTotal: number, latestOrders: Order[], inProgressTotal: number, revenue: number}>("/dashboard-stats");

    return response.data;
}
