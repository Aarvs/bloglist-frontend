import { useSelector } from "react-redux"

const Notification = () => {
    const notification = useSelector(state => state.blogs)
    return(
        <div>
            <p style={{color:"greenyellow", padding:"10px", backgroundColor:"red", margin:"5px", border:"2px solid black"}}>
                {notification}
            </p>
        </div>
    )
}


export default Notification