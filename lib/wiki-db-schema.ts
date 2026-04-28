export interface DbTable {
  name: string;
  label: string;
  domain: DomainId;
  refs?: string[];
  optional?: boolean;
}

export type DomainId =
  | "companies"
  | "catalog"
  | "pricing"
  | "documents"
  | "orders"
  | "inventory"
  | "delivery"
  | "merchants";

export interface DbDomain {
  id: DomainId;
  title: string;
  accent: string;
}

export const dbDomains: DbDomain[] = [
  { id: "companies", title: "Компании и пользователи", accent: "#3B82F6" },
  { id: "catalog", title: "Каталог и товары", accent: "#8B5CF6" },
  { id: "pricing", title: "Цены", accent: "#10B981" },
  { id: "documents", title: "Документы", accent: "#F59E0B" },
  { id: "orders", title: "Заказы", accent: "#EF4444" },
  { id: "inventory", title: "Склады и остатки", accent: "#14B8A6" },
  { id: "delivery", title: "География и доставка", accent: "#06B6D4" },
  { id: "merchants", title: "Продавцы", accent: "#A855F7" },
];

export const dbTables: DbTable[] = [
  // companies
  { name: "company", label: "Компании", domain: "companies" },
  { name: "company_additional_field", label: "Дополнительные поля компаний", domain: "companies", refs: ["company"] },
  { name: "address", label: "Адреса компаний", domain: "companies", refs: ["company"] },
  { name: "legal_entity", label: "Юр. лица компаний", domain: "companies", refs: ["company"] },
  { name: "manager", label: "Менеджеры", domain: "companies" },
  { name: "company_manager_relation", label: "Связь компания — менеджер", domain: "companies", refs: ["company", "manager"] },
  { name: "user", label: "Пользователи", domain: "companies", refs: ["company"] },
  { name: "segment_group", label: "Группы сегментов", domain: "companies" },
  { name: "segment", label: "Сегменты", domain: "companies", refs: ["segment_group"] },
  { name: "company_segment_relation", label: "Связь компания — сегмент", domain: "companies", refs: ["company", "segment"] },
  { name: "payment_company", label: "График платежей компаний", domain: "companies", refs: ["company"] },

  // catalog
  { name: "product", label: "Товары", domain: "catalog", refs: ["brand", "catalog_section"] },
  { name: "product_additional_field", label: "Дополнительные поля товара", domain: "catalog", refs: ["product"] },
  { name: "product_identifiers", label: "Идентификаторы товара", domain: "catalog", refs: ["product"] },
  { name: "product_analog", label: "Товары-аналоги", domain: "catalog", refs: ["product"] },
  { name: "product_related", label: "Связанные товары", domain: "catalog", refs: ["product"] },
  { name: "product_custom", label: "Произвольные товары", domain: "catalog" },
  { name: "deleted_product", label: "Удалённые товары", domain: "catalog", refs: ["product"], optional: true },
  { name: "brand", label: "Бренды", domain: "catalog" },
  { name: "catalog_section", label: "Разделы каталога", domain: "catalog" },
  { name: "feature", label: "Свойства товаров", domain: "catalog", refs: ["product"] },
  { name: "gallery", label: "Галерея изображений", domain: "catalog", refs: ["product"], optional: true },
  { name: "certificate", label: "Сертификаты", domain: "catalog", refs: ["product"], optional: true },
  { name: "external_link_type", label: "Типы внешних ссылок", domain: "catalog", optional: true },

  // pricing
  { name: "price", label: "Цены", domain: "pricing", refs: ["product", "price_type"] },
  { name: "price_type", label: "Типы цен", domain: "pricing", refs: ["currency"] },
  { name: "currency", label: "Валюты", domain: "pricing" },
  { name: "contract_price", label: "Цены по контракту", domain: "pricing", refs: ["company"] },
  { name: "product_contract_price", label: "Индивидуальные цены компании", domain: "pricing", refs: ["product", "company"] },

  // documents
  { name: "document", label: "Документы", domain: "documents", refs: ["company", "document_status", "document_type"] },
  { name: "document_item", label: "Товары в документе", domain: "documents", refs: ["document", "product"] },
  { name: "document_custom_item", label: "Произвольные товары в документе", domain: "documents", refs: ["document"] },
  { name: "document_additional_field", label: "Дополнительные поля документов", domain: "documents", refs: ["document"] },
  { name: "document_status", label: "Статусы документов", domain: "documents" },
  { name: "document_type", label: "Типы документов", domain: "documents" },

  // orders
  { name: "order", label: "Заказы", domain: "orders", refs: ["company", "order_status"] },
  { name: "order_item", label: "Товары в заказе", domain: "orders", refs: ["order", "product"] },
  { name: "order_meta", label: "Дополнительная информация к заказу", domain: "orders", refs: ["order"] },
  { name: "order_additional_field", label: "Дополнительные поля заказов", domain: "orders", refs: ["order"] },
  { name: "order_status", label: "Статусы заказов", domain: "orders" },

  // inventory
  { name: "store", label: "Склады", domain: "inventory", refs: ["region"] },
  { name: "remains", label: "Остатки на складах", domain: "inventory", refs: ["product", "store"] },
  { name: "remains_manufacturer", label: "Остатки на складах производителя", domain: "inventory", refs: ["product"] },
  { name: "residue_packing", label: "Куски товаров", domain: "inventory", refs: ["product"], optional: true },

  // delivery
  { name: "region", label: "Регионы", domain: "delivery" },
  { name: "delivery_period", label: "Сроки поставки в регионы", domain: "delivery", refs: ["region", "product"] },
  { name: "delivery_point", label: "Адреса доставки", domain: "delivery", refs: ["company"] },
  { name: "delivery_schedule", label: "График доставки", domain: "delivery", refs: ["company"], optional: true },
  { name: "pickup_point", label: "Адреса самовывоза", domain: "delivery", refs: ["store"] },

  // merchants
  { name: "merchant", label: "Продавцы", domain: "merchants" },
];

/* ── Helpers ── */

export function getTable(name: string): DbTable | undefined {
  return dbTables.find((t) => t.name === name);
}

export function getDomain(id: DomainId): DbDomain {
  return dbDomains.find((d) => d.id === id)!;
}

export function getRelatedTables(name: string): DbTable[] {
  const table = getTable(name);
  if (!table) return [];
  const outgoing = (table.refs || [])
    .map((n) => getTable(n))
    .filter((t): t is DbTable => !!t);
  const incoming = dbTables.filter((t) => (t.refs || []).includes(name));
  const seen = new Set<string>();
  const result: DbTable[] = [];
  for (const t of [...outgoing, ...incoming]) {
    if (seen.has(t.name)) continue;
    seen.add(t.name);
    result.push(t);
  }
  return result;
}
