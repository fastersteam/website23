import { Header } from "../../payload-types";
import { HEADER_QUERY } from "../_graphql/globals";

export const fetchHeader: () => Promise<Header> = async () => {
  const header = await fetch(
    // `${process.env.NEXT_PUBLIC_SERVER_URL}/api/graphql`,
    `http://localhost:3000/api/graphql`,
    {
      body: JSON.stringify({
        query: HEADER_QUERY,
      }),
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }
  )
    ?.then((res) => {
      if (!res.ok) throw new Error("Error fetching doc");
      return res.json();
    })
    ?.then((res) => {
      console.log("here is the res", res);
      if (res?.errors)
        throw new Error(res?.errors[0]?.message || "Error fetching header");
      return res.data?.Header;
    });

  return header;
};
