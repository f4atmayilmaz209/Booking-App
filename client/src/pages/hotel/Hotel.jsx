import "./hotel.css"
import Navbar from "../../components/navbar/Navbar.jsx"
import Header from "../../components/header/Header.jsx"
import MailList from "../../components/mailList/MailList.jsx"
import Footer from "../../components/footer/Footer.jsx"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import {useContext, useState} from "react"
import useFetch from "../../hooks/useFetch"
import {useLocation, useNavigate} from "react-router-dom"
import { SearchContext } from "../../context/SearchContext"
import { AuthContext } from "../../context/authContext"
import Reserve from "../../components/reserve/Reserve"

const Hotel = () => {
  const location=useLocation()
  const id=location.pathname.split("/")[2]

  const [slideNumber,setSlideNumber]=useState(0);
  const [open,setOpen]=useState(false);
  const [openModal,setOpenModal]=useState(false);
  const {data,loading,error}=useFetch(`/hotels/find/${id}`)
  const {user} =useContext(AuthContext)
  const navigate=useNavigate()

  const {dates,options}=useContext(SearchContext)
  
  const MILLISECONDS_PER_DAY=1000*60*60*24;
  function dayDifference(date1,date2){
    const timeDiff=Math.abs(date2.getTime()-date1.getTime())
    const diffDays=Math.ceil(timeDiff/MILLISECONDS_PER_DAY)
    return diffDays
  }

  const days=dayDifference(dates[0].endDate,dates[0].startDate)


  const handleOpen=(i)=>{
    setSlideNumber(i)
    setOpen(true)


  }
  const handleMove=(direction)=>{
    let newSlideNumber;
    if (direction){
      newSlideNumber=slideNumber===0 ? 5:slideNumber-1
    }else{
      newSlideNumber=slideNumber===5 ? 0:slideNumber+1
    }
    setSlideNumber(newSlideNumber)
  }
  const handleClick=()=>{
    if (user){
      console.log("hello")
      setOpenModal(true)

    }else{
      navigate("/login")
    }

  }
  return (
    <div>
      <Navbar></Navbar>
      <Header type="list"></Header>
      {loading ? ("loading"):(
      <div className="hotelContainer">
        {open &&<div className="slider">
          <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={()=>setOpen(false)}></FontAwesomeIcon>
          <FontAwesomeIcon icon={faCircleArrowLeft} onClick={()=>handleMove("l")} className="arrow"></FontAwesomeIcon>
          <div className="sliderWrapper">
            <img src={data.photos[slideNumber]} alt="" className="sliderImg" />

          </div>
          <FontAwesomeIcon icon={faCircleArrowRight} onClick={()=>handleMove("r")} className="arrow"></FontAwesomeIcon>

        </div>}
        <div className="hotelWrapper">
          <button class="bookNow">Reserve or Book Now!</button>
          <h1 className="hotelTitle">{data.name}</h1>
          <div className="hotelAddres">
            <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon>
            <span>{data.address}</span>
          </div>

          <span className="hotelDistance">{data.distance}m from center</span>
          <span className="hotelPriceHighlight">Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi</span>
          <div className="hotelImages">
            {data.photos?.map((photo,i)=>(
              <div className="hotelImgWrapper">
                <img onClick={()=>handleOpen(i)} src={photo} alt="" className="hotelImg"/>

              </div>
            ))}

          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">{data.title}</h1>
              <p className="hotelDesc">
                {data.desc}
              </p>

            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a {days}-night stay!</h1>
              <span>
                Located in the real heart of Krakow, this property has an
                excellent location score of 9.8!
              </span>
              <h2>
                <b>$</b> {days*data.cheapestPrice*options.room}({days} nights)
              </h2>
              <button onClick={handleClick}>Reserve or Book Now!</button>
              
            </div>
          </div>

        </div>
        <MailList></MailList>
        <Footer></Footer>

      </div>)}
      {openModal&&<Reserve setOpen={setOpenModal} hotelId={id}></Reserve>}
  

    </div>
  )
}

export default Hotel