import logo from './logo.svg';
import './App.css';

import "./style.css";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, {useState} from "react";

function ArtistInput({ artistName, setArtistName, handleSearch }) {
    return (
        <div className="input-group mb-3">
            <input
                type="text"
                className="form-control"
                placeholder="Enter artist name"
                value={artistName}
                onChange={(e) => setArtistName(e.target.value)}
            />
            <button className="btn btn-outline-dark" onClick={handleSearch}>
                Search Similar Artists
            </button>
        </div>
    );
}

function SeasonDropdown({ season, setSeason }) {
    return (
        <div className="mb-3">
            <label htmlFor="seasonSelect" className="form-label">
                Select Season:
            </label>
            <select
                id="seasonSelect"
                className="form-select"
                value={season}
                onChange={(e) => setSeason(e.target.value)}
            >
                <option value="2023-2024">2023-2024</option>
                <option value="2022-2023">2022-2023</option>
                <option value="2021-2022">2021-2022</option>
            </select>
        </div>
    );
}

function App() {

    const [page, setPage] = useState("welcome");

    const [interest, setInterest] = useState("none")

    const [picsumImages, setPicsumImages] = useState([]);

    const [artistName, setArtistName] = useState("");
    const [similarArtists, setSimilarArtists] = useState([]);

    const API_KEY = "ab1fc2c9124c86a4f5f1f931868bbc2d";

    const [season, setSeason] = useState("2023-2024");
    const [standings, setStandings] = useState([]);

    const [startAutoplay, setStartAutoplay] = useState(false);

    const [startAutoplay2, setStartAutoplay2] = useState(false);

    const [startAutoplay3, setStartAutoplay3] = useState(false);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const settings2 = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: startAutoplay,
        autoplaySpeed: 1500,
        adaptiveHeight: true,
    };

    const settings3 = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: startAutoplay2,
        autoplaySpeed: 1500,
        adaptiveHeight: true,
    };


    const settings4 = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: startAutoplay3,
        autoplaySpeed: 1500,
        adaptiveHeight: true,
    };

    const settings5 = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500
    };




    function generatePicsum() {
        const randomPage = Math.floor(Math.random() * 100) + 1;

        fetch(`https://picsum.photos/v2/list?page=${randomPage}&limit=12`)
            .then(res => res.json())
            .then(data => setPicsumImages(data))
    }

    const fetchStandings = async () => {
        try {
            const res = await fetch(
                `https://www.thesportsdb.com/api/v1/json/123/lookuptable.php?l=4328&s=${season}`
            );
            const data = await res.json();
            setStandings(data.table || []);
        } catch (err) {
            console.error("Error fetching standings:", err);
            setStandings([]);
        }
    };


    const handleSearch = async () => {
        if (!artistName) return;

        try {
            const res = await fetch(
                `https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${encodeURIComponent(
                    artistName
                )}&api_key=${API_KEY}&format=json&limit=10`
            );
            const data = await res.json();
            const artists = data.similarartists?.artist || [];
            setSimilarArtists(artists);
        } catch (err) {
            console.error("Last.fm API error:", err);
            setSimilarArtists([]);
        }
    };



    function WelcomePage() {
        return (
            <div className="container-fluid p-0">

                <div className="bg-image position-relative"
                     style={{
                         backgroundImage: "url('/images/bg8.jpg')",
                         height: "2900px"
                     }}>

                    <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>

                    <div className="d-flex align-items-center justify-content-between text-white p-5 position-relative">
                        <h1 className="text-center fs-1 fw-bold p-5">Welcome!</h1>

                        <img src="/images/water1.jpeg" className="rounded p-5" alt="..." style={{ maxHeight: "400px" }}/>

                        <p className="text-center fs-1 fw-bold">Explore this website to learn more about me!</p>
                    </div>


                    <div className="p-4">

                        <div className="row g-4 mb-4">
                            <div className="col-md-4">
                                <div className="card shadow h-100">
                                    <img className="card-img-top" src="/images/camera.jpeg" alt = "..." style={{height: "400px"}}></img>
                                    <div className="card-body">
                                        <h3 className="card-title">Photography</h3>
                                        <p>This is one of my biggest interests. At home, I spend a lot of time taking
                                            pictures with my camera.
                                            You can see some of my pictures by clicking the button.</p>
                                        <a href="#" className="btn btn-primary" onClick={() => {
                                            setPage("interests")
                                            setInterest("photos")
                                        }}>Learn More</a>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="card shadow h-100">
                                    <img className="card-img-top" src="/images/airpods.jpeg" alt = "..." style={{height: "400px"}}></img>
                                    <div className="card-body">
                                        <h3 className="card-title">Music</h3>
                                        <p>You will probably see me with my AirPods in everywhere I go.
                                            Some would say I wear them a little too much.</p>
                                        <a href="#" className="btn btn-primary" onClick={() => {
                                            setPage("interests")
                                            setInterest("music")
                                        }}>Learn More</a>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="card shadow h-100">
                                    <img className="card-img-top" src="/images/soccer.jpeg" alt = "..." style={{height: "400px"}}></img>
                                    <div className="card-body">
                                        <h3 className="card-title">Football (Soccer)</h3>
                                        <p>Ever since I was a kid, this has been by far my favorite sport. I try to
                                            watch games every chance I get,
                                            but the timings can be a problem since its mostly played in Europe.</p>
                                        <a href="#" className="btn btn-primary" onClick={() => {
                                            setPage("welcome")
                                            setInterest("soccer")
                                        }}>Learn More</a>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="row g-4 mb-5">
                            <div className="col-md-6">
                                <Slider {...settings5}>
                                    <div className="card" style={{width: "18rem"}}>
                                        <img src="/images/palmsprings.jpeg" className="card-img-top" alt="..."/>
                                    </div>
                                    <div className="card" style={{width: "18rem"}}>
                                        <img src="/images/scottsdale.jpeg" className="card-img-top" alt="..."/>
                                    </div>
                                    <div className="card" style={{width: "18rem"}}>
                                        <img src="/images/sealink.jpg" className="card-img-top" alt="..."/>
                                    </div>
                                </Slider>
                            </div>

                            <div className="col-md-6 d-flex flex-column justify-content-center text-white p-2 position-relative">
                                <h2 className="fs-1 fw-bold">Traveling</h2>
                                <p className="fs-5">
                                    This is something I will always look forward to, no matter where I'm going. Some
                                    of the places
                                    I've been to are Palm Springs, Scottsdale, Canada, New York City, and India. Some
                                    of my dream destinations
                                    include London and Tokyo.
                                </p>
                            </div>
                        </div>

                        <div className="d-flex align-items-center justify-content-between text-white p-5 position-relative">
                            <h2 className="fs-1 fw-bold">My Bucket List</h2>
                        </div>


                        <div className="gallery-wrap position-relative">
                            <div className="item item-1"></div>
                            <div className="item item-2"></div>
                            <div className="item item-3"></div>
                            <div className="item item-4"></div>
                            <div className="item item-5"></div>
                        </div>


                    </div>


                </div>

            </div>
        )
    }

    function MePage (){
        return (
            <div>

                <div className="bg-image position-relative"
                     style={{
                         backgroundImage: "url('/images/bg2.jpg')",
                         height: "1250px"
                     }}>

                    <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>

                    <div className="d-flex justify-content-center align-items-center">
                        <div className="card mb-4 shadow p-5 w-75 ">
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src="/images/gymnastics.jpeg" className="img-fluid rounded-start" alt="profile" />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title fw-bold">Who Am I?</h5>
                                        <p className="card-text">I'm currently in 11th grade at James B Conant High School.
                                            I'm interested in learning about and having a career that combines both
                                            Computer Science and Economics in a meaningful way. I'm a pretty curious person who's
                                            willing to try new things and is always asking why things work the way they do.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <article className="accordion h-75 w-75">

                        <section className="h-100" id ="acc1" onClick={() => {
                            setStartAutoplay(true)
                            setStartAutoplay2(false)
                            setStartAutoplay3(false)

                        }}>
                            <h2 className="fw-bold"><a href="#acc1">Classes/Subjects</a></h2>
                            <p>My favorite classes/subjects are Compsci, Math, & Physics because they all teach me
                                to think in new ways.
                                Although they can be challenging, it is very rewarding for me to be able to
                                understand & learn new things.
                                Solving difficult problems provides a sense of accomplishment that motivates me to
                                learn even more.</p>
                            <Slider {...settings2}>
                                <div className="card" style={{width: "18rem"}}>
                                    <img src="/images/chicagobuildings.jpeg" className="card-img-top" alt="..."/>
                                </div>
                                <div className="card" style={{width: "18rem"}}>
                                    <img src="/images/pottery.jpeg" className="card-img-top" alt="..."/>
                                </div>
                                <div className="card" style={{width: "18rem"}}>
                                    <img src="/images/mrkurfess.jpg" className="card-img-top" alt="..."/>
                                </div>
                                <div className="card" style={{width: "18rem"}}>
                                    <img src="/images/residont.jpg" className="card-img-top" alt="..."/>
                                </div>
                            </Slider>
                        </section>
                        <section className="h-100" id ="acc2" onClick={() => {
                            setStartAutoplay(false)
                            setStartAutoplay2(true)
                            setStartAutoplay3(false)
                        }}>
                            <h2 className="fw-bold"><a href="#acc2">Clubs/Activities</a></h2>
                            <p>Some clubs/activities I'm involved in at Conant are FBLA, Math Team, CompSci Kids,
                                Gymnastics,
                                NHS, and IFAIR. They allow me to explore my interests, meet new people, and even
                                give back to
                                the community.</p>
                            <Slider {...settings3}>
                                <div className="card" style={{width: "18rem"}}>
                                    <img src="/images/gymnastics.jpeg" className="card-img-top" alt="..."/>
                                </div>
                                <div className="card" style={{width: "18rem"}}>
                                    <img src="/images/nhs.jpeg" className="card-img-top" alt="..."/>
                                </div>
                                <div className="card" style={{width: "18rem"}}>
                                    <img src="/images/csk.jpeg" className="card-img-top" alt="..."/>
                                </div>
                                <div className="card" style={{width: "18rem"}}>
                                    <img src="/images/ifair.jpeg" className="card-img-top" alt="..."/>
                                </div>
                            </Slider>
                        </section>
                        <section className="h-100" id ="acc3" onClick={() => {
                            setStartAutoplay(false)
                            setStartAutoplay2(false)
                            setStartAutoplay3(true)
                        }}>
                            <h2 className="fw-bold"> <a href="#acc3">Friends/Family</a></h2>


                            <p>These are the people I enjoy spending the most time with. From watching movies at
                                home to
                                going to garbas almost every week, there's always something to enjoy when I'm around
                                these people.
                                They are what makes me smile and laugh the most.</p>
                            <Slider {...settings4}>
                                <div className="card" style={{width: "18rem"}}>
                                    <img src="/images/goldout.jpeg" className="card-img-top" alt="..."/>
                                </div>
                                <div className="card" style={{width: "18rem"}}>
                                    <img src="/images/garba.jpeg" className="card-img-top" alt="..."/>
                                </div>
                                <div className="card" style={{width: "18rem"}}>
                                    <img src="/images/halloween.jpeg" className="card-img-top" alt="..."/>
                                </div>
                                <div className="card" style={{width: "18rem"}}>
                                    <img src="/images/pickleball.jpeg" className="card-img-top" alt="..."/>
                                </div>
                            </Slider>
                        </section>
                    </article>


                </div>

            </div>
        )

    }

    function InterestPage() {
        return (
            <div>

                <div className="bg-image position-relative"
                     style={{
                         backgroundImage: "url('/images/bg7.jpg')",
                         height: "2000px"
                     }}>

                    <h2 className="position-relative fs-1 fw-bold p-5">Explore My Interests!</h2>


                    <div className="dropdown mb-4">
                        <button className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown"> Choose Interest
                        </button>
                        <ul className="dropdown-menu align-self-center">
                            <li><a className="dropdown-item" onClick={() => setInterest("photos")}>Photos</a></li>
                            <li><a className="dropdown-item" onClick={() => {
                                setInterest("music")
                            }}>Music</a></li>
                            <li><a className="dropdown-item" onClick={() => setInterest("soccer")}>Soccer</a></li>
                        </ul>
                    </div>

                    {interest == "photos" &&
                        <div>
                            <h3 className="fs-2 fw-semibold position-relative p-2">Some Photos I've Taken</h3>
                            <div className="gallery-wrap position-relative">
                                <div className="item item-6"></div>
                                <div className="item item-7"></div>
                                <div className="item item-8"></div>
                                <div className="item item-9"></div>
                                <div className="item item-10"></div>
                            </div>

                            <div>
                                <h3 className="fs-2 fw-semibold position-relative p-2">Explore Other Photos</h3>



                                <p className="position-relative p-2">As much as I like taking photos, there are people out there who are miles better than me
                                    and I often like looking at their work to see where I can hopefully be one day. Click on any image in the carousel to see who took it and their other works as well.</p>

                                <button className="btn btn-outline-dark mb-3 p-2 position-relative" onClick={generatePicsum}>
                                    Explore Other Photographers
                                </button>

                                <div id="picsumCarousel" className="carousel slide position-relative h-100">
                                    <div className="carousel-inner">
                                        {picsumImages.map((img, index) => (
                                            <div
                                                key={img.id}
                                                className={`carousel-item ${index === 0 ? "active" : ""}`}
                                            >
                                                <img
                                                    src={img.download_url}
                                                    className="d-block w-100"
                                                    alt={img.author}
                                                    style={{
                                                        maxHeight: "500px",
                                                        objectFit: "cover",
                                                        cursor: "pointer"
                                                    }}

                                                    onClick={() => window.open(img.url, "_blank")}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <button className="carousel-control-prev" type="button"
                                            data-bs-target="#picsumCarousel" data-bs-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button className="carousel-control-next" type="button"
                                            data-bs-target="#picsumCarousel" data-bs-slide="next">
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                </div>
                            </div>

                        </div>
                    }

                    {interest == "music" &&

                        <div className="container py-4">

                            <h2 className="fs-2 fw-semibold position-relative p-2">Find Related Artists</h2>

                            <p className="position-relative p-2">Discovering new artists is always nice, since I get to listen to a new style of music.
                                Search up an artist to find similar ones and see if you can discover someone new!</p>

                            <div className="input-group mb-3">
                                <ArtistInput
                                    artistName={artistName}
                                    setArtistName={setArtistName}
                                    handleSearch={handleSearch}
                                />
                            </div>

                            {similarArtists.length > 0 ? (
                                <div className="list-group">
                                    {similarArtists.map((artist) => (
                                        <a
                                            key={artist.mbid || artist.name}
                                            href={artist.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="list-group-item list-group-item-action"
                                        >
                                            {artist.name}
                                            {artist.image && artist.image.length > 0 && (
                                                <img
                                                    src={artist.image[0]["#text"]}
                                                    alt={artist.name}
                                                    style={{width: "40px", marginLeft: "1rem"}}
                                                />
                                            )}
                                        </a>
                                    ))}
                                </div>
                            ) : (
                                <p className="position-relative p-2">No similar artists found.</p>
                            )}
                        </div>

                    }

                    {interest == "soccer" &&
                        <div className="container py-4">
                            <h2 className="fs-2 fw-semibold position-relative p-2">Premier League - Standings</h2>

                            <p className="position-relative p-2">This is my favourite league to watch whenever I get the chance, since it has some of the
                                highest quality players and teams in the world. I like to keep up with the season as it
                                progresses,
                                but to get a good idea of which teams are the best its good to look at the top 5 ones over
                                the last few seasons.</p>

                            {/* Season Selector */}
                            <SeasonDropdown season={season} setSeason={setSeason} />


                            {/* Buttons */}
                            <div className="mb-4">
                                <button className="btn btn-outline-dark" onClick={fetchStandings}>
                                    Show League Standings
                                </button>
                            </div>

                            {standings.length > 0 && (
                                <div className="mb-4">
                                    <h4 className="fs-3 fw-semibold">League Standings ({season})</h4>
                                    <table className="table table-striped">
                                        <thead>
                                        <tr>
                                            <th>Pos</th>
                                            <th>Team</th>
                                            <th>Played</th>
                                            <th>Win</th>
                                            <th>Draw</th>
                                            <th>Loss</th>
                                            <th>Points</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {standings.map((team) => (
                                            <tr key={team.teamid}>
                                                <td>{team.intRank}</td>
                                                <td>{team.strTeam}</td>
                                                <td>{team.intPlayed}</td>
                                                <td>{team.intWin}</td>
                                                <td>{team.intDraw}</td>
                                                <td>{team.intLoss}</td>
                                                <td>{team.intPoints}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    }

                </div>



            </div>
        )
    }

        return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
      <div>


          <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
              <a className="navbar-brand" href="#">Rishabh's Personal Website</a>
              <div className="collapse navbar-collapse" id="navItems">
                  <ul className="navbar-nav ms-auto">
                      <li className="nav-item" onClick={() => setPage("welcome")}>
                          <a className="nav-link">Home</a>
                      </li>
                      <li className="nav-item" onClick={() => setPage("whoami")}>
                          <a className="nav-link">About Me</a>
                      </li>
                      <li className="nav-item" onClick={() => setPage("interests")}>
                          <a className="nav-link">Interests</a>
                      </li>
                  </ul>
              </div>
          </nav>


          {page == "welcome" && <WelcomePage />}

          {page == "whoami" && <MePage />}

          {page == "interests" && <InterestPage/>}

      </div>



        );









}

export default App;
