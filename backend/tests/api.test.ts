import { calcRevenue, filterThisMonthsOrders } from "../src/api";
import { orderFactory, orderFieldsFactory } from "./helpers/order.factory";


describe("calcRevenue tests", () => {
  it("should sum revenue across multiple orders", () => {
    const order1 = orderFactory({
        fields: orderFieldsFactory({price: 70.00})
    });

    const order2 = orderFactory({
        fields: orderFieldsFactory({price: 30.00})
    });

    const order3 = orderFactory({
        fields: orderFieldsFactory({price: 23.45})
    });

    expect(calcRevenue([order1, order2, order3])).toBe(123.45);
  });


it("does not include sales of cancelled orders", () => {
    const order1 = orderFactory({
        fields: orderFieldsFactory({price: 70.00})
    });

    const order2 = orderFactory({
        fields: orderFieldsFactory({price: 30.00, order_status: "cancelled"}),
    });

    expect(calcRevenue([order1, order2])).toBe(70);
  });
});


describe("filterThisMonthsOrders tests", () => { 
    afterEach(() => {
        jest.useRealTimers();
    });

    it("should filter order_placed dates with the format YYYY-MM-DD", () => {
        // 1st Feb, 2020
        jest.useFakeTimers().setSystemTime(new Date("2020-02-01"));
        const orderWithinLastMonth = orderFactory({
            id: "foo",
            fields: orderFieldsFactory({order_placed: "2020-01-15"})
        });

        const orderOlderThanAMonth= orderFactory({
            id: "bar",
            fields: orderFieldsFactory({order_placed: "2019-12-31"})
        });
        const result = filterThisMonthsOrders([orderWithinLastMonth, orderOlderThanAMonth]);

        expect(result.length).toBe(1);

        expect(result[0].id).toBe("foo");
    });
});