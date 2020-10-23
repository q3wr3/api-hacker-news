import React, { useEffect, useState, useRef  } from 'react';
import { useRouter } from 'next/router'
import Layout from '../components/layout'
import Link from "next/link";
import since from "since-time-ago";




export default function Home({posts}) {

    // initialize list of posts
    const [postData, setPostData] = useState({
        posts: posts
    }); 

    const [page, setPage] = useState(1);
    // add loader refrence 
    const loader = useRef(null);

    useEffect(() => {
         var options = {
            root: null,
            rootMargin: "20px",
            threshold: 1.0
         };
        // initialize IntersectionObserver
        // and attaching to Load More div
         const observer = new IntersectionObserver(handleObserver, options);
         if (loader.current) {
            observer.observe(loader.current)
         }

    }, []);


    useEffect( async() => {
        // here we simulate adding new posts to List
        const start = postData.posts.q + 1;
        const end = start + 3;

        const fetchNew = await getData(start,end)
        const newList = postData.posts.list.concat(fetchNew.list);
        fetchNew.list = newList; 
        setPostData({
            posts: fetchNew
        })
    }, [page])

    // here we handle what happens when user scrolls to Load More div
   // in this case we just update page variable
    const handleObserver = (entities) => {
        const target = entities[0];
        if (target.isIntersecting) {   
            setPage((page) => page + 1)
        }
    }


  
  return (
    <Layout>
      <section id="scrollable">
        {postData.posts.list.map((post,key) => (
          <Link href={post.url} key={key}>
            <a className="article">
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
        <div className="loading" ref={loader}>
                  <h2>Loading...</h2>
         </div>
      </section>
    </Layout>
  )
}



export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  let posts = await getData(0,3).then(data => {
    return Promise.resolve(data)
  })


  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts
    },
  }
}

  //  
    const fetchList = async () => {
      const res = await fetch('https://hacker-news.firebaseio.com/v0/beststories.json')
      const data = await res.json()
      return Promise.resolve(data)
    }

    const getItemData = async item => {
      const ress =  await fetch('https://hacker-news.firebaseio.com/v0/item/'+item+'.json')
      const data = await ress.json()
      const fetchImage = await fetch(encodeURI('https://api.cognitive.microsoft.com/bing/v7.0/images/search?q='+data.title+'&count=1&licence=public') ,{
        headers : {
        'Ocp-Apim-Subscription-Key' : 'e733504234574b0daa12f241d67b2e19', //TODO Place in .env
        }
      })
      const image = await fetchImage.json();
      data['image'] = !image.error && image.value[0] ? image.value[0].thumbnailUrl : '/defaultimage.jpg'
      if (image.error) console.log(image.error)
      
      return Promise.resolve(data)
    }

    const getData = async (s,q) => {
      let fullList = await fetchList();
      let list = await Promise.all(fullList.slice(s, q).map(item => getItemData(item)))
      return await {fullList:fullList,list: list,s:s,q:q}
    }
  //