import {useEffect, useState} from 'react'
import {Container, PostForm} from '../components'
import service from "../AppWrite/Services";
import { useNavigate,  useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            service.getSinglePost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        }
        else {
            navigate('/')
        }
    }, [slug, navigate])

  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : <div className="text-center py-10">Loading...</div>
}

export default EditPost