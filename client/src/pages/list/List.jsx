import "./list.css"
import Header from "../../components/header/Header.jsx"
import Navbar from "../../components/navbar/Navbar.jsx"
import {useLocation} from "react-router-dom"
import { format } from "date-fns"
import { useState } from "react"
import { DateRange } from "react-date-range"
import SearchItem from "../../components/searchItem/SearchItem.jsx"
import useFetch from "../../hooks/useFetch"
const List = () => {
  const location=useLocation()
  const [destination,setDestination]=useState(location.state.destination)
  const [dates,setDates]=useState(location.state.dates)
  const [openDate,setOpenDate]=useState(false)
  const [options,setOptions]=useState(location.state.options)
  const [min,setMin]=useState(undefined)
  const [max,setMax]=useState(undefined)

  const {data,loading,error,reFetch}=useFetch(`/hotels/getAllHotelwithCity?city=${destination}&min=${min || 0}&max=${max || 999}`)
  const handleClick=()=>{
    reFetch();

  }
  return (
    <div>
      
      <Navbar></Navbar>
      <Header type="list"></Header>
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input placeholder={destination} type="text" />

            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={()=>setOpenDate(!openDate)}>{`${format(dates[0].startDate,"MM/dd/yyyy")} to ${format(dates[0].endDate,"MM/dd/yyyy")}`}</span>
              {openDate&&<DateRange
              onChange={(item)=>setDates([item.selection])}
              minDate={new Date()}
              ranges={dates}></DateRange>}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input type="number" onChange={e=>setMin(e.target.value)} className="lsOptionInput"/>

                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input type="number" onChange={e=>setMax(e.target.value)} className="lsOptionInput"/>

                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Adult 
                  </span>
                  <input placeholder={options.adult} type="number" className="lsOptionInput"/>

                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Children <small>per night</small>
                  </span>
                  <input min={0} placeholder={options.children} type="number" className="lsOptionInput"/>

                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Room <small>per night</small>
                  </span>
                  <input min={1} placeholder={options.room} type="number" className="lsOptionInput"/>

                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>

          </div>
          <div className="listResult">
            {loading?"loading":<>
            {data.map(item=>(
              <SearchItem item={item} key={item._id}/>
            ))}
              
            </>}
            
       
            
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default List