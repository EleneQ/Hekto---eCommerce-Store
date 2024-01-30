export const buildSortCriteria = (sort) => {
  let sortCriteria = {};

  switch (sort) {
    case "new":
      return (sortCriteria = { createdAt: -1 });
    case "old":
      return (sortCriteria = { createdAt: 1 });
    default:
      throw new Error("Invalid createdAt sorting parameter provided");
  }
};

const createRegexArray = (input) => {
  return input.split(",").map((item) => new RegExp(item.trim(), "i"));
};

export const buildFilterCriteria = ({
  keyword,
  rating,
  discount,
  brands,
  colors,
  categories,
}) => {
  const filter = { name: { $regex: keyword, $options: "i" } };

  if (rating > 0) {
    filter.rating = { $gte: parseInt(rating) };
  }

  if (discount > 0) {
    filter.discount = { $gte: parseInt(discount) };
  }

  if (brands) {
    const brandArray = createRegexArray(brands);
    filter.brands = { $all: brandArray };
  }

  if (colors) {
    const colorsArray = createRegexArray(colors);
    filter.colors = {
      $all: colorsArray.map((color) => ({ $elemMatch: { colorName: color } })),
    };
  }

  if (categories) {
    const categoryArray = createRegexArray(categories);
    filter.categories = { $all: categoryArray };
  }

  return filter;
};
