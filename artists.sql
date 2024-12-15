DELETE FROM user
WHERE id >= 200
  AND id < 300;
INSERT INTO user(
    id,
    email,
    `password`,
    `role`,
    images,
    title,
    bio,
    createdAt,
    updatedAt
  )
VALUES (
    200,
    'artists200@art.playukraine.com',
    '$2b$10$bNg7HS9YSEWEeFs9OZY.sedYY22fb5Lk9dtVPXkfWnt0FoV0CzfEW',
    'CREATOR',
    '/Img/testdata/artists/200.png',
    'Kateryna Bilokur',
    'Drawing inspiration from folk song lyrics, fairy tales, and legends, Bilokur skillfully recreated the enchanting realm of folk art, seamlessly integrating it into her perspective',
    '2024-01-01 00:00:00',
    '2024-01-01 00:00:00'
  ),
  (
    201,
    'artists201@art.playukraine.com',
    '$2b$10$bNg7HS9YSEWEeFs9OZY.sedYY22fb5Lk9dtVPXkfWnt0FoV0CzfEW',
    'CREATOR',
    '/Img/testdata/artists/201.png',
    'Tetiana Yablonska',
    'One of the most famous Ukrainian artists of the 20th century. She has studied at the Kyiv Art Institute, her mentor was the famous Ukrainian artist Fedir Krychevskyi.',
    '2024-01-01 00:00:00',
    '2024-01-01 00:00:00'
  ),
  (
    202,
    'artists202@art.playukraine.com',
    '$2b$10$bNg7HS9YSEWEeFs9OZY.sedYY22fb5Lk9dtVPXkfWnt0FoV0CzfEW',
    'CREATOR',
    '/Img/testdata/artists/202.png',
    'Maria Prymachenko',
    'Maria Prymachenko was a Ukrainian village folk art painter, representative of naïve art. The artist was involved with drawing, embroidery and painting on ceramics.',
    '2024-01-01 00:00:00',
    '2024-01-01 00:00:00'
  )