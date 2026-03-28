"use client"

import { Search, User, LayoutDashboard, Package, ShoppingCart, BarChart3, Settings, TrendingUp, TrendingDown, Minus } from "lucide-react"

export function DashboardMockup() {
  return (
    <div
      className="relative mx-auto max-w-5xl"
      style={{
        perspective: "1200px",
      }}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-violet-500/5 rounded-[24px] blur-[60px] translate-y-10" />

      <div
        className="relative bg-surface border border-border-default rounded-[24px] overflow-hidden shadow-2xl"
        style={{
          transform: "rotateX(2deg)",
        }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-default bg-page-alt">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#EF4444]/80" />
              <div className="w-3 h-3 rounded-full bg-[#F59E0B]/80" />
              <div className="w-3 h-3 rounded-full bg-[#22C55E]/80" />
            </div>
            <span className="text-sm text-subtle font-medium">B2B Движение — Панель управления</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-surface-hover rounded-lg border border-border-default">
              <Search className="w-4 h-4 text-subtle" />
              <span className="text-sm text-subtle">Поиск товаров...</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-56 border-r border-border-default bg-page-alt p-4">
            <nav className="space-y-1">
              {[
                { icon: LayoutDashboard, label: "Дашборд", active: true },
                { icon: Package, label: "Каталог" },
                { icon: ShoppingCart, label: "Заказы" },
                { icon: BarChart3, label: "Аналитика" },
                { icon: Settings, label: "Настройки" },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                    item.active
                      ? "bg-[#3B82F6]/10 text-[#3B82F6]"
                      : "text-subtle hover:text-body hover:bg-surface-hover"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
              ))}
            </nav>
          </div>

          {/* Main content */}
          <div className="flex-1 p-6 bg-page-alt">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: "Выручка за месяц", value: "₽ 12.4M", change: "+12.5%", trend: "up" },
                { label: "Активные клиенты", value: "847", change: "+8.2%", trend: "up" },
                { label: "Средний чек", value: "₽ 58,400", change: "-2.1%", trend: "down" },
              ].map((stat, i) => (
                <div key={i} className="p-5 bg-surface-hover rounded-xl border border-border-default">
                  <p className="text-xs text-subtle mb-1">{stat.label}</p>
                  <p className="text-2xl font-heading font-semibold text-heading mb-2">{stat.value}</p>
                  <div className="flex items-center gap-1">
                    {stat.trend === "up" ? (
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                    ) : stat.trend === "down" ? (
                      <TrendingDown className="w-4 h-4 text-red-400" />
                    ) : (
                      <Minus className="w-4 h-4 text-subtle" />
                    )}
                    <span className={`text-xs ${stat.trend === "up" ? "text-emerald-500" : stat.trend === "down" ? "text-red-400" : "text-subtle"}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Table */}
            <div className="bg-surface-hover rounded-xl border border-border-default overflow-hidden">
              <div className="px-5 py-4 border-b border-border-default">
                <h3 className="text-sm font-medium text-heading">Последние заказы</h3>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border-default text-left">
                    <th className="px-5 py-3 text-xs font-medium text-subtle">Заказ</th>
                    <th className="px-5 py-3 text-xs font-medium text-subtle">Клиент</th>
                    <th className="px-5 py-3 text-xs font-medium text-subtle">Сумма</th>
                    <th className="px-5 py-3 text-xs font-medium text-subtle">Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: "#2847", client: "ООО «РЭЙД-21»", amount: "₽ 284,500", status: "Выполнен", statusColor: "emerald" },
                    { id: "#2846", client: "ЗАО «ХОГАРТ»", amount: "₽ 156,200", status: "В работе", statusColor: "blue" },
                    { id: "#2845", client: "ООО «ПРОТЭК»", amount: "₽ 89,300", status: "Новый", statusColor: "violet" },
                  ].map((order, i) => (
                    <tr key={i} className="border-b border-border-default last:border-0">
                      <td className="px-5 py-4 text-sm text-heading font-medium">{order.id}</td>
                      <td className="px-5 py-4 text-sm text-body">{order.client}</td>
                      <td className="px-5 py-4 text-sm text-heading">{order.amount}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                          order.statusColor === "emerald" ? "bg-emerald-500/10 text-emerald-500" :
                          order.statusColor === "blue" ? "bg-blue-500/10 text-blue-500" :
                          "bg-violet-500/10 text-violet-500"
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
