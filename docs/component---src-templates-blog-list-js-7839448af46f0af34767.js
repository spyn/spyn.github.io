(self.webpackChunkflexible_gatsby=self.webpackChunkflexible_gatsby||[]).push([[544],{6179:function(e,t,a){"use strict";var n=a(7294),r=a(5414),l=a(5444);function i(e){var t=e.description,a=e.lang,i=e.meta,s=e.title,o=(0,l.useStaticQuery)("63159454").site,c=t||o.siteMetadata.description;return n.createElement(r.Z,{htmlAttributes:{lang:a},title:s,titleTemplate:"%s | "+o.siteMetadata.title,meta:[{name:"description",content:c},{property:"og:title",content:s},{property:"og:description",content:c},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:o.siteMetadata.author},{name:"twitter:title",content:s},{name:"twitter:description",content:c}].concat(i)})}i.defaultProps={lang:"en",meta:[],description:""},t.Z=i},4183:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return c}});var n=a(3552),r=a(7294),l=a(5444),i=a(1823),s=a(6179),o=function(){var e=(0,l.useStaticQuery)("63159454").site;return r.createElement(r.Fragment,null,r.createElement("article",{className:"intro"},r.createElement("div",null,r.createElement("h1",null,e.siteMetadata.title),r.createElement("p",null,"Hi! My name is Matt, or other people may know me as Mattie or spyn. Currently I'm working at RAC as a Sitecore .NET Developer, on the main website, working closely with the UX team to provide an enjoyable experience for our members. I was at iiNet as a developer, working on customer servicing tools, such as Toolbox and the Signup forms. I'm interested in home automation, technology, programming, design, music, board games, skating and running. I'm also a Dad!")),r.createElement("div",{className:"intro-tags"},r.createElement("ul",{className:"tag-list"}))))},c=function(e){function t(){return e.apply(this,arguments)||this}return(0,n.Z)(t,e),t.prototype.render=function(){var e=this.props.data,t=e.site.siteMetadata.title,a=e.allMarkdownRemark.edges,n=this.props.pageContext,c=n.currentPage,m=n.numPages,u=1===c,p=c===m,g=c-1==1?"/":(c-1).toString(),d=(c+1).toString();return r.createElement(i.Z,null,r.createElement(s.Z,{title:t,keywords:["blog","mellins","matt ellins","matthew ellins","sitecore","code","rac.com.au","iinet.net.au","gatsby","javascript","react"]}),r.createElement("div",{className:"content-box clearfix"},1==c&&r.createElement(o,null),a.map((function(e){var t=e.node;return r.createElement("article",{className:"post",key:t.fields.slug},t.frontmatter.img&&t.frontmatter.img.childImageSharp&&t.frontmatter.img.childImageSharp.gatsbyImageData&&r.createElement(l.Link,{to:t.fields.slug,className:"post-thumbnail",style:{backgroundImage:"url("+t.frontmatter.img.childImageSharp.gatsbyImageData.images.fallback.src+")"}}),r.createElement("div",{className:"post-content"},r.createElement("h2",{className:"post-title"},r.createElement(l.Link,{to:t.fields.slug},t.frontmatter.title)),r.createElement("p",null,t.excerpt),r.createElement("span",{className:"post-date"},t.frontmatter.date,"  — "),r.createElement("span",{className:"post-words"},t.timeToRead," minute read")))})),r.createElement("div",{className:"container"},r.createElement("nav",{className:"pagination",role:"pagination"},r.createElement("ul",null,!u&&r.createElement("p",null,r.createElement(l.Link,{to:g,rel:"prev",className:"newer-posts"},"← Previous Page"),"  (",c," of ",m,")"),!p&&r.createElement("p",null,r.createElement(l.Link,{to:d,rel:"next",className:"older-posts"},"Next Page →"),"  (",c," of ",m,")"))))))},t}(r.Component)}}]);
//# sourceMappingURL=component---src-templates-blog-list-js-7839448af46f0af34767.js.map