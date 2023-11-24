import { useState,useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { fetchDataFromApi } from './utils/api';
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration , getGenres} from './store/homeSlice';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import Details from './pages/details/Details';
import SearchResults from './pages/searchResult/SearchResult';
import Explore from './pages/explore/Explore';
import PageNotFound from  './pages/404/PageNotFound';

function App() {
  const dispatch = useDispatch()
  const {url} = useSelector((state) => state.home)
  console.log(url);
  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);

  // const apiTesting = async () => {
  //   try {
  //     const res = await fetchDataFromApi('/movie/popular');
  //     console.log(res);
  //     dispatch(getApiConfiguration(res))
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration")
    .then((res) => {
        console.log(res);
        const url = {
          backdrop: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "original",
          profile: res.images.secure_base_url + "original",
        }
        dispatch(getApiConfiguration(url));
      })
    .catch((err) => {
        console.error('Error fetching data:', err);
      });
  };

  const genresCall = async () => {
    try {
      let promises = [];
      let endPoints = ["tv", "movie"];
      let allGenres = {};
  
      endPoints.forEach((url) => {
        promises.push(fetchDataFromApi(`/genre/${url}/list`));
      });
  
      const data = await Promise.all(promises);
  
      data.forEach(({ genres }) => {
        genres.forEach((item) => (allGenres[item.id] = item));
      });
  
      dispatch(getGenres(allGenres));
    } catch (error) {
      console.error("Error fetching genre data:", error);
    }
  };
  

  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/:mediaType/:id' element={<Details />} />
      <Route path='/search/:query' element={<SearchResults />} />
      <Route path='/explore/:mediaType' element={<Explore />} />
      <Route path='*' element={<PageNotFound />} />
    </Routes>
    <Footer />
    </BrowserRouter>
  );
}

export default App;
