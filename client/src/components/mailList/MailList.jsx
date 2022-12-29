import "./mailList.css"

const mailList = () => {
  return (
    <div className="mail">
        <h1 className="mailTitle">Save time,save money!</h1>
        <span className="mailDescription">Sign Up and we'll send the best deals to you</span>
        <div className="mainInputContainer">
            <input type="text" placeholder="Your Email"/>
            <button>Subscribe</button>
        </div>
    </div>
  )
}

export default mailList
