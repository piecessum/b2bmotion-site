#!/usr/bin/env python3
# Единый визуальный язык иллюстраций b2b-wiki: тёмная стеклянная изосцена,
# фирменные градиенты, «пол»-платформа, карточки/экраны/кубы/узлы/линии.
# Каждая сцена — в акцентном цвете своего этапа воронки.
import math, os, random

W, H = 1600, 900
K = math.cos(math.radians(30))
S = 50
CX, CY = 800, 470   # экранный центр изо-начала координат (0,0)

BLUE="#3B82F6"; INDIGO="#6366F1"; VIOLET="#8B5CF6"; CYAN="#06B6D4"
EMER="#22C55E"; AMBER="#F59E0B"; ORANGE="#F97316"; RED="#EF4444"; TEAL="#14B8A6"

GRADS = {
  "blue":(BLUE,INDIGO), "violet":(VIOLET,"#6D28D9"), "cyan":(CYAN,BLUE),
  "emer":(EMER,"#0EA5E9"), "amber":(AMBER,ORANGE), "orange":(ORANGE,"#EA580C"),
  "red":(RED,"#DC2626"), "teal":(TEAL,"#0D9488"),
}

def defs():
    g = ""
    for name,(a,b) in GRADS.items():
        g += (f'<linearGradient id="c_{name}" x1="0" y1="0" x2="1" y2="1">'
              f'<stop offset="0" stop-color="{a}"/><stop offset="1" stop-color="{b}"/></linearGradient>')
    return f'''<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#141833"/><stop offset="0.5" stop-color="#191436"/>
    <stop offset="1" stop-color="#0D1026"/></linearGradient>
  <radialGradient id="glowB" cx="0.5" cy="0.5" r="0.5">
    <stop offset="0" stop-color="{BLUE}" stop-opacity="0.55"/><stop offset="1" stop-color="{BLUE}" stop-opacity="0"/></radialGradient>
  <radialGradient id="glowV" cx="0.5" cy="0.5" r="0.5">
    <stop offset="0" stop-color="{VIOLET}" stop-opacity="0.5"/><stop offset="1" stop-color="{VIOLET}" stop-opacity="0"/></radialGradient>
  <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#ffffff" stop-opacity="0.16"/><stop offset="1" stop-color="#ffffff" stop-opacity="0.04"/></linearGradient>
  {g}
  <filter id="soft" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="7"/></filter>
  <filter id="blur30" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="36"/></filter>
</defs>'''

def isoP(x, y, z=0):
    return (CX + (x - y) * K * S, CY + ((x + y) * 0.5 - z) * S)

def bg(accent="blue"):
    ah = GRADS[accent][0]
    dots = ""
    random.seed(7)
    for _ in range(80):
        x=random.randint(0,W); y=random.randint(0,H); r=random.choice([1,1,1.5,2])
        o=random.choice([0.05,0.08,0.12,0.16])
        dots += f'<circle cx="{x}" cy="{y}" r="{r}" fill="#fff" opacity="{o}"/>'
    return (f'<rect width="{W}" height="{H}" rx="26" fill="url(#bg)"/>'
            f'<circle cx="330" cy="230" r="380" fill="url(#glowB)" filter="url(#blur30)"/>'
            f'<circle cx="1300" cy="720" r="400" fill="url(#glowV)" filter="url(#blur30)"/>'
            f'<circle cx="800" cy="470" r="300" fill="{ah}" opacity="0.14" filter="url(#blur30)"/>'
            f'{dots}')

def floor(x0, y0, x1, y1, accent="blue"):
    pts = " ".join(f"{px:.1f},{py:.1f}" for px,py in
                   [isoP(x0,y0), isoP(x1,y0), isoP(x1,y1), isoP(x0,y1)])
    grid = ""
    xi = x0
    while xi <= x1:
        a=isoP(xi,y0); b=isoP(xi,y1)
        grid += f'<line x1="{a[0]:.1f}" y1="{a[1]:.1f}" x2="{b[0]:.1f}" y2="{b[1]:.1f}" stroke="#fff" stroke-opacity="0.05"/>'
        xi += 2
    yi = y0
    while yi <= y1:
        a=isoP(x0,yi); b=isoP(x1,yi)
        grid += f'<line x1="{a[0]:.1f}" y1="{a[1]:.1f}" x2="{b[0]:.1f}" y2="{b[1]:.1f}" stroke="#fff" stroke-opacity="0.05"/>'
        yi += 2
    ah = GRADS[accent][0]
    return (f'<polygon points="{pts}" fill="{ah}" opacity="0.06"/>'
            f'<polygon points="{pts}" fill="none" stroke="{ah}" stroke-opacity="0.18" stroke-width="1.5"/>'
            f'{grid}')

