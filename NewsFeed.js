
import { useEffect, useState } from 'react'
import axios from 'axios'

const NewsFeed = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const options = {
                method: 'GET',
                url: 'https://crypto-news-live9.p.rapidapi.com/news/CryptoNews',
                headers: {
                    'x-rapidapi-key': '959e098acamshb3e7320400a3994p1c5786jsnf2a5c5998b93',
                    'x-rapidapi-host': 'crypto-news-live9.p.rapidapi.com'
                }
            };

            try {
                const response = await axios.request(options);
                console.log(response.data);
                setArticles(response.data); // assuming response.data is an array
            } catch (error) {
                console.error('Error fetching the data:', error);
            }
        };

        fetchData();
    }, []);

    console.log(articles)

    const first7articles = articles?.slice(0,7)

    return (
      <div className = "news-feed">
        <h2>News Feed</h2>
        {first7articles?.map((article, _index) => (
            <div key = {_index}>
                <a href = {article.url}><p>{article.title}</p></a>
            </div>))}
         
      </div>
    )
  }

export default NewsFeed