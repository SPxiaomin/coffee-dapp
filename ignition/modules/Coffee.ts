import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("CoffeeModule", (m) => {
    const coffee = m.contract("BuyMeACoffee");

    return { coffee };
});