import "./propertyList.css"
import UseFetch from "../../hooks/useFetch"
const propertyList = () => {

    const { data, loading, error } = UseFetch("/hotels/countByType")

    const images = [
        "https://q-xx.bstatic.com/xdata/images/xphoto/300x240/57584488.jpeg?k=d8d4706fc72ee789d870eb6b05c0e546fd4ad85d72a3af3e30fb80ca72f0ba57&o=",
        "https://r-xx.bstatic.com/xdata/images/hotel/300x240/119467716.jpeg?k=f3c2c6271ab71513e044e48dfde378fcd6bb80cb893e39b9b78b33a60c0131c9&o=",
        "https://r-xx.bstatic.com/xdata/images/xphoto/300x240/45450075.jpeg?k=d23cf8443780ac09f46f59e40393d75dbe64b06029b4959c60b81b7fdefc9be0&o=",
        "https://cf.bstatic.com/xdata/images/hotel/square600/121399207.webp?k=b0e7119a0ba3354de23997d3698aac0296822fd58a590d83ddbb372f8af887a9&o=&s=1",
        "https://cf.bstatic.com/xdata/images/hotel/square600/121399207.webp?k=b0e7119a0ba3354de23997d3698aac0296822fd58a590d83ddbb372f8af887a9&o=&s=1",
    ]
    return (
        <div className="pList">
            {loading ? (
                "loading"
            ) : (
                <>
                    {data && data.map((img, index) => (
                        

                        <div className="pListItem" key={index}>
                            
                            <img src={images[index]} alt="" className="pListImg" />
                            <div className="pListTitles">
                                <h1>{data[index]?.type}</h1>
                                <h2>{data[index]?.count} {data[index]?.type} </h2>
                            </div>
                        </div>
                    ))}

                </>

            )}


        </div>
    )
}

export default propertyList