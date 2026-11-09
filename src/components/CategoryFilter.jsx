import PropTypes from 'prop-types';

function CategoryFilter({ categories, selected, onSelect }) {
  if (categories.length === 0) {
    return null;
  }

  return (
    <div className="category-filter" role="group" aria-label="Filter kategori">
      <button
        type="button"
        className="chip"
        aria-pressed={selected === ''}
        onClick={() => onSelect('')}
      >
        Semua
      </button>
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className="chip"
          aria-pressed={selected === category}
          onClick={() => onSelect(category)}
        >
          {`#${category}`}
        </button>
      ))}
    </div>
  );
}

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default CategoryFilter;
