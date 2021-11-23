import {useState, useEffect} from 'react'

const Community = (props) => {

    

    const gallery = props.gallery


    useEffect(()=>{
        props.getGallery()
    },[])


    if (gallery && gallery.length){
        return <main>
            {gallery.map((x)=> {
                return <div key={x._id}>
                    <img src={x.dataURL}/>
                </div>
            })}
        </main>
    } else {
        return <h1>Loading Gallery...</h1>
    }
}

export default Community