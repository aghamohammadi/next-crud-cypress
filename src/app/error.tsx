'use client'
const Error = ({ error, reset }) => {
    return (
        <>
            <h1>Error...</h1>
            <p>{error.message}</p>
        </>
    )
}
export default Error