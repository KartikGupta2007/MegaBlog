import React from 'react';
import services from '../AppWrite/Services';
import {Link} from 'react-router-dom';

export default function PostCard({$id,title, featuredImage}){
    return (
        <Link to ={`/post/${$id}`} >
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-centre mb-4'>
                    <img src={services.previewFile(featuredImage)} alt={title} className='rounded-xl'/>
                </div>
                <h2 className='text-xl font-bold'>{title}</h2>
            </div>
        </Link>
    )
}