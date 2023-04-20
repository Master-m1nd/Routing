import React, { useEffect, useState } from 'react';
import Card from './components/Card';
import Post from './components/Post'
import axios from 'axios';
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState('All');

  useEffect(() => {
    axios.get('/categories.json').then(function (response) {
      setCategories([{ id: 'all', title: 'All' }, ...response.data]);
    });
  }, []);

  useEffect(() => {
    axios.get('/articles.json').then(function (response) {
      setArticles(response.data);
      filterByCategory(response.data, filters);
    });
  }, []);

  useEffect(() => {
    console.log(filters);
    filterByCategory(articles, filters);
  }, [filters]);

  const filterByCategory = (articlesData, currentFilter) => {
    if (currentFilter === 'All') {
      setData(articlesData);
    } else {
      const filteredData = articlesData.filter(
        (el) => el.category && el.category.title === currentFilter
      );
      setData(filteredData);
    }
  };

  return (
<>
    <div className='container'>
        <h1>Popular topics</h1>
        <div className="categoriesWrap">
            {categories.map((el) => (
            <button
                key={el.id}
                className={`category ${filters === el.title ? 'categoryActive' : ''}`}
                onClick={() => {
                setFilters(el.title);
                }}
                >
                {el.title}
            </button>
            ))}
        </div>  
      <BrowserRouter>      
        <Routes>
        <Route path='/' element={
          <div className="cardWrap">
            {data.map((el, key) => (
            <Link key={el.id} to={`/posts/${el.id}`}>
              <Card
              key={key}
              img={el.image}
              date={el.published_at}
              title={el.title}
              description={el.description}
              author={el.author}
            />
            </Link>
            ))}
          </div>
        }/>
                <Route path='/posts/' element={
          <div className="cardWrap">
            {data.map((el, key) => (
            <Link key={el.id} to={`/posts/${el.id}`}>
              <Card
              key={key}
              img={el.image}
              date={el.published_at}
              title={el.title}
              description={el.description}
              author={el.author}
            />
            </Link>
            ))}
          </div>
        }/>
        <Route path='/posts/:id' element={<Post posts = {articles}/>
        }/>
       </Routes> 
      </BrowserRouter>
    </div>
</>
  );
}

export default App;