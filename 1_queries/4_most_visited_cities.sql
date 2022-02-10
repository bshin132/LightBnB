SELECT properties.city AS city, count(reservations.*) AS total_reservations
FROM reservations
JOIN properties ON property_id = properties.id
GROUP by properties.city
ORDER BY total_reservations DESC;