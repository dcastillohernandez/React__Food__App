import { useState } from 'react';
import Search from '../../components/search';

const dummydata = 'dummydata';

const Homepage = () => {
    //loading state
    const [loadingState, setLoadingState] = useState(false);

    //save result that we receive from api
    const [recipes, setRecipes] = useState([]);

    const getDataFromSearchComponent = (getData) => {

        //keep the loading state as true before we are calling the api
        setLoadingState(true);
        console.log(getData, 'getData');

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
            console.log(result);
        }
        getReceipes();
    }

    console.log(loadingState, recipes, 'loadingState, recipes');

    return (
        <div className='homepage'>
            <Search getDataFromSearchComponent={getDataFromSearchComponent} dummydataCopy={dummydata} />
        </div>
    )
}

export default Homepage;



