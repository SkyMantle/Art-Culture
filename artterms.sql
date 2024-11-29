-- ALTER TABLE ArtTerm 
-- CHANGE COLUMN description_uk description_uk varchar(350) not null,
-- CHANGE COLUMN description_en description_en varchar(350) not null
DELETE FROM ArtTerm;
INSERT INTO ArtTerm (
    id,
    title_en,
    title_uk,
    description_en,
    description_uk,
    content_en,
    content_uk,
    author_id,
    highlighted_product_id,
    created_at,
    updated_at
  )
VALUES (
    1,
    'Abbaye de Créteil',
    'Абатство Кретей',
    'Established in 1906, the Abbaye de Créteil was a group of French writers, artists and composers who were inspired by the work of Renaissance writer François Rabelais',
    'Абатство Кретей, засноване в 1906 році, було групою французьких письменників, художників і композиторів, які надихалися творчістю письменника епохи Відродження Франсуа Рабле',
    'content_en:text',
    'content_uk:text',
    1,
    1,
    '2024-11-29 00:30:26.699',
    '2024-11-29 00:30:26.699'
  ), 
  (
    2,
    'Abject art',
    'Об\'єктне мистецтво',
    'Abject art is used to describe artworks which explore themes that transgress and threaten our sense of cleanliness and propriety particularly referencing the body and bodily functions',
    'Аб’єктне мистецтво використовується для опису творів мистецтва, які досліджують теми, які виходять за межі нашого почуття чистоти та пристойності та загрожують їм, особливо посилаючись на тіло та функції організму',
    'content_en:text',
    'content_uk:text',
    1,
    1,
    '2024-11-29 00:30:26.699',
    '2024-11-29 00:30:26.699'
  ), 
  (
    3,
    'Abstract art',
    'Абстрактне мистецтво',
    'Abstract art is art that does not attempt to represent an accurate depiction of a visual reality but instead uses shapes, colours, forms and gestural marks to achieve its effect',
    'Абстрактне мистецтво — це мистецтво, яке не намагається представити точне зображення візуальної реальності, а натомість використовує форми, кольори, форми та жестові знаки для досягнення ефекту.',
    'content_en:text',
    'content_uk:text',
    1,
    1,
    '2024-11-29 00:30:26.699',
    '2024-11-29 00:30:26.699'
  ), 
  (
    4,
    'Abstract expressionism',
    'Абстрактний експресіонізм',
    'Abstract expressionism is the term applied to new forms of abstract art developed by American painters such as Jackson Pollock, Mark Rothko and Willem de Kooning in the 1940s and 1950s. It is often characterised by gestural brush-strokes or mark-making, and the impression of spontaneity',
    'Абстрактний експресіонізм — це термін, що застосовується до нових форм абстрактного мистецтва, розроблених американськими художниками, такими як Джексон Поллок, Марк Ротко та Віллем де Кунінг у 1940-х і 1950-х роках. Його часто характеризують жестикуляція мазків пензлем або позначення та враження спонтанності',
    'content_en:text',
    'content_uk:text',
    1,
    1,
    '2024-11-29 00:30:26.699',
    '2024-11-29 00:30:26.699'
  ), 
  (
    5,
    'Baroque',
    'Бароко',
    'Baroque was the dominant style in art and architecture of the seventeenth century, characterized by self-confidence, dynamism and a realistic approach to depiction',
    'Бароко було домінуючим стилем у мистецтві та архітектурі XVII ст., який характеризувався самовпевненістю, динамічністю та реалістичним підходом до зображення.',
    'content_en:text',
    'content_uk:text',
    1,
    1,
    '2024-11-29 00:30:26.699',
    '2024-11-29 00:30:26.699'
  );