import { Block } from "payload/types";
import richText from "../../fields/richText";
import linkGroup from "../../fields/linkGroup";

export const HeroWithContent: Block = {
  slug: "hero with content",
  fields: [
    {
      name: "title",
      type: "text",
      //   required: false
    },
    {
      name: "heroImage",
      type: "upload",
      relationTo: "media",
      //   required: true,
    },
    richText({ name: "content" }),
    linkGroup({
      appearances: ["primary", "secondary"],
      overrides: {
        maxRows: 1,
      },
    }),
  ],
};
