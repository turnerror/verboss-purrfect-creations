import axios from "axios";

const base = "https://api.airtable.com/v0/app8wLQrrIMrnn673";

const token = process.env.REACT_APP_AIRTABLE_BEARER_TOKEN;

const authHeader = {
        Authorization: "Bearer " + token
    };

export const getTotal = async () => {
    const response = await axios.get(base + "/orders", {
    headers: {
        Authorization: "Bearer " + token
    },
});

    let orders = response.data.records;

    let nextPageOffset = response.data.offset;

    while(nextPageOffset) {
        const response = await axios.get(base + "/orders?offset=" + nextPageOffset, {headers: authHeader} );

        nextPageOffset = response.data.offset;

        orders = [...orders, ...response.data.records];

        console.log({nOrders: orders.length});
    }



    console.log({records: response.data.records, response});
    return orders.length;
}


export const getTotalThisMonth = async () => {

}
