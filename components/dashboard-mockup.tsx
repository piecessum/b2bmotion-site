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
        className="relative bg-[#111113] border border-[#27272A] rounded-[24px] overflow-hidden shadow-2xl"
        style={{ 
          transform: "rotateX(2deg)",
        }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#27272A] bg-[#0A0A0C]">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#EF4444]/80" />
              <div className="w-3 h-3 rounded-full bg-[#F59E0B]/80" />
              <div className="w-3 h-3 rounded-full bg-[#22C55E]/80" />
            </div>
            <span className="text-sm text-[#71717A] font-medium">B2B Движение — Панель управления</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#18181B] rounded-lg border border-[#27272A]">
              <Search className="w-4 h-4 text-[#71717A]" />
              <span className="text-sm text-[#71717A]">Поиск товаров...</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-56 border-r border-[#27272A] bg-[#0A0A0C] p-4">
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
                      : "text-[#71717A] hover:text-[#A1A1AA] hover:bg-[#18181B]"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
              ))}
            </nav>
          </div>

          {/* Main content */}
          <div className="flex-1 p-6 bg-[#09090B]">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: "Выручка за месяц", value: "₽ 12.4M", change: "+12.5%", trend: "up" },
                { label: "Активные клиенты", value: "847", change: "+8.2%", trend: "up" },
                { label: "Средний чек", value: "₽ 58,400", change: "-2.1%", trend: "down" },
              ].map((stat, i) => (
                <div key={i} className="p-5 bg-[#18181B] rounded-xl border border-[#27272A]">
                  <p className="text-xs text-[#71717A] mb-1">{stat.label}</p>
                  <p className="text-2xl font-heading font-semibold text-[#F5F5F5] mb-2">{stat.value}</p>
                  <div className="flex items-center gap-1">
                    {stat.trend === "up" ? (
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                    ) : stat.trend === "down" ? (
                      <TrendingDown className="w-4 h-4 text-red-400" />
                    ) : (
                      <Minus className="w-4 h-4 text-[#71717A]" />
                    )}
                    <span className={`text-xs ${stat.trend === "up" ? "text-emerald-500" : stat.trend === "down" ? "text-red-400" : "text-[#71717A]"}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Table */}
            <div className="bg-[#18181B] rounded-xl border border-[#27272A] overflow-hidden">
              <div className="px-5 py-4 border-b border-[#27272A]">
                <h3 className="text-sm font-medium text-[#F5F5F5]">Последние заказы</h3>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#27272A] text-left">
                    <th className="px-5 py-3 text-xs font-medium text-[#71717A]">Заказ</th>
                    <th className="px-5 py-3 text-xs font-medium text-[#71717A]">Клиент</th>
                    <th className="px-5 py-3 text-xs font-medium text-[#71717A]">Сумма</th>
                    <th className="px-5 py-3 text-xs font-medium text-[#71717A]">Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: "#2847", client: "ООО «РЭЙД-21»", amount: "₽ 284,500", status: "Выполнен", statusColor: "emerald" },
                    { id: "#2846", client: "ЗАО «ХОГАРТ»", amount: "₽ 156,200", status: "В работе", statusColor: "blue" },
                    { id: "#2845", client: "ООО «ПРОТЭК»", amount: "₽ 89,300", status: "Новый", statusColor: "violet" },
                  ].map((order, i) => (
                    <tr key={i} className="border-b border-[#27272A] last:border-0">
                      <td className="px-5 py-4 text-sm text-[#F5F5F5] font-medium">{order.id}</td>
                      <td className="px-5 py-4 text-sm text-[#A1A1AA]">{order.client}</td>
                      <td className="px-5 py-4 text-sm text-[#F5F5F5]">{order.amount}</td>
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
