import { CoinDetailsResponse } from "@/app/types";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata(params: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params.params;

  const response = await fetch(`https://api.coinranking.com/v2/coin/${slug}`);
  const data: CoinDetailsResponse = await response.json();

  const coinName = data?.data?.coin.name;

  const coinDescription = data?.data?.coin.name;

  return {
    title: coinName ? `${coinName} - Coin` : "Coin Details",
    description: coinDescription ? coinDescription : "Coin description",
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
