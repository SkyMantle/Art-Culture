DELETE FROM user
WHERE id >= 100
  AND id < 200;
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
    100,
    'museum100@art.playukraine.com',
    '$2b$10$bNg7HS9YSEWEeFs9OZY.sedYY22fb5Lk9dtVPXkfWnt0FoV0CzfEW',
    'MUSEUM',
    '/Img/testdata/museums/100.png',
    'Lviv Historical Museum',
    'Lviv Historical Museum is one of the oldest and the richest museums in Ukraine, established in 1893. The museum has rich and glorious traditions.',
    '2024-01-01 00:00:00',
    '2024-01-01 00:00:00'
  ),
  (
    101,
    'museum101@art.playukraine.com',
    '$2b$10$bNg7HS9YSEWEeFs9OZY.sedYY22fb5Lk9dtVPXkfWnt0FoV0CzfEW',
    'MUSEUM',
    '/Img/testdata/museums/101.png',
    'National Museum of the History of Ukraine',
    'The National Museum of the History of Ukraine illustrates Ukraine’s history from ancient times till nowadays. It is one of the leading museums in Ukraine.',
    '2024-01-01 00:00:00',
    '2024-01-01 00:00:00'
  ),
  (
    102,
    'museum102@art.playukraine.com',
    '$2b$10$bNg7HS9YSEWEeFs9OZY.sedYY22fb5Lk9dtVPXkfWnt0FoV0CzfEW',
    'MUSEUM',
    '/Img/testdata/museums/102.jpg',
    'The Museum of Theatre, Music and Cinema of Ukraine',
    'The Museum of Theatre, Music and Cinema of Ukraine was founded in 1923 by the artistic union "Berezil" headed by the prominent figure of Ukrainian theater Les'' Kurbas.',
    '2024-01-01 00:00:00',
    '2024-01-01 00:00:00'
  )