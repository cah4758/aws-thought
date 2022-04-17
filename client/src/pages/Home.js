import React, { useState, useEffect } from "react";
import ThoughtList from "../components/ThoughtList";
import ThoughtForm from "../components/ThoughtForm";

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [thoughts, setThoughts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/users"); // GET request from users route
        const jsonData = await res.json();

        // Sorting out data with most current first
        const _data = jsonData.sort((a, b) =>
          a.createdAt < b.createdAt ? 1 : -1
        );

        // Populating data into seThoughts useState and setting loaded to true so data can populate on screen and clear out "Loading..." placeholder
        setThoughts([..._data]);
        setIsLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className="col-12 mb-3">
          <ThoughtForm />
        </div>
        <div className={`col-12 mb-3 `}>
          {!isLoaded ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList
              thoughts={thoughts}
              setThoughts={setThoughts}
              title="Some Feed for Thought(s)..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
