import { useEffect, useState } from "react"
import Character from "./Character";


function NavPage(props) {
    function handleNextClick() {
        props.setPage(p => p + 1)
    }
    function handlePreviousClick() {
        if (props.page > 1) {
            props.setPage(p => p - 1)
        }
    }
    return (
        <div className="d-flex justify-content-between align-items-center" >
            <p>page: {props.page}</p>
            <div>
                <button className="btn btn-primary btn-sm me-2"
                    onClick={handleNextClick} >
                    page {props.page + 1}
                </button>
                <button className="btn btn-primary btn-sm"
                    onClick={handlePreviousClick} >
                    page {props.page - 1}
                </button>
            </div>

        </div>
    )
}

function CharacterList() {

    const [characters, setCharacters] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
            const data = await response.json();
            setLoading(false)
            setCharacters(data.results)
        }

        fetchData()

    }, [page])

    return (
        <div className="container">
            <NavPage page={page} setPage={setPage} />
            {
                loading ? (
                    <h1>Loading...</h1>
                ) : (
                    <div className="row">
                        {
                            characters.map(character => {
                                return (
                                    <div className="col-md-4">
                                        <Character key={character.id} character={character} />
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }
            <NavPage page={page} setPage={setPage} />
        </div>
    )
}

export default CharacterList