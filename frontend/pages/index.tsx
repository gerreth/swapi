import React, { useCallback, useEffect, useState } from "react";

import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { ApolloClient } from "@apollo/client";
import classNames from "classnames";

import Typography from "@mui/material/Typography";
import PaginationItem from "@mui/material/PaginationItem";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/system/Box";

import {
  useAllPeopleQuery,
  People,
  PeopleDocument,
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
  const { loading, error, data, fetchMore, client } = useAllPeopleQuery({
    variables: { page: props.page },
  });
  const prefetchPage = useCallback(
    (page: number) => {
      fetchMore({ variables: { page } });
    },
    [fetchMore],
  );

  useEffect(() => {
    if (data?.allPeople.totalCount) {
      setNumberOfPages(Math.ceil(data.allPeople.totalCount / 10));
    }
  }, [data?.allPeople.totalCount]);

  useEffect(() => {
    if (props.page < numberOfPages) {
      prefetchPage(props.page + 1);
    }

    if (props.page > 1) {
      prefetchPage(props.page - 1);
    }
  }, [prefetchPage, props.page, numberOfPages]);

  const pagination = (
    <Pagination
      count={numberOfPages}
      color="primary"
      className={styles.pagination}
      page={props.page}
      onChange={(_event: React.ChangeEvent<unknown>, page: number) => {
        router.push(`?page=${page}`);
      }}
      renderItem={(item) => {
        return (
          <PaginationItem
            {...item}
            onMouseOver={(_event) => {
              prefetchPage(item.page);
            }}
          />
        );
      }}
    />
  );

  if (loading) {
    return (
      <>
        {[...Array(10).keys()].map((index) => {
          return (
            <Box
              key={index}
              className={styles.peopleSummary}
              role="progressbar"
              aria-busy="true"
              aria-valuetext="loading"
              aria-live="polite"
              aria-valuemin={0}
              aria-valuemax={100}
            >
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

        {pagination}
      </>
    );
  }

  if (error || !data) {
    return (
      <div>
        <div className={styles.peopleListError}>
          Es gab einen Fehler, versuche es später noch einmal.
        </div>

        {pagination}
      </div>
    );
  }

  return (
    <>
      {data.allPeople.people.map((people) => {
        return (
          <PeopleSummary key={people.id} client={client} people={people} />
        );
      })}

      {pagination}
    </>
  );
};

type PeopleSummaryProps = {
  client: ApolloClient<any>;
  people: Pick<People, "id" | "name" | "gender" | "birth_year">;
};

const PeopleSummary = (props: PeopleSummaryProps) => {
  const router = useRouter();

  return (
    <Box
      className={styles.peopleSummary}
      component="article"
      onClick={() => router.push(`/people/${props.people.id}`)}
      onMouseOver={async () => {
        try {
          await props.client.query({
            query: PeopleDocument,
            variables: { id: props.people.id },
          });
        } catch (error) {
          // This query is done to prefetch data. Showing an error here might be
          // unexpected for a user
          console.error(error);
        }
      }}
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
