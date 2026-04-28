export type DomainId =
  | "companies"
  | "catalog"
  | "pricing"
  | "documents"
  | "orders"
  | "inventory"
  | "delivery";

export interface DbDomain {
  id: DomainId;
  title: string;
  accent: string;
}

export type FieldKind = "PK" | "FK" | "PFK";

export interface DbField {
  name: string;
  type: string;
  kind?: FieldKind;
  /** Target table for FK fields (and self-FK). */
  refs?: string;
}

export interface DbTable {
  name: string;
  domain: DomainId;
  fields: DbField[];
  optional?: boolean;
}

export const dbDomains: DbDomain[] = [
  { id: "companies", title: "Companies & people", accent: "#3B82F6" },
  { id: "catalog", title: "Catalog", accent: "#8B5CF6" },
  { id: "pricing", title: "Pricing", accent: "#10B981" },
  { id: "documents", title: "Documents", accent: "#F59E0B" },
  { id: "orders", title: "Orders", accent: "#EF4444" },
  { id: "inventory", title: "Inventory", accent: "#14B8A6" },
  { id: "delivery", title: "Geo & delivery", accent: "#06B6D4" },
];

export const dbTables: DbTable[] = [
  /* ── companies ── */
  {
    name: "company",
    domain: "companies",
    fields: [
      { name: "id", type: "INT(11)", kind: "PK" },
      { name: "external_id", type: "VARCHAR(60)" },
      { name: "is_individual", type: "TINYINT(1)" },
      { name: "name", type: "VARCHAR(255)" },
      { name: "alt_name", type: "VARCHAR(255)" },
      { name: "description", type: "TEXT" },
      { name: "price_type_id", type: "INT(11)", kind: "FK", refs: "price_type" },
      { name: "credit_sum", type: "DECIMAL(11,2)" },
      { name: "receivables", type: "DECIMAL(11,2)" },
      { name: "overdue_receivables", type: "DECIMAL(11,2)" },
      { name: "overdue_duration", type: "INT(10)" },
      { name: "note", type: "TEXT" },
      { name: "updated_at", type: "TIMESTAMP" },
    ],
  },
  {
    name: "address",
    domain: "companies",
    fields: [
      { name: "company_id", type: "INT(11)", kind: "FK", refs: "company" },
      { name: "address", type: "TEXT" },
      { name: "address_hash", type: "VARCHAR(32)" },
      { name: "updated_at", type: "TIMESTAMP" },
    ],
  },
  {
    name: "legal_entity",
    domain: "companies",
    fields: [
      { name: "company_id", type: "INT(11)", kind: "FK", refs: "company" },
      { name: "name", type: "VARCHAR(255)" },
      { name: "short_name", type: "VARCHAR(255)" },
      { name: "inn", type: "VARCHAR(12)" },
      { name: "kpp", type: "VARCHAR(9)" },
      { name: "updated_at", type: "TIMESTAMP" },
    ],
  },
  {
    name: "manager",
    domain: "companies",
    fields: [
      { name: "id", type: "INT(11)", kind: "PK" },
      { name: "external_id", type: "VARCHAR(120)" },
      { name: "phone", type: "VARCHAR(16)" },
      { name: "email", type: "VARCHAR(120)" },
      { name: "identity", type: "VARCHAR(255)" },
      { name: "updated_at", type: "TIMESTAMP" },
    ],
  },
  {
    name: "company_manager_relation",
    domain: "companies",
    fields: [
      { name: "company_id", type: "INT(11)", kind: "FK", refs: "company" },
      { name: "manager_id", type: "INT(11)", kind: "FK", refs: "manager" },
    ],
  },
  {
    name: "payment_company",
    domain: "companies",
    fields: [
      { name: "id", type: "INT(11)", kind: "PK" },
      { name: "company_id", type: "INT(11)", kind: "FK", refs: "company" },
      { name: "doc_name", type: "VARCHAR(255)" },
      { name: "sum_doc", type: "DECIMAL(11,2)" },
      { name: "sum_debt", type: "DECIMAL(11,2)" },
      { name: "expired_days", type: "INT(11)" },
      { name: "document_id", type: "INT(11)", kind: "FK", refs: "document" },
      { name: "updated_at", type: "TIMESTAMP" },
    ],
  },

  /* ── catalog ── */
  {
    name: "product",
    domain: "catalog",
    fields: [
      { name: "id", type: "INT(11)", kind: "PK" },
      { name: "external_id", type: "VARCHAR(120)" },
      { name: "article", type: "VARCHAR(60)" },
      { name: "manufacturer_code", type: "VARCHAR(80)" },
      { name: "alt_manufacturer_code", type: "VARCHAR(80)" },
      { name: "manufacturer", type: "VARCHAR(255)" },
      { name: "name", type: "TEXT" },
      { name: "name_of_manufacturer", type: "TEXT" },
      { name: "alt_name_of_manufacturer", type: "TEXT" },
      { name: "unit_name", type: "VARCHAR(30)" },
      { name: "multiplicity", type: "DECIMAL(8,2)" },
      { name: "image_url", type: "VARCHAR(255)" },
      { name: "country_code_a3", type: "VARCHAR(255)" },
      { name: "brand_id", type: "INT(11)", kind: "FK", refs: "brand" },
      { name: "catalog_section_id", type: "INT(11)", kind: "FK", refs: "catalog_section" },
      { name: "stock_status", type: "VARCHAR(1)" },
      { name: "updated_at", type: "TIMESTAMP" },
    ],
  },
  {
    name: "catalog_section",
    domain: "catalog",
    fields: [
      { name: "id", type: "INT(11)", kind: "PK" },
      { name: "external_id", type: "VARCHAR(60)" },
      { name: "name", type: "VARCHAR(255)" },
      { name: "synonyms", type: "TEXT" },
      { name: "parent_id", type: "INT(11)", kind: "FK", refs: "catalog_section" },
      { name: "updated_at", type: "TIMESTAMP" },
    ],
  },
  {
    name: "brand",
    domain: "catalog",
    fields: [
      { name: "id", type: "INT(11)", kind: "PK" },
      { name: "external_id", type: "VARCHAR(120)" },
      { name: "name", type: "VARCHAR(255)" },
      { name: "synonyms", type: "TEXT" },
      { name: "updated_at", type: "TIMESTAMP" },
    ],
  },
  {
    name: "product_identifiers",
    domain: "catalog",
    fields: [
      { name: "product_id", type: "INT(11)", kind: "FK", refs: "product" },
      { name: "name", type: "VARCHAR(255)" },
      { name: "value", type: "TEXT" },
      { name: "updated_at", type: "TIMESTAMP" },
    ],
  },
  {
    name: "product_additional_field",
    domain: "catalog",
    fields: [
      { name: "product_id", type: "INT(11)", kind: "FK", refs: "product" },
      { name: "name", type: "VARCHAR(255)" },
      { name: "value", type: "MEDIUMTEXT" },
      { name: "updated_at", type: "TIMESTAMP" },
    ],
  },
  {
    name: "feature",
    domain: "catalog",
    fields: [
      { name: "product_id", type: "INT(11)", kind: "FK", refs: "product" },
      { name: "name", type: "VARCHAR(255)" },
      { name: "value", type: "VARCHAR(255)" },
      { name: "unit", type: "VARCHAR(30)" },
      { name: "sort", type: "INT(6)" },
      { name: "updated_at", type: "TIMESTAMP" },
    ],
  },
  {
    name: "product_related",
    domain: "catalog",
    fields: [
      { name: "product_id", type: "INT(11)", kind: "FK", refs: "product" },
      { name: "related_product_id", type: "INT(11)", kind: "FK", refs: "product" },
      { name: "sort", type: "SMALLINT(6)" },
      { name: "source", type: "SMALLINT(6)" },
      { name: "created_at", type: "TIMESTAMP" },
    ],
  },
  {
    name: "certificate",
    domain: "catalog",
    optional: true,
    fields: [
      { name: "product_id", type: "INT(11)", kind: "FK", refs: "product" },
      { name: "name", type: "VARCHAR(255)" },
      { name: "url", type: "VARCHAR(255)" },
      { name: "validity_from", type: "DATE" },
      { name: "validity_to", type: "DATE" },
    ],
  },
  {
    name: "gallery",
    domain: "catalog",
    optional: true,
    fields: [
      { name: "product_id", type: "INT(11)", kind: "FK", refs: "product" },
      { name: "image_url", type: "VARCHAR(255)" },
    ],
  },

  /* ── pricing ── */
  {
    name: "price_type",
    domain: "pricing",
    fields: [
      { name: "id", type: "INT(11)", kind: "PK" },
      { name: "external_id", type: "VARCHAR(120)" },
      { name: "name", type: "TEXT" },
      { name: "with_vat", type: "TINYINT(1)" },
      { name: "updated_at", type: "TIMESTAMP" },
    ],
  },
  {
    name: "price",
    domain: "pricing",
    fields: [
      { name: "product_id", type: "INT(11)", kind: "FK", refs: "product" },
      { name: "type_id", type: "INT(11)", kind: "FK", refs: "price_type" },
      { name: "price", type: "DECIMAL(11,2)" },
      { name: "updated_at", type: "TIMESTAMP" },
    ],
  },
  {
    name: "contract_price",
    domain: "pricing",
    fields: [
      { name: "id", type: "INT(11)", kind: "PK" },
      { name: "company_id", type: "INT(11)", kind: "FK", refs: "company" },
      { name: "price_type_id", type: "INT(11)", kind: "FK", refs: "price_type" },
      { name: "discount", type: "DECIMAL(7,4)" },
      { name: "brand_id", type: "INT(11)", kind: "FK", refs: "brand" },
      { name: "category_ids", type: "TEXT" },
      { name: "updated_at", type: "TIMESTAMP" },
    ],
  },
  {
    name: "product_contract_price",
    domain: "pricing",
    fields: [
      { name: "product_id", type: "INT(11)", kind: "FK", refs: "product" },
      { name: "company_id", type: "INT(11)", kind: "FK", refs: "company" },
      { name: "price", type: "DECIMAL(11,2)" },
    ],
  },

  /* ── documents ── */
  {
    name: "document",
    domain: "documents",
    fields: [
      { name: "id", type: "INT(11)", kind: "PK" },
      { name: "external_id", type: "VARCHAR(60)" },
      { name: "type_id", type: "INT(11)", kind: "FK", refs: "document_type" },
      { name: "order_id", type: "INT(11)", kind: "FK", refs: "order" },
      { name: "parent_document_id", type: "INT(11)", kind: "FK", refs: "document" },
      { name: "number", type: "VARCHAR(120)" },
      { name: "total_amount", type: "DECIMAL(18,2)" },
      { name: "doc_date", type: "DATE" },
      { name: "status", type: "INT(1)" },
      { name: "incoming", type: "TINYINT(1)" },
      { name: "updated_at", type: "TIMESTAMP" },
    ],
  },
  {
    name: "document_item",
    domain: "documents",
    fields: [
      { name: "id", type: "INT(11)", kind: "PK" },
      { name: "document_id", type: "INT(11)", kind: "FK", refs: "document" },
      { name: "product_id", type: "INT(11)", kind: "FK", refs: "product" },
      { name: "price", type: "DECIMAL(11,2)" },
      { name: "price_type_id", type: "INT(11)", kind: "FK", refs: "price_type" },
      { name: "quantity", type: "DECIMAL(11,2)" },
      { name: "amount", type: "DECIMAL(11,2)" },
      { name: "unit_name", type: "VARCHAR(30)" },
    ],
  },
  {
    name: "document_type",
    domain: "documents",
    fields: [
      { name: "id", type: "INT(11)", kind: "PK" },
      { name: "name", type: "VARCHAR(255)" },
      { name: "name_short", type: "VARCHAR(255)" },
      { name: "file_generation", type: "TINYINT(1)" },
    ],
  },

  /* ── orders ── */
  {
    name: "order",
    domain: "orders",
    fields: [
      { name: "id", type: "INT(11)", kind: "PK" },
      { name: "external_id", type: "VARCHAR(60)" },
      { name: "merchant_id", type: "INT(11)" },
      { name: "company_id", type: "INT(11)", kind: "FK", refs: "company" },
      { name: "status", type: "SMALLINT(6)" },
      { name: "comment", type: "TEXT" },
      { name: "updated_at", type: "TIMESTAMP" },
    ],
  },
  {
    name: "order_item",
    domain: "orders",
    fields: [
      { name: "id", type: "INT(11)", kind: "PK" },
      { name: "order_id", type: "INT(11)", kind: "FK", refs: "order" },
      { name: "article", type: "VARCHAR(60)" },
      { name: "external_id", type: "VARCHAR(120)" },
      { name: "price", type: "DECIMAL(11,2)" },
      { name: "price_type_id", type: "INT(11)", kind: "FK", refs: "price_type" },
      { name: "quantity", type: "DECIMAL(11,2)" },
    ],
  },
  {
    name: "order_status",
    domain: "orders",
    fields: [
      { name: "id", type: "INT(11)", kind: "PK" },
      { name: "external_id", type: "VARCHAR(60)" },
      { name: "name", type: "VARCHAR(255)" },
      { name: "updated_at", type: "TIMESTAMP" },
    ],
  },

  /* ── inventory ── */
  {
    name: "store",
    domain: "inventory",
    fields: [
      { name: "id", type: "INT(11)", kind: "PK" },
      { name: "external_id", type: "VARCHAR(120)" },
      { name: "name", type: "VARCHAR(255)" },
      { name: "address", type: "VARCHAR(255)" },
      { name: "description", type: "TEXT" },
      { name: "phone", type: "VARCHAR(255)" },
      { name: "schedule", type: "TEXT" },
      { name: "sort", type: "INT(11)" },
      { name: "lat", type: "FLOAT(10,7)" },
      { name: "lng", type: "FLOAT(10,7)" },
      { name: "updated_at", type: "TIMESTAMP" },
    ],
  },
  {
    name: "remains",
    domain: "inventory",
    fields: [
      { name: "product_id", type: "INT(11)", kind: "FK", refs: "product" },
      { name: "store_id", type: "INT(11)", kind: "FK", refs: "store" },
      { name: "total_item_count", type: "DECIMAL(11,2)" },
      { name: "status", type: "VARCHAR(1)" },
      { name: "updated_at", type: "TIMESTAMP" },
    ],
  },
  {
    name: "remains_manufacturer",
    domain: "inventory",
    fields: [
      { name: "id", type: "INT(11)", kind: "PK" },
      { name: "product_id", type: "INT(11)", kind: "FK", refs: "product" },
      { name: "storage_name", type: "VARCHAR(255)" },
      { name: "quantity", type: "INT(10)" },
      { name: "relevance_date", type: "DATE" },
      { name: "delivery_days", type: "INT(11)" },
    ],
  },
  {
    name: "residue_packing",
    domain: "inventory",
    optional: true,
    fields: [
      { name: "id", type: "INT(11)", kind: "PK" },
      { name: "product_id", type: "INT(11)", kind: "FK", refs: "product" },
      { name: "store_id", type: "INT(11)", kind: "FK", refs: "store" },
      { name: "consignment", type: "VARCHAR(255)" },
      { name: "residue", type: "DECIMAL(11,2)" },
      { name: "reserve", type: "DECIMAL(11,2)" },
      { name: "updated_at", type: "TIMESTAMP" },
    ],
  },
];

