## Веб-додаток для моніторингу криптовалют

Цей веб-додаток використовує API Сoinranking для отримання даних про криптовалюти та відображення їх на сторінці у вигляді карток. Кожна картка містить основну інформацію про монету, таку як:

- Назва монети
- Символ
- Поточна остання ціна
- Ринкова капіталізація

# Функціональні можливості:

Перегляд карток монет: Додаток завантажує дані про 10 монет з Сoinranking з найбільшою капіталізацією та відображає їх на сторінці.

Для детальної інформації викроистовується про монету API Binance (binance-api-node) : При натисканні на картку монети користувач перенаправляється на нову сторінку, де відображається детальна інформація про цю монету, включаючи:

- Історичну ціну відносно до USDT (за 1 день, 1 неділю, 1 місяць від поточної дати)
- Є кнопки перемикання виду графіків лінийни(line) чи свічник(candlestick)
- На графіку історичної ціни виводиться рандомні сигнали 2 покупки (buy) - стрілка вверї, та 2 продажу(sell) - стрілка донизу
- Онлайн ціну відносно до USDT з вебсокету Binance

## Технології:

- Веб-фреймворк: NextJS
- Мова програмування: typescrip
- Cтилізація: TailwindCSS
- Тестування: Jest
- API: Сoinranking, Binance
- Бібліотеки: React-apexcharts, Swr;

## GitHub: [URL GitHub](https://github.com/DimaDzh/crypto-charts-test)

# Домашня сторінка

![Домашня сторінка](/public/home-page1.png)

# Сторінка монети графік історичної ціни

![Сторінка монети графік історичної ціни](/public/coinpage1.png)

# Сторінка монети графік ціни в реальному часі

![Сторінка монети графік ціни в реальному часі](/public/coinpage2.png)

# Сторінка обробки помилки якщо немає данних про співвідношення ціни монети до USDT

![Сторінка монети графік ціни в реальному часі](/public/error-page.png)

## Web application for monitoring cryptocurrencies

This web application uses the Coinranking API to retrieve data about cryptocurrencies and display them on the page in the form of cards. Each card contains basic information about the coin, such as

- Coin name
- Symbol
- Current last price
- Market capitalization.

# Functional features:

View coin cards: The app downloads data about 10 coins from Coinranking with the largest capitalization and displays them on the page.

For detailed information, you can use the Binance API (binance-api-node): When clicking on a coin card, the user is redirected to a new page that displays detailed information about that coin, including:

- Historical price against USDT (for 1 day, 1 Sunday, 1 month from the current date)
- There are buttons for switching the type of graphs: line or candlestick
- The historical price chart displays random signals: 2 buy signals - an upward arrow, and 2 sell signals - a downward arrow
- Online price against USDT from the Binance web-socket

## Technology:

- Web framework: NextJS
- Programming language: typescrip
- Styling: TailwindCSS
- Testing: Jest
- API: Coinranking, Binance
- Libraries: React-apexcharts, Swr;

## GitHub: [GitHub URL](https://github.com/DimaDzh/crypto-charts-test)

# Home page

![Home page](/public/home-page1.png)

# Coin page historical price chart

![Coin page historical price chart](/public/coinpage1.png)

# Coin page price chart in real time

![Coin page with real-time price chart](/public/coinpage2.png)

# Error handling page if there is no data on the ratio of the coin price to USDT

![Coin page with real-time price chart](/public/error-page.png)
