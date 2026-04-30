---
id: "nrhf6j2k11"
title: "Описание полей шлюзовых таблиц"
category: "Интеграция с шлюзовыми таблицами (ШТ)"
cover: "/wiki/tech/opisanie-poley-shlyuzovykh-tablits/cover.webp"
---
#### address - адреса компаний

![](/wiki/tech/opisanie-poley-shlyuzovykh-tablits/01.webp)



#### brand - бренды

![](/wiki/tech/opisanie-poley-shlyuzovykh-tablits/02.webp)

> [!CALLOUT color=#d30000]
> Имеется возможность редактирования из административного интерфейса. При синхронизации, изменения, внесенные из административного интерфейса, **заменяются(!)** данными из шлюзовых таблиц.



#### catalog\_section - разделы каталога

![](/wiki/tech/opisanie-poley-shlyuzovykh-tablits/03.webp)



#### certificate - сертификаты

![](/wiki/tech/opisanie-poley-shlyuzovykh-tablits/04.webp)



#### company - компании

![](/wiki/tech/opisanie-poley-shlyuzovykh-tablits/05.webp)



#### company\_additional\_field - дополнительные поля для компаний

![](/wiki/tech/opisanie-poley-shlyuzovykh-tablits/06.webp)



#### company\_manager\_relation - связь компания-менеджер

![](/wiki/tech/opisanie-poley-shlyuzovykh-tablits/07.webp)



#### company\_segment\_relation - связь компания-сегмент

![](/wiki/tech/opisanie-poley-shlyuzovykh-tablits/08.webp)



#### contract\_price - цены по контракту (скидки для компаний)

![](/wiki/tech/opisanie-poley-shlyuzovykh-tablits/09.webp)

> [!CALLOUT color=#d30000]
> **Если brand\_id, category\_ids и price\_group\_ids оставить NULL, то скидка будет распространяться на ВСЕ товары.**  
>   
> ПО УМОЛЧАНИЮ. Если на один товар задано несколько скидок, то клиент увидит цену с наибольшей скидкой, самую выгодную для него.

> [!CALLOUT color=#0ba300]
> Этот алгоритм ценообразования может быть изменен по вашему сценарию.



#### currency - валюты

![](/wiki/tech/opisanie-poley-shlyuzovykh-tablits/10.webp)



#### deleted\_product - удаленные товары

![](/wiki/tech/opisanie-poley-shlyuzovykh-tablits/11.webp)

> [!CALLOUT color=#d30000]
> Таблица заполняется автоматически при удалении строк из таблицы product



#### delivery\_period - информация о сроках поставки товаров в регионы

![](/wiki/tech/opisanie-poley-shlyuzovykh-tablits/12.webp)



#### delivery\_point - адреса доставки

![](/wiki/tech/opisanie-poley-shlyuzovykh-tablits/13.webp)

> [!CALLOUT color=#d30000]
> Список адресов доставки доступных для компании. Адреса доставки могут создаваться и удаляться(опционально) непосредственно пользователями системы.



#### delivery\_schedule - график доставки

![](/wiki/tech/opisanie-poley-shlyuzovykh-tablits/14.webp)



#### document - документы

![](/wiki/tech/opisanie-poley-shlyuzovykh-tablits/15.webp)



#### document\_additional\_field - дополнительные поля для документов

![](/wiki/tech/opisanie-poley-shlyuzovykh-tablits/16.webp)



#### document\_item - товары в документе

![](/wiki/tech/opisanie-poley-shlyuzovykh-tablits/17.webp)



#### document\_custom\_item - товары от покупателя в документе

![](/wiki/tech/opisanie-poley-shlyuzovykh-tablits/18.webp)



#### document\_status - предустановленные статусы документов

![](/wiki/tech/opisanie-poley-shlyuzovykh-tablits/19.webp)



#### document\_type - типы документов

![](/wiki/tech/opisanie-poley-shlyuzovykh-tablits/20.webp)



#### external\_link\_type - типы внешних ссылок для товаров

![](/wiki/tech/opisanie-poley-shlyuzovykh-tablits/21.webp)



#### feature - свойства товаров

![](/wiki/tech/opisanie-poley-shlyuzovykh-tablits/22.webp)



#### gallery - галерея изображений

![](/wiki/tech/opisanie-poley-shlyuzovykh-tablits/23.webp)



#### legal\_entity - юридические лица компаний

![](/wiki/tech/opisanie-poley-shlyuzovykh-tablits/24.webp)

> [!CALLOUT color=#7b7b7b]
> В таблице хранятся наименования и реквизиты юридических лиц. Эти данные используются при формировании документов.



#### manager - менеджеры

![](/wiki/tech/opisanie-poley-shlyuzovykh-tablits/25.webp)

> [!CALLOUT color=#d30000]
> В ШТ "manager" пользователь попадает, когда ему назначают роль "Менеджер", кроме того, у этого пользователя обязательно должен быть номер телефона.  
>   
> Если пользователю сменили роль с клиента на менеджер, то он попадает в шт manager ( и соответственно, его уже можно привязывать к компании как менеджера через шт company\_manager\_relation)

> [!CALLOUT color=#d30000]
> Обращаем внимание на необходимость правильного заполнения поля phone, так как номер телефона имеет строковый формат и используется для поиска соответствующего пользователя системы.



#### merchant - продавцы

![](/wiki/tech/opisanie-poley-shlyuzovykh-tablits/26.webp)

> [!CALLOUT color=#d30000]
> Для записи информации о компаниях (филиалах) продавцах продукции.  
> В административном интерфейсе есть возможность создания и редактирования. При синхронизации со шлюзовыми таблицами ведется поиск по полю id.  
>   
> ВНИМАНИЕ данные в административном интерфейсе заменяются данными из ШТ.

> [!CALLOUT color=#9da88b]
> Опционально! Если в вашей в2в системе есть другие продавцы, кроме вас, то вносить их в шт необходимо так:  
> При выгрузке прописать в своих товарах в шт нового продавца в ШТ product,  
> поле merchant\_id  
> значение merchant\_id брать из ШТ merchant поле id  
> Тогда продавец появится в фильтре



#### order - заказы

![](/wiki/tech/opisanie-poley-shlyuzovykh-tablits/27.webp)



#### order\_additional\_field - дополнительные поля для заказов

![](/wiki/tech/opisanie-poley-shlyuzovykh-tablits/28.webp)



#### order\_meta - дополнительная информация к заказу

![](/wiki/tech/opisanie-poley-shlyuzovykh-tablits/29.webp)



#### order\_item - товары в заказе

![](/wiki/tech/opisanie-poley-shlyuzovykh-tablits/30.webp)



#### order\_status - статусы заказов

![](/wiki/tech/opisanie-poley-shlyuzovykh-tablits/31.webp)



#### payment\_company - график платежей компаний

![](/wiki/tech/opisanie-poley-shlyuzovykh-tablits/32.webp)

> [!CALLOUT color=#d30000]
> В таблице хранятся данные информационного характера, т.е. информация о предстоящих и просроченных платежах для компании по заказам. Может быть привязана к документу в системе через поле document\_id. Является расшифровкой значений дебиторской задолженности и просроченной дебиторской задолженности в компании, но никак не связана(не влияет) на них.



#### pickup\_point - адреса самовывоза

![](/wiki/tech/opisanie-poley-shlyuzovykh-tablits/33.webp)



#### price - цены

![](/wiki/tech/opisanie-poley-shlyuzovykh-tablits/34.webp)



#### price\_type - типы цен

![](/wiki/tech/opisanie-poley-shlyuzovykh-tablits/35.webp)



#### product - товары

![](/wiki/tech/opisanie-poley-shlyuzovykh-tablits/36.webp)



#### product\_additional\_field - дополнительные поля товара

![](/wiki/tech/opisanie-poley-shlyuzovykh-tablits/37.webp)



#### product\_analog - товары аналоги

![](/wiki/tech/opisanie-poley-shlyuzovykh-tablits/38.webp)



#### product\_contract\_price - индивидуальные цены компании

![](/wiki/tech/opisanie-poley-shlyuzovykh-tablits/39.webp)

> [!CALLOUT color=#d30000]
> Если поля company\_id и segment\_id задать NULL, то цена будет применяться всем компаниям.



#### product\_custom - произвольные товары

![](/wiki/tech/opisanie-poley-shlyuzovykh-tablits/40.webp)



#### product\_identifiers - идентификаторы товара

![](/wiki/tech/opisanie-poley-shlyuzovykh-tablits/41.webp)



#### product\_related - связанные товары

![](/wiki/tech/opisanie-poley-shlyuzovykh-tablits/42.webp)



#### product\_external\_link

![](/wiki/tech/opisanie-poley-shlyuzovykh-tablits/43.webp)



#### region - регионы

![](/wiki/tech/opisanie-poley-shlyuzovykh-tablits/44.webp)

> [!CALLOUT color=#d30000]
> Заполняется из интерфейса администратора.



#### remains\_manufacturer - остатки на складах производителя

![](/wiki/tech/opisanie-poley-shlyuzovykh-tablits/45.webp)



#### remains - остатки на складах

![](/wiki/tech/opisanie-poley-shlyuzovykh-tablits/46.webp)



#### residue\_packing - Куски товаров

![](/wiki/tech/opisanie-poley-shlyuzovykh-tablits/47.webp)



#### segment - сегменты

![](/wiki/tech/opisanie-poley-shlyuzovykh-tablits/48.webp)



#### segment\_group - группы сегментов

![](/wiki/tech/opisanie-poley-shlyuzovykh-tablits/49.webp)



#### store - склады

![](/wiki/tech/opisanie-poley-shlyuzovykh-tablits/50.webp)



#### user - пользователи

![](/wiki/tech/opisanie-poley-shlyuzovykh-tablits/51.webp)

> [!CALLOUT color=#d30000]
> Таблица используется для получения информации о зарегистрированных пользователях.