def shadow(x, y, w, h):
    e, f = isoP(x + w/2, y + h/2, 0)
    return (f'<ellipse cx="{e:.1f}" cy="{f+8:.1f}" rx="{w*K*S*0.62:.1f}" ry="{w*S*0.30:.1f}" '
            f'fill="#000" opacity="0.30" filter="url(#soft)"/>')

def card_top(x, y, z, w, h, grad, bars=True, check=False):
    e, f = isoP(x, y, z)
    m = f'matrix({K*S:.4f},{0.5*S:.4f},{-K*S:.4f},{0.5*S:.4f},{e:.2f},{f:.2f})'
    inner = (f'<rect width="{w}" height="{h}" rx="0.3" fill="url(#c_{grad})"/>'
             f'<rect width="{w}" height="{h}" rx="0.3" fill="url(#glass)"/>')
    if check:
        inner += (f'<path d="M {w/2-0.6} {h/2} l 0.45 0.45 l 0.85 -1.0" fill="none" '
                  f'stroke="#fff" stroke-width="0.22" stroke-linecap="round" stroke-linejoin="round"/>')
    elif bars:
        inner += f'<circle cx="0.6" cy="0.6" r="0.26" fill="#fff" opacity="0.85"/>'
        for i,bw in enumerate([w-1.2, w-1.8, w-1.5]):
            inner += (f'<rect x="0.38" y="{1.25+i*0.44:.2f}" width="{max(bw,0.6):.2f}" height="0.2" '
                      f'rx="0.1" fill="#fff" opacity="{0.5-i*0.12:.2f}"/>')
    return shadow(x,y,w,h) + f'<g transform="{m}">{inner}</g>'

def screen(x, y, w, hgt, grad, chart=None, phone=False):
    e, f = isoP(x, y, 0)
    m = f'matrix({K*S:.4f},{0.5*S:.4f},0,{-1*S:.4f},{e:.2f},{f:.2f})'
    rx = 0.5 if phone else 0.3
    inner = (f'<rect width="{w}" height="{hgt}" rx="{rx}" fill="url(#c_{grad})"/>'
             f'<rect width="{w}" height="{hgt}" rx="{rx}" fill="url(#glass)"/>')
    if phone:
        inner += f'<rect x="{w/2-0.35:.2f}" y="0.25" width="0.7" height="0.12" rx="0.06" fill="#fff" opacity="0.4"/>'
        inner += f'<circle cx="{w/2:.2f}" cy="{hgt*0.34:.2f}" r="0.6" fill="#fff" opacity="0.85"/>'
        inner += f'<rect x="{w/2-0.9:.2f}" y="{hgt*0.5:.2f}" width="1.8" height="0.24" rx="0.12" fill="#fff" opacity="0.5"/>'
        inner += f'<rect x="{w/2-0.7:.2f}" y="{hgt*0.62:.2f}" width="1.4" height="0.5" rx="0.14" fill="#fff" opacity="0.9"/>'
        return shadow(x,y,w,0.4) + f'<g transform="{m}">{inner}</g>'
    inner += f'<rect x="0.3" y="0.3" width="{w-0.6}" height="0.45" rx="0.16" fill="#fff" opacity="0.18"/>'
    if chart == "bars":
        random.seed(3); n=5; bw=(w-0.9)/n
        for i in range(n):
            bh=random.uniform(0.9, hgt-1.5)
            inner+=(f'<rect x="{0.55+i*bw:.2f}" y="{hgt-0.5-bh:.2f}" width="{bw*0.58:.2f}" height="{bh:.2f}" '
                    f'rx="0.08" fill="#fff" opacity="{0.4+0.1*(i%3):.2f}"/>')
    elif chart == "line":
        pts=" ".join(f"{0.55+i*(w-1.1)/5:.2f},{hgt-0.9-1.5*abs(math.sin(i*0.9)):.2f}" for i in range(6))
        inner+=f'<polyline points="{pts}" fill="none" stroke="#fff" stroke-opacity="0.85" stroke-width="0.12"/>'
    elif chart == "donut":
        r=min(w,hgt)/3.2; cxx=w/2; cyy=hgt/2+0.25
        inner+=(f'<circle cx="{cxx:.2f}" cy="{cyy:.2f}" r="{r:.2f}" fill="none" stroke="#fff" stroke-opacity="0.25" stroke-width="0.32"/>'
                f'<circle cx="{cxx:.2f}" cy="{cyy:.2f}" r="{r:.2f}" fill="none" stroke="#fff" stroke-opacity="0.9" stroke-width="0.32" '
                f'stroke-dasharray="{2*math.pi*r*0.62:.2f} 999" stroke-linecap="round" transform="rotate(-90 {cxx:.2f} {cyy:.2f})"/>')
    elif chart == "search":
        inner+=(f'<circle cx="{w*0.42:.2f}" cy="{hgt*0.45:.2f}" r="{min(w,hgt)*0.22:.2f}" fill="none" stroke="#fff" stroke-opacity="0.9" stroke-width="0.2"/>'
                f'<line x1="{w*0.42+min(w,hgt)*0.16:.2f}" y1="{hgt*0.45+min(w,hgt)*0.16:.2f}" x2="{w*0.66:.2f}" y2="{hgt*0.7:.2f}" stroke="#fff" stroke-opacity="0.9" stroke-width="0.22" stroke-linecap="round"/>')
    else:
        for i in range(3):
            inner+=(f'<rect x="0.4" y="{1.15+i*0.5:.2f}" width="{w-0.8-(i*0.5):.2f}" height="0.22" rx="0.11" fill="#fff" opacity="{0.4-i*0.08:.2f}"/>')
    return (f'<ellipse cx="{e:.1f}" cy="{f+4:.1f}" rx="{w*K*S*0.5:.1f}" ry="{w*S*0.14:.1f}" fill="#000" opacity="0.25" filter="url(#soft)"/>'
            f'<g transform="{m}">{inner}</g>')

