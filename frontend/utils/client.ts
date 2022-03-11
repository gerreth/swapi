import { ApolloClient, InMemoryCache } from "@apollo/client";
// import { offsetLimitPagination } from "@apollo/client/utilities";
// import uniqBy from "lodash.uniqby";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          allPeople: {
            // TODO!: Just for discussion
            // ...offsetLimitPagination(),
            // read(existing, { args }) {
            //   console.log({ existing });
            //   console.log({ args });
            // },
            // merge: (existing = [], incoming) => {
            //   console.log("existing", existing);
            //   console.log("incoming", incoming);
            //   return uniqBy([...existing, ...incoming], "__ref");
            // },
          },
        },
      },
    },
  }),
});

export default client;
