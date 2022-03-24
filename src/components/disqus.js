import React from 'react'
import { Disqus, CommentCount } from 'gatsby-plugin-disqus'

const DisqusLayout = (post) => {
  let disqusConfig = {
    identifier: post.id,
    title: post.title,
  }
  return (
    <>
      <Disqus config={disqusConfig} />
    </>
  )
}

export default DisqusLayout