import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: `${process.env.NEXT_PUBLIC_STRAPI_URL}/graphql`,
  documents: ["src/graphql/**/*.graphql"],
  generates: {
    "./src/generated/graphql.ts": {
      plugins: ["typescript", "typescript-operations", "typescript-urql"],
      config: {
        withHooks: false,
      },
    },
  },
  hooks: {
    afterOneFileWrite: "prettier --write",
  },
};

export default config;
