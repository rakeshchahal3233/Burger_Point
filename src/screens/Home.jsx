import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

function Home() {

  const [foodItem, setFoodItem] = useState([]);
  const [foodCat, setFoodCart] = useState([]);
  const [search, setSearch] = useState('');

  const loadData = async () => {
    let response = await fetch("http://localhost:8000/api/foodData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });

    response = await response.json();

    //  console.log(response[0],response[1]);

    setFoodItem(response[0]);
    setFoodCart(response[1]);
  }

  useEffect(() => {
    loadData();
  }, []);


  return (
    <div style={{backgroundImage: 'url("https://media.istockphoto.com/id/1204969069/video/night-starry-skies-with-twinkling-stars-motion-background-looping-seamless-space-backdrop.jpg?s=640x640&k=20&c=K9_7GfXEGbEMbBmlMZduzEx8300-eYOfi7ak8tXsMWo=")'}}>
      <div><Navbar /></div>

      {/* *************************** Carousel and Search ************* */}
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
          <div className="carousel-inner" id='carousel'>
            <div className='carousel-caption' style={{ zIndex: '10' }}>
              <div className="d-flex justify-content-center">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                {/* <button className="btn btn-outline-success text-white " type="submit">Search</button> */}
              </div>
            </div>

            <div className="carousel-item active">
              <img src="https://picsum.photos/900/700?random=1" className="d-block w-100 " style={{ filter: "brightness(40%)", objectFit: "cover", maxHeight: "35rem" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://picsum.photos/900/700?random=2" className="d-block w-100" style={{ filter: "brightness(40%)", objectFit: "cover", maxHeight: "35rem" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://picsum.photos/900/700?random=3" className="d-block w-100" style={{ filter: "brightness(40%)", objectFit: "cover", maxHeight: "35rem" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://picsum.photos/900/700?random=4" className="d-block w-100" style={{ filter: "brightness(40%)", objectFit: "cover", maxHeight: "35rem" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://picsum.photos/900/700?random=5" className="d-block w-100" style={{ filter: "brightness(40%)", objectFit: "cover", maxHeight: "35rem" }} alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/* *************************** body ************* */}

      <div className='container'>
        {
          foodCat.length !== 0                       //This is for print the food Catagory
            ? foodCat.map((data) => {
              return (
                <div className='row mb-3' key={data._id}>
                  <div className="fs-3 m-3" >
                    {data.CategoryName}
                  </div>
                  <hr style={{borderColor: 'white',height:'5px'}}/>

                  {foodItem.length !== 0                 //This is for print the food items 
                    ? foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                      .map((filterItem) => {             //Compare the food_item data with the food_catgorey file.
                        return (
                          <div key={filterItem._id} className='col-12 col-md-6 col-lg-3'>
                            <Card
                              foodItem = {filterItem}
                              options={filterItem.options[0]}
                            />
                          </div>
                        )
                      })
                    :
                    <div>No Such Data Found</div>
                  }
                </div>
              )
            })
            :
            ""
        }
      </div>

      {/* *************************** Footer ************* */}


      <div><Footer /></div>
    </div>
  )
}

export default Home