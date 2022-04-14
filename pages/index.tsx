import Head from 'next/head'
import Layout from 'components/Layout'
import { useQuery } from '@apollo/client';
import { FEEDS_QUERY } from 'queries';
import { Edge, PageInfo } from 'types';
import Tabs from 'components/Tab';
import { useState } from 'react';
import FeedCard from '../components/FeedCard';

type QueryData = {
  feed: {
    edges: Edge[]
    pageInfo: PageInfo
  }
}

type QueryVars = {
  fellowshipType: string
  after?: string
}

const TABS = ["all", "writers", "founders", "angels" ]
export default function Home() {
  const [tab, setTab] = useState('all')
  const { data, error, loading } = useQuery<QueryData, QueryVars>(
    FEEDS_QUERY,
    {
      variables: {
        fellowshipType: tab === "all" ? "" : tab
      }
    }
  )

  if(loading && !data) {
    return (
      <Layout>
      <Head>
        <title>On Deck Newsfeed</title>
      </Head>
      <h1>Loading...</h1>
    </Layout>
    )
  }

  if(error && !data) {
    return (
      <Layout>
      <Head>
        <title>On Deck Newsfeed</title>
      </Head>
      <h1>An Error has occurred</h1>
    </Layout>
    )
  }

  return (
    <Layout>
      <Head>
        <title>On Deck Newsfeed</title>
      </Head>
      <h2>News Feed</h2>
      <Tabs TABS={TABS} tab={tab} setTab={setTab} />
      {
        data?.feed.edges.map((edge, i) => (
          <FeedCard feed={edge.node} />
        ))
      }
    </Layout>
  )
}
