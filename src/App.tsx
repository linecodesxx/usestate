import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import './App.css'

type IconName = 'grid' | 'layers' | 'form' | 'list' | 'code' | 'sun' | 'moon' | 'eye' | 'eye-off' | 'user' | 'palette' | 'cart' | 'plus' | 'minus' | 'reset' | 'trash' | 'check' | 'search' | 'book' | 'close' | 'spark' | 'chevron' | 'bag'
function Icon({ name, size = 20, className = '' }: { name: IconName; size?: number; className?: string }) {
  const paths: Record<IconName, ReactNode> = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></>,
    layers: <><path d="m12 3 10 5-10 5L2 8zM2 12l10 5 10-5M2 16l10 5 10-5"/></>,
    form: <><rect x="4" y="3" width="16" height="18" rx="3"/><path d="M8 8h8M8 12h8M8 16h4"/></>,
    list: <><path d="M9 6h12M9 12h12M9 18h12M3 6h.01M3 12h.01M3 18h.01"/></>,
    code: <><path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 16"/></>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></>,
    moon: <path d="M20.5 14A9 9 0 0 1 10 3.5 9 9 0 1 0 20.5 14Z"/>,
    eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></>,
    'eye-off': <><path d="m3 3 18 18M10 5.2c.6-.1 1.3-.2 2-.2 6.5 0 10 7 10 7a20 20 0 0 1-3.4 4.4M6.3 6.3C3.5 8.5 2 12 2 12s3.5 7 10 7a12 12 0 0 0 5.7-1.4M10 10a3 3 0 0 0 4 4"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/></>,
    palette: <><path d="M12 3a9 9 0 1 0 0 18h1a2 2 0 0 0 1-3.7c-.9-.5-.6-2 .5-2H17a4 4 0 0 0 4-4C21 6.6 17 3 12 3Z"/><path d="M7 10h.01M10 6.5h.01M15 7h.01M17.5 11h.01"/></>,
    cart: <><path d="M2 3h3l3 13h11l3-9H6M9 21h.01M18 21h.01"/></>,
    plus: <path d="M12 5v14M5 12h14"/>, minus: <path d="M5 12h14"/>,
    reset: <><path d="M3 10a9 9 0 1 1 2.6 8.4M3 4v6h6"/></>,
    trash: <><path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7"/></>,
    check: <path d="m5 12 4 4L19 6"/>, search: <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5"/></>,
    book: <><path d="M12 5v16M12 5C9 2 5 3 2 4v16c4-2 7-1 10 1 3-2 6-3 10-1V4c-3-1-7-2-10 1Z"/></>,
    close: <path d="m6 6 12 12M6 18 18 6"/>, spark: <><path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z"/></>,
    chevron: <path d="m9 5 7 7-7 7"/>, bag: <><rect x="4" y="7" width="16" height="14" rx="2"/><path d="M8 8V6a4 4 0 0 1 8 0v2"/></>,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>{paths[name]}</svg>
}
function Atom({ large = false }: { large?: boolean }) {
  return <svg className={large ? 'atom atom-large' : 'atom'} viewBox="0 0 100 100" fill="none" aria-hidden="true"><ellipse cx="50" cy="50" rx="44" ry="17"/><ellipse cx="50" cy="50" rx="44" ry="17" transform="rotate(60 50 50)"/><ellipse cx="50" cy="50" rx="44" ry="17" transform="rotate(120 50 50)"/><circle cx="50" cy="50" r="6" fill="currentColor" stroke="none"/></svg>
}
const exercises: { id: number; title: string; description: string; category: string; icon: IconName; color: string; initial: string }[] = [
  { id: 1, title: 'Счётчик', description: 'Начни с малого. Меняй число, сохраняя его в состоянии.', category: 'Основы', icon: 'plus', color: 'purple', initial: 'useState(0)' },
  { id: 2, title: 'Показать / скрыть текст', description: 'Управляй видимостью с помощью одного boolean.', category: 'Основы', icon: 'eye', color: 'blue', initial: 'useState(false)' },
  { id: 3, title: 'Приветствие', description: 'Познакомься с управляемыми полями ввода.', category: 'Формы', icon: 'user', color: 'orange', initial: "useState('')" },
  { id: 4, title: 'Переключатель темы', description: 'Немного перемен: светлая или тёмная сторона?', category: 'Основы', icon: 'sun', color: 'amber', initial: "useState('light')" },
  { id: 5, title: 'Показать пароль', description: 'Переключай тип поля, сохраняя введённый пароль.', category: 'Формы', icon: 'eye-off', color: 'pink', initial: 'useState(false)' },
  { id: 6, title: 'Выбор цвета', description: 'Добавь красок и выдели активный вариант.', category: 'Основы', icon: 'palette', color: 'green', initial: "useState('Красный')" },
  { id: 7, title: 'Форма профиля', description: 'Несколько полей — один объект состояния.', category: 'Формы', icon: 'form', color: 'blue', initial: 'useState({ ... })' },
  { id: 8, title: 'Список покупок', description: 'Добавляй, удаляй и работай с массивом.', category: 'Списки', icon: 'bag', color: 'orange', initial: 'useState([])' },
  { id: 9, title: 'Список задач', description: 'Преврати планы в дела. А дела — в выполненные.', category: 'Списки', icon: 'list', color: 'purple', initial: 'useState([])' },
  { id: 10, title: 'Корзина товаров', description: 'Объедини всё: массивы, объекты и вычисляемые значения.', category: 'Списки', icon: 'cart', color: 'green', initial: 'useState([])' },
]
const categories = ['Все упражнения', 'Основы', 'Формы', 'Списки']
const categoryIcons: IconName[] = ['grid', 'layers', 'form', 'list']
const currency = (value: number) => `${new Intl.NumberFormat('ru-RU').format(value)} ₽`
const products = [{ id: 'notebook', name: 'Блокнот для идей', detail: 'Для больших планов', price: 490, color: 'lavender', emoji: '▤' }, { id: 'cup', name: 'Кружка разработчика', detail: 'Код. Кофе. Повторить.', price: 890, color: 'peach', emoji: '☕' }, { id: 'bag', name: 'Шоппер React', detail: 'Больше места для идей', price: 690, color: 'mint', emoji: '✳' }]

