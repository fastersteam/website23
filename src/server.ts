import express from "express";
import next from "next";
import nextBuild from "next/dist/build";
import path from "path";
import { getPayloadClient } from "./getPayload";

// eslint-disable-next-line
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

const app = express();
const PORT = process.env.PORT || 3000;

// Redirect root to Admin panel
// app.get("/", (_, res) => {
//   res.redirect("/admin");
// });

// const start = async (): Promise<void> => {
//   await payload.init({
//     secret: "452961a85191fafd90b805f4",
//     mongoURL:
//       "mongodb+srv://faster-steam:G7jCgilBCO7neRPe@cluster0.uxtd9ou.mongodb.net/",
//     express: app,
//     onInit: () => {
//       payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
//     },
//   });

//   if (process.env.PAYLOAD_SEED === "true") {
//     payload.logger.info("Seeding Payload...");
//     await seed(payload);
//     payload.logger.info("Done.");
//   }

//   app.listen(process.env.PORT || 3000);
// };
const start = async (): Promise<void> => {
  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (newPayload) => {
        newPayload.logger.info(
          `Payload Admin URL: ${newPayload.getAdminURL()}`
        );
      },
    },
    seed: process.env.PAYLOAD_PUBLIC_SEED === "true",
  });

  if (process.env.NEXT_BUILD) {
    app.listen(PORT, async () => {
      payload.logger.info(`Next.js is now building...`);
      // @ts-expect-error
      await nextBuild(path.join(__dirname, "../"));
      process.exit();
    });

    return;
  }

  const nextApp = next({
    dev: process.env.NODE_ENV !== "production",
  });

  const nextHandler = nextApp.getRequestHandler();

  app.use((req, res) => nextHandler(req, res));

  nextApp.prepare().then(() => {
    payload.logger.info("Next.js started");

    app.listen(PORT, async () => {
      payload.logger.info(
        `Next.js App URL: ${process.env.PAYLOAD_PUBLIC_SERVER_URL}`
      );
    });
  });
};

start();
