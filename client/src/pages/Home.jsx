import React from 'react'
import CustomerList from '../components/customer/CustomerList'
import Layout from '../components/Layout'
import Navbar from '../components/nav/Navbar'

function Home() {
  return (
    <Layout>
      <Navbar />
      <CustomerList />
    </Layout>
  )
}

export default Home