function Counter() {
  const [count, setCount] = useState(0)
  return <div className="counter-demo"><div className="count" aria-live="polite">{count}</div><div className="counter-controls"><button className="square-button" aria-label="Уменьшить" disabled={count === 0} onClick={() => setCount(c => Math.max(0, c - 1))}><Icon name="minus"/></button><button className="primary square-button" aria-label="Увеличить" onClick={() => setCount(c => c + 1)}><Icon name="plus"/></button><button className="reset-button" onClick={() => setCount(0)}><Icon name="reset" size={15}/>Сброс</button></div><span className="hint">Ниже нуля не опустимся</span></div>
}
function Visibility() {
  const [visible, setVisible] = useState(false)
  return <div className="visibility-demo"><div className={`hidden-message ${visible ? 'revealed' : ''}`} aria-live="polite">{visible ? <p>Маленькие шаги каждый день превращаются в большие знания. У тебя всё получится ✨</p> : <><Icon name="spark" size={24}/><span>Здесь прячется кое-что хорошее</span></>}</div><button className="soft-button full" onClick={() => setVisible(v => !v)}><Icon name={visible ? 'eye-off' : 'eye'} size={17}/>{visible ? 'Скрыть' : 'Показать'}</button></div>
}
function Greeting() {
  const [name, setName] = useState('')
  return <div className="greeting-demo"><label htmlFor="greeting-name">Как тебя зовут?</label><div className="input-icon"><Icon name="user" size={17}/><input id="greeting-name" value={name} placeholder="Введи своё имя" onChange={e => setName(e.target.value)}/></div><div className={`greeting-result ${name.trim() ? 'has-name' : ''}`} aria-live="polite"><span className="wave">👋</span><span>{name.trim() ? `Привет, ${name.trim()}!` : 'Введите имя'}</span></div></div>
}
function ThemeDemo() {
  const [dark, setDark] = useState(false)
  return <div className="theme-demo"><div className={`theme-preview ${dark ? 'night' : ''}`}><Icon name={dark ? 'moon' : 'sun'} size={30}/><span>{dark ? 'Уютный вечер для кода' : 'Хороший день, чтобы начать'}</span><i/><i/></div><button className="theme-toggle" onClick={() => setDark(d => !d)} aria-pressed={dark}><span><Icon name={dark ? 'moon' : 'sun'} size={16}/>{dark ? 'Тёмная тема' : 'Светлая тема'}</span><span className={`switch ${dark ? 'on' : ''}`}><span/></span></button></div>
}
function Password() {
  const [password, setPassword] = useState('')
  const [visible, setVisible] = useState(false)
  return <div className="password-demo"><label htmlFor="password">Твой пароль</label><div className="input-with-button"><input id="password" type={visible ? 'text' : 'password'} value={password} placeholder="Введи пароль" onChange={e => setPassword(e.target.value)}/><button className="icon-button" aria-label={visible ? 'Скрыть пароль' : 'Показать пароль'} onClick={() => setVisible(v => !v)}><Icon name={visible ? 'eye-off' : 'eye'} size={18}/></button></div><button className="soft-button full" onClick={() => setVisible(v => !v)}><Icon name={visible ? 'eye-off' : 'eye'} size={17}/>{visible ? 'Скрыть пароль' : 'Показать пароль'}</button><span className="hint"><Icon name="check" size={13}/> Значение остаётся в состоянии</span></div>
}
function ColorPicker() {
  const [color, setColor] = useState('Красный')
  const colors = [{ name: 'Красный', hex: '#ed6b73' }, { name: 'Зелёный', hex: '#53b58a' }, { name: 'Синий', hex: '#6585e7' }]
  return <div className="color-demo"><div className="color-preview"><div className="color-square" style={{ background: colors.find(c => c.name === color)!.hex }}><Icon name="check" size={25}/></div><div><span className="hint">Выбранный цвет</span><strong aria-live="polite">{color}</strong></div></div><div className="color-buttons">{colors.map(c => <button key={c.name} className={color === c.name ? 'selected' : ''} aria-pressed={color === c.name} onClick={() => setColor(c.name)}><span style={{ background: c.hex }}/>{c.name}</button>)}</div></div>
}
function Profile() {
  const empty = { name: '', age: '', city: '' }
  const [profile, setProfile] = useState(empty)
  return <div className="profile-demo"><div className="profile-inputs">{(['name', 'age', 'city'] as const).map((key, i) => <label key={key}>{['Имя', 'Возраст', 'Город'][i]}<input type={key === 'age' ? 'number' : 'text'} min={key === 'age' ? 0 : undefined} value={profile[key]} placeholder={['Александр', '25', 'Самара'][i]} onChange={e => setProfile(p => ({ ...p, [key]: e.target.value }))}/></label>)}</div><div className="profile-card"><span className="avatar">{profile.name.trim().slice(0, 1).toUpperCase() || <Icon name="user"/>}</span><div><strong>{profile.name.trim() || 'Твоё имя'}</strong><span>{[profile.age && `${profile.age} лет`, profile.city.trim()].filter(Boolean).join(' · ') || 'Расскажи немного о себе'}</span></div></div><button className="reset-button" onClick={() => setProfile(empty)}><Icon name="reset" size={14}/>Сброс формы</button></div>
}
function ShoppingList() {
  const [items, setItems] = useState([{ id: 'milk', text: 'Молоко' }, { id: 'bread', text: 'Свежий хлеб' }])
  const [text, setText] = useState('')
  function add(e: React.SubmitEvent<HTMLFormElement>) { e.preventDefault(); if (!text.trim()) return; setItems(items => [...items, { id: crypto.randomUUID(), text: text.trim() }]); setText('') }
  return <div className="list-demo"><form className="add-form" onSubmit={add}><input aria-label="Новый товар" placeholder="Что нужно купить?" value={text} onChange={e => setText(e.target.value)}/><button className="primary square-button" disabled={!text.trim()} aria-label="Добавить товар"><Icon name="plus" size={18}/></button></form><ul>{items.map(item => <li key={item.id}><span className="list-dot"/><span>{item.text}</span><button className="icon-button delete" aria-label={`Удалить ${item.text}`} onClick={() => setItems(items => items.filter(i => i.id !== item.id))}><Icon name="trash" size={16}/></button></li>)}</ul>{!items.length && <div className="empty-list">Список пуст. Добавим что-нибудь?</div>}<span className="hint">Товаров в списке: {items.length}</span></div>
}
function Tasks() {
  const [tasks, setTasks] = useState([{ id: 'first', text: 'Разобраться с useState', done: true }, { id: 'second', text: 'Создать свой компонент', done: false }])
  const [text, setText] = useState('')
  function add(e: React.SubmitEvent<HTMLFormElement>) { e.preventDefault(); if (!text.trim()) return; setTasks(tasks => [...tasks, { id: crypto.randomUUID(), text: text.trim(), done: false }]); setText('') }
  return <div className="list-demo"><form className="add-form" onSubmit={add}><input aria-label="Новая задача" placeholder="Какие планы?" value={text} onChange={e => setText(e.target.value)}/><button className="primary square-button" disabled={!text.trim()} aria-label="Добавить задачу"><Icon name="plus" size={18}/></button></form><ul>{tasks.map(task => <li key={task.id} className={task.done ? 'done' : ''}><label className="task-label"><input type="checkbox" checked={task.done} onChange={() => setTasks(tasks => tasks.map(t => t.id === task.id ? { ...t, done: !t.done } : t))}/><span className="checkbox">{task.done && <Icon name="check" size={12}/>}</span><span>{task.text}</span></label><button className="icon-button delete" aria-label={`Удалить задачу ${task.text}`} onClick={() => setTasks(tasks => tasks.filter(t => t.id !== task.id))}><Icon name="trash" size={16}/></button></li>)}</ul>{!tasks.length && <div className="empty-list">Место для новых планов</div>}<span className="tasks-remaining">Осталось выполнить <b>{tasks.filter(t => !t.done).length}</b></span></div>
}
function Cart() {
  const [cart, setCart] = useState<{ id: string; quantity: number }[]>([])
  const total = cart.reduce((sum, item) => sum + products.find(p => p.id === item.id)!.price * item.quantity, 0)
  function add(id: string) { setCart(cart => cart.some(i => i.id === id) ? cart.map(i => i.id === id ? { ...i, quantity: i.quantity + 1 } : i) : [...cart, { id, quantity: 1 }]) }
  function change(id: string, difference: number) { setCart(cart => cart.map(i => i.id === id ? { ...i, quantity: i.quantity + difference } : i).filter(i => i.quantity > 0)) }
  return <div className="cart-demo"><div className="catalog">{products.map(p => <div className="product" key={p.id}><div className={`product-art ${p.color}`}><span className={`product-drawing ${p.id}`}>{p.id === 'notebook' ? <><i/><i/><i/><i/></> : p.id === 'cup' ? <Atom/> : <Atom/>}</span></div><strong>{p.name}</strong><span className="hint">{p.detail}</span><div className="product-bottom"><b>{currency(p.price)}</b><button className="soft-button" onClick={() => add(p.id)}><Icon name="plus" size={16}/>В корзину</button></div></div>)}</div><div className="basket"><div className="basket-title"><strong>Твоя корзина</strong><span>{cart.reduce((sum, i) => sum + i.quantity, 0)}</span></div>{cart.length ? <ul>{cart.map(item => <li key={item.id}><div><strong>{products.find(p => p.id === item.id)!.name}</strong><span>{currency(products.find(p => p.id === item.id)!.price)}</span></div><div className="quantity"><button aria-label={`Уменьшить количество ${products.find(p => p.id === item.id)!.name}`} onClick={() => change(item.id, -1)}><Icon name="minus" size={13}/></button><span>{item.quantity}</span><button aria-label={`Увеличить количество ${products.find(p => p.id === item.id)!.name}`} onClick={() => change(item.id, 1)}><Icon name="plus" size={13}/></button></div><button className="icon-button delete" aria-label={`Убрать ${products.find(p => p.id === item.id)!.name}`} onClick={() => setCart(cart => cart.filter(i => i.id !== item.id))}><Icon name="trash" size={15}/></button></li>)}</ul> : <div className="empty-basket"><Icon name="cart" size={32}/><p>Пока здесь пусто</p><span>Добавь что-нибудь из каталога</span></div>}<div className="basket-total"><span>Итого</span><strong aria-live="polite">{currency(total)}</strong></div><span className="hint">Стоимость вычисляется из состояния корзины</span></div></div>
}
const demos = [Counter, Visibility, Greeting, ThemeDemo, Password, ColorPicker, Profile, ShoppingList, Tasks, Cart]

