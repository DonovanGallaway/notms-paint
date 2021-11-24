import {useState, useEffect} from 'react'
import {Link} from "react-router-dom"

const Community = (props) => {

    

    const gallery = props.gallery


    useEffect(()=>{
        props.getGallery()
    },[])


    if (gallery && gallery.length){
        return <main className="community">
            <h1>The Scribble Community Art Board</h1>
            <p>Want to add your work to the board?</p>
            <Link to="/draw">
                    <button>Start Drawing</button>
            </Link>
            <div className="gallery">
            {gallery.map((x, index)=> {
                if (x.dataURL){
                    return <div className="gallery-image" key={x._id}>
                    <img src={x.dataURL}/>
                    </div>
                }
                
            })}
            </div>
        </main>
    } else {
        return <h1>Loading Gallery...</h1>
    }
}

export default Community