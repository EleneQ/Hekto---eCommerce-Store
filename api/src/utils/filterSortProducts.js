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
}) => {
  const filter = { name: { $regex: keyword, $options: "i" } };

  if (rating & (rating > 0)) {
    filter.rating = { $gte: parseInt(rating) };
  }

  if (discount & (discount > 0)) {
    filter.discount = { $gte: parseInt(discount) };
  }

  if (brands) {
    const brandsArray = createRegexArray(brands);
    filter.brands = { $all: brandsArray };
  }

  if (colors) {
    const colorsArray = createRegexArray(colors);
    filter.colors = {
      $all: colorsArray.map((color) => ({ $elemMatch: { colorName: color } })),
    };
  }

  return filter;
};