def cube(x, y, z, w, d, h, accent):
    base = GRADS[accent][0]
    def poly(cs, fill, op=1.0):
        p = " ".join(f"{a:.1f},{b:.1f}" for a,b in [isoP(*c) for c in cs])
        return f'<polygon points="{p}" fill="{fill}" opacity="{op}"/>'
    top   = [(x,y,z+h),(x+w,y,z+h),(x+w,y+d,z+h),(x,y+d,z+h)]
    right = [(x+w,y,z+h),(x+w,y+d,z+h),(x+w,y+d,z),(x+w,y,z)]
    front = [(x,y+d,z+h),(x+w,y+d,z+h),(x+w,y+d,z),(x,y+d,z)]
    return (shadow(x, y, w, d)
            + poly(front, base) + poly(front, "#000", 0.40)   # передняя грань — темнее
            + poly(right, base) + poly(right, "#000", 0.20)   # правая — чуть темнее
            + poly(top, base)   + poly(top, "url(#glass)"))    # верх — светлее + блик

def node(px, py, pz, color=CYAN, r=8):
    e, f = isoP(px, py, pz)
    return (f'<circle cx="{e:.1f}" cy="{f:.1f}" r="{r*1.9:.1f}" fill="{color}" opacity="0.28" filter="url(#soft)"/>'
            f'<circle cx="{e:.1f}" cy="{f:.1f}" r="{r}" fill="{color}"/>'
            f'<circle cx="{e:.1f}" cy="{f:.1f}" r="{r*0.42:.1f}" fill="#fff" opacity="0.9"/>')

def link(a, b, color="#fff", op=0.3):
    e1,f1=isoP(*a); e2,f2=isoP(*b)
    return (f'<line x1="{e1:.1f}" y1="{f1:.1f}" x2="{e2:.1f}" y2="{f2:.1f}" stroke="{color}" '
            f'stroke-opacity="{op}" stroke-width="2.2" stroke-dasharray="1 7" stroke-linecap="round"/>')

def wrap(body, accent="blue"):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">'
            f'{defs()}{bg(accent)}{body}</svg>')

# ================= СЦЕНЫ =================
def hero():
    b = floor(-6,-6,6,6,"blue")
    b += screen(-1.6,-0.2, 3.6, 2.7, "blue", chart="donut")
    cards=[(-4.5,-2.5,3.4,"violet",3.2,2.3),( 1.4,-4.6,4.2,"cyan",3.0,2.1),
           ( 4.2, 0.6,2.4,"emer",2.9,2.0),(-1.0, 3.6,1.5,"amber",2.8,1.9),
           ( 5.4,-3.0,5.0,"red",2.4,1.7)]
    cen=[(x+w/2,y+h/2,z) for (x,y,z,g,w,h) in cards]
    hub=(0.2,1.1,0)
    for c,col in zip(cen,[VIOLET,CYAN,EMER,AMBER,RED]):
        b += link(hub,(c[0],c[1],0),col,0.34)
    for (x,y,z,g,w,h) in cards: b += card_top(x,y,z,w,h,g)
    for c,col in zip(cen,[VIOLET,CYAN,EMER,AMBER,RED]): b += node(c[0],c[1],0,col,7)
    return wrap(b,"blue")

def reg():   # красный: регистрация — телефон + подтверждение
    b = floor(-6,-6,6,6,"red")
    b += screen(-1.1,-0.4, 2.6, 4.2, "red", phone=True)
    b += card_top(-4.6, 1.2, 1.2, 2.6, 1.7, "blue", check=True)
    b += card_top( 2.6,-3.0, 3.2, 2.6, 1.7, "violet")
    b += card_top( 3.4, 1.8, 1.0, 2.4, 1.6, "cyan", check=True)
    b += link((0.2,1.6,0),(-3.3,2.05,0),EMER,0.34)
    b += link((0.2,1.6,0),(4.6,2.6,0),CYAN,0.34)
    b += node(-3.3,2.05,0,EMER,7)
    b += node(4.6,2.6,0,CYAN,7)
    b += node(3.9,-2.15,0,VIOLET,6)
    return wrap(b,"red")

