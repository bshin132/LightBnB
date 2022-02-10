INSERT INTO users (name, email, password)
VALUES ('Brian Shin', 'bshin132@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Roronoa Zoro', 'threeswords@onepiece.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Nico Robin', 'fluerrrr@grandline.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (2, 'Orange Town', 'Full of oranges', 'www.orange.com', 'www.coverorange.com', 333, 2, 4, 6, 'Japan', 'Sword', 'Osaka', 'IDK', '3SS ONI', true),
(1, 'Beach Paradise', 'Welcome to our paradose', 'www.beach.com', 'www.paradise.com', 150, 3, 3, 4, 'Canada', 'Runnymede', 'Coquitlam', 'BC', 'V3B 0B1', true),
(3, 'Library', 'Full wisdom', 'www.wisdom.com', 'www.smart.com', 50, 2, 1, 3, 'Korea', 'Hanok', 'Busan', 'BSC', 'NICO69', false);

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2021-11-19', '2021-11-25', 3, 2),
('2022-1-1', '2021-1-8', 2, 1),
('2022-2-5', '2021-2-9', 2, 3);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (3, 2, 3, 5, 'amazing placeee'),
(1, 2, 2, 4, 'fun plcae to swim'),
(2, 3, 1, 4, 'not bad');