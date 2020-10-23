import React from "react";
import { useRouter } from 'next/router'
import Layout from '../components/layout'
import Link from "next/link";
import since from "since-time-ago";




export default function Home({ first }) {
  
  return (
    <Layout>
      <section>
        {first.map((post) => (
          <Link href={post.url} >
            <a>
              <article>
               <div className="image">
                  <img src={post.image} />
                </div>
                <div className="item">
                  <div className="info">
                    <div className="title">{post.title}</div>
                    <div className="desc"></div>
                  </div>
                 
                </div>
                <div className="meta">
                  <div className="time-ago">🕘 {since(new Date(post.time * 1000))}</div>
                  <div className="comments">💬 {post.kids.length}</div>
                  <div className="rep">👍 {post.score}</div>
                  <div className="rep">👤 {post.by}</div>
                </div>
                
                  
                
              </article>
            </a>
          </Link>
        ))}
     
      </section>
    </Layout>
  )
}



export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  let posts = await getData(0,6).then(data => {
    return Promise.resolve(data)
  })
  let list = posts.list;
  let first = posts.first;
  console.log(posts.first)

  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      first,
      list
    },
  }
}


const fetchList = async () => {
  const res = await fetch('https://hacker-news.firebaseio.com/v0/beststories.json')
  const data = await res.json()
  return Promise.resolve(data)
}

const getItemData = async item => {
  const ress =  await fetch('https://hacker-news.firebaseio.com/v0/item/'+item+'.json')
  const data = await ress.json()
  const fetchImage = await fetch('https://api.cognitive.microsoft.com/bing/v7.0/images/search?q='+data.title+'&count=1&licence=public' ,{
    headers : {
    'Ocp-Apim-Subscription-Key' : 'ffd1244998e5497f99629d1ae4ef5771',
    }
  })
  const image = await fetchImage.json();
  data['image'] = image.value[0] ? image.value[0].thumbnailUrl : '/defaultimage.jpg'
  
  return Promise.resolve(data)
}

const getData = async (s,q) => {
  let list = await fetchList();
  let first = await Promise.all(list.slice(s, q).map(item => getItemData(item)))
  return {list:list,first:first}
}


