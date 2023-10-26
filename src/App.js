// import './App.css';

import axios from "axios"
import {Dashboard} from './component/Dashboard/Dashboard'
import {AllProduct} from './component/allproduct/allProduct'
import {ShowProduct} from './component/ShowProduct/ShowProduct'
import {AddProduct} from './component/addProduct/addProduct'
import {EditProduct} from './component/editProduct/editProduct'
import {ShowOrders} from './component/showorders/showOrders'
import {ShowOrder} from './component/showOrder/showOrder'
import {Category} from './component/Category/Category'
import {AddCategory} from './component/addCategory/addCategory'
import {EditCategory} from './component/editCategory/editCategory'
import {NavBar} from './component/navbar/NavBar'
import {ShowCoupon} from './component/ShowCoupon/ShowCoupon'
import {EditCoupon} from './component/editCoupon/editCoupon'
import {AddCoupon} from './component/addCoupon/addCoupon'
import {SearchProduct} from './component/search-product/searchProduct'
import {SignIn} from './component/Signin/SignIn'
import {ShowHighlights} from './component/showHighlights/showHighlights'
import {AddHighlight} from './component/addHighlight/addHighlight'
import {NotFound} from './component/notFound/notFound'
import {PaymentModeControl} from './component/paymentModeControl/paymentMode'
import {BankDetailsControl} from './component/Bankdetails/bankdetails'
import {DeliveryChargeControl} from './component/deliverychargecontrol/DeliveryCharge'
import {PolicyControl} from './component/policyControl/policyControl'

import {SearchBar} from "./component/search_bar"
import {Provider} from "react-redux"
import {store} from "./store"
import {CategoryProducts} from './component/categoryproducts/categoryproduct'
import './general.css'
import {BrowserRouter as Router ,Routes,Route,Link} from "react-router-dom"
function App() {
  
  return (
    <div className="App" style={{position:"relative"}} >
      <Provider store={store}>
      <Router>

     <NavBar />
    
        <Routes>
        

     
        
          <Route path='/' element={<><SearchBar /><Dashboard/></>}/>
          <Route path='/signin' element={<SignIn/>} />
          <Route path='/allproduct/:page_no' element={<><SearchBar /><AllProduct/></>} />
          <Route path='/showproduct/:product_id' element={<><SearchBar /><ShowProduct/></>} />
          <Route path='/addproduct' element={<><SearchBar /><AddProduct/></>} />
          <Route path='/editproduct/:product_id' element={<><SearchBar /><EditProduct/></>} />
          <Route path='/allorders/:page_no' element={<><SearchBar /><ShowOrders/></>} />
          <Route path='/showorder/:order_id' element={<><SearchBar /><ShowOrder/></>} />
          <Route path='/allcategory' element={<><SearchBar /><Category/></>} />
          <Route path='/addcategory' element={<><SearchBar /><AddCategory/></>} />
          <Route path='/editcategory/:category_id' element={<><SearchBar /><EditCategory/></>} />
          <Route path='/allcouponcode' element={<><SearchBar /><ShowCoupon /></>} />
          <Route path='/editcoupon/:coupon_id' element={<><SearchBar /><EditCoupon /></>} />
          <Route path='/addcoupon' element={<><SearchBar /><AddCoupon /></>} />
          <Route path='/search-product/:search_name/:page_no' element={<><SearchBar /><SearchProduct /></>} />
          <Route path='/allhighlights' element={<><SearchBar /><ShowHighlights /></>} />
          <Route path='/addhighlight' element={<><SearchBar /><AddHighlight /></>} />
          <Route path='/*' element={<><NotFound /></>} />
          <Route path='/categoryproducts/:category_name/:page_no' element={<><CategoryProducts /></>} />
          <Route path='/payment-mode-control' element={<><SearchBar />< PaymentModeControl /></>} />
          <Route path='/bank-details-control' element={<><SearchBar />< BankDetailsControl /></>} />
          <Route path='/delivery-charge-control' element={<><SearchBar />< DeliveryChargeControl /></>} />
          <Route path='/policy-details-control' element={<><SearchBar />< PolicyControl /></>} />

        </Routes>
       
        
      </Router>
      </Provider>
    </div>
  );
}

export default App;
