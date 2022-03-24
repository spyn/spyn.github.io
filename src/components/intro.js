import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

const IntroLayout = () => {
    const { site } = useStaticQuery(
        graphql`
          query {
            site {
              siteMetadata {
                title
                description
                author
              }
            }
          }
        `
      )
    
  return (
    <>
        <article className="intro">
            <div>
                <h1 className="glow">{site.siteMetadata.title}</h1>
                <p>Hi! My name is Matt, or other people may know me as Mattie or spyn. Currently I'm working at HBF as a Sitecore Developer, while working on my React skills. I was working at RAC as a .NET Developer, working on their Sitecore platform supporting their main website. Before then I was at iiNet as a developer, working on customer servicing tools, such as Toolbox and the Signup forms. I'm interested in home automation, technology, programming, design, music, board games, skating and running. I'm also a Dad!</p>
            </div>
            <div className="intro-tags">
              <ul className="tag-list">
                
              </ul>
            </div>
        </article>
    </>
  )
}

export default IntroLayout