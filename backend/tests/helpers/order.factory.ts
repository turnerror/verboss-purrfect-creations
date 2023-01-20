import { Order, OrderFields } from "../../src/order.types";
import { faker } from '@faker-js/faker';
import moment from "moment";

export const orderFieldsFactory = (overrides: Partial<OrderFields> = {} ) => {
    const randomFields: OrderFields = {
        order_id: faker.datatype.number(),
        order_placed: moment(faker.date.recent()).format("YYYY-MM-DD"),
        product_name: "i heart milk brooch",
        price: +faker.commerce.price(0, 200),
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        address: faker.address.streetAddress(),
        email: faker.internet.email(),
        order_status: "in_progress",
    };

    return {...randomFields, ...overrides};
}

export const orderFactory = (overrides: Partial<Order> = {}) => {

    const randomOrder: Order =  {
        id: faker.datatype.uuid(),
        createdTime: faker.date.recent().toISOString(),
        fields: orderFieldsFactory(),
    };

    return {...randomOrder, ...overrides};
}