const codeFiles = import.meta.glob('./App.tsx', { query: '?raw', import: 'default', eager: true }) as Record<string, string>
function getCode(id: number) {
  const source = codeFiles['./App.tsx']
  const names = ['Counter', 'Visibility', 'Greeting', 'ThemeDemo', 'Password', 'ColorPicker', 'Profile', 'ShoppingList', 'Tasks', 'Cart']
  const start = source.indexOf(`function ${names[id - 1]}(`)
  const end = id < 10 ? source.indexOf(`function ${names[id]}(`, start) : source.indexOf('const demos =', start)
  return `import { useState } from 'react'\n\n${id === 10 ? `const products = ${JSON.stringify(products, null, 2)}\nconst currency = (value: number) => new Intl.NumberFormat('ru-RU').format(value) + ' ₽'\n\n` : ''}${source.slice(start, end).trim()}`
}

function App() {
  const [category, setCategory] = useState('Все упражнения')
  const [search, setSearch] = useState('')
  const [visited, setVisited] = useState<number[]>([])
  const [dark, setDark] = useState(false)
  const [modal, setModal] = useState<number | 'guide' | null>(null)
  const [copied, setCopied] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    function keyboard(e: KeyboardEvent) { if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); searchRef.current?.focus() } }
    window.addEventListener('keydown', keyboard)
    return () => window.removeEventListener('keydown', keyboard)
  }, [])
  useEffect(() => { if (modal !== null) dialogRef.current?.showModal(); else dialogRef.current?.close(); setCopied(false) }, [modal])
  const filtered = exercises.filter(e => (category === 'Все упражнения' || e.category === category) && `${e.title} ${e.description}`.toLowerCase().includes(search.toLowerCase()))
  const activeCode = typeof modal === 'number' ? getCode(modal) : ''
  function selectCategory(value: string) { setCategory(value); setMobileMenu(false) }
  return <div className={`app ${dark ? 'dark' : ''}`}>
    <aside className={`sidebar ${mobileMenu ? 'mobile-open' : ''}`}>
      <a className="brand" href="#" onClick={() => { selectCategory('Все упражнения'); setSearch('') }}><span className="brand-icon"><Atom/></span><span>useState<span className="brand-subtitle">ЛАБОРАТОРИЯ REACT</span></span><span className="brand-dot">.</span></a>
      <div className="sidebar-label">ТВОЯ ПРАКТИКА</div>
      <nav>{categories.map((name, i) => <button className={`nav-item ${category === name ? 'active' : ''}`} key={name} onClick={() => selectCategory(name)}><Icon name={categoryIcons[i]} size={19}/><span>{name}</span><span className="nav-count">{i === 0 ? 10 : exercises.filter(e => e.category === name).length}</span></button>)}</nav>
      <div className="sidebar-divider"/><button className="nav-item guide-nav" onClick={() => setModal('guide')}><Icon name="book" size={19}/><span>Шпаргалка по useState</span></button>
      <div className="sidebar-bottom"><div className="learning-tip"><span className="tip-icon"><Icon name="spark" size={21}/></span><strong>Практика решает</strong><p>Меняй значения, нажимай кнопки, смотри, что происходит.</p><span>Так и учатся React.</span></div><div className="sidebar-footer"><span className="react-small"><Atom/></span>Сделано с React<span className="version">v 1.0</span></div></div>
    </aside>
    <div className="workspace">
      <header className="topbar"><div className="breadcrumb"><button className="icon-button mobile-menu" aria-label="Открыть навигацию" aria-expanded={mobileMenu} onClick={() => setMobileMenu(v => !v)}><Icon name="list"/></button><span>Практика</span><Icon name="chevron" size={13}/><strong>React Hooks</strong></div><div className="topbar-actions"><div className="search"><Icon name="search" size={17}/><input ref={searchRef} aria-label="Найти упражнение" placeholder="Найти упражнение..." value={search} onChange={e => setSearch(e.target.value)}/><kbd>⌘ K</kbd></div><button className="icon-button global-theme" aria-label={dark ? 'Включить светлую тему сайта' : 'Включить тёмную тему сайта'} onClick={() => setDark(v => !v)}><Icon name={dark ? 'sun' : 'moon'} size={20}/></button><span className="header-divider"/><div className="user-avatar">U</div></div></header>
      <main>
        <section className="hero"><div className="hero-content"><span className="eyebrow"><span/>УЧИМСЯ ЧЕРЕЗ ПРАКТИКУ</span><h1>Маленький хук.<br/><span>Большие возможности.</span></h1><p>10 интерактивных упражнений, чтобы подружиться с useState.<br className="desktop-break"/> Пробуй, экспериментируй и наблюдай за состоянием.</p><div className="hero-tags"><span><Icon name="code" size={15}/>React useState</span><span><span className="level-bars"><i/><i/><i/></span>Для начинающих</span><span><Icon name="check" size={15}/>Учись в своём темпе</span></div></div><div className="hero-visual" aria-hidden="true"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="react-orb"><Atom large/></div><div className="floating-code top-code"><span>const</span> [state, setState]</div><div className="floating-code bottom-code">= <b>useState</b>(<span>✨</span>)</div><span className="decoration plus-one">+</span><span className="decoration plus-two">+</span><span className="decoration dot-one"/><span className="decoration dot-two"/></div></section>
        <section className="progress-strip"><div className="progress-icon"><Icon name="layers" size={19}/></div><div><strong>{visited.length === 10 ? 'Все упражнения исследованы. Отличная работа!' : 'Твой путь к уверенному React'}</strong><span>Каждое взаимодействие — маленький шаг вперёд</span></div><div className="progress-right"><span><b>{visited.length}</b> / 10 <span>исследовано</span></span><div className="progress-track"><div style={{ width: `${visited.length * 10}%` }}/></div></div></section>
        <section className="exercises-section"><div className="section-heading"><div><h2>{category}</h2><span className="exercise-count">{filtered.length}</span></div><div className="filter-tabs" aria-label="Категории упражнений">{categories.map((name, i) => <button key={name} className={category === name ? 'active' : ''} onClick={() => selectCategory(name)}>{i === 0 ? 'Все' : name}</button>)}</div></div><div className="exercise-grid">{exercises.map(exercise => { const Demo = demos[exercise.id - 1]; return <article key={exercise.id} hidden={!filtered.some(e => e.id === exercise.id)} className={`exercise-card ${exercise.id === 10 ? 'cart-card' : ''}`} onClickCapture={e => { if ((e.target as HTMLElement).closest('button, input') && !(e.target as HTMLElement).closest('.code-button')) setVisited(ids => ids.includes(exercise.id) ? ids : [...ids, exercise.id]) }} onChangeCapture={() => setVisited(ids => ids.includes(exercise.id) ? ids : [...ids, exercise.id])}><div className="card-top"><div className={`exercise-icon ${exercise.color}`}><Icon name={exercise.icon} size={21}/></div><span className="exercise-category">{exercise.category}</span><span className={`exercise-number ${visited.includes(exercise.id) ? 'explored' : ''}`}>{visited.includes(exercise.id) ? <Icon name="check" size={15}/> : String(exercise.id).padStart(2, '0')}</span></div><h3>{exercise.title}</h3><p className="card-description">{exercise.description}</p><div className="demo"><Demo/></div><div className="card-footer"><code><span/> {exercise.initial}</code><button className="code-button" onClick={() => setModal(exercise.id)} aria-label={`Код упражнения «${exercise.title}»`}><Icon name="code" size={15}/>Код</button></div></article>})}</div>{!filtered.length && <div className="no-results"><Icon name="search" size={30}/><h3>Пока ничего не нашлось</h3><p>Попробуй другое название упражнения.</p><button className="soft-button" onClick={() => { setSearch(''); setCategory('Все упражнения') }}>Сбросить поиск</button></div>}</section>
        <footer className="page-footer"><span>Меньше теории. Больше <code>setState()</code>.</span><span>Создано для любопытных <Icon name="spark" size={14}/></span></footer>
      </main>
    </div>
    <dialog ref={dialogRef} className="code-dialog" onCancel={() => setModal(null)} onClick={e => { if (e.target === e.currentTarget) setModal(null) }}><div className="dialog-inner"><div className="dialog-header"><div><span className="eyebrow">{modal === 'guide' ? 'НЕБОЛЬШАЯ ШПАРГАЛКА' : 'СМОТРИ, КАК ЭТО РАБОТАЕТ'}</span><h2>{modal === 'guide' ? 'Знакомься, useState' : exercises.find(e => e.id === modal)?.title}</h2></div><button className="icon-button" aria-label="Закрыть" onClick={() => setModal(null)}><Icon name="close"/></button></div>{modal === 'guide' ? <div className="guide-content"><p>useState хранит значение между рендерами компонента. Когда ты обновляешь состояние, React показывает новое значение в интерфейсе.</p><pre><code>{`const [count, setCount] = useState(0)\n\n// Обновляем на основе предыдущего значения\nsetCount(previous => previous + 1)`}</code></pre><h3>Три вещи, которые стоит запомнить</h3><ul><li><b>Начальное значение</b> передаётся в useState: число, строка, boolean, объект или массив.</li><li><b>Функция обновления</b> сообщает React, что состояние изменилось.</li><li><b>Объекты и массивы</b> обновляй, создавая новую копию: через spread, map и filter.</li></ul><p className="guide-note"><Icon name="spark"/>Лучший способ разобраться — попробовать упражнения.</p></div> : <><div className="code-toolbar"><span>React · TypeScript</span><button className="soft-button" onClick={async () => { try { await navigator.clipboard.writeText(activeCode); setCopied(true) } catch { setCopied(false) } }}><Icon name={copied ? 'check' : 'code'} size={15}/>{copied ? 'Скопировано' : 'Копировать'}</button></div><p className="code-note">Код работающего примера. Компоненты Icon и Atom, а также стили находятся в проекте.</p><pre className="source-code"><code>{activeCode}</code></pre></>}</div></dialog>
  </div>
}
export default App
