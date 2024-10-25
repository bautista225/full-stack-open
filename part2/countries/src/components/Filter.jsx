const Filter = ({ search, handleSearchChange }) => (
    <div>
        find countries <input value={search} onChange={handleSearchChange} />
    </div>
)

export default Filter