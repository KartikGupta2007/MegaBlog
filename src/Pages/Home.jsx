import { useEffect, useState } from "react";
import service from "../AppWrite/Services";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
  const isLoggedIn = useSelector((state) => state.auth.status);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!isLoggedIn){
      setPosts([]);
      return;
    }

    service.getAllPosts()
    .then((posts) => {
      setPosts(posts?.documents || []);
    })
    .catch((err)=>{
      console.log("error:",err)
      setPosts([])
    });
  }, [isLoggedIn]);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                {
                    isLoggedIn?(
                      <p>Click <u><Link to='/all-posts'>here</Link></u> to see All Posts</p>
                    ):(" Login to read posts")
                }
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