/* ── Описания таблиц (источник: статья «Описание полей шлюзовых таблиц») ── */

export interface DbTableDescription {
  /** Краткое пояснение (что это за таблица). */
  desc: string;
  /** Дополнительные заметки/особенности из статьи. */
  notes?: string[];
}

export const dbTableDescriptions: Record<string, DbTableDescription> = {
  address: { desc: "Адреса компаний." },
  brand: {
    desc: "Бренды.",
    notes: [
      "Имеется возможность редактирования из административного интерфейса. При синхронизации изменения, внесённые из админки, заменяются (!) данными из шлюзовых таблиц.",
    ],
  },
  catalog_section: { desc: "Разделы каталога." },
  certificate: { desc: "Сертификаты." },
  company: { desc: "Компании." },
  company_additional_field: { desc: "Дополнительные поля для компаний." },
  company_manager_relation: { desc: "Связь компания — менеджер." },
  company_segment_relation: { desc: "Связь компания — сегмент." },
  contract_price: {
    desc: "Цены по контракту (скидки для компаний).",
    notes: [
      "Если brand_id, category_ids и price_group_ids оставить NULL — скидка распространится на ВСЕ товары. По умолчанию: если на один товар задано несколько скидок, клиент видит самую выгодную (наибольшую).",
      "Алгоритм ценообразования может быть изменён по вашему сценарию.",
    ],
  },
  currency: { desc: "Валюты." },
  deleted_product: {
    desc: "Удалённые товары.",
    notes: ["Заполняется автоматически при удалении строк из таблицы product."],
  },
  delivery_period: { desc: "Информация о сроках поставки товаров в регионы." },
  delivery_point: {
    desc: "Адреса доставки.",
    notes: [
      "Список адресов доставки, доступных компании. Адреса могут создаваться и удаляться (опционально) непосредственно пользователями системы.",
    ],
  },
  delivery_schedule: { desc: "График доставки." },
  document: { desc: "Документы." },
  document_additional_field: { desc: "Дополнительные поля для документов." },
  document_item: { desc: "Товары в документе." },
  document_custom_item: { desc: "Товары от покупателя в документе." },
  document_status: { desc: "Предустановленные статусы документов." },
  document_type: { desc: "Типы документов." },
  external_link_type: { desc: "Типы внешних ссылок для товаров." },
  feature: { desc: "Свойства товаров." },
  gallery: { desc: "Галерея изображений." },
  legal_entity: {
    desc: "Юридические лица компаний.",
    notes: [
      "Хранятся наименования и реквизиты юридических лиц. Используются при формировании документов.",
    ],
  },
  manager: {
    desc: "Менеджеры.",
    notes: [
      'В таблицу пользователь попадает, когда ему назначают роль «Менеджер»; у него обязательно должен быть номер телефона. Если пользователю меняют роль с клиента на менеджера — он попадает в manager и его уже можно привязывать к компании через company_manager_relation.',
      "Поле phone должно быть заполнено корректно: номер телефона имеет строковый формат и используется для поиска соответствующего пользователя системы.",
    ],
  },
  merchant: {
    desc: "Продавцы.",
    notes: [
      "Используется для записи компаний/филиалов-продавцов продукции. В админке доступно создание и редактирование, при синхронизации с ШТ ведётся поиск по полю id. ВНИМАНИЕ: данные в админке заменяются данными из ШТ.",
      "Опционально: чтобы добавить нового продавца — пропишите его в ШТ merchant и затем в product.merchant_id, тогда он появится в фильтре.",
    ],
  },
  order: { desc: "Заказы." },
  order_additional_field: { desc: "Дополнительные поля для заказов." },
  order_meta: { desc: "Дополнительная информация к заказу." },
  order_item: { desc: "Товары в заказе." },
  order_status: { desc: "Статусы заказов." },
  payment_company: {
    desc: "График платежей компаний.",
    notes: [
      "Хранит данные информационного характера: предстоящие и просроченные платежи компании по заказам. Может быть привязана к документу через document_id. Это расшифровка значений дебиторской и просроченной дебиторской задолженности компании, но она их не определяет (не влияет на них).",
    ],
  },
  pickup_point: { desc: "Адреса самовывоза." },
  price: { desc: "Цены." },
  price_type: { desc: "Типы цен." },
  product: { desc: "Товары." },
  product_additional_field: { desc: "Дополнительные поля товара." },
  product_analog: { desc: "Товары-аналоги." },
  product_contract_price: {
    desc: "Индивидуальные цены компании.",
    notes: [
      "Если company_id и segment_id оставить NULL — цена применяется ко всем компаниям.",
    ],
  },
  product_custom: { desc: "Произвольные товары." },
  product_identifiers: { desc: "Идентификаторы товара." },
  product_related: { desc: "Связанные товары." },
  product_external_link: { desc: "Внешние ссылки для товаров." },
  region: {
    desc: "Регионы.",
    notes: ["Заполняется из интерфейса администратора."],
  },
  remains_manufacturer: { desc: "Остатки на складах производителя." },
  remains: { desc: "Остатки на складах." },
  residue_packing: { desc: "Куски (остатки) товаров." },
  segment: { desc: "Сегменты." },
  segment_group: { desc: "Группы сегментов." },
  store: { desc: "Склады." },
  user: {
    desc: "Пользователи.",
    notes: ["Используется для получения информации о зарегистрированных пользователях."],
  },
};

