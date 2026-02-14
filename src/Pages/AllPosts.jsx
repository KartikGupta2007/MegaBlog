import { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import service from "../AppWrite/Services";
import { Link } from "react-router-dom";

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    service.getAllPosts().then((res) => {
      setPosts(res?.rows || []);
    });
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.length !== 0 ? (
            posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard {...post} />
              </div>
            ))
          ) : (
            <div className="w-full text-center py-16">
              <p className="text-black text-lg font-medium">
                No posts to display,&nbsp;
                <Link
                  to="/add-post"
                  className="text-black-600 underline inline"
                >
                  Wanna add one?
                </Link>
              </p>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
