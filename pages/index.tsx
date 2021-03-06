import Head from "next/head";
import React, { useCallback, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";

import Layout from "components/Layout";
import { FEEDS_QUERY } from "queries";
import { Edge, PageInfo } from "types";
import Tabs from "components/Tab";
import FeedCard from "../components/FeedCard";

type QueryData = {
  feed: {
    edges: Edge[];
    pageInfo: PageInfo;
  };
};

type QueryVars = {
  fellowshipType: string;
  after?: string;
};

const TABS = ["all", "writers", "founders", "angels"];
export default function Home() {
  const [tab, setTab] = useState("all");
  const [prevCursor, setPreviousCursor] = useState('');
  const { data, error, loading, fetchMore } = useQuery<QueryData, QueryVars>(
    FEEDS_QUERY,
    {
      fetchPolicy: 'network-only',
      notifyOnNetworkStatusChange: true,
      variables: {
        fellowshipType: tab === "all" ? "" : tab,
      },
    },
  
  );

  const nextCursor = data?.feed.pageInfo.endCursor;

  const handleScroll = useCallback(
    (e: Event) => {
      if(prevCursor === nextCursor) {
        return
      }

      setPreviousCursor(nextCursor as string)
      if (
        window.innerHeight +
          (e.target as Document).documentElement.scrollTop +
          1 >=
          (e.target as Document).documentElement.scrollHeight &&
        data?.feed.pageInfo.hasNextPage
      ) {        
        fetchMore({
          variables: {
            after: data?.feed.pageInfo.endCursor,
          },
        });
      }
    },
    [nextCursor]
  );

  
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  if (loading && !data) {
    return (
      <Layout>
        <Head>
          <title>On Deck Newsfeed</title>
        </Head>
        <h1>Loading...</h1>
      </Layout>
    );
  }

  if (error && !data) {
    return (
      <Layout>
        <Head>
          <title>On Deck Newsfeed</title>
        </Head>
        <h1>An Error has occurred</h1>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>On Deck Newsfeed</title>
      </Head>
      <h2>News Feed</h2>
      <Tabs TABS={TABS} tab={tab} setTab={setTab} />
      {data?.feed.edges.map((edge) => (
        <FeedCard key={edge.cursor} feed={edge.node} />
      ))}
    </Layout>
  );
}
