export const USERS = {
  standard: {
    username: "standard_user",
    password: "secret_sauce",
  },
  locked: {
    username: "locked_out_user",
    password: "secret_sauce",
  },
} as const;

export const PRODUCTS = {
  backpack: "Sauce Labs Backpack",
  bikeLight: "Sauce Labs Bike Light",
} as const;

export const CHECKOUT = {
  firstName: "Alex",
  lastName: "Costa",
  postalCode: "10869",
} as const;
