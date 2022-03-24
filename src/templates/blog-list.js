import React from 'react'
import { Link, graphql } from 'gatsby'

import DefaultLayout from '../components/layout'
import SEO from '../components/seo'
import IntroLayout from '../components/intro'

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges
    const { currentPage, numPages } = this.props.pageContext
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? '/' : (currentPage - 1).toString()
    const nextPage = (currentPage + 1).toString()

    return (
      <DefaultLayout>
        <SEO
          title={siteTitle}
          keywords={[`mattie`, `mattie ellins`, `blog`, `mellins`, `matt ellins`, `matthew ellins`, `sitecore`, `code`, `hbf.com.au`, `rac.com.au`, `iinet.net.au`, `gatsby`, `javascript`, `react`]}
        />
        <div className="content-box clearfix">

        {currentPage == 1 && (
          <IntroLayout />
        )}

          {posts.map(({ node }) => {
            return (
              <article className="post" key={node.fields.slug}>
                {node.frontmatter.img &&
                  node.frontmatter.img.childImageSharp &&
                  node.frontmatter.img.childImageSharp.gatsbyImageData && (
                    <Link
                      to={node.fields.slug}
                      className="post-thumbnail"
                      style={{
                        backgroundImage: `url(${node.frontmatter.img.childImageSharp.gatsbyImageData.images.fallback.src})`,
                      }}
                    />
                  )}
                <div className="post-content">
                  <h2 className="post-title">
                    <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
                  </h2>
                  <p>{node.excerpt}</p>
                  <span className="post-date">
                    {node.frontmatter.date}&nbsp;&nbsp;—&nbsp;
                  </span>
                  <span className="post-words">
                    {node.timeToRead} minute read
                  </span>
                </div>
              </article>
            )
          })}
          <div className="container">
            <nav className="pagination" role="pagination">
              <ul>
                {!isFirst && (
                  <p>
                    <Link to={prevPage} rel="prev" className="newer-posts">
                      ← Previous Page 
                    </Link>
                    &nbsp;&nbsp;({currentPage} of {numPages})
                  </p>
                )}
                {!isLast && (
                  <p>
                    <Link to={nextPage} rel="next" className="older-posts">
                      Next Page → 
                    </Link>
                    &nbsp;&nbsp;({currentPage} of {numPages})
                  </p>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </DefaultLayout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query blogPageQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          timeToRead
          frontmatter {
            date(formatString: "YYYY, MMM DD")
            title
            img {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH, formats: [AUTO, AVIF, WEBP])
              }
            }
          }
        }
      }
    }
  }
`