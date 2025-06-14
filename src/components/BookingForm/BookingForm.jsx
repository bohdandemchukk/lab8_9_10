import { Form } from "react-router-dom";
import useToast from "../../hooks/useToast.js";

export default function BookingForm({ bookSeats, filmId, setModalOpened }) {

  const {showSuccessToast, showErrorToast} = useToast();

  function handleSubmit(e) {
    e.preventDefault();

    const name = e.target.name.value.trim().replace(/\s+/g, " ");
    const tel = e.target.tel.value.trim();
    const email = e.target.email.value.trim();


    const nameParts = name.split(" ");
    if (
      nameParts.length < 2 ||
      nameParts.some((part) => !/^[A-Za-zА-Яа-яІіЇїЄєҐґ]{2,}$/.test(part))
    ) {
      showErrorToast("Введіть ім'я та прізвище (кожне мінімум 2 букви, без цифр).");
      return;
    }


    if (!/^\d{10,}$/.test(tel)) {
      showErrorToast("Номер телефону має містити щонайменше 10 цифр і не містити букв.");
      return;
    }


    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showErrorToast("Введіть коректну електронну пошту.");
      return;
    }


    bookSeats(filmId);
    showSuccessToast("Квитки успішно заброньовано!");
    setModalOpened(false);
  };

  return (
    <Form onSubmit={handleSubmit} className="text-white mt-4 flex flex-col gap-4">
      <div className="flex flex-col">
        <label htmlFor="name" className="text-sm text-zinc-400 mb-1">Ім’я та прізвище</label>
        <input
          className="bg-zinc-800 text-white px-4 py-2 rounded-md border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          type="text"
          id="name"
          name="name"
          required
          placeholder="Ваше ім’я та прізвище"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="tel" className="text-sm text-zinc-400 mb-1">Телефон</label>
        <input
          className="bg-zinc-800 text-white px-4 py-2 rounded-md border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          type="tel"
          id="tel"
          name="tel"
          required
          placeholder="Номер телефону"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="email" className="text-sm text-zinc-400 mb-1">Пошта</label>
        <input
          className="bg-zinc-800 text-white px-4 py-2 rounded-md border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          type="email"
          id="email"
          name="email"
          required
          placeholder="Ваша пошта"
        />
      </div>

      <button
        type="submit"
        className="mt-3 bg-red-600 hover:bg-rose-500 text-white font-semibold py-2 px-4 rounded-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
      >
        Забронювати
      </button>
    </Form>
  );
}
