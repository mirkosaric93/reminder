import "./App.css";
import { useState } from "react";


export default function App() {
  const [items, setItems] = useState([]);

  const [currentDate, setCurrentDate] = useState(
    new Date().getTime()
  )

  setInterval(
    () =>
      setCurrentDate(new Date().getTime()),
    40000
  );

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


//FORM FOR CREATE NEW REMINDER
function Form({ handleAddReminders, handleZero, currentDate }) {
 
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState('');

  const [hours, minutes] = time.split(':');
  const [year, month, day] = date.split('-');

  const hoursInt = Number(hours);
  const minutesInt = Number(minutes);
  const yearInt = Number(year);
  const monthInt = Number(month) - 1;
  const dayInt = Number(day);

  const dateInMilisecond = new Date(yearInt, monthInt, dayInt, hoursInt, minutesInt);
  const realTime = dateInMilisecond?.getTime();

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;

    const newRemind = {
      description: description,
      date: date,
      hour: hoursInt,
      min: minutesInt,
      id: description,
      done: false,
      time: realTime,
    };

    handleAddReminders(newRemind);

    setDate("");
    setDescription("");
    setTime("")
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
      <span>
        <input className="time" type='time' value={time} onChange={(t) => setTime(t.target.value)}/>
      </span>
      <br></br>
      <button className="submitBtn">Add</button>
    </form>
  );
}
//----------------------------------------------------------------------------------------------------


//CONTAINER FOR ALL REMINDER
function ReminderList({ reminders, handleZero, handleDelete, currentDate }) {
  
  return (
    <div className="remind-list">
      {reminders.map((item) => {
        return item.time <= currentDate ? (
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
//----------------------------------------------------------------------------------------------------


//FOOTER
function Footer({ items }) {
  return (
    <footer>
      You have {items.length} {items.length > 1 ? "reminders" : "reminder"}.
    </footer>
  );
}
//----------------------------------------------------------------------------------------------------



//REMINDER(WHICH MUST TO DO)
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
        {handleZero(item.hour === 0 ? "0" : item.hour)} : {" "} {/*care about === or == */}
        {handleZero(item.min === 0 ? "0" : item.min)}
      </p>
    </span>
  );
}
//----------------------------------------------------------------------------------------------------


//REMINDER(WHICH FINISHED)
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
        {handleZero(item.hour === 0 ? "0" : item.hour)} :{" "} {/*care about === or == */}
        {handleZero(item.min === 0 ? "0" : item.min)}
      </p>
    </span>
  );
}
//----------------------------------------------------------------------------------------------------