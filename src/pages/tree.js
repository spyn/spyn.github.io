import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

class ResumePage extends React.Component {
  render() {
    const { data } = this.props

    return (
      <Layout>
        <SEO title="Tree" />
        <div className="content-box clearfix">
            <div className="hero">
                <h1>Tree</h1>
            </div>
            <div>
                <h1>TBA</h1>
            </div>
        </div>
      </Layout>
    )
  }
}

export default ResumePage