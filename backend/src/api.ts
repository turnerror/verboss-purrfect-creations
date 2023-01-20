import axios from "axios";
import moment from "moment";
import dotenv from "dotenv";
import { Order, OrderFields, OrderResponseSchema } from "./order.types";

dotenv.config();

const base = "https://api.airtable.com/v0/app8wLQrrIMrnn673";

const token = process.env.AIRTABLE_BEARER_TOKEN;

const authHeader = {
        Authorization: "Bearer " + token
    };

export const getData = async () => {
    const sort =  [{field: "order_placed", direction: "desc"}];

    const response = await axios.post(
        base + "/orders/listRecords",
        { sort },
        { headers: authHeader }
    );
    
    let orders: Order[] = response.data.records;
    console.log("check", orders[0].createdTime);

    let nextPageOffset = response.data.offset;

    while(nextPageOffset) {
        const response = await axios.post<OrderResponseSchema>(
            base + "/orders/listRecords",
            {sort, offset: nextPageOffset},
            {headers: authHeader}
        );

        nextPageOffset = response.data.offset;

        orders = [...orders, ...response.data.records];
    }

    const inProgressOrders = orders.filter((order) => {
        return order.fields.order_status === "in_progress";
    })

    return {
        total: orders.length,
        monthlyTotal: filterThisMonthsOrders(orders).length,
        latestOrders: orders.slice(0, 5),
        inProgressTotal: inProgressOrders.length,
        revenue: calcRevenue(orders)
    };
}

export const filterThisMonthsOrders = (orders: Order[]) => {
    const oneMonthAgo = moment().subtract(1, "M");

    return orders.filter((order) => {
        const timeOfOrder = moment(order.fields.order_placed, "YYYY-MM-DD");

        return timeOfOrder.isSameOrAfter(oneMonthAgo);
    });
}

export const calcRevenue = (orders: Order[]) => {
    let revenue = 0;

    for (const order of orders) {
        if (order.fields.order_status !== "cancelled") {
            revenue += order.fields.price;
        }
    }

    return +revenue.toFixed(2);
}

export const createOrder = async () => {
    const newOrder: OrderFields = {
        order_id: 1001,
        order_placed: moment().format("2023-01-01"),
        product_name: "i heart milk brooch",
        price: 69.69,
        first_name: "Frank",
        last_name: "Bob",
        address: "10 Downing Street",
        email: "somerandomcrap@mail.com",
        order_status: "in_progress",
    };

    const response  = await axios.post(base + "/Orders", {records: [{
        fields: newOrder,
    }]}, {headers: {...authHeader, "Content-Type": "application/json"}});

    return response.data;
}

