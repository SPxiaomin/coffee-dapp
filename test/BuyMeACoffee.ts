import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { parseEther } from "viem";
import { network } from "hardhat";

describe("BuyMeACoffee", async function () {
  const { viem } = await network.connect();

  it("Should receive a tip and update the memos", async function () {
    // 1. Get some fake accounts
    const [ownerWallet, tipperWallet] = await viem.getWalletClients();

    // 2. Deploy the contract (deployed by owner)
    const coffee = await viem.deployContract("BuyMeACoffee");

    // 3. Send a tip (0.1 ETH) from tipper
    await tipperWallet.writeContract({
      address: coffee.address,
      abi: coffee.abi,
      functionName: "buyCoffee",
      args: ["Alice", "Great job!"],
      value: parseEther("0.1"),
    });

    // 4. Check if memo was stored
    const memos = await coffee.read.getMemos();
    assert.equal(memos[0].name, "Alice");
  });
});
