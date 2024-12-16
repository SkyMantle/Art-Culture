DELETE FROM user
WHERE id >= 200
  AND id < 500;
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
  ),
  (
    203,
    'artists203@art.playukraine.com',
    '$2b$10$bNg7HS9YSEWEeFs9OZY.sedYY22fb5Lk9dtVPXkfWnt0FoV0CzfEW',
    'CREATOR',
    NULL,
    'Ааронський Федір Іванович',
    'Фе́дір Іва́нович Ааро́нський (близько 1742, Хитці Синецькі — 24 серпня 1825, Київ) — український живописець, фініфтяр, іконописець. У чернецтві (від 1802 року) — Феодосій.',
    '2024-01-01 00:00:00',
    '2024-01-01 00:00:00'
  ),
  (
    204,
    'artists204@art.playukraine.com',
    '$2b$10$bNg7HS9YSEWEeFs9OZY.sedYY22fb5Lk9dtVPXkfWnt0FoV0CzfEW',
    'CREATOR',
    '/Img/testdata/artists/204.jpg',
    'Абрамов Віктор Прокопович',
    'Ві́ктор Проко́пович Абра́мов (*4 вересня 1940, Львів — †7 травня 2016, Вінниця) — український живописець, графік. Член Національної спілки художників України з 1993 року.',
    '2024-01-01 00:00:00',
    '2024-01-01 00:00:00'
  ),
  (
    205,
    'artists205@art.playukraine.com',
    '$2b$10$bNg7HS9YSEWEeFs9OZY.sedYY22fb5Lk9dtVPXkfWnt0FoV0CzfEW',
    'CREATOR',
    '/Img/testdata/artists/205.jpg',
    'Абрисовський Савин Йосипович',
    'Са́вин Йо́сипович Абрисо́вський — український композитор-аматор, художник з роду Абрисовських.',
    '2024-01-01 00:00:00',
    '2024-01-01 00:00:00'
  ),
  (
    206,
    'artists206@art.playukraine.com',
    '$2b$10$bNg7HS9YSEWEeFs9OZY.sedYY22fb5Lk9dtVPXkfWnt0FoV0CzfEW',
    'CREATOR',
    NULL,
    'Августин, син Бажея',
    'Августин, син Бажея (пом. 1575) — живописець. Працював у Львові. 1557 року виконав і розписав циферблат на ратушній вежі.',
    '2024-01-01 00:00:00',
    '2024-01-01 00:00:00'
  ),
  (
    207,
    'artists207@art.playukraine.com',
    '$2b$10$bNg7HS9YSEWEeFs9OZY.sedYY22fb5Lk9dtVPXkfWnt0FoV0CzfEW',
    'CREATOR',
    NULL,
    'Авдоніна-Шпергль Галина Федорівна',
    'Гали́на Фе́дорівна Авдоніна, у шлюбі Авдо́ніна-Шпергль (нар. 4 вересня 1950 року, місто Станіслав, нині Івано-Франківськ) — українська художниця декоративно-ужиткового мистецтва.',
    '2024-01-01 00:00:00',
    '2024-01-01 00:00:00'
  ),
  (
    208,
    'artists208@art.playukraine.com',
    '$2b$10$bNg7HS9YSEWEeFs9OZY.sedYY22fb5Lk9dtVPXkfWnt0FoV0CzfEW',
    'CREATOR',
    NULL,
    'Аверін Всеволод Григорович',
    'Все́волод Григо́рович Аве́рін (нар. 20 лютого 1889, Чепіль — пом. 3 вересня 1946, Харків) — український радянський графік; член об''єдннаня «Художній цех» у 1918—1919 роках;',
    '2024-01-01 00:00:00',
    '2024-01-01 00:00:00'
  ),
  (
    209,
    'artists209@art.playukraine.com',
    '$2b$10$bNg7HS9YSEWEeFs9OZY.sedYY22fb5Lk9dtVPXkfWnt0FoV0CzfEW',
    'CREATOR',
    '/Img/testdata/artists/209.jpg',
    'Аверков Павло Петрович',
    'Павло́ Петро́вич Аве́рков (25 червня 1924, Тула — 8 лютого 1986, Київ) — український радянський художник скла; член Спілки радянських художників України.',
    '2024-01-01 00:00:00',
    '2024-01-01 00:00:00'
  ),
  (
    210,
    'artists210@art.playukraine.com',
    '$2b$10$bNg7HS9YSEWEeFs9OZY.sedYY22fb5Lk9dtVPXkfWnt0FoV0CzfEW',
    'CREATOR',
    NULL,
    'Авраменко Василь Кузьмович',
    'Васи́ль Кузьми́ч Авра́менко (нар. 31 січня 1936, Мурманськ) — український графік, член Спілки радянських художників України до 1976 року.',
    '2024-01-01 00:00:00',
    '2024-01-01 00:00:00'
  ),
  (
    211,
    'artists211@art.playukraine.com',
    '$2b$10$bNg7HS9YSEWEeFs9OZY.sedYY22fb5Lk9dtVPXkfWnt0FoV0CzfEW',
    'CREATOR',
    '/Img/testdata/artists/211.jpg',
    'Агніт-Следзевський Казимир Генріхович',
    'Казимир Ге́нріхович А́гніт-Следзе́вський (След-Зевський) (Агніт-Казимир Генріхович Следзевський; 27 травня 1898, Санкт-Петербург — 6 листопада 1973, Київ) — український радянський графік;',
    '2024-01-01 00:00:00',
    '2024-01-01 00:00:00'
  )