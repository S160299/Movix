import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZGIyYjUwN2NjZDhiYzg2NjZiYjM5Njc1Zjk1MTY0MiIsInN1YiI6IjY0OWZiMzFjMGNiMzM1MDEzOGZjMzgyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.s12SR0ma2ELs_Ff-CFR8RwE_OjpISDE7nDNgsbKj5K8";

const headers = {
    Authorization: "bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async (url, params) => {
    try {
        const { data } = await axios.get(BASE_URL + url, { headers, params });
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
};
