export const findAllQuery = (page: number, pageSize: number): string => {
  return `
    SELECT p.property_id AS propertyId, p.title, p.description, p.user AS userId, p.price, p.unit, 
    p.type, p.bedroom, p.bathroom, p.location, p.slug, p.parking, p.balcony, p.created_at AS createdAt,
    p.verified, p.category AS categoryId, p.city AS cityId,category.title AS category, city.name AS city, 
    p.square_feet AS erea, user.first_name AS firstName, user.phone_number AS phoneNumber, user.picture, 
    GROUP_CONCAT(image.url SEPARATOR ',') AS image
    FROM property p
    INNER JOIN user ON p.user = user.user_id 
    INNER JOIN city ON p.city = city.city_id
    INNER JOIN category ON p.category = category.category_id
    LEFT JOIN image ON p.property_id = image.property
    WHERE p.verified = ${1} AND p.active = ${1}
    GROUP BY p.property_id
    ORDER BY RAND() LIMIT ${pageSize} OFFSET ${page}
    `;
};

export const getUnverifiedQuery = (page: number, pageSize: number): string => {
  return `
    SELECT p.property_id AS propertyId, p.title, p.description, p.user AS userId, p.price, p.unit, 
    p.type, p.bedroom, p.bathroom, p.location, p.slug, p.parking, p.balcony, p.created_at AS createdAt,
    p.verified, p.category AS categoryId, p.city AS cityId,category.title AS category, city.name AS city, 
    p.square_feet AS erea, user.first_name AS firstName, user.phone_number AS phoneNumber, user.picture, 
    GROUP_CONCAT(image.url SEPARATOR ',') AS image
    FROM property p
    INNER JOIN user ON p.user = user.user_id 
    INNER JOIN city ON p.city = city.city_id
    INNER JOIN category ON p.category = category.category_id
    LEFT JOIN image ON p.property_id = image.property
    WHERE p.verified = ${0} AND p.active = ${1}
    GROUP BY p.property_id
    ORDER BY RAND() LIMIT ${pageSize} OFFSET ${page}
    `;
};

export const findAllByCategoryQuery = (
  category: number,
  page: number,
  pageSize: number,
): string => {
  return `
    SELECT p.property_id AS propertyId, p.title, p.description, p.user AS userId, p.price, p.unit, 
    p.type, p.bedroom, p.bathroom, p.location, p.slug, p.parking, p.balcony, p.created_at AS createdAt,
    p.verified, p.category AS categoryId, p.city AS cityId,category.title AS category, city.name AS city, 
    p.square_feet AS erea, user.first_name AS firstName, user.phone_number AS phoneNumber, user.picture, 
    GROUP_CONCAT(image.url SEPARATOR ',') AS image
    FROM property p
    INNER JOIN user ON p.user = user.user_id 
    INNER JOIN city ON p.city = city.city_id
    INNER JOIN category ON p.category = category.category_id
    LEFT JOIN image ON p.property_id = image.property
    WHERE p.category = ${category} AND p.verified = ${1} AND p.active = ${1}
    GROUP BY p.property_id
    ORDER BY RAND() LIMIT ${pageSize} OFFSET ${page}
    `;
};

export const findAllByUserQuery = (
  userId: number,
  page: number,
  pageSize: number,
): string => {
  return `
    SELECT p.property_id AS propertyId, p.title, p.description, p.user AS userId, p.price, p.unit, 
    p.type, p.bedroom, p.bathroom, p.location, p.slug, p.parking, p.balcony, p.created_at AS createdAt,
    p.verified, p.category AS categoryId, p.city AS cityId,category.title AS category, city.name AS city, 
    p.square_feet AS erea, user.first_name AS firstName, user.phone_number AS phoneNumber, user.picture, 
    GROUP_CONCAT(image.url SEPARATOR ',') AS image
    FROM property p
    INNER JOIN user ON p.user = user.user_id 
    INNER JOIN city ON p.city = city.city_id
    INNER JOIN category ON p.category = category.category_id
    LEFT JOIN image ON p.property_id = image.property
    WHERE p.user = ${userId} AND p.verified = ${1} AND p.active = ${1}
    GROUP BY p.property_id
    ORDER BY RAND() LIMIT ${pageSize} OFFSET ${page}
    `;
};

export const findOneQuery = (slug: string): string => {
  return `
    SELECT p.property_id AS propertyId, p.title, p.description, p.user AS userId, p.price, p.unit, 
    p.type, p.category AS categoryId, p.city AS cityId, p.bedroom, p.bathroom, p.square_feet AS erea, 
    p.verified, p.location, p.slug, p.parking, p.balcony, p.created_at AS createdAt,category.title AS category, city.name AS city, 
    user.first_name AS firstName, user.phone_number AS phoneNumber, user.picture, 
    GROUP_CONCAT(image.url SEPARATOR ',') AS image
    FROM property p
    INNER JOIN user ON p.user = user.user_id 
    INNER JOIN city ON p.city = city.city_id
    INNER JOIN category ON p.category = category.category_id
    LEFT JOIN image ON p.property_id = image.property
    WHERE p.slug = "${slug}"
    GROUP BY p.property_id
    `;
};
