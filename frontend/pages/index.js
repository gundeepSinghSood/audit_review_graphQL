import React from 'react'
import Head from 'next/head'
import { withAuthSync } from '../utils/auth';

const Home = () => (
  <div>
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <h1>Home Page</h1>
  </div>
)

export default withAuthSync(Home)
