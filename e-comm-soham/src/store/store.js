import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
 
export const AuthContext = createContext();
 
export const AuthProvider = ({ children }) => {
 
  const [token, setToken] = useState("");
  const [user, setUser] = useState("");
  const [products, setProducts] = useState([]);
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [shortlistedProducts, setShortlistedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchedToken = localStorage.getItem('token');
    if (fetchedToken) {
      setToken(fetchedToken);
      console.log("token: " , token);
      const user = localStorage.getItem('user');
      if (user) {
        setUser(JSON.parse(user));
        console.log(user)
      }
    }
    setIsLoading(false); 
  }, []);
 
  useEffect(()=>{
    console.log(shortlistedProducts)
  },[shortlistedProducts])
 
  const setTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };
  const getTokenFromLS = () => {
    return localStorage.getItem("token");
  };
  const deleteTokenFromLS = () => {
    setToken("");
    localStorage.removeItem("token");
  };
 
  const addProductToShortlist = (product) => {
    setShortlistedProducts((prevShortlistedProducts) => [
      ...prevShortlistedProducts,
      {
        user_id: user.id,
        product_id: product.id,
        product_quantity: 1,
        product_total_price : product.price * 1
      },
    ]);
  };
 
  const increaseProductQuantity = (product) => {
    setShortlistedProducts((prevShortlistedProducts) =>
      prevShortlistedProducts.map((Product) => {
        if (Product.product_id === product.id) {
          const newQuantity = Product.product_quantity + 1;
          return {
            ...Product,
            product_quantity: newQuantity,
            product_total_price: product.price * newQuantity,
          };
        } else {
          return Product;
        }
      })
    );
  };
  
  const decreaseProductQuantity = (product) => {
    setShortlistedProducts((prevShortlistedProducts) =>
      prevShortlistedProducts
        .map((Product) => {
          if (Product.product_id === product.id) {
            const newQuantity = Product.product_quantity - 1;
            return {
              ...Product,
              product_quantity: newQuantity,
              product_total_price: product.price * newQuantity,
            };
          } else {
            return Product;
          }
        })
        .filter((Product) => Product.product_quantity > 0)
    );
  };
  
 
  const removeProductFromShortlist = async (shortlistId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/data/shortlists/${shortlistId}`);
      if (response.status === 200) { 
        toast.success("Product deleted successfully");
        setShortlistedProducts((prevShortlistedProducts) =>
          prevShortlistedProducts.filter((Product) => Product.shortlist_id !== shortlistId)
        );
      } else {
        toast.error("Failed to delete Product: " + shortlistId);
      }
    } catch (error) {
      console.error("Error deleting Product:", error);
      toast.error("Error deleting Product:", error);
    }
  };
 
  const fetchShortlistedProducts = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/data/shortlists/${userId}`);
      if (response.status === 200) { 
        setShortlistedProducts(response.data);
      } else {
        throw new Error(`Error fetching shortlisted products: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error fetching shortlisted products:", error);
    }
  };

  const logout = async () =>{
    deleteTokenFromLS();
    localStorage.removeItem('user')
  }
 
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        
        token,
        products,
        

        deliveryAddress,
        setDeliveryAddress,
        
        shortlistedProducts,
        setShortlistedProducts,
 
        isLoading,
        setIsLoading,
       
        setTokenInLS,
        getTokenFromLS,
        deleteTokenFromLS,
 
        removeProductFromShortlist,
        fetchShortlistedProducts,
 
        addProductToShortlist,
        increaseProductQuantity,
        decreaseProductQuantity,

        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
 
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
 