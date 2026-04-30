---
id: "9tnr4h10f1"
title: "Общие сведения о B2B Enterprise"
category: "Общие сведения B2B-системы"
cover: "/wiki/tech/obshchie-svedeniya-o-b2b-enterprise/cover.webp"
---
#### Backend

-   PHP 8.2 (Yii2)
-   Elasticsearch - полнотекстовый поиск
-   MySQL - основная БД, шлюзовые таблицы
-   Redis - кеширование
-   Nginx - веб-сервер
-   Сервис для генерации PDF - NodeJS

#### Frontend

-   React
-   Remix

#### API документация

[https://export-enterprise.b2b.api.docs.3davinci.ru/#/](https://export-enterprise.b2b.api.docs.3davinci.ru/#/)

#### Сервер

-   российский сервер, находится в датацентре Selectel, в Москве.
-   Processor Intel(R) Xeon(R) CPU E3-1230 v6 @ 3.50GHz
-   Processor Architecture x86\_64
-   Number of cores 8
-   Memory 32 Гб
-   OS Release Debian GNU/Linux 9.1 (stretch)
-   Монолит

> [!CALLOUT color=#d30000]
> Минимальные требования к серверу, если вы захотите разместить B2B Enterprise на ваших собственных мощностях:  
> 
> -   Processor Architecture x86\_64
> -   Number of cores 4
> -   Memory 8 Гб
> -   Disc 30 Гб
> -   OS Release Debian GNU/Linux
