import React, { useEffect, useState } from "react";

import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import classNames from "classnames";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/system/Box";

import {
  useAllPeopleQuery,
  People,
} from "../generated/graphql";

import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !router.isReady) {
    return null;
  }

  const page = router.query.page ?? "1";

  if (Array.isArray(page)) {
    return (
      <div className={styles.container}>
        <Head>
          <title>SWAPI example app</title>
        </Head>

        <main className={styles.main}>Error</main>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>SWAPI example app</title>
      </Head>

      <main className={styles.main}>
        <People page={parseInt(page, 10)} />
      </main>
    </div>
  );
};

type PeopleProps = {
  page: number;
};

const People = (props: PeopleProps) => {
  const router = useRouter();
  const [numberOfPages, setNumberOfPages] = useState(9);
  const { loading, error, data } = useAllPeopleQuery({
    variables: { page: props.page },
  });

  const handleChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    router.push(`?page=${page}`);
  };

  useEffect(() => {
    if (data?.allPeople.totalCount) {
      setNumberOfPages(Math.ceil(data.allPeople.totalCount / 10));
    }
  }, [data?.allPeople.totalCount]);

  if (loading) {
    return (
      <>
        {[...Array(10).keys()].map((index) => {
          return (
            <Box key={index} className={styles.peopleSummary}>
              <Box
                width={60 + Math.random() * 120}
                className={classNames(styles.shimmer, styles.shimmerBody2)}
              />
              <Box
                width={180 + Math.random() * 60}
                className={classNames(styles.shimmer, styles.shimmerCaption)}
              />
            </Box>
          );
        })}

        <Pagination
          count={numberOfPages}
          className={styles.pagination}
          page={props.page}
          onChange={handleChange}
        />
      </>
    );
  }

  if (error || !data) {
    return (
      <div>
        <div className={styles.peopleListError}>
          Es gab einen Fehler, versuche es später noch einmal.
        </div>

        <Pagination
          count={numberOfPages}
          className={styles.pagination}
          page={props.page}
          onChange={handleChange}
        />
      </div>
    );
  }

  return (
    <>
      {data.allPeople.people.map((people) => {
        return (
          <PeopleSummary key={people.id} people={people} />
        );
      })}

      <Pagination
        count={numberOfPages}
        color="primary"
        className={styles.pagination}
        page={props.page}
        onChange={handleChange}
      />
    </>
  );
};

type PeopleSummaryProps = {
  people: Pick<People, "id" | "name" | "gender" | "birth_year">;
};

const PeopleSummary = (props: PeopleSummaryProps) => {
  const router = useRouter();

  return (
    <Box
      className={styles.peopleSummary}
      component="article"
      onClick={() => router.push(`/people/${props.people.id}`)}
    >
      <Typography variant="body2" variantMapping={{ body2: "h2" }}>
        {props.people.name}
      </Typography>
      <Typography variant="caption">
        Gender: {props.people.gender}, Birthyear: {props.people.birth_year}
      </Typography>
    </Box>
  );
};

export default Home;
