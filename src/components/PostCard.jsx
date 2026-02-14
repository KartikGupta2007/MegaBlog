import React from 'react';
import services from '../AppWrite/Services';
import {Link} from 'react-router-dom';

export default function PostCard({$id,Title,FeaturedImage}){
    return (
        <Link to ={`/post/${$id}`} >
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    <img
                        src={services.previewFile(FeaturedImage)}
                        alt={Title}
                        className="w-full h-40 object-cover rounded-xl"
                    />
                </div>
                <h2 className='text-xl font-bold'>{Title}</h2>
            </div>
        </Link>
    )
}