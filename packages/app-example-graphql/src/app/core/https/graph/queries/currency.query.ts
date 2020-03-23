import { gql } from "apollo-boost";

export const CURRENCY_QUERY = gql`{
    rates(currency: "USD") {
        currency
        rate
    }
}`