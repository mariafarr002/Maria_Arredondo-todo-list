function SortBy({ 
    sortBy, 
    sortDirection, 
    onSortByChange, 
    onSortDirectionChange 
}) {
    return (
        <form>
            <label htmlFor="sortBySelect">Sort by:</label>
                <select value={sortBy} onChange={(e) => onSortByChange(e.target.value)}>
                    <option value="createdAt">Created At</option>
                    <option value="title">Title</option>
                </select>

            <label htmlFor="sortDirectionSelect">Order:</label>
                <select value={sortDirection} onChange={(e) => onSortDirectionChange(e.target.value)}>
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                </select>
        </form>
    )
}

export default SortBy