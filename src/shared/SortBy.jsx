function SortBy({ 
    sortBy, 
    sortDirection, 
    onSortByChange, 
    onSortDirectionChange 
}) {
    return (
        <form>
            <label>
                Sort by:
                <select value={sortBy} onChange={(e) => onSortByChange(e.target.value)}>
                    <option value="createdAt">Created At</option>
                    <option value="title">Title</option>
                </select>
            </label>
            <label>
                Order:
                <select value={sortDirection} onChange={(e) => onSortDirectionChange(e.target.value)}>
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                </select>
            </label>
        </form>
    )
}

export default SortBy