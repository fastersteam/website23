import React, { Fragment } from "react";
import { notFound } from "next/navigation";

import { getPayloadClient } from "../getPayload";
import { Page } from "./../payload-types";

export default async function Home() {
  return (
    <Fragment>
      <div>hello world</div>
    </Fragment>
  );
}
