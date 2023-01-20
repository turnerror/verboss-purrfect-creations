import axios from "axios";
import moment from "moment";
import dotenv from "dotenv";

dotenv.config();

const base = "https://api.airtable.com/v0/app8wLQrrIMrnn673";

const token = process.env.AIRTABLE_BEARER_TOKEN;

const authHeader = {
        Authorization: "Bearer " + token
    };


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

export const getData = async () => {

    const sort =  [{field: "order_placed", direction: "desc"}];

    console.log({authHeader});
    const response = await axios.post(base + "/orders/listRecords", {
        sort
    },{
    headers: authHeader
});

    let orders: Order[] = response.data.records;

    let nextPageOffset = response.data.offset;

    while(nextPageOffset) {
        const response = await axios.post<OrderResponseSchema>(base + "/orders/listRecords",{sort, offset: nextPageOffset}, {headers: authHeader} );

        nextPageOffset = response.data.offset;

        orders = [...orders, ...response.data.records];

    }

    const oneMonthAgo = moment().subtract(1, "M");

    const thisMonthOrders = orders.filter((order) => {
        const timeOfOrder = moment(order.fields.order_placed, "YYYY-MM-DD");

        return timeOfOrder.isSameOrAfter(oneMonthAgo);
    });

    const inProgressOrders = orders.filter((order) => {
        return order.fields.order_status === "in_progress";
    })

    let revenue = 0;

    for (const order of orders) {
        if (order.fields.order_status !== "cancelled") {
            revenue += order.fields.price;
        }
    }

    return {
        total: orders.length,
        monthlyTotal: thisMonthOrders.length,
        latestOrders: orders.slice(0, 5),
        inProgressTotal: inProgressOrders.length,
        revenue: +revenue.toFixed(2)
    };
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

    console.log({createOrderRes: response})

    return response.data;
}

