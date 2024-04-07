const refreshPage = function () {
    window.location.reload();
}

const reload = () => {
    return (
        <>
            <button className="inline-block bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600 mx-4" onClick={refreshPage}>Reload Content</button>
        </>
    )
}

export default reload
