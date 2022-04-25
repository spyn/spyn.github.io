module.exports = {
  siteMetadata: {
    title: `360 Degrees of Awesome`,
    description: `I am a .NET developer specialising in Sitecore CMS`,
    author: `Mattie Ellins`,
    siteUrl: `https://spyn.me`,
    social: {
      twitter: `spyn`,
      facebook: `spynhugs`,
      github: `spyn`,
      linkedin: `mellins`,
      email: `mattie@outlook.com.au`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
/*          {
            resolve: `gatsby-remark-highlight-code`,
            options: {
              terminal: 'carbon',
              theme: 'yeti'
            }
          },          */
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 970,
              withWebp: true,
              withAvif: true,
            },
          },
          {
            resolve: `gatsby-remark-katex`,
            options: {
              strict: `warn`,
            },
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
            options: {
              destinationDir: `files`,
              ignoreFileExtensions: [`png`, `jpg`, `jpeg`, `bmp`, `tiff`, `webp`],
            },
          },
          `gatsby-remark-prismjs`,
        ],
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-19229033-2`,
      },
    },/*
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `flexible-gatsby-starter`,
        short_name: `flexible-gatsby`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `./static/gatsby-icon.png`, 
      },
    },*/
    // whats this? `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    // out of date (v2, not v3) `gatsby-transformer-ffmpeg`,
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `spyn-me`
      }
    },
  ],
}
