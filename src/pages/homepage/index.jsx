import { useEffect, useState } from 'react';
import FavoriteItems from '../../components/favorite-item';
import RecipeItem from '../../components/favorite-item';
import Search from '../../components/search';
import './styles.css';

const Homepage = () => {
    //loading state
    const [loadingState, setLoadingState] = useState(false);

    //save result that we receive from api
    const [recipes, setRecipes] = useState([]);

    //favorite data state
    const [favorites, setFavorites] = useState([]);

    const getDataFromSearchComponent = (getData) => {

        //keep the loading state as true before we are calling the api
        setLoadingState(true);

        //Calling the Api 
        async function getReceipes() {
            const apiResponse = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=02bed3f525dc43e289fd94585eacbf84&query=${getData}`)
            const result = await apiResponse.json();
            const { results } = result;

            if (results && results.length > 0) {
                //set loading state as false again
                //set the recipes state 
                setLoadingState(false)
                setRecipes(results)
            }

        }
        getReceipes();
    }

    const addToFavorites = (getCurrentRecipeItem) => {

        let cpyFavorites = [...favorites];

        const index = cpyFavorites.findIndex(item => item.id === getCurrentRecipeItem.id)

        if (index === -1) {
            cpyFavorites.push(getCurrentRecipeItem)
            setFavorites(cpyFavorites)
            //save the favorite in local storage 
            localStorage.setItem('favorites', JSON.stringify(cpyFavorites))
        } else {
            alert('Items is already present in favorites')
        }
    }

    useEffect(() => {
        const extractFavoritesFromLocalStorageOnPageLoad = JSON.parse(localStorage.getItem('favorites'));
        setFavorites(extractFavoritesFromLocalStorageOnPageLoad)
    }, [])

    console.log(favorites);

    return (
        <div className='homepage'>
            <Search
                getDataFromSearchComponent={getDataFromSearchComponent}
            />

            {/* Show loading state */}
            {
                loadingState && <div className='loading'>Loading recipes ! Please waite. </div>
            }
            {/* Show loading state */}
            <div className='favorites-wrapper'>
                <h1 className='favorites-title'>Favorites</h1>
                <div className='favorites'></div>
            </div>
            {
                favorites && favorites.length > 0 ?
                    favorites.map(item => (
                        <FavoriteItems
                            id={item.id}
                            image={item.image}
                            title={item.title}
                        />
                    )) : null
            }
            {/* Show loading state */}
            {/* Show loading state */}

            {/* map through all the recipes */}
            <div className='items'>
                {
                    recipes && recipes.length > 0
                        ? recipes.map((item) => <RecipeItem
                            addToFavorites={() => addToFavorites(item)}
                            id={item.id}
                            image={item.image}
                            item={item}
                            title={item.title} />) : null
                }
            </div>
            {/* map through all the recipes */}
        </div>
    )
}

export default Homepage;








