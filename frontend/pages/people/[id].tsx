import React, { useEffect, useState } from "react";

import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { ChevronLeft } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import client from "utils/client";

import {
  People,
  PeopleDocument,
  PeopleQuery,
  usePeopleQuery,
} from "../../generated/graphql";

import styles from "../../styles/Home.module.css";

// TODO!: Just for discussion
// type Props = {
//   people: PeopleQuery["people"] | null;
//   error: Error | null;
// };

// export const getServerSideProps: GetServerSideProps<Props> = async ({
//   params,
// }) => {
//   if (params === undefined) {
//     return {
//       props: {
//         people: null,
//         error: { name: "Error", message: "There was no id provided." },
//       },
//     };
//   }

//   const { data, error } = await client.query<PeopleQuery>({
//     query: PeopleDocument,
//     variables: { id: params.id },
//   });

//   return {
//     props: {
//       people: data.people ?? null,
//       error: error || null,
//     },
//   };
// };

// const Details: NextPage<Props> = (props) => {
//   if (props.error || !props.people) {
//     return <>{props.error ?? "The person could not be found."}</>;
//   }

//   return (
//     <div className={styles.container}>
//       <Head>
//         <title>Detail page for {props.people.name}</title>
//       </Head>

//       <main className={styles.main}>
//         <PeopleDetails people={props.people} />
//       </main>
//     </div>
//   );
// };

const Details: NextPage = () => {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !router.isReady) {
    return null;
  }

  const id = router.query.id;

  if (Array.isArray(id) || id === undefined) {
    return (
      <div className={styles.container}>
        <Head>
          <title>SWAPI example app</title>
        </Head>

        <main className={styles.main}>Error</main>
      </div>
    );
  }

  return <DetailsCSR id={id} />;
};

type DetailsCSRProps = {
  id: string;
};

const DetailsCSR = (props: DetailsCSRProps) => {
  const { loading, error, data } = usePeopleQuery({
    variables: { id: props.id },
  });

  if (loading) {
    // TODO!: Add loading view

    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <div>Loading</div>
        </main>
      </div>
    );
  }

  if (error || !data) {
    // TODO!: Edd error view

    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <div>Error</div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Details page for {data.people.name}</title>
      </Head>

      <main className={styles.main}>
        <PeopleDetails people={data.people} />
      </main>
    </div>
  );
};

type PeopleDetailsProps = {
  people: PeopleQuery["people"];
};

const PeopleDetails = (props: PeopleDetailsProps) => {
  const router = useRouter();

  return (
    <Box>
      <IconButton onClick={() => router.back()}>
        <ChevronLeft color="primary" />
      </IconButton>

      <Box px={1.5}>
        <Typography variant="h4" variantMapping={{ h4: "h1" }}>
          {props.people.name}
        </Typography>

        <Box my={2}>
          <Box display="flex">
            <Typography variant="body2">Gender:</Typography>
            <Typography variant="body1">{props.people.gender}</Typography>
          </Box>

          <Box display="flex">
            <Typography variant="body2">Birthyear:</Typography>
            <Typography variant="body1">{props.people.birth_year}</Typography>
          </Box>
        </Box>

        <Box my={2}>
          <Box display="flex">
            <Typography variant="body2">Hair color:</Typography>
            <Typography variant="body1">{props.people.hair_color}</Typography>
          </Box>

          <Box display="flex">
            <Typography variant="body2">Eye color:</Typography>
            <Typography variant="body1">{props.people.eye_color}</Typography>
          </Box>

          <Box display="flex">
            <Typography variant="body2">Skin color:</Typography>
            <Typography variant="body1">{props.people.skin_color}</Typography>
          </Box>

          <Box display="flex">
            <Typography variant="body2">Height:</Typography>
            <Typography variant="body1">{props.people.height} cm</Typography>
          </Box>

          <Box display="flex">
            <Typography variant="body2">Mass:</Typography>
            <Typography variant="body1">{props.people.mass} kg</Typography>
          </Box>
        </Box>

        <Box my={2}>
          <Box>
            <Typography variant="body2">Films:</Typography>

            <Box>
              {props.people.filmsInfo.map((film) => {
                return (
                  <Typography key={film.title} variant="body1">
                    {film.title}
                  </Typography>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Details;
