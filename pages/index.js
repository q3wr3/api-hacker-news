import React from "react";
import { useRouter } from 'next/router'
import Layout from '../components/layout'
import Link from "next/link";

export default function Home({ posts }) {
  return (
    <Layout>
      <section>
        {posts.map((post) => (
          <article>
          <div>Meta</div>
            <Link href={post.url}>
              <a>{post.title}</a>
            </Link>
          </article>
        ))}
     
      </section>
    </Layout>
  )
}



export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  let posts = await getData().then(data => {
    return Promise.resolve(data)
  })
  console.log(posts);


  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts
    },
  }
}


const fetchList = async () => {
  const res = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
  const data = await res.json()
  return Promise.resolve(data)
}

const getItemData = async item => {
  const ress =  await fetch('https://hacker-news.firebaseio.com/v0/item/'+item+'.json')
  const data = await ress.json()
  return Promise.resolve(data)
}

const getData = async () => {
  let list = await fetchList();
  return Promise.all(list.slice(0, 5).map(item => getItemData(item)))
}