export function getTableDescription(name: string): DbTableDescription | undefined {
  return dbTableDescriptions[name];
}

/* ── Derived helpers ── */

export interface DbRelation {
  /** Source table (the one that owns the FK). */
  from: string;
  /** Target table the FK points to. */
  to: string;
  /** Field name on the source table. */
  via: string;
  /** True for self-references (table → same table). */
  self?: boolean;
}

export function getDomain(id: DomainId): DbDomain {
  return dbDomains.find((d) => d.id === id)!;
}

export function getTable(name: string): DbTable | undefined {
  return dbTables.find((t) => t.name === name);
}

export function getAllRelations(): DbRelation[] {
  const rels: DbRelation[] = [];
  for (const t of dbTables) {
    for (const f of t.fields) {
      if ((f.kind === "FK" || f.kind === "PFK") && f.refs) {
        rels.push({
          from: t.name,
          to: f.refs,
          via: f.name,
          self: f.refs === t.name,
        });
      }
    }
  }
  return rels;
}

/** Outgoing + incoming relations for a given table. */
export function getRelationsFor(name: string): {
  outgoing: DbRelation[];
  incoming: DbRelation[];
} {
  const all = getAllRelations();
  return {
    outgoing: all.filter((r) => r.from === name),
    incoming: all.filter((r) => r.to === name && !r.self),
  };
}
