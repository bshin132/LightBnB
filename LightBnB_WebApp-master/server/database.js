const properties = require("./json/properties.json");
const users = require("./json/users.json");

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const pool = require("pg");
const pg = require("pg");
const Client = pg.Client;

const configObj = {
  user: "vagrant",
  host: "localhost",
  database: "lightbnb",
  password: "123",
  port: 5432,
};

const client = new Client(configObj);
console.log("db connection info:", configObj);

client
  .connect()
  .then(() => {
    console.log("db connected");
  })
  .catch((error) => {
    console.log("db connection error:", error);
  });

const getUserWithEmail = function (email) {
  const queryString = `SELECT * 
  FROM users
  WHERE email = $1`;
  const values = [email];
  return pool
    .query(queryString, values)
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.error(err.message);
      return null;
    });
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  const queryString = `SELECT * 
  FROM users 
  WHERE id = $1`;
  const values = [id];

  return pool
    .query(queryString, values)
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.error(err.message);
      return null;
    });
};
exports.getUserWithId = getUserWithId;

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  const queryString = `INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *`;
  const values = [user.name, user.email, "password"];

  return pool
    .query(queryString, values)
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => console.error(err.message));
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  const queryString = `SELECT * FROM reservations
    JOIN properties ON properties.id = property_id
    WHERE guest_id = $1 LIMIT $2`;
  const values = [guest_ID, limit];

  return pool
    .query(queryString, values)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.error(err.message);
      return null;
    });
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function (options, limit = 10) {
  const queryParams = [];

  let query = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  LEFT JOIN property_reviews ON properties.id = property_id `;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    query += `AND properties.city LIKE $${queryParams.length} `;
  }

  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    query += `AND properties.owner_id = $${queryParams.length} `;
  }

  if (options.minimum_price_per_night) {
    queryParams.push(parseFloat(options.minimum_price_per_night) * 100);
    query += `AND properties.cost_per_night >= $${queryParams.length} `;
  }

  if (options.maximum_price_per_night) {
    queryParams.push(parseFloat(options.maximum_price_per_night) * 100);
    query += `AND properties.cost_per_night <= $${queryParams.length} `;
  }

  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    query += `AND rating >= $${queryParams.length} `;
  }

  queryParams.push(limit);
  query += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  console.log(query);

  return pool
    .query(query, queryParams)
    .then((res) => {
      return res.rows;
    })
    .catch((err) => 
      console.error(err.message));
};
exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const queryParams = [
    property.title,
    property.description,
    property.owner_id,
    property.cover_photo_url,
    property.thumbnail_photo_url,
    property.cost_per_night,
    property.parking_spaces,
    property.number_of_bathrooms,
    property.number_of_bedrooms,
    property.province,
    property.city,
    property.country,
    property.street,
    property.post_code,
    true
  ];

  const query = `
  INSERT INTO properties (title, description, owner_id, cover_photo_url, thumbnail_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, province, city, country, street, post_code, active)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
  RETURNING *;
  `;

  return pool
  .query(query, queryParams)
  .then((res) => res.rows[0])
  .catch((err) => console.log(err));
};
exports.addProperty = addProperty;
