import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

class TreePage extends React.Component {
  render() {
    const { data } = this.props

    return (
      <Layout>
        <SEO title="Resume" />
        <div className="content-box clearfix">
            <article className="intro">
                <h1>Resume</h1>
            </article>
            <div>
                <h1>TBA</h1>
            </div>
        </div>
      </Layout>
    )
  }
}

export default TreePage