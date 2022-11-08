import Box from "../components/Box";
import Sales from "../assets/cart.svg";
import Revenue from "../assets/currency-dollar.svg";
import Customers from "../assets/people-fill.svg";

const DashBoard = () => {
  const title = "Dashboard";
  const path = `Home / ${title}`;

  //Creating an array of objects, and passing data.
  const boxes = [
    {
      title: "Sales | ",
      date: "Today",
      icon: Sales,
      content: 145,
      content_percentage: "12%",
      content_details: "increase",
      id: 1,
    },
    {
      title: "Revenue | ",
      date: "This Month",
      icon: Revenue,
      content: "$3,264",
      content_percentage: "8%",
      content_details: "increase",
      id: 2,
    },
    {
      title: "Customers | ",
      date: "This Year",
      icon: Customers,
      content: 1244,
      content_percentage: "12%",
      content_details: "decrease",
      id: 3,
    },
  ];

  return (
    <div className="dashboard" id="dashboard">
      {/* Dynamically passing data */}
      <h2 className="route">{title}</h2>
      <h5 className="path">{path}</h5>
      <p>Here I reused the component box and passed props to it</p>
      <div className="box-display">
        {/* mapping through the array to create the boxes and passing the props */}
        {boxes.map((box) => (
          <Box
            id={box.id}
            title={box.title}
            date={box.date}
            icon={box.icon}
            content={box.content}
            content_percentage={box.content_percentage}
            content_details={box.content_details}
          />
        ))}
      </div>
    </div>
  );
};

export default DashBoard;
