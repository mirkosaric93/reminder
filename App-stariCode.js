import "./App.css";
import { useEffect, useState } from "react";

// const test = [
//   { description: "travel", date: "12.07.2021.", hour: "12", min: "00" },
// ];

export default function App() {
  const [items, setItems] = useState([]);
  const [currentDate, setCurrentDate] = useState({
    hour: new Date().getHours(),
    min: new Date().getMinutes(),
    date: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  //GODINA - MESEC - DAN
  //handleZero(item.hour) === handleZero(currentDate.hour) && handleZero(item.min) === handleZero(currentDate.min) && item.date === `${String(currentDate.year)}-${String(currentDate.month)}-${String(currentDate.date)}`

  setInterval(
    () =>
      setCurrentDate({
        hour: new Date().getHours(),
        min: new Date().getMinutes(),
        date: new Date().getDate(),
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
      }),
    20000
  );
  // console.log(currentDate)

  function handleAddItems(newObj) {
    setItems([...items, newObj]);
  }

  function handleZero(e) {
    return e < 10 ? `0${e}` : e;
  }

  function handleDelete(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  return (
    <div>
      <Header />
      <Form
        handleAddReminders={handleAddItems}
        handleZero={handleZero}
        currentDate={currentDate}
      />
      <ReminderList
        reminders={items}
        handleZero={handleZero}
        handleDelete={handleDelete}
        currentDate={currentDate}
      />
      <Footer items={items} />
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1 className="font-effect-outline">Hello, I am your reminder.</h1>
    </header>
  );
}

function Form({ handleAddReminders, handleZero, currentDate }) {
  const [hour, setHour] = useState("");
  const [min, setMin] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newRemind = {
      description: description,
      date: date,
      hour: hour,
      min: min,
      id: description,
      done: false,
    };

    handleAddReminders(newRemind);
    setHour("");
    setMin("");
    setDate("");
    setDescription("");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>Remind me for:</label>
      <input
        type={"text"}
        className="input"
        placeholder="task..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <label>Date:</label>
      <input
        type="date"
        className="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      ></input>

      <label>Time:</label>
      <span className="time">
        <span className="hour-min">Hour:</span>
        <select
          value={hour}
          onChange={(e) => setHour(Number(e.target.value))}
          className="option"
        >
          {Array.from({ length: 24 }, (_, i) => i).map((num) => (
            <option value={num} key={num}>
              {handleZero(num)}
            </option>
          ))}
        </select>

        <span className="hour-min">Min:</span>
        <select
          value={min}
          onChange={(e) => setMin(Number(e.target.value))}
          className="option"
        >
          {Array.from({ length: 60 }, (_, i) => i * 5).map((num) => (
            <option value={num} key={num}>
              {handleZero(num)}
            </option>
          ))}
        </select>
      </span>
      <br></br>
      <button className="submitBtn">Add</button>

      <div className="currentTime">
        <p>
          Date:{currentDate.year}-{handleZero(currentDate.month)}-
          {handleZero(currentDate.date)}
        </p>
        <p>
          Time:{handleZero(currentDate.hour)}:{handleZero(currentDate.min)}
        </p>
      </div>
    </form>
  );
}

//koristiti getTime za uporedjivanje vremena
// selektovanoVreme = 2:30
// trenutnoVreme = 3:29
//todo!

//Promenuti ovde test i reminders
function ReminderList({ reminders, handleZero, handleDelete, currentDate }) {
  return (
    <div className="remind-list">
      {reminders.map((item) => {
        // const [year, month, day] = item.date.split('-');
        return handleZero(item.hour) <= handleZero(currentDate.hour) &&
          handleZero(item.min) <= handleZero(currentDate.min) &&
          item.date.split("-")[0] == currentDate.year &&
          item.date.split("-")[1] == currentDate.month &&
          item.date.split("-")[2] == currentDate.date ? (
          <RemindDone
            item={item}
            key={item.description}
            handleZero={handleZero}
            handleDelete={handleDelete}
          />
        ) : (
          <Remind
            item={item}
            key={item.description}
            handleZero={handleZero}
            handleDelete={handleDelete}
          />
        );
      })}
    </div>
  );
}

function Footer({ items }) {
  return (
    <footer>
      You have {items.length} {items.length > 1 ? "reminders" : "reminder"}.
    </footer>
  );
}

function Remind({ item, handleZero, handleDelete }) {
  return (
    <span className="remind-item">
      📍
      <button className="itemBtn" onClick={() => handleDelete(item.id)}>
        X
      </button>
      <p style={{ fontSize: "2.5em", fontWeight: "bold" }}>
        {item.description}
      </p>
      <p style={{ padding: "5px", margin: "5px", fontWeight: "bold" }}>
        {item.date}
      </p>
      <p style={{ padding: "5px", fontWeight: "bold", fontSize: "1.5em" }}>
        {handleZero(item.hour == 0 ? "0" : item.hour)} :{" "}
        {handleZero(item.min == 0 ? "0" : item.min)}
      </p>
    </span>
  );
}

function RemindDone({ item, handleZero, setItems, handleDelete }) {
  const sound = new Audio("./audio.mp3");
  sound.play();

  return (
    <span className="remindDone">
      <p className="finish">Finish Task.</p>
      <button className="itemBtnDone" onClick={() => handleDelete(item.id)}>
        X
      </button>
      <p
        style={{
          fontSize: "2.5em",
          fontWeight: "bold",
          textDecoration: "underline",
        }}
      >
        {item.description}
      </p>
      <p
        style={{
          padding: "5px",
          margin: "5px",
          fontWeight: "bold",
          opacity: "0.3",
        }}
      >
        {item.date}
      </p>
      <p
        style={{
          padding: "5px",
          fontWeight: "bold",
          fontSize: "1.5em",
          opacity: "0.3",
        }}
      >
        {handleZero(item.hour == 0 ? "0" : item.hour)} :{" "}
        {handleZero(item.min == 0 ? "0" : item.min)}
      </p>
    </span>
  );
}