def znak():  # янтарный: знакомство — поиск + фильтры + каталог
    b = floor(-6,-6,6,6,"amber")
    b += screen(-1.4,-0.3, 3.8, 2.9, "amber", chart="search")
    # мини-каталог из карточек
    grid=[(-4.8,-1.0),(-4.8,1.2),(-2.6,2.8),(2.9,-3.2),(4.6,-0.6),(3.2,2.4)]
    cols=["violet","cyan","emer","blue","orange","cyan"]
    for (x,y),col,i in zip(grid,cols,range(6)):
        b += card_top(x,y,1.0+0.4*(i%3),2.1,1.5,col)
    hub=(0.5,1.1,0)
    for (x,y),col in zip(grid,[VIOLET,CYAN,EMER,BLUE,ORANGE,CYAN]):
        b += link(hub,(x+1.0,y+0.75,0),col,0.24)
    for (x,y),col in zip(grid,[VIOLET,CYAN,EMER,BLUE,ORANGE,CYAN]):
        b += node(x+1.0,y+0.75,0,col,5)
    return wrap(b,"amber")

def order():  # оранжевый: заказы — цикл пакет→узел→документ→доставка
    b = floor(-6,-6,6,6,"orange")
    b += cube(-3.6,-1.2,0.0, 2.2,2.2,2.2, "orange")           # пакет/коробка
    b += screen(1.6,-2.6, 2.8, 2.3, "blue", chart=None)       # документы
    b += cube(3.0, 1.6,0.0, 2.6,1.6,1.5, "violet")            # доставка (фура-блок)
    b += card_top(-1.0, 2.6, 0.9, 2.6, 1.7, "emer", check=True)  # доставлено
    # цикл-стрелки (замкнутый поток)
    loop=[(-2.5,0.0,0),(2.9,-1.4,0),(4.2,2.3,0),(0.3,3.4,0)]
    cols=[ORANGE,BLUE,VIOLET,EMER]
    for i in range(4):
        b += link(loop[i],loop[(i+1)%4],cols[i],0.32)
    for p,c in zip(loop,cols): b += node(*p,c,6)
    return wrap(b,"orange")

def spec():   # зелёный: спецификации — стопки списков + папка
    b = floor(-6,-6,6,6,"emer")
    # стопка списков (несколько карточек со сдвигом по высоте)
    for i in range(4):
        b += card_top(-2.6+i*0.15, -0.6+i*0.15, 0.4+i*0.7, 3.4, 2.3, "emer")
    b += screen(2.4,-2.4, 2.6, 2.4, "blue", chart=None)   # документ-спецификация
    b += card_top(-4.8, 2.2, 1.0, 2.4, 1.6, "cyan")
    b += card_top( 3.0, 1.8, 1.2, 2.6, 1.7, "violet")
    hub=(0.0,1.0,0)
    for t,c in [((3.7,-1.2,0),BLUE),((-3.6,3.0,0),CYAN),((4.3,2.6,0),VIOLET)]:
        b += link(hub,t,c,0.3); b += node(*t,c,6)
    return wrap(b,"emer")

def profi():  # бирюзовый: профи — дашборд + графики + автоматизация
    b = floor(-6,-6,6,6,"teal")
    b += screen(-2.4,-0.6, 6.0, 3.9, "teal", chart="bars")
    b += screen(4.2,-1.8, 2.9, 2.3, "blue", chart="line")
    b += screen(4.2, 1.6, 2.9, 2.1, "cyan", chart="donut")
    b += card_top(-4.6, 2.8, 1.1, 2.2, 1.4, "emer", check=True)
    b += card_top( 1.2, 4.0, 0.8, 2.2, 1.4, "violet", check=True)
    b += link((1.4,1.6,0),(4.2,-0.6,0),CYAN,0.3)
    b += link((1.4,1.6,0),(4.2,2.7,0),VIOLET,0.3)
    b += node(4.2,-0.6,0,CYAN,6); b += node(4.2,2.7,0,VIOLET,6)
    return wrap(b,"teal")

SCENES={"hero":hero,"registraciya":reg,"znakomstvo":znak,"zakazy":order,
        "specifikacii":spec,"profi":profi}
os.makedirs("/tmp/illu/out", exist_ok=True)
for name,fn in SCENES.items():
    open(f"/tmp/illu/out/{name}.svg","w").write(fn())
print("written:", ", ".join(SCENES))
