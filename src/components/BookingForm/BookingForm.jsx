import { Form } from "react-router-dom"


export default function BookingForm() {

  return (
    <Form className="text-white" onSubmit = "">
      <input
        className=" w-full mb-3 p-2 border border-gray-300 rounded"
        type = "text"
        id = "name"
        name = "name"
        required
        placeholder = "Ваше ім'я"/>
      <input
        className=" w-full mb-3 p-2 border border-gray-300 rounded"
        type = "tel"
        id = "tel"
        name = "tel"
        required
        placeholder = "Номер телефону"/>
      <input
        className="w-full mb-3 p-2 border border-gray-300 rounded"
        type = "email"
        id = "email"
        name = "email"
        required
        placeholder = "Ваша пошта"/>

      <button>Забронювати</button>
    </Form>
  )
}