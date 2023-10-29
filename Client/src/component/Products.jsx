import React, { useEffect, useState } from 'react';
import { ProductListByRemark } from '../apiRequist/ApiRequest';

const Products = () => {

    const [data_new,setData_new]=useState([]);
    const [data_top,setData_top]=useState([]);
    const [data_trending,setData_trending]=useState([]);
    const [data_popular,setData_popular]=useState([]);
    const [data_special,setData_special]=useState([]);

    useEffect(()=>{
        (async()=>{
           let newProduct=await ProductListByRemark('new');
           setData_new(newProduct);

           let topProduct=await ProductListByRemark('top')
           setData_top(topProduct);

           let trendingProduct=await ProductListByRemark('trending');
           setData_trending(trendingProduct);

           let popularProduct=await ProductListByRemark('popular');
           setData_popular(popularProduct);

           let specialProduct=await ProductListByRemark('special');
           setData_special(specialProduct);

        })()
    },[0]);


    return (
        <div className="section">
            <div className="container-fluid py-5 bg-light">
                <div className="row">
                    <h1 className="headline-4 text-center my-2 p-0">Our Products</h1>
                    <span className="bodySmal mb-3 text-center">Explore a World of Choices Across Our Most Popular</span>

                    <div className="col-12">
                        <div>
                            <ul className="nav nav-pills  p-3  justify-content-center mb-3" id="pills-tab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-new" type="button" role="tab" aria-controls="pills-home" aria-selected="true">New</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-trending" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Trending</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-popular" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Popular</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="pills-disabled-tab" data-bs-toggle="pill" data-bs-target="#pills-top" type="button" role="tab" aria-controls="pills-disabled" aria-selected="false">Top</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="pills-disabled-tab" data-bs-toggle="pill" data-bs-target="#pills-special" type="button" role="tab" aria-controls="pills-disabled" aria-selected="false">Special</button>
                                </li>
                            </ul>
                            <div className="tab-content" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="pills-new" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex="0">
                                     <div className="container">
                                        <div className="row">
                                            <h1>New Product Lists</h1>
                                            {
                                                
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="tab-pane fade" id="pills-trending" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex="0">
                            <div className="tab-content" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="pills-new" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex="0">
                                     <div className="container">
                                        <div className="row">
                                            <h1>Trending Product Lists</h1>
                                            {
                                                
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>

                            <div className="tab-pane fade" id="pills-popular" role="tabpanel" aria-labelledby="pills-contact-tab" tabIndex="0">
                            <div className="tab-content" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="pills-popular" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex="0">
                                     <div className="container">
                                        <div className="row">
                                            <h1>Popular Product Lists</h1>
                                            {
                                                
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>

                            
                            <div className="tab-pane fade" id="pills-top" role="tabpanel" aria-labelledby="pills-disabled-tab" tabIndex="0">
                            <div className="tab-content" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="pills-top" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex="0">
                                     <div className="container">
                                        <div className="row">
                                            <h1>Top Product Lists</h1>
                                            {
                                                
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>

                            
                            <div className="tab-pane fade" id="pills-special" role="tabpanel" aria-labelledby="pills-disabled-tab" tabIndex="0">
                            <div className="tab-content" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="pills-special" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex="0">
                                     <div className="container">
                                        <div className="row">
                                            <h1>Special Product Lists</h1>
                                            {
                                                
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>    
            </div>
        </div>
    );
};

export default Products;