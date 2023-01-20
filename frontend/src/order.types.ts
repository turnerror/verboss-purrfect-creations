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
