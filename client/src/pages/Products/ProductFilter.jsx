import SearchBox from "../../components/SearchBox";
import { useGetCategoriesQuery } from "../../slices/categoriesApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  brandList,
  ratingOptions,
  discountOffers,
  colorList,
} from "../../constants/productFilterOptions";
import { useLocation } from "react-router-dom";

const ProductFilters = ({ searchParams, setSearchParams }) => {
  const { data, isLoading, error } = useGetCategoriesQuery();

  const location = useLocation();

  const handleCheckboxFilter = (e, filterType, filterTitle) => {
    const filter = filterTitle.toLowerCase();

    setSearchParams((prev) => {
      const prevFilters = prev.get(`${filterType}`)
        ? searchParams.get(`${filterType}`).split(",")
        : [];

      const updatedFilters = e.target.checked
        ? [...prevFilters, filter]
        : prevFilters.filter((f) => f !== filter);

      prev.set(filterType, updatedFilters.join(","));
      return prev;
    });
  };

  const isParamChecked = (filterType, filterTitle) => {
    const urlSearchParams = new URLSearchParams(location.search);
    
    const param = urlSearchParams.get(`${filterType}`) || "";

    return param.split(",").includes(filterTitle.toLowerCase());
  };

  return (
    <section>
      {/* Sort */}
      <select
        name="sort"
        id="sort"
        value={searchParams.get("sort") || ""}
        onChange={(e) =>
          setSearchParams(
            (prev) => {
              prev.set("sort", e.target.value);
              return prev;
            },
            { replace: true }
          )
        }
      >
        <option value="" selected disabled hidden>
          Select
        </option>
        <option value="new">Newest</option>
        <option value="old">Oldest</option>
      </select>

      {/* Rating */}
      <div>
        <div>
          <h3>Product Rating</h3>
          <ul>
            {ratingOptions.map((rating) => (
              <li key={rating.value}>
                <label htmlFor={rating.value}>
                  <input
                    name="rating"
                    type="radio"
                    value={rating.value}
                    id={rating.value}
                    checked={rating.value === searchParams.get("rating")}
                    onChange={() => {
                      setSearchParams(
                        (prev) => {
                          prev.set("rating", rating.value);
                          return prev;
                        },
                        { replace: true }
                      );
                    }}
                  />
                  {rating.title}
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          Product Categories
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message>{error?.data?.message || error.error}</Message>
          ) : (
            <ul>
              {data.categories.map((category) => (
                <li key={category.name} style={{ textTransform: "capitalize" }}>
                  <label htmlFor={category.name}>
                    {category.name}
                    <input
                      id={category.name}
                      type="checkbox"
                      name={category.name}
                      value={category.name}
                      checked={isParamChecked("categories", category.name)}
                      onChange={(e) =>
                        handleCheckboxFilter(e, "categories", category.name)
                      }
                    />
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Discount Offers */}
        <div>
          <h3>Discount Offers</h3>
          <ul>
            {discountOffers.map((discount) => (
              <li key={discount.value}>
                <label htmlFor={discount.value}>
                  <input
                    name="discount"
                    type="radio"
                    value={discount.value}
                    id={discount.value}
                    checked={discount.value === searchParams.get("discount")}
                    onChange={() => {
                      setSearchParams(
                        (prev) => {
                          prev.set("discount", discount.value);
                          return prev;
                        },
                        { replace: true }
                      );
                    }}
                  />
                  {discount.title}
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Brands */}
        <div>
          <h3>Brands</h3>
          <ul>
            {brandList.map((brand) => (
              <li key={brand.value}>
                <label htmlFor={brand.value}>
                  {brand.title}
                  <input
                    id={brand.value}
                    type="checkbox"
                    name={brand.value}
                    value={brand.value}
                    checked={isParamChecked("brands", brand.title)}
                    onChange={(e) =>
                      handleCheckboxFilter(e, "brands", brand.title)
                    }
                  />
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Colors */}
        <div>
          <h3>Colors</h3>
          <ul>
            {colorList.map((color) => (
              <li key={color.value}>
                <label htmlFor={color.value}>
                  {color.title}
                  <input
                    id={color.value}
                    type="checkbox"
                    name={color.value}
                    value={color.value}
                    checked={isParamChecked("colors", color.title)}
                    onChange={(e) =>
                      handleCheckboxFilter(e, "colors", color.title)
                    }
                  />
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <SearchBox setSearchParams={setSearchParams} />
    </section>
  );
};

export default ProductFilters;
