import React from 'react'
import {
    useLoaderData,
    NavLink,
    useSearchParams,
    defer,
    Await
} from 'react-router-dom'
import { getVans } from '../api'

export function loader() {
    return defer({ vans: getVans() })
}

export default function Vans() {
    const [searchParams, setSearchParams] = useSearchParams()
    const typeFilter = searchParams.get("type")
    const dataPromise = useLoaderData()

    return (
        <div className="van-list-container">
            <h1>Explore our van options</h1>
            <React.Suspense fallback={<h2>Loading...</h2>}>
                <Await resolve={dataPromise.vans}>
                    {vans => {
                        const displayedVans = typeFilter
                            ? vans.filter(van => van.type === typeFilter)
                            : vans

                        const vanElements = displayedVans.map(van => (
                            <div key={van.id} className="van-tile">
                                <NavLink
                                    to={van.id}
                                    state={{
                                        search: `?${searchParams.toString()}`,
                                        type: typeFilter
                                    }}

                                >
                                    <img src={van.imageUrl} alt="" />
                                    <div className="van-info">
                                        <h3>{van.name}</h3>
                                        <p>${van.price}<span>/day</span></p>
                                    </div>
                                    <i className={`van-type ${van.type} selected`}>{van.type}</i>
                                </NavLink>
                            </div>
                        ))

                        return (
                            <>
                                <div className='van-list-container button'>
                                    <button
                                        onClick={() => setSearchParams({ type: "simple" })}
                                        className={
                                            `van-type simple ${typeFilter === "simple" ? "selected" : ""}`
                                        }
                                    >
                                        Simple
                                    </button>
                                    <button
                                        onClick={() => setSearchParams({ type: "luxury" })}
                                        className={
                                            `van-type luxury ${typeFilter === "luxury" ? "selected" : ""}`
                                        }
                                    >
                                        Luxury
                                    </button>
                                    <button
                                        onClick={() => setSearchParams({ type: "rugged" })}
                                        className={
                                            `van-type rugged ${typeFilter === "rugged" ? "selected" : ""}`
                                        }
                                    >
                                        Rugged
                                    </button>
                                    {typeFilter ? (
                                        <button
                                            onClick={() => setSearchParams({})}
                                            className='van-type clear-filters'
                                        >
                                            Clear
                                        </button>
                                    ) : null
                                    }
                                </div>
                                <div className="van-list">
                                    {vanElements}
                                </div>
                            </>
                        )

                    }}

                </Await>
            </React.Suspense>
        </div>
    )
}