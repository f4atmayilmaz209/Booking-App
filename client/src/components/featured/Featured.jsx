
import useFetch from "../../hooks/useFetch"
import "./featured.css"
const Featured = () => {

  const {data,loading,error}=useFetch("/hotels/countByCity?cities=Berlin,Madrid,London")
  
  return (
    <div className="featured">
      {loading?(
        "Loading please wait"
      ):(
      <>
      <div className="featuredItem">
        <img src="https://cf.bstatic.com/xdata/images/city/540x270/220677.webp?k=3ed28863c69557e87ce9f0d5dfda0f8d1818a97d0a59c4317533d136c5857b19&o=" alt="" className="feauturedImg" />
        <div className="featuredTitles">
          <h1>Berlin</h1>
          <h1>{data[0]} properties</h1>
        </div>
      </div>
      <div className="featuredItem">
        <img src="https://cf.bstatic.com/xdata/images/hotel/square600/121399207.webp?k=b0e7119a0ba3354de23997d3698aac0296822fd58a590d83ddbb372f8af887a9&o=&s=1" alt="" className="feauturedImg" />
        <div className="featuredTitles">
          <h1>Madrid</h1>
          <h1>{data[1]} properties</h1>
        </div>
      </div>
      <div className="featuredItem">
        <img src="https://cf.bstatic.com/xdata/images/city/540x270/776096.webp?k=0ccd99b27f654cef0665d74308f9778e985623ce60c41de43ab9faac555bc97a&o=" alt="" className="feauturedImg" />
        <div className="featuredTitles">
          <h1>Dubai</h1>
          <h1>{data[2]} properties</h1>
        </div>
      </div>
      </>)}
    </div>
  )
}

export default Featured