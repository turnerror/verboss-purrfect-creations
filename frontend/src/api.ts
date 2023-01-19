import axios from "axios";
import moment from "moment";

const base = "https://api.airtable.com/v0/app8wLQrrIMrnn673";

const token = process.env.REACT_APP_AIRTABLE_BEARER_TOKEN;

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



    console.log({records: response.data.records, response});

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

    return {total: orders.length, monthlyTotal: thisMonthOrders.length, latestOrders: orders.slice(0, 5), inProgressTotal: inProgressOrders.length, revenue: +revenue.toFixed(2)};
}



export const getTotalThisMonth = async () => {
    // const latestQueryParam = 'sort=[{field: "order_placed", direction: "desc"}]';

    // const oneMonthAgo = moment().subtract(1, "M").format("MM/DD/YYYY");
    const oneMonthAgo = "27/9/2022";

    console.log({oneMonthAgo});

    const lastMonthOnlyFilter = `IS_AFTER({order_placed}, "${oneMonthAgo}")`
    const response = await axios.get(`${base}/orders?filterByFormula=${lastMonthOnlyFilter}`, {
    headers: {
        Authorization: "Bearer " + token
    },
});

console.log({response});


//     let orders = response.data.records;

//     let nextPageOffset = response.data.offset;

//     while(nextPageOffset) {
//         const response = await axios.get(`${base}/orders?${latestQueryParam}&offset=${nextPageOffset}`, {headers: authHeader} );

//         nextPageOffset = response.data.offset;

//         orders = [...orders, ...response.data.records];

//         console.log({nOrders: orders.length});
//     }



//     console.log({records: response.data.records, response});
//     return orders.length;
}

