import userEvent from "@testing-library/user-event";

import { render, screen } from "@testing-library/react";
import { ApolloError } from "@apollo/client";
import { useRouter } from "next/router";

import Home from "@/pages/index";
import { useAllPeopleQuery } from "../generated/graphql";

jest.mock("next/router");

jest.mock("../generated/graphql");

describe("Home", () => {
  it("renders correctly while loading", () => {
    // @ts-ignore
    useRouter.mockImplementation(() => {
      return {
        query: { page: 1 },
        isReady: true,
      };
    });

    const fetchMore = jest.fn();

    // @ts-ignore
    useAllPeopleQuery.mockImplementation(() => {
      return {
        loading: true,
        data: undefined,
        error: undefined,
        fetchMore,
      };
    });

    render(<Home />);

    expect(screen.getAllByRole("button")).toHaveLength(8);
    expect(screen.getAllByRole("progressbar")).toHaveLength(10);
  });

  it("renders correctly with error", () => {
    // @ts-ignore
    useRouter.mockImplementation(() => {
      return {
        query: { page: 1 },
        isReady: true,
      };
    });

    const fetchMore = jest.fn();

    // @ts-ignore
    useAllPeopleQuery.mockImplementation(() => {
      return {
        loading: false,
        data: undefined,
        error: new ApolloError({ networkError: new Error("Failed to fetch") }),
        fetchMore,
      };
    });

    render(<Home />);

    expect(screen.getAllByRole("button")).toHaveLength(8);
    screen.getByText(/Failed to fetch/);
  });

  it("renders correctly with expected data on page 1", () => {
    const people = [
      {
        id: "1",
        name: "Luke Skywalker",
        gender: "male",
        birth_year: "19BBY",
        __typename: "People",
      },
      {
        id: "2",
        name: "C-3PO",
        gender: "notAvailable",
        birth_year: "112BBY",
        __typename: "People",
      },
      {
        id: "3",
        name: "R2-D2",
        gender: "notAvailable",
        birth_year: "33BBY",
        __typename: "People",
      },
      {
        id: "4",
        name: "Darth Vader",
        gender: "male",
        birth_year: "41.9BBY",
        __typename: "People",
      },
      {
        id: "5",
        name: "Leia Organa",
        gender: "female",
        birth_year: "19BBY",
        __typename: "People",
      },
      {
        id: "6",
        name: "Owen Lars",
        gender: "male",
        birth_year: "52BBY",
        __typename: "People",
      },
      {
        id: "7",
        name: "Beru Whitesun lars",
        gender: "female",
        birth_year: "47BBY",
        __typename: "People",
      },
      {
        id: "8",
        name: "R5-D4",
        gender: "notAvailable",
        birth_year: "unknown",
        __typename: "People",
      },
      {
        id: "9",
        name: "Biggs Darklighter",
        gender: "male",
        birth_year: "24BBY",
        __typename: "People",
      },
      {
        id: "10",
        name: "Obi-Wan Kenobi",
        gender: "male",
        birth_year: "57BBY",
        __typename: "People",
      },
    ];

    const push = jest.fn();

    // @ts-ignore
    useRouter.mockImplementation(() => {
      return {
        query: { page: 1 },
        push,
        isReady: true,
      };
    });

    const fetchMore = jest.fn();

    // @ts-ignore
    useAllPeopleQuery.mockImplementation(() => {
      return {
        loading: false,
        data: { allPeople: { totalCount: 82, people } },
        error: undefined,
        fetchMore,
      };
    });

    render(<Home />);

    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(10);

    for (const character of people) {
      screen.getByRole("heading", { name: character.name });
    }

    expect(screen.getAllByRole("button")).toHaveLength(8);

    expect(
      screen.getByRole("button", { name: "Go to previous page" }),
    ).toBeDisabled();

    screen.getByRole("button", { name: "page 1" });
    screen.getByRole("button", { name: "Go to page 2" });
    screen.getByRole("button", { name: "Go to page 3" });
    screen.getByRole("button", { name: "Go to page 4" });
    screen.getByRole("button", { name: "Go to page 5" });
    screen.getByRole("button", { name: "Go to page 9" });

    expect(
      screen.getByRole("button", { name: "Go to next page" }),
    ).not.toBeDisabled();

    expect(fetchMore).toHaveBeenCalledTimes(1);

    userEvent.click(screen.getByRole("button", { name: "Go to next page" }));
    userEvent.click(screen.getByRole("button", { name: "Go to page 5" }));

    expect(push).toHaveBeenCalledTimes(2);
    expect(push).toHaveBeenNthCalledWith(1, "?page=2");
    expect(push).toHaveBeenNthCalledWith(2, "?page=5");
  });

  it("renders the pagination correctly on page 5", () => {
    // @ts-ignore
    useRouter.mockImplementation(() => {
      return {
        query: { page: 5 },
        isReady: true,
      };
    });

    const fetchMore = jest.fn();

    // @ts-ignore
    useAllPeopleQuery.mockImplementation(() => {
      return {
        loading: false,
        data: { allPeople: { totalCount: 82, people: [] } },
        error: undefined,
        fetchMore,
      };
    });

    render(<Home />);

    expect(screen.getAllByRole("button")).toHaveLength(7);

    expect(
      screen.getByRole("button", { name: "Go to previous page" }),
    ).not.toBeDisabled();

    screen.getByRole("button", { name: "Go to page 1" });
    screen.getByRole("button", { name: "Go to page 4" });
    screen.getByRole("button", { name: "page 5" });
    screen.getByRole("button", { name: "Go to page 6" });
    screen.getByRole("button", { name: "Go to page 9" });

    expect(
      screen.getByRole("button", { name: "Go to next page" }),
    ).not.toBeDisabled();

    expect(fetchMore).toHaveBeenCalledTimes(2);
  });

  it("renders correctly on page 9", async () => {
    const people = [
      {
        id: "82",
        name: "Sly Moore",
        gender: "female",
        birth_year: "unknown",
        __typename: "People",
      },
      {
        id: "83",
        name: "Tion Medon",
        gender: "male",
        birth_year: "unknown",
        __typename: "People",
      },
    ];

    // @ts-ignore
    useRouter.mockImplementation(() => {
      return {
        query: { page: 9 },
        isReady: true,
      };
    });

    const fetchMore = jest.fn();

    // @ts-ignore
    useAllPeopleQuery.mockImplementation(() => {
      return {
        loading: false,
        data: { allPeople: { totalCount: 82, people } },
        error: undefined,
        fetchMore,
      };
    });

    render(<Home />);

    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(2);

    for (const character of people) {
      screen.getByRole("heading", { name: character.name });
    }

    expect(screen.getAllByRole("button")).toHaveLength(8);

    screen.getByRole("button", { name: "Go to previous page" });

    screen.getByRole("button", { name: "Go to page 1" });
    screen.getByRole("button", { name: "Go to page 5" });
    screen.getByRole("button", { name: "Go to page 6" });
    screen.getByRole("button", { name: "Go to page 7" });
    screen.getByRole("button", { name: "Go to page 8" });
    screen.getByRole("button", { name: "page 9" });

    expect(
      screen.getByRole("button", { name: "Go to next page" }),
    ).toBeDisabled();

    expect(fetchMore).toHaveBeenCalledTimes(1);
  });
});
