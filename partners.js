// Archive names are normalized to NFC; offer data are prototype fixtures.
const PARTNERS = [
 {
  "name": "Вай мясо халяль",
  "short": "Вм",
  "color": "#5f2e9e",
  "category": "Кафе и рестораны",
  "logo": "assets/partners/000.png",
  "service": "Self Service",
  "weight": 27,
  "cash": 40,
  "maxBonuses": 1550,
  "condition": "За покупки на кассе",
  "untilDay": 15,
  "closingHour": 23,
  "source": ""
 },
 {
  "name": "Наша Аптека",
  "short": "НА",
  "color": "#7c9e2e",
  "category": "Аптека",
  "logo": "assets/partners/001.png",
  "service": "Full Service",
  "weight": 98,
  "cash": 35,
  "maxBonuses": 900,
  "condition": "За покупки на кассе",
  "untilDay": 30,
  "closingHour": 21,
  "source": "https://nasha-apteka.ru/"
 },
 {
  "name": "Lamoda",
  "short": "L",
  "color": "#2e9e9e",
  "category": "Одежда, обувь и аксессуары",
  "logo": "assets/partners/002.png",
  "service": "Full Service",
  "weight": 87,
  "cash": 10,
  "maxBonuses": 1450,
  "condition": "За покупки на кассе",
  "untilDay": 23,
  "closingHour": 21,
  "source": "https://www.lamoda.ru/"
 },
 {
  "name": "Наш трикотаж",
  "short": "Нт",
  "color": "#2e9e98",
  "category": "Одежда и аксессуары",
  "logo": "assets/partners/003.png",
  "service": "Self Service",
  "weight": 28,
  "cash": 10,
  "maxBonuses": 850,
  "condition": "За одну покупку на кассе",
  "untilDay": 18,
  "closingHour": 21,
  "source": ""
 },
 {
  "name": "Embody",
  "short": "E",
  "color": "#2e959e",
  "category": "Одежда и аксессуары",
  "logo": "assets/partners/004.png",
  "service": "Self Service",
  "weight": 6,
  "cash": 30,
  "maxBonuses": 900,
  "condition": "За одну покупку на кассе",
  "untilDay": 18,
  "closingHour": 20,
  "source": ""
 },
 {
  "name": "Шаурма Клаб",
  "short": "ШК",
  "color": "#419e2e",
  "category": "Кафе и рестораны",
  "logo": "assets/partners/000.png",
  "service": "Self Service",
  "weight": 21,
  "cash": 15,
  "maxBonuses": 1950,
  "condition": "За покупки на кассе",
  "untilDay": 30,
  "closingHour": 23,
  "source": ""
 },
 {
  "name": "Место Бровисты",
  "short": "МБ",
  "color": "#2e9e7c",
  "category": "Красота и уход",
  "logo": "assets/partners/006.png",
  "service": "Self Service",
  "weight": 13,
  "cash": 25,
  "maxBonuses": 400,
  "condition": "За покупки на кассе",
  "untilDay": 28,
  "closingHour": 0,
  "source": ""
 },
 {
  "name": "Golden Green",
  "short": "GG",
  "color": "#8f9e2e",
  "category": "Красота и уход",
  "logo": "assets/partners/007.png",
  "service": "Self Service",
  "weight": 9,
  "cash": 20,
  "maxBonuses": 1000,
  "condition": "За покупки на кассе",
  "untilDay": 16,
  "closingHour": 22,
  "source": ""
 },
 {
  "name": "4Hands",
  "short": "4",
  "color": "#2e599e",
  "category": "Красота и уход",
  "logo": "assets/partners/008.png",
  "service": "Self Service",
  "weight": 8,
  "cash": 35,
  "maxBonuses": 800,
  "condition": "За одну покупку на кассе",
  "untilDay": 16,
  "closingHour": 20,
  "source": ""
 },
 {
  "name": "DiezDent",
  "short": "D",
  "color": "#9e2e42",
  "category": "Стоматология",
  "logo": "assets/partners/009.png",
  "service": "Full Service",
  "weight": 83,
  "cash": 20,
  "maxBonuses": 1550,
  "condition": "За одну покупку на кассе",
  "untilDay": 19,
  "closingHour": 23,
  "source": "https://diezdent.com/"
 },
 {
  "name": "TopStyle",
  "short": "T",
  "color": "#9e972e",
  "category": "Красота и уход",
  "logo": "assets/partners/010.png",
  "service": "Self Service",
  "weight": 27,
  "cash": 35,
  "maxBonuses": 700,
  "condition": "За покупки на кассе",
  "untilDay": 30,
  "closingHour": 20,
  "source": ""
 },
 {
  "name": "SelSovet",
  "short": "S",
  "color": "#9e2e44",
  "category": "Дизайнерская одежда",
  "logo": "assets/partners/011.png",
  "service": "Full Service",
  "weight": 83,
  "cash": 40,
  "maxBonuses": 400,
  "condition": "За покупки на кассе",
  "untilDay": 17,
  "closingHour": 21,
  "source": "https://selsovet.store/merch"
 },
 {
  "name": "Super Volosy",
  "short": "SV",
  "color": "#772e9e",
  "category": "Красота и уход",
  "logo": "assets/partners/012.png",
  "service": "Self Service",
  "weight": 10,
  "cash": 15,
  "maxBonuses": 1400,
  "condition": "За одну покупку на кассе",
  "untilDay": 25,
  "closingHour": 21,
  "source": ""
 },
 {
  "name": "Кофе",
  "short": "К",
  "color": "#9e6f2e",
  "category": "Кофейня",
  "logo": "assets/partners/013.png",
  "service": "Self Service",
  "weight": 6,
  "cash": 15,
  "maxBonuses": 1800,
  "condition": "За одну покупку на кассе",
  "untilDay": 26,
  "closingHour": 21,
  "source": ""
 },
 {
  "name": "Палитра вкусов",
  "short": "Пв",
  "color": "#9e2e4c",
  "category": "Кафе и рестораны",
  "logo": "assets/partners/014.png",
  "service": "Self Service",
  "weight": 15,
  "cash": 25,
  "maxBonuses": 950,
  "condition": "За покупки на кассе",
  "untilDay": 30,
  "closingHour": 22,
  "source": ""
 },
 {
  "name": "Gloria Jeans",
  "short": "GJ",
  "color": "#9e482e",
  "category": "Одежда для всей семьи",
  "logo": "assets/partners/015.png",
  "service": "Full Service",
  "weight": 91,
  "cash": 15,
  "maxBonuses": 1500,
  "condition": "За покупки на кассе",
  "untilDay": 22,
  "closingHour": 21,
  "source": "https://www.gloria-jeans.ru/"
 },
 {
  "name": "MDC+",
  "short": "M",
  "color": "#2e9e98",
  "category": "Медицинский центр",
  "logo": "assets/partners/016.png",
  "service": "Self Service",
  "weight": 28,
  "cash": 20,
  "maxBonuses": 1350,
  "condition": "За одну покупку на кассе",
  "untilDay": 17,
  "closingHour": 22,
  "source": ""
 },
 {
  "name": "Сибирячка и Снегирь",
  "short": "Си",
  "color": "#9e772e",
  "category": "Кафе и рестораны",
  "logo": "assets/partners/017.png",
  "service": "Self Service",
  "weight": 10,
  "cash": 15,
  "maxBonuses": 800,
  "condition": "За одну покупку на кассе",
  "untilDay": 30,
  "closingHour": 21,
  "source": ""
 },
 {
  "name": "Seven Six",
  "short": "SS",
  "color": "#752e9e",
  "category": "Теннисная одежда",
  "logo": "assets/partners/018.png",
  "service": "Full Service",
  "weight": 84,
  "cash": 25,
  "maxBonuses": 500,
  "condition": "За покупки на кассе",
  "untilDay": 15,
  "closingHour": 23,
  "source": "https://sevensix.sport/about/"
 },
 {
  "name": "Особенный наполеон",
  "short": "Он",
  "color": "#2e9e82",
  "category": "Кафе и рестораны",
  "logo": "assets/partners/019.png",
  "service": "Self Service",
  "weight": 16,
  "cash": 40,
  "maxBonuses": 1000,
  "condition": "За одну покупку на кассе",
  "untilDay": 16,
  "closingHour": 23,
  "source": ""
 },
 {
  "name": "МРТ Экспресс",
  "short": "МЭ",
  "color": "#9e372e",
  "category": "Диагностический центр",
  "logo": "assets/partners/020.png",
  "service": "Full Service",
  "weight": 77,
  "cash": 25,
  "maxBonuses": 1250,
  "condition": "За одну покупку на кассе",
  "untilDay": 27,
  "closingHour": 23,
  "source": "https://mrtexpress.ru/"
 },
 {
  "name": "ВинЛаб",
  "short": "В",
  "color": "#9e2e86",
  "category": "Магазин напитков",
  "logo": "assets/partners/021.png",
  "service": "Full Service",
  "weight": 96,
  "cash": 40,
  "maxBonuses": 450,
  "condition": "За одну покупку на кассе",
  "untilDay": 28,
  "closingHour": 21,
  "source": "https://corp.winelab.ru/ru/"
 },
 {
  "name": "AMAZING RED",
  "short": "AR",
  "color": "#9e2e41",
  "category": "Спортивная одежда и обувь",
  "logo": "assets/partners/022.png",
  "service": "Full Service",
  "weight": 62,
  "cash": 15,
  "maxBonuses": 1350,
  "condition": "За покупки на кассе",
  "untilDay": 27,
  "closingHour": 23,
  "source": "https://amazingred.ru/"
 },
 {
  "name": "PALAZZO DUCALE",
  "short": "PD",
  "color": "#9e2e5f",
  "category": "Кафе и рестораны",
  "logo": "assets/partners/023.png",
  "service": "Self Service",
  "weight": 5,
  "cash": 10,
  "maxBonuses": 600,
  "condition": "За покупки на кассе",
  "untilDay": 15,
  "closingHour": 21,
  "source": ""
 },
 {
  "name": "Улыбка радуги",
  "short": "Ур",
  "color": "#9e302e",
  "category": "Косметика и товары для дома",
  "logo": "assets/partners/024.png",
  "service": "Full Service",
  "weight": 84,
  "cash": 15,
  "maxBonuses": 1300,
  "condition": "За одну покупку на кассе",
  "untilDay": 16,
  "closingHour": 22,
  "source": "https://www.r-ulybka.ru/about/"
 },
 {
  "name": "Оптика",
  "short": "О",
  "color": "#9e2e5f",
  "category": "Оптика",
  "logo": "assets/partners/self-service.svg",
  "service": "Self Service",
  "weight": 5,
  "cash": 10,
  "maxBonuses": 1350,
  "condition": "За покупки на кассе",
  "untilDay": 22,
  "closingHour": 22,
  "source": ""
 },
 {
  "name": "Якитория",
  "short": "Я",
  "color": "#9e2e53",
  "category": "Японский ресторан",
  "logo": "assets/partners/026.png",
  "service": "Full Service",
  "weight": 60,
  "cash": 30,
  "maxBonuses": 1300,
  "condition": "За покупки на кассе",
  "untilDay": 16,
  "closingHour": 21,
  "source": "https://yakitoriya.ru/"
 },
 {
  "name": "DeLonghi",
  "short": "D",
  "color": "#689e2e",
  "category": "Техника для кухни",
  "logo": "assets/partners/027.png",
  "service": "Full Service",
  "weight": 71,
  "cash": 15,
  "maxBonuses": 1950,
  "condition": "За одну покупку на кассе",
  "untilDay": 15,
  "closingHour": 21,
  "source": "https://delonghi.ru/"
 },
 {
  "name": "Uniq",
  "short": "U",
  "color": "#9e642e",
  "category": "Одежда и аксессуары",
  "logo": "assets/partners/028.png",
  "service": "Self Service",
  "weight": 30,
  "cash": 10,
  "maxBonuses": 1700,
  "condition": "За одну покупку на кассе",
  "untilDay": 28,
  "closingHour": 21,
  "source": ""
 },
 {
  "name": "Алиев Дентал",
  "short": "АД",
  "color": "#2e6c9e",
  "category": "Стоматология",
  "logo": "assets/partners/029.png",
  "service": "Self Service",
  "weight": 28,
  "cash": 15,
  "maxBonuses": 1250,
  "condition": "За одну покупку на кассе",
  "untilDay": 22,
  "closingHour": 20,
  "source": ""
 },
 {
  "name": "Точка красоты",
  "short": "Тк",
  "color": "#2e9e95",
  "category": "Красота и уход",
  "logo": "assets/partners/030.png",
  "service": "Self Service",
  "weight": 26,
  "cash": 35,
  "maxBonuses": 950,
  "condition": "За одну покупку на кассе",
  "untilDay": 29,
  "closingHour": 20,
  "source": ""
 },
 {
  "name": "Магазин «Биджин»",
  "short": "М«",
  "color": "#2e919e",
  "category": "Одежда и аксессуары",
  "logo": "assets/partners/031.png",
  "service": "Self Service",
  "weight": 8,
  "cash": 10,
  "maxBonuses": 1350,
  "condition": "За одну покупку на кассе",
  "untilDay": 21,
  "closingHour": 20,
  "source": ""
 },
 {
  "name": "Taper-1",
  "short": "T",
  "color": "#9a9e2e",
  "category": "Красота и уход",
  "logo": "assets/partners/032.png",
  "service": "Self Service",
  "weight": 3,
  "cash": 10,
  "maxBonuses": 1700,
  "condition": "За покупки на кассе",
  "untilDay": 15,
  "closingHour": 21,
  "source": ""
 },
 {
  "name": "Garnet Clinik",
  "short": "GC",
  "color": "#2e7b9e",
  "category": "Кафе и рестораны",
  "logo": "assets/partners/033.png",
  "service": "Self Service",
  "weight": 20,
  "cash": 10,
  "maxBonuses": 900,
  "condition": "За одну покупку на кассе",
  "untilDay": 16,
  "closingHour": 21,
  "source": ""
 },
 {
  "name": "Арсенал",
  "short": "А",
  "color": "#2e9e84",
  "category": "Инструменты",
  "logo": "assets/partners/034.png",
  "service": "Full Service",
  "weight": 97,
  "cash": 40,
  "maxBonuses": 1200,
  "condition": "За покупки на кассе",
  "untilDay": 25,
  "closingHour": 22,
  "source": "https://www.arsenaltools.ru/"
 },
 {
  "name": "Womenpoint",
  "short": "W",
  "color": "#919e2e",
  "category": "Одежда и аксессуары",
  "logo": "assets/partners/035.png",
  "service": "Self Service",
  "weight": 8,
  "cash": 10,
  "maxBonuses": 450,
  "condition": "За одну покупку на кассе",
  "untilDay": 19,
  "closingHour": 23,
  "source": ""
 },
 {
  "name": "Mono Beauty Moscow",
  "short": "MB",
  "color": "#2e629e",
  "category": "Красота и уход",
  "logo": "assets/partners/036.png",
  "service": "Self Service",
  "weight": 3,
  "cash": 10,
  "maxBonuses": 1250,
  "condition": "За покупки на кассе",
  "untilDay": 24,
  "closingHour": 0,
  "source": ""
 },
 {
  "name": "Bogdanova_pmu",
  "short": "B",
  "color": "#9e2e35",
  "category": "Красота и уход",
  "logo": "assets/partners/037.png",
  "service": "Self Service",
  "weight": 27,
  "cash": 10,
  "maxBonuses": 650,
  "condition": "За покупки на кассе",
  "untilDay": 29,
  "closingHour": 23,
  "source": ""
 },
 {
  "name": "Много лосося",
  "short": "Мл",
  "color": "#9e2e39",
  "category": "Суши и роллы с доставкой",
  "logo": "assets/partners/038.png",
  "service": "Full Service",
  "weight": 87,
  "cash": 30,
  "maxBonuses": 1250,
  "condition": "За покупки на кассе",
  "untilDay": 15,
  "closingHour": 22,
  "source": "https://mnogolososya.ru/"
 },
 {
  "name": "Горлаб",
  "short": "Г",
  "color": "#572e9e",
  "category": "Медицинская лаборатория",
  "logo": "assets/partners/039.png",
  "service": "Full Service",
  "weight": 69,
  "cash": 30,
  "maxBonuses": 1600,
  "condition": "За покупки на кассе",
  "untilDay": 28,
  "closingHour": 23,
  "source": "https://gorlab.ru/moskva/"
 },
 {
  "name": "Мио массаж",
  "short": "Мм",
  "color": "#2e689e",
  "category": "Красота и уход",
  "logo": "assets/partners/040.png",
  "service": "Self Service",
  "weight": 30,
  "cash": 15,
  "maxBonuses": 1200,
  "condition": "За одну покупку на кассе",
  "untilDay": 25,
  "closingHour": 22,
  "source": ""
 },
 {
  "name": "Шаурмастер",
  "short": "Ш",
  "color": "#8a9e2e",
  "category": "Кафе и рестораны",
  "logo": "assets/partners/000.png",
  "service": "Self Service",
  "weight": 12,
  "cash": 25,
  "maxBonuses": 1700,
  "condition": "За одну покупку на кассе",
  "untilDay": 17,
  "closingHour": 20,
  "source": ""
 },
 {
  "name": "Botinelli",
  "short": "B",
  "color": "#2e579e",
  "category": "Одежда и аксессуары",
  "logo": "assets/partners/042.png",
  "service": "Self Service",
  "weight": 9,
  "cash": 35,
  "maxBonuses": 1150,
  "condition": "За покупки на кассе",
  "untilDay": 29,
  "closingHour": 22,
  "source": ""
 },
 {
  "name": "Amber",
  "short": "A",
  "color": "#329e2e",
  "category": "Красота и уход",
  "logo": "assets/partners/043.png",
  "service": "Self Service",
  "weight": 29,
  "cash": 20,
  "maxBonuses": 1250,
  "condition": "За покупки на кассе",
  "untilDay": 25,
  "closingHour": 22,
  "source": ""
 },
 {
  "name": "Кыргызстан",
  "short": "К",
  "color": "#9e5f2e",
  "category": "Продукты",
  "logo": "assets/partners/044.png",
  "service": "Self Service",
  "weight": 27,
  "cash": 15,
  "maxBonuses": 1200,
  "condition": "За покупки на кассе",
  "untilDay": 20,
  "closingHour": 20,
  "source": ""
 },
 {
  "name": "РИВ ГОШ",
  "short": "РГ",
  "color": "#9e882e",
  "category": "Парфюмерия и косметика",
  "logo": "assets/partners/045.png",
  "service": "Full Service",
  "weight": 62,
  "cash": 10,
  "maxBonuses": 1000,
  "condition": "За покупки на кассе",
  "untilDay": 26,
  "closingHour": 0,
  "source": "https://rivegauche.ru/"
 },
 {
  "name": "СПА Сиам",
  "short": "СС",
  "color": "#482e9e",
  "category": "Тайский массаж и СПА",
  "logo": "assets/partners/046.png",
  "service": "Full Service",
  "weight": 90,
  "cash": 15,
  "maxBonuses": 1800,
  "condition": "За покупки на кассе",
  "untilDay": 27,
  "closingHour": 0,
  "source": "https://spasiam.ru/"
 },
 {
  "name": "Ясно",
  "short": "Я",
  "color": "#592e9e",
  "category": "Онлайн-консультации психолога",
  "logo": "assets/partners/047.png",
  "service": "Full Service",
  "weight": 98,
  "cash": 30,
  "maxBonuses": 1500,
  "condition": "За одну покупку на кассе",
  "untilDay": 16,
  "closingHour": 21,
  "source": "https://yasno.live/"
 },
 {
  "name": "Clean Clinic",
  "short": "CC",
  "color": "#2e559e",
  "category": "Медицинский центр",
  "logo": "assets/partners/048.png",
  "service": "Self Service",
  "weight": 10,
  "cash": 20,
  "maxBonuses": 1800,
  "condition": "За одну покупку на кассе",
  "untilDay": 24,
  "closingHour": 21,
  "source": ""
 },
 {
  "name": "Аптека 36,6",
  "short": "А3",
  "color": "#9e2e6d",
  "category": "Аптека",
  "logo": "assets/partners/049.png",
  "service": "Full Service",
  "weight": 80,
  "cash": 35,
  "maxBonuses": 1300,
  "condition": "За покупки на кассе",
  "untilDay": 19,
  "closingHour": 0,
  "source": "https://366.ru/"
 },
 {
  "name": "PROBIVNOY",
  "short": "P",
  "color": "#9e2e77",
  "category": "Кожаные сумки и аксессуары",
  "logo": "assets/partners/050.png",
  "service": "Full Service",
  "weight": 76,
  "cash": 25,
  "maxBonuses": 1900,
  "condition": "За одну покупку на кассе",
  "untilDay": 22,
  "closingHour": 23,
  "source": "https://probivnoyofficial.ru/about"
 },
 {
  "name": "Даниэль",
  "short": "Д",
  "color": "#2e9e48",
  "category": "Детская одежда и обувь",
  "logo": "assets/partners/051.png",
  "service": "Full Service",
  "weight": 84,
  "cash": 35,
  "maxBonuses": 1000,
  "condition": "За покупки на кассе",
  "untilDay": 30,
  "closingHour": 20,
  "source": "https://danielonline.ru/about_us/"
 },
 {
  "name": "Тануки",
  "short": "Т",
  "color": "#9e2e57",
  "category": "Японский ресторан",
  "logo": "assets/partners/052.png",
  "service": "Full Service",
  "weight": 67,
  "cash": 10,
  "maxBonuses": 950,
  "condition": "За покупки на кассе",
  "untilDay": 29,
  "closingHour": 22,
  "source": "https://www.tanuki.ru/"
 },
 {
  "name": "Психолог Иванова",
  "short": "ПИ",
  "color": "#6c2e9e",
  "category": "Кафе и рестораны",
  "logo": "assets/partners/053.png",
  "service": "Self Service",
  "weight": 4,
  "cash": 35,
  "maxBonuses": 600,
  "condition": "За одну покупку на кассе",
  "untilDay": 18,
  "closingHour": 22,
  "source": ""
 },
 {
  "name": "Русская Икра Плюс",
  "short": "РИ",
  "color": "#372e9e",
  "category": "Продукты",
  "logo": "assets/partners/054.png",
  "service": "Self Service",
  "weight": 6,
  "cash": 35,
  "maxBonuses": 1000,
  "condition": "За одну покупку на кассе",
  "untilDay": 19,
  "closingHour": 23,
  "source": ""
 },
 {
  "name": "Мода Италии",
  "short": "МИ",
  "color": "#4e9e2e",
  "category": "Одежда и аксессуары",
  "logo": "assets/partners/055.png",
  "service": "Self Service",
  "weight": 14,
  "cash": 35,
  "maxBonuses": 1250,
  "condition": "За одну покупку на кассе",
  "untilDay": 27,
  "closingHour": 21,
  "source": ""
 },
 {
  "name": "Kitfort",
  "short": "K",
  "color": "#9e642e",
  "category": "Бытовая техника",
  "logo": "assets/partners/056.png",
  "service": "Full Service",
  "weight": 68,
  "cash": 20,
  "maxBonuses": 1000,
  "condition": "За одну покупку на кассе",
  "untilDay": 19,
  "closingHour": 20,
  "source": "https://kitfort.ru/"
 },
 {
  "name": "Ажиотаж",
  "short": "А",
  "color": "#342e9e",
  "category": "Кафе и рестораны",
  "logo": "assets/partners/057.png",
  "service": "Self Service",
  "weight": 4,
  "cash": 10,
  "maxBonuses": 1900,
  "condition": "За одну покупку на кассе",
  "untilDay": 21,
  "closingHour": 21,
  "source": ""
 },
 {
  "name": "Цветалета",
  "short": "Ц",
  "color": "#862e9e",
  "category": "Кафе и рестораны",
  "logo": "assets/partners/058.png",
  "service": "Self Service",
  "weight": 18,
  "cash": 35,
  "maxBonuses": 1750,
  "condition": "За одну покупку на кассе",
  "untilDay": 15,
  "closingHour": 0,
  "source": ""
 },
 {
  "name": "Pigment Club",
  "short": "PC",
  "color": "#9e642e",
  "category": "Красота и уход",
  "logo": "assets/partners/059.png",
  "service": "Self Service",
  "weight": 30,
  "cash": 25,
  "maxBonuses": 2000,
  "condition": "За одну покупку на кассе",
  "untilDay": 17,
  "closingHour": 0,
  "source": ""
 },
 {
  "name": "Кристалл проф",
  "short": "Кп",
  "color": "#9e2e6f",
  "category": "Кафе и рестораны",
  "logo": "assets/partners/060.png",
  "service": "Self Service",
  "weight": 26,
  "cash": 40,
  "maxBonuses": 1200,
  "condition": "За одну покупку на кассе",
  "untilDay": 22,
  "closingHour": 21,
  "source": ""
 },
 {
  "name": "Салон красоты Roby",
  "short": "Ск",
  "color": "#9e2e9c",
  "category": "Красота и уход",
  "logo": "assets/partners/061.png",
  "service": "Self Service",
  "weight": 2,
  "cash": 40,
  "maxBonuses": 1050,
  "condition": "За одну покупку на кассе",
  "untilDay": 27,
  "closingHour": 0,
  "source": ""
 },
 {
  "name": "Твой Кейтеринг",
  "short": "ТК",
  "color": "#9e2e6c",
  "category": "Кафе и рестораны",
  "logo": "assets/partners/062.png",
  "service": "Self Service",
  "weight": 28,
  "cash": 25,
  "maxBonuses": 1450,
  "condition": "За одну покупку на кассе",
  "untilDay": 15,
  "closingHour": 23,
  "source": ""
 },
 {
  "name": "Полако",
  "short": "П",
  "color": "#2e9e80",
  "category": "Кафе и рестораны",
  "logo": "assets/partners/063.png",
  "service": "Self Service",
  "weight": 15,
  "cash": 30,
  "maxBonuses": 1050,
  "condition": "За покупки на кассе",
  "untilDay": 22,
  "closingHour": 23,
  "source": ""
 },
 {
  "name": "Zolla",
  "short": "Z",
  "color": "#9e462e",
  "category": "Одежда и аксессуары",
  "logo": "assets/partners/064.png",
  "service": "Full Service",
  "weight": 81,
  "cash": 20,
  "maxBonuses": 950,
  "condition": "За одну покупку на кассе",
  "untilDay": 24,
  "closingHour": 0,
  "source": "https://zolla.com/about/"
 },
 {
  "name": "Трит",
  "short": "Т",
  "color": "#719e2e",
  "category": "Кафе и рестораны",
  "logo": "assets/partners/065.png",
  "service": "Self Service",
  "weight": 25,
  "cash": 40,
  "maxBonuses": 1450,
  "condition": "За покупки на кассе",
  "untilDay": 29,
  "closingHour": 20,
  "source": ""
 },
 {
  "name": "Бондимания",
  "short": "Б",
  "color": "#2e449e",
  "category": "Кофейня",
  "logo": "assets/partners/066.png",
  "service": "Self Service",
  "weight": 19,
  "cash": 30,
  "maxBonuses": 650,
  "condition": "За покупки на кассе",
  "untilDay": 17,
  "closingHour": 22,
  "source": ""
 },
 {
  "name": "MoreKoT",
  "short": "M",
  "color": "#9e682e",
  "category": "Кофейня",
  "logo": "assets/partners/067.png",
  "service": "Self Service",
  "weight": 2,
  "cash": 20,
  "maxBonuses": 1550,
  "condition": "За одну покупку на кассе",
  "untilDay": 25,
  "closingHour": 20,
  "source": ""
 },
 {
  "name": "Амрита",
  "short": "А",
  "color": "#9e462e",
  "category": "Медицинский центр",
  "logo": "assets/partners/068.png",
  "service": "Self Service",
  "weight": 14,
  "cash": 25,
  "maxBonuses": 450,
  "condition": "За одну покупку на кассе",
  "untilDay": 24,
  "closingHour": 23,
  "source": ""
 },
 {
  "name": "Зубной Дом",
  "short": "ЗД",
  "color": "#9e2e66",
  "category": "Кафе и рестораны",
  "logo": "assets/partners/069.png",
  "service": "Self Service",
  "weight": 1,
  "cash": 20,
  "maxBonuses": 1050,
  "condition": "За покупки на кассе",
  "untilDay": 30,
  "closingHour": 0,
  "source": ""
 },
 {
  "name": "Westmed",
  "short": "W",
  "color": "#9e842e",
  "category": "Кафе и рестораны",
  "logo": "assets/partners/070.png",
  "service": "Self Service",
  "weight": 17,
  "cash": 35,
  "maxBonuses": 2000,
  "condition": "За покупки на кассе",
  "untilDay": 22,
  "closingHour": 21,
  "source": ""
 },
 {
  "name": "Спортмастер",
  "short": "С",
  "color": "#392e9e",
  "category": "Спортивные товары",
  "logo": "assets/partners/071.png",
  "service": "Full Service",
  "weight": 98,
  "cash": 30,
  "maxBonuses": 1250,
  "condition": "За покупки на кассе",
  "untilDay": 19,
  "closingHour": 20,
  "source": "https://www.sportmaster.ru/"
 },
 {
  "name": "Да Винчи",
  "short": "ДВ",
  "color": "#2e9e2e",
  "category": "Кафе и рестораны",
  "logo": "assets/partners/072.png",
  "service": "Self Service",
  "weight": 1,
  "cash": 25,
  "maxBonuses": 1900,
  "condition": "За покупки на кассе",
  "untilDay": 19,
  "closingHour": 23,
  "source": ""
 },
 {
  "name": "SKILL BIKE",
  "short": "SB",
  "color": "#2e469e",
  "category": "Велосипеды",
  "logo": "assets/partners/073.png",
  "service": "Full Service",
  "weight": 82,
  "cash": 40,
  "maxBonuses": 1400,
  "condition": "За одну покупку на кассе",
  "untilDay": 15,
  "closingHour": 20,
  "source": "https://skill-bike.ru/company/"
 },
 {
  "name": "Барбершоп",
  "short": "Б",
  "color": "#912e9e",
  "category": "Красота и уход",
  "logo": "assets/partners/074.png",
  "service": "Self Service",
  "weight": 24,
  "cash": 25,
  "maxBonuses": 800,
  "condition": "За одну покупку на кассе",
  "untilDay": 26,
  "closingHour": 23,
  "source": ""
 },
 {
  "name": "Ed Beauty",
  "short": "EB",
  "color": "#9e2e30",
  "category": "Красота и уход",
  "logo": "assets/partners/075.png",
  "service": "Self Service",
  "weight": 30,
  "cash": 40,
  "maxBonuses": 1400,
  "condition": "За одну покупку на кассе",
  "untilDay": 27,
  "closingHour": 23,
  "source": ""
 },
 {
  "name": "Yamaguchi",
  "short": "Y",
  "color": "#869e2e",
  "category": "Массажное оборудование",
  "logo": "assets/partners/076.png",
  "service": "Full Service",
  "weight": 75,
  "cash": 20,
  "maxBonuses": 800,
  "condition": "За одну покупку на кассе",
  "untilDay": 17,
  "closingHour": 22,
  "source": "https://www.yamaguchi.ru/"
 },
 {
  "name": "Магазин Sorochka.pro",
  "short": "МS",
  "color": "#559e2e",
  "category": "Одежда и аксессуары",
  "logo": "assets/partners/077.png",
  "service": "Self Service",
  "weight": 10,
  "cash": 35,
  "maxBonuses": 900,
  "condition": "За одну покупку на кассе",
  "untilDay": 29,
  "closingHour": 21,
  "source": ""
 },
 {
  "name": "NO ONE",
  "short": "NO",
  "color": "#3f2e9e",
  "category": "Обувь и аксессуары",
  "logo": "assets/partners/078.png",
  "service": "Full Service",
  "weight": 70,
  "cash": 15,
  "maxBonuses": 800,
  "condition": "За одну покупку на кассе",
  "untilDay": 28,
  "closingHour": 20,
  "source": "https://www.noone.ru/"
 },
 {
  "name": "SJ",
  "short": "S",
  "color": "#372e9e",
  "category": "Одежда и аксессуары",
  "logo": "assets/partners/079.png",
  "service": "Self Service",
  "weight": 6,
  "cash": 20,
  "maxBonuses": 1600,
  "condition": "За одну покупку на кассе",
  "untilDay": 15,
  "closingHour": 22,
  "source": ""
 },
 {
  "name": "Салон нижнего белья Vasilissa",
  "short": "Сн",
  "color": "#2e9e8a",
  "category": "Одежда и аксессуары",
  "logo": "assets/partners/080.png",
  "service": "Self Service",
  "weight": 20,
  "cash": 40,
  "maxBonuses": 1800,
  "condition": "За одну покупку на кассе",
  "untilDay": 22,
  "closingHour": 22,
  "source": ""
 },
 {
  "name": "Гастроном",
  "short": "Г",
  "color": "#3b2e9e",
  "category": "Продукты",
  "logo": "assets/partners/081.png",
  "service": "Self Service",
  "weight": 8,
  "cash": 10,
  "maxBonuses": 600,
  "condition": "За одну покупку на кассе",
  "untilDay": 26,
  "closingHour": 22,
  "source": ""
 },
 {
  "name": "Moulinex",
  "short": "M",
  "color": "#9e2e9e",
  "category": "Техника для кухни",
  "logo": "assets/partners/082.png",
  "service": "Full Service",
  "weight": 66,
  "cash": 25,
  "maxBonuses": 1750,
  "condition": "За покупки на кассе",
  "untilDay": 28,
  "closingHour": 23,
  "source": "https://moulinex.ru/"
 },
 {
  "name": "Cave",
  "short": "C",
  "color": "#9e2e88",
  "category": "Повседневная одежда",
  "logo": "assets/partners/083.png",
  "service": "Full Service",
  "weight": 71,
  "cash": 15,
  "maxBonuses": 2000,
  "condition": "За покупки на кассе",
  "untilDay": 16,
  "closingHour": 0,
  "source": "https://the-cave.ru/content/faq/"
 },
 {
  "name": "Сити Стайл",
  "short": "СС",
  "color": "#9e532e",
  "category": "Кафе и рестораны",
  "logo": "assets/partners/084.png",
  "service": "Self Service",
  "weight": 21,
  "cash": 15,
  "maxBonuses": 450,
  "condition": "За покупки на кассе",
  "untilDay": 27,
  "closingHour": 22,
  "source": ""
 },
 {
  "name": "Аптека Ригла",
  "short": "АР",
  "color": "#2e9e4e",
  "category": "Аптека",
  "logo": "assets/partners/085.png",
  "service": "Full Service",
  "weight": 89,
  "cash": 35,
  "maxBonuses": 1600,
  "condition": "За одну покупку на кассе",
  "untilDay": 18,
  "closingHour": 21,
  "source": "https://www.rigla.ru/"
 },
 {
  "name": "Лаки Ю",
  "short": "ЛЮ",
  "color": "#9e2e39",
  "category": "Студия красоты",
  "logo": "assets/partners/086.png",
  "service": "Full Service",
  "weight": 68,
  "cash": 40,
  "maxBonuses": 1150,
  "condition": "За покупки на кассе",
  "untilDay": 18,
  "closingHour": 21,
  "source": "https://luckyyounails.com/"
 },
 {
  "name": "Шёлк",
  "short": "Ш",
  "color": "#9e802e",
  "category": "Кафе и рестораны",
  "logo": "assets/partners/087.png",
  "service": "Self Service",
  "weight": 15,
  "cash": 30,
  "maxBonuses": 1050,
  "condition": "За покупки на кассе",
  "untilDay": 30,
  "closingHour": 21,
  "source": ""
 },
 {
  "name": "SKIN EXPERT",
  "short": "SE",
  "color": "#9e802e",
  "category": "Косметологическая клиника",
  "logo": "assets/partners/088.png",
  "service": "Full Service",
  "weight": 73,
  "cash": 40,
  "maxBonuses": 1700,
  "condition": "За покупки на кассе",
  "untilDay": 16,
  "closingHour": 20,
  "source": "https://skinexpertmsc.ru/"
 },
 {
  "name": "SK",
  "short": "S",
  "color": "#2e9e7c",
  "category": "Красота и уход",
  "logo": "assets/partners/089.png",
  "service": "Self Service",
  "weight": 13,
  "cash": 15,
  "maxBonuses": 950,
  "condition": "За покупки на кассе",
  "untilDay": 18,
  "closingHour": 22,
  "source": ""
 },
 {
  "name": "Магазин женской одежды",
  "short": "Мж",
  "color": "#2e9e2e",
  "category": "Одежда и аксессуары",
  "logo": "assets/partners/090.png",
  "service": "Self Service",
  "weight": 1,
  "cash": 10,
  "maxBonuses": 1900,
  "condition": "За покупки на кассе",
  "untilDay": 20,
  "closingHour": 21,
  "source": ""
 },
 {
  "name": "Луч",
  "short": "Л",
  "color": "#9e2e62",
  "category": "Красота и уход",
  "logo": "assets/partners/091.png",
  "service": "Self Service",
  "weight": 3,
  "cash": 30,
  "maxBonuses": 1800,
  "condition": "За покупки на кассе",
  "untilDay": 29,
  "closingHour": 20,
  "source": ""
 },
 {
  "name": "INVITRO",
  "short": "I",
  "color": "#9e392e",
  "category": "Медицинская лаборатория",
  "logo": "assets/partners/092.png",
  "service": "Full Service",
  "weight": 96,
  "cash": 10,
  "maxBonuses": 400,
  "condition": "За покупки на кассе",
  "untilDay": 25,
  "closingHour": 23,
  "source": "https://www.invitro.ru/"
 },
 {
  "name": "Eazyway",
  "short": "E",
  "color": "#9c2e9e",
  "category": "Спортивная одежда",
  "logo": "assets/partners/093.png",
  "service": "Full Service",
  "weight": 90,
  "cash": 25,
  "maxBonuses": 1400,
  "condition": "За одну покупку на кассе",
  "untilDay": 24,
  "closingHour": 0,
  "source": "https://www.eazy-way.com/"
 },
 {
  "name": "Гемотест",
  "short": "Г",
  "color": "#9e4a2e",
  "category": "Медицинская лаборатория",
  "logo": "assets/partners/094.png",
  "service": "Full Service",
  "weight": 95,
  "cash": 30,
  "maxBonuses": 1700,
  "condition": "За одну покупку на кассе",
  "untilDay": 30,
  "closingHour": 21,
  "source": "https://gemotest.ru/"
 },
 {
  "name": "Хочу Шаурму",
  "short": "ХШ",
  "color": "#9a2e9e",
  "category": "Кафе и рестораны",
  "logo": "assets/partners/000.png",
  "service": "Self Service",
  "weight": 29,
  "cash": 15,
  "maxBonuses": 700,
  "condition": "За покупки на кассе",
  "untilDay": 15,
  "closingHour": 0,
  "source": ""
 },
 {
  "name": "Барбершоп Zyo",
  "short": "БZ",
  "color": "#779e2e",
  "category": "Красота и уход",
  "logo": "assets/partners/096.png",
  "service": "Self Service",
  "weight": 22,
  "cash": 40,
  "maxBonuses": 700,
  "condition": "За одну покупку на кассе",
  "untilDay": 22,
  "closingHour": 21,
  "source": ""
 },
 {
  "name": "Эльдорадо",
  "short": "Э",
  "color": "#792e9e",
  "category": "Электроника и бытовая техника",
  "logo": "assets/partners/097.png",
  "service": "Full Service",
  "weight": 74,
  "cash": 15,
  "maxBonuses": 1900,
  "condition": "За покупки на кассе",
  "untilDay": 17,
  "closingHour": 20,
  "source": "https://www.mvideoeldorado.ru/ru/about-us/our-brands"
 },
 {
  "name": "Магазин Белла",
  "short": "МБ",
  "color": "#2e3d9e",
  "category": "Одежда и аксессуары",
  "logo": "assets/partners/self-service.svg",
  "service": "Self Service",
  "weight": 23,
  "cash": 15,
  "maxBonuses": 700,
  "condition": "За покупки на кассе",
  "untilDay": 25,
  "closingHour": 22,
  "source": ""
 },
 {
  "name": "Шаурмен",
  "short": "Ш",
  "color": "#2e689e",
  "category": "Кафе и рестораны",
  "logo": "assets/partners/000.png",
  "service": "Self Service",
  "weight": 30,
  "cash": 25,
  "maxBonuses": 650,
  "condition": "За одну покупку на кассе",
  "untilDay": 27,
  "closingHour": 20,
  "source": ""
 },
 {
  "name": "Престиж",
  "short": "П",
  "color": "#5f2e9e",
  "category": "Кафе и рестораны",
  "logo": "assets/partners/100.png",
  "service": "Self Service",
  "weight": 27,
  "cash": 30,
  "maxBonuses": 900,
  "condition": "За покупки на кассе",
  "untilDay": 29,
  "closingHour": 0,
  "source": ""
 },
 {
  "name": "М.Косметик",
  "short": "М",
  "color": "#329e2e",
  "category": "Косметика и товары для дома",
  "logo": "assets/partners/101.png",
  "service": "Full Service",
  "weight": 71,
  "cash": 30,
  "maxBonuses": 1600,
  "condition": "За покупки на кассе",
  "untilDay": 28,
  "closingHour": 21,
  "source": "https://www.magnit.com/ru/"
 },
 {
  "name": "Магия масел",
  "short": "Мм",
  "color": "#9e2e35",
  "category": "Продукты",
  "logo": "assets/partners/102.png",
  "service": "Self Service",
  "weight": 27,
  "cash": 10,
  "maxBonuses": 800,
  "condition": "За покупки на кассе",
  "untilDay": 16,
  "closingHour": 20,
  "source": ""
 },
 {
  "name": "Кофе с собой",
  "short": "Кс",
  "color": "#9e5f2e",
  "category": "Кофейня",
  "logo": "assets/partners/103.png",
  "service": "Self Service",
  "weight": 27,
  "cash": 30,
  "maxBonuses": 450,
  "condition": "За покупки на кассе",
  "untilDay": 29,
  "closingHour": 22,
  "source": ""
 },
 {
  "name": "ШАУROOM",
  "short": "Ш",
  "color": "#2e959e",
  "category": "Кафе и рестораны",
  "logo": "assets/partners/000.png",
  "service": "Self Service",
  "weight": 6,
  "cash": 35,
  "maxBonuses": 1600,
  "condition": "За одну покупку на кассе",
  "untilDay": 26,
  "closingHour": 20,
  "source": ""
 },
 {
  "name": "Фитомаркет",
  "short": "Ф",
  "color": "#2e799e",
  "category": "Товары для здоровья",
  "logo": "assets/partners/105.png",
  "service": "Full Service",
  "weight": 72,
  "cash": 15,
  "maxBonuses": 1200,
  "condition": "За покупки на кассе",
  "untilDay": 22,
  "closingHour": 21,
  "source": "https://fitomarket.ru/"
 },
 {
  "name": "Shaurma City",
  "short": "SC",
  "color": "#9e2e34",
  "category": "Кафе и рестораны",
  "logo": "assets/partners/000.png",
  "service": "Self Service",
  "weight": 28,
  "cash": 35,
  "maxBonuses": 750,
  "condition": "За одну покупку на кассе",
  "untilDay": 16,
  "closingHour": 0,
  "source": ""
 },
 {
  "name": "ZiZi Dent",
  "short": "ZD",
  "color": "#9e2e55",
  "category": "Стоматология",
  "logo": "assets/partners/107.png",
  "service": "Self Service",
  "weight": 10,
  "cash": 30,
  "maxBonuses": 1100,
  "condition": "За одну покупку на кассе",
  "untilDay": 15,
  "closingHour": 21,
  "source": ""
 },
 {
  "name": "Лаву",
  "short": "Л",
  "color": "#2e3f9e",
  "category": "Кафе и рестораны",
  "logo": "assets/partners/108.png",
  "service": "Self Service",
  "weight": 22,
  "cash": 20,
  "maxBonuses": 1800,
  "condition": "За одну покупку на кассе",
  "untilDay": 28,
  "closingHour": 20,
  "source": ""
 },
 {
  "name": "Taper",
  "short": "T",
  "color": "#649e2e",
  "category": "Красота и уход",
  "logo": "assets/partners/109.png",
  "service": "Self Service",
  "weight": 2,
  "cash": 25,
  "maxBonuses": 1500,
  "condition": "За одну покупку на кассе",
  "untilDay": 23,
  "closingHour": 23,
  "source": ""
 },
 {
  "name": "NEYROX",
  "short": "N",
  "color": "#5d2e9e",
  "category": "Носимые устройства",
  "logo": "assets/partners/110.png",
  "service": "Full Service",
  "weight": 86,
  "cash": 10,
  "maxBonuses": 600,
  "condition": "За одну покупку на кассе",
  "untilDay": 24,
  "closingHour": 0,
  "source": "https://neyrox.com/"
 },
 {
  "name": "London Lashes",
  "short": "LL",
  "color": "#882e9e",
  "category": "Красота и уход",
  "logo": "assets/partners/111.png",
  "service": "Self Service",
  "weight": 19,
  "cash": 35,
  "maxBonuses": 1050,
  "condition": "За покупки на кассе",
  "untilDay": 23,
  "closingHour": 20,
  "source": ""
 },
 {
  "name": "ТиО",
  "short": "Т",
  "color": "#662e9e",
  "category": "Кафе и рестораны",
  "logo": "assets/partners/112.png",
  "service": "Self Service",
  "weight": 1,
  "cash": 35,
  "maxBonuses": 1050,
  "condition": "За покупки на кассе",
  "untilDay": 25,
  "closingHour": 23,
  "source": ""
 },
 {
  "name": "All in Beauty",
  "short": "Ai",
  "color": "#9e952e",
  "category": "Красота и уход",
  "logo": "assets/partners/113.png",
  "service": "Self Service",
  "weight": 26,
  "cash": 10,
  "maxBonuses": 1500,
  "condition": "За одну покупку на кассе",
  "untilDay": 20,
  "closingHour": 0,
  "source": ""
 },
 {
  "name": "Добрый Доктор",
  "short": "ДД",
  "color": "#9e2e42",
  "category": "Медицинский центр",
  "logo": "assets/partners/114.png",
  "service": "Self Service",
  "weight": 20,
  "cash": 40,
  "maxBonuses": 450,
  "condition": "За одну покупку на кассе",
  "untilDay": 24,
  "closingHour": 0,
  "source": ""
 },
 {
  "name": "Стоматология",
  "short": "С",
  "color": "#932e9e",
  "category": "Стоматология",
  "logo": "assets/partners/115.png",
  "service": "Self Service",
  "weight": 25,
  "cash": 15,
  "maxBonuses": 1400,
  "condition": "За покупки на кассе",
  "untilDay": 22,
  "closingHour": 0,
  "source": ""
 },
 {
  "name": "МТС",
  "short": "М",
  "color": "#9e2e59",
  "category": "Связь и электроника",
  "logo": "assets/partners/116.png",
  "service": "Full Service",
  "weight": 98,
  "cash": 25,
  "maxBonuses": 1650,
  "condition": "За одну покупку на кассе",
  "untilDay": 20,
  "closingHour": 20,
  "source": "https://moskva.mts.ru/personal"
 },
 {
  "name": "ViKing",
  "short": "V",
  "color": "#912e9e",
  "category": "Красота и уход",
  "logo": "assets/partners/117.png",
  "service": "Self Service",
  "weight": 24,
  "cash": 40,
  "maxBonuses": 1550,
  "condition": "За одну покупку на кассе",
  "untilDay": 16,
  "closingHour": 22,
  "source": ""
 },
 {
  "name": "Чайная «Тифрейм»",
  "short": "Ч«",
  "color": "#2e979e",
  "category": "Кафе и рестораны",
  "logo": "assets/partners/118.png",
  "service": "Self Service",
  "weight": 5,
  "cash": 25,
  "maxBonuses": 1200,
  "condition": "За покупки на кассе",
  "untilDay": 16,
  "closingHour": 21,
  "source": ""
 },
 {
  "name": "Твоя pizza",
  "short": "Тp",
  "color": "#9e2e59",
  "category": "Пицца с доставкой",
  "logo": "assets/partners/119.png",
  "service": "Full Service",
  "weight": 94,
  "cash": 30,
  "maxBonuses": 1600,
  "condition": "За одну покупку на кассе",
  "untilDay": 29,
  "closingHour": 21,
  "source": "https://tanukifamily.ru/"
 },
 {
  "name": "Центр эпиляции",
  "short": "Цэ",
  "color": "#9e2e6f",
  "category": "Красота и уход",
  "logo": "assets/partners/120.png",
  "service": "Self Service",
  "weight": 26,
  "cash": 10,
  "maxBonuses": 1200,
  "condition": "За одну покупку на кассе",
  "untilDay": 16,
  "closingHour": 22,
  "source": ""
 },
 {
  "name": "Orso Bianco",
  "short": "OB",
  "color": "#2e6a9e",
  "category": "Детская верхняя одежда",
  "logo": "assets/partners/121.png",
  "service": "Full Service",
  "weight": 81,
  "cash": 40,
  "maxBonuses": 900,
  "condition": "За покупки на кассе",
  "untilDay": 25,
  "closingHour": 21,
  "source": "https://orsobianco.ru/o-nas/"
 },
 {
  "name": "Tom Tailor",
  "short": "TT",
  "color": "#309e2e",
  "category": "Повседневная одежда",
  "logo": "assets/partners/122.png",
  "service": "Full Service",
  "weight": 94,
  "cash": 30,
  "maxBonuses": 750,
  "condition": "За одну покупку на кассе",
  "untilDay": 17,
  "closingHour": 21,
  "source": "https://tom-tailor.ru/"
 },
 {
  "name": "Cream",
  "short": "C",
  "color": "#449e2e",
  "category": "Одежда и аксессуары",
  "logo": "assets/partners/123.png",
  "service": "Self Service",
  "weight": 19,
  "cash": 30,
  "maxBonuses": 1100,
  "condition": "За покупки на кассе",
  "untilDay": 18,
  "closingHour": 21,
  "source": ""
 },
 {
  "name": "Азиатские продукты",
  "short": "Ап",
  "color": "#2e9e46",
  "category": "Продукты",
  "logo": "assets/partners/124.png",
  "service": "Self Service",
  "weight": 14,
  "cash": 35,
  "maxBonuses": 2000,
  "condition": "За одну покупку на кассе",
  "untilDay": 19,
  "closingHour": 20,
  "source": ""
 },
 {
  "name": "Манч",
  "short": "М",
  "color": "#2e449e",
  "category": "Кафе и рестораны",
  "logo": "assets/partners/125.png",
  "service": "Self Service",
  "weight": 19,
  "cash": 35,
  "maxBonuses": 450,
  "condition": "За покупки на кассе",
  "untilDay": 24,
  "closingHour": 23,
  "source": ""
 },
 {
  "name": "Лор центр",
  "short": "Лц",
  "color": "#939e2e",
  "category": "Медицинский центр",
  "logo": "assets/partners/126.png",
  "service": "Self Service",
  "weight": 7,
  "cash": 20,
  "maxBonuses": 1800,
  "condition": "За покупки на кассе",
  "untilDay": 29,
  "closingHour": 20,
  "source": ""
 },
 {
  "name": "Твой образ",
  "short": "То",
  "color": "#2e759e",
  "category": "Одежда и аксессуары",
  "logo": "assets/partners/127.png",
  "service": "Self Service",
  "weight": 23,
  "cash": 15,
  "maxBonuses": 1900,
  "condition": "За покупки на кассе",
  "untilDay": 15,
  "closingHour": 23,
  "source": ""
 },
 {
  "name": "Трапезная",
  "short": "Т",
  "color": "#2e429e",
  "category": "Кафе и рестораны",
  "logo": "assets/partners/128.png",
  "service": "Self Service",
  "weight": 20,
  "cash": 30,
  "maxBonuses": 1000,
  "condition": "За одну покупку на кассе",
  "untilDay": 30,
  "closingHour": 21,
  "source": ""
 },
 {
  "name": "Extendess",
  "short": "E",
  "color": "#602e9e",
  "category": "Салон красоты",
  "logo": "assets/partners/129.png",
  "service": "Full Service",
  "weight": 87,
  "cash": 35,
  "maxBonuses": 1800,
  "condition": "За одну покупку на кассе",
  "untilDay": 15,
  "closingHour": 0,
  "source": "https://extendess.ru/about/"
 },
 {
  "name": "PIZHON",
  "short": "P",
  "color": "#919e2e",
  "category": "Мужская одежда и обувь",
  "logo": "assets/partners/130.png",
  "service": "Full Service",
  "weight": 93,
  "cash": 40,
  "maxBonuses": 1500,
  "condition": "За одну покупку на кассе",
  "untilDay": 22,
  "closingHour": 23,
  "source": "https://pizhon-store.ru/struktura-brenda-pizhon.html"
 },
 {
  "name": "Пироги №1",
  "short": "П№",
  "color": "#9e5b2e",
  "category": "Пекарня с доставкой",
  "logo": "assets/partners/131.png",
  "service": "Full Service",
  "weight": 68,
  "cash": 40,
  "maxBonuses": 1900,
  "condition": "За покупки на кассе",
  "untilDay": 26,
  "closingHour": 21,
  "source": "https://piroginomerodin.ru/"
 },
 {
  "name": "Aravia",
  "short": "A",
  "color": "#739e2e",
  "category": "Косметика для ухода",
  "logo": "assets/partners/132.png",
  "service": "Full Service",
  "weight": 72,
  "cash": 10,
  "maxBonuses": 1100,
  "condition": "За одну покупку на кассе",
  "untilDay": 18,
  "closingHour": 23,
  "source": "https://aravia.ru/"
 },
 {
  "name": "Modny Look",
  "short": "ML",
  "color": "#9e372e",
  "category": "Кафе и рестораны",
  "logo": "assets/partners/133.png",
  "service": "Self Service",
  "weight": 6,
  "cash": 10,
  "maxBonuses": 1700,
  "condition": "За одну покупку на кассе",
  "untilDay": 28,
  "closingHour": 22,
  "source": ""
 },
 {
  "name": "Котокафе",
  "short": "К",
  "color": "#8d2e9e",
  "category": "Кофейня",
  "logo": "assets/partners/134.png",
  "service": "Self Service",
  "weight": 22,
  "cash": 35,
  "maxBonuses": 1500,
  "condition": "За одну покупку на кассе",
  "untilDay": 17,
  "closingHour": 0,
  "source": ""
 },
 {
  "name": "Косметология",
  "short": "К",
  "color": "#642e9e",
  "category": "Красота и уход",
  "logo": "assets/partners/135.png",
  "service": "Self Service",
  "weight": 30,
  "cash": 10,
  "maxBonuses": 1100,
  "condition": "За одну покупку на кассе",
  "untilDay": 24,
  "closingHour": 21,
  "source": ""
 },
 {
  "name": "Штолле",
  "short": "Ш",
  "color": "#322e9e",
  "category": "Пироговые с доставкой",
  "logo": "assets/partners/136.png",
  "service": "Full Service",
  "weight": 89,
  "cash": 30,
  "maxBonuses": 1950,
  "condition": "За покупки на кассе",
  "untilDay": 18,
  "closingHour": 22,
  "source": "https://stolle.ru/"
 },
 {
  "name": "Студия перманента",
  "short": "Сп",
  "color": "#2e9e6c",
  "category": "Кафе и рестораны",
  "logo": "assets/partners/137.png",
  "service": "Self Service",
  "weight": 4,
  "cash": 35,
  "maxBonuses": 1650,
  "condition": "За одну покупку на кассе",
  "untilDay": 22,
  "closingHour": 21,
  "source": ""
 },
 {
  "name": "Redmond",
  "short": "R",
  "color": "#9e422e",
  "category": "Бытовая техника",
  "logo": "assets/partners/138.png",
  "service": "Full Service",
  "weight": 90,
  "cash": 40,
  "maxBonuses": 650,
  "condition": "За одну покупку на кассе",
  "untilDay": 24,
  "closingHour": 20,
  "source": "https://redmond.company/"
 },
 {
  "name": "Массажист Виктория",
  "short": "МВ",
  "color": "#719e2e",
  "category": "Красота и уход",
  "logo": "assets/partners/139.png",
  "service": "Self Service",
  "weight": 25,
  "cash": 25,
  "maxBonuses": 700,
  "condition": "За покупки на кассе",
  "untilDay": 24,
  "closingHour": 21,
  "source": ""
 },
 {
  "name": "Braun",
  "short": "B",
  "color": "#9e2e55",
  "category": "Бытовая техника",
  "logo": "assets/partners/140.png",
  "service": "Full Service",
  "weight": 66,
  "cash": 35,
  "maxBonuses": 1200,
  "condition": "За одну покупку на кассе",
  "untilDay": 19,
  "closingHour": 23,
  "source": "https://braunhousehold.ru/"
 },
 {
  "name": "Стоун-Дент",
  "short": "С",
  "color": "#6a2e9e",
  "category": "Стоматология",
  "logo": "assets/partners/141.png",
  "service": "Self Service",
  "weight": 3,
  "cash": 15,
  "maxBonuses": 1650,
  "condition": "За покупки на кассе",
  "untilDay": 15,
  "closingHour": 23,
  "source": ""
 },
 {
  "name": "Евродицентр",
  "short": "Е",
  "color": "#9e7b2e",
  "category": "Кафе и рестораны",
  "logo": "assets/partners/142.png",
  "service": "Self Service",
  "weight": 12,
  "cash": 30,
  "maxBonuses": 1350,
  "condition": "За одну покупку на кассе",
  "untilDay": 19,
  "closingHour": 20,
  "source": ""
 },
 {
  "name": "Ателье",
  "short": "А",
  "color": "#9e2e8a",
  "category": "Одежда и аксессуары",
  "logo": "assets/partners/143.png",
  "service": "Self Service",
  "weight": 12,
  "cash": 15,
  "maxBonuses": 1800,
  "condition": "За одну покупку на кассе",
  "untilDay": 30,
  "closingHour": 22,
  "source": ""
 },
 {
  "name": "Семейная парикмахерская",
  "short": "Сп",
  "color": "#4a2e9e",
  "category": "Красота и уход",
  "logo": "assets/partners/144.png",
  "service": "Self Service",
  "weight": 16,
  "cash": 30,
  "maxBonuses": 1400,
  "condition": "За одну покупку на кассе",
  "untilDay": 17,
  "closingHour": 0,
  "source": ""
 },
 {
  "name": "Homie Coffie",
  "short": "HC",
  "color": "#8a9e2e",
  "category": "Кофейня",
  "logo": "assets/partners/145.png",
  "service": "Self Service",
  "weight": 12,
  "cash": 10,
  "maxBonuses": 1550,
  "condition": "За одну покупку на кассе",
  "untilDay": 23,
  "closingHour": 0,
  "source": ""
 },
 {
  "name": "Bon Appartament",
  "short": "BA",
  "color": "#442e9e",
  "category": "Одежда и аксессуары",
  "logo": "assets/partners/146.png",
  "service": "Self Service",
  "weight": 13,
  "cash": 35,
  "maxBonuses": 1200,
  "condition": "За покупки на кассе",
  "untilDay": 30,
  "closingHour": 22,
  "source": ""
 }
];
const PARTNER_INFO = {
 "Вай мясо халяль": [
  "Кафе и рестораны",
  "Вай мясо халяль — кафе и рестораны в Москве.\nЗдесь можно остановиться на обед или выбрать что-нибудь с собой.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Наша Аптека": [
  "Аптека",
  "Наша Аптека — аптека.\nЛекарства, витамины и товары для ухода с возможностью заказа и бронирования онлайн.\nПодробнее об ассортименте и услугах можно узнать у партнёра.",
  "https://nasha-apteka.ru/"
 ],
 "Lamoda": [
  "Одежда, обувь и аксессуары",
  "Lamoda — одежда, обувь и аксессуары.\nОнлайн-площадка с одеждой, обувью и аксессуарами разных брендов и доставкой с примеркой.\nПодробнее об ассортименте и услугах можно узнать у партнёра.",
  "https://www.lamoda.ru/"
 ],
 "Наш трикотаж": [
  "Одежда и аксессуары",
  "Наш трикотаж — одежда и аксессуары в Москве.\nКамерный магазин для знакомства с ассортиментом и выбора вещей для своего гардероба.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Embody": [
  "Одежда и аксессуары",
  "Embody — одежда и аксессуары в Москве.\nКамерный магазин для знакомства с ассортиментом и выбора вещей для своего гардероба.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Шаурма Клаб": [
  "Кафе и рестораны",
  "Шаурма Клаб — кафе и рестораны в Москве.\nЗдесь можно остановиться на обед или выбрать что-нибудь с собой.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Место Бровисты": [
  "Красота и уход",
  "Место Бровисты — красота и уход в Москве.\nНебольшое пространство для ухода за собой и подбора привычных процедур.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Golden Green": [
  "Красота и уход",
  "Golden Green — красота и уход в Москве.\nНебольшое пространство для ухода за собой и подбора привычных процедур.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "4Hands": [
  "Красота и уход",
  "4Hands — красота и уход в Москве.\nНебольшое пространство для ухода за собой и подбора привычных процедур.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "DiezDent": [
  "Стоматология",
  "DiezDent — стоматология.\nСтоматологическая клиника: лечение зубов, имплантация, протезирование и исправление прикуса.\nПодробнее об ассортименте и услугах можно узнать у партнёра.",
  "https://diezdent.com/"
 ],
 "TopStyle": [
  "Красота и уход",
  "TopStyle — красота и уход в Москве.\nНебольшое пространство для ухода за собой и подбора привычных процедур.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "SelSovet": [
  "Дизайнерская одежда",
  "SelSovet — дизайнерская одежда.\nРоссийский бренд одежды с авторским взглядом на повседневный гардероб и ретроэстетику.\nПодробнее об ассортименте и услугах можно узнать у партнёра.",
  "https://selsovet.store/merch"
 ],
 "Super Volosy": [
  "Красота и уход",
  "Super Volosy — красота и уход в Москве.\nНебольшое пространство для ухода за собой и подбора привычных процедур.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Кофе": [
  "Кофейня",
  "Кофе — кофейня в Москве.\nМожно заглянуть за любимым напитком и сделать паузу среди городских дел.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Палитра вкусов": [
  "Кафе и рестораны",
  "Палитра вкусов — кафе и рестораны в Москве.\nЗдесь можно остановиться на обед или выбрать что-нибудь с собой.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Gloria Jeans": [
  "Одежда для всей семьи",
  "Gloria Jeans — одежда для всей семьи.\nОдежда, обувь и аксессуары для взрослых и детей, включая коллекции из денима.\nПодробнее об ассортименте и услугах можно узнать у партнёра.",
  "https://www.gloria-jeans.ru/"
 ],
 "MDC+": [
  "Медицинский центр",
  "MDC+ — медицинский центр в Москве.\nСпециалисты помогут сориентироваться в доступных услугах и записи на приём.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Сибирячка и Снегирь": [
  "Кафе и рестораны",
  "Сибирячка и Снегирь — кафе и рестораны в Москве.\nЗдесь можно остановиться на обед или выбрать что-нибудь с собой.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Seven Six": [
  "Теннисная одежда",
  "Seven Six — теннисная одежда.\nБренд экипировки для тенниса: одежда для тренировок и соревнований взрослых и детей.\nПодробнее об ассортименте и услугах можно узнать у партнёра.",
  "https://sevensix.sport/about/"
 ],
 "Особенный наполеон": [
  "Кафе и рестораны",
  "Особенный наполеон — кафе и рестораны в Москве.\nЗдесь можно остановиться на обед или выбрать что-нибудь с собой.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "МРТ Экспресс": [
  "Диагностический центр",
  "МРТ Экспресс — диагностический центр.\nЦентры магнитно-резонансной томографии для обследования разных областей тела.\nПодробнее об ассортименте и услугах можно узнать у партнёра.",
  "https://mrtexpress.ru/"
 ],
 "ВинЛаб": [
  "Магазин напитков",
  "ВинЛаб — магазин напитков.\nСеть магазинов алкогольных и безалкогольных напитков и сопутствующих товаров.\nПодробнее об ассортименте и услугах можно узнать у партнёра.",
  "https://corp.winelab.ru/ru/"
 ],
 "AMAZING RED": [
  "Спортивная одежда и обувь",
  "AMAZING RED — спортивная одежда и обувь.\nМультибрендовые магазины кроссовок, спортивной одежды и аксессуаров.\nПодробнее об ассортименте и услугах можно узнать у партнёра.",
  "https://amazingred.ru/"
 ],
 "PALAZZO DUCALE": [
  "Кафе и рестораны",
  "PALAZZO DUCALE — кафе и рестораны в Москве.\nЗдесь можно остановиться на обед или выбрать что-нибудь с собой.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Улыбка радуги": [
  "Косметика и товары для дома",
  "Улыбка радуги — косметика и товары для дома.\nСеть магазинов косметики, средств личной гигиены и товаров для ухода за домом.\nПодробнее об ассортименте и услугах можно узнать у партнёра.",
  "https://www.r-ulybka.ru/about/"
 ],
 "Оптика": [
  "Оптика",
  "Оптика — оптика в Москве.\nНебольшой салон, где можно познакомиться с ассортиментом оправ и аксессуаров.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Якитория": [
  "Японский ресторан",
  "Якитория — японский ресторан.\nКафе-рестораны японской кухни с суши, роллами, горячими блюдами и доставкой.\nПодробнее об ассортименте и услугах можно узнать у партнёра.",
  "https://yakitoriya.ru/"
 ],
 "DeLonghi": [
  "Техника для кухни",
  "DeLonghi — техника для кухни.\nКофемашины, кофеварки и техника для кухни, а также аксессуары для приготовления кофе.\nПодробнее об ассортименте и услугах можно узнать у партнёра.",
  "https://delonghi.ru/"
 ],
 "Uniq": [
  "Одежда и аксессуары",
  "Uniq — одежда и аксессуары в Москве.\nКамерный магазин для знакомства с ассортиментом и выбора вещей для своего гардероба.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Алиев Дентал": [
  "Стоматология",
  "Алиев Дентал — стоматология в Москве.\nЗдесь можно обсудить уход за зубами и подобрать подходящие услуги.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Точка красоты": [
  "Красота и уход",
  "Точка красоты — красота и уход в Москве.\nНебольшое пространство для ухода за собой и подбора привычных процедур.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Магазин «Биджин»": [
  "Одежда и аксессуары",
  "Магазин «Биджин» — одежда и аксессуары в Москве.\nКамерный магазин для знакомства с ассортиментом и выбора вещей для своего гардероба.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Taper-1": [
  "Красота и уход",
  "Taper-1 — красота и уход в Москве.\nНебольшое пространство для ухода за собой и подбора привычных процедур.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Garnet Clinik": [
  "Кафе и рестораны",
  "Garnet Clinik — кафе и рестораны в Москве.\nЗдесь можно остановиться на обед или выбрать что-нибудь с собой.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Арсенал": [
  "Инструменты",
  "Арсенал — инструменты.\nРучные инструменты и наборы для ремонта, обслуживания автомобиля и работы в мастерской.\nПодробнее об ассортименте и услугах можно узнать у партнёра.",
  "https://www.arsenaltools.ru/"
 ],
 "Womenpoint": [
  "Одежда и аксессуары",
  "Womenpoint — одежда и аксессуары в Москве.\nКамерный магазин для знакомства с ассортиментом и выбора вещей для своего гардероба.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Mono Beauty Moscow": [
  "Красота и уход",
  "Mono Beauty Moscow — красота и уход в Москве.\nНебольшое пространство для ухода за собой и подбора привычных процедур.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Bogdanova_pmu": [
  "Красота и уход",
  "Bogdanova_pmu — красота и уход в Москве.\nНебольшое пространство для ухода за собой и подбора привычных процедур.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Много лосося": [
  "Суши и роллы с доставкой",
  "Много лосося — суши и роллы с доставкой.\nСервис приготовления и доставки суши, роллов и других блюд японской кухни.\nПодробнее об ассортименте и услугах можно узнать у партнёра.",
  "https://mnogolososya.ru/"
 ],
 "Горлаб": [
  "Медицинская лаборатория",
  "Горлаб — медицинская лаборатория.\nСеть медицинских лабораторий: анализы, диагностические исследования и медицинские услуги.\nПодробнее об ассортименте и услугах можно узнать у партнёра.",
  "https://gorlab.ru/moskva/"
 ],
 "Мио массаж": [
  "Красота и уход",
  "Мио массаж — красота и уход в Москве.\nНебольшое пространство для ухода за собой и подбора привычных процедур.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Шаурмастер": [
  "Кафе и рестораны",
  "Шаурмастер — кафе и рестораны в Москве.\nЗдесь можно остановиться на обед или выбрать что-нибудь с собой.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Botinelli": [
  "Одежда и аксессуары",
  "Botinelli — одежда и аксессуары в Москве.\nКамерный магазин для знакомства с ассортиментом и выбора вещей для своего гардероба.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Amber": [
  "Красота и уход",
  "Amber — красота и уход в Москве.\nНебольшое пространство для ухода за собой и подбора привычных процедур.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Кыргызстан": [
  "Продукты",
  "Кыргызстан — продукты в Москве.\nМагазин у дома с продуктами для повседневных покупок.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "РИВ ГОШ": [
  "Парфюмерия и косметика",
  "РИВ ГОШ — парфюмерия и косметика.\nМагазины парфюмерии, декоративной косметики и средств для ухода за лицом, телом и волосами.\nПодробнее об ассортименте и услугах можно узнать у партнёра.",
  "https://rivegauche.ru/"
 ],
 "СПА Сиам": [
  "Тайский массаж и СПА",
  "СПА Сиам — тайский массаж и спа.\nСалоны традиционного тайского и балийского массажа, СПА-ритуалов и программ для двоих.\nПодробнее об ассортименте и услугах можно узнать у партнёра.",
  "https://spasiam.ru/"
 ],
 "Ясно": [
  "Онлайн-консультации психолога",
  "Ясно — онлайн-консультации психолога.\nСервис подбора психолога и индивидуальных или парных консультаций по видеосвязи.\nПодробнее об ассортименте и услугах можно узнать у партнёра.",
  "https://yasno.live/"
 ],
 "Clean Clinic": [
  "Медицинский центр",
  "Clean Clinic — медицинский центр в Москве.\nСпециалисты помогут сориентироваться в доступных услугах и записи на приём.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Аптека 36,6": [
  "Аптека",
  "Аптека 36,6 — аптека.\nАптечная сеть с лекарствами, витаминами, косметикой и медицинскими изделиями.\nПодробнее об ассортименте и услугах можно узнать у партнёра.",
  "https://366.ru/"
 ],
 "PROBIVNOY": [
  "Кожаные сумки и аксессуары",
  "PROBIVNOY — кожаные сумки и аксессуары.\nРоссийский бренд сумок и аксессуаров из натуральной кожи.\nПодробнее об ассортименте и услугах можно узнать у партнёра.",
  "https://probivnoyofficial.ru/about"
 ],
 "Даниэль": [
  "Детская одежда и обувь",
  "Даниэль — детская одежда и обувь.\nСеть бутиков с коллекциями детской одежды, обуви и аксессуаров мировых брендов.\nПодробнее об ассортименте и услугах можно узнать у партнёра.",
  "https://danielonline.ru/about_us/"
 ],
 "Тануки": [
  "Японский ресторан",
  "Тануки — японский ресторан.\nСеть ресторанов японской кухни с суши, роллами, горячими блюдами и доставкой.\nПодробнее об ассортименте и услугах можно узнать у партнёра.",
  "https://www.tanuki.ru/"
 ],
 "Психолог Иванова": [
  "Кафе и рестораны",
  "Психолог Иванова — кафе и рестораны в Москве.\nЗдесь можно остановиться на обед или выбрать что-нибудь с собой.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Русская Икра Плюс": [
  "Продукты",
  "Русская Икра Плюс — продукты в Москве.\nМагазин у дома с продуктами для повседневных покупок.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Мода Италии": [
  "Одежда и аксессуары",
  "Мода Италии — одежда и аксессуары в Москве.\nКамерный магазин для знакомства с ассортиментом и выбора вещей для своего гардероба.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Kitfort": [
  "Бытовая техника",
  "Kitfort — бытовая техника.\nРоссийский бренд техники для кухни, уборки, ухода за домом и собой.\nПодробнее об ассортименте и услугах можно узнать у партнёра.",
  "https://kitfort.ru/"
 ],
 "Ажиотаж": [
  "Кафе и рестораны",
  "Ажиотаж — кафе и рестораны в Москве.\nЗдесь можно остановиться на обед или выбрать что-нибудь с собой.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Цветалета": [
  "Кафе и рестораны",
  "Цветалета — кафе и рестораны в Москве.\nЗдесь можно остановиться на обед или выбрать что-нибудь с собой.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Pigment Club": [
  "Красота и уход",
  "Pigment Club — красота и уход в Москве.\nНебольшое пространство для ухода за собой и подбора привычных процедур.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Кристалл проф": [
  "Кафе и рестораны",
  "Кристалл проф — кафе и рестораны в Москве.\nЗдесь можно остановиться на обед или выбрать что-нибудь с собой.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Салон красоты Roby": [
  "Красота и уход",
  "Салон красоты Roby — красота и уход в Москве.\nНебольшое пространство для ухода за собой и подбора привычных процедур.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Твой Кейтеринг": [
  "Кафе и рестораны",
  "Твой Кейтеринг — кафе и рестораны в Москве.\nЗдесь можно остановиться на обед или выбрать что-нибудь с собой.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Полако": [
  "Кафе и рестораны",
  "Полако — кафе и рестораны в Москве.\nЗдесь можно остановиться на обед или выбрать что-нибудь с собой.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Zolla": [
  "Одежда и аксессуары",
  "Zolla — бренд повседневной одежды для женщин и мужчин.\nВ коллекциях есть базовые вещи и сезонные модели.\nОдежду дополняют аксессуары для разных повседневных образов.",
  "https://zolla.com/about/"
 ],
 "Трит": [
  "Кафе и рестораны",
  "Трит — кафе и рестораны в Москве.\nЗдесь можно остановиться на обед или выбрать что-нибудь с собой.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Бондимания": [
  "Кофейня",
  "Бондимания — кофейня в Москве.\nМожно заглянуть за любимым напитком и сделать паузу среди городских дел.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "MoreKoT": [
  "Кофейня",
  "MoreKoT — кофейня в Москве.\nМожно заглянуть за любимым напитком и сделать паузу среди городских дел.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Амрита": [
  "Медицинский центр",
  "Амрита — медицинский центр в Москве.\nСпециалисты помогут сориентироваться в доступных услугах и записи на приём.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Зубной Дом": [
  "Кафе и рестораны",
  "Зубной Дом — кафе и рестораны в Москве.\nЗдесь можно остановиться на обед или выбрать что-нибудь с собой.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Westmed": [
  "Кафе и рестораны",
  "Westmed — кафе и рестораны в Москве.\nЗдесь можно остановиться на обед или выбрать что-нибудь с собой.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Спортмастер": [
  "Спортивные товары",
  "Спортмастер — спортивные товары.\nСеть магазинов спортивной одежды, обуви, тренажёров и снаряжения для активного отдыха.\nПодробнее об ассортименте и услугах можно узнать у партнёра.",
  "https://www.sportmaster.ru/"
 ],
 "Да Винчи": [
  "Кафе и рестораны",
  "Да Винчи — кафе и рестораны в Москве.\nЗдесь можно остановиться на обед или выбрать что-нибудь с собой.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "SKILL BIKE": [
  "Велосипеды",
  "SKILL BIKE — велосипеды.\nПроизводитель городских, горных, складных и детских велосипедов и беговелов.\nПодробнее об ассортименте и услугах можно узнать у партнёра.",
  "https://skill-bike.ru/company/"
 ],
 "Барбершоп": [
  "Красота и уход",
  "Барбершоп — красота и уход в Москве.\nНебольшое пространство для ухода за собой и подбора привычных процедур.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Ed Beauty": [
  "Красота и уход",
  "Ed Beauty — красота и уход в Москве.\nНебольшое пространство для ухода за собой и подбора привычных процедур.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Yamaguchi": [
  "Массажное оборудование",
  "Yamaguchi — массажное оборудование.\nМассажные кресла, массажёры и оборудование для домашнего отдыха и ухода за собой.\nПодробнее об ассортименте и услугах можно узнать у партнёра.",
  "https://www.yamaguchi.ru/"
 ],
 "Магазин Sorochka.pro": [
  "Одежда и аксессуары",
  "Магазин Sorochka.pro — одежда и аксессуары в Москве.\nКамерный магазин для знакомства с ассортиментом и выбора вещей для своего гардероба.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "NO ONE": [
  "Обувь и аксессуары",
  "NO ONE — обувь и аксессуары.\nМультибрендовые бутики обуви, сумок и аксессуаров.\nПодробнее об ассортименте и услугах можно узнать у партнёра.",
  "https://www.noone.ru/"
 ],
 "SJ": [
  "Одежда и аксессуары",
  "SJ — одежда и аксессуары в Москве.\nКамерный магазин для знакомства с ассортиментом и выбора вещей для своего гардероба.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Салон нижнего белья Vasilissa": [
  "Одежда и аксессуары",
  "Салон нижнего белья Vasilissa — одежда и аксессуары в Москве.\nКамерный магазин для знакомства с ассортиментом и выбора вещей для своего гардероба.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Гастроном": [
  "Продукты",
  "Гастроном — продукты в Москве.\nМагазин у дома с продуктами для повседневных покупок.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Moulinex": [
  "Техника для кухни",
  "Moulinex — техника для кухни.\nТехника для приготовления пищи и напитков: блендеры, мясорубки, хлебопечки и другие приборы.\nПодробнее об ассортименте и услугах можно узнать у партнёра.",
  "https://moulinex.ru/"
 ],
 "Cave": [
  "Повседневная одежда",
  "Cave — повседневная одежда.\nРоссийский бренд повседневной одежды, основу коллекций которого составляют комбинезоны.\nПодробнее об ассортименте и услугах можно узнать у партнёра.",
  "https://the-cave.ru/content/faq/"
 ],
 "Сити Стайл": [
  "Кафе и рестораны",
  "Сити Стайл — кафе и рестораны в Москве.\nЗдесь можно остановиться на обед или выбрать что-нибудь с собой.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Аптека Ригла": [
  "Аптека",
  "Аптека Ригла — аптека.\nАптечная сеть с лекарствами, средствами гигиены, косметикой и товарами для здоровья.\nПодробнее об ассортименте и услугах можно узнать у партнёра.",
  "https://www.rigla.ru/"
 ],
 "Лаки Ю": [
  "Студия красоты",
  "Лаки Ю — студия красоты.\nСтудия маникюра, педикюра, ухода за волосами и оформления бровей.\nПодробнее об ассортименте и услугах можно узнать у партнёра.",
  "https://luckyyounails.com/"
 ],
 "Шёлк": [
  "Кафе и рестораны",
  "Шёлк — кафе и рестораны в Москве.\nЗдесь можно остановиться на обед или выбрать что-нибудь с собой.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "SKIN EXPERT": [
  "Косметологическая клиника",
  "SKIN EXPERT — косметологическая клиника.\nКлиника эстетической косметологии с процедурами для ухода за лицом и телом.\nПодробнее об ассортименте и услугах можно узнать у партнёра.",
  "https://skinexpertmsc.ru/"
 ],
 "SK": [
  "Красота и уход",
  "SK — красота и уход в Москве.\nНебольшое пространство для ухода за собой и подбора привычных процедур.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Магазин женской одежды": [
  "Одежда и аксессуары",
  "Магазин женской одежды — одежда и аксессуары в Москве.\nКамерный магазин для знакомства с ассортиментом и выбора вещей для своего гардероба.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Луч": [
  "Красота и уход",
  "Луч — красота и уход в Москве.\nНебольшое пространство для ухода за собой и подбора привычных процедур.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "INVITRO": [
  "Медицинская лаборатория",
  "INVITRO — медицинская лаборатория.\nМедицинская компания с лабораторными анализами и диагностическими исследованиями.\nПодробнее об ассортименте и услугах можно узнать у партнёра.",
  "https://www.invitro.ru/"
 ],
 "Eazyway": [
  "Спортивная одежда",
  "Eazyway — спортивная одежда.\nБренд одежды для тренировок и повседневной жизни с мужскими и женскими коллекциями.\nПодробнее об ассортименте и услугах можно узнать у партнёра.",
  "https://www.eazy-way.com/"
 ],
 "Гемотест": [
  "Медицинская лаборатория",
  "Гемотест — медицинская лаборатория.\nСеть лабораторий для медицинских анализов, диагностики и проверки состояния здоровья.\nПодробнее об ассортименте и услугах можно узнать у партнёра.",
  "https://gemotest.ru/"
 ],
 "Хочу Шаурму": [
  "Кафе и рестораны",
  "Хочу Шаурму — кафе и рестораны в Москве.\nЗдесь можно остановиться на обед или выбрать что-нибудь с собой.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Барбершоп Zyo": [
  "Красота и уход",
  "Барбершоп Zyo — красота и уход в Москве.\nНебольшое пространство для ухода за собой и подбора привычных процедур.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Эльдорадо": [
  "Электроника и бытовая техника",
  "Эльдорадо — сеть магазинов электроники и бытовой техники.\nВ ассортименте представлены товары для кухни, дома и развлечений.\nПокупателям доступны устройства и аксессуары разных производителей.",
  "https://www.mvideoeldorado.ru/ru/about-us/our-brands"
 ],
 "Магазин Белла": [
  "Одежда и аксессуары",
  "Магазин Белла — одежда и аксессуары в Москве.\nКамерный магазин для знакомства с ассортиментом и выбора вещей для своего гардероба.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Шаурмен": [
  "Кафе и рестораны",
  "Шаурмен — кафе и рестораны в Москве.\nЗдесь можно остановиться на обед или выбрать что-нибудь с собой.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Престиж": [
  "Кафе и рестораны",
  "Престиж — кафе и рестораны в Москве.\nЗдесь можно остановиться на обед или выбрать что-нибудь с собой.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "М.Косметик": [
  "Косметика и товары для дома",
  "М.Косметик — сеть магазинов косметики, парфюмерии и товаров для ухода.\nОна входит в группу компаний «Магнит».\nАссортимент объединяет средства для красоты, личной гигиены и ухода за домом.",
  "https://www.magnit.com/ru/"
 ],
 "Магия масел": [
  "Продукты",
  "Магия масел — продукты в Москве.\nМагазин у дома с продуктами для повседневных покупок.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Кофе с собой": [
  "Кофейня",
  "Кофе с собой — кофейня в Москве.\nМожно заглянуть за любимым напитком и сделать паузу среди городских дел.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "ШАУROOM": [
  "Кафе и рестораны",
  "ШАУROOM — кафе и рестораны в Москве.\nЗдесь можно остановиться на обед или выбрать что-нибудь с собой.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Фитомаркет": [
  "Товары для здоровья",
  "Фитомаркет — товары для здоровья.\nМагазин витаминов, косметики, спортивного и здорового питания от компании «Эвалар».\nПодробнее об ассортименте и услугах можно узнать у партнёра.",
  "https://fitomarket.ru/"
 ],
 "Shaurma City": [
  "Кафе и рестораны",
  "Shaurma City — кафе и рестораны в Москве.\nЗдесь можно остановиться на обед или выбрать что-нибудь с собой.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "ZiZi Dent": [
  "Стоматология",
  "ZiZi Dent — стоматология в Москве.\nЗдесь можно обсудить уход за зубами и подобрать подходящие услуги.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Лаву": [
  "Кафе и рестораны",
  "Лаву — кафе и рестораны в Москве.\nЗдесь можно остановиться на обед или выбрать что-нибудь с собой.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Taper": [
  "Красота и уход",
  "Taper — красота и уход в Москве.\nНебольшое пространство для ухода за собой и подбора привычных процедур.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "NEYROX": [
  "Носимые устройства",
  "NEYROX — носимые устройства.\nБренд нейротрекера для отслеживания показателей организма, восстановления и повседневной активности.\nПодробнее об ассортименте и услугах можно узнать у партнёра.",
  "https://neyrox.com/"
 ],
 "London Lashes": [
  "Красота и уход",
  "London Lashes — красота и уход в Москве.\nНебольшое пространство для ухода за собой и подбора привычных процедур.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "ТиО": [
  "Кафе и рестораны",
  "ТиО — кафе и рестораны в Москве.\nЗдесь можно остановиться на обед или выбрать что-нибудь с собой.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "All in Beauty": [
  "Красота и уход",
  "All in Beauty — красота и уход в Москве.\nНебольшое пространство для ухода за собой и подбора привычных процедур.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Добрый Доктор": [
  "Медицинский центр",
  "Добрый Доктор — медицинский центр в Москве.\nСпециалисты помогут сориентироваться в доступных услугах и записи на приём.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Стоматология": [
  "Стоматология",
  "Стоматология — стоматология в Москве.\nЗдесь можно обсудить уход за зубами и подобрать подходящие услуги.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "МТС": [
  "Связь и электроника",
  "МТС — оператор связи и экосистема цифровых сервисов.\nКомпания предлагает мобильную связь и домашний интернет.\nВ розничных салонах представлены смартфоны и аксессуары.",
  "https://moskva.mts.ru/personal"
 ],
 "ViKing": [
  "Красота и уход",
  "ViKing — красота и уход в Москве.\nНебольшое пространство для ухода за собой и подбора привычных процедур.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Чайная «Тифрейм»": [
  "Кафе и рестораны",
  "Чайная «Тифрейм» — кафе и рестораны в Москве.\nЗдесь можно остановиться на обед или выбрать что-нибудь с собой.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Твоя pizza": [
  "Пицца с доставкой",
  "Твоя pizza — пицца с доставкой.\nБренд доставки пиццы от TanukiFamily с разными начинками и закусками.\nПодробнее об ассортименте и услугах можно узнать у партнёра.",
  "https://tanukifamily.ru/"
 ],
 "Центр эпиляции": [
  "Красота и уход",
  "Центр эпиляции — красота и уход в Москве.\nНебольшое пространство для ухода за собой и подбора привычных процедур.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Orso Bianco": [
  "Детская верхняя одежда",
  "Orso Bianco — детская верхняя одежда.\nРоссийский бренд детской верхней одежды и аксессуаров от производителя ARTEL.\nПодробнее об ассортименте и услугах можно узнать у партнёра.",
  "https://orsobianco.ru/o-nas/"
 ],
 "Tom Tailor": [
  "Повседневная одежда",
  "Tom Tailor — повседневная одежда.\nНемецкий бренд повседневной одежды и аксессуаров для женского и мужского гардероба.\nПодробнее об ассортименте и услугах можно узнать у партнёра.",
  "https://tom-tailor.ru/"
 ],
 "Cream": [
  "Одежда и аксессуары",
  "Cream — одежда и аксессуары в Москве.\nКамерный магазин для знакомства с ассортиментом и выбора вещей для своего гардероба.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Азиатские продукты": [
  "Продукты",
  "Азиатские продукты — продукты в Москве.\nМагазин у дома с продуктами для повседневных покупок.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Манч": [
  "Кафе и рестораны",
  "Манч — кафе и рестораны в Москве.\nЗдесь можно остановиться на обед или выбрать что-нибудь с собой.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Лор центр": [
  "Медицинский центр",
  "Лор центр — медицинский центр в Москве.\nСпециалисты помогут сориентироваться в доступных услугах и записи на приём.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Твой образ": [
  "Одежда и аксессуары",
  "Твой образ — одежда и аксессуары в Москве.\nКамерный магазин для знакомства с ассортиментом и выбора вещей для своего гардероба.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Трапезная": [
  "Кафе и рестораны",
  "Трапезная — кафе и рестораны в Москве.\nЗдесь можно остановиться на обед или выбрать что-нибудь с собой.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Extendess": [
  "Салон красоты",
  "Extendess — салон красоты.\nПространство красоты с парикмахерскими услугами, ногтевым сервисом, косметологией и wellness-практиками.\nПодробнее об ассортименте и услугах можно узнать у партнёра.",
  "https://extendess.ru/about/"
 ],
 "PIZHON": [
  "Мужская одежда и обувь",
  "PIZHON — мужская одежда и обувь.\nБренд мужской одежды, обуви и аксессуаров с собственной розничной сетью.\nПодробнее об ассортименте и услугах можно узнать у партнёра.",
  "https://pizhon-store.ru/struktura-brenda-pizhon.html"
 ],
 "Пироги №1": [
  "Пекарня с доставкой",
  "Пироги №1 — пекарня с доставкой.\nПекарня осетинских пирогов с разными начинками, доставкой и самовывозом.\nПодробнее об ассортименте и услугах можно узнать у партнёра.",
  "https://piroginomerodin.ru/"
 ],
 "Aravia": [
  "Косметика для ухода",
  "Aravia — косметика для ухода.\nРоссийский производитель профессиональной косметики и средств для домашнего ухода.\nПодробнее об ассортименте и услугах можно узнать у партнёра.",
  "https://aravia.ru/"
 ],
 "Modny Look": [
  "Кафе и рестораны",
  "Modny Look — кафе и рестораны в Москве.\nЗдесь можно остановиться на обед или выбрать что-нибудь с собой.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Котокафе": [
  "Кофейня",
  "Котокафе — кофейня в Москве.\nМожно заглянуть за любимым напитком и сделать паузу среди городских дел.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Косметология": [
  "Красота и уход",
  "Косметология — красота и уход в Москве.\nНебольшое пространство для ухода за собой и подбора привычных процедур.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Штолле": [
  "Пироговые с доставкой",
  "Штолле — пироговые с доставкой.\nПироговые со свежей домашней выпечкой по старинным рецептам.\nПодробнее об ассортименте и услугах можно узнать у партнёра.",
  "https://stolle.ru/"
 ],
 "Студия перманента": [
  "Кафе и рестораны",
  "Студия перманента — кафе и рестораны в Москве.\nЗдесь можно остановиться на обед или выбрать что-нибудь с собой.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Redmond": [
  "Бытовая техника",
  "Redmond — бытовая техника.\nТехника для кухни и дома: мультиварки, грили, чайники и другие приборы.\nПодробнее об ассортименте и услугах можно узнать у партнёра.",
  "https://redmond.company/"
 ],
 "Массажист Виктория": [
  "Красота и уход",
  "Массажист Виктория — красота и уход в Москве.\nНебольшое пространство для ухода за собой и подбора привычных процедур.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Braun": [
  "Бытовая техника",
  "Braun — бытовая техника.\nБытовая техника для приготовления еды и ухода за одеждой: блендеры, утюги и парогенераторы.\nПодробнее об ассортименте и услугах можно узнать у партнёра.",
  "https://braunhousehold.ru/"
 ],
 "Стоун-Дент": [
  "Стоматология",
  "Стоун-Дент — стоматология в Москве.\nЗдесь можно обсудить уход за зубами и подобрать подходящие услуги.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Евродицентр": [
  "Кафе и рестораны",
  "Евродицентр — кафе и рестораны в Москве.\nЗдесь можно остановиться на обед или выбрать что-нибудь с собой.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Ателье": [
  "Одежда и аксессуары",
  "Ателье — одежда и аксессуары в Москве.\nКамерный магазин для знакомства с ассортиментом и выбора вещей для своего гардероба.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Семейная парикмахерская": [
  "Красота и уход",
  "Семейная парикмахерская — красота и уход в Москве.\nНебольшое пространство для ухода за собой и подбора привычных процедур.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Homie Coffie": [
  "Кофейня",
  "Homie Coffie — кофейня в Москве.\nМожно заглянуть за любимым напитком и сделать паузу среди городских дел.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ],
 "Bon Appartament": [
  "Одежда и аксессуары",
  "Bon Appartament — одежда и аксессуары в Москве.\nКамерный магазин для знакомства с ассортиментом и выбора вещей для своего гардероба.\nУточнить ассортимент и задать вопросы можно при посещении.",
  ""
 ]
};
