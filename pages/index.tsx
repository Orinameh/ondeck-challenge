import Head from 'next/head'
import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import Layout from 'components/Layout'
import { FEEDS_QUERY } from 'queries';
import { Edge, PageInfo } from 'types';
import Tabs from 'components/Tab';
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
  const { data, error, loading, fetchMore } = useQuery<QueryData, QueryVars>(
    FEEDS_QUERY,
    {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'network-only',
      variables: {
        fellowshipType: tab === "all" ? "" : tab
      }
    }
  )

  const handleScroll = (e: any) => {
    if(window.innerHeight + e.target.documentElement.scrollTop + 1 >=e.target.documentElement.scrollHeight) {
      fetchMore({
        variables: {
          after: data?.feed.pageInfo.endCursor
        }
      })
    }
    
}

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
        data?.feed.edges.map((edge) => (
          <FeedCard key={`${edge.node.id}-${edge.node.desc}`} feed={edge.node} />
        ))
      }
    </Layout>
  )
}
