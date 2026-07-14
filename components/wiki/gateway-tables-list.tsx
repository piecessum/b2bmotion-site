interface RequiredRow {
  name: string;
  description: string;
  /** «Обязательно!» или «Желательно» */
  required: boolean;
  /** Номер итерации интеграции (1я / 2я / 3я) */
  iteration: string;
  /** На чьей стороне формируется / как передаётся */
  side: string;
}

interface OptionalRow {
  name: string;
  description: string;
}

const requiredRows: RequiredRow[] = [
  { name: "merchant", description: "Продавцы (может быть несколько)", required: true, iteration: "1я", side: "Передать нам в виде списка" },
  { name: "region", description: "Регионы", required: true, iteration: "1я", side: "Передать нам в виде списка" },
  { name: "catalog_section", description: "Дерево разделов каталога (Adjacency List)", required: true, iteration: "2я", side: "Передаются из 1С в ШТ" },
  { name: "brand", description: "Бренды", required: true, iteration: "2я", side: "Передаются из 1С в ШТ" },
  { name: "product", description: "Товары", required: true, iteration: "2я", side: "Передаются из 1С в ШТ" },
  { name: "price_type", description: "Типы цен (названия) с указанием с НДС или без", required: true, iteration: "2я", side: "Передаются из 1С в ШТ" },
  { name: "price", description: "Цены товаров", required: true, iteration: "2я", side: "Передаются из 1С в ШТ" },
  { name: "store", description: "Склады", required: true, iteration: "2я", side: "Передаются из 1С в ШТ" },
  { name: "remains", description: "Остатки на складах", required: true, iteration: "2я", side: "Передаются из 1С в ШТ" },
  { name: "feature", description: "Свойства товара. Показаны в карточке товара", required: false, iteration: "3я", side: "Передаются из 1С в ШТ" },
  { name: "gallery", description: "Изображения товаров для галереи", required: false, iteration: "3я", side: "Передаются из 1С в ШТ" },
  { name: "documents", description: "Документы", required: false, iteration: "3я", side: "Передаются из 1С в ШТ" },
  { name: "document_item", description: "Товары в документах", required: false, iteration: "3я", side: "Передаются из 1С в ШТ" },
  { name: "company", description: "Компании", required: true, iteration: "3я", side: "Передаются из 1С в ШТ" },
  { name: "legal_entity", description: "Юридические лица компаний (у каждой компании может быть несколько)", required: true, iteration: "3я", side: "Передаются из 1С в ШТ" },
  { name: "address", description: "Список адресов, принадлежащих компании (у каждой компании может быть несколько)", required: true, iteration: "3я", side: "Передаются из 1С в ШТ" },
  { name: "order", description: "Заказы", required: true, iteration: "3я", side: "Передаются из B2B в ШТ" },
  { name: "order_item", description: "Товары в заказах", required: true, iteration: "3я", side: "Передаются из B2B в ШТ" },
  { name: "order_status", description: "Статусы заказов", required: false, iteration: "3я", side: "Передаются из 1С в ШТ" },
];

const optionalRows: OptionalRow[] = [
  { name: "certificate", description: "Сертификаты для товаров" },
  { name: "company_additional_field", description: "Дополнительные поля для компаний" },
  { name: "company_manager_relation", description: "Связь менеджера с компанией покупателем" },
  { name: "contract_price", description: "Индивидуальные скидки для компаний в процентном отношении к цене" },
  { name: "document_additional_field", description: "Дополнительные поля для документов" },
  { name: "document_status", description: "Статусы документов (предустановлены)" },
  { name: "document_type", description: "Типы документов (предустановлены)" },
  { name: "external_link_type", description: "Типы внешних ссылок для product_external_link" },
  { name: "manager", description: "Менеджеры. Связь с компанией через company_manager_relation*" },
  { name: "payment_company", description: "График платежей для компаний (документ — срок оплаты)" },
  { name: "product_additional_field", description: "Дополнительные поля для товаров. Настраиваются индивидуально для каждого контрагента." },
  { name: "product_contract_price", description: "Индивидуальные скидки для компаний в рублях для конкретного товара" },
  { name: "product_custom", description: "Произвольные товары" },
  { name: "product_external_link", description: "Внешние ссылки для товаров" },
  { name: "product_identifiers", description: "Идентификаторы для товаров. Настраиваются индивидуально для каждого контрагента." },
  { name: "product_related", description: "Связанные товары" },
  { name: "region", description: "Регионы" },
  { name: "remains_manufacturer", description: "Остатки на складах поставщика" },
  { name: "residue_packing", description: "Остатки в упаковке" },
  { name: "delivery_point", description: "Адреса доставки заказа" },
  { name: "user", description: "Пользователи" },
];

function RequiredBadge({ required }: { required: boolean }) {
  const color = required ? "#d30000" : "#E08600";
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium whitespace-nowrap"
      style={{ backgroundColor: `${color}1A`, color }}
    >
      {required ? "Обязательно!" : "Желательно"}
    </span>
  );
}

interface GatewayTablesListProps {
  variant: "required" | "optional";
}

export function GatewayTablesList({ variant }: GatewayTablesListProps) {
  const isRequired = variant === "required";

  return (
    <div className="not-prose my-6 rounded-xl border border-glass-border bg-overlay-3 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-[13px] border-collapse">
          <thead>
            <tr className="text-left text-[10px] uppercase tracking-[0.12em] text-dim bg-overlay-2">
              <th className="font-medium px-4 py-2.5 border-b border-glass-border whitespace-nowrap">
                Название таблицы
              </th>
              <th className="font-medium px-4 py-2.5 border-b border-glass-border">
                Описание
              </th>
              {isRequired && (
                <>
                  <th className="font-medium px-4 py-2.5 border-b border-glass-border">
                    Обязательность
                  </th>
                  <th className="font-medium px-4 py-2.5 border-b border-glass-border whitespace-nowrap">
                    Итерация
                  </th>
                  <th className="font-medium px-4 py-2.5 border-b border-glass-border">
                    На чьей стороне
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {isRequired
              ? requiredRows.map((row, i) => (
                  <tr
                    key={row.name + i}
                    className={i % 2 === 1 ? "bg-overlay-2" : undefined}
                  >
                    <td className="px-4 py-2 align-top">
                      <code className="font-mono text-body whitespace-nowrap">
                        {row.name}
                      </code>
                    </td>
                    <td className="px-4 py-2 align-top text-body">
                      {row.description}
                    </td>
                    <td className="px-4 py-2 align-top">
                      <RequiredBadge required={row.required} />
                    </td>
                    <td className="px-4 py-2 align-top text-body whitespace-nowrap">
                      {row.iteration}
                    </td>
                    <td className="px-4 py-2 align-top text-body">{row.side}</td>
                  </tr>
                ))
              : optionalRows.map((row, i) => (
                  <tr
                    key={row.name + i}
                    className={i % 2 === 1 ? "bg-overlay-2" : undefined}
                  >
                    <td className="px-4 py-2 align-top">
                      <code className="font-mono text-body whitespace-nowrap">
                        {row.name}
                      </code>
                    </td>
                    <td className="px-4 py-2 align-top text-body">
                      {row.description}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
