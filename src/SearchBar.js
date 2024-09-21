import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMemory, faMobileAlt, faBatteryFull, faCamera } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./SearchBar.css";
const phoneDetails = {
    image: 'https://images.samsung.com/is/image/samsung/p6pim/uk/sm-a256bzydeub/gallery/uk-galaxy-a25-5g-sm-a256-sm-a256bzydeub-539504418?$650_519_PNG$',
    name: 'Samsung Galaxy A25 5G',
    description:
      'The Samsung Galaxy A25 5G brings blazing-fast speeds, a stunning Super AMOLED display, and a massive battery to keep you going throughout the day.',
    storage: '128GB',
    display: '6.6 inches, Super AMOLED',
    battery: '5000mAh',
    camera: '64MP + 12MP + 5MP Triple Camera',
  };
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [spec, setSpec] = useState({});
  const [options, setOptions] = useState(["Device with large screen size", "High performance devices", "Super zoom with macro smartphone", "Compact yet high performance smartphone"]);
  const [isSearched, setIsSearched] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setLoading(true);
    console.log(searchTerm);
    const prompt = searchTerm;
    try {
      const response = await fetch('http://localhost:5001/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setImageUrl(data.url);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      await fetch(`http://localhost:5000/api/suggested-prompts`)
        .then((res) => res.json())
        .then((res) => setOptions(res))
        .catch((e) => console.error(e));
    };

    const timer = setTimeout(() => {
      fetchData();
    }, 5000);

    return () => clearTimeout(timer);
  });

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };
  const handleSearchClick = () => {
    if (searchTerm.trim() === "") return;
    
    setIsSearched(true);
    // Suggestion API   
 
    // Simulate API call with a fake endpoint
    fetch(`http://localhost:5000/api/product-specifications?prompt=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        // Only show top 5 results
        // setSearchResults(data.slice(0, 5));
        setSpec(data?.specifications);
      })
      .catch((error) => {   
        console.error("Error fetching data:", error);
      });

      generateImage();

  };

  return (
    
    <div className="search-bar-container">
      <div className="imagine-text cedarville-cursive-regular">#imagineyourdevice</div>
      <div className="search-bar">
        <div className="placeholder-above .inter-100">What device are you imagining?</div>
        <div className="input-container">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <button className="search-icon-button" onClick={handleSearchClick}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <div className="options mb-4">
          {options.map((option, index) => (
            <button key={index} onClick={() => console.log(option)}>
              <span>{option.trim()}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Display search results below the search bar */}
      {searchResults.length > 0 && (
        <div className="search-results">
          <h3>Search Results:</h3>
          <ul>
            {searchResults.map((result) => (
              <li key={result.id}>{result.title}</li>
            ))}
          </ul>
        </div>
      )}
      {loading && <div className="loader mt-4"></div>}
      {<div className="row mt-4 p-4 bg-black text-light">
        <h3 className='text-center my-4 cedarville-cursive-regular'>Bringing your #imagination to life</h3>
        <div className="row align-items-center my-4">
        {/* Phone Image */}
        {/* <div className="col-md-1 mt-4 text-center"></div> */}
        <div className="col-md-6 my-4 text-center">
          <img
            src="./imageai.png"
            alt="Galaxy"
            className="img-fluid"
            style={{ maxWidth: '50%' }}
          />
        </div>
        {/* Phone Description and Features */}
        {/* <div className="col-md-1 mt-4 text-center"></div> */}
        <div className="col-md-6">
          <h2 className="mb-3">Specifications</h2>
          <p className="mb-4">Smartphone set in modern landscape, amazing blue display, slim and compact that lasts upto 48 hours on basic usage.</p>

          {/* Features */}
          <ul className="list-unstyled">
            <li className="mb-3">
              <FontAwesomeIcon icon={faMemory} className="me-2 text-primary" />
              <strong>Design:</strong> {spec?.design ? spec?.design : "Curved"}
            </li>
            <li className="mb-3">
              <FontAwesomeIcon icon={faMobileAlt} className="me-2 text-primary" />
              <strong>Color:</strong> {spec?.color ? spec?.color : "Black"}
            </li>
            <li className="mb-3">
              <FontAwesomeIcon icon={faBatteryFull} className="me-2 text-primary" />
              <strong>Battery:</strong> {spec?.battery ? spec?.battery : "6000Mah"}
            </li>
            <li className="mb-3">
              <FontAwesomeIcon icon={faCamera} className="me-2 text-primary" />
              <strong>Camera:</strong> {spec?.camera ? spec?.camera : "12MP"}
            </li>
            <li className="mb-3">
            <button type="button" class="btn btn-light">Request for Innovation</button>
            </li>
            
          </ul>
        </div>
      </div></div>}
      { <div className="row align-items-center mt-4">
        {/* Phone Image */}
        <h4 className='mt-4 text-center'>Until then, here is our imagination for you</h4>
        <div className="col-md-6 text-center">
          <img
            src={phoneDetails.image}
            alt={phoneDetails.name}
            className="img-fluid"
            style={{ maxWidth: '80%', borderRadius: '15px' }}
          />
        </div>

        {/* Phone Description and Features */}
        <div className="col-md-6">
          <h2 className="mb-3">{phoneDetails.name}</h2>
          <p className="mb-4">{phoneDetails.description}</p>

          {/* Features */}
          <ul className="list-unstyled">
            <li className="mb-3">
              <FontAwesomeIcon icon={faMemory} className="me-2 text-primary" />
              <strong>Storage:</strong> {phoneDetails.storage}
            </li>
            <li className="mb-3">
              <FontAwesomeIcon icon={faMobileAlt} className="me-2 text-primary" />
              <strong>Display:</strong> {phoneDetails.display}
            </li>
            <li className="mb-3">
              <FontAwesomeIcon icon={faBatteryFull} className="me-2 text-primary" />
              <strong>Battery:</strong> {phoneDetails.battery}
            </li>
            <li className="mb-3">
              <FontAwesomeIcon icon={faCamera} className="me-2 text-primary" />
              <strong>Camera:</strong> {phoneDetails.camera}
            </li>
            <li className="mb-3">
            <button type="button" class="btn btn-primary">Buy Now</button>
            </li>
          </ul>
        </div>
      </div>}
    </div>
  );
};

export default SearchBar;
