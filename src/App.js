import "bootstrap/dist/css/bootstrap.min.css";
import useFetch from "./useFetch";
import { useState } from "react";

const App = () => {
  const { data, loading, error, fetchData } = useFetch(
    "https://randomuser.me/api/?results=3"
  );
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  return (
    <div className="container mt-5">
      <h1>People Directory</h1>
      <button className="btn btn-primary mt-3 mb-4" onClick={fetchData}>
        Get People
      </button>

      <div>
        {loading && <p>Loading...</p>}
        {error && <p>An error occurred while fetching people.</p>}
        {data && data.results && data.results.length > 0 && (
          <>
            <div className="row">
              {data.results.map((person, index) => (
                <div key={index} className="col-md-4 mb-4">
                  <div className="card">
                    <img
                      src={person.picture.large}
                      className="card-img-top"
                      alt={`${person.name.first} ${person.name.last}`}
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        {person.name.first} {person.name.last}
                      </h5>
                      <p className="card-text mb-1">Age: {person.dob.age}</p>
                      <p className="card-text mb-1">Gender: {person.gender}</p>
                      <p className="card-text mb-1">
                        Username: {person.login.username}
                      </p>
                      <p className="card-text mb-1">Email: {person.email}</p>

                      {showMoreInfo && (
                        <>
                          <p className="card-text mb-1">
                            Phone Number: {person.phone}
                          </p>
                          <p className="card-text mb-1">
                            Full Address: {person.location.street.number},{" "}
                            {person.location.street.name},{" "}
                            {person.location.city}, {person.location.state},{" "}
                            {person.location.country},{" "}
                            {person.location.postcode}.
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-3 mb-5">
              <button
                className="btn btn-primary"
                onClick={() => setShowMoreInfo(!showMoreInfo)}
              >
                {showMoreInfo ? "Show Less Info" : "Show More Info"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
