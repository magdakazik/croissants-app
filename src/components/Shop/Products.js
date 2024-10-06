import {useState, useEffect} from 'react'

import ProductItem from './ProductItem';
import classes from './Products.module.css';


const Products = (props) => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [httpError, setHttpError] = useState()

  useEffect(() => {
    const fetchProducts = async() => {
        const response = await fetch('https://api.edamam.com/search?app_id=900da95e&app_key=40698503668e0bb3897581f4766d77f9&q=croissants')

        if(!response.ok){
            throw new Error('Something went wrong!')
        }

        const responseData = await response.json()
        const responseDataLoaded = responseData.hits
        const loadedProducts = []

        
        //transforming the data to be better readable
        for(const key in responseDataLoaded){
            loadedProducts.push({
              id: key,
              title: responseDataLoaded[key].recipe.label
            })
          }

          
          setProducts(loadedProducts)
          setIsLoading(false)
    }

    fetchProducts().catch((error) => {
        setIsLoading(false)
        setHttpError(error.message)
    })
  }, [])

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {products.map(product => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
        />
        ))}
        
      </ul>
    </section>
  );
};

export default Products;
